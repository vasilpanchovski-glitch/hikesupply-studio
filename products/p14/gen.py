"""Generates index.html for p14 (Peak Bagger's Logbook). Run: python3 gen.py
Same look as p13 (base.css + extra.css). Peak lists in peaks.py, checked 2026-11-04."""
import os
from peaks import CO, NH, ADK, m
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Peak Bagger's Logbook"
CHECKED = "November 4, 2026"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def fmt(n): return f"{n:,}"

MORE = """
.pb{width:100%;border-collapse:collapse;table-layout:fixed;margin:4pt 0 0}
.pb th{font-size:6.8pt;padding:4pt 4pt}
.pb td{height:21.5pt;padding:2pt 4pt;font-size:9.4pt;vertical-align:middle;border-bottom:0.6pt solid var(--line)}
.pb td.n{font:600 8.5pt/1 var(--serif);color:var(--clay);width:0.28in}
.pb td.b{width:0.32in;text-align:center}
.pb td.b::before{content:"";display:inline-block;width:11pt;height:11pt;border:1.2pt solid var(--forest);border-radius:50%;background:#fff;vertical-align:middle}
.pb td.p{font-weight:600;color:var(--forest)}
.pb td.p small{font:600 6.3pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--sage);margin-left:4pt}
.pb td.r{font-size:8.4pt;color:#6B6B66}
.pb td.e{font-size:8.6pt;white-space:nowrap}
.pb td.e i{font-style:normal;color:#8B8577}
.pb td.d{border-left:0.6pt solid var(--line)}
.pb2{display:grid;grid-template-columns:1fr 1fr;gap:0 16pt}
.pb2 .pb td{height:22.5pt}
.pb2.own .pb td{height:33pt}
.pb2 .pb td.e{padding-left:6pt;font-size:8.3pt}
.g36 ul.check li{padding:7pt 0 7pt 20pt}
.pb2 .pb td.p{white-space:nowrap;font-size:9pt;letter-spacing:-0.01em}
.lg{display:grid;grid-template-columns:1fr 1fr;gap:9pt 10pt;margin-top:6pt}
.lc{background:#fff;border:1pt solid var(--line);border-radius:8pt;padding:7pt 10pt 6pt;height:2.03in;position:relative;overflow:hidden}
.lc .h{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1.6pt solid var(--forest);padding-bottom:3pt;margin-right:0.5in}
.lc .h b{font:600 11pt/1.1 var(--serif);color:var(--forest);white-space:nowrap;letter-spacing:-0.01em}
.lc .h span{font:600 6.6pt/1 var(--sans);letter-spacing:.02em;color:#8B8577;white-space:nowrap;margin-left:6pt}
.lc .no{white-space:nowrap;overflow:hidden;margin-right:0.5in;font:700 6.3pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay);margin-bottom:3pt}
.lc .st{position:absolute;right:9pt;top:8pt;width:0.4in;height:0.4in;border:1.1pt dashed #A39C8D;border-radius:50%;display:flex;align-items:center;justify-content:center;font:700 5.6pt/1.1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#A39C8D;text-align:center}
.lc .r2{display:grid;grid-template-columns:1fr 1fr;gap:0 10pt}
.lc .fl{height:18.5pt;font-size:6.6pt;padding-bottom:2pt}
.lc .wl{height:15pt}
.lc .opts{font-size:7.4pt;gap:2pt 8pt;margin-top:4pt}
.lc .opts span::before{width:7pt;height:7pt}
.lc.blank .h b{color:#A39C8D}
.lhead{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:5pt}
.lhead h2{margin:0;font-size:20pt}
.lhead span{font:600 7.5pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#8B8577}
.facts{display:grid;grid-template-columns:repeat(3,1fr);gap:9pt;margin:10pt 0}
.facts>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:10pt 12pt}
.facts b{display:block;font:600 20pt/1 var(--serif);color:var(--clay)}
.facts span{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.gift{border:2pt solid var(--forest);border-radius:12pt;padding:20pt 24pt;background:#fff;margin-top:8pt}
.gift h3{font-size:19pt;margin:0 0 6pt}
.tagrow{display:flex;gap:16pt;margin-top:14pt;justify-content:center}
.gtag{width:3.1in;height:2.05in;border:1.2pt dashed #A39C8D;border-radius:4pt 40pt 40pt 4pt;background:#fff;padding:12pt 18pt 10pt 16pt;position:relative}
.gtag::after{content:"";position:absolute;right:16pt;top:50%;margin-top:-7pt;width:14pt;height:14pt;border-radius:50%;border:1.2pt solid #A39C8D}
.gtag small{display:block;font:700 7pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay);margin-bottom:4pt}
.gtag b{display:block;font:600 13pt/1.15 var(--serif);color:var(--forest);margin-bottom:6pt;width:2.1in}
.gtag .fl{height:26pt;width:2.3in}
.cut{font:600 7.5pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#A39C8D;text-align:center;margin-top:8pt}
.wt td{height:25pt;font-size:9pt}
.wt td.l{width:1.15in;font-weight:600;color:var(--forest)}
.ph2{display:grid;grid-template-rows:1fr 1fr;gap:14pt;height:8.6in;margin-top:8pt}
.ph2>div{display:grid;grid-template-rows:1fr auto;gap:6pt}
.ph2 .sketch{height:auto}
.cert{border:3pt double var(--forest);border-radius:6pt;height:8.9in;padding:34pt 40pt;text-align:center;background:#fff;display:flex;flex-direction:column;align-items:center}
.cert .k{font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--clay);margin-top:12pt}
.cert h2{font-size:34pt;margin:12pt 0 4pt}
.cert p{font-size:12pt;max-width:5in;color:var(--charcoal)}
.cert .fl{width:5in;height:40pt;font-size:8pt;justify-content:center}
.cert .opts{justify-content:center;font-size:11pt;gap:8pt 22pt;margin:14pt 0 6pt}
.cert .sig{display:grid;grid-template-columns:1fr 1fr;gap:28pt;width:5in;margin-top:auto}
.bkcards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12pt;margin:18pt 0 6pt;width:6.4in}
.bkcards div{border:1pt solid #6E8170;border-radius:9pt;padding:12pt;text-align:left}
.bkcards b{display:block;font:600 13pt/1.2 var(--serif);color:var(--stone);margin-bottom:4pt}
.bkcards span{font-size:9.5pt;color:#CFD6CC;line-height:1.4}
.mr{display:grid;grid-template-columns:1fr;gap:12pt;margin-top:8pt}
.mr>div{background:#fff;border:1pt solid var(--line);border-radius:10pt;padding:20pt 20pt;display:grid;grid-template-columns:2.1in 1fr;gap:16pt;align-items:center}
.mr b{font:600 16pt/1.15 var(--serif);color:var(--forest)}
.mr p{margin:0;font-size:10.8pt;line-height:1.5}
.mr small{display:block;font:700 7pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay);margin-bottom:5pt}
.yrbig{font:600 15pt/1.2 var(--sans);letter-spacing:.06em;color:#F5F1EA;margin-bottom:8pt;text-transform:uppercase}
html.bw .yrbig{color:#222}
html.bw .bkcards b,html.bw .bkcards span{color:#222}
html.bw .lc,html.bw .cert{background:#fff}
"""

