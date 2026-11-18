# Viewcone Erosion — Experiment 1 (WebXR · Meta Quest 3)

A Gaussian-splat capture stays photographic where the original camera stood and
erodes into drifting motes wherever you view it from a place nobody
photographed it from. Walking is the interaction: step off the capture path and
the place forgets itself; step back and it re-forms.

Built with **XR Blocks 0.24** (scene, XR session, desktop simulator), **Spark
2.4** (Gaussian-splat rendering, per-splat GPU modifier) and **three.js r186**.

---

## Run it

Requires Node 20+.

```bash
npm install
npm run dev          # https://<your-computer-ip>:5173  (self-signed HTTPS)
```

**On the Quest 3** (same Wi-Fi as your computer):

1. Open Meta Quest Browser → `https://<your-computer-ip>:5173`.
2. Accept the certificate warning (Advanced → Proceed). WebXR needs HTTPS.
3. Press **Enter XR**.

Alternatives to the LAN certificate:

- USB: `adb reverse tcp:5173 tcp:5173`, then open `https://localhost:5173` on the headset.
- Static hosting: `npm run build` and upload `dist/` to any HTTPS host
  (GitHub Pages, Netlify, Vercel, Cloudflare Pages). A prebuilt `dist/` is
  included in this folder.

**On a desktop** the same URL opens the XR Blocks simulator (WASD + right-drag).

## Scenes

