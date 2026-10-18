"""Generates index.html for p01. Run: python3 gen.py"""
T = "Hiking Journal &amp; Trail Log"
pages = []
def page(body, n, cls=""):
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if n else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def lines(k, h=24):
    return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def lab(t): return f'<div class="lab">{t}</div>'

CSS = """<style>
.lab{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest);margin:10pt 0 2pt}
.wl{border-bottom:0.8pt solid #CFC7B6}
.f2{display:grid;grid-template-columns:1fr 1fr;gap:0 22pt}
.fl{display:flex;align-items:flex-end;gap:6pt;height:27pt;border-bottom:0.8pt solid #CFC7B6;font:600 8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);padding-bottom:3pt}
.fl .u{margin-left:auto;font-weight:500;color:#8B8577;letter-spacing:.04em;text-transform:none;font-size:8.5pt}
.fl .u b{display:inline-block;width:0.55in}
.opts{display:flex;flex-wrap:wrap;gap:4pt 11pt;font-size:9pt;margin-top:4pt}
.opts span::before{content:"";display:inline-block;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-right:5pt;vertical-align:-1pt;background:#fff}
.sq{display:inline-flex;gap:5pt;vertical-align:middle}
.sq i{display:inline-block;width:13pt;height:13pt;border:1.1pt solid var(--forest);border-radius:3pt;background:#fff;font:600 7pt/13pt var(--sans);font-style:normal;text-align:center;color:#8B8577}
.sketch{border:1pt solid #CFC7B6;border-radius:8pt;background:#fff;position:relative}
.sketch span{position:absolute;left:10pt;top:8pt;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#A39C8D}
.hikehead{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:6pt;margin-bottom:2pt}
.hikehead .no{font:600 26pt/1 var(--serif);color:var(--forest)}
.hikehead .no small{font:700 8pt/1 var(--sans);letter-spacing:.16em;color:var(--clay);display:block;margin-bottom:6pt;text-transform:uppercase}
.hikehead .date{font:600 8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);width:2.6in;border-bottom:0.8pt solid #CFC7B6;padding-bottom:3pt}
.weeks{display:grid;grid-template-columns:repeat(4,1fr);gap:6pt}
.wk{border:0.8pt solid #CFC7B6;border-radius:5pt;background:#fff;height:0.58in;padding:4pt 6pt;font:700 7pt/1 var(--sans);letter-spacing:.08em;color:var(--sage);text-transform:uppercase;position:relative}
.wk:not(.nobox)::after{content:"";position:absolute;right:6pt;top:5pt;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt}
.tbl td{height:26pt;background:#fff}
.tbl{background:#fff}
.fame{border:0.8pt solid #CFC7B6;border-radius:8pt;background:#fff;padding:8pt 12pt 6pt;margin-bottom:9pt}
.fame .fl{height:26pt}
.back{background:var(--forest);color:var(--stone);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.back h2{color:var(--stone)}
.conv{display:grid;grid-template-columns:repeat(4,1fr);gap:8pt;margin-top:8pt}
.conv div{background:var(--soft);border-radius:6pt;padding:8pt;font-size:9pt;text-align:center}
.conv b{display:block;font:600 12pt/1.2 var(--serif);color:var(--forest)}
@media print{html,body{background:#fff}}
.cover.photo{position:relative;overflow:hidden;background:#1F3A2E}
.cover.photo .cphoto{position:absolute;inset:0;background:url(cover-photo.jpg) center top/cover no-repeat}
.cover.photo .cshade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,38,30,.55) 0%,rgba(20,38,30,0) 18%,rgba(20,38,30,0) 42%,rgba(20,38,30,.82) 70%,rgba(20,38,30,.96) 100%)}
.cover.photo .brand{color:#F5F1EA;text-shadow:0 1px 6px rgba(0,0,0,.4)}
.cover.photo .bwart{display:none}
.cover.photo .sub{color:#E4E8E1}
html.bw .cover.photo .cphoto,html.bw .cover.photo .cshade{display:none}
html.bw .cover.photo .bwart{display:flex}
html.bw .cover.photo .brand{color:#222;text-shadow:none}
html.bw .cover.photo .sub{color:#333}
html.bw .page{background:#fff}
html.bw .cover,html.bw .back{background:#fff;color:#222;border:2pt solid #222;}
html.bw .cover h1,html.bw .back h2{color:#222}
html.bw .cover .sub,html.bw .cover .meta,html.bw .back p{color:#333}
html.bw .cover svg *{stroke:#222}
html.bw .cover svg .fillsun{fill:none}
html.bw .box.forest,html.bw .box.forest h3{color:#222}
html.bw .back p,html.bw .back .brand{color:#333 !important}
html.bw .box,html.bw .conv div{background:#fff;border:0.8pt solid #999}
html.bw .warn{background:#fff}
html.bw{--forest:#222;--clay:#555;--sage:#666;--rust:#333;--soft:#fff}
html.bw .cover svg .fillsun{stroke:#222}
html.bw .wl,html.bw .fl,html.bw .wk,html.bw .sketch,html.bw .fame,html.bw .hikehead .date,html.bw td{border-color:#bbb !important}
</style>"""

