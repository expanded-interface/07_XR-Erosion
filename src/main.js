// Experiment 1 — Viewcone Erosion
// WebXR (Meta Quest 3 Browser) with XR Blocks + Spark.
//
// A Gaussian-splat capture stays photographic where the original camera stood
// and erodes into drifting motes wherever you look at it from a place nobody
// photographed it from.

import * as THREE from 'three';
import * as xb from 'xrblocks';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';

import { camerasFromFiles, camerasFromUrl, syntheticArc } from './cameras.js';
import { MAX_CAMS, createViewconeModifier, createViewconeUniforms } from './viewcone.js';

// ---------------------------------------------------------------- scenes
// public/scenes/scenes.json lists the bundled captures. Each entry may carry
// its own parameter defaults; URL parameters still override them.
let SCENES = [];
try {
  SCENES = (await (await fetch('./scenes/scenes.json')).json()).scenes;
} catch (err) {
  console.warn('[viewcone] no scenes.json', err);
}
const url = new URLSearchParams(location.search);
const sceneId = url.get('scene') || (url.get('splat') ? null : SCENES[0]?.id);
const SCENE = SCENES.find((s) => s.id === sceneId) || null;

// Precedence: URL > scene defaults > built-in defaults.
const q = new URLSearchParams({ ...(SCENE?.params || {}), ...Object.fromEntries(url) });
const num = (k, d) => (q.has(k) ? Number(q.get(k)) : d);
const vec = (k, d) => (q.has(k) ? new THREE.Vector3(...q.get(k).split(',').map(Number)) : d);

const P = {
  splat: url.get('splat') || SCENE?.splat || './demo/clearing.ply',
  cams: url.get('cams') || (url.get('splat') ? null : SCENE?.cams || './demo/cameras.json'),
  mode: q.get('mode') === 'ar' ? 'ar' : 'vr',
  flip: num('flip', 1) === 1, // COLMAP y-down -> three.js y-up
  fit: q.has('fit') ? num('fit', 1) === 1 : null, // null = auto (fit when no cameras)
  fitSize: num('fitSize', 1.2), // metres, longest side when fitting
  fitPos: vec('fitPos', new THREE.Vector3(0, 1.3, -1.2)),
  scale: num('scale', 1),
  eye: num('eye', 1.6), // head height used when starting at a capture camera
  startCam: q.has('startCam') ? num('startCam', 0) : null, // null = middle of the capture
  rotY: num('rotY', 0),
  offset: vec('offset', null), // metres: start this far from the capture camera
  turn: num('turn', 0), // degrees: initial turn about your head
  // erosion
  a0: num('a0', 12), // degrees: fully intact below this angle
  a1: num('a1', 50), // degrees: fully eroded above this angle
  haze: num('haze', 0.7), // 0..1: where eroded motes start fading out
  residue: num('residue', 0.3), // 0..1: opacity left when fully eroded
  mote: num('mote', 0.008), // metres: mote radius
  amp: num('amp', 0.06), // metres: drift amplitude when fully eroded
  freq: num('freq', 3), // 1/metres: drift field frequency
  loop: num('loop', 12), // seconds per drift cycle (exact loop)
  speed: num('speed', 1.2), // m/s locomotion
  debug: num('debug', 0) === 1,
};

const statusEl = document.getElementById('status');
const setStatus = (s) => {
  if (statusEl) statusEl.textContent = s;
  console.log('[viewcone]', s);
};

// ---------------------------------------------------------------- the script
const Y = new THREE.Vector3(0, 1, 0);