# 1 cover
page(f"""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 240 L80 170 L120 200 L210 70 L250 115 L290 90 L360 170 L400 145 L470 220" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M210 70 L210 34 M210 34 L240 42 L210 50" stroke="#F5F1EA" stroke-width="3"/>
<path d="M60 300 C130 285 160 250 215 240 C270 230 300 205 340 196" stroke="#F5F1EA" stroke-width="3" stroke-dasharray="2 10"/>
</svg></div>
<div><div class="yrbig">Summit log and progress boards</div><h1>Peak Bagger's Logbook</h1><p class="sub">Colorado 14ers, New Hampshire 4,000-Footers and Adirondack High Peaks: color in every summit, and keep a log card for each one. Elevations in feet and meters.</p>
<div class="meta" style="margin-top:22pt"><span>40 pages</span><span>152 peaks</span><span>3 famous lists</span></div></div>""", "cover photo")

# 2 gift page
page("""<div class="kicker">A gift for the summit</div><h2>For your next summit</h2>
<div class="fl" style="height:40pt;font-size:10pt">This logbook belongs to</div>
<div class="gift"><h3>A note for you</h3>""" + lines(6, 30) + """
<div class="f2" style="margin-top:6pt"><div class="fl">From</div><div class="fl">Date</div></div></div>
<div class="box" style="margin-top:14pt"><h3 style="margin-top:0">Giving this as a gift?</h3><p style="margin:0">Print the list your hiker is working on (or all three), write a note above and slip the pages into a folder or binder. Add a promise if you like: a ride to the trailhead, a summit snack, or company on the next peak. Cut out a tag below for the wrapping.</p></div>
<div class="tagrow">
<div class="gtag"><small>Gift tag</small><b>One more peak to color in</b><div class="fl">To</div><div class="fl">From</div></div>
<div class="gtag"><small>Gift tag</small><b>See you at the top</b><div class="fl">To</div><div class="fl">From</div></div>
</div><div class="cut">Cut along the dashed line</div>""")

