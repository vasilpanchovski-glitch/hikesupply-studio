#!/usr/bin/env python3
"""Store cover photo in the website look (Vasil 2026-11-18).

The product alone, cut from a light studio shot, centred on the exact collection-card colour
#E9E9E4 with a soft contact shadow, square 2048 px. Every product cover uses this, so the
collection grid looks like one shoot.

python3 scripts/photos/cover.py <studio.jpg> <out.jpg> [--fill 0.80] [--shadow 1]
"""
import argparse
import cv2
import numpy as np
from scipy import ndimage as nd
from PIL import Image, ImageFilter

BG = (233, 233, 228)  # #E9E9E4, product card background on hikesupplyco.com
S = 2048

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("out")
ap.add_argument("--fill", type=float, default=0.80, help="share of the frame the longer side fills")
ap.add_argument("--shadow", type=float, default=1.0)
a = ap.parse_args()

im = cv2.imread(a.src)
f = im.astype(float)
# background = the plain studio colour, measured from the corners
corners = np.concatenate([f[:40, :40].reshape(-1, 3), f[:40, -40:].reshape(-1, 3),
                          f[-40:, :40].reshape(-1, 3), f[-40:, -40:].reshape(-1, 3)])
ref = np.median(corners, 0)
d = np.sqrt(((f - ref) ** 2).sum(-1))
bg = d < 18
fg = nd.binary_fill_holes(nd.binary_opening(~bg, iterations=2))
lab, n = nd.label(fg)
if n:
    sizes = nd.sum(fg, lab, range(1, n + 1))
    fg = np.isin(lab, 1 + np.where(sizes > sizes.max() * 0.02)[0])
alpha = cv2.GaussianBlur((fg * 255).astype(np.uint8), (5, 5), 0)
rgb = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
cut = Image.fromarray(np.dstack([rgb, alpha]), "RGBA")
cut = cut.crop(cut.getbbox())

k = a.fill * S / max(cut.size)
cut = cut.resize((round(cut.width * k), round(cut.height * k)), Image.LANCZOS)
x = (S - cut.width) // 2
y = (S - cut.height) // 2 - int(S * 0.01)

canvas = Image.new("RGBA", (S, S), BG + (255,))
if a.shadow:
    sh = Image.new("L", (S, S), 0)
    m = np.zeros((S, S), np.uint8)
    cx, cy = S // 2, y + cut.height
    cv2.ellipse(m, (cx, cy), (int(cut.width * 0.42), int(S * 0.018)), 0, 0, 360, int(120 * a.shadow), -1)
    sh = Image.fromarray(m).filter(ImageFilter.GaussianBlur(28))
    dark = Image.new("RGBA", (S, S), (60, 60, 55, 255))
    dark.putalpha(sh)
    canvas.alpha_composite(dark)
canvas.alpha_composite(cut, (x, y))
canvas.convert("RGB").save(a.out, quality=93)
print(a.out)
