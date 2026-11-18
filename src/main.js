// Experiment 1 — Viewcone Erosion
// WebXR (Meta Quest 3 Browser) with XR Blocks + Spark.
//
// Several captured places share one dark space. They stand on a ring around a
// central plaza, each with its photographed side facing the centre. Every
// place stays photographic where its camera stood and erodes into drifting
// motes wherever you view it from a place nobody photographed it from.
//
// Walk (or stick-move) from one to another. Trigger / pinch dissolves the
// world and re-forms it with you standing at the next place's capture
// viewpoint: plaza -> D02 -> N04 -> Ginebra -> D05 -> plaza.

import * as THREE from 'three';
import * as xb from 'xrblocks';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';

import { camerasFromUrl } from './cameras.js';
import { MAX_CAMS, createViewconeModifier, createViewconeUniforms } from './viewcone.js';

// ---------------------------------------------------------------- settings
const url = new URLSearchParams(location.search);

const DEFAULTS = {
  flip: 1, // COLMAP y-down -> three.js y-up (bundled scenes set 0)
  rotY: 0,
  a0: 12, // degrees: fully intact below this angle off a capture ray
  a1: 50, // degrees: fully eroded above this angle
  haze: 0.7, // 0..1: erosion level where motes start thinning out
  residue: 0.3, // 0..1: opacity left when fully eroded
  mote: 0.008, // metres: mote radius
  amp: 0.06, // metres: drift amplitude when fully eroded
  freq: 3, // 1/metres: drift field frequency
};

// ---------------------------------------------------------------- device profile
// Quest 2 has roughly half the GPU of a Quest 3 and 6 GB of shared memory, and
// splats are fill-rate bound. Its profile loads lighter cuts of each place,
// renders at a lower resolution with fixed foveation, clamps how big a splat
// may get on screen, and regenerates fewer splats per frame.
const UA = navigator.userAgent;
const PROFILES = {
  quest2: {
    name: 'Quest 2', lite: true, fbScale: 0.8, foveation: 1, maxStdDev: 2,
    maxPixelRadius: 96, minAlpha: 4 / 255, near: 9, farEvery: 12, maxCams: 5, dust: 4000,
  },
  quest3: {
    name: 'Quest 3', lite: false, fbScale: 1.0, foveation: 0.5, maxStdDev: Math.sqrt(5),
    maxPixelRadius: 256, minAlpha: 2 / 255, near: 16, farEvery: 6, maxCams: 8, dust: 9000,
  },
  desktop: {
    name: 'Desktop', lite: false, fbScale: 1.0, foveation: 0, maxStdDev: Math.sqrt(5),
    maxPixelRadius: 512, minAlpha: 0.5 / 255, near: 16, farEvery: 6, maxCams: 8, dust: 9000,
  },
};
const profileId =
  url.get('profile') ||
  (/Quest 2/.test(UA) ? 'quest2' : /Quest|OculusBrowser/.test(UA) ? 'quest3' : 'desktop');
const PROFILE = PROFILES[profileId] || PROFILES.desktop;

const G = {
  mode: url.get('mode') === 'ar' ? 'ar' : 'vr',
  loop: Number(url.get('loop') ?? 12), // seconds per drift cycle (exact loop)
  speed: Number(url.get('speed') ?? 1.4), // m/s stick locomotion
  debug: url.get('debug') === '1',
  ring: url.has('ring') ? Number(url.get('ring')) : null, // metres, overrides scenes.json
  leave: Number(url.get('leave') ?? 1.2), // seconds: world dissolves before a jump
  arrive: Number(url.get('arrive') ?? 2.6), // seconds: world re-forms after it
  near: Number(url.get('near') ?? PROFILE.near), // metres: places closer than this update every frame
  eye: 1.6,
};

function settingsFor(scene) {
  const out = { ...DEFAULTS, ...(scene.params || {}) };
  for (const k of Object.keys(DEFAULTS)) if (url.has(k)) out[k] = Number(url.get(k));
  out.flip = Number(out.flip) === 1;
  return out;
}

const manifest = await (await fetch('./scenes/scenes.json')).json();
const SCENES = manifest.scenes;
const RING = G.ring ?? manifest.layout?.radius ?? 11;