# 1 cover (real photo: Pexels 28848588 by Ali Kazal, free licence; line art is used in the printer-friendly version)
page(f'''<div class="cphoto"></div><div class="cshade"></div>
<div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="460" height="330" viewBox="0 0 460 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle class="fillsun" cx="350" cy="70" r="26" fill="#B85C38" stroke="#B85C38" stroke-width="3"/>
<path d="M10 300 L140 110 L200 185 L265 95 L450 300" stroke="#F5F1EA" stroke-width="4"/>
<path d="M118 142 L140 110 L160 135" stroke="#F5F1EA" stroke-width="3"/>
<path d="M245 124 L265 95 L290 128" stroke="#F5F1EA" stroke-width="3"/>
<path d="M150 300 C 190 270, 250 285, 230 250 S 280 215, 262 190" stroke="#8A9A7E" stroke-width="3" stroke-dasharray="2 9"/>
<path d="M40 300 L60 262 L80 300 M62 300 L62 310" stroke="#8A9A7E" stroke-width="3"/>
<path d="M380 300 L398 268 L416 300 M398 300 L398 310" stroke="#8A9A7E" stroke-width="3"/>
<path d="M0 312 L460 312" stroke="#F5F1EA" stroke-width="2"/>
</svg></div>
<div style="position:relative"><h1>Hiking Journal &amp; Trail Log</h1><p class="sub">A year of trails, one page at a time. Log every hike, keep your favorites, and see how far you went.</p>
<div class="meta" style="margin-top:22pt"><span>52 hike pages</span><span>Miles + km</span><span>Instant PDF download</span></div></div>''', 0, "cover photo")

# 2 how to use
page(f'''<div class="kicker">Start here</div><h2>How to use this journal</h2>
<p class="lead">This journal is made to be printed and filled in by hand. Fill in a log page after each hike, while the details are still fresh. A few lines are enough.</p>
<h3>What is inside</h3>
<ul class="check">
<li>About me and my goals for the year</li>
<li>A 52-week tracker and a monthly distance tracker</li>
<li>A trail bucket list and a hall of fame for your best hikes</li>
<li>52 hike log pages, one hike per page</li>
<li>Gear notes, favorite trail snacks, notes and a year-end look back</li>
</ul>
<h3>Printing tips</h3>
<div class="cols">
<div><p><b>Paper.</b> Heavier paper takes ink better. Try 28 to 32 lb (105 to 120 gsm) paper, or light card stock around 65 lb (176 gsm) if your printer accepts it.</p>
<p><b>Size.</b> Print at "Actual size" on US Letter. An A4 version is included; if you print the Letter file on A4, choose "Fit to page".</p></div>
<div><p><b>Binding.</b> Three-hole punch the pages into a binder, or ask a print shop to spiral-bind them. The margins leave room for both.</p>
<p><b>Only what you need.</b> Print a handful of log pages at a time and reprint more whenever you like. A printer-friendly version with less ink is included too.</p></div>
</div>
<div class="box"><h3 style="margin-top:0">Units</h3><p style="margin:0">Every log page has room for miles and kilometers, feet and meters. Use the one you know, or both. The quick conversions are on the distance tracker page.</p></div>
<div class="box forest"><h3>Filling in a log page</h3><ol class="steps" style="margin:0">
<li>Jot the basics at the trailhead or in the car: date, trail, start time.</li>
<li>Copy distance and elevation gain from the trail sign, park map or your app. Rough numbers are fine.</li>
<li>Write the best moment the same evening, while you still remember the small things.</li>
<li>Use the sketch box for a quick map, a leaf rubbing, a ticket stub or a printed photo.</li>
</ol></div>
<div class="warn"><b>Before every hike</b>, check the weather and trail conditions with the park or land manager, and tell someone where you are going and when you plan to be back.</div>''', 2)

