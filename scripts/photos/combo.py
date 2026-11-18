#!/usr/bin/env python3
"""Set/bundle cover (path@0.6 = relative height): several products side by side on #E9E9E4 with soft shadows.
python3 scripts/photos/combo.py out.jpg a.jpg b.jpg [flat:guide.jpg] ...
Items are cut out with rembg; 'flat:' items (book or PDF covers) are kept as rectangles."""
import sys, numpy as np, cv2
from PIL import Image, ImageFilter
from rembg import remove, new_session
BG = (233, 233, 228); S = 2048
ses = new_session('isnet-general-use')
out, items = sys.argv[1], sys.argv[2:]
cuts = []; fr = []
for it in items:
    it, _, f = it.partition('@'); fr.append(float(f or 1))
    if it.startswith('flat:'):
        im = Image.open(it[5:]).convert('RGBA')
    else:
        im = remove(Image.open(it).convert('RGB'), session=ses)
        a = np.array(im.split()[3]); a[a < 140] = 0; im.putalpha(Image.fromarray(a))
        im = im.crop(im.getbbox())
    cuts.append(im)
# normalise every item to the same height, then apply its relative size (path@0.6)
cuts = [c.resize((round(c.width * 1000 * f / c.height), round(1000 * f)), Image.LANCZOS) for c, f in zip(cuts, fr)]
gap = int(S * 0.04); W = S * 0.86; H = S * 0.62
k = min(H / max(c.height for c in cuts), (W - gap * (len(cuts) - 1)) / sum(c.width for c in cuts))
cuts = [c.resize((round(c.width * k), round(c.height * k)), Image.LANCZOS) for c in cuts]
tw = sum(c.width for c in cuts) + gap * (len(cuts) - 1)
base = (S + max(c.height for c in cuts)) // 2
canvas = Image.new('RGBA', (S, S), BG + (255,))
x = (S - tw) // 2
m = np.zeros((S, S), np.uint8)
for c in cuts:
    cv2.ellipse(m, (x + c.width // 2, base), (int(c.width * 0.45), int(S * 0.016)), 0, 0, 360, 120, -1)
    x += c.width + gap
sh = Image.fromarray(m).filter(ImageFilter.GaussianBlur(26)); dark = Image.new('RGBA', (S, S), (60, 60, 55, 255)); dark.putalpha(sh)
canvas.alpha_composite(dark)
x = (S - tw) // 2
for c in cuts:
    canvas.alpha_composite(c, (x, base - c.height)); x += c.width + gap
canvas.convert('RGB').save(out, quality=93); print(out)