// ---------------------------------------------------------------- helpers
const Y = new THREE.Vector3(0, 1, 0);
const smooth = (x) => x * x * (3 - 2 * x);
const yawOf = (v) => Math.atan2(v.x, v.z);
const qYaw = (a) => new THREE.Quaternion().setFromAxisAngle(Y, a);

const statusEl = document.getElementById('status');
const sceneEl = document.getElementById('sceneName');
const setStatus = (s) => {
  if (statusEl) statusEl.textContent = s;
  console.log('[viewcone]', s);
};

function makeTitle() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 192;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false, opacity: 0 });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.225), mat);
  mesh.renderOrder = 999;
  mesh.visible = false;
  mesh.userData.write = (title, sub) => {
    const g = canvas.getContext('2d');
    g.clearRect(0, 0, canvas.width, canvas.height);
    g.textAlign = 'center';
    g.fillStyle = 'rgb(232, 228, 220)';
    g.font = '600 64px ui-monospace, Menlo, monospace';
    g.fillText(title, 512, 92);
    g.fillStyle = 'rgb(170, 163, 154)';
    g.font = '36px ui-monospace, Menlo, monospace';
    g.fillText(sub, 512, 150);
    tex.needsUpdate = true;
  };
  return mesh;
}

/** Faint dust on the floor everywhere: a ground reference in the void. */
function makeFloorDust(radius, n = 9000) {
  const pos = new Float32Array(n * 3);
  let s = 12345;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    const r = radius * Math.sqrt(rnd());
    const a = rnd() * Math.PI * 2;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = 0.005;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: 0x8a847b, size: 2, sizeAttenuation: false, transparent: true, opacity: 0.35, depthWrite: false });
  return new THREE.Points(geo, mat);
}

// ---------------------------------------------------------------- the script
class SharedSpace extends xb.Script {
  async init() {
    this.world = new THREE.Group(); // everything placed; locomotion moves this
    this.add(this.world);

    this.spark = new SparkRenderer({
      renderer: xb.core.renderer,
      maxStdDev: PROFILE.maxStdDev,
      maxPixelRadius: PROFILE.maxPixelRadius, // a leaf against your face is the costliest splat
      minAlpha: PROFILE.minAlpha, // skip nearly invisible residue
    });
    if (PROFILE.foveation) xb.core.renderer.xr.setFoveation(PROFILE.foveation);
    xb.scene.add(this.spark);

    if (G.mode === 'vr') {
      xb.scene.background = new THREE.Color(0x060606);
      xb.core.renderer.setClearColor(0x060606, 1);
      this.world.add(makeFloorDust(RING + 8, PROFILE.dust));
    }

    this.title = makeTitle();
    xb.scene.add(this.title);

    this.places = []; // per scene: { scene, cfg, u, mesh, cams, center, view, viewFwd, camW }
    this.stops = []; // travel stops: plaza + each place's viewpoint
    this.stop = 0;
    this.showCams = false;
    this.frame = 0;
    this.lastT = performance.now() / 1000;
    this.buttons = {};
    this.turnLatch = {};
    this._head = new THREE.Vector3();
    this.zone = null;

    this.phase = 'arriving';
    this.phaseT = 0;
    this.force = 1;

    xb.core.renderer.xr.addEventListener('sessionstart', () => this.bindSession());

    setStatus('Loading places…');
    const n = SCENES.length;
    await Promise.all(SCENES.map((scene, i) => this.loadPlace(scene, i, n)));
    this.places.sort((a, b) => a.order - b.order);

    this.stops = [
      { label: 'Plaza', sub: 'the centre', pos: new THREE.Vector3(0, G.eye, 0), fwd: new THREE.Vector3(0, 0, -1) },
      ...this.places.map((p) => ({ label: p.scene.label, sub: 'capture viewpoint', pos: p.view, fwd: p.viewFwd, place: p })),
    ];
    const total = this.places.reduce((s, p) => s + (p.mesh.numSplats ?? 0), 0);
    setStatus(`${PROFILE.name} profile · ${this.places.length} places · ${(total / 1000).toFixed(0)}k splats`);
    this.updatePanel('Plaza');
    this.showTitle('Plaza', `${this.places.length} places around you`);
    this.phase = 'arriving';
    this.phaseT = 0;
  }

