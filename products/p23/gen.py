"""Generates index.html for p23 (Joshua Tree National Park — Trip Planning Guide). Run: python3 gen.py
Same look as p11 (base.css + extra.css). Facts checked on November 18, 2026 against nps.gov/jotr: hiking (trail
table: distances, gains, times, types), fees and passes, campgrounds, first-time visitors, basic info, safety
guidelines, distances and times, visitor centers, summer seasonal closures, stargazing, Barker Dam trail.
Page content is in body.py."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Joshua Tree National Park"
CHECKED = "November 2026"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def km(mi): return f"{mi*1.609:.1f}".rstrip("0").rstrip(".") + " km"
def mt(ft): return f"{round(ft*0.3048):,} m"

MORE = """
.tt td{font-size:9.6pt;padding:5pt 5pt}
.tt th{font-size:7.3pt;padding:5pt 5pt}
.tt td:first-child{font-weight:600;color:var(--forest)}
.tt tr.grp td{background:var(--soft);font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);padding:6pt 5pt}
.sig{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt;margin:8pt 0}
.sig>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 12pt}
.sig h3{margin:0 0 5pt;font-size:13pt}
.sig .lbl{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin:7pt 0 3pt}
.sig p{margin:0;font-size:10pt;line-height:1.42}
.sig .act{border-top:0.6pt solid var(--line);margin-top:7pt;padding-top:6pt}
.now{border:1.6pt solid var(--clay);border-radius:9pt;padding:11pt 14pt;margin:10pt 0;background:#fff}
.now h3{margin:0 0 4pt;font-size:13pt;color:var(--rust)}
.now p{margin:0;font-size:10.3pt;line-height:1.45}
.permit{display:grid;grid-template-columns:1fr 1fr;gap:12pt;margin:8pt 0}
.permit>div{background:#fff;border:1pt solid var(--line);border-radius:10pt;padding:13pt 15pt}
.permit>div.plus{border:1.6pt solid var(--forest)}
.permit small{display:block;font:700 7pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay);margin-bottom:5pt}
.permit h3{margin:0 0 6pt;font-size:16pt}
.permit .hrs{font:600 22pt/1.1 var(--serif);color:var(--forest);margin:4pt 0 2pt}
.permit .hl{font:600 8pt/1.3 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:#8B8577;margin-bottom:8pt}
.permit p{margin:0;font-size:10.3pt;line-height:1.45}
.mini{display:grid;grid-template-columns:1fr 1fr;gap:10pt;margin:6pt 0}
.mini>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:10pt 13pt}
.mini h3{margin:0 0 3pt;font-size:12.5pt}
.mini .s{font:600 8pt/1.3 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--clay);margin-bottom:4pt}
.mini p{margin:0;font-size:10pt;line-height:1.42}
.stops{border-top:1.5pt solid var(--forest);margin-top:4pt}
.stops>div{display:grid;grid-template-columns:1.55in 1fr;gap:12pt;padding:7pt 0;border-bottom:0.6pt solid var(--line)}
.stops b{font:600 12pt/1.25 var(--serif);color:var(--forest)}
.stops p{margin:0;font-size:10pt;line-height:1.42}
.months td{font-size:9.6pt;padding:5pt 6pt;line-height:1.38}
.months td:first-child{font:600 11pt/1.2 var(--serif);color:var(--forest);width:0.95in;white-space:nowrap}
.log{background:#fff;border:1pt solid var(--line);border-radius:10pt;padding:12pt 16pt;margin-bottom:12pt}
.log .opts{margin-top:7pt}
.spots td{font-size:10pt;padding:6pt 6pt}
.spots td.b{width:0.8in;text-align:center}
.spots td.b::before{content:"";display:inline-block;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.plan .d{grid-template-columns:0.85in 1fr}
.log .f2 .fl{height:28pt}
html.bw .now{border-color:#444}
html.bw .tt tr.grp td{background:#fff}
"""

exec(open(os.path.join(HERE, "body.py")).read())

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip() if os.path.exists(os.path.join(HERE, "cover-credit.txt")) else ""
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
