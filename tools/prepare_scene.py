"""Turn a coloured point cloud (x y z + uchar red green blue) into a scene for
Viewcone Erosion:

  <out>/<id>.ply          3DGS-format splats (surfels: flat discs on surfaces)
  <out>/<id>.cameras.json authored capture viewpoints (Inria cameras.json format)

Why surfels: a bare point cloud has no splat size, orientation or opacity.
Each point becomes a disc lying in its local surface (PCA normal over its
neighbours), sized by local point spacing, so bark and stone read as surfaces
from up close instead of as round dots. Isolated points (floaters) are kept,
but faint, as atmosphere.

Why authored cameras: these clouds ship without camera poses. The script finds
the main subject (densest vertical structure), the ground height, and the side
with the most surface detail (where a photographer most likely spent time), then
places an arc of virtual capture cameras there at eye height, aimed at the
subject. If you have the real poses (COLMAP images.txt / cameras.json), use
those instead: they are the point of the piece.

    python3 tools/prepare_scene.py IN.ply OUT_DIR ID [--arc 150] [--count 15]
        [--radius R] [--azimuth DEG] [--max-splat 0.06]
"""

import argparse
import json
import math
import os

import numpy as np
from scipy.ndimage import gaussian_filter
from scipy.spatial import cKDTree

SH0 = 0.28209479177387814


def load_xyzrgb(path):
    with open(path, "rb") as f:
        header = b""
        while not header.endswith(b"end_header\n"):
            header += f.read(1)
        lines = header.decode("ascii", "replace").split("\n")
        n = int(next(l for l in lines if l.startswith("element vertex")).split()[2])
        props = [l.split()[1:] for l in lines if l.startswith("property")]
        fmt = {"float": "<f4", "double": "<f8", "uchar": "u1", "uint8": "u1", "float32": "<f4"}
        dt = np.dtype([(name, fmt[t]) for t, name in props])
        a = np.frombuffer(f.read(n * dt.itemsize), dtype=dt, count=n)
    P = np.stack([a["x"], a["y"], a["z"]], 1).astype(np.float64)
    C = np.stack([a["red"], a["green"], a["blue"]], 1).astype(np.float64) / 255.0
    return P, C


def rot_to_quat(R):
    """Batched rotation matrices [N,3,3] -> quaternions [N,4] (w, x, y, z)."""
    m = R
    t = m[:, 0, 0] + m[:, 1, 1] + m[:, 2, 2]
    q = np.zeros((len(m), 4))
    c0 = t > 0
    s = np.sqrt(np.maximum(t[c0] + 1.0, 1e-12)) * 2
    q[c0, 0] = 0.25 * s
    q[c0, 1] = (m[c0, 2, 1] - m[c0, 1, 2]) / s
    q[c0, 2] = (m[c0, 0, 2] - m[c0, 2, 0]) / s
    q[c0, 3] = (m[c0, 1, 0] - m[c0, 0, 1]) / s
    rest = ~c0
    for i in range(3):
        j, k = (i + 1) % 3, (i + 2) % 3
        sel = rest & (m[:, i, i] >= m[:, j, j]) & (m[:, i, i] >= m[:, k, k])
        rest = rest & ~sel
        s = np.sqrt(np.maximum(1.0 + m[sel, i, i] - m[sel, j, j] - m[sel, k, k], 1e-12)) * 2
        q[sel, 0] = (m[sel, k, j] - m[sel, j, k]) / s
        q[sel, 1 + i] = 0.25 * s
        q[sel, 1 + j] = (m[sel, j, i] + m[sel, i, j]) / s
        q[sel, 1 + k] = (m[sel, k, i] + m[sel, i, k]) / s
    return q / np.linalg.norm(q, axis=1, keepdims=True)


def surfels(P, C, max_splat):
    tree = cKDTree(P)
    k = 12
    dist, idx = tree.query(P, k=k + 1)
    d = dist[:, 1:5].mean(1)  # local spacing
    med = np.median(d)

    # local PCA (batched): eigenvalues ascending, eigenvectors as columns
    nb = P[idx[:, 1:]] - P[idx[:, 1:]].mean(1, keepdims=True)
    cov = np.einsum("nki,nkj->nij", nb, nb) / k
    w, v = np.linalg.eigh(cov)
    w = np.maximum(w, 1e-12)
    planarity = 1.0 - w[:, 0] / w[:, 1]  # ~1 on surfaces, ~0 in noise

    # right-handed frame: columns (t1, t2, normal)
    R = np.stack([v[:, :, 2], v[:, :, 1], v[:, :, 0]], 2)
    det = np.linalg.det(R)
    R[det < 0, :, 1] *= -1

    floater = d > med * 6
    s = np.clip(0.75 * d, 0.0015, max_splat)
    flat = np.clip((planarity - 0.4) / 0.5, 0, 1)  # 0 = round, 1 = flat disc
    thin = s * (1.0 - 0.8 * flat)
    scales = np.stack([s, s * (1.0 - 0.15 * flat), thin], 1)
    scales[floater] = np.clip(d[floater] * 0.25, 0.003, 0.02)[:, None]

    alpha = np.full(len(P), 0.92)
    alpha[floater] = 0.22
    q = rot_to_quat(R)
    return scales, q, alpha, floater, d


