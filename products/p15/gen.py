"""Generates index.html for p15 (Banff & Jasper — Trip Planning Guide). Run: python3 gen.py
Same look as p11 (base.css + extra.css). Facts checked on November 5, 2026 against parks.canada.ca:
Banff fees (2026 admission, Discovery Pass, Lake Louise parking, shuttle fares), Lake Louise and Moraine Lake
transit page (2026 season, reservation release, Moraine Lake Road closed to personal vehicles, cycling distances),
Banff hiking page (one-way distances and total gain), Jasper Icefields Parkway trails, Jasper south-of-town and
Maligne Lake trails, Jasper open/closed list (updated 2026-10-13), Moraine Lake area group access restriction,
Banff safe wildlife viewing distances, Icefields Parkway winter safety page. Drive distances: Banff & Lake Louise
Tourism and Tourism Jasper. Campground launch dates 2026: reported by Curiocity from Parks Canada."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Banff &amp; Jasper"
CHECKED = "November 2026"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def mi(km): return f"{km/1.609:.1f}".rstrip("0").rstrip(".") + " mi"
def ft(m): return f"{round(m/0.3048, -1):,.0f} ft"

MORE = """
.tt td{font-size:9.6pt;padding:5pt 5pt}
.tt th{font-size:7.3pt;padding:5pt 5pt}
.tt td:first-child{font-weight:600;color:var(--forest)}
.tt tr.grp td{background:var(--soft);font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);padding:6pt 5pt}
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
.stops>div{display:grid;grid-template-columns:1.7in 1fr;gap:12pt;padding:6pt 0;border-bottom:0.6pt solid var(--line)}
.stops b{font:600 12pt/1.25 var(--serif);color:var(--forest)}
.stops b small{display:block;font:700 7pt/1.4 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay)}
.stops p{margin:0;font-size:10pt;line-height:1.42}
.months td{font-size:9.6pt;padding:5pt 6pt;line-height:1.38}
.months td:first-child{font:600 11pt/1.2 var(--serif);color:var(--forest);width:0.95in;white-space:nowrap}
.spots td{font-size:10pt;padding:6pt 6pt}
.spots td.b{width:0.7in;text-align:center}
.spots td.b::before{content:"";display:inline-block;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.plan .d{grid-template-columns:0.85in 1fr}
.map{display:grid;grid-template-columns:2.65in 1fr;gap:16pt;align-items:start;margin-top:4pt}
.map svg text{font-family:var(--sans)}
.dayp{border:1pt solid var(--line);border-radius:9pt;background:#fff;padding:9pt 13pt;margin-bottom:9pt}
.dayp .f2 .fl{height:31pt}
.notes .wl{height:27pt}
.bud td{height:36pt}
html.bw .now{border-color:#444}
html.bw .tt tr.grp td{background:#fff}
html.bw .map svg .fillc{fill:#fff !important}
html.bw .map svg .lk{fill:#bbb !important}
"""

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 235 L60 175 L95 200 L150 95 L185 140 L215 70 L250 120 L285 90 L330 160 L370 130 L470 230" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M215 70 L203 92 L216 88 L226 98 L236 86 L250 120" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M120 290 C170 262 300 262 350 290 C300 312 170 312 120 290 Z" stroke="#F5F1EA" stroke-width="3"/>
<path d="M50 300 L50 258 M36 268 L50 244 L64 268 M36 284 L50 260 L64 284 M420 300 L420 254 M406 264 L420 240 L434 264 M406 282 L420 258 L434 282" stroke="#F5F1EA" stroke-width="2.5"/>
<circle cx="395" cy="55" r="20" stroke="#F5F1EA" stroke-width="3"/>
</svg></div>
<div><h1>Banff &amp; Jasper</h1><p class="sub">A trip planning guide to the Canadian Rockies for first-time visitors from the US and Canada. Park passes and the border, how to reach Lake Louise and Moraine Lake now, the Icefields Parkway, 3, 5 and 7-day plans, and 12 day hikes from lakeside strolls to larch valleys.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>12 day hikes</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">Banff and Jasper sit side by side in the Rocky Mountains of Alberta, Canada, joined by one of the great mountain roads of the world. This guide helps you plan a first visit without the stress.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["The parks at a glance, with drive times", "When to go, season by season", "Park passes, the border, and what to book", "Lake Louise and Moraine Lake without your car", "The Icefields Parkway, stop by stop", "Wildlife, weather and mountain safety", "3, 5 and 7-day plans and 12 day hikes", "Packing list, budget and planners"]) + f"""</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers. Every hike is a day hike on a marked trail, from a flat lakeshore walk to a half-day climb to a tea house.</p>
<h3>How to read the numbers</h3><p>Distances are round trip, in miles and kilometers. Parks Canada lists most Banff trails one way, so we doubled them. Climb is the total elevation gain Parks Canada gives, in feet and meters. Prices are in Canadian dollars (CAD).</p></div></div>
<div class="box forest"><h3>Checked against Parks Canada in {CHECKED}</h3><p style="margin:0">Shuttle seasons, fees, closures and trail rules change every year, and Jasper is still recovering from the 2024 wildfire. Before you go, check the official pages on page 28 and ask at a visitor centre when you arrive.</p></div>
<h3>Print it or keep it offline</h3>
<p>There is no cell service on most of the Icefields Parkway or on many trails. Save this PDF to your phone before you leave home, or print the pages you need. Pages 25 to 27 and 29 are made for printing.</p>
<div class="box"><h3 style="margin-top:0">Quick conversions</h3><p style="margin:0">1 km = 0.6 mi · 100 km/h = 62 mph · 1,000 m = 3,280 ft · 20 °C = 68 °F</p></div>""")

# 3 at a glance
svg = """<svg width="250" height="600" viewBox="0 0 230 560" fill="none">
<path d="M70 40 L70 470" stroke="#2F4A3A" stroke-width="5" stroke-linecap="round"/>
<path d="M70 470 L150 530" stroke="#2F4A3A" stroke-width="4" stroke-dasharray="3 7" stroke-linecap="round"/>
<path d="M70 40 L120 4" stroke="#2F4A3A" stroke-width="4" stroke-dasharray="3 7" stroke-linecap="round"/>
<g font-size="11" fill="#2F4A3A" font-weight="700">
<circle cx="70" cy="40" r="8" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="3"/><text x="86" y="44">JASPER</text>
<circle cx="70" cy="150" r="6" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="3"/><text x="86" y="154">Columbia Icefield</text>
<circle cx="70" cy="330" r="6" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="3"/><text x="86" y="334">LAKE LOUISE</text>
<circle cx="70" cy="440" r="8" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="3"/><text x="86" y="444">BANFF</text>
</g>
<g font-size="9.5" fill="#6B6B66" font-weight="600">
<text x="128" y="12">to Edmonton</text>
<text x="160" y="548" text-anchor="middle">Canmore, Calgary</text>
<text x="86" y="356">Moraine Lake (shuttle)</text>
<text x="86" y="250">Bow Lake, Peyto Lake</text>
<text x="86" y="264">Saskatchewan River Crossing</text>
<text x="86" y="92">Athabasca Falls</text>
</g>
<path d="M58 330 L40 360" stroke="#2F4A3A" stroke-width="2" stroke-dasharray="2 4"/>
<g font-size="8.5" fill="#A0573A" font-weight="700" letter-spacing="1">
<text x="20" y="100" transform="rotate(-90 20 100)">JASPER NP</text>
<text x="20" y="400" transform="rotate(-90 20 400)">BANFF NP</text>
</g>
<path d="M8 180 L64 180" stroke="#A0573A" stroke-width="1.5" stroke-dasharray="4 3"/>
<text x="86" y="184" font-size="8.5" fill="#A0573A" font-family="Inter" font-weight="700">Sunwapta Pass: park boundary</text>
<text x="86" y="200" font-size="9.5" fill="#6B6B66" font-family="Inter" font-weight="600">Parker Ridge</text>
</svg>"""
page(f"""<div class="kicker">The parks</div><h2>At a glance</h2>
<p class="lead">Banff is Canada's oldest national park, with the town of Banff and the lakes of Lake Louise. Jasper is the larger, wilder park to the north. The Icefields Parkway links them through a chain of glaciers, lakes and waterfalls.</p>
<div class="map"><div>{svg}<p class="small" style="margin-top:2pt">Our simple diagram, not to scale. Use a real map for driving.</p></div>
<div><h3 style="margin-top:0">Drive times without stops</h3>
<table><tr><th>Route</th><th>Distance</th><th>Time</th></tr>
<tr><td>Calgary airport to Banff</td><td>about 87 mi / 140 km</td><td>1.5 h</td></tr>
<tr><td>Banff to Lake Louise</td><td>35 mi / 57 km</td><td>45 min</td></tr>
<tr><td>Lake Louise to Jasper (Icefields Parkway)</td><td>145 mi / 233 km</td><td>3 to 4 h</td></tr>
<tr><td>Jasper to the Columbia Icefield</td><td>63 mi / 102 km</td><td>1 h</td></tr>
<tr><td>Edmonton to Jasper</td><td>227 mi / 366 km</td><td>4 h</td></tr>
<tr><td>Calgary to Jasper</td><td>255 mi / 412 km</td><td>5 h</td></tr></table>
<h3>Where to sleep</h3>
<p><b>Banff town</b> has the most rooms and is the easy base for the first days. <b>Lake Louise village</b> is small and books up early. <b>Jasper town</b> is open and welcoming visitors after the 2024 wildfire. <b>Canmore</b>, just outside Banff's east gate, is often cheaper. A few lodges and hostels sit on the Icefields Parkway itself.</p>
<div class="box forest"><h3>Fly into which city?</h3><p style="margin:0">Calgary (YYC) for Banff and Lake Louise. Edmonton (YEG) for Jasper. For a Banff-to-Jasper trip, fly into one and out of the other, or loop back on the Parkway.</p></div></div></div>""")

# 4 when to go
months = [
 ("Jan to Mar", "Deep winter. Skiing, frozen lakes, very short days. The Icefields Parkway needs winter tires or chains and has no services. Many trails are snowshoe or ski only."),
 ("April, May", "Spring at low elevation, winter higher up. Lakes stay frozen into late May or June. Avalanche risk on many trails. Quiet and good for wildlife watching."),
 ("June", "Lakes thaw and turn blue. Waterfalls are full. Snow lingers on higher trails. Lake Louise shuttles start mid-May, Moraine Lake shuttles June 1 (2026)."),
 ("July, August", "Peak season: wildflowers, the most open trails, the most people. Long days. Afternoon thunderstorms are common. Book everything early."),
 ("September", "Cooler, clear days, fewer crowds after Labour Day. Larch trees turn gold, usually mid to late September. Elk rut begins. Snow can fall up high."),
 ("October", "First real snows. Shuttles end mid-October (October 12 in 2026). Many trails icy. Quiet and beautiful, but plan for winter driving."),
 ("Nov, Dec", "Winter returns. Winter tires or chains required on the Parkway from November 1. Christmas markets and skiing in Banff."),
]
page('<div class="kicker">Timing</div><h2>When to go: season by season</h2><p class="lead">For a first hiking trip, late June to mid-September gives you thawed lakes, open trails and running shuttles. Late September is the local favorite: golden larches and crisp air, but snow is possible any day.</p>'
 + '<table class="months">' + "".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in months) + '</table>'
 + '<div class="box"><h3 style="margin-top:0">Snow lasts longer than you think</h3><p style="margin:0">A warm June day in Banff town can still mean deep snow at Lake Agnes or on Parker Ridge. Higher trails can stay snowy into July; Parks Canada says Wilcox Pass can be snowy until late July. Check the trail conditions page before you go.</p></div>'
 + '<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr><tr><td>Thawed lakes, open trails, running shuttles</td><td>Late June to mid-September</td></tr><tr><td>Wildflowers in the high meadows</td><td>July and early August</td></tr><tr><td>Golden larches</td><td>Mid to late September</td></tr><tr><td>Fewer people and lower prices</td><td>Early June, or after mid-September</td></tr></table>')

# 5 park pass + border
page("""<div class="kicker">Passes</div><h2>Park passes, and crossing from the US</h2>
<p class="lead">You need a Parks Canada pass to stop anywhere in Banff or Jasper, including the viewpoints on the Icefields Parkway. There is no timed entry: one pass and you can go where you like.</p>
<div class="permit">
<div><small>Short trip</small><h3>Daily admission</h3><div class="hrs">$24.50 CAD</div><div class="hl">Family or group, one vehicle, up to 7 people</div><p>Per person: adult (18 to 64) $12.25, senior (65+) $10.75. Youth 17 and under are free. Valid in Banff, Jasper, Yoho and Kootenay. Buy one day for each day you visit.</p></div>
<div class="plus"><small>Week or longer</small><h3>Discovery Pass</h3><div class="hrs">$167.50 CAD</div><div class="hl">Family or group, 12 months, all Parks Canada places</div><p>Adult $83.50, senior $71.50. On a family trip it usually pays off from about the seventh day. Good for every national park in Canada for a year.</p></div></div>
<p class="small">2026 prices from parks.canada.ca. Buy online before you go, or at the park gates and visitor centres. In summer 2025 and 2026 Canada offered free admission for part of the season (the Canada Strong Pass): check whether there is an offer for your dates.</p>
<h3>Crossing from the US</h3>
<div class="bk">
<div><b>Documents</b><p>US citizens need a passport book to fly in. By land, a passport, passport card, NEXUS card or enhanced driver's license works. Check the rules for every traveler on cbsa-asfc.gc.ca and travel.gc.ca.</p></div>
<div><b>Driving</b><p>Your US license is fine for a visit. Speeds and distances are in km/h and km, and fuel is sold by the liter. Check that your car insurance or rental covers Canada.</p></div>
<div><b>Bear spray</b><p>Simplest is to buy it in Banff, Canmore or Jasper. You cannot carry it on a plane, and the border has rules for bringing it by car.</p></div>
<div><b>Money</b><p>Prices are in CAD. Cards work almost everywhere. Ask your bank about foreign transaction fees before you go.</p></div></div>
<div class="box forest"><h3>Canadian visitors</h3><p style="margin:0">No border to worry about. If you visit several national parks a year, the Discovery Pass is often the better deal.</p></div>""")

# 6 what to book
page("""<div class="kicker">Bookings</div><h2>What to book, and when</h2>
<p class="lead">The Rockies are busy from June to September. The trick is to book in the right order: rooms or campsites first, then shuttles, then everything else.</p>
<div class="bk">
<div><b>Rooms</b><p>As soon as you know your dates, especially for July, August and September. Lake Louise village and the Parkway lodges have very few rooms. Free cancellation rates give you room to change the plan.</p></div>
<div><b>Campgrounds</b><p>On reservation.pc.gc.ca. In 2026 Banff opened on January 23 and Jasper on January 27, at 8 am Mountain Time, for the whole season. Popular dates go in the first hours.</p></div>
<div><b>Lake Louise and Moraine Lake shuttle</b><p>In 2026 bookings opened April 15 at 8 am Mountain Time with 40% of seats. The other 60% are released at 8 am Mountain Time two days before each day. See page 7.</p></div>
<div><b>Roam transit</b><p>The Banff to Lake Louise express bus (Route 8X) takes reservations in summer. Book when your dates are fixed.</p></div>
<div><b>Park pass</b><p>Any time. Buying online saves a stop at the gate.</p></div>
<div><b>Tours and boats</b><p>Optional extras such as glacier tours and lake cruises book up in summer. Book only once the main plan is fixed.</p></div></div>
<div class="now"><h3>Planning a 2027 trip?</h3><p>The dates on this page are from 2026. Parks Canada announces each year's launch dates in the winter before the season. Search "Parks Canada reservations" and "Lake Louise shuttle" in December and January, and set reminders.</p></div>
<div class="warn">Booking sites that are not Parks Canada or Roam may resell shuttle seats at a higher price. For the Parks Canada shuttle, book only on the official Parks Canada reservation site.</div>""")

# 7 Moraine Lake and Lake Louise
page("""<div class="kicker">Lake Louise and Moraine Lake</div><h2>Getting there without your car</h2>
<p class="lead">Moraine Lake Road is closed to personal vehicles all year. Lake Louise has a paid lot that often fills before sunrise. For most visitors the answer is the Parks Canada shuttle.</p>
<div class="permit">
<div class="plus"><small>Easiest</small><h3>Parks Canada shuttle</h3><div class="hrs">$12.75 CAD adult</div><div class="hl">Senior $6, youth $4, plus $3.50 to book online</div><p>From the Lake Louise Park and Ride (free parking for ticket holders), every 30 minutes to both lakes. One ticket includes the Lake Connector bus between the lakes. 2026 season: Lake Louise May 15 to Oct 12, Moraine Lake June 1 to Oct 12. The park pass is extra.</p></div>
<div><small>Other ways</small><h3>Without the shuttle</h3><div class="hrs">Bus, bike or tour</div><div class="hl">Plan ahead for each</div><p>Roam Route 8X runs from Banff to the Lake Louise lakeshore all year. Licensed tour companies run trips to Moraine Lake (list on CarFreeBanff.ca). Lake Louise lakeshore parking is $42 a day in 2026 and fills early.</p></div></div>
<h3>How the shuttle day works</h3>
<div class="bk">
<div><b>Check in</b><p>Arrive at the Park and Ride during your one-hour departure window. Expect a wait of at least 30 minutes, longer at busy times.</p></div>
<div><b>Lake hop</b><p>The Lake Connector runs every 30 minutes between the two lakes. Boarding is first come, first served. The last bus from Moraine Lake leaves at 6 pm.</p></div>
<div><b>Sunrise</b><p>The Alpine Start bus leaves the Lake Louise lakeshore at 4 and 5 am for Moraine Lake (2026). You must park at the paid lakeshore lot.</p></div>
<div><b>Last bus back</b><p>To the Park and Ride at 7:30 pm. Note it on your phone and on page 26.</p></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Cycling</h3><p>To Lake Louise: 2.5 mi (4 km) one way on Lake Louise Drive. To Moraine Lake: about 8.7 mi (14 km) one way with 1,730 ft (527 m) of climb, for fit riders. Bring a lock.</p></div>
<div><h3>Walking in?</h3><p>The Tramline Trail links Lake Louise village to the lakeshore, 2.7 mi (4.3 km) one way. Parks Canada does not recommend walking to Moraine Lake: 17 mi (28 km) round trip on the road.</p></div></div>""")

# 8 Icefields Parkway
stops = [("Bow Lake", "About 40 min north", "A wide lake under the Crowfoot Glacier, right by the road. Great at sunrise."),
 ("Peyto Lake viewpoint", "Bow Summit", "A short, paved uphill walk to the famous wolf-head lake view. Busy at midday."),
 ("Mistaya Canyon", "Short walk", "A short downhill walk to a twisting slot canyon carved by the river."),
 ("Saskatchewan River Crossing", "Roughly halfway", "Fuel, food and toilets in season. Do not count on them in winter."),
 ("Parker Ridge", "Hike 8", "A short climb to a ridge with a view of the Saskatchewan Glacier."),
 ("Columbia Icefield", "Hikes 9 and 10", "The Athabasca Glacier, the Icefield Centre and the walk to the toe of the glacier."),
 ("Sunwapta Falls", "Jasper NP", "A powerful waterfall a few steps from the parking area."),
 ("Athabasca Falls", "30 min from Jasper", "The river crashes through a narrow gorge. Stay behind the railings.")]
page('<div class="kicker">Scenic drive</div><h2>The Icefields Parkway</h2>'
 + '<p class="lead">Highway 93 runs about 143 mi (230 km) from Lake Louise to Jasper. Parks Canada says to allow 3 to 4 hours of driving alone. With stops, plan a full day.</p>'
 + '<div class="stops">' + "".join(f"<div><b>{a}<small>{b}</small></b><p>{c}</p></div>" for a, b, c in stops) + '</div>'
 + '''<div class="cols" style="margin-top:8pt">
<div><h3>Before you set out</h3>''' + chk(["Fill the tank in Lake Louise or Jasper", "Download offline maps: no cell service on the Parkway", "Park pass on the dash", "Water, snacks and warm layers in the car", "Check the road report at 511.alberta.ca"]) + '''</div>
<div><h3>Winter is different</h3><p>From November 1 to March 31, snow tires or chains are required. In winter there are no services between Lake Louise and Jasper, and the road can close for avalanche control. Drive it in daylight and only in good weather.</p></div></div>
''')

# 9 wildlife
page("""<div class="kicker">Safety</div><h2>Wildlife: bears, elk and more</h2>
<p class="lead">Grizzly and black bears, elk, bighorn sheep, mountain goats, moose and wolves all live here. Seeing them is a highlight. Getting close is how people and animals get hurt.</p>
<div class="dist"><div class="a"><div class="n">100 m</div><div class="u">330 ft · about 10 bus lengths</div><p>Bears, wolves, cougars and coyotes.</p></div><div class="b"><div class="n">30 m</div><div class="u">100 ft · about 3 bus lengths</div><p>Elk, deer, bighorn sheep and moose.</p></div></div>
<p class="small">Parks Canada's minimum distances. If an animal moves because of you, you are too close. Feeding or disturbing wildlife is illegal, with fines up to $25,000.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>On the trail</h3>""" + chk(["Carry bear spray where you can reach it, and know how to use it", "Make noise, especially near streams and blind corners", "Hike in a group and keep children close", "Keep dogs on a leash at all times", "Read the trail notices at the trailhead"]) + """</div>
<div><h3>If you meet a bear</h3>""" + chk(["Stay calm and do not run", "Speak in a firm voice and back away slowly", "Give it a way out", "Have your bear spray ready", "Report it to the park"]) + """</div></div>
<div class="box forest"><h3>Group rules near Moraine Lake</h3><p style="margin:0">Because of bears, Parks Canada often requires hikers to travel in a tight group of four or more on trails near Moraine Lake, usually from mid-July to mid-October. This includes Larch Valley, Sentinel Pass, Consolation Lakes, Eiffel Lake and Paradise Valley. Not the lakeshore or the Rockpile. Check the bulletins for your dates.</p></div>
<div class="em"><h3>On the road</h3><p>If you see wildlife, slow down and stay in your vehicle. Stop only where it is safe, with hazard lights on, take a quick look and move on. Never get out for a photo.</p></div>""")

# 10 weather
page("""<div class="kicker">Safety</div><h2>Mountain weather</h2>
<p class="lead">In the Rockies you can get sun, rain, hail and snow on the same summer hike. It is colder up high, wind makes it feel colder still, and storms build fast in the afternoon.</p>
<div class="layers">
<div><div class="num">1</div><h3>Dress in layers</h3><p>A wicking base layer, a warm fleece or puffy, and a waterproof jacket with a hood, on every hike.</p><div class="eg">Pack a hat and light gloves, even in July.</div></div>
<div><div class="num">2</div><h3>Start early</h3><p>Summer storms often build after midday. Mornings are calmer, cooler and less crowded.</p><div class="eg">Be off open ridges by early afternoon.</div></div>
<div><div class="num">3</div><h3>Turn back in time</h3><p>Pick a turnaround time before you start and keep it, even if the top looks close.</p><div class="eg">The mountain will still be there.</div></div></div>
<div class="cols">
<div><h3>Thunderstorms</h3>""" + chk(["Watch for clouds growing tall by late morning", "Thunder means you are in range: head down", "Get off ridges and away from lone trees", "Spread a group out", "A hard-top car is good shelter"]) + """</div>
<div><h3>Cold and wet</h3>""" + chk(["Hypothermia can happen in summer when wet and tired", "Change out of wet layers when you stop", "Snow can fall any month on high trails", "Carry a space blanket and a headlamp", "Check the forecast every morning"]) + """</div></div>
<div class="box"><h3 style="margin-top:0">Glacier water</h3><p style="margin:0">The lakes and rivers are fed by snow and ice. They are cold enough to cause cold shock in seconds, and the currents are strong. Stay back from riverbanks and waterfall edges, and do not drink untreated water.</p></div>
""")

# plans
def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"

# 11-12 3 days
page('<div class="kicker">Sample plans</div><h2>3 days: Banff and Lake Louise</h2>' +
 plan("3 days, one base", "Sleep in Banff or Canmore", [
  ("Day 1", "Arrive from Calgary. Short walk at the Fenland Trail or up Tunnel Mountain (hike 2) to stretch your legs. Evening drive to Lake Minnewanka and back, watching for wildlife."),
  ("Day 2", "Early shuttle to Lake Louise. Walk the shoreline, then climb to the Lake Agnes Tea House (hike 4). Lake Connector to Moraine Lake in the afternoon for the shoreline and the Rockpile view. Last bus back."),
  ("Day 3", "Johnston Canyon at opening time if it is open (hike 1), or Bow Lake and the Peyto Lake viewpoint on the Icefields Parkway (page 8). Back to Calgary in the afternoon.")]) +
 '<h3>Rules of thumb</h3>' + chk(["One big outing a day, started early", "Book the shuttle as soon as reservations open", "Keep the last day light: you still have a drive", "Always have a rainy-day backup (page 23)"]) +
 '<div class="box forest"><h3>Only have one day?</h3><p style="margin:0">Spend it at Lake Louise and Moraine Lake on the shuttle. Walk to the Fairview Lookout or the Lake Agnes Tea House, then ride the Lake Connector to Moraine Lake.</p></div>'
 + '<div class="mini" style="margin-top:10pt"><div><h3>Where to sleep</h3><div class="s">Banff or Canmore</div><p>One base for all three nights means no packing up. Banff town is closest to the Roam buses; Canmore is about 25 minutes east and often cheaper.</p></div>'
 + '<div><h3>Getting around</h3><div class="s">Car plus shuttle</div><p>A rental car from Calgary for days 1 and 3. On day 2, drive to the Lake Louise Park and Ride, or take Roam Route 8X from Banff.</p></div></div>')

page('<div class="kicker">Sample plans</div><h2>3 days: make it work</h2>'
 + '<h3>Book for this plan</h3>' + chk(["2 or 3 nights in Banff or Canmore", "Shuttle for day 2, with a morning departure window", "Daily admission for 3 days, or a Discovery Pass if you visit more parks this year", "Rental car from Calgary airport"])
 + '''<div class="mini" style="margin-top:8pt">
<div><h3>No shuttle seats?</h3><div class="s">Plan B</div><p>Try again at 8 am Mountain Time two days before. Or take Roam Route 8X to Lake Louise and a licensed tour to Moraine Lake.</p></div>
<div><h3>Rainy day 2?</h3><div class="s">Swap</div><p>Do the lakes on day 3 instead, and use day 2 for the Banff museums and hot springs (page 23).</p></div>
<div><h3>Visiting in larch season?</h3><div class="s">Mid to late September</div><p>Swap Lake Agnes for Larch Valley (hike 7), with a group of four or more if the group rule is on.</p></div>
<div><h3>With young kids?</h3><div class="s">Keep it short</div><p>Lake Louise shoreline, the Fairview Lookout and Moraine Lake shoreline are all short and close to the buses.</p></div></div>
<h3>Our notes</h3>''' + lines(9))

# 13-14 5 days
page('<div class="kicker">Sample plans</div><h2>5 days: Banff to Jasper</h2>' +
 plan("5 days, two bases", "2 nights Banff, 1 Lake Louise, 2 Jasper", [
  ("Day 1", "Arrive from Calgary. Tunnel Mountain (hike 2) or a walk along the Bow River in Banff town."),
  ("Day 2", "Johnston Canyon early if open (hike 1). Afternoon at the Banff Gondola, the hot springs or a lake cruise on Lake Minnewanka."),
  ("Day 3", "Shuttle day: Lake Agnes Tea House (hike 4) or the Plain of Six Glaciers (hike 5), then Moraine Lake. Sleep in Lake Louise or nearby."),
  ("Day 4", "Icefields Parkway north (page 8): Bow Lake, Peyto Lake, Parker Ridge (hike 8), the Toe of the Athabasca Glacier (hike 10), Athabasca Falls. Sleep in Jasper."),
  ("Day 5", "Valley of the Five Lakes (hike 11) in the morning, then drive to Edmonton for your flight.")]) +
 '<h3>Driving on this plan</h3><table><tr><th>Day</th><th>Drive</th><th>Without stops</th></tr><tr><td>1</td><td>Calgary airport to Banff</td><td>about 1.5 h</td></tr><tr><td>3</td><td>Banff to Lake Louise Park and Ride</td><td>about 45 min</td></tr><tr><td>4</td><td>Lake Louise to Jasper on the Parkway</td><td>3 to 4 h, plan a full day</td></tr><tr><td>5</td><td>Jasper to Edmonton</td><td>about 4 h</td></tr></table>' +
 '<div class="box forest"><h3>Why this order</h3><p style="margin:0">Starting in Banff gives your legs a few easy days. The Parkway is the highlight, so it sits in the middle when you are fresh and the weather can still be swapped around.</p></div>'
 + '<h3>Rules of thumb</h3>' + chk(["Leave Lake Louise early on Parkway day: the light and the parking are better", "Fill the tank before the Parkway", "Keep day 5 short: you still have a 4-hour drive"]))

page('<div class="kicker">Sample plans</div><h2>5 days: make it work</h2>'
 + '<h3>Book for this plan</h3>' + chk(["Fly into Calgary, out of Edmonton (check one-way rental fees)", "2 nights Banff, 1 night Lake Louise area, 2 nights Jasper", "Shuttle for day 3", "Park pass for 5 days: compare daily admission with a Discovery Pass", "Fill the tank before the Parkway"])
 + '''<div class="mini" style="margin-top:8pt">
<div><h3>Bad weather on Parkway day?</h3><div class="s">Swap days</div><p>Glaciers and views hide in cloud. If you can, swap day 4 with day 2 and drive on the clearer day.</p></div>
<div><h3>Same airport both ways?</h3><div class="s">Loop</div><p>From Calgary, drive back down the Parkway on day 5. It looks different in the other direction.</p></div>
<div><h3>Want quieter trails?</h3><div class="s">Jasper</div><p>Swap day 5 for Maligne Lake: the flat Mary Schäffer Loop and Moose Lake Loop (hike 12).</p></div>
<div><h3>Short on time?</h3><div class="s">Trim</div><p>Drop day 2 and do Johnston Canyon on the morning of day 3 on the way to Lake Louise.</p></div></div>
<h3>Our notes</h3>''' + lines(11))

# 15-16 7 days
page('<div class="kicker">Sample plans</div><h2>7 days: the full Rockies</h2>' +
 plan("7 days, three bases", "3 nights Banff, 1 Lake Louise, 3 Jasper", [
  ("Day 1", "Arrive from Calgary. Easy walk in Banff town and an early night."),
  ("Day 2", "Johnston Canyon (hike 1) if open, then Tunnel Mountain (hike 2) in the afternoon."),
  ("Day 3", "Rest-ish day: Banff Gondola or Lake Minnewanka cruise, the Cave and Basin site, or a gentle Bow River walk."),
  ("Day 4", "Shuttle day: Lake Agnes Tea House and on to the Plain of Six Glaciers via the Highline (hikes 4 and 5), Moraine Lake in the evening light."),
  ("Day 5", "Moraine Lake again: Consolation Lakes or Larch Valley (hikes 6 and 7), then the Icefields Parkway to Jasper with stops at Bow Lake and Peyto Lake."),
  ("Day 6", "Back south to the Columbia Icefield: Wilcox Pass (hike 9) and the Toe of the Athabasca Glacier (hike 10). Athabasca and Sunwapta Falls on the way back."),
  ("Day 7", "Valley of the Five Lakes or Maligne Lake (hikes 11 and 12). Fly home from Edmonton.")]) +
 '<h3>Driving on this plan</h3><table><tr><th>Day</th><th>Drive</th><th>Without stops</th></tr><tr><td>1</td><td>Calgary airport to Banff</td><td>about 1.5 h</td></tr><tr><td>4</td><td>Banff to Lake Louise Park and Ride</td><td>about 45 min</td></tr><tr><td>5</td><td>Lake Louise to Jasper on the Parkway</td><td>3 to 4 h</td></tr><tr><td>6</td><td>Jasper to the Columbia Icefield and back</td><td>about 2 h</td></tr><tr><td>7</td><td>Jasper to Edmonton</td><td>about 4 h</td></tr></table>'
 + '<div class="box forest"><h3>Why this order</h3><p style="margin:0">Easy days first while you settle in, the lakes in the middle, and the big glacier views at the end. Day 5 is long: start early at Moraine Lake so you reach Jasper before dark.</p></div>')

page('<div class="kicker">Sample plans</div><h2>7 days: make it work</h2>'
 + '<h3>Book for this plan</h3>' + chk(["Discovery Pass: it usually beats daily admission for a 7-day family trip", "Shuttle for day 4, and day 5 if you return to Moraine Lake", "3 nights Banff, 1 night Lake Louise area, 3 nights Jasper", "A glacier tour or lake cruise, if you want one"])
 + '''<div class="mini" style="margin-top:8pt">
<div><h3>Pace yourself</h3><div class="s">Rest day</div><p>Day 3 is deliberately easy. Seven days of big hikes in a row wear people out, and tired hikers make poor choices.</p></div>
<div><h3>Larch Valley rule</h3><div class="s">Groups of four</div><p>If the group rule is on, join up with other hikers to make a group of four, or swap for the Moraine Lake shoreline and the Rockpile, which are outside the rule.</p></div>
<div><h3>Jasper is still healing</h3><div class="s">After the 2024 fire</div><p>Some places are still closed (page 22). Check the "What's open" page for Jasper before you lock in day 7.</p></div>
<div><h3>Canadian road trip?</h3><div class="s">Driving in</div><p>From the east, Calgary to Banff is on the way. From Edmonton, run the plan backwards: start in Jasper.</p></div></div>
<h3>Our notes</h3>''' + lines(8))

# hike cards
def card(no, name, where, level, stats, see, tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    st = "".join(f'<div><b>{a}</b><span>{b}</span><em>{c}</em></div>' for a, b, c in stats)
    return f'''<div class="hk"><div class="top"><div><small>Hike {no}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st">{st}</div>
<p><span class="lb">Where</span>{where}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Good to know</span>{tip}</p>{nt}</div>'''
def rt(km): return ("Round trip", mi(km), f"{km:g} km")
def loop(km): return ("Loop", mi(km), f"{km:g} km")
def gain(m): return ("Climb", ft(m), f"{m} m")

# 17 Banff town area
page('<div class="kicker">Hikes · Banff area</div>' +
 card(1, "Johnston Canyon", "Bow Valley Parkway, about 25 km (16 mi) west of Banff town. Roam Route 9 runs here in summer.", "Easy to moderate",
      [("Round trip", "1.4 to 3 mi", "2.2 · 4.8 km"), ("Climb", "280 to 705 ft", "85 · 215 m"), ("Time", "1 to 2 h", "Parks Canada"), ("Best", "Early morning", "Very busy")],
      "Steel catwalks bolted to the canyon walls take you above a rushing creek to the Lower Falls (1.4 mi / 2.2 km round trip) and on to the taller Upper Falls (3 mi / 4.8 km round trip).",
      "Closed from October 13, 2026 for slope repairs, with the main parking lot. Check if it has reopened before you plan it. The Upper Falls and the Ink Pots could still be reached from Moose Meadows during the work.") +
 card(2, "Tunnel Mountain Summit", "Trailhead on St. Julien Road in Banff town. Walkable from downtown.", "Moderate",
      [rt(4.6), gain(275), ("Time", "About 2 h", "Parks Canada"), ("Best", "May to Oct", "Good first day")],
      "A short, steady climb on switchbacks to a summit right above the town, with views down the Bow Valley, over the Banff Springs Hotel and up to Mount Rundle.",
      "A good first-day hike to test your legs. Cliffs near the top: keep children close."))

# 18 Lake Louise 1
page('<div class="kicker">Hikes · Lake Louise</div>' +
 card(3, "Lake Louise Shore and Fairview", "Lake Louise lakeshore. Parks Canada shuttle, Roam 8X, or the paid lot.", "Easy",
      [("Shoreline", mi(4.6), "4.6 km round trip"), ("Fairview", mi(2.4), "2.4 km round trip"), ("Climb", "Gentle", "Fairview 100 m / 330 ft"), ("Best", "Early or late", "Calm water")],
      "A wide path along the north shore of the turquoise lake to the far end, where the glacier views open up. The Fairview Lookout climbs through the forest on the other side to a view back over the lake and the Chateau.",
      "Perfect for arrival day, families and anyone who wants the famous view without a big climb.") +
 card(4, "Lake Agnes Tea House", "Lake Louise lakeshore, near the Chateau. Same transport as hike 3.", "Moderate",
      [rt(7.8), gain(495), ("Time", "2.5 to 3 h", "Parks Canada"), ("Best", "July to Sept", "Snow into June")],
      "A steady climb through the forest, past little Mirror Lake, to a historic tea house beside a lake in a rocky bowl. Tea, soup and baked goods in season, then the same way down.",
      "The tea house is seasonal and busy: expect a line at midday. Fit hikers can add the Little Beehive (1.1 mi / 1.8 km round trip from the lake) or Big Beehive (1.9 mi / 3 km) for bigger views."))

# 19 Lake Louise 2 + Moraine
page('<div class="kicker">Hikes · Lake Louise and Moraine Lake</div>' +
 card(5, "Plain of Six Glaciers", "Lake Louise lakeshore. Follow the shoreline, then climb toward the Victoria Glacier.", "Moderate",
      [rt(11.8), gain(595), ("Time", "About 4 h", "Parks Canada"), ("Best", "July to Sept", "Start early")],
      "A longer day into the glacier country behind Lake Louise: moraines, rockfall slopes and a second historic tea house with views of the ice.",
      "Parks Canada lists a 14.3 km (8.9 mi) loop that links this trail with Lake Agnes by the Highline Trail, for fit hikers with a full day. Watch for falling rock and stay on the trail.") +
 card(6, "Consolation Lakes", "Moraine Lake, by the shuttle or a licensed tour. Starts near the Rockpile.", "Easy",
      [rt(5.8), gain(135), ("Time", "About 2 h", "Parks Canada"), ("Best", "July to Sept", "Group rule")],
      "A short, gentle walk from Moraine Lake through the forest and across a boulder field to two quiet lakes under big peaks. A calmer place than the crowded shore.",
      "When the bear group rule is on (often mid-July to mid-October), you must hike in a tight group of four or more.",
      "Also at Moraine Lake: the shoreline trail, 1.6 mi (2.6 km) round trip with almost no climb, and the short climb up the Rockpile for the classic view. Neither is under the group rule."))

# 20 Larch + Parker
page('<div class="kicker">Hikes · Moraine Lake and the Parkway</div>' +
 card(7, "Larch Valley", "Moraine Lake, by the shuttle. The trail starts near the lodge.", "Moderate",
      [rt(9), gain(535), ("Time", "3.5 to 4 h", "Parks Canada"), ("Best", "Mid to late Sept", "Gold larches")],
      "Switchbacks through the forest open into a high valley of larch trees under the Valley of the Ten Peaks. Larches turn gold in mid to late September and then drop their needles.",
      "Group of four or more when the bear group rule is on. Sentinel Pass, above the valley, is a difficult extension on steep, loose ground: not a beginner goal.",
      "Larch season is the busiest time at Moraine Lake. Book the earliest shuttle you can get, and bring warm layers: September mornings are often below freezing up here.") +
 card(8, "Parker Ridge", "Icefields Parkway, 9 km (5.6 mi) south of the Icefield Centre.", "Moderate",
      [rt(5.4), gain(250), ("Time", "About 3 h", "Parks Canada"), ("Best", "July to Sept", "Closed in spring")],
      "A short climb on switchbacks above the trees to a windy ridge with a view down onto the long tongue of the Saskatchewan Glacier.",
      "Very popular. Stay on the path: the alpine plants are fragile. Bring a warm layer; the ridge is exposed to wind.",
      "Want a longer day nearby? Nigel Pass starts 13 km (8 mi) south of the Icefield Centre: 8.9 mi (14.4 km) round trip with 1,200 ft (365 m) of climb, about 5 hours, through meadows to a pass."))

# 21 Icefield
page('<div class="kicker">Hikes · Columbia Icefield</div>' +
 card(9, "Wilcox Pass", "Icefields Parkway, by the Wilcox Creek Campground road, 3.1 km (1.9 mi) south of the Icefield Centre.", "Moderate",
      [rt(8), gain(390), ("Time", "2 to 3 h", "To the pass"), ("Best", "Late July to Sept", "Snow into July")],
      "One of the best views in the Rockies for the effort: a climb out of the trees to open meadows facing the Athabasca Glacier and the peaks of the Columbia Icefield. Bighorn sheep often graze up here.",
      "Short on time? The first viewpoint is just 1.5 mi (2.4 km) round trip, about an hour. The pass can stay snowy until late July.") +
 card(10, "Toe of the Athabasca Glacier", "Across from the Icefield Centre, at the end of the Toe of the Glacier road.", "Easy",
      [rt(1.8), gain(60), ("Time", "About 1 h", "Parks Canada"), ("Best", "June to Sept", "Cold wind")],
      "A short walk over bare rock left by the retreating glacier, with markers showing where the ice reached in past years, to a viewpoint near the glacier's edge.",
      "Do not walk onto the glacier. Parks Canada warns that the ice at the toe is hollow and collapsing, and hidden crevasses have killed people. Bring a jacket, gloves and a warm hat.",
      "Next door: the Forefield Trail, 2.2 mi (3.6 km) round trip with almost no climb, crosses the open ground in front of the glacier. On warm afternoons the meltwater streams can rise: be ready to turn back."))

# 22 Jasper
page('<div class="kicker">Hikes · Jasper</div>' +
 card(11, "Valley of the Five Lakes", "Icefields Parkway, 9 km (5.6 mi) south of Jasper town.", "Easy to moderate",
      [("Emerald Loop", mi(5.4), "5.4 km loop"), ("Wetland Way", mi(1.8), "1.8 km round trip"), ("Terrain", "Rolling", "Short steep hills"), ("Best", "June to Oct", "Reopened 2026")],
      "Five small lakes in shades of green and blue, linked by a rolling trail. Reopened in May 2026 after the wildfire, with new boardwalks, a stone staircase and a ridge reroute with new viewpoints. The forest is open and burned in places, with new growth coming back.",
      "The longer Valley Loop is 4.8 mi (7.7 km). The trail is shared with cyclists. Stay on the trail: the regrowing ground is fragile.") +
 card(12, "Mary Schäffer Loop and Moose Lake", "Maligne Lake, about 48 km (30 mi) from Jasper town on Maligne Road.", "Easy",
      [("Mary Schäffer", mi(3.2), "3.2 km loop"), ("Moose Lake", mi(2.7), "2.7 km loop"), ("Climb", "Flat to 195 ft", "0 · 59 m"), ("Best", "June to Sept", "Moose, quiet")],
      "Two gentle loops at the north end of Maligne Lake: lakeshore views toward the peaks, and a forest walk to a small lake where moose are sometimes seen.",
      "Dogs on leash allowed on both. Drive Maligne Road slowly: wildlife is common.",
      "Still closed after the 2024 fire (October 2026): Maligne Canyon, the Cavell day use area and Cavell Meadows trailhead, and Whistlers and Wabasso campgrounds. Old Fort Point near town is open: a 2.4 mi (3.8 km) loop with 425 ft (130 m) of climb. Check Jasper's \"What's open\" page."))

# 23 rainy day
page("""<div class="kicker">Plan B</div><h2>Rainy-day and rest-day ideas</h2>
<p class="lead">Rain, smoke or tired legs are part of every mountain trip. Keep one of these in your pocket.</p>
<div class="mini">
<div><h3>Banff Upper Hot Springs</h3><div class="s">Banff town</div><p>A warm pool with a mountain view, run by Parks Canada. Good on a cold or wet day. Roam Route 1 goes there.</p></div>
<div><h3>Cave and Basin</h3><div class="s">Banff town</div><p>The national historic site where Canada's national parks began, with exhibits and a short boardwalk.</p></div>
<div><h3>Visitor centres</h3><div class="s">Banff, Lake Louise, Jasper</div><p>Maps, exhibits, current trail reports and rangers to ask. Lake Louise has good displays on the geology of the Rockies.</p></div>
<div><h3>Museums in town</h3><div class="s">Banff and Jasper</div><p>Small museums on the history and art of the Rockies. Check opening hours before you go.</p></div>
<div><h3>Lake cruises and gondolas</h3><div class="s">When the cloud lifts</div><p>Lake Minnewanka and Maligne Lake boat tours, and gondolas in Banff and Jasper. All need tickets: check the weather first.</p></div>
<div><h3>Short, low walks</h3><div class="s">Under 2 mi</div><p>Fenland Trail and the Bow River in Banff, the Lake Louise shoreline, or Athabasca Falls. Easy to cut short.</p></div></div>
<div class="warn">Thunder nearby? Leave ridges and open shores, get into a hard-top car or a building and wait about 30 minutes after the last thunder.</div>
<div class="box"><h3 style="margin-top:0">A rest day is not a wasted day</h3><p style="margin:0">On a 5 or 7-day trip, one slow day keeps everyone happy for the big hikes. Do laundry, buy picnic food, and plan tomorrow with the weather forecast.</p></div>""")

# 24 packing
page("""<div class="kicker">Checklist</div><h2>Packing list for the Rockies</h2>
<div class="cl">
<div><h3>For every hike (the Ten Essentials)</h3>""" + chk(["Map, plus offline maps on your phone", "Headlamp with fresh batteries", "Sun protection: hat, sunglasses, sunscreen", "First aid kit, with blister care", "Knife or multi-tool", "Fire starter (emergencies only)", "Emergency shelter: a space blanket", "Extra food", "Extra water, plus a filter or tablets", "Extra layer: warm top and rain jacket"]) + """
<h3>For these parks</h3>""" + chk(["Bear spray (buy it locally)", "Park pass and passport", "Shuttle tickets (screenshot them)", "Traction devices outside midsummer"]) + """</div>
<div><h3>Layers for mountain weather</h3>""" + chk(["Wicking base layer (no cotton)", "Fleece or light puffy jacket", "Waterproof rain jacket with a hood", "Hiking pants, plus shorts for warm days", "Warm hat and light gloves, even in summer", "Broken-in hiking shoes with good grip", "Hiking socks, plus a dry spare pair"]) + """
<h3>For the car</h3>""" + chk(["Full fuel tank before the Parkway", "More water and snacks", "Phone charger and power bank", "This guide, printed or offline", "Small trash bag: pack out everything", "Dry clothes and shoes for after"]) + """</div></div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Dress like an onion</h3><p style="margin:0">A frosty start at the lake, a warm climb and a windy viewpoint are all normal on the same hike. Start a little cold, take a layer off before you sweat, and put one back on when you stop.</p></div>""")

# 25 budget
rows = [("Park pass", "Daily admission or Discovery Pass (page 5)"), ("Flights", ""), ("Rental car and fuel", "Check one-way and border fees"), ("Lodging and campsites", ""), ("Parks Canada shuttle", "Fares plus booking fee (page 7)"), ("Food and groceries", ""), ("Tours, cruises, gondolas", "Optional"), ("Gear and bear spray", ""), ("Souvenirs", ""), ("Extra for surprises", "About 10 percent")]
page('<div class="kicker">Money</div><h2>Trip budget</h2><p class="lead">Prices in the parks are in Canadian dollars. Write both, so you know what the trip really costs at home.</p>'
 + '<div class="f2"><div class="fl">Exchange rate used: 1 CAD =</div><div class="fl">Number of people</div></div>'
 + '<table class="bud" style="margin-top:6pt"><tr><th>Item</th><th>Notes</th><th style="text-align:right">CAD</th><th style="text-align:right">USD</th></tr>'
 + "".join(f'<tr><td class="c">{a}</td><td class="small">{b}</td><td class="a"></td><td class="a"></td></tr>' for a, b in rows)
 + '<tr class="tot"><td>Total</td><td></td><td class="a"></td><td class="a"></td></tr></table>'
 + '<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Ways to spend less</h3><p style="margin:0">Youth 17 and under get in free. One family pass covers up to seven people in one car. Rooms in Canmore are often cheaper than in Banff. Picnic lunches from a grocery store in town cost far less than restaurant meals at the lakes.</p></div>')

# 26 day-by-day planner
def dayp():
    return '<div class="dayp"><div class="f2"><div class="fl">Day and date</div><div class="fl">Sleeping in</div><div class="fl">Main hike or drive</div><div class="fl">Start by</div><div class="fl">Shuttle window / last bus</div><div class="fl">Backup plan</div></div></div>'
page('<div class="kicker">Planner</div><h2>Day-by-day planner</h2><p style="margin-bottom:6pt">One box a day. Fill it in pencil: Rockies weather changes plans.</p>' + "".join(dayp() for _ in range(5)))

# 27 bookings log
page('<div class="kicker">Planner</div><h2>Bookings and confirmations</h2><p style="margin-bottom:4pt">Keep every confirmation number in one place. Screenshot them too: there is no signal at many trailheads.</p>'
 + '<table class="spots"><tr><th style="width:1.5in">Booking</th><th>Date and time</th><th>Confirmation no.</th><th style="text-align:center">Paid</th></tr>'
 + "".join(f'<tr><td style="height:33pt"><b>{a}</b></td><td></td><td></td><td class="b"></td></tr>' for a in ["Flights", "Rental car", "Lodging 1", "Lodging 2", "Lodging 3", "Campsite", "Park pass", "Shuttle day 1", "Shuttle day 2", "Roam bus", "Tour or cruise", "Other"])
 + '</table><div class="lab" style="margin-top:8pt">Left with someone at home</div><div class="f2"><div class="fl">Name and phone</div><div class="fl">Car and plate</div><div class="fl">Trailheads we plan to use</div><div class="fl">Call for help if no word by</div></div>')

# 28 safety + LNT + sources
page("""<div class="kicker">Before every hike</div><h2>Safety, Leave No Trace and official sources</h2>
<div class="diff">
<div><div class="tag">Safety</div><h3>Every hike</h3><ul class="check"><li>Tell someone your plan and when you will be back</li><li>Set a turnaround time and keep it</li><li>Check trail conditions, closures and warnings</li><li>Emergency: call 911. Signal is patchy, so do not rely on it</li><li>Go back if the group or the weather says so</li></ul></div>
<div><div class="tag">Leave No Trace</div><h3>Every visit</h3><ul class="check"><li>Stay on the trail, even when muddy</li><li>Pack out all trash, peels and tissues</li><li>Never feed any animal</li><li>Leave rocks, flowers and antlers where they are</li><li>No drones in national parks without a permit</li></ul></div></div>
<h3>Official sources</h3>
<div class="mini">
<div><h3>Banff National Park</h3><div class="s">parks.canada.ca/banff</div><p>Bulletins, trail conditions, closures, fees, the Lake Louise shuttle.</p></div>
<div><h3>Jasper National Park</h3><div class="s">parks.canada.ca/jasper</div><p>"What's open" after the wildfire, trail conditions, bulletins.</p></div>
<div><h3>Reservations</h3><div class="s">reservation.pc.gc.ca</div><p>Campgrounds and the Lake Louise and Moraine Lake shuttle.</p></div>
<div><h3>Roads</h3><div class="s">511.alberta.ca</div><p>Icefields Parkway and highway conditions and closures.</p></div>
<div><h3>Weather</h3><div class="s">weather.gc.ca</div><p>Forecasts and warnings, plus air quality.</p></div>
<div><h3>Border</h3><div class="s">cbsa-asfc.gc.ca</div><p>What to bring to cross into Canada and what you may carry.</p></div></div>
<p class="small">Facts in this guide were checked against parks.canada.ca in November 2026. The official sources always win.</p>""")

# 29 notes
page('<div class="kicker">Notes</div><h2>Trip notes</h2><div class="notes"><div class="lab">Places we want to see</div>' + lines(6) + '<div class="lab">Best moments</div>' + lines(8) + '<div class="lab">Next time</div>' + lines(6) + '</div>')

# 30 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 95 L40 60 L60 75 L100 18 L120 40 L140 28 L200 90" stroke="#F5F1EA" stroke-width="4"/><path d="M100 18 L90 34 L100 30 L108 38 L114 33" stroke="#F5F1EA" stroke-width="3"/></svg>
<h2 style="margin-top:22pt">Enjoy the Canadian Rockies</h2>
<p>Thank you for choosing a HikeSupply guide. Book the shuttle early, start every hike early, carry bear spray, and give the wildlife plenty of room.</p>
<p style="margin-top:10pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">Plan your next adventure</p>
<div class="bkcards" style="grid-template-columns:1fr 1fr 1fr;width:6.4in"><div><b>US National Parks Hiking Tracker</b><span>Log every park you visit, all 64 plus Canada</span></div><div><b>Trail Ready</b><span>8-week beginner hiking training plan</span></div><div><b>Park trip guides</b><span>Yellowstone, Grand Canyon, Rocky Mountain, Smokies, Utah's Mighty 5</span></div></div>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">General trip planning information only. Fees, shuttles, closures and rules change: always check parks.canada.ca and ask at a visitor centre before you hike. Hike within your ability and turn back when in doubt. Not affiliated with Parks Canada. For personal use only. COVERCREDIT</p>""", "back")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip() if os.path.exists(os.path.join(HERE, "cover-credit.txt")) else ""
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