class ViewconeErosion extends xb.Script {
  async init() {
    this.u = createViewconeUniforms(P);
    this.u.debug.value = P.debug ? 1 : 0;

    // Everything captured lives in `world`, which locomotion moves.
    this.world = new THREE.Group();
    this.add(this.world);

    // One SparkRenderer per scene. maxStdDev sqrt(5) is a little softer than
    // the default sqrt(8) and cheaper on Quest's fill rate.
    this.spark = new SparkRenderer({ renderer: xb.core.renderer, maxStdDev: Math.sqrt(5) });
    xb.scene.add(this.spark);

    if (P.mode === 'vr') {
      xb.scene.background = new THREE.Color(0x060606);
      xb.core.renderer.setClearColor(0x060606, 1);
    }

    this.camsLocal = []; // capture cameras in splat-local coordinates
    this.camsSynthetic = true;
    this.showCams = false;
    this.lastT = performance.now() / 1000;
    this.buttons = {};
    this.turnLatch = {};

    // scratch
    this._head = new THREE.Vector3();
    this._camW = []; // world-space cache: { p, f, cos, d2 }

    await this.loadSplat({ url: P.splat });
    if (P.cams) {
      try {
        this.setCameras(await camerasFromUrl(P.cams), false);
      } catch (err) {
        setStatus(`Could not load cameras: ${err.message}\nUsing a virtual capture arc.`);
      }
    }
  }

  // ------------------------------------------------------------ loading
  async loadSplat(source) {
    setStatus('Loading splat…');
    if (this.mesh) {
      this.world.remove(this.mesh);
      this.mesh.dispose?.();
      this.mesh = null;
    }
    const mesh = new SplatMesh({
      ...source,
      worldModifier: createViewconeModifier(this.u),
    });
    await mesh.initialized;
    this.mesh = mesh;
    this.world.add(mesh);
    this.numSplats = mesh.numSplats ?? mesh.packedSplats?.numSplats ?? 0;

    if (this.camsSynthetic || !this.camsLocal.length) {
      this.placeAsDiorama();
      this.makeSyntheticCameras();
    } else {
      this.placeForCameras();
    }
    this.rebuildGizmos();
    this.report();
  }

  setCameras(cams, synthetic) {
    if (!cams.length) throw new Error('no cameras found');
    this.camsLocal = cams;
    this.camsSynthetic = synthetic;
    if (!synthetic) this.placeForCameras();
    this.rebuildGizmos();
    this.report();
  }

  report() {
    const n = this.numSplats ? `${(this.numSplats / 1000).toFixed(0)}k splats` : 'splats loaded';
    const warn = this.numSplats > 600000 ? '\n⚠ Over ~600k splats will drop frames on Quest 3.' : '';
    const src = this.camsSynthetic ? 'virtual arc (demo)' : 'capture';
    setStatus(`${n} · ${this.camsLocal.length} ${src} cameras · ${P.mode.toUpperCase()}${warn}`);
  }

