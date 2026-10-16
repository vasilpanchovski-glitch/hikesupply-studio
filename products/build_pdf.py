"""Build a digital product: python3 products/build_pdf.py products/p01
Reads <dir>/index.html (which links ../_kit/brand.css), prints <dir>/out/<slug>.pdf (US Letter),
fails if any .page overflows, and renders preview PNGs + a square Shopify cover."""
import sys, os, json, subprocess, glob
from playwright.sync_api import sync_playwright

d = os.path.abspath(sys.argv[1]); out = os.path.join(d, "out"); os.makedirs(out, exist_ok=True)
meta = json.load(open(os.path.join(d, "meta.json")))
slug = meta["slug"]
exe = None
for c in ["/opt/pw-browsers/chromium-1194/chrome-linux/chrome"]:
    if os.path.exists(c): exe = c
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=exe) if exe else p.chromium.launch()
    pg = b.new_page(viewport={"width": 816, "height": 1056})
    pg.goto("file://" + os.path.join(d, "index.html")); pg.wait_for_timeout(800)
    pg.evaluate("document.fonts.ready")
    bad = pg.evaluate("""[...document.querySelectorAll('.page')].map((p,i)=>{
        const r=p.getBoundingClientRect(); let over=false;
        p.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect(); if(q.bottom>r.bottom-28 && q.height>0 && getComputedStyle(e).position!=='absolute') over=true; if(e.scrollWidth>e.clientWidth+2 && e.clientWidth>0 && getComputedStyle(e).overflow==='hidden') over=true;});
        return over?i+1:0}).filter(Boolean)""")
    n = pg.evaluate("document.querySelectorAll('.page').length")
    if bad:
        print("OVERFLOW on pages", bad, "- shorten or split those pages, then build again"); sys.exit(2)
    pdf = os.path.join(out, slug + ".pdf")
    pg.pdf(path=pdf, width="8.5in", height="11in", print_background=True, prefer_css_page_size=True)
    b.close()
for f in glob.glob(os.path.join(out, "page-*.png")): os.remove(f)
subprocess.run(["pdftoppm", "-png", "-r", "60", pdf, os.path.join(out, "page")], check=True)
# square cover for Shopify: first page on stone background
from PIL import Image, ImageFilter
subprocess.run(["pdftoppm", "-png", "-r", "150", "-f", "1", "-l", "1", pdf, os.path.join(out, "c")], check=True)
cp = sorted(glob.glob(os.path.join(out, "c-*.png")))[0]
pg1 = Image.open(cp).convert("RGB"); os.remove(cp)
S = 1600; canvas = Image.new("RGB", (S, S), (246, 242, 234))
h = int(S * 0.8); w = int(pg1.width * h / pg1.height); im = pg1.resize((w, h), Image.LANCZOS)
sh = Image.new("RGBA", (w + 80, h + 80), (0, 0, 0, 0)); sh.paste((0, 0, 0, 70), (40, 50, w + 40, h + 50))
sh = sh.filter(ImageFilter.GaussianBlur(22)); canvas.paste(sh, ((S - w) // 2 - 40, (S - h) // 2 - 30), sh)
canvas.paste(im, ((S - w) // 2, (S - h) // 2)); canvas.save(os.path.join(out, "cover.jpg"), quality=92)
print(f"ok {pdf} pages={n}")
