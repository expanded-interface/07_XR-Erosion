"""Procedural test capture for Viewcone Erosion.

Writes public/demo/clearing.ply (3DGS binary PLY, COLMAP y-down frame) and
public/demo/cameras.json (Inria 3DGS format) for a small clearing that was
"photographed" only along a 90-degree arc on one side.

It is a stand-in so the app runs before you have a real capture; replace it
with your own trained splat and cameras.json.

    python3 tools/make_demo_scene.py
"""

import json
import math
import os

import numpy as np

rng = np.random.default_rng(7)
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "demo")
os.makedirs(OUT, exist_ok=True)

parts = []  # (pos[N,3], col[N,3] 0..1, scale[N,3] metres, quat[N,4] wxyz, alpha[N])


def rand_quat(n):
    q = rng.normal(size=(n, 4))
    return q / np.linalg.norm(q, axis=1, keepdims=True)


def add(pos, col, scale, quat=None, alpha=None):
    n = len(pos)
    parts.append((
        pos,
        np.clip(col, 0, 1),
        scale,
        rand_quat(n) if quat is None else quat,
        np.full(n, 0.9) if alpha is None else alpha,
    ))


# ground: mossy disc with leaf litter, flat splats
n = 45000
r = 3.2 * np.sqrt(rng.random(n))
a = rng.random(n) * 2 * np.pi
pos = np.stack([r * np.cos(a), rng.normal(0, 0.01, n), r * np.sin(a)], 1)
moss = np.array([0.28, 0.36, 0.16])
litter = np.array([0.45, 0.33, 0.2])
mix = rng.random(n)[:, None] ** 2
col = moss * (1 - mix) + litter * mix + rng.normal(0, 0.04, (n, 3))
scale = np.stack([rng.uniform(0.015, 0.04, n), np.full(n, 0.003), rng.uniform(0.015, 0.04, n)], 1)
yaw = rng.random(n) * np.pi
quat = np.stack([np.cos(yaw / 2), np.zeros(n), np.sin(yaw / 2), np.zeros(n)], 1)
add(pos, col, scale, quat)

# trees: trunk + canopy
trees = [(-1.1, -0.6, 2.4), (0.9, -1.2, 2.8), (0.2, 0.9, 2.1), (-0.4, -1.9, 3.0), (1.7, 0.4, 2.3), (-1.9, 0.8, 2.6)]
for tx, tz, h in trees:
    n = 5000
    t = rng.random(n) * h
    ang = rng.random(n) * 2 * np.pi
    rad = 0.09 * (1.2 - 0.5 * t / h)
    pos = np.stack([tx + rad * np.cos(ang), t, tz + rad * np.sin(ang)], 1)
    bark = np.array([0.33, 0.26, 0.2]) + rng.normal(0, 0.05, (n, 3))
    scale = np.stack([np.full(n, 0.012), rng.uniform(0.03, 0.06, n), np.full(n, 0.012)], 1)
    quat = np.tile([1.0, 0, 0, 0], (n, 1))
    add(pos, bark, scale, quat)

    n = 9000
    c = np.array([tx, h * 0.92, tz])
    d = rng.normal(size=(n, 3))
    d /= np.linalg.norm(d, axis=1, keepdims=True)
    rr = (rng.random(n)[:, None] ** 0.6) * np.array([0.75, 0.55, 0.75]) * (0.8 + 0.4 * rng.random())
    pos = c + d * rr
    leaf = np.array([0.24, 0.42, 0.14]) + rng.normal(0, 0.05, (n, 3))
    sun = np.clip((pos[:, 1] - c[1]) / 0.6, 0, 1)[:, None]
    leaf = leaf * (0.75 + 0.5 * sun) + np.array([0.06, 0.05, -0.02]) * sun
    scale = np.stack([rng.uniform(0.02, 0.045, n), np.full(n, 0.004), rng.uniform(0.01, 0.025, n)], 1)
    add(pos, leaf, scale, alpha=np.full(n, 0.85))

