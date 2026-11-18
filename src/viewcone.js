// Viewcone Erosion as a Spark world-space splat modifier.
//
// Per splat, per frame (on the GPU):
//   1. Angle between "splat -> viewer's head" and "splat -> each nearby capture
//      camera that had this splat inside its view cone". Keep the smallest.
//   2. e = smoothstep(a0, a1, angle): 0 = observed (intact), 1 = never seen
//      from here (eroded).
//   3. As e rises, the splat's covariance collapses to a small round mote, it
//      drifts on a periodic field, and its opacity falls; past the haze
//      threshold it settles to a faint residue of motes.
//
// The K capture cameras nearest the head are chosen on the CPU each frame and
// passed as uniforms. That is an approximation: the camera with the smallest
// angle for a given splat is almost always among those nearest the viewer.

import * as THREE from 'three';
import { dyno } from '@sparkjsdev/spark';

export const MAX_CAMS = 8;

// Spark keeps its unindent helpers private, so a local one.
function unindent(src) {
  const lines = src.replace(/^\n/, '').split('\n');
  const pad = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(pad)).join('\n');
}

const GLSL_HELPERS = unindent(`
  // Smooth, cheap, loop-safe drift field. Time enters only through cos/sin of
  // a phase angle, so the motion repeats exactly every loop.
  vec3 vcDrift(vec3 p, float th) {
    vec3 q = p + vec3(cos(th), sin(th), cos(th + 1.7)) * 0.9;
    return 0.5 * vec3(
      sin(q.y * 1.7 + sin(q.z * 1.3)) + sin(q.z * 2.3 + 1.1),
      sin(q.z * 1.9 + sin(q.x * 1.1)) + sin(q.x * 2.1 + 2.3),
      sin(q.x * 1.5 + sin(q.y * 1.7)) + sin(q.y * 2.7 + 0.7)
    );
  }
  float vcHash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
  }
`);

/** Creates the uniforms (dyno values) that the app updates every frame. */
export function createViewconeUniforms(params) {
  const u = {
    head: dyno.dynoVec3(new THREE.Vector3()),
    ncam: dyno.dynoInt(0),
    a0: dyno.dynoFloat(THREE.MathUtils.degToRad(params.a0)),
    a1: dyno.dynoFloat(THREE.MathUtils.degToRad(params.a1)),
    haze: dyno.dynoFloat(params.haze),
    residue: dyno.dynoFloat(params.residue),
    mote: dyno.dynoFloat(params.mote),
    amp: dyno.dynoFloat(params.amp),
    freq: dyno.dynoFloat(params.freq),
    phase: dyno.dynoFloat(0),
    force: dyno.dynoFloat(0), // 0..1: erode everything (scene transitions)
    debug: dyno.dynoFloat(0),
    pos: [],
    fwd: [],
    cosFov: [],
  };
  for (let k = 0; k < MAX_CAMS; k++) {
    u.pos.push(dyno.dynoVec3(new THREE.Vector3()));
    u.fwd.push(dyno.dynoVec3(new THREE.Vector3(0, 0, -1)));
    u.cosFov.push(dyno.dynoFloat(1));
  }
  return u;
}

/** Builds the GsplatModifier: { gsplat } -> { gsplat }. */
export function createViewconeModifier(u) {
  const inTypes = {
    gsplat: dyno.Gsplat,
    head: 'vec3',
    ncam: 'int',
    a0: 'float',
    a1: 'float',
    haze: 'float',
    residue: 'float',
    mote: 'float',
    amp: 'float',
    freq: 'float',
    phase: 'float',
    force: 'float',
    debug: 'float',
  };
  for (let k = 0; k < MAX_CAMS; k++) {
    inTypes[`p${k}`] = 'vec3';
    inTypes[`f${k}`] = 'vec3';
    inTypes[`c${k}`] = 'float';
  }

  return dyno.dynoBlock({ gsplat: dyno.Gsplat }, { gsplat: dyno.Gsplat }, ({ gsplat }) => {
    const inputs = {
      gsplat,
      head: u.head,
      ncam: u.ncam,
      a0: u.a0,
      a1: u.a1,
      haze: u.haze,
      residue: u.residue,
      mote: u.mote,
      amp: u.amp,
      freq: u.freq,
      phase: u.phase,
      force: u.force,
      debug: u.debug,
    };
    for (let k = 0; k < MAX_CAMS; k++) {
      inputs[`p${k}`] = u.pos[k];
      inputs[`f${k}`] = u.fwd[k];
      inputs[`c${k}`] = u.cosFov[k];
    }

    const out = dyno.dyno({
      inTypes,
      outTypes: { gsplat: dyno.Gsplat },
      inputs,
      globals: () => [GLSL_HELPERS],
      statements: ({ inputs: i, outputs: o }) => {
        const camChecks = [];
        for (let k = 0; k < MAX_CAMS; k++) {
          camChecks.push(`
            if (${k} < ${i.ncam}) {
              vec3 toCam = ${i[`p${k}`]} - P;
              vec3 dc = toCam / max(length(toCam), 1e-4);
              // inside that camera's view cone?
              if (dot(-dc, ${i[`f${k}`]}) > ${i[`c${k}`]}) {
                best = min(best, acos(clamp(dot(toHead, dc), -1.0, 1.0)));
              }
            }`);
        }
        return unindent(`
          ${o.gsplat} = ${i.gsplat};
          vec3 P = ${i.gsplat}.center;
          vec3 toHead = normalize(${i.head} - P);
          float best = 3.14159265;
          ${camChecks.join('\n')}

          float e = max(smoothstep(${i.a0}, ${i.a1}, best), ${i.force});
          float eHaze = smoothstep(${i.haze}, 1.0, e);

          // 1. shape: anisotropic splat -> small isotropic mote
          vec3 s = ${i.gsplat}.scales;
          float sMean = (s.x + s.y + s.z) / 3.0;
          vec3 sMote = vec3(min(sMean, ${i.mote}));
          ${o.gsplat}.scales = mix(s, sMote, e);

          // 2. motion: loop-safe drift, amplitude grows with erosion
          float jitter = vcHash(floor(P * 37.0));
          vec3 d = vcDrift(P * ${i.freq}, ${i.phase} + jitter * 0.6);
          ${o.gsplat}.center = P + d * ${i.amp} * e * (0.6 + 0.8 * jitter);

          // 3. presence: thin out, then settle into a residual haze of motes
          float a = ${i.gsplat}.rgba.a;
          a *= mix(1.0, 0.55, e);
          a *= 1.0 - eHaze * (1.0 - ${i.residue});
          ${o.gsplat}.rgba.a = a;

          // debug: blue = observed, amber = eroding
          if (${i.debug} > 0.5) {
            vec3 dbg = mix(vec3(0.25, 0.45, 1.0), vec3(1.0, 0.62, 0.2), e);
            ${o.gsplat}.rgba.rgb = mix(${i.gsplat}.rgba.rgb, dbg, 0.8);
            ${o.gsplat}.rgba.a = max(${o.gsplat}.rgba.a, 0.35 * ${i.gsplat}.rgba.a);
          }
        `).split('\n');
      },
    }).outputs.gsplat;

    return { gsplat: out };
  });
}
