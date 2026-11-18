#!/usr/bin/env python3
"""Paint leftover peach studio glow (old 2026-11-08 background) to #E9E9E4 on text cards, keeping the product.
python3 scripts/photos/depeach.py img.jpg [...]   (in place)"""
import sys, numpy as np, cv2
from PIL import Image
from rembg import remove, new_session
ses = new_session('isnet-general-use')
for p in sys.argv[1:]:
    im = np.array(Image.open(p).convert('RGB')).astype(int)
    a = np.array(remove(Image.fromarray(im.astype(np.uint8)), session=ses))[..., 3]
    prod = cv2.dilate((a > 100).astype(np.uint8), np.ones((15, 15), np.uint8)) > 0
    r, g, b = im[..., 0], im[..., 1], im[..., 2]
    m = (r > 175) & (g > 140) & (r - b > 4) & (r - b < 95) & ~prod
    m = cv2.GaussianBlur(m.astype(np.float32), (5, 5), 0)[..., None]
    out = im * (1 - m) + np.array([233, 233, 228]) * m
    Image.fromarray(out.round().astype(np.uint8)).save(p, quality=93)
    print(p)
