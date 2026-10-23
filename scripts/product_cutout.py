#!/usr/bin/env python3
"""Cut a product out of a light studio background for the video end card.

python3 scripts/product_cutout.py video/public/products/<handle>.jpg [--logo x0,y0,x1,y1 ...] [--dark]

Writes video/public/products/<handle>-cut.png (transparent background, cropped to the product).
--logo: boxes (in source pixels) where printed supplier logos/text sit ON the product; light marks
        inside those boxes are painted out with the surrounding product colour.
--dark: for dark logos on light products (paints out dark marks instead of light ones).
Works for photos on a plain white/beige/grey background. Look at the result before using it.
"""
import argparse
import os

import cv2
import numpy as np
from scipy import ndimage as nd

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("--logo", action="append", default=[])
ap.add_argument("--dark", action="store_true")
a = ap.parse_args()

im = cv2.imread(a.src)
f = im.astype(float)
mx, mn = f.max(-1), f.min(-1)
sat = (mx - mn) / (mx + 1e-6)
bg = (sat < 0.16) & (mx > 165)
fg = nd.binary_fill_holes(nd.binary_opening(~bg, iterations=2))
lab, n = nd.label(fg)
if n > 1:
    sizes = nd.sum(fg, lab, range(1, n + 1))
    big = [i + 1 for i, s in enumerate(sizes) if s > sizes.max() * 0.05]
    fg = np.isin(lab, big)

if a.logo:
    hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV).astype(int)
    marks = (hsv[..., 2] < 90) if a.dark else ((hsv[..., 2] > 120) & (hsv[..., 1] < 150))
    box = np.zeros(fg.shape, bool)
    for b in a.logo:
        x0, y0, x1, y1 = map(int, b.split(","))
        box[y0:y1, x0:x1] = True
    m = nd.binary_dilation(nd.binary_erosion(fg, iterations=3) & marks & box, iterations=3) & fg
    im = cv2.inpaint(im, (m * 255).astype(np.uint8), 11, cv2.INPAINT_TELEA)

alpha = cv2.GaussianBlur((nd.binary_erosion(fg, iterations=2) * 255).astype(np.uint8), (0, 0), 1.4)
rgba = cv2.cvtColor(im, cv2.COLOR_BGR2BGRA)
rgba[..., 3] = alpha
ys, xs = np.where(alpha > 10)
rgba = rgba[ys.min() : ys.max() + 1, xs.min() : xs.max() + 1]
out = os.path.splitext(a.src)[0] + "-cut.png"
cv2.imwrite(out, rgba)
print(out, rgba.shape[1], "x", rgba.shape[0])