# 3 about me
page(f'''<div class="kicker">This journal belongs to</div><h2>About me</h2>
<div class="fl">Name</div><div class="fl">Home trails</div><div class="fl">Hiking since</div><div class="fl">Favorite kind of hike</div>
{lab("If found, please contact")}{lines(1)}
<h3 style="margin-top:18pt">My hiking goals for the year</h3>
<div class="f2"><div class="fl">Number of hikes<span class="u"><b></b></span></div><div class="fl">Total distance<span class="u"><b></b> mi / <b></b> km</span></div></div>
{lab("Three trails I want to hike")}{lines(3)}
{lab("One skill I want to learn (map and compass, first aid, winter hiking...)")}{lines(2)}
{lab("A hike I want to do with someone special")}{lines(2)}
{lab("Why I hike")}{lines(4)}
{lab("Where I want to be by the end of the year")}{lines(3)}''', 3)

# 4 52-week tracker
wk = "".join(f'<div class="wk">Week {i}</div>' for i in range(1, 53))
page(f'''<div class="kicker">Year tracker</div><h2>52 weeks of hiking</h2>
<p>Write the trail name in the box and tick the corner when you get out that week. Short walks count.</p>
<div class="weeks">{wk}</div>''', 4)

# 5 distance tracker
months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
rows = "".join(f"<tr><td>{m}</td><td></td><td></td><td></td><td></td><td></td></tr>" for m in months)
page(f'''<div class="kicker">Distance tracker</div><h2>Miles and kilometers this year</h2>
<table class="tbl"><tr><th>Month</th><th>Hikes</th><th>Miles</th><th>Km</th><th>Gain (ft)</th><th>Gain (m)</th></tr>{rows}
<tr><td><b>Year total</b></td><td></td><td></td><td></td><td></td><td></td></tr></table>
<h3>Quick conversions</h3>
<div class="conv"><div><b>1 mi = 1.61 km</b>1 km = 0.62 mi</div><div><b>5 mi = 8 km</b>10 km = 6.2 mi</div><div><b>1 ft = 0.30 m</b>1 m = 3.28 ft</div><div><b>1,000 ft = 305 m</b>500 m = 1,640 ft</div></div>
<h3>Goal progress</h3><p class="small" style="margin-bottom:4pt">Write your distance goal under the bar, split it into ten equal steps, and shade one box each time you pass a step.</p>
<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4pt"><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div><div class="wk nobox" style="height:0.45in"></div></div>
<div style="display:flex;justify-content:space-between;font-size:8.5pt;color:#8B8577;margin-top:6pt"><span>Start</span><span>Goal: ________ mi / ________ km</span></div>
<h3>Personal bests</h3><div class="f2"><div class="fl">Longest hike<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Biggest climb<span class="u"><b></b> ft / <b></b> m</span></div>
<div class="fl">Highest point<span class="u"><b></b> ft / <b></b> m</span></div><div class="fl">Most hikes in a month</div></div>''', 5)

# 6 bucket list
rows = "".join("<tr><td></td><td></td><td></td><td></td><td></td></tr>" for _ in range(23))
page(f'''<div class="kicker">Someday soon</div><h2>Trail bucket list</h2>
<p>Trails, parks and summits you want to reach. Tick them off as you go.</p>
<table class="tbl"><tr><th style="width:32%">Trail or summit</th><th style="width:24%">Park / area</th><th>State / Prov.</th><th>Distance</th><th style="width:12%">Done</th></tr>{rows}</table>''', 6)

# 7 hall of fame
fame = "".join(f'''<div class="fame"><div class="f2"><div class="fl">Trail</div><div class="fl">Date</div></div><div class="fl">Why it made the list</div><div class="fl"></div><div class="fl"></div></div>''' for _ in range(5))
page(f'''<div class="kicker">The best ones</div><h2>Favorite hikes hall of fame</h2>{fame}''', 7)

