# Prepares the Etsy version of one new digital product, from a fresh clone, fully in the cloud.
# usage: python3 etsy/prep_new.py products/<code> etsy/listings/<slug>.json
# Builds the PDFs (Letter, A4, colour + print-friendly, mobile), page images for the listing photos,
# the 5 listing images (etsy/out/<slug>/0X.jpg) and the buyer files (etsy/downloads/<slug>/, max 5 files, max 20 MB each).
import sys, os, json, glob, subprocess, zipfile, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
pdir, lpath = sys.argv[1].rstrip("/"), sys.argv[2]
meta = json.load(open(f"{pdir}/meta.json"))
L = json.load(open(lpath))
slug, handle = L["slug"], L["shopify"]
s = meta["slug"]
out = f"{pdir}/out"

subprocess.run(["python3", "products/build_pdf.py", pdir], check=True)
subprocess.run(["python3", "products/build_mobile.py", pdir], check=True)

# page images used by etsy/render.py (L["pages"] points at etsy/assets/<handle>/p-XX.png)
a = f"etsy/assets/{handle}"
shutil.rmtree(a, ignore_errors=True); os.makedirs(a)
subprocess.run(["pdftoppm", "-png", "-r", "110", f"{out}/{s}.pdf", f"{a}/p"], check=True)
for f in glob.glob(f"{a}/p-*.png"):  # pdftoppm pads to the page count width; normalise to p-01.png
    n = int(f.rsplit("-", 1)[1].split(".")[0]); os.rename(f, f"{a}/p-{n:02d}.png")
missing = [p for p in L["pages"] if not os.path.exists(p)]
assert not missing, f"listing points at pages that do not exist: {missing}"
subprocess.run(["python3", "etsy/render.py", lpath], check=True)

# buyer files
stem = "-".join(w.capitalize() for w in slug.split("-"))
d = f"etsy/downloads/{slug}"
shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
items = [(f"{out}/{s}.pdf", f"{stem}-US-Letter.pdf")]
if os.path.exists(f"{out}/{s}-a4.pdf"):
    items.append((f"{out}/{s}-a4.pdf", f"{stem}-A4.pdf"))
items.append((f"{out}/{s}-mobile.pdf", f"{stem}-Mobile.pdf"))
pf = [(f"{out}/{s}-print-friendly.pdf", f"{stem}-US-Letter-print-friendly.pdf"), (f"{out}/{s}-a4-print-friendly.pdf", f"{stem}-A4-print-friendly.pdf")]
pf = [p for p in pf if os.path.exists(p[0])]
for src, name in items:
    shutil.copy(src, f"{d}/{name}")
if pf:
    with zipfile.ZipFile(f"{d}/{stem}-printer-friendly-low-ink.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for src, name in pf:
            z.write(src, name)
shutil.copy("etsy/bonus/BONUS-Ultimate-Hiking-Checklist.zip", d)
files = sorted(os.listdir(d))
assert len(files) <= 5, files
for f in files:
    mb = os.path.getsize(f"{d}/{f}") / 1e6
    assert mb <= 20, f"{f} is {mb:.1f} MB, Etsy allows 20 MB"
print("ok", slug, "images:", sorted(os.listdir(f"etsy/out/{slug}")), "files:", files)