  // ------------------------------------------------------------ placement
  baseOrientation(mesh) {
    mesh.quaternion.identity();
    if (P.flip) mesh.quaternion.set(1, 0, 0, 0);
    if (P.rotY) {
      mesh.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(Y, THREE.MathUtils.degToRad(P.rotY)));
    }
  }

  /** Small object or whole scene shrunk to a tabletop "memory" in front of you. */
  placeAsDiorama() {
    const mesh = this.mesh;
    this.baseOrientation(mesh);
    const box = mesh.getBoundingBox(true);
    const size = box.getSize(new THREE.Vector3());
    const s = P.fit === false ? P.scale : P.fitSize / Math.max(size.x, size.y, size.z, 1e-6);
    mesh.scale.setScalar(s);
    mesh.position.set(0, 0, 0);
    mesh.updateMatrix();
    const c = box.getCenter(new THREE.Vector3()).applyMatrix4(mesh.matrix);
    mesh.position.copy(P.fitPos).sub(c);
    mesh.updateMatrixWorld(true);
    this.dioramaCenter = P.fitPos.clone();
    this.dioramaRadius = Math.max(0.6, P.fitPos.length() * 0.95);
  }

  /** Start where the photographer stood: capture camera N at your eyes, facing its view. */
  placeForCameras() {
    const mesh = this.mesh;
    if (!mesh || !this.camsLocal.length) return;
    if (P.fit === true) {
      this.placeAsDiorama();
      return;
    }
    this.baseOrientation(mesh);
    mesh.scale.setScalar(P.scale);
    const n = this.camsLocal.length;
    const idx = P.startCam === null ? Math.floor(n / 2) : Math.min(P.startCam, n - 1);
    const cam = this.camsLocal[idx];
    // yaw so the camera's horizontal forward points down -Z
    const fw = cam.forward.clone().applyQuaternion(mesh.quaternion);
    const yaw = Math.PI - Math.atan2(fw.x, fw.z);
    mesh.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(Y, yaw));
    mesh.position.set(0, 0, 0);
    mesh.updateMatrix();
    const pw = cam.position.clone().applyMatrix4(mesh.matrix);
    mesh.position.set(-pw.x, P.eye - pw.y, -pw.z);
    mesh.updateMatrixWorld(true);
    // reset locomotion so you begin exactly at that camera (or offset from it)
    this.world.position.set(0, 0, 0);
    this.world.quaternion.identity();
    if (P.offset) this.world.position.sub(P.offset);
    if (P.turn) {
      const head = new THREE.Vector3(0, P.eye, 0);
      const ang = THREE.MathUtils.degToRad(P.turn);
      this.world.position.sub(head).applyMatrix4(new THREE.Matrix4().makeRotationY(ang)).add(head);
      this.world.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(Y, ang));
    }
  }

  makeSyntheticCameras() {
    this.world.updateMatrixWorld(true);
    const toLocal = this.mesh.matrixWorld.clone().invert();
    const cams = syntheticArc({
      center: this.dioramaCenter,
      radius: this.dioramaRadius,
      arcDeg: 110,
      count: 11,
      toLocal,
    });
    this.camsLocal = cams;
    this.camsSynthetic = true;
  }

  // ------------------------------------------------------------ gizmos
  rebuildGizmos() {
    if (this.gizmo) {
      this.gizmo.parent?.remove(this.gizmo);
      this.gizmo.geometry.dispose();
      this.gizmo.material.dispose();
      this.gizmo = null;
    }
    if (!this.mesh || !this.camsLocal.length) return;
    const s = this.mesh.scale.x || 1;
    const len = 0.12 / s; // 12 cm in world units
    const pts = [];
    for (const c of this.camsLocal) {
      const tip = c.position.clone().addScaledVector(c.forward, len);
      pts.push(c.position, tip);
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color: 0xffb24a, transparent: true, opacity: 0.9 });
    this.gizmo = new THREE.LineSegments(geo, mat);
    this.gizmo.visible = this.showCams;
    this.mesh.add(this.gizmo);
  }

  // ------------------------------------------------------------ per frame
  update(_time, frame) {
    const now = performance.now() / 1000;
    const dt = Math.min(0.1, now - this.lastT);
    this.lastT = now;

    this.u.phase.value = ((now % P.loop) / P.loop) * Math.PI * 2;

    if (frame) this.handleXRInput(frame, dt);

    const camera = xb.core.camera;
    camera.getWorldPosition(this._head);
    this.u.head.value.copy(this._head);

    if (this.mesh && this.camsLocal.length) this.updateNearestCameras();
    this.mesh?.updateVersion();
  }

  updateNearestCameras() {
    this.world.updateMatrixWorld(true);
    const m = this.mesh.matrixWorld;
    const nrm = new THREE.Matrix3().getNormalMatrix(m);
    const cams = this.camsLocal;
    if (this._camW.length !== cams.length) {
      this._camW = cams.map(() => ({ p: new THREE.Vector3(), f: new THREE.Vector3(), cos: 1, d2: 0 }));
    }
    for (let i = 0; i < cams.length; i++) {
      const w = this._camW[i];
      w.p.copy(cams[i].position).applyMatrix4(m);
      w.f.copy(cams[i].forward).applyMatrix3(nrm).normalize();
      w.cos = Math.cos(cams[i].halfFov);
      w.d2 = w.p.distanceToSquared(this._head);
    }
    const order = this._camW.slice().sort((a, b) => a.d2 - b.d2);
    const n = Math.min(MAX_CAMS, order.length);
    for (let k = 0; k < n; k++) {
      this.u.pos[k].value.copy(order[k].p);
      this.u.fwd[k].value.copy(order[k].f);
      this.u.cosFov[k].value = order[k].cos;
    }
    this.u.ncam.value = n;
  }

  // ------------------------------------------------------------ input
  handleXRInput(frame, dt) {
    const session = frame.session;
    if (!session) return;
    const camera = xb.core.camera;
    for (const src of session.inputSources) {
      const gp = src.gamepad;
      if (!gp || gp.axes.length < 4) continue;
      const hand = src.handedness;
      const ax = Math.abs(gp.axes[2]) > 0.15 ? gp.axes[2] : 0;
      const ay = Math.abs(gp.axes[3]) > 0.15 ? gp.axes[3] : 0;

      if (hand === 'left' && (ax || ay)) {
        // head-relative horizontal move; moving you = moving the world back
        const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.getWorldQuaternion(new THREE.Quaternion()));
        fwd.y = 0;
        fwd.normalize();
        const right = new THREE.Vector3().crossVectors(fwd, Y);
        const move = fwd.multiplyScalar(-ay).add(right.multiplyScalar(ax)).multiplyScalar(P.speed * dt);
        this.world.position.sub(move);
      }
      if (hand === 'right') {
        if (ay) this.world.position.y += ay * P.speed * 0.6 * dt; // stick up = rise
        if (Math.abs(gp.axes[2]) > 0.7 && !this.turnLatch[hand]) {
          this.turnLatch[hand] = true;
          this.snapTurn(Math.sign(gp.axes[2]) * THREE.MathUtils.degToRad(30));
        } else if (Math.abs(gp.axes[2]) < 0.3) {
          this.turnLatch[hand] = false;
        }
      }

      // A/X (index 4) toggles capture cameras, B/Y (index 5) toggles debug colours
      const prev = this.buttons[hand] || [];
      const pressed = gp.buttons.map((b) => b.pressed);
      if (pressed[4] && !prev[4]) this.toggleCams();
      if (pressed[5] && !prev[5]) this.toggleDebug();
      this.buttons[hand] = pressed;
    }
  }

  snapTurn(angle) {
    const head = this._head;
    const R = new THREE.Matrix4().makeRotationY(angle);
    this.world.position.sub(head).applyMatrix4(R).add(head);
    this.world.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(Y, angle));
  }

  toggleCams() {
    this.showCams = !this.showCams;
    if (this.gizmo) this.gizmo.visible = this.showCams;
  }

  toggleDebug() {
    this.u.debug.value = this.u.debug.value > 0.5 ? 0 : 1;
  }

  onKeyDown(event) {
    if (event.code === 'KeyC') this.toggleCams();
    if (event.code === 'KeyV') this.toggleDebug();
  }

  dispose() {
    this.gizmo?.geometry.dispose();
    this.gizmo?.material.dispose();
    this.mesh?.dispose?.();
    this.spark?.dispose?.();
  }
}

