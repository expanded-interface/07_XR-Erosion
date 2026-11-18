// Capture-camera parsers. Every parser returns cameras in the splat's own
// (local, pre-transform) coordinate frame:
//   { position: THREE.Vector3, forward: THREE.Vector3 (unit), halfFov: radians, name }
//
// Supported:
//   - cameras.json from the Inria 3DGS trainer (and tools that copy its format)
//   - COLMAP text model: images.txt (+ optional cameras.txt for field of view)

import * as THREE from 'three';

const DEFAULT_HALF_FOV = THREE.MathUtils.degToRad(35);

/** Inria 3DGS cameras.json: rotation is camera-to-world, rows as nested arrays. */
export function parseCamerasJson(json) {
  const list = Array.isArray(json) ? json : json.cameras || json.frames;
  if (!Array.isArray(list)) throw new Error('cameras.json: expected an array');
  return list
    .filter((c) => Array.isArray(c.position) && Array.isArray(c.rotation))
    .map((c) => {
      const r = c.rotation;
      // COLMAP / OpenCV camera looks down +Z; world forward = R_c2w * (0,0,1).
      const forward = new THREE.Vector3(r[0][2], r[1][2], r[2][2]).normalize();
      let halfFov = DEFAULT_HALF_FOV;
      if (c.fx && c.width) {
        const hx = Math.atan(c.width / (2 * c.fx));
        const hy = c.fy && c.height ? Math.atan(c.height / (2 * c.fy)) : hx;
        halfFov = Math.max(hx, hy);
      }
      return {
        name: c.img_name ?? String(c.id ?? ''),
        position: new THREE.Vector3(...c.position),
        forward,
        halfFov,
      };
    });
}

/** COLMAP cameras.txt -> Map(cameraId -> halfFov). */
export function parseColmapCamerasTxt(text) {
  const fov = new Map();
  for (const line of text.split('\n')) {
    const s = line.trim();
    if (!s || s.startsWith('#')) continue;
    const [id, , w, h, ...params] = s.split(/\s+/);
    const W = Number(w);
    const H = Number(h);
    const fx = Number(params[0]);
    // SIMPLE_* models have one focal length; PINHOLE/OPENCV have fx, fy.
    const fy = params.length >= 4 && !Number.isNaN(Number(params[1])) ? Number(params[1]) : fx;
    if (fx > 0) {
      fov.set(id, Math.max(Math.atan(W / (2 * fx)), Math.atan(H / (2 * fy))));
    }
  }
  return fov;
}

/**
 * COLMAP images.txt. Each image takes two lines; the second (2D points) may be
 * empty, so comment lines are dropped but empty lines are kept for pairing.
 * QW QX QY QZ TX TY TZ is world-to-camera.
 */
export function parseColmapImagesTxt(text, fovById = new Map()) {
  const lines = text.split('\n').filter((l) => !l.trimStart().startsWith('#'));
  const cams = [];
  for (let i = 0; i < lines.length; i += 2) {
    const parts = lines[i].trim().split(/\s+/);
    if (parts.length < 10) continue;
    const [, qw, qx, qy, qz, tx, ty, tz, camId, ...nameParts] = parts;
    const q = new THREE.Quaternion(+qx, +qy, +qz, +qw).normalize();
    const R = new THREE.Matrix4().makeRotationFromQuaternion(q); // w2c rotation
    const Rt = R.clone().transpose(); // c2w rotation
    const t = new THREE.Vector3(+tx, +ty, +tz);
    const position = t.clone().applyMatrix4(Rt).negate(); // C = -R^T t
    const forward = new THREE.Vector3(0, 0, 1).applyMatrix4(Rt).normalize();
    cams.push({
      name: nameParts.join(' '),
      position,
      forward,
      halfFov: fovById.get(camId) ?? DEFAULT_HALF_FOV,
    });
  }
  return cams;
}

/**
 * Accepts the File objects the person picked and returns cameras, trying each
 * format by content rather than by file name.
 */
export async function camerasFromFiles(files) {
  const texts = await Promise.all([...files].map(async (f) => ({ name: f.name, text: await f.text() })));
  const json = texts.find((t) => t.text.trimStart().startsWith('[') || t.text.trimStart().startsWith('{'));
  if (json) return parseCamerasJson(JSON.parse(json.text));
  const camsTxt = texts.find((t) => /cameras\.txt$/i.test(t.name));
  const imgsTxt = texts.find((t) => /images\.txt$/i.test(t.name)) ?? texts.find((t) => t !== camsTxt);
  if (!imgsTxt) throw new Error('No cameras.json or images.txt found');
  const fov = camsTxt ? parseColmapCamerasTxt(camsTxt.text) : new Map();
  return parseColmapImagesTxt(imgsTxt.text, fov);
}

export async function camerasFromUrl(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`cameras: HTTP ${res.status}`);
  const text = await res.text();
  if (/\.json(\?|$)/i.test(url) || text.trimStart().startsWith('[')) {
    return parseCamerasJson(JSON.parse(text));
  }
  return parseColmapImagesTxt(text);
}

/**
 * Demo fallback when no capture cameras exist: an arc of virtual cameras in
 * front of the subject, as if someone had photographed it from one side only.
 * Built in WORLD space, returned in the splat's local frame.
 */
export function syntheticArc({ center, radius, arcDeg = 110, count = 11, height = 0, toLocal }) {
  const cams = [];
  for (let i = 0; i < count; i++) {
    const a = THREE.MathUtils.degToRad(-arcDeg / 2 + (arcDeg * i) / (count - 1));
    const pos = new THREE.Vector3(
      center.x + Math.sin(a) * radius,
      center.y + height,
      center.z + Math.cos(a) * radius
    );
    const fwdWorld = center.clone().sub(pos).normalize();
    const localPos = pos.clone().applyMatrix4(toLocal);
    const localTip = pos.clone().add(fwdWorld).applyMatrix4(toLocal);
    cams.push({
      name: `virtual-${i}`,
      position: localPos,
      forward: localTip.sub(localPos).normalize(),
      halfFov: THREE.MathUtils.degToRad(30),
    });
  }
  return cams;
}