Four captures from
[expanded-interface/PLY_Files](https://github.com/expanded-interface/PLY_Files)
are bundled; pick one in the panel or with `?scene=`.

| Scene | Content | Points | Notes |
| --- | --- | --- | --- |
| `D02` (default) | Great trunk with moss and roots | 308k | Densest; best showcase |
| `N04` | Trunk with a hollow, foliage around | 123k | |
| `Ginebra` | Stone bench under trees | 61k | Sparser; larger motes |
| `D05` | Foliage | 17k | Very sparse; reads as pointillist |
| `demo` | Procedural test clearing | 150k | Synthetic |

The source files are plain coloured point clouds (x, y, z, RGB, Y up), with no
splat attributes and no camera poses. `tools/prepare_scene.py` converts them:

- **Surfels.** Each point becomes a flat Gaussian disc lying in its local
  surface (PCA normal of its 12 neighbours), sized by local point spacing, so
  bark and stone read as surfaces up close. Isolated points stay as faint
  atmosphere (22% opacity).
- **Authored capture viewpoints.** Since there are no poses, the script finds
  the main subject (densest vertical structure), the ground, and the side with
  the most surface detail, then places 15 virtual cameras along a 150° arc at
  1.6 m eye height, about 2 m from the subject, aimed at it. You start at the
  middle one. If you have the real poses for these captures (COLMAP
  `images.txt` or `cameras.json`), load them instead: the piece is about where
  the photographer actually stood.

```bash
python3 tools/prepare_scene.py path/to/cloud.ply public/scenes MYID \
  [--arc 150] [--count 15] [--radius 3.5] [--azimuth 90]
```

Then add an entry to `public/scenes/scenes.json`.

## What you see first

You start at the middle authored camera of `D02`, facing the trunk: the bark is
photographic. Walk or stick-move around the trunk. The far side was never
"photographed" and is mostly residue, and the upper trunk, outside every
camera's view cone, is already eroding above you.

## Controls

| Input | Action |
| --- | --- |
| Walk (room scale) | The primary interaction |
| Left stick | Move, head-relative |
| Right stick ← → | Snap turn 30° |
| Right stick ↑ ↓ | Move up / down |
| A / X | Show capture cameras (orange lines: position + view direction) |
| B / Y | Debug colours: blue = observed, amber = eroding |
| Desktop: C / V | Same as A/X and B/Y |

## Use your own capture

Two ways:

- **Panel (before entering XR):** pick a `.ply` / `.spz` / `.splat` file and
  your camera file(s).
- **URL:** `?splat=<url>&cams=<url>` (files must be served with CORS).

Camera formats:

| Trainer / tool | File to give | Notes |
| --- | --- | --- |
| Inria 3DGS trainer | `cameras.json` (in the output folder) | Same frame as `point_cloud.ply` |
| COLMAP | `images.txt` (+ `cameras.txt` for field of view) | Convert binary models: `colmap model_converter --input_path sparse/0 --output_path sparse_txt --output_type TXT` |
| Trainers that re-centre or rescale the scene (e.g. Nerfstudio) | COLMAP files plus that tool's transform | The splat and cameras must share one frame. Press A/X: the orange lines should sit where you stood. |

With a real capture, you start at the middle capture camera, at 1.6 m eye
height, at the capture's own scale. A splat with no cameras is shrunk to a
1.2 m "memory diorama" in front of you, with a virtual 110° capture arc.

**Splat budget on Quest 3:** about 300k–500k. The modifier regenerates every
splat every frame, so this is below Spark's own ~1M guidance for static
scenes. Reduce first: lower the trainer's splat cap, or use GSOPs Reduce in Houdini.

## Parameters (URL)

| Param | Default | Meaning |
| --- | --- | --- |
| `a0` | 12 | Degrees off a capture ray below which matter is fully intact |
| `a1` | 50 | Degrees above which matter is fully eroded |
| `haze` | 0.7 | Erosion level (0–1) where motes start thinning out |
| `residue` | 0.3 | Opacity left when fully eroded (0 = vanish) |
| `mote` | 0.008 | Mote radius in metres |
| `amp` | 0.06 | Drift amplitude in metres when fully eroded |
| `freq` | 3 | Drift field frequency (1/m) |
| `loop` | 12 | Drift loop in seconds; motion repeats exactly |
| `mode` | `vr` | `ar` = passthrough: the memory floats in your room |
| `flip` | 1 | Rotate COLMAP y-down to y-up (set 0 if upside down) |
| `fit` | auto | `1` = diorama, `0` = real scale at a capture camera |
| `scale` | 1 | Scale when not fitting |
| `startCam` | middle | Index of the capture camera you start at |
| `eye` | 1.6 | Eye height in metres when starting at a camera |
| `rotY` | 0 | Extra yaw of the capture, degrees |
| `offset`, `turn` | — | Start this far (x,y,z metres) / degrees from the camera |
| `speed` | 1.2 | Stick locomotion, m/s |
| `debug` | 0 | `1` = start in debug colours |

Example: `?splat=./my/scene.ply&cams=./my/cameras.json&a0=8&a1=35&residue=0.15`

## How it works

`src/viewcone.js` injects a Spark **world modifier** (a dyno GLSL block) that
runs per splat on the GPU each frame:

1. Choose the 8 capture cameras nearest your head (CPU), pass them as uniforms.
2. For each splat: among those cameras whose view cone contains the splat,
   find the smallest angle between *splat→head* and *splat→camera*.
3. `e = smoothstep(a0, a1, angle)`; as `e` rises the splat's covariance
   collapses to an isotropic mote, it drifts on a loop-safe field (time enters
   only through cos/sin of a phase), and its opacity falls to `residue`.

`src/cameras.js` parses `cameras.json` and COLMAP text models into the
splat's local frame. `src/main.js` is the XR Blocks script: placement,
locomotion, gizmos, file loading.

## Known limitations

- **No occlusion test.** A camera "observes" every splat inside its view cone,
  even one behind a wall. Fine for open scenes; for rooms, precompute per-splat
  visibility offline (depth test against each training view) and store it as a
  per-splat attribute.
- **Cone, not frustum.** The rectangular image frustum is approximated by a
  cone using the larger half field of view, so image corners count as seen.
- **8 nearest cameras.** For each splat the best-angle camera is almost always
  among those nearest your head, but not always; long thin captures can show
  small seams. Raise `MAX_CAMS` in `viewcone.js` (cost is linear).
- **XR Blocks on Quest.** XR Blocks officially targets Chrome on Android XR and
  the desktop simulator. Quest Browser is Chromium-based, so the core path used
  here (three.js render loop, WebXR session, controllers) should behave the
  same, but its Android XR extras (depth, some gestures, AI features) are not
  used here and are not guaranteed on Quest.
- **Not yet tested on a headset.** Verified in desktop Chrome through the XR
  Blocks simulator. Check frame rate in the headset with the Quest Browser
  performance overlay or remote DevTools.
- Antialiasing is off on purpose: Quest Browser has a reported hang combining
  MSAA, per-frame shadow passes and Spark's GPU readbacks.

## Files

```
index.html            panel + entry
src/main.js           XR Blocks script: load, place, locomotion, input
src/viewcone.js       Spark dyno modifier (the erosion)
src/cameras.js        cameras.json / COLMAP parsers, virtual capture arc
src/style.css         panel styling
public/scenes/        D02, N04, Ginebra, D05 as surfel splats + authored cameras; scenes.json
public/demo/          bundled procedural test capture (150k splats, 13 cameras)
tools/prepare_scene.py     point cloud -> surfel splats + authored cameras
public/sim/void.json  empty desktop-simulator environment for VR mode
tools/make_demo_scene.py   regenerates the demo capture
dist/                 prebuilt static site
```