# 3 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this logbook</h2>
<p class="lead">Three of the best-known peak lists in the US, each with a progress board to color in and a log card for every summit. Work on one list or all three.</p>
<div class="ess" style="margin-top:6pt">
<div><div class="n">1</div><div><h3>Read about your list</h3><p>Each list starts with a page on how it works, access and permits, and how its club recognizes finishers.</p></div></div>
<div><div class="n">2</div><div><h3>Color the board</h3><p>Fill in the circle and write the date when you stand on top. The board shows your whole list at a glance.</p></div></div>
<div><div class="n">3</div><div><h3>Fill in the log card</h3><p>One card per peak: date, route, partners, weather, times and a few notes. The dashed circle is for a sticker, a stamp or your initials.</p></div></div>
<div><div class="n">4</div><div><h3>Finish strong</h3><p>Winter round tracker, your own list, photo pages, trip notes, a gear check and a finisher certificate to fill in.</p></div></div>
</div>
<div class="lab" style="margin-top:12pt">Print only what you need</div>
<table class="ltab"><tr><td>Everyone</td><td>Pages 1 to 4 and 32 to 38</td></tr>
<tr><td>Colorado 14ers</td><td>Pages 5 to 15</td></tr>
<tr><td>NH 4,000-Footers</td><td>Pages 16 to 23</td></tr>
<tr><td>Adirondack 46</td><td>Pages 24 to 31</td></tr></table>
<div class="box" style="margin-top:8pt"><h3 style="margin-top:0">Print tips</h3><p style="margin:0">Print at 100% (actual size) on US Letter. A heavier paper (32 lb or card stock) makes the log cards last in a pack. The printer-friendly version uses less ink. Elevations are in feet with meters in gray (1 ft = 0.3048 m).</p></div>
<p class="small" style="margin-top:8pt">We are not affiliated with the Colorado Mountain Club, 14ers.com, the Appalachian Mountain Club or the Adirondack Forty-Sixers. Lists checked against the official sources on {CHECKED}.</p>""")

# 4 safety
page("""<div class="kicker">Before a big peak</div><h2>Honest safety basics</h2>
<p class="lead">A summit is optional. Getting home is not. These basics apply to all three lists.</p>
<div class="ess" style="margin-top:4pt">
<div><div class="n">1</div><div><h3>Start early</h3><p>In the Colorado summer, thunderstorms often build by early afternoon. Aim to be off the summit and exposed ridges before they form. If you hear thunder, head down.</p></div></div>
<div><div class="n">2</div><div><h3>Set a turnaround time</h3><p>Decide before you leave when you will turn back, summit or not, and keep to it. Most trouble starts late in the day.</p></div></div>
<div><div class="n">3</div><div><h3>Check official forecasts</h3><p>Use mountain forecasts, not the town forecast. For the Presidential Range, read the Mount Washington Observatory higher summits forecast. Weather above treeline can turn severe fast.</p></div></div>
<div><div class="n">4</div><div><h3>Know the route</h3><p>Carry a map and know how to use it. Phones die in the cold. Some peaks have no marked trail, and some routes need scrambling or real climbing skills.</p></div></div>
<div><div class="n">5</div><div><h3>Respect the altitude</h3><p>Colorado 14ers start above 14,000 ft (4,267 m). Headache, nausea or dizziness can be signs of altitude sickness. Going down is the best fix. Drink water and eat often.</p></div></div>
<div><div class="n">6</div><div><h3>Tell someone</h3><p>Leave your route and return time with a person at home, and tell them who to call if you are late.</p></div></div>
</div>
<div class="em"><h3>Leave No Trace</h3><p>Stay on the trail or herd path, walk on rock above treeline to protect fragile alpine plants, pack out all trash, and take only photos from the summit.</p></div>
<div class="warn" style="margin-top:10pt">General information only. Conditions, closures and rules change. Check the land manager (Forest Service, National Park Service, NY DEC, state agencies) before every hike, hike within your ability and turn back when in doubt.</div>""")

def board(rows, title, kick, start, extra_head=True):
    head = '<tr><th style="width:0.28in">#</th><th style="width:0.32in"></th><th>Peak</th>' + ('<th style="width:1.05in">Range</th>' if extra_head else '') + '<th style="width:1.15in">Elevation</th><th style="width:1.05in">Date</th></tr>'
    body = ""
    for i, r in enumerate(rows):
        rng, name, ft, u = r
        tag = '<small>unranked</small>' if u else ''
        body += f'<tr><td class="n">{start+i}</td><td class="b"></td><td class="p">{name}{tag}</td><td class="r">{rng}</td><td class="e">{fmt(ft)} ft <i>/ {fmt(m(ft))} m</i></td><td class="d"></td></tr>'
    return f'<div class="kicker">{kick}</div><h2 style="margin-bottom:4pt">{title}</h2><table class="pb">{head}{body}</table>'

def board2(rows, title, kick, intro):
    def tbl(chunk, start):
        head = '<tr><th style="width:0.24in">#</th><th style="width:0.28in"></th><th>Peak</th><th style="width:0.86in">ft / m</th><th style="width:0.56in">Date</th></tr>'
        body = "".join(f'<tr><td class="n">{start+i}</td><td class="b"></td><td class="p">{n}</td><td class="e">{fmt(ft)} <i>/ {fmt(m(ft))}</i></td><td class="d"></td></tr>' for i, (n, ft) in enumerate(chunk))
        return f'<table class="pb">{head}{body}</table>'
    h = (len(rows) + 1) // 2
    return f'<div class="kicker">{kick}</div><h2 style="margin-bottom:2pt">{title}</h2><p class="small" style="margin:0 0 2pt">{intro}</p><div class="pb2">{tbl(rows[:h],1)}{tbl(rows[h:],h+1)}</div>'

def card(i, name, ft, label, blank=False):
    elev = f"{fmt(ft)} ft / {fmt(m(ft))} m" if ft else ""
    return f'''<div class="lc{' blank' if blank else ''}"><div class="st">Stamp</div><div class="no">{label}</div>
<div class="h"><b>{name}</b><span>{elev}</span></div>
<div class="r2"><div class="fl">Date</div><div class="fl">Route / trailhead</div><div class="fl">Start · summit · back</div><div class="fl">With</div><div class="fl">Weather</div><div class="fl">Distance · climb</div></div>
<div class="fl">Notes</div><div class="wl"></div>
<div class="opts"><span>Summit</span><span>Turned back</span><span>Winter</span><span>Solo</span></div></div>'''

def logpages(items, listname, short):
    for k in range(0, len(items), 8):
        chunk = items[k:k+8]
        a, b = k + 1, k + len(chunk)
        page(f'<div class="lhead"><h2>{listname} log</h2><span>Cards {a} to {b}</span></div><div class="lg">' + "".join(chunk) + '</div>')

# 5 Colorado about
page(f"""<div class="kicker">List 1</div><h2>The Colorado 14ers</h2>
<p class="lead">The mountains in Colorado that rise above 14,000 feet (4,267 m). Most lists count 58 named peaks. On 14ers.com, 52 of them stand on their own and 6 are named summits that rise less than 300 ft above the saddle to a higher neighbor (marked unranked on the board).</p>
<div class="facts"><div><b>58</b><span>named peaks on the board</span></div><div><b>{fmt(CO[0][2])} ft</b><span>Mount Elbert, the highest ({fmt(m(CO[0][2]))} m)</span></div><div><b>7</b><span>mountain ranges</span></div></div>
<h3>From walk-ups to real climbs</h3><p>Some 14ers have a well-built trail to the top, such as Quandary, Bierstadt or Elbert by their standard routes. Others, like Capitol, Little Bear, Pyramid and the Maroon Bells, need exposed scrambling on loose rock where a fall can be fatal. Read a current route description, and build up from easier peaks.</p>
<h3>Check access before you go</h3><p>Most 14ers are on National Forest or National Park land, but not all access is public. Culebra Peak is on a private ranch that limits visits and charges a fee. Some peaks, trailheads and parking areas cross private land or charge parking or entrance fees, and access can change from one season to the next. Longs Peak is in Rocky Mountain National Park, which has its own entrance and reservation rules. Check the current rules with the land manager or the landowner.</p>
<h3>Recognition</h3><p>There is no single official club for the Colorado list. Many hikers log their climbs on 14ers.com or join the Colorado Mountain Club. This logbook is your own record.</p>
<div class="warn">Snow lingers high up into early summer, and summer afternoons bring lightning. Mount Blue Sky was called Mount Evans until 2023, so older guides use the old name.</div>""")

# 6-7 CO boards
page(board(CO[:29], "Colorado 14ers progress board", "Board 1 of 2 · highest first", 1))
page(board(CO[29:], "Colorado 14ers progress board", "Board 2 of 2", 30))

# 8-15 CO cards (58 + 6 blank)
co_cards = [card(i, n, ft, f"Colorado 14er {i+1} of 58 · {rng}") for i, (rng, n, ft, u) in enumerate(CO)]
co_cards += [card(0, "Repeat or new route", 0, "Extra card", True) for _ in range(6)]
logpages(co_cards, "Colorado 14ers", "CO")

# 16 NH about
page(f"""<div class="kicker">List 2</div><h2>The New Hampshire 4,000-Footers</h2>
<p class="lead">The 48 peaks in New Hampshire's White Mountains that reach 4,000 feet (1,219 m) and rise at least 200 ft above the col that joins them to a higher neighbor. The list is kept by the Four Thousand Footer Committee of the Appalachian Mountain Club.</p>
<div class="facts"><div><b>48</b><span>peaks on the list</span></div><div><b>{fmt(NH[0][1])} ft</b><span>Mount Washington, the highest ({fmt(m(NH[0][1]))} m)</span></div><div><b>1957</b><span>the year the list began</span></div></div>
<h3>Small numbers, big days</h3><p>These peaks are lower than Colorado's, but the trails are often steep, rocky and rooty, and the climbs are big from the valley floor. Some peaks, like Owl's Head and Isolation, are long days far from any road. Above treeline on the Presidential Range, weather can be among the worst in the country, even in summer.</p>
<h3>Before you go</h3><p>Most of these peaks are in the White Mountain National Forest. Many trailheads need a parking pass or charge a fee, and some roads close in winter. Check the Forest Service and the Mount Washington Observatory higher summits forecast before you head up.</p>
<h3>Recognition</h3><p>The Four Thousand Footer Committee recognizes hikers who climb all 48 on foot. Read the rules and the application on the committee's website and send it in when you finish. There are separate lists and rules for winter rounds.</p>
<div class="warn">The board shows the elevations exactly as the committee publishes them. A few are estimates from map contours, and some peaks have been resurveyed over the years.</div>""")

# 17 NH board
page(board2(NH, "NH 4,000-Footers progress board", "Board · highest first", "Fill in the circle and write the date when you reach the summit. Elevations as published by the AMC Four Thousand Footer Committee."))

# 18-23 NH cards
nh_cards = [card(i, n, ft, f"NH 4,000-Footer {i+1} of 48") for i, (n, ft) in enumerate(NH)]
logpages(nh_cards, "NH 4,000-Footers", "NH")

# 24 ADK about
page(f"""<div class="kicker">List 3</div><h2>The Adirondack High Peaks</h2>
<p class="lead">The 46 High Peaks of New York's Adirondack Mountains, first climbed as a set in the 1920s. The list is kept by the Adirondack Forty-Sixers, and it keeps its original 46, even though later surveys found four of them just under 4,000 ft.</p>
<div class="facts"><div><b>46</b><span>peaks on the list</span></div><div><b>{fmt(ADK[0][1])} ft</b><span>Mount Marcy, the highest in New York ({fmt(m(ADK[0][1]))} m)</span></div><div><b>About 20</b><span>peaks with no official marked trail</span></div></div>
<h3>Trailless peaks</h3><p>Many of the 46 have no official marked trail, only unmarked herd paths. Expect mud, rock slabs, blowdown and some route finding. Carry a map and compass, and know how to use them before you rely on them.</p>
<h3>Rules to check</h3><p>Most of the High Peaks are on New York State Forest Preserve land managed by the Department of Environmental Conservation (DEC). Parking at the Adirondack Mountain Reserve trailhead near St. Huberts needs a free reservation in the busy season, roadside parking is limited on some highways, group sizes are limited, and overnight campers in the Eastern High Peaks must carry a bear-resistant food canister in season. In spring mud season, DEC asks hikers to stay off high trails. Check DEC before every trip.</p>
<h3>Recognition</h3><p>The Adirondack Forty-Sixers recognize hikers who climb all 46. Follow the club's instructions for reporting your climbs.</p>
<div class="warn">Elevations on the board are the traditional heights the list has always used. Blake, Cliff, Nye and Couchsachraga are below 4,000 ft by later surveys and are still part of the 46.</div>""")

# 25 ADK board
page(board2(ADK, "Adirondack 46 progress board", "Board · highest first", "Fill in the circle and write the date when you reach the summit. Traditional elevations, as used by the Adirondack Forty-Sixers."))

# 26-31 ADK cards
adk_cards = [card(i, n, ft, f"Adirondack High Peak {i+1} of 46") for i, (n, ft) in enumerate(ADK)]
adk_cards += [card(0, "Repeat or new route", 0, "Extra card", True) for _ in range(2)]
logpages(adk_cards, "Adirondack 46", "ADK")

# 32 winter round
page("""<div class="kicker">Winter</div><h2>Winter round tracker</h2>
<p class="lead" style="margin-bottom:4pt">Peaks climbed in calendar winter, from the winter solstice to the spring equinox. Each club sets its own rules for winter rounds, so read them before you count a peak.</p>
<div class="f2"><div class="fl">List</div><div class="fl">Winter season</div></div>
<table class="gd wt" style="margin-top:8pt"><tr><th style="width:0.3in">#</th><th>Peak</th><th style="width:1in">Date</th><th style="width:1.5in">Conditions</th><th style="width:1.2in">With</th></tr>""" +
"".join(f'<tr><td style="color:var(--clay);font-weight:600">{i}</td><td></td><td></td><td></td><td></td></tr>' for i in range(1, 19)) + """</table>
<div class="warn">Winter above treeline is serious mountaineering. Short days, deep snow, ice and wind chill call for traction, snowshoes, extra warm layers and the skills to use them. Start with shorter peaks and go with experienced partners.</div>""")

