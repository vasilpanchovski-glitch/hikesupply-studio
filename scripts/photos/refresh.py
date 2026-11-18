#!/usr/bin/env python3
"""Re-shoot existing product photos in the website look and make a contact sheet.

python3 scripts/photos/refresh.py <slug> name=url [name=url ...]
  names starting with "d_" are close-ups (cover.py --keep), all others are cut out and centred.
Writes media/products/<slug>/<name>.jpg (without the d_ prefix) and build/covers/<slug>-sheet.jpg.
"""
import os, subprocess, sys, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
slug = sys.argv[1]
out = os.path.join(ROOT, "media", "products", slug)
raw = os.path.join(ROOT, "build", "covers", slug)
os.makedirs(out, exist_ok=True); os.makedirs(raw, exist_ok=True)
done = []
for arg in sys.argv[2:]:
    name, url = arg.split("=", 1)
    keep = name.startswith("d_")
    clean = name[2:] if keep else name
    src = os.path.join(raw, clean + "-src")
    if url.startswith("http"):
        urllib.request.urlretrieve(url.split("?")[0], src)
    else:
        src = url
    jpg = os.path.join(raw, clean + "-src.jpg")
    Image.open(src).convert("RGB").save(jpg, quality=95)
    dst = os.path.join(out, clean + ".jpg")
    cmd = ["python3", os.path.join(ROOT, "scripts", "photos", "cover.py"), jpg, dst] + (["--keep"] if keep else [])
    subprocess.run(cmd, check=True, capture_output=True)
    done.append(dst)
n = len(done); cols = min(n, 5); rows = (n + cols - 1) // cols
sheet = Image.new("RGB", (cols * 310, rows * 310), (255, 255, 255))
for k, f in enumerate(done):
    sheet.paste(Image.open(f).resize((300, 300)), ((k % cols) * 310, (k // cols) * 310))
p = os.path.join(ROOT, "build", "covers", slug + "-sheet.jpg")
sheet.save(p, quality=85)
print(p)
for f in done:
    print(os.path.basename(f))