  // ------------------------------------------------------------ places
  async loadPlace(scene, i, n) {
    const cfg = settingsFor(scene);
    const u = createViewconeUniforms(cfg);
    u.debug.value = G.debug ? 1 : 0;
    u.force.value = 1;
    const splatUrl = PROFILE.lite && scene.splatLite ? scene.splatLite : scene.splat;
    const mesh = new SplatMesh({ url: splatUrl, worldModifier: createViewconeModifier(u) });
    const [cams] = await Promise.all([scene.cams ? camerasFromUrl(scene.cams).catch(() => []) : [], mesh.initialized]);

    // base orientation of the capture frame
    const qb = new THREE.Quaternion();
    if (cfg.flip) qb.set(1, 0, 0, 0);
    if (cfg.rotY) qb.premultiply(qYaw(THREE.MathUtils.degToRad(cfg.rotY)));

    // anchor: subject centre on the ground, and the side it was photographed from
    const a = scene.anchor || {};
    const c = new THREE.Vector3(...(a.center || [0, 0, 0])).applyQuaternion(qb);
    const midCam = cams[Math.floor(cams.length / 2)];
    const v = a.view ? new THREE.Vector3(...a.view) : midCam ? midCam.position.clone() : new THREE.Vector3(0, 0, 1);
    v.applyQuaternion(qb);
    const side = new THREE.Vector3(v.x - c.x, 0, v.z - c.z);

    // slot on the ring, clockwise from straight ahead (-Z)
    const ang = (i / n) * Math.PI * 2;
    const slot = new THREE.Vector3(RING * Math.sin(ang), 0, -RING * Math.cos(ang));
    const toCentre = slot.clone().negate();
    const yaw = yawOf(toCentre) - yawOf(side);

    mesh.quaternion.copy(qb).premultiply(qYaw(yaw));
    const cRot = c.clone().applyQuaternion(qYaw(yaw));
    mesh.position.set(slot.x - cRot.x, -cRot.y, slot.z - cRot.z);
    mesh.updateMatrix();
    mesh.updateMatrixWorld(true);
    this.world.add(mesh);

    // travel target: the middle capture camera, at eye height above this ground
    const view = midCam ? midCam.position.clone().applyMatrix4(mesh.matrix) : slot.clone().addScaledVector(toCentre.clone().normalize(), 3);
    view.y = G.eye;
    const viewFwd = midCam
      ? midCam.forward.clone().applyQuaternion(mesh.quaternion).setY(0).normalize()
      : toCentre.clone().negate().normalize();

    const place = {
      scene, cfg, u, mesh, cams, order: i, center: slot, view, viewFwd,
      camW: cams.map(() => ({ p: new THREE.Vector3(), f: new THREE.Vector3(), cos: 1, d2: 0 })),
      gizmo: this.makeGizmo(mesh, cams),
    };
    this.places.push(place);
    this.updateCameras(place);
    mesh.updateVersion();
  }

