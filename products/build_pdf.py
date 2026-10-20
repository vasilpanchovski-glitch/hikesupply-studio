"""Build a digital product: python3 products/build_pdf.py products/p01
Reads <dir>/index.html (which links ../_kit/brand.css), prints <dir>/out/<slug>.pdf (US Letter),
fails if any .page overflows, and renders preview PNGs + a 1530x1980 Shopify cover."""
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
    if meta.get("variants"):
        # optional extras: A4 (Letter pages scaled to fit, centred) and a printer-friendly low-ink version (html.bw rules in the product's CSS)
        a4 = dict(width="210mm", height="297mm", print_background=True, prefer_css_page_size=False, scale=0.973, margin={"top": "0.45in"})
        pg.pdf(path=os.path.join(out, slug + "-a4.pdf"), **a4)
        pg.evaluate("document.documentElement.classList.add('bw')"); pg.wait_for_timeout(300)
        pg.pdf(path=os.path.join(out, slug + "-print-friendly.pdf"), width="8.5in", height="11in", print_background=True, prefer_css_page_size=True)
        pg.pdf(path=os.path.join(out, slug + "-a4-print-friendly.pdf"), **a4)
    b.close()
for f in glob.glob(os.path.join(out, "page-*.png")): os.remove(f)
subprocess.run(["pdftoppm", "-png", "-r", "60", pdf, os.path.join(out, "page")], check=True)
# Shopify cover: the first page full-bleed, 1530x1980 (US Letter shape), same size as the older guides in the store
from PIL import Image
subprocess.run(["pdftoppm", "-png", "-r", "180", "-f", "1", "-l", "1", pdf, os.path.join(out, "c")], check=True)
cp = sorted(glob.glob(os.path.join(out, "c-*.png")))[0]
pg1 = Image.open(cp).convert("RGB"); os.remove(cp)
pg1.resize((1530, 1980), Image.LANCZOS).save(os.path.join(out, "cover.jpg"), quality=92)
print(f"ok {pdf} pages={n}")