# 8-59 hike logs
for i in range(1, 53):
    n = 7 + i
    page(f'''<div class="hikehead"><div class="no"><small>Trail log</small>Hike {i:02d}</div><div class="date">Date</div></div>
<div class="f2">
<div class="fl">Trail</div><div class="fl">Park / area</div>
<div class="fl">Start time</div><div class="fl">Finish time</div>
<div class="fl">Distance<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Elevation gain<span class="u"><b></b> ft / <b></b> m</span></div>
<div class="fl">Total time</div><div class="fl">Hiked with</div>
</div>
<div class="f2" style="margin-top:9pt">
<div>{lab("How hard was it?")}<div class="sq" style="margin-top:3pt"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div><span class="small" style="margin-left:6pt">easy to very hard</span></div>
<div>{lab("Weather")}<div class="opts" style="gap:4pt 8pt;font-size:8.5pt"><span>Sunny</span><span>Cloudy</span><span>Rain</span><span>Snow</span><span>Wind</span></div><div class="small" style="margin-top:4pt">Temp: ______ °F / ______ °C</div></div>
</div>
{lab("Trail conditions")}<div class="opts"><span>Dry</span><span>Muddy</span><span>Rocky</span><span>Roots</span><span>Snow / ice</span><span>Overgrown</span><span>Busy</span><span>Quiet</span></div><div style="height:4pt"></div>
{lab("Wildlife and plants I saw")}{lines(2)}
{lab("Best moment")}{lines(3)}
{lab("What I would do differently")}{lines(2)}
<div class="sketch" style="height:2.5in;margin-top:12pt"><span>Sketch, map or photo</span></div>''', n)

# 60 gear
page(f'''<div class="kicker">Gear notes</div><h2>Gear that worked, gear to change</h2>
<div class="cols"><div>{lab("Worked great")}{lines(18)}</div><div>{lab("Change, fix or replace")}{lines(18)}</div></div>
{lab("Wish list")}{lines(7)}''', 60)

# 61 snacks
rows = "".join("<tr><td></td><td></td><td></td><td></td></tr>" for _ in range(23))
page(f'''<div class="kicker">Fuel</div><h2>Trail snacks I loved</h2>
<p>What tasted good at the top, what traveled well, and what to skip next time.</p>
<table class="tbl"><tr><th style="width:34%">Snack</th><th style="width:26%">Where to get it</th><th style="width:14%">Rating</th><th>Notes</th></tr>{rows}</table>''', 61)

# 62 notes
page(f'''<div class="kicker">Notes</div><h2>Notes</h2>{lines(27)}''', 62)

# 63 year end
page(f'''<div class="kicker">Looking back</div><h2>My hiking year</h2>
<div class="f2"><div class="fl">Hikes this year</div><div class="fl">Distance<span class="u"><b></b> mi / <b></b> km</span></div>
<div class="fl">New trails</div><div class="fl">Elevation gain<span class="u"><b></b> ft / <b></b> m</span></div></div>
{lab("My favorite hike and why")}{lines(3)}
{lab("The hardest hike, and how I got through it")}{lines(3)}
{lab("Something I learned on the trail")}{lines(2)}
{lab("People I want to thank")}{lines(2)}
{lab("A view I never want to forget")}{lines(3)}
{lab("Next year I want to")}{lines(4)}
{lab("One word for my hiking year")}{lines(1)}''', 63)

# 64 back
page('''<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:22pt">HikeSupply Co.</div>
<h2 style="font-size:30pt">See you on the trail</h2>
<p style="max-width:4.6in;color:#D9DED6;font-size:12pt">More printable guides, checklists and trail gear at</p>
<p style="font:600 16pt/1 var(--serif);color:var(--stone);margin-top:6pt">hikesupplyco.com</p>
<p style="max-width:4.8in;color:#AEB8AB;font-size:8.5pt;margin-top:60pt">For personal use. You may print as many copies as you need for yourself and your family. Please do not resell or share the file. Cover photo: Ali Kazal / Pexels. Always check current conditions and rules with the park or land manager before you hike.</p>''', 0, "back")

html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css">{CSS}</head><body>\n' + "\n".join(pages) + "\n</body></html>"
open("index.html", "w").write(html)
print(len(pages), "pages")