  makeGizmo(mesh, cams) {
    if (!cams.length) return null;
    const pts = [];
    for (const c of cams) pts.push(c.position, c.position.clone().addScaledVector(c.forward, 0.12));
    const g = new THREE.LineSegments(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0xffb24a, transparent: true, opacity: 0.9 })
    );
    g.visible = this.showCams;
    mesh.add(g);
    return g;
  }

  // ------------------------------------------------------------ travel
  go(delta) {
    if (!this.stops.length || this.phase === 'leaving') return;
    const n = this.stops.length;
    this.pendingStop = (((this.stop + delta) % n) + n) % n;
    this.phase = 'leaving';
    this.phaseT = 0;
    this.leaveFrom = this.force;
  }

  /** Re-anchor the world so `stop` is under your head, facing where you look. */
  jumpTo(index) {
    this.stop = index;
    const s = this.stops[index];
    const cam = xb.core.camera;
    const look = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.getWorldQuaternion(new THREE.Quaternion())).setY(0);
    if (look.lengthSq() < 1e-6) look.set(0, 0, -1);
    const phi = yawOf(look) - yawOf(s.fwd);
    const t = s.pos.clone().applyQuaternion(qYaw(phi));
    this.world.quaternion.copy(qYaw(phi));
    this.world.position.set(this._head.x - t.x, 0, this._head.z - t.z);
    this.world.updateMatrixWorld(true);
    this.showTitle(s.label, s.sub);
    this.updatePanel(s.label);
    this.zone = s.place?.scene.id ?? null;
  }

  // ------------------------------------------------------------ per frame
  update(_time, frame) {
    const now = performance.now() / 1000;
    const dt = Math.min(0.1, now - this.lastT);
    this.lastT = now;
    this.frame++;

    if (frame) this.handleXRInput(frame, dt);
    xb.core.camera.getWorldPosition(this._head);

    this.updateTransition(dt);
    this.updateTitle(dt);

    const phase = ((now % G.loop) / G.loop) * Math.PI * 2;
    const inTransition = this.phase !== 'idle';
    this.world.updateMatrixWorld(true);

    for (const p of this.places) {
      p.u.phase.value = phase;
      p.u.force.value = this.force;
      p.u.head.value.copy(this._head);
      const centreW = p.center.clone().applyMatrix4(this.world.matrixWorld);
      const d = Math.hypot(centreW.x - this._head.x, centreW.z - this._head.z);
      p.dist = d;
      // near places every frame; far ones every Nth frame, staggered.
      // During a stop transition everything moves, but every other frame is
      // enough for a dissolve.
      const due = inTransition
        ? (this.frame + p.order) % 2 === 0
        : d < G.near || (this.frame + p.order) % PROFILE.farEvery === 0;
      if (due) {
        this.updateCameras(p);
        p.mesh.updateVersion();
      }
    }
    this.updateZone();
  }

  updateTransition(dt) {
    this.phaseT += dt;
    if (this.phase === 'leaving') {
      const k = Math.min(1, this.phaseT / G.leave);
      this.force = this.leaveFrom + (1 - this.leaveFrom) * smooth(k);
      if (k >= 1) {
        this.jumpTo(this.pendingStop);
        this.phase = 'arriving';
        this.phaseT = 0;
      }
    } else if (this.phase === 'arriving') {
      const k = Math.min(1, this.phaseT / G.arrive);
      this.force = 1 - smooth(k);
      if (k >= 1) this.phase = 'idle';
    }
  }

  updateCameras(p) {
    if (!p.cams.length) return;
    const m = p.mesh.matrixWorld;
    const nrm = new THREE.Matrix3().getNormalMatrix(m);
    for (let i = 0; i < p.cams.length; i++) {
      const w = p.camW[i];
      w.p.copy(p.cams[i].position).applyMatrix4(m);
      w.f.copy(p.cams[i].forward).applyMatrix3(nrm).normalize();
      w.cos = Math.cos(p.cams[i].halfFov);
      w.d2 = w.p.distanceToSquared(this._head);
    }
    const order = p.camW.slice().sort((a, b) => a.d2 - b.d2);
    const k = Math.min(MAX_CAMS, PROFILE.maxCams, order.length);
    for (let j = 0; j < k; j++) {
      p.u.pos[j].value.copy(order[j].p);
      p.u.fwd[j].value.copy(order[j].f);
      p.u.cosFov[j].value = order[j].cos;
    }
    p.u.ncam.value = k;
  }

  /** Name a place when you walk into it. */
  updateZone() {
    if (this.phase !== 'idle' || !this.places.length) return;
    let nearest = null;
    for (const p of this.places) if (!nearest || p.dist < nearest.dist) nearest = p;
    const id = nearest.dist < 6.5 ? nearest.scene.id : nearest.dist > RING - 4 ? null : this.zone;
    if (id === this.zone) return;
    this.zone = id;
    const label = id ? nearest.scene.label : 'Plaza';
    this.updatePanel(label);
    if (id) this.showTitle(label, 'you walked in');
  }

  updatePanel(label) {
    if (sceneEl) sceneEl.textContent = label;
  }

  // ------------------------------------------------------------ title
  showTitle(text, sub) {
    this.title.userData.write(text, sub);
    const cam = xb.core.camera;
    const pos = cam.getWorldPosition(new THREE.Vector3());
    const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.getWorldQuaternion(new THREE.Quaternion())).setY(0).normalize();
    this.title.position.copy(pos).addScaledVector(dir, 1.6);
    this.title.position.y = pos.y - 0.15;
    this.title.lookAt(pos.x, this.title.position.y, pos.z);
    this.title.visible = true;
    this.titleT = 0;
  }

  updateTitle(dt) {
    if (!this.title.visible) return;
    this.titleT += dt;
    const t = this.titleT;
    const o = t < 0.6 ? t / 0.6 : t < 3 ? 1 : Math.max(0, 1 - (t - 3) / 1.2);
    this.title.material.opacity = 0.85 * o;
    if (o <= 0) this.title.visible = false;
  }

  // ------------------------------------------------------------ input
  bindSession() {
    const session = xb.core.renderer.xr.getSession();
    if (!session || session.__viewconeBound) return;
    session.__viewconeBound = true;
    // 'select' = trigger on controllers, pinch with hand tracking
    session.addEventListener('select', (e) => this.go(e.inputSource.handedness === 'left' ? -1 : 1));
  }

  handleXRInput(frame, dt) {
    const session = frame.session;
    if (!session) return;
    this.bindSession();
    const camera = xb.core.camera;
    for (const src of session.inputSources) {
      const gp = src.gamepad;
      if (!gp || gp.axes.length < 4) continue;
      const hand = src.handedness;
      const ax = Math.abs(gp.axes[2]) > 0.15 ? gp.axes[2] : 0;
      const ay = Math.abs(gp.axes[3]) > 0.15 ? gp.axes[3] : 0;
      if (hand === 'left' && (ax || ay)) {
        const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.getWorldQuaternion(new THREE.Quaternion())).setY(0).normalize();
        const right = new THREE.Vector3().crossVectors(fwd, Y);
        const move = fwd.multiplyScalar(-ay).add(right.multiplyScalar(ax)).multiplyScalar(G.speed * dt);
        this.world.position.sub(move);
      }
      if (hand === 'right') {
        if (ay) this.world.position.y += ay * G.speed * 0.6 * dt;
        if (Math.abs(gp.axes[2]) > 0.7 && !this.turnLatch[hand]) {
          this.turnLatch[hand] = true;
          this.snapTurn(Math.sign(gp.axes[2]) * THREE.MathUtils.degToRad(30));
        } else if (Math.abs(gp.axes[2]) < 0.3) {
          this.turnLatch[hand] = false;
        }
      }
      const prev = this.buttons[hand] || [];
      const pressed = gp.buttons.map((b) => b.pressed);
      if (pressed[4] && !prev[4]) this.toggleCams();
      if (pressed[5] && !prev[5]) this.toggleDebug();
      this.buttons[hand] = pressed;
    }
  }

  snapTurn(angle) {
    const head = this._head;
    this.world.position.sub(head).applyMatrix4(new THREE.Matrix4().makeRotationY(angle)).add(head);
    this.world.quaternion.premultiply(qYaw(angle));
  }

  toggleCams() {
    this.showCams = !this.showCams;
    for (const p of this.places) if (p.gizmo) p.gizmo.visible = this.showCams;
  }

  toggleDebug() {
    const on = this.places[0]?.u.debug.value > 0.5 ? 0 : 1;
    for (const p of this.places) p.u.debug.value = on;
  }

  onKeyDown(event) {
    if (event.code === 'KeyN' || event.code === 'ArrowRight' || event.code === 'PageDown') this.go(1);
    if (event.code === 'KeyP' || event.code === 'ArrowLeft' || event.code === 'PageUp') this.go(-1);
    if (event.code === 'KeyC') this.toggleCams();
    if (event.code === 'KeyV') this.toggleDebug();
  }

  dispose() {
    this.spark?.dispose?.();
  }
}

// ---------------------------------------------------------------- start
const app = new SharedSpace();
const options = new xb.Options();
options.antialias = false; // Quest Browser: MSAA + Spark readbacks can hang
options.setFramebufferScaleFactor(PROFILE.fbScale);
if (G.mode === 'vr') {
  options.enableVR();
  options.simulator.environments = [{ manifestPath: './sim/void.json' }];
  options.simulator.activeEnvironmentIndex = 0;
}
xb.add(app);
await xb.init(options);

document.getElementById('prevScene')?.addEventListener('click', () => app.go(-1));
document.getElementById('nextScene')?.addEventListener('click', () => app.go(1));
