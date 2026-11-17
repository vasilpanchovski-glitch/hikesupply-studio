"""Generates index.html for p26 (All 64 US National Parks, free printable checklist). Run: python3 gen.py
Park list shared with p04 (checked against nps.gov). Count re-checked 2026-11-17: 64 parks, Chiricahua added Oct 20, 2026."""
import ast, os
here = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(here, "..", "p04", "gen.py")).read()
i = src.index("P = ["); j = src.index("\n]", i) + 2
P = ast.literal_eval(src[i + 4:j])
assert len(P) == 64
parks = sorted([(p[0], p[1]) for p in P], key=lambda x: x[0].replace("ʻ", ""))
CHECKED = "November 17, 2026"
T = "All 64 US National Parks"

def row(n, s):
    return f'<li><span class="bx"></span><span class="nm">{n}</span><span class="st">{s}</span><span class="yr">Year</span><span class="yl"></span></li>'
half = (len(parks) + 1) // 2
c1 = "".join(row(*p) for p in parks[:half]); c2 = "".join(row(*p) for p in parks[half:])

css = """<style>
.hero{position:absolute;left:0;right:0;top:0;height:2.05in;overflow:hidden;background:#1F3A2E}
.hero .ph{position:absolute;inset:0;background:url(cover-photo.jpg) center 62%/cover no-repeat}
.hero .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,38,30,.35) 0%,rgba(20,38,30,.15) 35%,rgba(20,38,30,.85) 100%)}
.hero .tx{position:absolute;left:0.75in;right:0.75in;bottom:0.22in;color:#F5F1EA}
.hero .brand{font:700 8pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:#F5F1EA;position:absolute;left:0.75in;top:0.32in;text-shadow:0 1px 6px rgba(0,0,0,.4)}
.hero h1{color:#F5F1EA;font-size:32pt}
.hero .upd{font:500 9.5pt/1.3 var(--sans);color:#E4E8E1;margin-top:5pt}
.p1{padding-top:2.3in}
.list{display:grid;grid-template-columns:1fr 1fr;gap:0 22pt}
.list ul{list-style:none;margin:0;padding:0}
.list li{display:flex;align-items:center;gap:6pt;height:0.205in;border-bottom:0.6pt solid var(--line);font-size:9pt}
.list .bx{flex:none;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;background:#fff}
.list .nm{font-weight:600;color:var(--forest);white-space:nowrap}
.list .st{font-size:7.5pt;color:#6B6B66;white-space:nowrap;flex:1}
.list .yr{font:600 6.5pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--sage)}
.list .yl{flex:none;width:0.5in;border-bottom:0.8pt solid #BDB5A6;height:9pt}
.tally{display:flex;justify-content:space-between;align-items:center;margin-top:9pt;font-size:8pt;color:#6B6B66}
.tally b{color:var(--forest)}
.tally .tl{display:inline-block;width:0.5in;border-bottom:0.8pt solid #BDB5A6;margin-left:4pt}
.next li{height:21pt}
.promo{background:var(--forest);color:var(--stone);border-radius:8pt;padding:14pt 16pt;margin-top:14pt}
.promo h3{color:var(--stone);margin:0 0 5pt}
.promo .u{font:700 9pt/1.3 var(--sans);color:#F5F1EA;letter-spacing:.02em;margin-top:6pt}
html.bw .hero .ph,html.bw .hero .sh{display:none}
html.bw .hero{background:#fff;border-bottom:2pt solid #222}
html.bw .hero h1,html.bw .hero .brand,html.bw .hero .upd{color:#222;text-shadow:none}
html.bw .promo{background:#fff;color:#222;border:1.2pt solid #222}
html.bw .promo h3,html.bw .promo .u{color:#222}
html.bw .page{background:#fff}
@media print{html,body{background:#fff}}
</style>"""

p1 = f'''<section class="page p1">
<div class="hero"><div class="ph"></div><div class="sh"></div><div class="brand">HikeSupply Co.</div>
<div class="tx"><h1>{T}</h1><div class="upd">Updated for Chiricahua, the 64th park (October 2026). Checked against nps.gov on {CHECKED}.</div></div></div>
<div class="list"><ul>{c1}</ul><ul>{c2}</ul></div>
<div class="tally"><span>Tick a park when you visit, and write the year.</span><span><b>Parks visited:</b><span class="tl"></span> of 64</span></div>
<p class="small" style="margin-top:6pt">The 64 parks are the national parks on the National Park Service list (nps.gov). Other park units such as national monuments, seashores and recreation areas are not included. State abbreviations: AS American Samoa, VI US Virgin Islands.</p>
<div class="folio"><span>{T}</span><span>Free printable from hikesupplyco.com</span></div></section>'''

p2 = f'''<section class="page">
<div class="kicker">Before you go</div><h2>Plan each park visit in 5 minutes</h2>
<p class="lead">Rules, fees and road openings change from season to season. A quick check on the park's own page saves a wasted drive.</p>
<div class="cols">
<div><h3>Check the park's alerts</h3><p>Every park has a page on nps.gov with current alerts: road and trail closures, fire, flooding, snow and construction. Read it the week you go and again the morning you leave.</p></div>
<div><h3>Reservations and timed entry</h3><p>Some parks need a reservation for entry, a scenic road, a cave tour, a ferry or a campground at busy times. The park's page says if you need one. Most are booked on recreation.gov.</p></div>
<div><h3>Passes and fees</h3><p>Many parks charge an entrance fee and some are free. The America the Beautiful annual pass covers entrance at every national park. Prices, discounts and extra fees for visitors from outside the US changed in 2026: check nps.gov for current prices and who qualifies.</p></div>
<div><h3>Free entrance days</h3><p>The National Park Service sets a few fee-free days each year. The dates and who they apply to can change, so check nps.gov before you plan around one.</p></div>
</div>
<div class="warn">Cell signal is weak or missing in many parks. Download maps before you go, carry water, and tell someone your plan and when you will be back.</div>
<h3>My next 5 parks</h3>
<ul class="check next"><li></li><li></li><li></li><li></li><li></li></ul>
<div class="promo"><h3>Want a day hike for every park and a stamp log?</h3>
<p style="margin:0">The US National Parks Hiking Tracker has a page for each of the 64 parks with one beginner-friendly day hike in miles and km, the best months to go, a visit log and a stamp box, plus Canada's national parks.</p>
<div class="u"><a href="https://hikesupplyco.com/products/us-national-parks-hiking-tracker-all-63-parks-canada-printable?utm_source=pdf&amp;utm_medium=free-checklist&amp;utm_campaign=p26" style="color:inherit;text-decoration:none">Find it at hikesupplyco.com</a></div></div>
<div class="folio"><span>{T}</span><span>2</span></div></section>'''

html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css">{css}</head><body>{p1}{p2}</body></html>'
open(os.path.join(here, "index.html"), "w").write(html)
print("ok", len(parks))
