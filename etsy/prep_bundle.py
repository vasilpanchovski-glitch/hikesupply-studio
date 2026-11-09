# Prepares the Etsy version of a bundle of our digital guides, fully in the cloud.
# usage: python3 etsy/prep_bundle.py etsy/listings/<slug>.json
# The listing JSON has "parts": ["products/<code>", ...]. Builds each part's PDFs, the page images,
# the 5 listing images (etsy/out/<slug>/0X.jpg) and the buyer files (etsy/downloads/<slug>/:
# one ZIP per format with every guide inside, a low-ink ZIP, and the bonus checklist; max 5 files, 20 MB each).
import sys, os, json, glob, subprocess, zipfile, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
lpath = sys.argv[1]
L = json.load(open(lpath))
slug = L["slug"]

groups = {"US-Letter": [], "A4": [], "Mobile": [], "printer-friendly-low-ink": []}
for pdir in L["parts"]:
    pdir = pdir.rstrip("/")
    meta = json.load(open(f"{pdir}/meta.json"))
    s, out = meta["slug"], f"{pdir}/out"
    subprocess.run(["python3", "products/build_pdf.py", pdir], check=True)
    subprocess.run(["python3", "products/build_mobile.py", pdir], check=True)
    a = f"etsy/assets/{s}"
    shutil.rmtree(a, ignore_errors=True); os.makedirs(a)
    subprocess.run(["pdftoppm", "-png", "-r", "110", f"{out}/{s}.pdf", f"{a}/p"], check=True)
    for f in glob.glob(f"{a}/p-*.png"):
        n = int(f.rsplit("-", 1)[1].split(".")[0]); os.rename(f, f"{a}/p-{n:02d}.png")
    stem = "-".join(w.capitalize() for w in s.split("-"))
    groups["US-Letter"].append((f"{out}/{s}.pdf", f"{stem}-US-Letter.pdf"))
    if os.path.exists(f"{out}/{s}-a4.pdf"):
        groups["A4"].append((f"{out}/{s}-a4.pdf", f"{stem}-A4.pdf"))
    groups["Mobile"].append((f"{out}/{s}-mobile.pdf", f"{stem}-Mobile.pdf"))
    for src, name in [(f"{out}/{s}-print-friendly.pdf", f"{stem}-US-Letter-print-friendly.pdf"), (f"{out}/{s}-a4-print-friendly.pdf", f"{stem}-A4-print-friendly.pdf")]:
        if os.path.exists(src):
            groups["printer-friendly-low-ink"].append((src, name))

missing = [p for p in L["pages"] + L.get("covers", []) if not os.path.exists(p)]
assert not missing, f"listing points at pages that do not exist: {missing}"
subprocess.run(["python3", "etsy/render.py", lpath], check=True)

t = "-".join(w.capitalize() for w in slug.split("-"))
d = f"etsy/downloads/{slug}"
shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
for k, items in groups.items():
    if not items:
        continue
    with zipfile.ZipFile(f"{d}/{t}-{k}.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for src, name in items:
            z.write(src, name)
shutil.copy("etsy/bonus/BONUS-Ultimate-Hiking-Checklist.zip", d)
files = sorted(os.listdir(d))
assert len(files) <= 5, files
for f in files:
    mb = os.path.getsize(f"{d}/{f}") / 1e6
    assert mb <= 20, f"{f} is {mb:.1f} MB, Etsy allows 20 MB"
print("ok", slug, "images:", sorted(os.listdir(f"etsy/out/{slug}")), "files:", [(f, round(os.path.getsize(f"{d}/{f}") / 1e6, 1)) for f in files])