# 33 my own list
def own(start):
    head = '<tr><th style="width:0.28in">#</th><th style="width:0.32in"></th><th>Peak</th><th style="width:0.85in">Elevation</th><th style="width:0.62in">Date</th></tr>'
    return '<table class="pb">' + head + "".join(f'<tr><td class="n">{start+i}</td><td class="b"></td><td></td><td></td><td class="d"></td></tr>' for i in range(15)) + '</table>'
page("""<div class="kicker">Your list</div><h2>My own list</h2>
<p class="lead" style="margin-bottom:6pt">State high points, your local fire towers, a park's best summits or the hills near home: make your own list of up to 30 peaks.</p>
<div class="f2"><div class="fl">List name</div><div class="fl">Started on</div></div>
<div class="pb2 own" style="margin-top:6pt">""" + own(1) + own(16) + "</div>")

# 34 photos
page("""<div class="kicker">Summit photos</div><h2>From the top</h2><div class="ph2">
<div><div class="sketch"><span>Stick a summit photo here</span></div><div class="f2"><div class="fl">Peak</div><div class="fl">Date</div></div></div>
<div><div class="sketch"><span>Stick a summit photo here</span></div><div class="f2"><div class="fl">Peak</div><div class="fl">Date</div></div></div></div>""")

# 35 trip notes
page("""<div class="kicker">Notes</div><h2>Trip notes</h2>
<p class="lead" style="margin-bottom:4pt">For multi-peak days, traverses, failed attempts worth remembering, and the people you met on top.</p>""" + lines(22, 27))