def write_splat_ply(path, P, C, scales, q, alpha):
    f_dc = (np.clip(C, 0, 1) - 0.5) / SH0
    a = np.clip(alpha, 1e-3, 1 - 1e-3)
    data = np.concatenate([
        P, f_dc, np.log(a / (1 - a))[:, None], np.log(scales), q
    ], 1).astype("<f4")
    props = ["x", "y", "z", "f_dc_0", "f_dc_1", "f_dc_2", "opacity",
             "scale_0", "scale_1", "scale_2", "rot_0", "rot_1", "rot_2", "rot_3"]
    header = "ply\nformat binary_little_endian 1.0\nelement vertex %d\n" % len(P)
    header += "".join("property float %s\n" % p for p in props) + "end_header\n"
    with open(path, "wb") as fh:
        fh.write(header.encode())
        fh.write(data.tobytes())


def analyse(P, floater, radius=None, azimuth=None, arc=150.0):
    core = P[~floater]
    lo, hi = np.percentile(core, 5, 0), np.percentile(core, 95, 0)
    mid = np.all((core[:, [0, 2]] > lo[[0, 2]]) & (core[:, [0, 2]] < hi[[0, 2]]), 1)
    ground = float(np.percentile(core[mid, 1], 3))

    band = core[(core[:, 1] > ground + 0.3) & (core[:, 1] < ground + 2.5)]
    if len(band) < 200:
        band = core
    bins = 0.25
    x0, z0 = band[:, 0].min(), band[:, 2].min()
    nx = int((band[:, 0].max() - x0) / bins) + 1
    nz = int((band[:, 2].max() - z0) / bins) + 1
    H = np.zeros((nx, nz))
    np.add.at(H, (((band[:, 0] - x0) / bins).astype(int), ((band[:, 2] - z0) / bins).astype(int)), 1)
    H = gaussian_filter(H, 1.5)
    ix, iz = np.unravel_index(np.argmax(H), H.shape)
    cx, cz = x0 + (ix + 0.5) * bins, z0 + (iz + 0.5) * bins
    # the density peak sits on the subject's surface (bark, not the trunk's
    # axis): re-centre on the mass of the structure around it, twice
    for _ in range(2):
        near = np.hypot(band[:, 0] - cx, band[:, 2] - cz) < 3.0
        if near.sum() > 50:
            cx, cz = float(band[near, 0].mean()), float(band[near, 2].mean())

    rh = np.hypot(band[:, 0] - cx, band[:, 2] - cz)
    near = rh < 4.0
    r_subject = float(np.percentile(rh[near], 70)) if near.sum() > 50 else 1.0
    if radius is None:
        radius = float(np.clip(r_subject + 2.2, 2.5, 6.0))

    if azimuth is None:
        sel = rh < radius
        az = np.degrees(np.arctan2(band[sel, 0] - cx, band[sel, 2] - cz)) % 360
        hist = np.bincount((az // 5).astype(int) % 72, minlength=72).astype(float)
        win = int(arc // 5)
        scores = [hist.take(range(i, i + win), mode="wrap").sum() for i in range(72)]
        azimuth = (int(np.argmax(scores)) * 5 + arc / 2) % 360

    # look-at height: middle of the subject's visible band, not above 1.6 m
    target_y = ground + min(1.2, float(np.percentile(band[:, 1], 50)) - ground)
    return dict(ground=ground, center=[cx, target_y, cz], radius=radius,
                azimuth=float(azimuth), r_subject=r_subject)


def make_cameras(info, arc, count, eye=1.6, hfov_deg=62):
    W, H = 1600, 1200
    fx = (W / 2) / math.tan(math.radians(hfov_deg) / 2)
    cx, cy, cz = info["center"]
    cams = []
    for i, off in enumerate(np.linspace(-arc / 2, arc / 2, count)):
        a = math.radians(info["azimuth"] + off)
        p = np.array([cx + info["radius"] * math.sin(a), info["ground"] + eye, cz + info["radius"] * math.cos(a)])
        f = np.array([cx, cy, cz]) - p
        f /= np.linalg.norm(f)
        up = np.array([0.0, 1.0, 0.0])
        r = np.cross(f, up)
        r /= np.linalg.norm(r)
        d = np.cross(f, r)  # "down" axis, so (r, d, f) is right-handed like COLMAP
        R = np.stack([r, d, f], 1)
        cams.append({"id": i, "img_name": "authored_%02d" % i, "width": W, "height": H,
                     "position": p.tolist(), "rotation": R.tolist(), "fx": fx, "fy": fx})
    return cams


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("id")
    ap.add_argument("--arc", type=float, default=150)
    ap.add_argument("--count", type=int, default=15)
    ap.add_argument("--radius", type=float)
    ap.add_argument("--azimuth", type=float)
    ap.add_argument("--max-splat", type=float, default=0.06)
    a = ap.parse_args()

    P, C = load_xyzrgb(a.src)
    scales, q, alpha, floater, d = surfels(P, C, a.max_splat)
    info = analyse(P, floater, a.radius, a.azimuth, a.arc)
    cams = make_cameras(info, a.arc, a.count)

    os.makedirs(a.out, exist_ok=True)
    write_splat_ply(os.path.join(a.out, a.id + ".ply"), P, C, scales, q, alpha)
    with open(os.path.join(a.out, a.id + ".cameras.json"), "w") as fh:
        json.dump(cams, fh, indent=1)
    info.update(points=len(P), floaters=int(floater.sum()), spacing_median=float(np.median(d)))
    print(json.dumps({a.id: info}, indent=1))


if __name__ == "__main__":
    main()