# rocks
for rx, rz, rs in [(0.4, -0.3, 0.35), (-0.7, 0.5, 0.22), (1.2, -0.5, 0.18)]:
    n = 3000
    d = rng.normal(size=(n, 3))
    d /= np.linalg.norm(d, axis=1, keepdims=True)
    pos = np.array([rx, 0, rz]) + d * np.array([rs, rs * 0.6, rs * 0.8])
    pos[:, 1] = np.abs(pos[:, 1])
    stone = np.array([0.52, 0.5, 0.46]) * (0.8 + 0.3 * rng.random((n, 1))) + rng.normal(0, 0.02, (n, 3))
    add(pos, stone, np.full((n, 3), 0.02) * np.array([1.6, 1.6, 0.4]))

# distant treeline, soft and dark
n = 12000
a = rng.random(n) * 2 * np.pi
r = 4.5 + rng.random(n) * 0.8
y = rng.random(n) ** 0.7 * 3.2
pos = np.stack([r * np.cos(a), y, r * np.sin(a)], 1)
col = np.array([0.12, 0.2, 0.1]) + rng.normal(0, 0.03, (n, 3)) + (y / 3.2)[:, None] * np.array([0.1, 0.12, 0.1])
add(pos, col, np.full((n, 3), 0.07), alpha=np.full(n, 0.7))

pos = np.concatenate([p[0] for p in parts])
col = np.concatenate([p[1] for p in parts])
scale = np.concatenate([p[2] for p in parts])
quat = np.concatenate([p[3] for p in parts])
alpha = np.concatenate([p[4] for p in parts])
N = len(pos)

# y-up -> COLMAP y-down (180 degrees about X): (x, y, z) -> (x, -y, -z)
flip = np.array([1.0, -1.0, -1.0])
pos_c = pos * flip
# rotate orientations by the same 180-degree X rotation: q' = qx * q, qx = (0,1,0,0)
w, x, yq, z = quat.T
quat_c = np.stack([-x, w, -z, yq], 1)

SH0 = 0.28209479177387814
f_dc = (col - 0.5) / SH0
opacity_logit = np.log(alpha / (1 - alpha))
log_scale = np.log(np.maximum(scale, 1e-5))

props = ["x", "y", "z", "f_dc_0", "f_dc_1", "f_dc_2", "opacity",
         "scale_0", "scale_1", "scale_2", "rot_0", "rot_1", "rot_2", "rot_3"]
data = np.concatenate([pos_c, f_dc, opacity_logit[:, None], log_scale, quat_c], 1).astype("<f4")
header = "ply\nformat binary_little_endian 1.0\nelement vertex %d\n" % N
header += "".join("property float %s\n" % p for p in props) + "end_header\n"
with open(os.path.join(OUT, "clearing.ply"), "wb") as f:
    f.write(header.encode())
    f.write(data.tobytes())

# capture cameras: 13 photos along a 90-degree arc, radius 3 m, eye height 1.6 m
W, H, hfov = 1600, 1066, math.radians(62)
fx = (W / 2) / math.tan(hfov / 2)
cams = []
target = np.array([0.0, 1.1, 0.0])
for i, deg in enumerate(np.linspace(-45, 45, 13)):
    a = math.radians(deg)
    p = np.array([3.0 * math.sin(a), 1.6, 3.0 * math.cos(a)])
    p_c, t_c = p * flip, target * flip
    f = t_c - p_c
    f /= np.linalg.norm(f)
    d0 = np.array([0.0, 1.0, 0.0])  # "down" in the COLMAP frame
    r = np.cross(d0, f)
    r /= np.linalg.norm(r)
    d = np.cross(f, r)
    R = np.stack([r, d, f], 1)  # camera-to-world, columns = right, down, forward
    cams.append({
        "id": i, "img_name": "IMG_%04d" % i, "width": W, "height": H,
        "position": p_c.tolist(), "rotation": R.tolist(), "fx": fx, "fy": fx,
    })
with open(os.path.join(OUT, "cameras.json"), "w") as f:
    json.dump(cams, f, indent=1)

print(f"{N} splats, {len(cams)} cameras -> {os.path.abspath(OUT)}")