# 36 gear check
page("""<div class="kicker">Gear</div><h2>Summit day gear check</h2>
<div class="cl g36">
<div><h3>Every peak</h3>""" + chk(["Map, and a compass you can use", "Phone with offline maps, and a power bank", "Headlamp with spare batteries", "Rain jacket and a warm layer", "Hat and gloves (yes, in summer too)", "Plenty of water and salty snacks", "Sunscreen, sunglasses and lip balm", "First aid kit and blister care", "Whistle and an emergency blanket", "Trip plan left with someone at home"]) + """</div>
<div><h3>High, cold or long days</h3>""" + chk(["Helmet for loose, rocky routes", "Traction devices for ice", "Snowshoes for deep snow", "Insulated jacket and spare mittens", "Insulated bottle with a warm drink", "Goggles or a face cover for wind", "Extra food for a slower day", "Water filter or treatment", "Trekking poles", "Bear canister where it is required"]) + """</div></div>
<div class="lab" style="margin-top:14pt">My own additions</div>""" + lines(6, 30) + """
<div class="opts" style="margin-top:8pt"><span>Forecast checked</span><span>Turnaround time set</span><span>Trailhead and parking rules checked</span><span>Route description read</span></div>""")

# 37 certificate
page("""<div class="cert"><svg width="120" height="66" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 95 L40 60 L60 75 L100 18 L120 40 L140 28 L200 90" stroke="#2C3B2E" stroke-width="5"/><path d="M100 18 L100 2 M100 2 L118 7 L100 12" stroke="#B85C38" stroke-width="4"/></svg>
<div class="k">Summit list finisher</div><h2>Certificate of Completion</h2><p>This certifies that</p>
<div class="fl"></div><p style="margin-top:12pt">has stood on the summit of every peak on the list</p>
<div class="opts"><span>Colorado 14ers</span><span>NH 4,000-Footers</span><span>Adirondack 46</span><span>My own list</span></div>
<div class="fl" style="height:40pt">Number of peaks</div><div class="fl" style="height:40pt">First peak and date</div><div class="fl" style="height:40pt">Final peak and date</div>
<div class="sig"><div class="fl" style="width:auto">Signed</div><div class="fl" style="width:auto">Witnessed by</div></div>
<p class="small" style="margin-top:16pt">A personal keepsake from HikeSupply Co., not an official club certificate. Each club has its own way to recognize finishers.</p></div>""")