// ---------------------------------------------------------------- start
const app = new ViewconeErosion();
const options = new xb.Options();
// Quest Browser can hang with MSAA + per-frame passes + Spark readbacks.
options.antialias = false;
if (P.mode === 'vr') {
  options.enableVR();
  // Desktop simulator: an empty void instead of the default living room,
  // since this piece is the whole environment.
  options.simulator.environments = [{ manifestPath: './sim/void.json' }];
  options.simulator.activeEnvironmentIndex = 0;
}
xb.add(app);
await xb.init(options);

// ---------------------------------------------------------------- scene picker
const sceneSelect = document.getElementById('scene');
if (sceneSelect) {
  for (const s of SCENES) sceneSelect.add(new Option(s.label, s.id, false, s.id === SCENE?.id));
  if (!SCENE) sceneSelect.add(new Option('Custom file', '', true, true));
  sceneSelect.addEventListener('change', () => {
    // reload with the new scene; keep mode and erosion overrides, drop file ones
    const next = new URLSearchParams(location.search);
    for (const k of ['splat', 'cams', 'scene', 'offset', 'turn', 'startCam']) next.delete(k);
    if (sceneSelect.value) next.set('scene', sceneSelect.value);
    location.search = next.toString();
  });
}

// ---------------------------------------------------------------- file pickers
document.getElementById('splatFile')?.addEventListener('change', async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  try {
    await app.loadSplat({ fileBytes: await f.arrayBuffer(), fileName: f.name });
  } catch (err) {
    setStatus(`Could not load splat: ${err.message}`);
  }
});

document.getElementById('camFiles')?.addEventListener('change', async (e) => {
  const files = e.target.files;
  if (!files?.length) return;
  try {
    app.setCameras(await camerasFromFiles(files), false);
  } catch (err) {
    setStatus(`Could not read cameras: ${err.message}`);
  }
});
