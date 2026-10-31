"""Phone edition of a digital product: python3 products/build_mobile.py products/p03
Reflows the same index.html into a single column on 315x570 pt pages (the size of our older mobile guides)
and writes <dir>/out/<slug>-mobile.pdf. Multi-column grids become one column, long pages flow onto the next page."""
import sys, os, json, subprocess, glob
from playwright.sync_api import sync_playwright

d = os.path.abspath(sys.argv[1]); out = os.path.join(d, "out"); os.makedirs(out, exist_ok=True)
slug = json.load(open(os.path.join(d, "meta.json")))["slug"]
W_IN, H_IN = 315 / 72, 570 / 72
CSS = f"""
@page {{ size: {W_IN}in {H_IN}in; margin: 0.32in 0 0.36in; }}
@page :first {{ margin: 0; }}
html, body {{ background: #fff !important; }}
.page:not(.cover):not(.darkpage) {{ background: #fff !important; }}
.page:last-child {{ break-after: auto !important; page-break-after: auto !important; }}
body {{ font-size: 10pt !important; }}
.page {{ width: {W_IN}in !important; height: auto !important; min-height: 0 !important; overflow: visible !important;
        padding: 0 0.3in 0.2in !important; break-after: page; page-break-after: always; }}
.page.cover {{ height: {H_IN}in !important; padding: 0.45in 0.32in !important; overflow: hidden !important; }}
.page .folio {{ display: none !important; }}
h1 {{ font-size: 24pt !important; }} .cover h1 {{ font-size: 28pt !important; }}
h2 {{ font-size: 17pt !important; }} h3 {{ font-size: 12pt !important; }}
.lead {{ font-size: 11pt !important; }}
table {{ font-size: 8pt !important; }} th, td {{ padding: 3pt 3pt !important; }}
img {{ max-width: 100% !important; height: auto; }}
.box, .warn, li, tr, .card {{ break-inside: avoid; }}
"""
PRE = r"""() => {
  document.querySelectorAll('.page').forEach(pg => {
    const bg = getComputedStyle(pg).backgroundColor.match(/\d+/g).map(Number);
    if (!pg.classList.contains('cover') && bg[0] + bg[1] + bg[2] < 300) pg.classList.add('darkpage');
  });
  document.querySelectorAll('.page *').forEach(e => {
    const cs = getComputedStyle(e);
    if (cs.display === 'grid' || cs.display === 'inline-grid') {
      const cols = cs.gridTemplateColumns.split(' ').length;
      const kids = [...e.children];
      const small = kids.length > 0 && kids.every(k => k.textContent.trim().length < 70 && k.getBoundingClientRect().height < 330);
      e.dataset.mcols = cols > 1 ? (small ? Math.min(cols, cols % 3 === 0 ? 3 : 2) : 1) : 1;
    }
  });
}"""
JS = r"""() => {
  const W = document.querySelector('.page').clientWidth;
  document.querySelectorAll('.page.darkpage').forEach(pg => {
    pg.style.setProperty('height', '690px', 'important'); pg.style.setProperty('overflow', 'hidden', 'important');
    pg.style.setProperty('padding', '0.45in 0.32in', 'important');
  });
  document.querySelectorAll('.page *').forEach(e => {
    const cs = getComputedStyle(e);
    if (cs.display === 'grid' || cs.display === 'inline-grid') {
      const m = +(e.dataset.mcols || 1);
      e.style.gridTemplateColumns = `repeat(${m}, minmax(0, 1fr))`; e.style.gridAutoFlow = 'row'; e.style.gridColumn = 'auto';
      e.style.width = 'auto'; e.style.maxWidth = '100%';
    }
    if (cs.display === 'flex' && cs.flexDirection.startsWith('row')) { e.style.flexWrap = 'wrap'; }
    if (cs.position === 'absolute' && !e.closest('.cover') && e.getBoundingClientRect().width > W * 0.6) { e.style.position = 'static'; }
    const r = e.getBoundingClientRect();
    if (cs.position === 'absolute' && !e.closest('.cover') && !e.closest('.darkpage') && r.width < 40 && r.height < 40) { e.style.display = 'none'; }
    const boxed = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || parseFloat(cs.borderTopWidth) > 0.5;
    if (boxed && r.height < 420 && r.height > 20) { e.style.breakInside = 'avoid'; }
    const w = parseFloat(cs.width);
    if (cs.width.endsWith('px') && w > W && !e.closest('.cover')) { e.style.width = '100%'; }
    if (parseFloat(cs.height) > 500 && !e.classList.contains('page')) { e.style.height = 'auto'; e.style.minHeight = '120px'; }
  });
}"""
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 420, "height": 760})
    pg.goto("file://" + os.path.join(d, "index.html")); pg.wait_for_timeout(800)
    pg.evaluate("document.fonts.ready")
    pg.set_viewport_size({"width": 900, "height": 1100}); pg.evaluate(PRE)
    pg.add_style_tag(content=CSS); pg.wait_for_timeout(300)
    pg.evaluate(JS); pg.wait_for_timeout(300)
    pdf = os.path.join(out, slug + "-mobile.pdf")
    pg.pdf(path=pdf, prefer_css_page_size=True, print_background=True)
    b.close()
n = subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout
print("ok", pdf, [l for l in n.splitlines() if l.startswith("Pages")][0])
