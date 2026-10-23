"""Generates index.html for p06 (Yellowstone & Grand Teton — Trip Planning Guide). Run: python3 gen.py
Base styles in base.css (shared look with p03/p05). Facts checked against nps.gov pages in October 2026
(trail pages, fees, roads, campgrounds, seasons, directions, Grand Teton FAQ) and the official booking sites."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Yellowstone & Grand Teton"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))

EXTRA = """
.glance{display:grid;grid-template-columns:1fr 1fr;gap:12pt;margin-top:6pt}
.glance>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:12pt 14pt}
.glance h3{margin:0 0 6pt;font-size:15pt}
.glance table{margin:0}
.glance td{font-size:10pt;padding:5pt 4pt;line-height:1.35}
.glance td:first-child{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--sage);width:0.85in;padding-top:7pt}
.seas{display:grid;grid-template-columns:1fr 1fr;gap:10pt;margin-top:4pt}
.seas>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 13pt}
.seas>div.best{border:1.6pt solid var(--forest)}
.seas h3{margin:0 0 2pt;font-size:13.5pt}
.seas .m{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin-bottom:6pt}
.seas p{margin:0;font-size:10.2pt;line-height:1.45}
.bk{border-top:1.5pt solid var(--forest);margin-top:6pt}
.bk>div{display:grid;grid-template-columns:1.25in 1fr;gap:14pt;padding:10pt 0;border-bottom:0.6pt solid var(--line)}
.bk b{font:600 13pt/1.2 var(--serif);color:var(--forest)}
.bk p{margin:0;font-size:10.3pt;line-height:1.45}
.fee td{font-size:10pt;padding:6pt 6pt}
.plan{border:1pt solid var(--line);border-radius:9pt;background:#fff;padding:11pt 14pt;margin-bottom:10pt}
.plan .ph{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2pt solid var(--forest);padding-bottom:5pt;margin-bottom:3pt}
.plan .ph b{font:600 17pt/1 var(--serif);color:var(--forest)}
.plan .ph span{font:600 8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#8B8577}
.plan .d{display:grid;grid-template-columns:0.62in 1fr;gap:10pt;padding:6pt 0;border-bottom:0.6pt solid var(--line);font-size:10pt;line-height:1.42}
.plan .d:last-child{border-bottom:0}
.plan .d i{font:normal 700 7.5pt/1.5 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay)}
.reg{display:grid;grid-template-columns:1fr;gap:10pt}
.reg>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:13pt 17pt}
.reg h3{margin:0 0 5pt;font-size:16pt}
.reg .w{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin-bottom:5pt}
.reg p{margin:0 0 6pt;font-size:11.2pt;line-height:1.55}
.reg p:last-child{margin:0}
.hk{background:#fff;border:1pt solid var(--line);border-radius:10pt;padding:15pt 18pt;margin-bottom:13pt}
.hk .top{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:6pt}
.hk .top h3{margin:0;font-size:20pt}
.hk .top small{display:block;font:700 7.5pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay);margin-bottom:5pt}
.hk .top .lv{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest);border:1.2pt solid var(--forest);border-radius:20pt;padding:4pt 8pt;white-space:nowrap}
.hk .st{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin:11pt 0 9pt;border-bottom:0.6pt solid var(--line);padding-bottom:10pt}
.hk .st div{font-size:10pt;line-height:1.3;padding-right:6pt}
.hk .st b{display:block;font:700 6.8pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin-bottom:4pt}
.hk .st span{font:600 15pt/1.2 var(--serif);color:var(--forest);display:block}
.hk .st em{font-style:normal;font-size:9.3pt;color:#6B6B66}
.hk p{margin:0 0 6pt;font-size:10.9pt;line-height:1.52}
.hk p:last-child{margin:0}
.hk .lb{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest);margin-right:4pt}
.hk .nt{margin-top:9pt;font-size:10.4pt;line-height:1.45;background:var(--soft);border-radius:6pt;padding:9pt 12pt}
.dist{display:grid;grid-template-columns:1fr 1fr;gap:12pt;margin:8pt 0 4pt}
.dist>div{border-radius:10pt;padding:14pt 16pt;text-align:center}
.dist .a{background:var(--forest);color:var(--stone)}
.dist .b{background:#fff;border:1.6pt solid var(--forest)}
.dist .n{font:600 34pt/1 var(--serif)}
.dist .a .n{color:var(--stone)} .dist .b .n{color:var(--forest)}
.dist .u{font:700 8pt/1.3 var(--sans);letter-spacing:.12em;text-transform:uppercase;margin-top:4pt}
.dist p{margin:6pt 0 0;font-size:10.3pt}
.dist .a p{color:#D9DED6}
.wild{display:grid;grid-template-columns:repeat(3,1fr);gap:0 16pt}
.wild ul.check li{font-size:10.2pt;padding:5pt 0 5pt 19pt}
.wild ul.check li{display:flex;align-items:flex-end}.wild ul.check li span{flex:1;margin-left:8pt;border-bottom:0.8pt solid #CFC7B6;height:10pt;min-width:0.3in}
.dp .fl{height:28pt}
.bud td{height:30pt;font-size:10.5pt}
.src>div{min-height:1.62in}.bud td.a{width:1.05in;border-left:0.6pt solid var(--line)}
.bud td.c{font-weight:600;color:var(--forest)}
.bud tr.tot td{border-top:1.5pt solid var(--forest);font-weight:700;color:var(--forest)}
.qq{border-top:1.5pt solid var(--forest);margin-top:4pt}
.qq>div{padding:8pt 0 4pt;border-bottom:0.6pt solid var(--line)}
.qq b{display:block;font-size:10.8pt;color:var(--forest);font-weight:600;margin-bottom:2pt}
.qq .wl{height:36pt;border-bottom:0.8pt dashed #CFC7B6}
.bkcards{display:grid;grid-template-columns:1fr 1fr;gap:12pt;margin:18pt 0 6pt;width:5.6in}
.bkcards div{border:1pt solid #6E8170;border-radius:9pt;padding:12pt;text-align:left}
.bkcards b{display:block;font:600 13pt/1.2 var(--serif);color:var(--stone);margin-bottom:4pt}
.bkcards span{font-size:9.5pt;color:#CFD6CC;line-height:1.4}
html.bw .dist .a{background:#fff;color:#222;border:1.6pt solid #222}
html.bw .dist .a .n,html.bw .dist .a p{color:#222}
html.bw .bkcards b,html.bw .bkcards span{color:#222}
html.bw .hk .nt{background:#fff;border:0.6pt solid #999}
"""

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 270 L70 190 L110 210 L165 110 L190 140 L225 60 L250 100 L268 80 L300 150 L340 120 L400 200 L470 250" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M212 90 L225 60 L238 84 M156 128 L165 110 L175 125" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M0 290 Q120 270 235 286 T470 280" stroke="#F5F1EA" stroke-width="3"/>
<path d="M40 318 L56 280 L72 318 Z M400 316 L418 270 L436 316 Z M372 318 L386 286 L400 318 Z" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M120 320 C170 306 230 312 270 300 C300 292 320 296 350 290" stroke="#F5F1EA" stroke-width="3" stroke-dasharray="2 10"/>
</svg></div>
<div><h1>Yellowstone &amp; Grand Teton</h1><p class="sub">A trip planning guide for first-time visitors. When to go and when to book, 3, 5 and 7-day plans, 16 beginner day hikes, and the safety rules that matter most in these two parks.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>16 day hikes</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page("""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">Yellowstone and Grand Teton sit next to each other in the northwest corner of Wyoming, joined by one road. Together they make one of the best first national park trips in North America: geysers, canyons, wildlife and some of the most famous mountain views anywhere.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["Both parks at a glance, and when to go", "A booking timeline, fees and passes", "Airports and gateway towns", "Sample 3, 5 and 7-day plans", "10 Yellowstone and 6 Grand Teton day hikes", "Thermal, wildlife and weather safety", "What to download before you lose signal", "Packing list, day plans, budget and trip log"]) + """</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers. Every hike in this guide is a day hike on a marked trail, from a 20-minute walk to a half-day climb.</p>
<h3>How to read the hikes</h3><p>Distances are round trip, in miles and kilometers. Elevation gain is in feet and meters. Times are the ranges the National Park Service gives. Where the park lists no gain figure, we describe the climb in words instead of guessing.</p></div></div>
<div class="box forest"><h3>Checked against nps.gov in October 2026</h3><p style="margin:0">Fees, road dates, trail closures and booking rules change every year, and weather, bears and thermal activity can close areas at short notice. Before you go, check the official pages on page 28, and ask a ranger when you arrive.</p></div>
<h3>Print it or keep it offline</h3>
<p>Most of both parks has no cell signal. Print the pages you need, or save this PDF to your phone before you leave home. The fill-in pages (23 to 27) are made for printing.</p>""")

# 3 at a glance
page("""<div class="kicker">The two parks</div><h2>At a glance</h2>
<p class="lead">Yellowstone is big and spread out: you drive between areas and take short walks at each stop. Grand Teton is smaller and built around one mountain range and a chain of lakes, so hikes start close together.</p>
<div class="glance">
<div><h3>Yellowstone</h3><table>
<tr><td>Size</td><td>Nearly 3,500 sq mi (9,000 km²), in Wyoming, Montana and Idaho</td></tr>
<tr><td>Entrances</td><td>Five: North, Northeast, East, South and West. Several hours of driving between them</td></tr>
<tr><td>Main road</td><td>The Grand Loop, a figure eight of about 142 mi (229 km) linking the main areas</td></tr>
<tr><td>Height</td><td>Most of the park is above 7,000 ft (2,100 m)</td></tr>
<tr><td>Known for</td><td>Geysers and hot springs, the Grand Canyon of the Yellowstone, bison, elk, wolves and bears</td></tr></table></div>
<div><h3>Grand Teton</h3><table>
<tr><td>Size</td><td>About 310,000 acres (1,250 km²), in Wyoming</td></tr>
<tr><td>Entrances</td><td>Moose and Granite Canyon in the south, Moran in the east, and from Yellowstone in the north</td></tr>
<tr><td>Main roads</td><td>Teton Park Road along the lakes, and the outer highway US 89/191</td></tr>
<tr><td>Height</td><td>Valley floor around 6,500 ft (2,000 m); peaks rise steeply above it</td></tr>
<tr><td>Known for</td><td>The Teton Range, Jenny Lake, moose, short lake hikes, the town of Jackson</td></tr></table></div></div>
<div class="box"><h3 style="margin-top:0">How they connect</h3><p style="margin:0">Yellowstone's South Entrance leads straight into the John D. Rockefeller, Jr. Memorial Parkway and on to Grand Teton. The NPS says the drive from Grand Teton's southern edge to Yellowstone takes a little more than an hour without stops. Each park charges its own entrance fee (page 5).</p></div>
<div class="warn"><b>Plan for driving time.</b> Speed limits are low, roads are busy in summer, and traffic stops for wildlife. A day that looks like 60 miles on the map can take three hours with stops.</div>""")

# 4 when to go
page("""<div class="kicker">Timing</div><h2>When to go</h2>
<p class="lead">For a first hiking trip, mid-June to mid-September is the easiest window: roads, lodges and trails are open and the snow is mostly gone from beginner trails.</p>
<div class="seas">
<div><div class="m">Late April to early June</div><h3>Spring</h3><p>Yellowstone roads reopen in stages from mid-April, and most are open by Memorial Day weekend. Snow lingers on higher trails into June. Baby bison and elk. Some trails close for bear activity.</p></div>
<div class="best"><div class="m">Mid-June to August</div><h3>Summer</h3><p>Everything is open, and it is the busiest time of year. Warm days and cool nights. Afternoon thunderstorms are frequent in July. Start early: the NPS suggests arriving at big sights before 7 am or after 12 pm.</p></div>
<div class="best"><div class="m">September</div><h3>Early fall</h3><p>Fewer people, golden aspens and the elk rut (keep your distance). Nights get cold and early snow is possible at higher elevations. Many facilities still open.</p></div>
<div><div class="m">October to November</div><h3>Late fall</h3><p>Services close. Dunraven Pass and the Beartooth Highway close in mid-October. Most Yellowstone roads close to cars in early November, and Grand Teton's Teton Park Road closes November 1 to April 30.</p></div></div>
<div class="box"><h3 style="margin-top:0">Winter (mid-December to mid-March)</h3><p style="margin:0">Most Yellowstone roads are open only to guided snowcoach and snowmobile tours. The road from the North Entrance to Cooke City via Lamar Valley stays open to cars all year. Beautiful, but not a first-trip season for beginner hikers.</p></div>
<h3>Crowds in summer</h3>
<p>Big sights like Old Faithful, Grand Prismatic Spring and Jenny Lake are busiest from about 10 am to 4 pm. Plan hikes for the morning, drive and eat in the middle of the day, and look for wildlife at dawn and dusk.</p>
<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr>
<tr><td>Wildflowers on the high trails</td><td>July</td></tr>
<tr><td>Baby bison and elk calves</td><td>Late May and June</td></tr>
<tr><td>Fewer people and fall color</td><td>September</td></tr>
<tr><td>Everything open, warmest days</td><td>July and August</td></tr></table>""")

# 5 booking timeline
page("""<div class="kicker">Plan ahead</div><h2>Booking timeline</h2>
<p class="lead">In-park beds and campsites go fast for summer. Book these first, then plan the days around where you sleep.</p>
<div class="bk">
<div><b>13 months before</b><p>Yellowstone lodges and the five campgrounds run by Yellowstone National Park Lodges (Bridge Bay, Canyon, Fishing Bridge RV Park, Grant Village, Madison). On the 5th of each month, the same month one year later opens. Book at yellowstonenationalparklodges.com.</p></div>
<div><b>As early as allowed</b><p>Grand Teton lodges (Jackson Lake Lodge, Jenny Lake Lodge, Colter Bay Village, Headwaters Lodge at Flagg Ranch) at gtlc.com, and Signal Mountain Lodge. Check each site for its opening date.</p></div>
<div><b>6 months before</b><p>The other Yellowstone campgrounds, and every Grand Teton campground, on recreation.gov. The window rolls daily: you can book exactly six months before your date. Grand Teton sites release at 8:00 am Mountain Time.</p></div>
<div><b>Any time</b><p>Rooms in gateway towns (Gardiner, West Yellowstone, Cody, Jackson), rental cars, and flights. Summer prices rise as dates fill.</p></div>
<div><b>On arrival</b><p>The Jenny Lake shuttle boat: tickets are sold at the dock (check hours at jennylakeboating.com).</p></div></div>
<h3>Entrance fees (October 2026)</h3>
<table class="fee"><tr><th>Pass</th><th>Price</th><th>Covers</th></tr>
<tr><td>Private vehicle, each park</td><td>$35</td><td>One park, 7 days. Yellowstone and Grand Teton charge separately</td></tr>
<tr><td>America the Beautiful, US residents</td><td>$80</td><td>One year, all national parks. Only $10 more than two park fees, so worth it if you visit any other park that year</td></tr>
<tr><td>America the Beautiful, non-residents</td><td>$250</td><td>One year, all national parks, no extra per-person fee</td></tr>
<tr><td>Non-resident fee</td><td>$100 each</td><td>Per person 16+, per park, on top of the entrance fee, unless you hold an annual pass</td></tr></table>
<p class="small">Visiting from Canada or anywhere outside the US? You count as a non-resident. Two adults visiting both parks would pay $400 in non-resident fees alone, so the $250 annual pass is often the better buy. Check nps.gov/yell and nps.gov/grte for fee changes or any new entry reservations before you book.</p>""")

# 6 getting there
page("""<div class="kicker">Getting there</div><h2>Airports and gateway towns</h2>
<p class="lead">You will need a car. There is no public transport around the parks, and the best hikes start at small trailheads.</p>
<table><tr><th>Airport</th><th>Season</th><th>Best for</th></tr>
<tr><td><b>Jackson Hole (JAC)</b>, Wyoming</td><td>All year</td><td>Grand Teton (the airport sits inside the park) and Yellowstone's South Entrance</td></tr>
<tr><td><b>Bozeman (BZN)</b>, Montana</td><td>All year</td><td>North Entrance (Gardiner) and West Entrance (West Yellowstone)</td></tr>
<tr><td><b>West Yellowstone (WYS)</b>, Montana</td><td>Early May to mid-October</td><td>West Entrance, flights from Salt Lake City</td></tr>
<tr><td><b>Cody (COD)</b>, Wyoming</td><td>All year</td><td>East Entrance</td></tr>
<tr><td><b>Idaho Falls (IDA)</b>, Idaho</td><td>All year</td><td>West Entrance and Grand Teton</td></tr>
<tr><td><b>Billings (BIL)</b>, Montana</td><td>All year</td><td>Northeast Entrance via the Beartooth Highway (open late May to mid-October)</td></tr></table>
<div class="box"><h3 style="margin-top:0">The smart route: fly in one end, out the other</h3><p style="margin:0">Fly into Bozeman and out of Jackson (or the other way). You drive through both parks once, without backtracking. One-way car rentals can cost more, so compare prices before you book.</p></div>
<h3>Gateway towns</h3>
<div class="cols" style="gap:4pt 20pt">
<p><b>Gardiner, MT</b> (North). Right at the Roosevelt Arch, 15 minutes to Mammoth. Good base for Lamar Valley.</p>
<p><b>West Yellowstone, MT</b> (West). Biggest choice of rooms, 30 minutes to Madison Junction and the geyser basins.</p>
<p><b>Cody, WY</b> (East). A real Western town about 50 mi (80 km) outside the East Entrance. Then about an hour more to Lake Village.</p>
<p><b>Cooke City and Silver Gate, MT</b> (Northeast). Tiny and quiet, closest to Lamar Valley at dawn.</p>
<p><b>Jackson, WY</b> (South). Restaurants, shops and the main base for Grand Teton.</p>
<p><b>Inside the parks</b>. The least driving, if you book far ahead (page 5).</p></div>""")

# 7 sample plans 3 + 5 days
def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"
page('<div class="kicker">Sample plans</div><h2>3 days and 5 days</h2>' +
plan("3 days: the highlights", "Fly into Jackson", [
 ("Day 1", "Grand Teton. Shuttle boat across Jenny Lake to Hidden Falls and Inspiration Point (hike 11). Afternoon: String Lake loop or a swim stop. Evening drive north to Yellowstone (sleep at Grant Village, Old Faithful or West Yellowstone)."),
 ("Day 2", "Geyser day. Grand Prismatic Overlook early, before the lot fills. Old Faithful eruption (times are posted at the visitor center), then Observation Point for the view over the basin."),
 ("Day 3", "Canyon and Hayden Valley. Brink of the Lower Falls, the canyon rim viewpoints, wildlife in Hayden Valley, then south past Yellowstone Lake and back to Jackson. A long day: leave early.")]) +
plan("5 days: the full Grand Loop", "Bozeman in, Jackson out", [
 ("Day 1", "North Entrance. Mammoth Hot Springs terraces, then Wraith Falls. Sleep in Gardiner or Mammoth."),
 ("Day 2", "Lamar Valley at dawn with binoculars (bison, pronghorn, maybe wolves). Trout Lake. Afternoon drive to Canyon."),
 ("Day 3", "Brink of the Lower Falls and the rim viewpoints. Hayden Valley, then Storm Point by Yellowstone Lake if it is open."),
 ("Day 4", "Old Faithful and the Upper Geyser Basin, Observation Point. Grand Prismatic Overlook and Fairy Falls in the late afternoon."),
 ("Day 5", "Drive south into Grand Teton. Jenny Lake boat to Hidden Falls. String Lake loop. Sunset at a Teton viewpoint, sleep in Jackson.")]) +
'<p class="small">Each day assumes an early start and one main hike. Swap days around if weather or a trail closure gets in the way.</p><div class="box"><h3 style="margin-top:0">How many days do you need?</h3><p style="margin:0">Three days shows you the famous sights but means long drives. Five days lets you see every part of the Grand Loop. Seven days adds a summit, a second wildlife dawn and real time in Grand Teton. If you can, give Yellowstone at least four nights and Grand Teton two.</p></div>')

# 8 7 days
page('<div class="kicker">Sample plans</div><h2>7 days, both parks</h2>' +
plan("7 days: slow and complete", "Bozeman in, Jackson out", [
 ("Day 1", "Arrive at the North Entrance. Mammoth Hot Springs terraces on the boardwalks. Short walk to Wraith Falls."),
 ("Day 2", "Lamar Valley at dawn. Trout Lake loop. Picnic lunch, then a slow drive to Canyon via Tower."),
 ("Day 3", "Fit and acclimatized? Mount Washburn from Dunraven Pass, back down before afternoon storms. Not feeling it? Canyon rim viewpoints instead."),
 ("Day 4", "Brink of the Lower Falls. Hayden Valley in the evening light. Storm Point if it is open."),
 ("Day 5", "Upper Geyser Basin: Old Faithful, Observation Point, then the Lone Star Geyser trail (eruptions about every three hours)."),
 ("Day 6", "Grand Prismatic Overlook and Fairy Falls in the morning. Drive south to Colter Bay: Lakeshore Trail at sunset."),
 ("Day 7", "Jenny Lake by boat to Hidden Falls and Inspiration Point, or Heron Pond and Swan Lake. Fly home from Jackson the next morning.")]) +
'''<div class="box forest"><h3>Make it your own</h3><p style="margin:0">Have more time? Add Phelps Lake at the Laurance S. Rockefeller Preserve, the Beaver Ponds loop at Mammoth, or a second dawn in Lamar Valley. Less energy? Every day here has a short option of under two miles.</p></div>
<h3>Rules of thumb for planning</h3>''' + chk(["One main hike a day, done before the afternoon heat and storms", "Sleep near the next day's first stop, not the last one", "Keep one loose half-day for rain, closures or a great wildlife sighting", "Fill up with gas and food whenever you pass a village", "Write your plan on the day pages (24 to 25) and leave a copy with someone at home"]))

# 9-10 Yellowstone regions
def reg(name, where, ps):
    return f'<div><div class="w">{where}</div><h3>{name}</h3>' + "".join(f"<p>{p}</p>" for p in ps) + "</div>"
page('<div class="kicker">Yellowstone in plain words</div><h2>The geysers and the canyon</h2><div class="reg">' +
reg("The geyser basins", "West side, Old Faithful to Norris", [
 "Most of the world's active geysers are in Yellowstone, and the biggest groups line the road from Old Faithful north to Norris. The Upper Geyser Basin has Old Faithful and hundreds of other features on boardwalks. Midway Geyser Basin has Grand Prismatic Spring, the largest hot spring in the US. Norris is the hottest and most changeable basin.",
 "<b>Do here:</b> watch Old Faithful (the visitor center posts predicted eruption times), walk the boardwalks, and see Grand Prismatic from above on the Overlook Trail (hike 1)."]) +
reg("The Grand Canyon of the Yellowstone", "Center, near Canyon Village", [
 "A yellow and pink canyon cut by the Yellowstone River, with the Upper Falls and the 308 ft (94 m) Lower Falls. Viewpoints line the North Rim and South Rim drives, and most are a short walk from the car.",
 "<b>Do here:</b> the Brink of the Lower Falls (hike 5) and the rim viewpoints."]) +
reg("Hayden Valley", "Between Canyon and Yellowstone Lake", [
 "A wide, open valley along the river and one of the best places in the park to see bison, often right next to the road. Watch for elk, waterbirds and sometimes bears at dawn and dusk.",
 "<b>Do here:</b> drive slowly, use the pullouts, stay in or near the car when animals are close, and bring binoculars."]) + "</div>" + '''<div class="box"><h3 style="margin-top:0">Drive times from the entrances (NPS averages)</h3><table style="margin:2pt 0 0"><tr><td>North to Mammoth Hot Springs</td><td>15 min</td><td>West to Madison Junction</td><td>30 min</td></tr><tr><td>South to Grant Village</td><td>50 min</td><td>East to Lake Village</td><td>60 min</td></tr><tr><td>Northeast to Tower Junction</td><td>60 min</td><td colspan="2" class="small">Add time for wildlife jams and road works.</td></tr></table></div>''')
page('<div class="kicker">Yellowstone in plain words</div><h2>The lake, Lamar and Mammoth</h2><div class="reg">' +
reg("Yellowstone Lake", "Southeast, Fishing Bridge to Grant Village", [
 "A huge high-elevation lake with cold water all summer, beaches, and views of the Absaroka Mountains. West Thumb Geyser Basin sits right on its shore.",
 "<b>Do here:</b> the West Thumb boardwalk, and the Storm Point loop (hike 8) when it is open. The water is very cold: wading only."]) +
reg("Lamar Valley", "Northeast, between Tower and the Northeast Entrance", [
 "Often called the Serengeti of North America: big herds of bison, plus pronghorn, elk, and the best chance in the park to see wolves, usually from far away through a spotting scope. The road through it is open all year.",
 "<b>Do here:</b> arrive at dawn, park fully off the road, and scan the hillsides. Trout Lake (hike 7) is a short walk nearby."]) +
reg("Mammoth Hot Springs", "North, near the North Entrance", [
 "Travertine terraces that look like a frozen waterfall, built by hot water over thousands of years. Elk often graze on the lawns of the village, especially in fall. Stay well back from them.",
 "<b>Do here:</b> the Lower and Upper Terraces boardwalks, Wraith Falls (hike 6) and the Beaver Ponds loop (hike 9)."]) +
'</div><div class="warn"><b>Areas change.</b> Hydrothermal activity can close boardwalks and trails without warning, as it did at Biscuit Basin in July 2024. Check the park\'s alerts page before each day.</div><div class="box"><h3 style="margin-top:0">Villages inside Yellowstone</h3><p style="margin:0">Mammoth, Tower-Roosevelt, Canyon, Lake and Fishing Bridge, Grant Village and Old Faithful have places to eat, stores or lodging, and several have gas stations. Most open from late spring to early fall. Fill up whenever you pass one.</p></div>')

# 11-18 hikes
def hike(no, park, name, area, level, dist, gain, time, season, see, park_tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    return f'''<div class="hk"><div class="top"><div><small>Hike {no} · {park}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st"><div><b>Round trip</b><span>{dist[0]}</span><em>{dist[1]}</em></div><div><b>Gain</b><span>{gain[0]}</span><em>{gain[1]}</em></div><div><b>Time</b><span>{time}</span><em>NPS estimate</em></div><div><b>Best season</b><span>{season[0]}</span><em>{season[1]}</em></div></div>
<p><span class="lb">Where</span>{area}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Parking</span>{park_tip}</p>{nt}</div>'''
Y = "Yellowstone"; G = "Grand Teton"
def hpage(sub, a, b, extra=""):
    page(f'<div class="kicker">{sub}</div>{a}{b}{extra}')

hpage("Yellowstone day hikes · Geyser basins",
 hike(1, Y, "Grand Prismatic Overlook", "Fairy Falls parking lot, 1 mi (1.6 km) south of Midway Geyser Basin.", "Easy",
      ("1.2 mi", "1.9 km"), ("105 ft", "32 m"), "1-2 hrs", ("Jun-Sep", "Snow-free months"),
      "A wide, gentle trail that climbs a little hill to a platform above Grand Prismatic Spring. From up here you see the full rainbow of orange, yellow and blue that you cannot see from the boardwalk below.",
      "Parking is very limited and fills by mid-morning in summer. Come early, or after about 4 pm when the light is softer anyway."),
 hike(2, Y, "Fairy Falls", "Same lot as hike 1, or the end of Fountain Flat Drive.", "Easy",
      ("5.4 mi", "8.6 km"), ("Gentle", "Mostly flat"), "3-5 hrs", ("Jun-Sep", "Snow-free months"),
      "Walk past the Overlook turnoff and on through young lodgepole pines that grew back after the 1988 fires, to a waterfall of about 200 ft (60 m) dropping into a pool. Hot springs steam beside the trail.",
      "Same small lot as the Overlook: combine the two hikes and arrive early. Carry plenty of water: there is little shade.",
      "Going on to Spray and Imperial geysers makes it 6.7 mi (10.7 km) round trip."),
 '<div class="box"><h3 style="margin-top:0">See Grand Prismatic up close too</h3><p style="margin:0">The Midway Geyser Basin boardwalk, about 1 mi (1.6 km) north of the trailhead, takes you right past the spring through the steam. Do both: the view from above shows the colors, the boardwalk shows the size.</p></div>')
hpage("Yellowstone day hikes · Upper Geyser Basin",
 hike(3, Y, "Observation Point", "From the Old Faithful Visitor Education Center, walk 0.3 mi (0.5 km) along the boardwalk to the Geyser Hill sign; the trail starts after the Firehole River bridge.", "Moderate",
      ("1.6 mi", "2.6 km"), ("Short climb", "0.5 mi of switchbacks"), "1-3 hrs", ("Jun-Sep", "Snow-free months"),
      "A short, steep climb through the trees to a viewpoint over the whole Upper Geyser Basin. Time it for an Old Faithful eruption and watch it from above, away from the crowd.",
      "Use the large Old Faithful lots. Check the predicted eruption time first, then give yourself 30 minutes to climb.",
      "Add Solitary Geyser on the way down: 0.9 mi (1.4 km) more."),
 hike(4, Y, "Lone Star Geyser", "Trailhead 3.5 mi (5.6 km) south of the Old Faithful overpass, just past the Kepler Cascades parking lot.", "Easy",
      ("4.8 mi", "7.7 km"), ("Gentle", "Old service road"), "2-3 hrs", ("Jun-Sep", "Snow-free months"),
      "A partly paved old service road beside the Firehole River leads to Lone Star Geyser, which erupts up to 45 ft (14 m) from a 12 ft (3.6 m) cone about every three hours. Bring lunch and wait for it.",
      "Small lot at the trailhead. Bikes are allowed to the end of the asphalt; walk the last few hundred feet.",
      "The NPS lists this trail as accessible for wheelchairs and mobility devices."))
hpage("Yellowstone day hikes · Canyon and the north",
 hike(5, Y, "Brink of the Lower Falls", "North Rim Drive, Canyon Village area.", "Steep",
      ("0.7 mi", "1.1 km"), ("600 ft", "180 m down, then up"), "About 1 hr", ("Jun-Sep", "Closed in winter"),
      "Switchbacks drop to a platform right at the lip of the 308 ft (94 m) Lower Falls, where you feel the roar and the spray. A short spur near the start shows the Upper Falls.",
      "Busy lots along North Rim Drive; go early. Short, but every step down is a step back up, at more than 7,500 ft (2,300 m).",
      "The NPS calls this trail extremely steep and does not recommend it for people with heart, lung or other health conditions. Rest on the benches on the way up."),
 hike(6, Y, "Wraith Falls", "Pullout 0.5 mi (0.8 km) east of the Lava Creek Picnic Area, between Mammoth and Tower.", "Easy",
      ("1 mi", "1.6 km"), ("Small", "Steps at the end"), "30-60 min", ("May-Oct", "Open all year"),
      "A short walk across sagebrush meadows and through the trees to the base of the 79 ft (24 m) Wraith Falls, sliding down a rock face. A good first-day leg stretch.",
      "Small pullout; usually a spot after a short wait. The last 245 ft (75 m) is steep and rocky with steps."))
hpage("Yellowstone day hikes · Lamar and the lake",
 hike(7, Y, "Trout Lake", "Small pullout about 1.5 mi (2.4 km) south of Pebble Creek Campground on the Northeast Entrance Road.", "Moderately easy",
      ("1.2 mi", "1.9 km"), ("150 ft", "45 m"), "1-2 hrs", ("Jun-Sep", "Open all year"),
      "A short climb through Douglas fir to a small mountain lake with a loop path around it. Quiet early in the morning, and close to Lamar Valley for a dawn wildlife drive.",
      "Very small pullout. Bears use this area: carry bear spray and make noise on the way up."),
 hike(8, Y, "Storm Point", "Indian Pond pullout, 3 mi (5 km) east of the Fishing Bridge Visitor Center.", "Easy",
      ("2.3 mi", "3.7 km"), ("Flat", "Loop"), "1-2 hrs", ("Jul-Sep", "Often closed earlier"),
      "A loop past Indian Pond and through the forest to a rocky point on Yellowstone Lake, with big views across the water. Look for yellow-bellied marmots on the rocks.",
      "Pullout parking on the East Entrance Road.",
      "Often closed in late spring and early summer because of bear activity. Ask at the Fishing Bridge Visitor Center before you go."),
 '<div class="box forest"><h3>Watching wildlife in Lamar Valley</h3><p style="margin:0">Look for a line of parked cars and people with spotting scopes: they have usually found something. Pull fully off the road, keep your voice down, and stay near your car. Wolf watchers are often happy to share a look through their scope if you ask quietly.</p></div>')
hpage("Yellowstone day hikes · Mammoth and a summit",
 hike(9, Y, "Beaver Ponds Loop", "Mammoth Hot Springs: start between Liberty Cap and the stone house, or behind the Mammoth Hot Springs Hotel.", "Moderate",
      ("5 mi", "8 km loop"), ("350+ ft", "105+ m"), "2-5 hrs", ("Jun-Sep", "Open all year"),
      "A loop through forest and open meadows to a string of ponds about halfway round. You are more likely to see muskrats and waterbirds than beavers, and great views back toward the terraces.",
      "Park in Mammoth village. The trail is narrow and rocky with steep sections and narrow wooden bridges.",
      "Grizzly and black bears frequent this area. Hike in a group, make noise and carry bear spray."),
 hike(10, Y, "Mount Washburn", "Dunraven Pass trailhead, on the road between Canyon and Tower.", "Strenuous",
      ("6 mi", "9.7 km"), ("1,400 ft", "425 m"), "3-6 hrs", ("Jul-Sep", "Summer and fall"),
      "The stretch goal of this guide. An old road climbs steadily to a fire lookout on a summit above 10,000 ft (3,000 m), with wildflowers in July, bighorn sheep, and views over much of the park and toward the Tetons.",
      "The lot fills early in summer. Start by 8 am to be off the top before afternoon storms.",
      "No water on the trail. Watch for lightning above the treeline. Grizzlies feed here in fall: group of 3 or more, noise, bear spray. Not recommended for people with heart or breathing problems."))
hpage("Grand Teton day hikes · Jenny Lake",
 hike(11, G, "Hidden Falls and Inspiration Point", "South Jenny Lake. Take the shuttle boat across the lake, or walk around the south shore.", "Easy-moderate",
      ("1 mi", "1.6 km by boat"), ("300 ft", "90 m"), "1-3 hrs", ("Jun-Sep", "Spring is slick"),
      "From the west shore boat dock, a rocky path climbs to Hidden Falls, cascading down Cascade Canyon. Inspiration Point is another 0.5 mi (0.8 km) up, with a view over Jenny Lake and the valley.",
      "Jenny Lake lots fill in mid-summer. The NPS says arrive before 9 am to be sure of a spot.",
      "Without the boat: 4.9 mi (7.9 km) round trip and 620 ft (190 m) gain, rated moderate. The boat is privately run; check hours and prices at jennylakeboating.com."),
 hike(12, G, "String Lake Loop", "String and Leigh Lakes Trailhead, off the Jenny Lake scenic drive.", "Easy",
      ("3.7 mi", "6 km loop"), ("540 ft", "165 m"), "2-3 hrs", ("Jun-Sep", "Spring to fall"),
      "Clear, shallow water right below the peaks. The east side is nearly flat with roots and rocks. The west side climbs a ridge above the lake for a different view. Popular for a picnic and a cold paddle after.",
      "Large lots, but busy by late morning on summer weekends.",
      'Leigh Lake, just north of String Lake, is an easy add-on along the same flat shoreline trail.'))
hpage("Grand Teton day hikes · Colter Bay",
 hike(13, G, "Colter Bay Lakeshore Trail", "Colter Bay Visitor Center; follow the Lakeshore Trail signs.", "Easy",
      ("2.2 mi", "3.5 km loop"), ("100 ft", "30 m"), "1-2 hrs", ("Jun-Sep", "Spring to fall"),
      "A gentle loop on a forested peninsula, with the Teton Range across Jackson Lake at every turn. Beautiful at sunset, and a good first walk after a long drive.",
      "Large lots at Colter Bay Village."),
 hike(14, G, "Heron Pond and Swan Lake", "Colter Bay: park at the village and start near the Hermitage Point trailhead.", "Easy",
      ("3.1 mi", "5 km loop"), ("320 ft", "100 m"), "1-3 hrs", ("Jun-Sep", "Spring to fall"),
      "Two quiet ponds full of lily pads, with mirror reflections of the peaks on calm mornings. Watch for trumpeter swans, sandhill cranes, beavers and moose.",
      "Same lots as hike 13. Come early for still water and wildlife.",
      "Moose can be aggressive, especially a cow with a calf. Stay at least 25 yards (23 m) away, and further when you can."),
 '<div class="box forest"><h3>Grand Teton in two lines</h3><p style="margin:0">Jenny, String and Leigh lakes sit at the foot of the peaks along Teton Park Road. Colter Bay is on Jackson Lake further north, and the Laurance S. Rockefeller Preserve is in the south, off Moose-Wilson Road. Colter Bay has a visitor center, a store and a campground, so hikes 13 and 14 make an easy half-day from one parking spot.</p></div>')
hpage("Grand Teton day hikes · South end",
 hike(15, G, "Phelps Lake Loop", "Laurance S. Rockefeller Preserve, on Moose-Wilson Road.", "Moderate",
      ("6.4 mi", "10.3 km loop"), ("1,060 ft", "323 m"), "3-5 hrs", ("Jun-Sep", "Spring to fall"),
      "A quiet preserve where cars are limited. The trail climbs through forest and meadows to a clear lake below Death Canyon, then circles it with several bridges and views from every side.",
      "The lot holds only 50 cars. Arrive early or expect to wait in mid-summer. Moose-Wilson Road is closed to RVs and trailers.",
      "The preserve's visitor center is a good stop for kids and anyone who wants a shorter walk."),
 hike(16, G, "Taggart Lake", "Taggart Lake Trailhead, on Teton Park Road north of Moose.", "Easy",
      ("3 mi", "4.8 km"), ("360 ft", "110 m"), "1-2 hrs", ("Jun-Sep", "Snowshoe in winter"),
      "A short trail across sage flats and through a forest growing back after a fire, to a lake right under the Grand Teton. One of the best views for the effort in the park.",
      "Popular and often full in summer. If you park along the road, pull fully off and follow the signs.",
      "Part of this trail was set to close in 2026 for trail improvements. Check its status on nps.gov/grte; Colter Bay's Lakeshore Trail (hike 13) is the park's suggested alternative."))

# 19 thermal safety
page("""<div class="kicker">Safety</div><h2>Thermal areas: stay on the boardwalk</h2>
<p class="lead">Yellowstone's hot springs are beautiful and deadly. The ground around them can be a thin crust over boiling, acidic water, and people have been badly burned and killed after stepping off the path.</p>
<div class="diff" style="margin-top:6pt">
<div><div class="tag">Always</div><h3>Do</h3><ul class="check"><li>Stay on boardwalks and marked trails in every thermal area</li><li>Hold small children's hands, and keep them on the boardwalk</li><li>Watch your step on wet, steamy boardwalks</li><li>Read the signs at each basin: some paths close at short notice</li><li>Leave the area if you feel sick or dizzy: some thermal areas give off harmful gases</li></ul></div>
<div><div class="tag">Never</div><h3>Don't</h3><ul class="check"><li>Touch the water or put a hand or foot in a hot spring</li><li>Swim or soak in thermal pools or their runoff</li><li>Throw coins, rocks or anything else into a feature</li><li>Walk on the colorful crust or the white ground for a photo</li><li>Bring pets: they are not allowed on boardwalks or trails</li></ul></div></div>
<div class="em"><h3>Why it matters</h3><p>Water in many hot springs is at or near boiling. The crust can look solid and still break under one person's weight. A fall can cause severe burns in seconds, and help can be far away.</p></div>
<h3>Also good to know</h3>
<p>Drones are not allowed in national parks. Geyser eruption times on the NPS app and at the Old Faithful visitor center are predictions, not schedules: come early and be patient. In Grand Teton there are no geyser basins, but the lakes are cold and deep, so wear a life jacket when you paddle.</p>""")

# 20 wildlife safety
page("""<div class="kicker">Safety</div><h2>Wildlife: give them room</h2>
<p class="lead">Both parks set the same minimum distances. If an animal changes what it is doing because of you, you are too close: back away.</p>
<div class="dist"><div class="a"><div class="n">100 yards</div><div class="u">91 m · bears and wolves</div><p>About the length of a football field.</p></div><div class="b"><div class="n">25 yards</div><div class="u">23 m · all other animals</div><p>Bison, elk, moose, deer, pronghorn, coyotes, and everything else.</p></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Bison and elk</h3><p>Bison look slow but can run faster than you, and the NPS says they have injured more people in Yellowstone than any other animal. Elk are aggressive during the fall rut and in spring when they have calves. Never walk up for a selfie.</p>
<h3>On the road</h3><p>Use pullouts to watch animals, never stop in the lane. Stay in or next to your car when animals are close. Never feed any wildlife, including birds and squirrels.</p></div>
<div><h3>Bear spray basics</h3><ul class="check"><li>Carry one can per person, on your hip or chest strap, not in the pack</li><li>Learn how the safety clip works before the trail</li><li>Use it if a bear charges and is close: aim low, in front of the bear</li><li>Airlines restrict bear spray: buy it near the park and give unused cans away before you fly home</li></ul>
</div></div><h3>On the trail</h3><p>Hike in groups of three or more where you can. Make noise, especially near streams and blind corners. Store food in your car or a bear box, never in a tent.</p>
<div class="warn">Meet a bear? Stay calm, do not run, and slowly back away. Ask a ranger about recent bear activity on your trail.</div>""")

# 21 weather and altitude
page("""<div class="kicker">Safety</div><h2>Weather, altitude and sun</h2>
<p class="lead">You will be hiking at 6,500 to 10,000 ft (2,000 to 3,000 m). The weather changes fast, and summer can bring a warm morning, a hail storm at 2 pm and frost at night.</p>
<div class="layers">
<div><div class="num">1</div><h3>Storms</h3><p>Afternoon thunderstorms are frequent in July. Start early and plan to be off summits and open ridges by early afternoon.</p><div class="eg">Hear thunder? Head down, away from peaks and lone trees.</div></div>
<div><div class="num">2</div><h3>Cold</h3><p>Snow is possible in any month at high elevations, and nights are cold even in summer. Carry a warm layer and a rain jacket on every hike.</p><div class="eg">July average highs: about 83°F (28°C) at Mammoth, 74°F (23°C) at Yellowstone Lake.</div></div>
<div><div class="num">3</div><h3>Altitude</h3><p>Thinner air makes climbs feel harder, especially on day one. Go slower than at home, drink water and save the big hike for later in the trip.</p><div class="eg">Headache, nausea or unusual tiredness? Rest, and go lower if it does not improve.</div></div></div>
<div class="cols">
<div><h3>Sun</h3><p>There is less air to filter sunlight at this height, and many trails have little shade. Wear a hat and sunglasses, and use sunscreen even on cool days.</p>
<h3>Water</h3><p>Dry air dries you out quickly. Carry at least 1 to 2 liters (34 to 68 fl oz) on a half-day hike, more when it is hot, and treat any water you take from lakes or streams.</p></div>
<div><h3>Smoke</h3><p>Wildfire smoke is more likely from mid-summer. Check air quality on airnow.gov and pick shorter, lower hikes on smoky days.</p>
<h3>Check every morning</h3><ul class="check"><li>Forecast at weather.gov for the area you will hike</li><li>Park alerts and road status</li><li>Sunset time, to set your turnaround time</li></ul></div></div>
<div class="em"><h3>Set a turnaround time</h3><p>Before you start, pick the time you will turn back even if you have not reached the end: early enough to be down before storms build and back at the car with daylight to spare. Then stick to it. The view will still be there next time.</p></div>""")

# 22 no signal
page("""<div class="kicker">Before you go</div><h2>No signal: what to download and print</h2>
<p class="lead">Cell service in both parks is patchy at best and usually limited to villages and visitor centers. Do this at home, on Wi-Fi.</p>
<div class="cols">
<div><h3>Download</h3><ul class="check"><li>The free NPS App, then save Yellowstone and Grand Teton for offline use</li><li>Offline maps of both parks and the gateway towns in your map app</li><li>This guide, saved to your phone</li><li>Your lodging, car and flight confirmations as screenshots or PDFs</li><li>Your park pass, if you bought a digital one</li><li>Music, podcasts or audio tours for the long drives</li></ul></div>
<div><h3>Print</h3><ul class="check"><li>The official park maps from nps.gov (also given out at entrances)</li><li>Your day plans (pages 24 to 25) and the hike pages you need</li><li>Lodging addresses and phone numbers</li><li>The packing list (page 23)</li><li>An emergency contact card for each person</li></ul></div></div>
<div class="box"><h3 style="margin-top:0">Your trip plan, left with someone at home</h3>
<div class="f2"><div class="fl">Name</div><div class="fl">Phone</div><div class="fl">Dates in the parks</div><div class="fl">Car, plate</div><div class="fl">Where we sleep</div><div class="fl">Call for help if no word by</div></div></div>
<div class="em"><h3>In an emergency</h3><p>Call 911 from any phone that has signal. If you cannot get through, move to higher, open ground, or go to the nearest ranger station, visitor center or lodge. Write the nearest ranger station for each day on your day plan.</p></div>""")

# 23 packing checklist
page("""<div class="kicker">Checklist</div><h2>Packing list for the parks</h2>
<div class="cl">
<div><h3>On every hike (the Ten Essentials)</h3>""" + chk(["Map, and the NPS App with offline maps", "Headlamp with fresh batteries", "Sun protection: hat, sunglasses, sunscreen", "First aid kit, with blister care", "Knife or multi-tool", "Fire starter (use only where fires are allowed)", "Emergency shelter: a space blanket or bivy", "Extra food", "Extra water, 1 to 2 L per person", "Extra layer: warm top and rain jacket"]) + """
<h3>For these parks</h3>""" + chk(["Bear spray, one per person, within reach", "Binoculars or a spotting scope", "Insect repellent (mosquitoes in early summer)", "Park pass, ID, and a credit card (no cash at entrances)"]) + """</div>
<div><h3>Clothes</h3>""" + chk(["Broken-in hiking shoes or boots", "Hiking socks, two or more pairs", "Quick-dry shirts and hiking pants or shorts", "Fleece or light puffy jacket", "Waterproof rain jacket", "Warm hat and light gloves (yes, in July)", "Sandals for the lodge and lake"]) + """
<h3>In the car</h3>""" + chk(["Day pack with a hip belt", "Cooler with lunch and snacks", "Big refillable water jug", "Phone charger and a power bank", "Printed maps and this guide", "Trash bags: pack out everything", "Camp chair for wildlife watching"]) + """</div></div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Pack for three seasons in one day</h3><p style="margin:0">A summer morning near 40°F (4°C) at the trailhead can turn into a hot afternoon and a cold storm. Layers you can add and remove beat one heavy jacket. Keep a dry set of clothes in the car.</p></div>""")

# 24-25 day plan x2
def dayplan(k):
    page(f"""<div class="kicker">Day plan {k}</div><h2>Plan one day</h2>
<div class="dp"><div class="f2"><div class="fl">Date</div><div class="fl">Park and area</div><div class="fl">Sunrise</div><div class="fl">Sunset</div><div class="fl">Forecast</div><div class="fl">Storms expected</div><div class="fl">Wake up</div><div class="fl">Leave by</div></div></div>
<div class="lab">Main hike</div>
<div class="dp"><div class="f2"><div class="fl">Trail</div><div class="fl">Trailhead</div><div class="fl">Distance <span class="u"><b></b>mi / km</span></div><div class="fl">Gain <span class="u"><b></b>ft / m</span></div><div class="fl">Start hiking</div><div class="fl">Turnaround time</div><div class="fl">Backup if the lot is full</div><div class="fl">Backup if it is closed</div></div></div>
<div class="lab">Stops and drives</div>{lines(5)}
<div class="lab">Wildlife spots to try (dawn or dusk)</div>{lines(3)}
<div class="f2" style="margin-top:4pt"><div><div class="lab">Food and gas</div>{lines(2)}</div><div><div class="lab">Sleep tonight</div>{lines(2)}</div></div>
<div class="f2"><div class="fl">Nearest ranger station</div><div class="fl">Told someone at home</div></div>
<div class="opts" style="margin-top:8pt"><span>Bear spray</span><span>Water filled</span><span>Layers and rain jacket</span><span>Offline map</span><span>Gas over half</span><span>Park pass</span></div>""")
dayplan("A"); dayplan("B")

# 26 budget
rows = [("Park passes", "Entrance fees or an annual pass (page 5)"), ("Flights", ""), ("Rental car and gas", ""), ("Lodging and campsites", ""), ("Food and groceries", ""), ("Jenny Lake shuttle boat", ""), ("Tours or ranger-led trips", ""), ("Bear spray and gear", "Buy near the park"), ("Rentals", "Binoculars, bikes, boats"), ("Souvenirs and books", ""), ("Laundry and showers", "Campers"), ("Extra for surprises", "About 10 percent")]
page('<div class="kicker">Money</div><h2>Trip budget</h2><p class="lead">Fill in your own numbers as you book. Write the plan first, then track what you really spend.</p>'
 + '<table class="bud"><tr><th>Item</th><th>Notes</th><th style="text-align:right">Planned</th><th style="text-align:right">Spent</th></tr>'
 + "".join(f'<tr><td class="c">{a}</td><td class="small">{b}</td><td class="a"></td><td class="a"></td></tr>' for a, b in rows)
 + '<tr class="tot"><td>Total</td><td></td><td class="a"></td><td class="a"></td></tr></table>'
 + '<div class="f2" style="margin-top:6pt"><div class="fl">Number of people</div><div class="fl">Cost per person</div></div>'
 + '<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Ways to spend less</h3><p style="margin:0">Picnic lunches from the general stores or a gateway supermarket, one annual pass instead of two park fees, campsites instead of lodges, and shoulder-season dates in early June or September. The best things here are free: geysers, wildlife and the trails.</p></div>')

# 27 trip log + wildlife list
animals = ["Bison", "Elk", "Pronghorn", "Mule deer", "Moose", "Black bear", "Grizzly bear", "Gray wolf", "Coyote", "Red fox", "Bighorn sheep", "River otter", "Yellow-bellied marmot", "Pika", "Bald eagle", "Osprey", "Trumpeter swan", "Sandhill crane"]
page('<div class="kicker">Memories</div><h2>Trip log and wildlife list</h2><p style="margin-bottom:4pt">Tick each animal you see and write where. Always from a safe distance, and binoculars count.</p><div class="wild">'
 + "".join('<ul class="check">' + "".join(f"<li>{a}<span></span></li>" for a in animals[i:i+6]) + "</ul>" for i in (0, 6, 12)) + '</div>'
 + '<div class="lab" style="margin-top:12pt">Hikes we did</div>' + lines(6)
 + '<div class="lab">Best moment</div>' + lines(4)
 + '<div class="lab">Next time we want to</div>' + lines(4))

# 28 official sources
page("""<div class="kicker">Check before you go</div><h2>Official sources</h2>
<p class="lead">This guide gives you the plan. These pages give you today's rules, closures and conditions.</p>
<div class="src">
<div><h3>Yellowstone National Park</h3><div class="url">nps.gov/yell</div><p>Alerts, fees, maps, trail pages and the Backcountry Conditions report on closures.</p></div>
<div><h3>Grand Teton National Park</h3><div class="url">nps.gov/grte</div><p>Alerts, fees, trail pages, and the Jenny Lake and Colter Bay area guides.</p></div>
<div><h3>Yellowstone roads</h3><div class="url">nps.gov/yell/planyourvisit/parkroads.htm</div><p>Live road status map and opening dates. Recorded line: (307) 344-2117.</p></div>
<div><h3>Wyoming roads</h3><div class="url">wyoroad.info · call 511</div><p>Highways around Grand Teton and between the parks.</p></div>
<div><h3>In-park lodging</h3><div class="url">yellowstonenationalparklodges.com · gtlc.com</div><p>Lodges and some campgrounds in each park.</p></div>
<div><h3>Campgrounds and permits</h3><div class="url">recreation.gov</div><p>Most campgrounds in both parks, and backcountry permits.</p></div>
<div><h3>NPS App</h3><div class="url">App Store and Google Play</div><p>Free. Save both parks for offline use. Shows geyser predictions and park news.</p></div>
<div><h3>Weather and air</h3><div class="url">weather.gov · airnow.gov</div><p>Forecasts, storm warnings and wildfire smoke.</p></div></div>
<p class="small" style="margin-top:10pt">Facts in this guide were checked against these sources in October 2026. Rules and conditions change; the official sources always win.</p>""")

# 29 ranger questions
qs = ["Which trails are closed this week, for bears, thermal activity or construction?", "Where has wildlife been seen lately, and at what time of day?", "When are the next predicted geyser eruptions?", "What time do the afternoon storms usually start right now?", "Are there road works or delays on our route?", "Which trailheads fill first, and what is a good backup?", "Is there snow or mud on the trail we picked?", "Which ranger programs are on while we are here?"]
page('<div class="kicker">At the visitor center</div><h2>Questions to ask a ranger</h2><p class="lead">Rangers know what changed this morning. Take this page to the desk and write the answers down.</p><div class="qq">'
 + "".join(f'<div><b>{q}</b><div class="wl"></div></div>' for q in qs) + '</div>')

# 30 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M10 100 L60 50 L80 64 L110 18 L124 40 L134 30 L190 100" stroke="#F5F1EA" stroke-width="4"/><path d="M30 104 C60 96 90 90 110 86 C130 82 140 70 160 62" stroke="#F5F1EA" stroke-width="3" stroke-dasharray="2 8"/></svg>
<h2 style="margin-top:22pt">Enjoy the parks</h2>
<p>Thank you for choosing a HikeSupply guide. Start early, give the animals room, stay on the boardwalks, and take the long way home whenever you can.</p>
<p style="margin-top:10pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">More in our national park series</p>
<div class="bkcards"><div><b>Great Smoky Mountains</b><span>Trip Planning Guide, with 3, 5 and 7-day plans</span></div><div><b>Utah's Mighty 5</b><span>Trip Planning Guide for Zion, Bryce Canyon, Capitol Reef, Arches and Canyonlands</span></div></div>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">General trip planning information only. Trail conditions, closures, fees and rules change: always check nps.gov and ask a ranger before you hike. Hike within your ability and turn back when in doubt. Not affiliated with the National Park Service. For personal use only. Cover photo: Sam McCool / Pexels.</p>""", "back")

css = open(os.path.join(HERE, "base.css")).read() + EXTRA
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