# 38 sources
page(f"""<div class="kicker">Sources</div><h2>Checked against the official lists</h2>
<p class="lead">Peak names and elevations were checked against the sources below on {CHECKED}. Lists, names and surveys change from time to time, so check the source if a number matters to you.</p>
<div class="src" style="margin-top:6pt">
<div><h3>Colorado 14ers</h3><div class="url">14ers.com</div><p>All 58 named 14ers with the elevations 14ers.com publishes. "Unranked" peaks rise less than 300 ft above the saddle to a higher neighbor.</p></div>
<div><h3>NH 4,000-Footers</h3><div class="url">amc4000footer.org</div><p>The 48 peaks and elevations of the AMC Four Thousand Footer Committee. Some are estimates from map contours. Finisher applications are on this site.</p></div>
<div><h3>Adirondack 46</h3><div class="url">adk46er.org</div><p>The Adirondack Forty-Sixers list with its traditional elevations, and how the club recognizes finishers.</p></div>
<div><h3>Rules and conditions</h3><div class="url">fs.usda.gov · nps.gov · dec.ny.gov</div><p>Trail conditions, closures, parking reservations, permits and food storage rules come from the land managers. Mountain forecasts: weather.gov and mountwashington.org.</p></div>
</div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Not affiliated</h3><p style="margin:0">HikeSupply Co. is not affiliated with or endorsed by the Colorado Mountain Club, 14ers.com, the Appalachian Mountain Club, its Four Thousand Footer Committee or the Adirondack Forty-Sixers. List names are used only to describe which peaks are included.</p></div>
<div class="lab" style="margin-top:12pt">I checked my list again on</div>
<div class="f2"><div class="fl">Date</div><div class="fl">Changes I noted</div></div>""")

