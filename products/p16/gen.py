"""Generates index.html for p16 (Glacier National Park — Trip Planning Guide). Run: python3 gen.py
Same look as p11/p15 (base.css + extra.css). Facts checked on November 6, 2026 against nps.gov/glac:
vehicle-reservations2026, visiting-loganpass-2026, shuttle-service-2026, 2026 summer operations release,
GTSR 2026 opening release, gtsrinfo, fees, directions, bears, safety, hiking pages for Lake McDonald,
St. Mary, Many Glacier and Two Medicine (NPS lists one-way miles; we doubled them for round trips),
Highline Trailhead page."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Glacier National Park"
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
.tt td{font-size:9.3pt;padding:3.8pt 5pt}
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
.stops>div{display:grid;grid-template-columns:1.7in 1fr;gap:12pt;padding:5pt 0;border-bottom:0.6pt solid var(--line)}
.stops b{font:600 11.5pt/1.25 var(--serif);color:var(--forest)}
.stops b small{display:block;font:700 7pt/1.4 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay)}
.stops p{margin:0;font-size:9.8pt;line-height:1.4}
.months td{font-size:9.6pt;padding:5pt 6pt;line-height:1.38}
.months td:first-child{font:600 11pt/1.2 var(--serif);color:var(--forest);width:0.95in;white-space:nowrap}
.spots td{font-size:10pt;padding:6pt 6pt}
.spots td.b{width:0.7in;text-align:center}
.spots td.b::before{content:"";display:inline-block;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.plan .d{grid-template-columns:0.85in 1fr}
.gmap{margin:6pt 0 2pt;background:#fff;border:1pt solid var(--line);border-radius:10pt;padding:6pt 8pt}
.gmap svg text{font-family:var(--sans)}
.dayp{border:1pt solid var(--line);border-radius:9pt;background:#fff;padding:9pt 13pt;margin-bottom:9pt}
.dayp .f2 .fl{height:31pt}
.notes .wl{height:27pt}
.bud td{height:33pt}
.dep td{font-size:9.6pt;padding:4.5pt 6pt}
html.bw .now{border-color:#444}
html.bw .tt tr.grp td{background:#fff}
html.bw .gmap svg .fillc{fill:#fff !important}
html.bw .gmap svg .lk{fill:#ccc !important}
"""

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 230 L55 180 L90 200 L150 90 L175 120 L205 60 L240 110 L270 85 L330 170 L375 140 L470 225" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M205 60 L192 84 L206 80 L216 92 L228 78 L240 110" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M120 285 C180 262 300 262 360 285 C300 306 180 306 120 285 Z" stroke="#F5F1EA" stroke-width="3"/>
<path d="M40 300 L40 262 M28 270 L40 250 L52 270 M28 284 L40 262 L52 284 M430 300 L430 258 M416 268 L430 246 L444 268 M416 284 L430 260 L444 284" stroke="#F5F1EA" stroke-width="2.5"/>
<circle cx="390" cy="60" r="20" stroke="#F5F1EA" stroke-width="3"/>
</svg></div>
<div><h1>Glacier National Park</h1><p class="sub">A trip planning guide for first-time visitors. Going-to-the-Sun Road, the 2026 Logan Pass shuttle and parking rules made simple, when to go, 2, 3 and 5-day plans, 12 day hikes from easy lakeside walks to the Highline, and how to hike safely in grizzly country.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>12 day hikes</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">Glacier is big, wild and steep, with one famous road across the middle and grizzly bears on the trails. Most of the planning comes down to three questions: is the road open, how will you reach the trailhead, and where will you sleep.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["The park areas at a glance, with drive times", "When to go, month by month", "Entry, passes and what changed in 2026", "Logan Pass: the shuttle ticket and the 3-hour limit", "What to book, and when", "Bears, wildlife, snow and cold water", "Going-to-the-Sun Road, stop by stop", "Sample 2, 3 and 5-day plans", "12 day hikes on both sides of the park", "Packing list, budget and planners"]) + f"""</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers. Every hike here is a day hike on a marked trail, from a flat boardwalk loop to a full day on the Highline.</p>
<h3>How to read the hikes</h3><p>The park lists trail distances one way. We doubled them, so the distances here are round trip, in miles and kilometers. Climbs are the elevation gain the National Park Service gives, in feet and meters.</p></div></div>
<div class="box forest"><h3>Checked against nps.gov in {CHECKED}</h3><p style="margin:0">Glacier changed its access rules for 2026, and it may change them again for 2027. Road openings, shuttles, fees and closures change every year, and snow or bears can close trails at short notice. Before you go, check the official pages on page 28 and ask a ranger when you arrive.</p></div>
<h3>Print it or keep it offline</h3>
<p>Cell service is poor or missing in most of the park. Save this PDF to your phone before you leave home, or print the pages you need. Pages 25 to 27 and 29 are made for printing.</p>""")

# 3 at a glance with diagram
svg = """<svg width="100%" height="262" viewBox="0 0 660 250" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path d="M20 26 L640 26" stroke="#A0573A" stroke-width="1.5" stroke-dasharray="6 4"/>
<text x="24" y="18" font-size="9" fill="#A0573A" font-weight="700" letter-spacing="1">CANADA (Waterton Lakes National Park)</text>
<text x="636" y="18" font-size="9" fill="#A0573A" font-weight="700" letter-spacing="1" text-anchor="end">USA</text>
<path d="M60 40 L470 40 L520 120 L500 205 L300 222 L130 222 L70 160 Z" fill="#EEF1EA" class="lk" stroke="none"/>
<path d="M330 44 L318 110 L300 170 L310 214" stroke="#A0573A" stroke-width="1.4" stroke-dasharray="3 4"/>
<text x="296" y="200" font-size="8" fill="#A0573A" font-weight="700" text-anchor="end">Continental Divide</text>
<ellipse cx="170" cy="168" rx="52" ry="12" transform="rotate(-32 170 168)" fill="#BFD3DA" class="lk"/>
<ellipse cx="415" cy="128" rx="40" ry="8" transform="rotate(-8 415 128)" fill="#BFD3DA" class="lk"/>
<path d="M120 212 C150 185 190 150 240 135 C280 122 300 112 318 110 C350 108 380 120 470 128" stroke="#2F4A3A" stroke-width="5"/>
<path d="M120 212 C200 232 300 238 470 228" stroke="#6B7F6F" stroke-width="3"/>
<path d="M470 228 L486 128 L488 70 L520 34" stroke="#6B7F6F" stroke-width="3"/>
<path d="M488 72 L432 62" stroke="#6B7F6F" stroke-width="2.5"/>
<path d="M470 228 L440 206" stroke="#6B7F6F" stroke-width="2.5"/>
<path d="M120 212 L92 60" stroke="#6B7F6F" stroke-width="2.5" stroke-dasharray="5 4"/>
<g font-size="10.5" fill="#2F4A3A" font-weight="700">
<circle cx="120" cy="212" r="6" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="2.5"/><text x="20" y="238">WEST GLACIER, APGAR</text>
<circle cx="208" cy="148" r="5" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="2.5"/><text x="128" y="128">Lake McDonald</text>
<circle cx="248" cy="133" r="5" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="2.5"/><text x="222" y="156">Avalanche</text>
<circle cx="318" cy="110" r="7" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="3"/><text x="300" y="98">LOGAN PASS</text>
<circle cx="470" cy="128" r="6" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="2.5"/><text x="500" y="140">ST. MARY</text>
<circle cx="432" cy="62" r="6" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="2.5"/><text x="422" y="66" text-anchor="end">MANY GLACIER</text>
<circle cx="440" cy="206" r="6" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="2.5"/><text x="428" y="194" text-anchor="end">TWO MEDICINE</text>
<circle cx="92" cy="60" r="5" class="fillc" fill="#F5F1EA" stroke="#2F4A3A" stroke-width="2.5"/><text x="102" y="64">NORTH FORK, POLEBRIDGE</text>
</g>
<g font-size="9" fill="#6B6B66" font-weight="600">
<text x="392" y="150">St. Mary Lake</text>
<text x="482" y="242">East Glacier Park</text>
<text x="300" y="246">US 2 (open all year)</text>
<text x="496" y="88">Babb</text>
<text x="528" y="44">to Chief Mountain border</text>
<text x="342" y="104" transform="rotate(4 342 104)">Going-to-the-Sun Road</text>
</g></svg>"""
page(f"""<div class="kicker">The park</div><h2>At a glance</h2>
<p class="lead">The Continental Divide runs through the middle of the park. The west side, around Lake McDonald, is lower, greener and forested. The east side, from St. Mary to Many Glacier and Two Medicine, is higher, windier and more open.</p>
<div class="gmap">{svg}</div>
<p class="small" style="margin:0 0 4pt">Our simple diagram, not to scale. Use the NPS park map for driving.</p>
<table><tr><th>Route (NPS estimates)</th><th>Distance</th><th>Time</th></tr>
<tr><td>West Glacier to St. Mary on Going-to-the-Sun Road</td><td>50 mi / 80 km</td><td>about 2 h</td></tr>
<tr><td>West Glacier to St. Mary on US 2 and Hwy 89</td><td>90 mi / 145 km</td><td>about 2 h</td></tr>
<tr><td>West Glacier to Many Glacier</td><td>70 mi / 113 km</td><td>about 2.5 h</td></tr>
<tr><td>West Glacier to East Glacier Park</td><td>56 mi / 90 km</td><td>about 1 h</td></tr>
<tr><td>St. Mary to Many Glacier</td><td>20 mi / 32 km</td><td>about 40 min</td></tr>
<tr><td>St. Mary to Two Medicine</td><td>34 mi / 55 km</td><td>about 1 h</td></tr>
<tr><td>West Glacier to Polebridge (North Fork)</td><td>28 mi / 45 km</td><td>about 1 h</td></tr></table>
<div class="box forest"><h3>Three things that surprise first-timers</h3><p style="margin:0">There is no gas station anywhere inside the park. The high part of Going-to-the-Sun Road is only open for a few months each summer (page 4). And each area of the east side is its own dead-end valley, so "nearby" on the map can mean an hour in the car.</p></div>""")

# 4 when to go
months = [
 ("Jan to Mar", "Winter. The lower parts of Going-to-the-Sun Road stay open, so you can reach Lake McDonald. Snowshoeing and skiing, very few services."),
 ("April, May", "Crews plow Going-to-the-Sun Road from early April. Low trails are muddy, high trails deep in snow. Snowstorms and avalanches are still common in May."),
 ("June", "The alpine section usually opens between mid-June and early July (in 2026 the whole road was open on June 22). Waterfalls are full, snow still covers high trails."),
 ("July", "The busiest month. Wildflowers start, snow melts off the high trails, and in 2026 the Logan Pass shuttle and 3-hour limit started on July 1."),
 ("August", "Warm days, the most trails open, busy trailheads. Wildfire smoke is possible: check air quality before a big hike."),
 ("September", "Quieter after Labor Day. In 2026 the shuttle and parking limit ended September 7. Cold mornings, first snow up high possible."),
 ("October", "The whole road is usually open until the third Monday of October, weather allowing. Gold larches on the west side, many services closed."),
 ("Nov, Dec", "Winter returns. Lower roads only. Winter entrance rates apply from November 1 to April 30 (page 5)."),
]
page('<div class="kicker">Timing</div><h2>When to go: month by month</h2><p class="lead">For a first hiking trip, mid-July to mid-September gives you the whole road and the most snow-free trails. No one can predict the exact opening date of the high road: it depends on the winter\'s snow.</p>'
 + '<table class="months">' + "".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in months) + '</table>'
 + '<div class="box"><h3 style="margin-top:0">Booking a trip for late June?</h3><p style="margin:0">Keep it flexible. If the alpine section is not open yet, you can still enjoy Lake McDonald, Avalanche Lake, Many Glacier, Two Medicine and the St. Mary side by driving around on US 2. The plans on pages 12 to 15 include swaps.</p></div>'
 + '<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr><tr><td>The whole road and most trails open</td><td>Mid-July to mid-September</td></tr><tr><td>Wildflowers and full waterfalls</td><td>July</td></tr><tr><td>Fewer people</td><td>After Labor Day, or early mornings any time</td></tr><tr><td>Quiet snowy forest, no crowds</td><td>December to March (lower park only)</td></tr></table>')

# 5 entry and passes
page("""<div class="kicker">Entry</div><h2>Entry, passes and what changed in 2026</h2>
<p class="lead">For 2026, Glacier dropped the vehicle reservations it used in earlier summers. You only need a park pass to drive in. The catch: when an area gets too full, cars can be turned away for a while.</p>
<div class="now"><h3>In 2026</h3><p>No vehicle reservations anywhere: not for Going-to-the-Sun Road, Many Glacier, Two Medicine or the North Fork. When an area reaches capacity, rangers may temporarily divert cars. People with a booking in that area (lodging, camping, boat tour, horseback ride, guided hike) or a backcountry permit can still get in, though there may be a wait.</p></div>
<h3>Entrance fees (2026)</h3>
<table class="fee"><tr><th>Pass (7 days)</th><th>Summer</th><th>Winter (Nov 1 to Apr 30)</th></tr>
<tr><td>Private vehicle, everyone in it</td><td>$35</td><td>$25</td></tr>
<tr><td>Motorcycle (up to 2 bikes, 4 people)</td><td>$30</td><td>$20</td></tr>
<tr><td>Per person, on foot or bike (16+)</td><td>$20</td><td>$15</td></tr></table>
<table class="fee"><tr><th>Annual passes</th><th>Price</th><th>Covers</th></tr>
<tr><td>Glacier annual pass</td><td>$70</td><td>This park, one year. US citizens and residents</td></tr>
<tr><td>America the Beautiful</td><td>$80 / $250</td><td>All national parks, one year. US residents / non-residents</td></tr>
<tr><td>Non-resident fee</td><td>$100 each</td><td>Visitors 16+ from outside the US, on top of the entrance fee, unless you hold an annual pass</td></tr></table>
<p class="small">The park is cashless: cards only. Children under 16 do not need a pass. Seniors, current military, veterans and people with a permanent disability may qualify for special passes. Visiting from Canada? You count as a non-resident. Check nps.gov/glac/planyourvisit/fees.htm before you go.</p>
<div class="box forest"><h3>Planning a 2027 trip?</h3><p style="margin:0">The park tests new systems each summer and announces the rules in winter or spring. Do not assume 2027 will work like 2026. Check nps.gov/glac and search "vehicle reservations" and "Logan Pass" before you book anything else.</p></div>""")

# 6 Logan Pass
page("""<div class="kicker">Logan Pass</div><h2>Logan Pass: shuttle ticket or 3 hours</h2>
<p class="lead">Logan Pass, at 6,646 ft (2,026 m), is the top of Going-to-the-Sun Road and the start of the Hidden Lake and Highline trails. In summer 2026 there were two ways to get there.</p>
<div class="permit">
<div><small>Option 1</small><h3>Drive and park</h3><div class="hrs">3 hours</div><div class="hl">July 1 to September 7, 2026</div><p>Take a free timestamped permit from the kiosk and put it on your dashboard. The limit applied 24 hours a day. Enough for the visitor center and Hidden Lake Overlook. The lot usually fills by sunrise.</p></div>
<div class="plus"><small>Option 2</small><h3>Shuttle ticket</h3><div class="hrs">All day</div><div class="hl">Needed for the Highline</div><p>A ticketed shuttle from the west or east side. Required for longer hikes from Logan Pass, such as the Highline to Granite Park Chalet or to The Loop. $1 processing fee per ticket.</p></div></div>
<h3>How the 2026 shuttle worked</h3>
<table class="dep"><tr><th>Boarding</th><th>Morning departures to Logan Pass</th></tr>
<tr><td><b>Apgar Visitor Center</b> (west)</td><td>6, 7, 9 and 10 am. Express: stops only at The Loop and Logan Pass</td></tr>
<tr><td><b>Lake McDonald Lodge</b> (west)</td><td>7 and 9 am</td></tr>
<tr><td><b>St. Mary Visitor Center</b> (east)</td><td>Every hour, 6 to 11 am</td></tr>
<tr><td><b>Rising Sun Picnic Area</b> (east)</td><td>Every hour, 6 to 11 am</td></tr></table>
<div class="bk">
<div><b>Booking</b><p>Recreation.gov or 877-444-6777, not in the park. Everyone 2 and older needs a ticket, for one day, one boarding place and one time. Photo ID may be asked for.</p></div>
<div><b>Release</b><p>Some tickets 60 days ahead (8 am Mountain Time, rolling, from May 2), the rest at 7 pm Mountain Time the evening before (from June 30).</p></div>
<div><b>Coming back</b><p>Shuttles left Logan Pass about every 60 to 90 minutes. Last bus: 7:30 pm west, 8 pm east. Miss it and there is no other ride.</p></div></div>
<div class="warn"><b>Not on the shuttle in 2026:</b> Avalanche Lake and Trail of the Cedars. Drive there early. Pets are not allowed on the shuttle, and bear spray must be secured.</div>""")

# 7 what to book
page("""<div class="kicker">Planning</div><h2>What to book, and when</h2>
<p class="lead">Rooms near Glacier are few for the number of visitors, and the summer season is short. Book the bed first, then build the days around it.</p>
<div class="bk">
<div><b>Lodging in the park</b><p>Historic lodges and motor inns at Lake McDonald, Apgar, Many Glacier, Rising Sun and Swiftcurrent, run by park concessioners. Most open only in summer and book up many months ahead. Two hike-in chalets, Granite Park and Sperry, need a reservation and a long walk.</p></div>
<div><b>Gateway towns</b><p>West side: West Glacier, Columbia Falls, Whitefish and Kalispell. East side: St. Mary, Babb and East Glacier Park. Split your nights, west then east, to save hours of driving.</p></div>
<div><b>Campgrounds</b><p>Several park campgrounds take reservations on Recreation.gov, and some are first-come, first-served. Check the camping pages on nps.gov/glac for which, when they open, and how far ahead you can book.</p></div>
<div><b>Boat tours</b><p>Concession boats run on Lake McDonald, St. Mary Lake (from Rising Sun), Swiftcurrent Lake and Lake Josephine (Many Glacier) and Two Medicine Lake. Fees apply. Some boats shorten hikes a lot (pages 18 to 21). The park says reservations are highly recommended.</p></div>
<div><b>Logan Pass shuttle</b><p>Recreation.gov, 60 days ahead or the night before (page 6). Set a phone alarm.</p></div>
<div><b>Getting there</b><p>Glacier Park International Airport near Kalispell is about 30 mi (48 km) from the West Entrance. Amtrak's Empire Builder stops at West Glacier all year and at East Glacier Park in season.</p></div></div>
<div class="box"><h3 style="margin-top:0">Rule of thumb</h3><p style="margin:0">Lodging or campsite first, rental car second, boat tours third, shuttle tickets last. A booking in Many Glacier or Two Medicine also lets you in when that area is full (page 8).</p></div>""")

# 8 Many Glacier, Two Medicine, North Fork
page("""<div class="kicker">The east valleys</div><h2>Many Glacier, Two Medicine and the North Fork</h2>
<p class="lead">These quieter corners hold some of the best hikes in the park. Each one is reached by a single road, and each can fill up. Arrive early and keep a Plan B.</p>
<div class="mini">
<div><h3>Many Glacier</h3><div class="s">20 mi from St. Mary</div><p>Lakes ringed by cliffs, moose, bighorn sheep and grizzlies on the slopes. Grinnell Lake, Redrock Falls, Iceberg Lake and Apikuni Falls start here (pages 19 and 20).</p></div>
<div><h3>Two Medicine</h3><div class="s">Southeast corner</div><p>A calm lake under tall peaks, with short waterfall walks and a boat. In 2026 the North Shore Trailhead was closed by campground construction (page 21).</p></div>
<div><h3>North Fork</h3><div class="s">Northwest corner</div><p>Remote and rustic. Long gravel roads, the small community of Polebridge, Bowman and Kintla lakes. No services in the park there: come with a full tank and food.</p></div>
<div><h3>St. Mary</h3><div class="s">East end of the road</div><p>The east gate of Going-to-the-Sun Road, with a visitor center, lodging and the waterfall hikes on page 18.</p></div></div>
<div class="dist"><div class="a"><div class="n">Before 8 am</div><div class="u">arrive at the valley you want</div><p>Early arrivals usually beat the crowds and the diversions.</p></div><div class="b"><div class="n">After 3 pm</div><div class="u">second chance</div><p>Day visitors start leaving and evening light is best for wildlife.</p></div></div>
<h3>If you are turned away</h3>""" + chk(["Ask the ranger roughly how long the wait may be", "Drive to the next area on your list and come back later", "Many Glacier full? Try Two Medicine, or St. Mary and the falls on page 18", "Use the time for a scenic drive or a visitor center", "Never park along the road outside marked spots"]) + """
<p class="small">Bookings in the area (lodging, camping, boat tour, guided hike, horseback ride) and backcountry permits still got people in during 2026 diversions.</p>""")

# 9 bears and wildlife
page("""<div class="kicker">Safety</div><h2>Bears and wildlife</h2>
<p class="lead">Glacier is home to both grizzly bears and black bears, plus moose, mountain goats and bighorn sheep. Seeing them is a highlight. A few simple habits keep you and the animals safe.</p>
<div class="dist"><div class="a"><div class="n">100 yards</div><div class="u">91 m from bears and wolves</div><p>Approaching closer on purpose is against park rules.</p></div><div class="b"><div class="n">25 yards</div><div class="u">23 m from all other wildlife</div><p>Goats, sheep, deer, elk and moose included.</p></div></div>
<div class="diff">
<div><div class="tag">On the trail</div><h3>Every hike</h3><ul class="check"><li>Carry bear spray where you can grab it fast, and know how to use it</li><li>Talk, call out or clap often, so bears hear you coming</li><li>Hike in a group: the park reports no attacks on groups of four or more</li><li>Do not run on trails</li><li>Extra care near streams, thick brush, berry patches and at dawn and dusk</li></ul></div>
<div><div class="tag">If you meet a bear</div><h3>Stay calm</h3><ul class="check"><li>Moving toward you on the trail? Step aside and let it pass</li><li>Calm bear: back away slowly, talking quietly</li><li>Never run. Get your spray ready</li><li>Defensive charge and no spray? Lie on your stomach, hands behind your neck, pack on</li><li>If an attack goes on, fight back</li></ul></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Food and scented items</h3><p>Never leave food, trash or scented things alone, even in your pack for a minute. At camp, keep them in a car or a food locker, day and night.</p></div>
<div><h3>Good to know</h3><p>Bear bells are not considered effective: use your voice. Size and color do not tell you the species. Report every bear you see to a ranger. Taking bear spray into Canada? Only EPA-approved canisters are allowed.</p></div></div>
<p class="small">Summary of the park's bear safety page. Read the full page on nps.gov/glac and watch the park's bear spray video before your trip.</p>""")

# 10 weather, snow, water
page("""<div class="kicker">Safety</div><h2>Weather, snow and cold water</h2>
<p class="lead">Glacier's weather changes fast, and the high country keeps its snow long into summer. The park also warns that its lakes and streams stay cold all year.</p>
<div class="layers">
<div><div class="num">1</div><h3>Snow into July</h3><p>High trails can stay snowy well after the road opens. Popular routes like the Highline may stay closed for hazardous snow.</p><div class="eg">Check the park's trail status page the night before.</div></div>
<div><div class="num">2</div><h3>Steep snowfields</h3><p>Snow can hide holes and running water underneath. Do not cross steep snow without the skills and gear for it: turn around.</p><div class="eg">Never walk on snow above a drop or a lake.</div></div>
<div><div class="num">3</div><h3>Fast weather</h3><p>Mountain weather can be very different from the valley towns. Start early, and turn back if it gets cold fast or storms build.</p><div class="eg">Get off open ridges when thunder starts.</div></div></div>
<div class="cols">
<div><h3>Cold, fast water</h3>""" + chk(["Stay back from streams and waterfalls: rocks by the water are slippery", "Do not wade or swim in swift water", "Wear a life jacket in boats and kayaks", "Cold water can take your breath away in seconds", "Watch children closely near water and edges"]) + """</div>
<div><h3>Stay warm and dry</h3>""" + chk(["Rain jacket and a warm layer on every hike", "No cotton: it stays wet and cold", "Hypothermia can happen above freezing", "Hat and gloves, even in July, on the east side", "Treat stream water: boil it 1 minute or use a filter"]) + """</div></div>
<div class="em"><h3>Stay on the trail</h3><p>Falls are a real risk off the trail and past fences and railings, often while someone is getting a photo. Stay on marked paths, stay behind barriers, and keep children close at overlooks and on the Highline ledge.</p></div>""")

# 11 Going-to-the-Sun Road
stops = [("Apgar and Lake McDonald", "West end", "Visitor center, the village, and the colored stones at the lake's edge. Lake McDonald Lodge farther along."),
 ("Trail of the Cedars", "Avalanche Creek", "A flat boardwalk through giant cedars and the start of the Avalanche Lake hike (page 16)."),
 ("The Loop", "Hairpin bend", "The big switchback where the Highline ends. A trailhead and viewpoint."),
 ("Bird Woman Falls and Weeping Wall", "On the climb", "A tall waterfall across the valley, then a rock wall that drips onto the road in early summer."),
 ("Logan Pass", "6,646 ft / 2,026 m", "Visitor center, Hidden Lake and the Highline. Mountain goats and bighorn sheep are often seen. The lot fills by sunrise."),
 ("Jackson Glacier Overlook", "East side", "The best view of a glacier from the road."),
 ("Sunrift Gorge and Sun Point", "St. Mary Lake", "Short walks to a narrow gorge, Baring Falls and a rocky point over the lake (page 18)."),
 ("Wild Goose Island and Rising Sun", "St. Mary Lake", "The classic view of a tiny island in the lake. Picnic area, boat dock and shuttle stop at Rising Sun."),
 ("St. Mary", "East end", "Visitor center at the east entrance.")]
page('<div class="kicker">Scenic drive</div><h2>Going-to-the-Sun Road, stop by stop</h2>'
 + '<p class="lead">About 50 mi (80 km) from West Glacier to St. Mary. Two hours without stops, a full day with them. Logan Pass is 32 mi (51 km) from the west entrance and 18 mi (29 km) from the east.</p>'
 + '<div class="stops">' + "".join(f"<div><b>{a}<small>{s}</small></b><p>{b}</p></div>" for a, s, b in stops) + '</div>'
 + '''<div class="cols" style="margin-top:7pt">
<div><h3>Vehicle limits</h3><p>Vehicles over 21 ft (6.4 m) long or 8 ft (2.4 m) wide, including bumpers and mirrors, may not drive between Avalanche Creek and Rising Sun. Over 10 ft (3 m) tall may have trouble west of Logan Pass. Speed limit 25 mph in the alpine section.</p></div>
<div><h3>Good to know</h3><p>No gas in the park: fill up before. An EV charger is across from the Lake McDonald Lodge camp store. Bikes are banned on parts of the road on summer afternoons: check the dates. Text GNPROADS to 333111 for road updates.</p></div></div>''')

# 12-15 plans
def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"
page('<div class="kicker">Sample plans</div><h2>2 days: the west side and the pass</h2>' +
 plan("Day 1: cedars and a mountain lake", "Sleep on the west side", [
  ("Before 8", "Drive to Avalanche Creek early: parking is limited and the shuttle does not stop there. Walk Trail of the Cedars (hike 1)."),
  ("Morning", "Continue to Avalanche Lake (hike 2). Picnic on the shore under the waterfalls."),
  ("Afternoon", "Lake McDonald Lodge and the shore at Apgar. Visit the Apgar Visitor Center for maps and the trail report."),
  ("Evening", "Sunset over Lake McDonald. Early night.")]) +
 plan("Day 2: over the top", "Drive across, sleep on the east side", [
  ("Sunrise", "Drive up Going-to-the-Sun Road (page 11). Park at Logan Pass early, or ride the shuttle."),
  ("Morning", "Hidden Lake Overlook (hike 3). With a 3-hour permit, be back at the car in time."),
  ("Midday", "Jackson Glacier Overlook, then St. Mary and Virginia Falls (hike 5)."),
  ("Late day", "Sunrift Gorge and Baring Falls (hike 6), Wild Goose Island, then St. Mary.")]) +
 '<div class="box forest"><h3>Road not open yet?</h3><p style="margin:0">Before the alpine section opens, do day 1 as planned, then drive around on US 2 to Two Medicine (hikes 11 and 12) or Many Glacier (hikes 7 and 8) for day 2.</p></div>'
 + '<h3>Rules of thumb</h3>' + chk(["One main hike a day, started early", "Check road and trail status every morning", "Bear spray on every hike, even short ones", "Fill the gas tank before you enter the park", "Keep a rainy-day backup (page 23)"]))

page('<div class="kicker">Sample plans</div><h2>3 days: add Many Glacier</h2>' +
 plan("West, the pass, the east", "2 nights west, 1 east", [
  ("Day 1", "Arrive at West Glacier. Apgar, Lake McDonald, and Trail of the Cedars in the evening light (hike 1)."),
  ("Day 2", "Early start for Avalanche Lake (hike 2). Then drive the road east with stops (page 11) and Hidden Lake Overlook (hike 3). Sleep in St. Mary or Many Glacier."),
  ("Day 3", "Many Glacier before 8 am. Grinnell Lake with the boats (hike 7), or Redrock Falls (hike 8). Watch the slopes for bears and sheep, from a distance. Drive out on Hwy 89 and US 2.")]) +
 '''<div class="box forest"><h3>Make it your own</h3><p style="margin:0">Strong hikers can swap Hidden Lake for the Highline with a shuttle ticket (hike 4). Traveling with small children? Swap Grinnell Lake for the Swiftcurrent Nature Trail and Running Eagle Falls (hike 11).</p></div>
<h3>Booking order for this plan</h3>''' + chk(["Rooms for 2 nights west and 1 night east, as early as you can", "Rental car, and fill the tank before you enter", "Many Glacier boat tickets if you want the Grinnell Lake shortcut", "Logan Pass shuttle tickets if you plan the Highline", "Park pass: one 7-day vehicle pass covers all 3 days"])
 + '<div class="box"><h3 style="margin-top:0">Pace yourself</h3><p style="margin:0">Glacier days are long in summer, with light until late evening. That is a gift, not a goal: keep one afternoon free and do not try to see every area in one trip.</p></div>')

page('<div class="kicker">Sample plans</div><h2>5 days: both sides of the park, part 1</h2>' +
 plan("Days 1 to 3: the west side and the pass", "3 nights on the west side", [
  ("Day 1", "Arrive. Rocky Point by Lake McDonald or the Apgar bike path, ice cream in Apgar Village, sunset at the lake."),
  ("Day 2", "Avalanche Lake early (hikes 1 and 2). Afternoon boat tour on Lake McDonald or a lazy lakeside picnic."),
  ("Day 3", "Logan Pass with a shuttle ticket from Apgar. Hidden Lake Overlook first (hike 3), then the Highline as far as your turnaround time allows (hike 4). Shuttle back.")]) +
 '''<h3>Why a shuttle ticket on day 3</h3><p>In 2026 a car at Logan Pass could only stay 3 hours, which is too short for the Highline. With a ticket you can leave the car at Apgar and spend the whole day up high. Check the shuttle times for your year and the last bus back.</p>
<div class="cols"><div><h3>Keep in your pocket</h3>''' + chk(["Shuttle ticket screenshot", "Turnaround time written down", "Bear spray on your hip belt", "Extra layer and rain jacket", "Snacks and 2 liters of water"]) + '''</div>
<div><h3>Rainy day swap</h3><p>Low cloud at Logan Pass hides everything. Swap day 3 with day 2 and walk in the forest, or see page 23 for indoor ideas.</p></div></div>
<div class="em"><h3>Set your Highline turnaround</h3><p>Before you start, work out when you must be back at Logan Pass for your shuttle, and turn around at the halfway point of the time you have. The way back is just as long, and the last bus does not wait.</p></div>''')

page('<div class="kicker">Sample plans</div><h2>5 days: both sides of the park, part 2</h2>' +
 plan("Days 4 and 5: the east valleys", "2 nights on the east side", [
  ("Day 4", "Drive the road east, with stops at Jackson Glacier Overlook, St. Mary and Virginia Falls (hike 5) and Sun Point (hike 6). On to Many Glacier for the evening, and watch for wildlife."),
  ("Day 5", "Many Glacier at first light: Grinnell Lake (hike 7), or Iceberg Lake for a big day (hike 10), or Apikuni Falls for a short steep one (hike 9). Leave by Hwy 89 and US 2, with Running Eagle Falls (hike 11) on the way.")]) +
 '''<div class="box forest"><h3>Add a day: Two Medicine or Waterton</h3><p style="margin:0">Stay a sixth day for Two Medicine (hikes 11 and 12) and the boat across the lake. Or cross into Canada's Waterton Lakes National Park with your passport (page 23).</p></div>
<h3>Book for this plan</h3>''' + chk(["3 nights west, then 2 nights in St. Mary or Many Glacier", "Logan Pass shuttle ticket for day 3", "Many Glacier boats for day 5 (optional)", "A 7-day vehicle pass covers all 5 days", "Write it all on page 26 and leave a copy at home"])
 + '<div class="em"><h3>Build in slack</h3><p>Snow, smoke, closures and bear activity change plans every summer. Keep at least one flexible day so a closed trail never ruins the trip.</p></div>'
 + '<div class="box"><h3 style="margin-top:0">Leaving day</h3><p style="margin:0">From Many Glacier back to West Glacier is about 70 mi (113 km) and 2.5 hours (NPS estimate). Flying out of Glacier Park International near Kalispell? Leave Many Glacier by early afternoon.</p></div>')

# hike cards
def card(no, name, where, level, stats, see, tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    st = "".join(f'<div><b>{a}</b><span>{b}</span><em>{c}</em></div>' for a, b, c in stats)
    return f'''<div class="hk"><div class="top"><div><small>Hike {no}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st">{st}</div>
<p><span class="lb">Where</span>{where}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Good to know</span>{tip}</p>{nt}</div>'''
def rt(mi): return ("Round trip", f"{mi:g} mi", km(mi))
def gain(ft): return ("Climb", f"{ft:,} ft", mt(ft))

page('<div class="kicker">Hikes · Lake McDonald</div>' +
 card(1, "Trail of the Cedars", "Avalanche Picnic Area on Going-to-the-Sun Road, west side. Not served by the shuttle in 2026: arrive early.", "Easy",
      [("Loop", "0.7 mi", "1.1 km"), ("Climb", "Flat", "Boardwalk"), ("Access", "Accessible", "Wheelchairs, strollers"), ("Best", "May to Oct", "Lower road open longer")],
      "A boardwalk and paved loop through old western red cedars and hemlocks, with a footbridge over Avalanche Gorge, where the creek has cut a deep channel in red rock.",
      "Stay behind the railings at the gorge. The water is fast and cold.") +
 card(2, "Avalanche Lake", "Starts on Trail of the Cedars, from the Avalanche Picnic Area.", "Easy to moderate",
      [rt(4.6), gain(500), ("Start", "West side", "about 3,000 ft"), ("Best", "June to Oct", "Morning")],
      "A steady forest climb beside the creek to a lake in a bowl of cliffs, with long waterfalls pouring down the walls in early summer. One of the most popular hikes on the west side.",
      "Bear country with thick brush: talk often and carry bear spray. The parking area fills early in summer, so start at first light or come late in the day.",
      "Distance from the NPS: 2.3 mi (3.7 km) one way, so about 4.6 mi (7.4 km) there and back, with 500 ft (152 m) of climb."))

page('<div class="kicker">Hikes · Logan Pass</div>' +
 card(3, "Hidden Lake Overlook", "Behind the Logan Pass Visitor Center, 6,646 ft (2,026 m).", "Easy to moderate",
      [rt(2.8), gain(460), ("Start", "6,646 ft", "2,026 m"), ("Best", "Mid-July to Sept", "Snow before")],
      "A boardwalk and trail across alpine meadows to a view over Hidden Lake and Bearhat Mountain. Mountain goats and bighorn sheep are often near the trail.",
      "Snow can cover the trail into July: wear shoes with grip. Give goats and sheep 25 yards (23 m). In 2026 the park said 3 hours of parking was enough for this hike.",
      "To the lake shore: 1.2 mi (1.9 km) more each way and 780 ft (238 m) down, then back up. Often closed for bear activity.") +
 card(4, "The Highline Trail", "Across the road from the Logan Pass parking lot, at the Continental Divide sign. In 2026 longer Highline hikes needed a shuttle ticket.", "Moderate to hard",
      [("Full trail", "11.8 mi", "19 km one way"), ("Climb", "2,388 ft", "728 m"), ("Descent", "4,773 ft", "1,455 m"), ("Opens", "When snow clears", "Check trail status")],
      "A trail cut into the Garden Wall, with huge views down the valley and the road far below. Wildflowers, goats and sheep in summer.",
      "Much of it is exposed. Near the start, a narrow ledge has a hand cable: if heights bother you, turn back there. Many hikers go out and back and turn around after a set time.",
      "Point to point: Granite Park Chalet (7.6 mi / 12.2 km), then steeply down to The Loop. A long, hard day: only with a shuttle plan and strong legs."))

page('<div class="kicker">Hikes · St. Mary</div>' +
 card(5, "St. Mary and Virginia Falls", "St. Mary Falls Trailhead on Going-to-the-Sun Road, east side.", "Easy to moderate",
      [("Round trip", "2.4 or 3.6 mi", "3.9 or 5.8 km"), ("Climb", "260 + 285 ft", "79 + 87 m"), ("Water", "Streams", "Treat or filter"), ("Best", "July to Sept", "Falls full early")],
      "Down through an open forest, regrowing after a wildfire, to St. Mary Falls, a turquoise double falls. Then up beside the creek to Virginia Falls, a tall veil of water.",
      "The trail goes down first, so the climb comes on the way back: 260 ft (79 m) back up from St. Mary Falls, plus the 285 ft (87 m) up to Virginia Falls. Little shade, so bring a hat.",
      "Turnaround guide: St. Mary Falls is 2.4 mi (3.9 km) round trip. Virginia Falls is 3.6 mi (5.8 km). A concession boat from Rising Sun offers a third start.") +
 card(6, "Sunrift Gorge, Baring Falls and Sun Point", "Sunrift Gorge Pullout on Going-to-the-Sun Road, by St. Mary Lake.", "Easy",
      [("To the gorge", "400 ft", "120 m round trip"), ("Baring Falls", "0.6 mi", "1 km round trip"), ("Sun Point", "1.6 mi", "2.6 km round trip"), ("Climb", "250 ft", "76 m back up")],
      "A narrow slot where Baring Creek rushes between rock walls, a small waterfall in the forest, and a windy rocky point with one of the best views over St. Mary Lake.",
      "Three short walks from one pullout, great for a late afternoon or a rainy break. The trails drop toward the lake, so the climb is on the way back. Hold on to hats: Sun Point is windy."))

page('<div class="kicker">Hikes · Many Glacier</div>' +
 card(7, "Grinnell Lake", "Grinnell Glacier Trailhead or the Many Glacier Hotel. Optional concession boats across Swiftcurrent Lake and Lake Josephine.", "Easy",
      [rt(6.8), gain(60), ("By boat", "2.2 mi", "3.5 km round trip"), ("Best", "July to Sept", "Book the boat")],
      "A nearly flat walk along two lakes to a milky turquoise lake under a wall of cliffs and waterfalls. A swinging suspension bridge over the creek near the end is a favorite with kids.",
      "Busy bear country: talk, carry spray, keep the group together. If you take the boats, check the last boat back and do not miss it.") +
 card(8, "Redrock Falls", "Swiftcurrent Trailhead, by the Swiftcurrent Motor Inn parking lot.", "Easy",
      [rt(3.6), gain(100), ("Start", "Many Glacier", "East side"), ("Best", "July to Sept", "Morning, evening")],
      "An easy trail past Fishercap Lake and Redrock Lake to falls tumbling over red rock ledges, with tall peaks all around. Moose are sometimes seen in the willows.",
      "Give moose plenty of room. They can be dangerous, especially cows with calves.",
      "Nearby and flat: the Swiftcurrent Nature Trail, a 2.3 mi (3.7 km) loop around Swiftcurrent Lake. The first quarter mile past the Grinnell Glacier Trailhead is wheelchair accessible."))

page('<div class="kicker">Hikes · Many Glacier</div>' +
 card(9, "Apikuni Falls", "Apikuni parking area, 1.1 mi (1.8 km) east of the Many Glacier Hotel.", "Moderate",
      [rt(2), gain(700), ("Start", "Many Glacier", "East side"), ("Best", "July to Sept", "Short, steep")],
      "A short, steep climb through open meadow and forest to a waterfall pouring from a hanging valley, with a view back over the Many Glacier valley.",
      "Short in miles but steep: take breaks, and use poles on the way down. A good choice when you have only a couple of hours.") +
 card(10, "Iceberg Lake", "Iceberg Ptarmigan Trailhead, behind the Swiftcurrent Motor Inn cabins.", "Moderate to hard",
      [rt(9.6), gain(1200), ("Start", "Many Glacier", "East side"), ("Best", "Mid-July to Sept", "Full day")],
      "A long, gradual climb through flower meadows to a lake under a huge cirque wall, where chunks of ice often float well into summer.",
      "Grizzlies use this valley a lot, and the trail is sometimes closed for bear activity. Hike in a group, make noise, and check closures before you start.",
      "Shorter option on the same trail: Ptarmigan Falls, 5.4 mi (8.7 km) round trip with 700 ft (213 m) of climb."))

page('<div class="kicker">Hikes · Two Medicine</div>' +
 card(11, "Running Eagle Falls", "Running Eagle Falls Trailhead on the Two Medicine road, before the lake.", "Easy",
      [rt(0.6), ("Climb", "Flat", "Accessible"), ("Start", "Two Medicine", "Southeast"), ("Best", "June to Sept", "Any time")],
      "A short, level walk through the woods to a falls that seems to come out of the rock. In early summer water also pours over the top; later the upper falls can dry up while water still gushes from the cave below.",
      "Easy for all ages, and listed as accessible by the park. A good stop on the drive between the east and west sides on US 2.") +
 card(12, "Aster Falls and Paradise Point", "South Shore Trailhead at Two Medicine Lake.", "Easy",
      [("Aster Falls", "2.4 mi", "3.9 km round trip"), ("Paradise Pt.", "1.4 mi", "2.3 km round trip"), ("Climb", "100 ft", "30 m"), ("Best", "July to Sept", "Calm mornings")],
      "Two gentle walks from the same trailhead: to a small waterfall in a side valley, or to a pebbly point on Two Medicine Lake with a big view of Sinopah Mountain.",
      "Easy and quiet. Bears use the berry patches here in late summer: make noise.",
      "In 2026 the North Shore Trailhead was closed by campground construction. Twin Falls was reached from the South Shore Trail (about 1 mi / 1.6 km longer each way) or with the concession boat (0.9 mi / 1.4 km each way from the dock)."))

# 22 all hikes
rows = [("West side: Lake McDonald", None),
 ("1 Trail of the Cedars", "0.7 / 1.1 loop", "Flat", "Easy", "Accessible"),
 ("2 Avalanche Lake", "4.6 / 7.4", "500 / 152", "Easy-mod.", "Very busy"),
 ("Rocky Point", "2.2 / 3.5", "85 / 26", "Easy", "Quiet"),
 ("Logan Pass", None),
 ("3 Hidden Lake Overlook", "2.8 / 4.5", "460 / 140", "Easy-mod.", "Very busy"),
 ("4 Highline (out and back)", "Your choice", "Rolling", "Moderate", "Busy"),
 ("4 Highline to The Loop", "11.8 / 19 one way", "2,388 / 728", "Hard", "Busy"),
 ("St. Mary", None),
 ("5 St. Mary Falls", "2.4 / 3.9", "260 / 79", "Easy", "Busy"),
 ("5 Virginia Falls", "3.6 / 5.8", "545 / 166", "Easy-mod.", "Busy"),
 ("6 Baring Falls", "0.6 / 1", "250 / 76", "Easy", "Moderate"),
 ("6 Sun Point", "1.6 / 2.6", "250 / 76", "Easy", "Moderate"),
 ("Many Glacier", None),
 ("7 Grinnell Lake (boat)", "2.2 / 3.5", "60 / 18", "Easy", "Busy"),
 ("7 Grinnell Lake (walk)", "6.8 / 10.9", "60 / 18", "Easy", "Busy"),
 ("8 Redrock Falls", "3.6 / 5.8", "100 / 30", "Easy", "Busy"),
 ("Swiftcurrent Nature Trail", "2.3 / 3.7 loop", "Flat", "Easy", "Moderate"),
 ("9 Apikuni Falls", "2 / 3.2", "700 / 213", "Moderate", "Moderate"),
 ("10 Ptarmigan Falls", "5.4 / 8.7", "700 / 213", "Moderate", "Moderate"),
 ("10 Iceberg Lake", "9.6 / 15.4", "1,200 / 366", "Mod.-hard", "Busy"),
 ("Two Medicine", None),
 ("11 Running Eagle Falls", "0.6 / 1", "Flat", "Easy", "Accessible"),
 ("12 Paradise Point", "1.4 / 2.3", "100 / 30", "Easy", "Quiet"),
 ("12 Aster Falls", "2.4 / 3.9", "100 / 30", "Easy", "Quiet")]
page('<div class="kicker">Choose your hike</div><h2>All the hikes on one page</h2>'
 + '<p style="margin-bottom:4pt">Round trip distance and climb, from NPS one-way figures. For the St. Mary trails the climb is the total you walk uphill there and back. Crowds are for summer days: early mornings are always quieter.</p>'
 + '<table class="tt"><tr><th>Hike</th><th>mi / km</th><th>Climb ft / m</th><th>Level</th><th>Crowds</th></tr>'
 + "".join(f'<tr class="grp"><td colspan="5">{r[0]}</td></tr>' if r[1] is None else f"<tr><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td></tr>" for r in rows)
 + '</table>')

# 23 rainy day, Waterton, accessibility
page("""<div class="kicker">Plan B</div><h2>Rainy days, rest days and Waterton</h2>
<p class="lead">Low cloud, smoke, a closed trail or tired legs are part of every Glacier trip. Keep one of these ready.</p>
<div class="mini">
<div><h3>Visitor centers</h3><div class="s">Apgar, Logan Pass, St. Mary</div><p>Exhibits, maps, the day's trail report and ranger advice.</p></div>
<div><h3>Boat tours</h3><div class="s">Fees apply</div><p>A calm way to see the lakes when legs need a break, on Lake McDonald, St. Mary Lake, Many Glacier and Two Medicine.</p></div>
<div><h3>Short walks</h3><div class="s">Under 1.5 mi</div><p>Trail of the Cedars, Running Eagle Falls, Sunrift Gorge and Baring Falls. Easy to cut short if the weather turns.</p></div>
<div><h3>Ranger programs</h3><div class="s">Free</div><p>Talks, walks and evening programs in summer. Check the schedule at a visitor center or on nps.gov/glac.</p></div></div>
<h3>A day in Waterton Lakes (Canada)</h3>
<p>Glacier and Canada's Waterton Lakes National Park together form the Waterton-Glacier International Peace Park. Waterton has its own Parks Canada pass. Every crossing needs a passport. The Chief Mountain crossing is seasonal (May 15 to September 30, hours vary); the Piegan/Carway crossing north of Babb is on US 89. Check border hours and what you may carry before you go.</p>
<h3>Accessible highlights</h3>
<table><tr><th>Place</th><th>What to expect</th></tr>
<tr><td><b>Trail of the Cedars</b></td><td>0.7 mi (1.1 km) boardwalk and paved loop</td></tr>
<tr><td><b>Running Eagle Falls</b></td><td>0.6 mi (1 km) round trip, listed as accessible</td></tr>
<tr><td><b>Swiftcurrent Nature Trail</b></td><td>First quarter mile (400 m) past the Grinnell Glacier Trailhead</td></tr>
<tr><td><b>Logan Pass shuttle</b></td><td>Wheelchair accessible (2026)</td></tr></table>
<div class="warn">Thunder nearby? Get off ridges and away from open water, and wait in a hard-top car or a building until 30 minutes after the last thunder.</div>""")

# 24 packing
page("""<div class="kicker">Checklist</div><h2>Packing list for Glacier</h2>
<div class="cl">
<div><h3>For every hike (the Ten Essentials)</h3>""" + chk(["Map, plus the NPS App with offline maps", "Headlamp with fresh batteries", "Sun protection: hat, sunglasses, sunscreen", "First aid kit, with blister care", "Knife or multi-tool", "Fire starter (for emergencies only)", "Emergency shelter: a space blanket", "Extra food", "Extra water, plus a filter or tablets", "Extra layer: warm top and rain jacket"]) + """
<h3>For this park</h3>""" + chk(["Bear spray in a holster, one per adult", "Shuttle ticket and park pass (screenshots)", "A card: the park is cashless", "Binoculars for goats, sheep and bears", "Passport if you may visit Waterton"]) + """</div>
<div><h3>Layers for mountain weather</h3>""" + chk(["Moisture-wicking base layer (no cotton)", "Fleece or light puffy jacket", "Waterproof rain jacket with a hood", "Hiking pants or zip-offs", "Warm hat and light gloves, even in summer", "Broken-in hiking shoes with good grip", "Hiking socks, plus a dry spare pair"]) + """
<h3>For the car</h3>""" + chk(["A full tank: no gas inside the park", "More water and snacks for the drive", "Phone charger and power bank", "Printed maps and this guide", "Small trash bag: pack out everything", "Dry clothes and shoes for after"]) + """</div></div>
<div class="box" style="margin-top:10pt"><h3 style="margin-top:0">Flying in? Buy bear spray there</h3><p style="margin:0">Bear spray is not allowed on airplanes, in carry-on or checked bags. Buy or rent it in a gateway town or at a park store, and practice taking it out of the holster before your first hike.</p></div>""")

# 25 budget
rows = [("Park pass", "7-day vehicle pass or annual pass (page 5)"), ("Flights", ""), ("Rental car and gas", "Fill up outside the park"), ("Lodging and campsites", ""), ("Shuttle tickets", "$1 processing fee each (2026)"), ("Boat tours", "Optional"), ("Food and groceries", ""), ("Bear spray and gear", "Buy or rent near the park"), ("Souvenirs", ""), ("Extra for surprises", "About 10 percent")]
page('<div class="kicker">Money</div><h2>Trip budget</h2><p class="lead">Lodging is usually the biggest cost near Glacier in summer. Write the plan first, then the real numbers as you book.</p>'
 + '<div class="f2"><div class="fl">Number of people</div><div class="fl">Number of nights</div></div>'
 + '<table class="bud" style="margin-top:6pt"><tr><th>Item</th><th>Notes</th><th style="text-align:right">Planned</th><th style="text-align:right">Actual</th></tr>'
 + "".join(f'<tr><td class="c">{a}</td><td class="small">{b}</td><td class="a"></td><td class="a"></td></tr>' for a, b in rows)
 + '<tr class="tot"><td>Total</td><td></td><td class="a"></td><td class="a"></td></tr></table>'
 + '<div class="box" style="margin-top:10pt"><h3 style="margin-top:0">Ways to spend less</h3><p style="margin:0">One vehicle pass covers everyone in the car for 7 days. Visiting more parks this year? An annual pass may cost less. Picnic lunches from a grocery store in a gateway town cost far less than restaurant meals, and campgrounds cost far less than lodges.</p></div>')

# 26 day-by-day planner
def dayp():
    return '<div class="dayp"><div class="f2"><div class="fl">Day and date</div><div class="fl">Sleeping in</div><div class="fl">Main hike or drive</div><div class="fl">Start by</div><div class="fl">Shuttle time / last bus</div><div class="fl">Backup plan</div></div></div>'
page('<div class="kicker">Planner</div><h2>Day-by-day planner</h2><p style="margin-bottom:6pt">One box a day. Fill it in pencil: snow, smoke and bears change plans.</p>' + "".join(dayp() for _ in range(5)))

# 27 bookings log
page('<div class="kicker">Planner</div><h2>Bookings and confirmations</h2><p style="margin-bottom:4pt">Keep every confirmation number in one place. Screenshot them too: there is no signal at most trailheads.</p>'
 + '<table class="spots"><tr><th style="width:1.5in">Booking</th><th>Date and time</th><th>Confirmation no.</th><th style="text-align:center">Paid</th></tr>'
 + "".join(f'<tr><td style="height:33pt"><b>{a}</b></td><td></td><td></td><td class="b"></td></tr>' for a in ["Flights", "Rental car", "Lodging 1", "Lodging 2", "Lodging 3", "Campsite", "Park pass", "Shuttle day 1", "Shuttle day 2", "Boat tour", "Other tour", "Other"])
 + '</table><div class="lab" style="margin-top:8pt">Left with someone at home</div><div class="f2"><div class="fl">Name and phone</div><div class="fl">Car and plate</div><div class="fl">Trailheads we plan to use</div><div class="fl">Call for help if no word by</div></div>')

# 28 safety + LNT + sources
page("""<div class="kicker">Before every hike</div><h2>Safety, Leave No Trace and official sources</h2>
<div class="diff">
<div><div class="tag">Safety</div><h3>Every hike</h3><ul class="check"><li>Tell someone your plan and when you will be back</li><li>Set a turnaround time and keep it</li><li>Check trail status, closures and bear warnings</li><li>Emergency: call 911. Signal is patchy, so do not rely on it</li><li>Go back if the group or the weather says so</li></ul></div>
<div><div class="tag">Leave No Trace</div><h3>Every visit</h3><ul class="check"><li>Stay on the trail, even when muddy or snowy</li><li>Pack out all trash, peels and tissues</li><li>Never feed any animal, even a ground squirrel</li><li>Leave rocks, flowers and antlers where they are</li><li>No drones: they are not allowed in national parks</li></ul></div></div>
<h3>Official sources</h3>
<div class="mini">
<div><h3>Glacier National Park</h3><div class="s">nps.gov/glac · 406-888-7800</div><p>Alerts, trail status, road status, the Logan Pass rules for your year, bear safety.</p></div>
<div><h3>Reservations</h3><div class="s">recreation.gov · 877-444-6777</div><p>Logan Pass shuttle tickets, campgrounds and wilderness permits.</p></div>
<div><h3>Road updates</h3><div class="s">Text GNPROADS to 333111</div><p>Going-to-the-Sun Road openings and closures, plus the interactive road map on nps.gov/glac.</p></div>
<div><h3>Weather and air</h3><div class="s">weather.gov · airnow.gov</div><p>Forecasts, storm warnings and wildfire smoke.</p></div>
<div><h3>Waterton Lakes</h3><div class="s">parks.canada.ca/waterton</div><p>Passes, trails and closures on the Canadian side.</p></div>
<div><h3>Border</h3><div class="s">cbp.gov · travel.gc.ca</div><p>Crossing hours and what you may bring each way.</p></div></div>
<p class="small">Facts in this guide were checked against nps.gov in November 2026. The official sources always win.</p>""")

# 29 notes
page('<div class="kicker">Notes</div><h2>Trip notes</h2><div class="notes"><div class="lab">Places we want to see</div>' + lines(6) + '<div class="lab">Wildlife we saw</div>' + lines(5) + '<div class="lab">Best moments</div>' + lines(6) + '<div class="lab">Next time</div>' + lines(4) + '</div>')

# 30 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 95 L40 60 L60 75 L100 18 L120 40 L140 28 L200 90" stroke="#F5F1EA" stroke-width="4"/><path d="M100 18 L90 34 L100 30 L108 38 L114 33" stroke="#F5F1EA" stroke-width="3"/></svg>
<h2 style="margin-top:22pt">Enjoy Glacier</h2>
<p>Thank you for choosing a HikeSupply guide. Check the road and the trail status, start early, carry bear spray, talk on the trail, and give the wildlife plenty of room.</p>
<p style="margin-top:10pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">Plan your next adventure</p>
<div class="bkcards" style="grid-template-columns:1fr 1fr 1fr;width:6.4in"><div><b>US National Parks Hiking Tracker</b><span>Log every US national park you visit, plus Canada</span></div><div><b>Trail Ready</b><span>8-week beginner hiking training plan</span></div><div><b>Park trip guides</b><span>Yellowstone, Grand Canyon, Rocky Mountain, Smokies, Utah's Mighty 5</span></div></div>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">General trip planning information only. Roads, shuttles, closures, fees and rules change: always check nps.gov/glac and ask a ranger before you hike. Hike within your ability and turn back when in doubt. Not affiliated with the National Park Service. For personal use only. COVERCREDIT</p>""", "back")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip() if os.path.exists(os.path.join(HERE, "cover-credit.txt")) else ""
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
