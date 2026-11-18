#!/usr/bin/env python3
"""Store photos in the website look (Vasil 2026-11-18).

The product alone, cut out with rembg (isnet-general-use), on the exact collection-card colour
#E9E9E4. Covers and colour shots: centred, square 2048 px, soft contact shadow. Close-ups (--keep):
same framing, only the background colour is swapped.

python3 scripts/photos/cover.py <in.jpg> <out.jpg> [--fill 0.80] [--shadow 1] [--keep]
Needs: pip install --break-system-packages rembg  (downloads the model once, ~180 MB)
"""
import argparse
import cv2
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove, new_session

BG = (233, 233, 228)  # #E9E9E4, product card background on hikesupplyco.com
S = 2048

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("out")
ap.add_argument("--fill", type=float, default=0.80, help="share of the frame the longer side fills")
ap.add_argument("--shadow", type=float, default=1.0)
ap.add_argument("--amin", type=int, default=12, help="drop cut-out pixels fainter than this (reflections)")
ap.add_argument("--model", default="isnet-general-use", help="rembg model, try u2net when parts go missing")
ap.add_argument("--keep", action="store_true", help="close-ups: keep framing, only swap the background colour")
a = ap.parse_args()

raw = Image.open(a.src)
src = raw.convert("RGB")

if a.keep:
    # close-ups fill the frame, so rembg is unreliable here: flood-fill the light, near-neutral
    # studio background in from the border instead and paint it #E9E9E4
    im = cv2.cvtColor(np.array(src), cv2.COLOR_RGB2BGR)
    H, W = im.shape[:2]
    blur = cv2.GaussianBlur(im, (5, 5), 0)
    f = blur.astype(float); mx, mn = f.max(-1), f.min(-1)
    light = ((mx - mn) / (mx + 1e-6) < 0.35) & (mx > 150)
    edge = np.concatenate([f[:6].reshape(-1, 3), f[-6:].reshape(-1, 3), f[:, :6].reshape(-1, 3), f[:, -6:].reshape(-1, 3)])
    edge = edge[edge.max(-1) > 150]
    if len(edge):  # the studio colour = the brightest common colour on the border
        ref = np.median(edge[edge.sum(-1) >= np.percentile(edge.sum(-1), 60)], 0)
        light &= np.sqrt(((f - ref) ** 2).sum(-1)) < 28
    blur[~light] = 0
    mask = np.zeros((H + 2, W + 2), np.uint8)
    flags = 4 | cv2.FLOODFILL_MASK_ONLY | (255 << 8)
    for x in range(0, W, 16):
        for y in (0, H - 1):
            if light[y, x] and not mask[y + 1, x + 1]:
                cv2.floodFill(blur, mask, (x, y), 0, (3, 3, 3), (3, 3, 3), flags)
    for y in range(0, H, 16):
        for x in (0, W - 1):
            if light[y, x] and not mask[y + 1, x + 1]:
                cv2.floodFill(blur, mask, (x, y), 0, (3, 3, 3), (3, 3, 3), flags)
    bg = cv2.GaussianBlur(((mask[1:-1, 1:-1] > 0) & light).astype(np.float32), (5, 5), 0)[..., None]
    out = np.array(src).astype(float) * (1 - bg) + np.array(BG, float) * bg
    out = Image.fromarray(out.round().astype(np.uint8))
    k = S / max(out.size)
    out.resize((round(out.width * k), round(out.height * k)), Image.LANCZOS).save(a.out, quality=93)
    print(a.out)
    raise SystemExit

cut = raw.convert("RGBA") if raw.mode == "RGBA" else remove(src, session=new_session(a.model))  # RGBA (PNG with alpha = already cut out)
al = np.array(cut.split()[3])
al[al < a.amin] = 0
cut.putalpha(Image.fromarray(al))
cut = cut.crop(cut.getbbox())
k = a.fill * S / max(cut.size)
cut = cut.resize((round(cut.width * k), round(cut.height * k)), Image.LANCZOS)
x = (S - cut.width) // 2
y = (S - cut.height) // 2 - int(S * 0.01)

canvas = Image.new("RGBA", (S, S), BG + (255,))
if a.shadow:
    m = np.zeros((S, S), np.uint8)
    cv2.ellipse(m, (S // 2, y + cut.height), (int(cut.width * 0.42), int(S * 0.018)), 0, 0, 360, int(120 * a.shadow), -1)
    sh = Image.fromarray(m).filter(ImageFilter.GaussianBlur(28))
    dark = Image.new("RGBA", (S, S), (60, 60, 55, 255))
    dark.putalpha(sh)
    canvas.alpha_composite(dark)
canvas.alpha_composite(cut, (x, y))
canvas.convert("RGB").save(a.out, quality=93)
print(a.out)