# 39 more from HikeSupply
page("""<div class="kicker">Keep going</div><h2>More from HikeSupply</h2>
<p class="lead">Made in the same style, printable, and written for hikers in the US and Canada.</p>
<div class="mr">
<div><div><small>Log every hike</small><b>Hiking Journal &amp; Trail Log</b></div><p>A page for every hike you do, not just the summits: trail, distance, weather, who came along and what you saw.</p></div>
<div><div><small>Another list to finish</small><b>US National Parks Hiking Tracker</b></div><p>All 64 US national parks plus Canada's, with a board to color in and a page for each visit.</p></div>
<div><div><small>Get ready for bigger peaks</small><b>Trail Ready</b></div><p>An 8-week beginner hiking training plan that builds up the legs and lungs for longer days and bigger climbs.</p></div>
</div>
<p style="margin-top:18pt;font:600 11pt/1.4 var(--sans);letter-spacing:.06em;color:var(--forest);text-align:center">hikesupplyco.com</p>""")

# 40 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 95 L40 60 L60 75 L100 18 L120 40 L140 28 L200 90" stroke="#F5F1EA" stroke-width="4"/><path d="M100 18 L100 2 M100 2 L118 7 L100 12" stroke="#F5F1EA" stroke-width="3"/></svg>
<h2 style="margin-top:22pt">See you at the top</h2>
<p>Thank you for choosing a HikeSupply logbook. Go early, turn back when you need to, and color in every peak you earn.</p>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt;max-width:5.4in">General information only, not a route guide. Mountain hiking has real risks. Check official land manager and weather sources before every hike, hike within your ability and turn back when in doubt. Not affiliated with any peak list club. For personal use only. COVERCREDIT</p>""", "back")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip()
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
