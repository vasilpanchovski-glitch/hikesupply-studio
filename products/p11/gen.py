"""Generates index.html for p11 (Rocky Mountain National Park — Trip Planning Guide). Run: python3 gen.py
Same look as p08 (base.css + extra.css). Facts checked on November 1, 2026 against nps.gov/romo:
2026 timed entry release and permit page, fees, list of hiking trails (one-way distances and gains), distances
and elevations, road status, Old Fall River Road, Trail Ridge Road winter closure release, campgrounds, shuttles,
wildlife viewing, elk rut meadow closures, high country hazards, pets, accessibility, winter recreation,
Kawuneeche Valley trail guide."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Rocky Mountain National Park"
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

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 230 L70 170 L110 195 L190 80 L230 120 L265 95 L340 175 L380 150 L470 225" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M190 80 L172 106 L186 102 L198 114 L210 98 L230 120" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M40 300 L40 262 M28 270 L40 250 L52 270 M28 284 L40 262 L52 284 M430 300 L430 258 M416 268 L430 246 L444 268 M416 284 L430 260 L444 284" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M90 300 C150 280 170 255 230 255 C290 255 300 230 360 222" stroke="#F5F1EA" stroke-width="3" stroke-dasharray="2 10"/>
<circle cx="390" cy="60" r="20" stroke="#F5F1EA" stroke-width="3"/>
</svg></div>
<div><h1>Rocky Mountain National Park</h1><p class="sub">A trip planning guide for first-time visitors. Timed entry made simple, when to go, 1, 2 and 3-day plans, 18 day hikes and walks from easy lakeside loops to waterfalls, and the altitude, storm and wildlife rules that keep you safe.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>18 hikes and walks</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">Rocky Mountain National Park is high country: most trailheads sit between 8,000 and 9,500 ft (2,400 to 2,900 m), and the main road crosses the Continental Divide above 12,000 ft. This guide helps you plan a first visit without the stress.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["The park at a glance, and when to go", "Timed entry reservations, explained step by step", "Gateway towns, campgrounds and shuttles", "Altitude, afternoon storms and wildlife", "18 day hikes and walks on both sides of the park", "Trail Ridge Road and Old Fall River Road", "Sample 1, 2 and 3-day plans", "Packing list, booking checklist, planner and hike log"]) + f"""</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers. Every hike here is a day hike on a marked trail, from a flat lakeside loop to a half-day walk to a waterfall.</p>
<h3>How to read the hikes</h3><p>Distances are round trip, in miles and kilometers. Climbs are total elevation gain from the trailhead, in feet and meters. All trail figures come from the National Park Service.</p></div></div>
<div class="box forest"><h3>Checked against nps.gov in {CHECKED}</h3><p style="margin:0">Timed entry dates, road openings, shuttles and fees change every year. Snow, storms and wildlife can close trails and roads at short notice. Before you go, check the official pages on page 26, and ask a ranger when you arrive.</p></div>
<h3>Print it or keep it offline</h3>
<p>Cell service in the park is patchy. Print the pages you need, or save this PDF to your phone before you leave home. The fill-in pages (26 to 29) are made for printing.</p>""")

# 3 at a glance
page(f"""<div class="kicker">The park</div><h2>At a glance</h2>
<p class="lead">The Continental Divide splits the park in two. The east side, near Estes Park, has most of the famous lakes and the busiest trails. The west side, near Grand Lake, is quieter, with wide river meadows and moose.</p>
<div class="glance">
<div><h3>East side</h3><table>
<tr><td>Town</td><td>Estes Park, visitor center at 7,522 ft (2,293 m)</td></tr>
<tr><td>Entrances</td><td>Beaver Meadows, Fall River, Wild Basin (south)</td></tr>
<tr><td>Highlights</td><td>Bear Lake Road and its lakes, Moraine Park, Sprague Lake, Wild Basin waterfalls, Longs Peak</td></tr>
<tr><td>Visitor centers</td><td>Beaver Meadows and Fall River (all year), Moraine Park Discovery Center (summer)</td></tr></table></div>
<div><h3>West side</h3><table>
<tr><td>Town</td><td>Grand Lake, 8,367 ft (2,550 m)</td></tr>
<tr><td>Entrance</td><td>Grand Lake Entrance</td></tr>
<tr><td>Highlights</td><td>Kawuneeche Valley, the young Colorado River, Holzwarth Historic Site, Adams Falls</td></tr>
<tr><td>Visitor center</td><td>Kawuneeche Visitor Center, 8,720 ft (2,658 m)</td></tr></table></div></div>
<h3>Trail Ridge Road joins the two sides</h3>
<p>The highest continuous paved road in the US runs 48 mi (77 km) from Estes Park to Grand Lake and tops out at 12,183 ft (3,713 m). It is usually open from late May to mid or late fall, and closed in winter (page 15).</p>
<table><tr><th>Place</th><th>Elevation</th><th>What it means for you</th></tr>
<tr><td><b>Estes Park</b></td><td>7,522 ft / 2,293 m</td><td>Higher than Denver: sleep here the first night if you can</td></tr>
<tr><td><b>Bear Lake</b></td><td>9,475 ft / 2,888 m</td><td>Most popular trailhead. Breathing feels harder</td></tr>
<tr><td><b>Alpine Visitor Center</b></td><td>11,796 ft / 3,595 m</td><td>Above the trees. Cold, windy, thin air</td></tr>
<tr><td><b>Longs Peak</b></td><td>14,259 ft / 4,346 m</td><td>The park's highest summit. Not a beginner hike</td></tr></table>
<div class="box forest"><h3>Three things that surprise first-timers</h3><p style="margin:0">You need a timed entry reservation in summer and early fall (page 5). Even easy trails feel hard at this altitude on the first day (page 8). And there are no hotels inside the park: you sleep in a gateway town or a campground (page 7).</p></div>""")

# 4 when to go
months = [
 ("Jan to Mar", "Deep winter. Trail Ridge Road closed. Snowshoeing above about 9,000 ft. Few people, short days, strong winds up high."),
 ("April", "Still winter on the trails. Lower trails have patchy snow and ice. Good for wildlife watching in the meadows."),
 ("May", "Snow melts low down; high trails stay snowy. Trail Ridge Road usually opens the last week of May. Timed entry starts late May."),
 ("June", "Lakes thaw, waterfalls are full. Snow can linger on trails above 10,000 ft. Busy from mid-June."),
 ("July", "Wildflowers on the tundra. The busiest month. Old Fall River Road usually opens early July. Afternoon storms most days."),
 ("August", "Warm days, busy trails, frequent afternoon thunderstorms. Start every hike early."),
 ("September", "Elk rut begins, aspens turn gold mid to late month. Cooler, clear mornings. Weekends very busy."),
 ("October", "Elk rut continues, first snows up high. Timed entry ends mid-October. Old Fall River Road closes early October."),
 ("Nov to Dec", "Trail Ridge Road closes for the winter (mid-November in 2025). Quiet, cold, icy trails: bring traction."),
]
page('<div class="kicker">Timing</div><h2>When to go: month by month</h2><p class="lead">For a first hiking trip, late June to September gives you open roads and snow-free trails. September is the favorite: golden aspens, bugling elk and fewer storms, but busy weekends.</p>'
 + '<table class="months">' + "".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in months) + '</table>'
 + '<div class="box"><h3 style="margin-top:0">Snow lasts longer than you think</h3><p style="margin:0">A warm sunny day in Estes Park in June can still mean snow and ice on the trail to Emerald Lake. Ask at a visitor center about trail conditions, and pack traction devices from October to June.</p></div>'
 + '<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr><tr><td>Snow-free trails and every road open</td><td>Mid-July to mid-September</td></tr><tr><td>Wildflowers on the tundra</td><td>July</td></tr><tr><td>Golden aspens and bugling elk</td><td>Mid-September to early October</td></tr><tr><td>No reservations and few people</td><td>Mid-October to mid-May (bring traction)</td></tr></table>')

# 5 timed entry 1
page("""<div class="kicker">Timed entry</div><h2>Timed entry, explained</h2>
<p class="lead">From late May to mid-October you need a timed entry reservation to drive into the park during the busiest hours. It is the part of the trip people most often get wrong, so plan it first.</p>
<div class="permit">
<div><small>Option 1</small><h3>Timed Entry</h3><div class="hrs">9 am to 2 pm</div><div class="hl">Whole park except Bear Lake Road</div><p>For Trail Ridge Road, the west side, Wild Basin, Lumpy Ridge, Longs Peak and Lily Lake. In 2026: May 22 to October 12.</p></div>
<div class="plus"><small>Option 2</small><h3>Timed Entry+ Bear Lake Road</h3><div class="hrs">5 am to 6 pm</div><div class="hl">Bear Lake Road and the rest of the park</div><p>Needed for Bear Lake, Glacier Gorge, Sprague Lake and the other trailheads on Bear Lake Road. In 2026: May 22 to October 18.</p></div></div>
<h3>How it works</h3>
<div class="bk">
<div><b>Pick a 2-hour window</b><p>Each reservation lets you enter during a two-hour window. Once you are in, stay as long as you like: there is no set time to leave.</p></div>
<div><b>Book on recreation.gov</b><p>Online, in the Recreation.gov app or by phone. Not at the park gates or visitor centers. The only cost is a $2 processing fee, which is not refunded.</p></div>
<div><b>Monthly release</b><p>In 2026 each month opened at 8 am Mountain Time on the 1st of the month before: May 1 for late May and June, June 1 for July, July 1 for August, August 1 for September, September 1 for October.</p></div>
<div><b>Night-before release</b><p>More reservations are released at 7 pm Mountain Time the evening before each date. They go fast, so be logged in and ready.</p></div>
<div><b>Plus your pass</b><p>The reservation is not a ticket. You still need a park entrance pass or an annual pass (page 7).</p></div></div>
<div class="now"><h3>Planning a 2027 trip?</h3><p>This page describes the 2026 system. The park announces each year's dates and rules ahead of the season. Check nps.gov/romo and search "timed entry" before you book anything else.</p></div>""")

# 6 timed entry 2
page("""<div class="kicker">Timed entry</div><h2>If you miss out, and what to do on the day</h2>
<p class="lead">Sold out for your date? You can still see the park. These are the legal, simple ways around a missing reservation.</p>
<div class="layers">
<div><div class="num">1</div><h3>Go early</h3><p>No reservation is needed to enter the rest of the park before 9 am. Bear Lake Road needs Timed Entry+ from 5 am.</p><div class="eg">Early starts also beat the afternoon storms (page 9).</div></div>
<div><div class="num">2</div><h3>Go late</h3><p>After 2 pm you can enter the rest of the park without a reservation. In 2026, a missed Bear Lake Road window meant coming back after 2 pm.</p><div class="eg">Evening is the best time to see elk in the meadows.</div></div>
<div><div class="num">3</div><h3>Try again</h3><p>Check Recreation.gov at 7 pm the night before. Plans change and spots can open up.</p><div class="eg">Set a phone alarm for 6:55 pm Mountain Time.</div></div></div>
<h3>The free park shuttles (summer)</h3>
<table><tr><th>Shuttle</th><th>Route</th><th>2026 season</th></tr>
<tr><td><b>Bear Lake</b></td><td>Park &amp; Ride, Bierstadt Lake, Glacier Gorge, Bear Lake. Every 10 to 15 min</td><td>May 22 to Oct 18</td></tr>
<tr><td><b>Moraine Park</b></td><td>Park &amp; Ride, Sprague Lake, Moraine Park, Cub Lake and Fern Lake trailheads. About hourly</td><td>May 22 to Oct 18</td></tr>
<tr><td><b>Hiker Shuttle</b></td><td>Estes Park Visitor Center to the Park &amp; Ride. Needs a $2 ticket per rider on Recreation.gov</td><td>Daily to early Sept, then weekends to Oct 18</td></tr></table>
<p class="small">The Park &amp; Ride is on Bear Lake Road and has no food or stores. Check the last bus time: in 2026 it left Bear Lake at 7:30 pm. Pets are not allowed on the shuttles (service animals only). There is no shuttle on the west side or over Trail Ridge Road.</p>
<div class="box"><h3 style="margin-top:0">Camping or backpacking?</h3><p style="margin:0">Campground and wilderness permit holders have their own entry rules. Check the timed entry FAQ on nps.gov/romo, or call the park at (970) 586-1206.</p></div>
<div class="warn"><b>Bear Lake and Glacier Gorge parking fills early</b> on summer and fall days, even for people with a reservation. Arrive early or park at the Park &amp; Ride and take the shuttle.</div>""")

# 7 getting there + staying + fees
page("""<div class="kicker">Getting there</div><h2>Getting there, staying, and paying</h2>
<p class="lead">Most visitors fly into Denver and drive. Denver International Airport is about 76 mi (122 km) from the Beaver Meadows Visitor Center on the east side.</p>
<div class="mini">
<div><h3>Estes Park</h3><div class="s">East side · most rooms</div><p>Hotels, cabins, restaurants and gear stores right outside the Beaver Meadows and Fall River entrances. Best base for Bear Lake Road.</p></div>
<div><h3>Grand Lake</h3><div class="s">West side · quieter</div><p>A small lakeside town by the Grand Lake Entrance. When Trail Ridge Road is closed, the drive from Estes Park is about 145 mi (233 km) around the park.</p></div></div>
<h3>Campgrounds in the park</h3>
<p>There are no hotels or lodges inside the park. Moraine Park, Glacier Basin, Aspenglen and Timber Creek (west side) take reservations on Recreation.gov up to 6 months ahead. Longs Peak (tents only, about July to early September) is the only first-come, first-served campground. Moraine Park is the only one open in winter, first-come, first-served. Timber Creek closed in August 2026 for repairs: check its status.</p>
<h3>Entrance fees (2026)</h3>
<table class="fee"><tr><th>Pass</th><th>Price</th><th>Covers</th></tr>
<tr><td>Private vehicle</td><td>$30 / $35</td><td>1 day / 7 days. One car and everyone in it</td></tr>
<tr><td>Per person (walk-in or bike)</td><td>$15 / $20</td><td>1 day / 7 days</td></tr>
<tr><td>Rocky Mountain annual pass</td><td>$70</td><td>One year, this park only. US citizens and residents</td></tr>
<tr><td>America the Beautiful</td><td>$80 / $250</td><td>One year, all national parks. US residents / non-residents</td></tr>
<tr><td>Non-resident fee</td><td>$100 each</td><td>Visitors 16+ from outside the US, on top of the entrance fee, unless you hold an annual pass</td></tr></table>
<p class="small">The park is cashless: cards only. Visiting from Canada or elsewhere? You count as a non-resident. Check nps.gov/romo/planyourvisit/fees.htm for current prices before you go.</p>""")

# 8 altitude
page("""<div class="kicker">Safety</div><h2>Altitude: why the first day feels hard</h2>
<p class="lead">At Bear Lake there is noticeably less oxygen in each breath than at sea level. Even fit hikers puff on easy climbs here. That is normal. Plan around it.</p>
<div class="layers">
<div><div class="num">1</div><h3>Go slow</h3><p>Choose an easy, short hike on day one (Bear Lake, Sprague Lake, Alberta Falls) and save the longer climbs for later in the trip.</p><div class="eg">Walk at a pace where you can still talk.</div></div>
<div><div class="num">2</div><h3>Drink and eat</h3><p>The air is dry and you lose water fast. The park suggests several quarts (liters) of water a day. Eat regular snacks.</p><div class="eg">Go easy on alcohol the first night.</div></div>
<div><div class="num">3</div><h3>Sun is stronger</h3><p>There is less atmosphere to block the sun up here, and severe sunburn is a real risk, even on cool days.</p><div class="eg">Reapply sunscreen often.</div></div></div>
<div class="sig">
<div><h3>Mild altitude sickness</h3><div class="lbl">Signs</div><p>Headache, nausea, dizziness, tiredness, poor sleep.</p><div class="act"><p>Rest, drink water and do not go higher. If it does not get better, go down to a lower elevation.</p></div></div>
<div><h3>Getting worse</h3><div class="lbl">Signs</div><p>Headache that does not ease, vomiting, getting more tired and clumsy.</p><div class="act"><p>Go down now, with someone. Even 1,000 to 2,000 ft (300 to 600 m) lower can help a lot.</p></div></div>
<div><h3>Emergency</h3><div class="lbl">Signs</div><p>Confusion, stumbling, short of breath while resting, a wet cough.</p><div class="act"><p>Call 911 or get a ranger. Go down at once and get medical care.</p></div></div></div>
<div class="warn">Altitude can make existing health problems worse. If you have a heart or lung condition, or are pregnant, ask your doctor before a trip to high elevation. This page is general information, not medical advice.</div>
<div class="box"><h3 style="margin-top:0">An easy trick</h3><p style="margin:0">Spend your first night in Estes Park or Grand Lake, not straight off a flight into a high trailhead. Your body adjusts a little each day you spend up high.</p></div>""")

# 9 storms
page("""<div class="kicker">Safety</div><h2>Afternoon thunderstorms</h2>
<p class="lead">In summer, clear mornings often turn into thunderstorms by early afternoon. Above treeline there is nowhere to hide from lightning, so the whole plan comes down to timing.</p>
<div class="dist"><div class="a"><div class="n">Start early</div><div class="u">on the trail at first light</div><p>Most storms build after midday in July and August.</p></div><div class="b"><div class="n">Be down early</div><div class="u">below treeline by early afternoon</div><p>Aim to be off open ridges and summits by noon.</p></div></div>
<div class="cols">
<div><h3>Watch the sky</h3>""" + chk(["Puffy clouds growing tall by late morning", "Dark bases and a cold gust of wind", "Distant thunder: you are already in range", "Hair standing up or a buzzing sound: move now"]) + """</div>
<div><h3>If a storm catches you</h3>""" + chk(["Get off summits and ridges, go down", "Move away from lone trees and big rocks", "Avoid small caves and rock overhangs", "If you cannot get lower, crouch low on your heels", "Spread a group out, at least 50 ft (15 m) apart"]) + """</div></div>
<h3>Weather changes fast</h3>
<p>The park warns that a sunny day can quickly turn windy and wet, with driving rain or even snow, in any month. Carry a rain jacket and a warm layer on every hike, even a short one. Hypothermia can happen in summer when you are wet and tired in the wind.</p>
<div class="em"><h3>The safe car</h3><p>A hard-top car is a good shelter from lightning. On Trail Ridge Road, if a storm rolls in, stay in your car and enjoy the view through the windshield.</p></div>""")

# 10 wildlife
page("""<div class="kicker">Safety</div><h2>Wildlife: elk, moose and bears</h2>
<p class="lead">Elk graze in the meadows by the road, moose feed in the west-side willows, and black bears live in the forests. Watching them is a highlight. Getting close is how people get hurt.</p>
<div class="diff">
<div><div class="tag">Keep your distance</div><h3>The park's rules</h3><ul class="check"><li>Elk and bighorn sheep: at least 75 ft (23 m)</li><li>Moose, bears and mountain lions: at least 120 ft (37 m)</li><li>If an animal reacts to you, you are too close</li><li>Never feed any animal, even a chipmunk</li><li>Calling elk and spotlighting wildlife are banned</li></ul></div>
<div><div class="tag">Where and when</div><h3>Seeing them safely</h3><ul class="check"><li>Elk: meadows at dawn and dusk, all year</li><li>Bighorn sheep: Sheep Lakes and Horseshoe Park, May to mid-August</li><li>Moose: Kawuneeche Valley on the west side</li><li>Use binoculars or a zoom lens</li><li>Pull fully off the road to watch</li></ul></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Moose</h3><p>Moose look calm but can charge, especially cows with calves. If one walks toward you, back away and put a tree or car between you.</p>
<h3>Elk rut (September and October)</h3><p>Bulls are aggressive. Some meadows close to people on foot from evening to mid-morning: Horseshoe Park, Upper Beaver Meadows, Moraine Park, Harbison Meadow and Holzwarth Meadow.</p></div>
<div><h3>Black bears and mountain lions</h3><p>Rarely seen. If you meet one, do not run. Stand tall, make noise, and back away slowly. Fight back if attacked.</p>
<h3>Food storage</h3><p>Never leave food, coolers or trash out at picnic areas or campsites. Use the food lockers in campgrounds, and keep food out of sight in a closed car.</p></div></div>
""")

# hike cards
def card(no, name, where, level, stats, see, tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    st = "".join(f'<div><b>{a}</b><span>{b}</span><em>{c}</em></div>' for a, b, c in stats)
    return f'''<div class="hk"><div class="top"><div><small>Hike {no}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st">{st}</div>
<p><span class="lb">Where</span>{where}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Good to know</span>{tip}</p>{nt}</div>'''
def rt(mi): return ("Round trip", f"{mi:g} mi", km(mi))
def gain(ft): return ("Climb", f"{ft:,} ft", mt(ft))

# 11 Bear Lake corridor 1
page('<div class="kicker">Hikes · Bear Lake Road</div>' +
 card(1, "Bear Lake Loop", "Bear Lake Trailhead, at the end of Bear Lake Road, 9,475 ft (2,888 m). Timed Entry+ or the Bear Lake shuttle.", "Easy",
      [("Loop", "0.5 mi", "0.8 km"), gain(20), ("Start", "9,475 ft", "2,888 m"), ("Best", "Early morning", "Calm water")],
      "A flat walk all the way around a mountain lake, with Hallett Peak and the Continental Divide reflected in the water on a still morning. Signs along the way explain the forest and the peaks.",
      "The perfect first walk on arrival day while your body gets used to the altitude. Busy from mid-morning, so come early or late.") +
 card(2, "Nymph, Dream and Emerald Lakes", "Same trailhead. The trail climbs past each lake in turn: turn around at whichever one suits you.", "Easy to moderate",
      [("Round trip", "1 to 3.6 mi", "1 · 2.2 · 3.6 mi"), ("Climb", "Up to 605 ft", "225 · 425 · 605 ft"), ("Water", "None", "Carry your own"), ("Best", "July to Sept", "Snow into June")],
      "Three lakes in a row: lily pads on Nymph Lake, a long view to the peaks at Dream Lake, and Emerald Lake tucked under the cliffs of Hallett Peak. The most popular hike in the park for good reason.",
      "Snow and ice linger on the upper section into early summer and come back in October. Carry traction devices outside midsummer.",
      "Turnaround guide: Nymph Lake (1 mi / 1.6 km round trip, 225 ft / 69 m) for a first-day stroll, Dream Lake (2.2 mi / 3.5 km, 425 ft / 130 m) for most families, Emerald Lake (3.6 mi / 5.8 km, 605 ft / 184 m) for a fuller morning."))

# 12 Bear Lake corridor 2
page('<div class="kicker">Hikes · Bear Lake Road</div>' +
 card(3, "Alberta Falls", "Glacier Gorge Trailhead on Bear Lake Road, 9,240 ft (2,816 m). Small lot: take the Bear Lake shuttle.", "Easy",
      [rt(1.6), gain(160), ("Start", "9,240 ft", "2,816 m"), ("Best", "June to Oct", "Full in June")],
      "A short walk through aspen and pine along Glacier Creek to a waterfall crashing through a rocky gorge. Gold aspens make it a favorite in late September.",
      "Stay back from the wet rocks at the falls: the water is cold and fast, and the rocks are slippery.") +
 card(4, "Mills Lake", "Same trailhead. Continue past Alberta Falls and follow the signs into Glacier Gorge.", "Moderate",
      [rt(5.6), gain(750), ("Start", "9,240 ft", "2,816 m"), ("Best", "July to Sept", "Start early")],
      "A big step up from the lakes on page 11: open granite slabs, views of Longs Peak, and a long lake in a valley carved by glaciers. One of the most scenic half-days in the park.",
      "Turn around at Alberta Falls if anyone feels the altitude. Watch for storms building over the peaks after midday.",
      "Also on Bear Lake Road: Sprague Lake, a flat 0.8 mi (1.3 km) loop with mountain views, and Bierstadt Lake, 2.8 mi (4.5 km) round trip with 566 ft (173 m) of climb from the Bierstadt Lake Trailhead."))

# 13 Wild Basin and Longs Peak area
page('<div class="kicker">Hikes · Wild Basin and Longs Peak</div>' +
 card(5, "Copeland Falls to Ouzel Falls", "Wild Basin Trailhead, 8,500 ft (2,591 m), off Highway 7 south of Estes Park. Small lot that fills early.", "Easy to moderate",
      [("Round trip", "0.6 to 5.4 mi", "0.6 · 3.6 · 5.4 mi"), ("Climb", "Up to 950 ft", "15 · 700 · 950 ft"), ("Water", "Streams", "Treat or filter"), ("Best", "June to Oct", "Waterfalls in June")],
      "A waterfall walk with three good turnaround points: Copeland Falls (0.6 mi / 1 km round trip, almost flat), Calypso Cascades tumbling over fallen logs (3.6 mi / 5.8 km, 700 ft / 213 m), and Ouzel Falls dropping through the forest (5.4 mi / 8.7 km, 950 ft / 290 m).",
      "Wild Basin is covered by the standard Timed Entry (9 am to 2 pm) in season. Drink only treated or filtered stream water.") +
 card(6, "Eugenia Mine", "Longs Peak Trailhead, 9,300 ft (2,835 m), off Highway 7.", "Moderate",
      [rt(2.8), gain(508), ("Start", "9,300 ft", "2,835 m"), ("Best", "July to Sept", "Early start")],
      "A forest walk to the remains of an early 1900s mining claim, with old machinery and a cabin site in a quiet clearing. A short taste of the famous trailhead without its long climb.",
      "Take the Storm Pass Trail fork toward Estes Cone and follow the signs. Ask a ranger for the current route.",
      "Longs Peak (14,259 ft) is not a hike for this guide. The NPS lists 16 mi (25.7 km) round trip and almost 4,900 ft (1,490 m) of climb, and the usual Keyhole Route is a steep scramble with long drops, best done only by experienced, fit and well-acclimatized climbers. People have died on it."))

# 14 West side
page('<div class="kicker">Hikes · West side</div>' +
 card(7, "Adams Falls", "East Inlet Trailhead, just outside the town of Grand Lake, 8,400 ft (2,560 m).", "Easy",
      [("Round trip", "0.6 mi", "1 km"), gain(79), ("Start", "8,400 ft", "2,560 m"), ("Best", "June to Oct", "Moose nearby")],
      "A short walk to a waterfall rushing through a narrow rock channel. Keep going a little past it into a wide, flowery valley where moose are sometimes seen.",
      "Great for a first evening on the west side. Covered by the standard Timed Entry in season.") +
 card(8, "Lulu City on the Colorado River Trail", "Colorado River Trailhead, Trail Ridge Road, 9,010 ft (2,746 m), north of the Kawuneeche Visitor Center.", "Easy to moderate",
      [rt(7.4), gain(350), ("Start", "9,010 ft", "2,746 m"), ("Best", "July to Sept", "Long but gentle")],
      "A gentle trail beside the young Colorado River, close to its source, past meadows and old mining tailings to the site of Lulu City, a short-lived mining town from around 1880.",
      "Long but easy-going. Turn around at the mine tailings (about 2 mi / 3.2 km in) for a shorter outing.",
      "Two flat walks nearby: the Coyote Valley Trail (1 mi / 1.6 km round trip, wheelchair and stroller friendly, elk often graze here) and the walk to the Holzwarth Historic Site, a 1920s guest ranch (about 1 mi / 1.6 km round trip)."))

# 15 Trail Ridge + Old Fall River
stops = [("Many Parks Curve", "Big view over the valleys of the east side. Winter road closure point."),
 ("Rainbow Curve", "Wide overlook as you climb toward treeline."),
 ("Forest Canyon Overlook", "Short paved path to a view down a deep glacial canyon."),
 ("Rock Cut", "The Tundra Communities Trail (hike 9): 1 mi (1.6 km) round trip, 200 ft (61 m), above 12,000 ft (3,660 m)."),
 ("Alpine Visitor Center", "11,796 ft (3,595 m). Exhibits, restrooms, food. Summer only."),
 ("Milner Pass", "The Continental Divide, with Poudre Lake beside the road."),
 ("Farview Curve", "Looks down on the Kawuneeche Valley and the Never Summer Mountains.")]
page('<div class="kicker">Scenic drives</div><h2>Trail Ridge Road and Old Fall River Road</h2>'
 + '<p class="lead">Trail Ridge Road crosses the park in 48 mi (77 km), with 11 mi (18 km) above 11,500 ft (3,500 m). Allow at least half a day with stops. In season, the standard Timed Entry covers it.</p>'
 + '<div class="stops">' + "".join(f"<div><b>{a}</b><p>{b}</p></div>" for a, b in stops) + '</div>'
 + '''<div class="cols" style="margin-top:8pt">
<div><h3>Season</h3><p>Usually opens to through travel in the last week of May and closes for winter in mid or late fall (November 14 in 2025). In winter, you can drive the east side up to Many Parks Curve and the west side up to the Colorado River Trailhead. Road status line: (970) 586-1222, 24 hours.</p></div>
<div><h3>Old Fall River Road</h3><p>An 11 mi (18 km), mostly gravel road with no guardrails, from Horseshoe Park up to the Alpine Visitor Center. One way, uphill only: you cannot drive it down. Speed limit 15 mph. Usually open to cars from early July to early October. No vehicles over 25 ft (7.6 m) and no trailers.</p></div></div>
<div class="warn">On the tundra, stay on the paths. Alpine plants grow very slowly, and one footstep can kill a plant that took years to grow. Up here it is often 20 °F (11 °C) or more colder than in Estes Park, and windy: bring a jacket.</div>''')

# 16 choose your hike
rows = [("East · Bear Lake Road", None),
 ("1 Bear Lake Loop", "0.5 / 0.8", "20 / 6", "Easy", "Very busy"),
 ("2 Nymph Lake", "1 / 1.6", "225 / 69", "Easy", "Very busy"),
 ("2 Dream Lake", "2.2 / 3.5", "425 / 130", "Easy-mod.", "Very busy"),
 ("2 Emerald Lake", "3.6 / 5.8", "605 / 184", "Moderate", "Very busy"),
 ("3 Alberta Falls", "1.6 / 2.6", "160 / 49", "Easy", "Very busy"),
 ("Sprague Lake", "0.8 / 1.3 loop", "Flat", "Easy", "Busy"),
 ("Bierstadt Lake", "2.8 / 4.5", "566 / 173", "Moderate", "Moderate"),
 ("4 Mills Lake", "5.6 / 9", "750 / 229", "Moderate", "Busy"),
 ("East · other areas", None),
 ("Gem Lake (Lumpy Ridge)", "3.2 / 5.1", "1,000 / 305", "Mod.-hard", "Moderate"),
 ("5 Copeland Falls", "0.6 / 1", "15 / 5", "Easy", "Moderate"),
 ("5 Calypso Cascades", "3.6 / 5.8", "700 / 213", "Moderate", "Moderate"),
 ("5 Ouzel Falls", "5.4 / 8.7", "950 / 290", "Moderate", "Moderate"),
 ("6 Eugenia Mine", "2.8 / 4.5", "508 / 155", "Moderate", "Quiet"),
 ("West side and Trail Ridge", None),
 ("7 Adams Falls", "0.6 / 1", "79 / 24", "Easy", "Busy"),
 ("Coyote Valley Trail", "1 / 1.6", "Flat", "Easy", "Moderate"),
 ("8 Lulu City", "7.4 / 11.9", "350 / 107", "Easy-mod.", "Quiet"),
 ("9 Tundra Communities", "1 / 1.6", "200 / 61", "Easy (high)", "Busy")]
page('<div class="kicker">Choose your hike</div><h2>All the hikes on one page</h2>'
 + '<p style="margin-bottom:4pt">Round trip distance and total climb, NPS figures. Crowd levels are for summer and fall weekends: early mornings are always quieter. Numbers match the hike pages.</p>'
 + '<table class="tt"><tr><th>Hike</th><th>mi / km</th><th>Climb ft / m</th><th>Level</th><th>Crowds</th></tr>'
 + "".join(f'<tr class="grp"><td colspan="5">{r[0]}</td></tr>' if r[1] is None else f"<tr><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td></tr>" for r in rows)
 + '</table><p class="small">Gem Lake: from the Lumpy Ridge Trailhead, 1.6 mi (2.6 km) each way, a steady rocky climb to a small lake among granite domes. Good in spring and fall when higher trails are snowy.</p>')

# 17-19 plans
def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"
page('<div class="kicker">Sample plans</div><h2>1 day in the park</h2>' +
 plan("1 day: the best of the east side", "Timed Entry+ Bear Lake Road", [
  ("Before 8", "Enter early. Park at Bear Lake if there is space, or at the Park &amp; Ride and ride the shuttle."),
  ("Morning", "Walk the Bear Lake Loop (hike 1), then Nymph and Dream Lakes, and on to Emerald Lake if you feel good (hike 2)."),
  ("Midday", "Shuttle to Glacier Gorge and the short walk to Alberta Falls (hike 3). Picnic lunch."),
  ("Afternoon", "Drive to Sprague Lake for the flat loop, or rest at the Moraine Park Discovery Center if storms build."),
  ("Evening", "Watch elk in Moraine Park or Horseshoe Park from the roadside pullouts as the light fades.")]) +
 '''<div class="box"><h3 style="margin-top:0">Only have a day and no Bear Lake Road permit?</h3><p style="margin:0">Enter before 9 am and drive Trail Ridge Road to the Alpine Visitor Center, with the Tundra Communities Trail at Rock Cut (page 15). Head back down by early afternoon, then walk to Adams Falls if you continue to Grand Lake, or watch elk in Horseshoe Park on the way back to Estes Park.</p></div>
<h3>Rules of thumb</h3>''' + chk(["One main hike a day, started early", "Easy hikes first, while your body adjusts to the altitude", "Be below treeline by early afternoon in summer", "Book timed entry before anything else in season", "Keep a rainy-day backup (page 20)"]))

page('<div class="kicker">Sample plans</div><h2>2 days in the park</h2>' +
 plan("Day 1: lakes and meadows", "Timed Entry+ Bear Lake Road", [
  ("Morning", "Early start at Bear Lake. Bear Lake Loop, then Nymph, Dream and Emerald Lakes (hikes 1 and 2)."),
  ("Afternoon", "Alberta Falls (hike 3) or Sprague Lake. Visit the Beaver Meadows Visitor Center for maps and ranger tips."),
  ("Evening", "Elk in Moraine Park. Early night in Estes Park.")]) +
 plan("Day 2: over the top", "Timed Entry, or enter before 9 am", [
  ("Morning", "Drive Trail Ridge Road west: Many Parks Curve, Rainbow Curve, Forest Canyon Overlook, the Tundra Communities Trail at Rock Cut (hike 9), the Alpine Visitor Center."),
  ("Midday", "Down to the west side. Lunch in Grand Lake, then the flat Coyote Valley Trail and the Holzwarth Historic Site. Watch for moose."),
  ("Late day", "Adams Falls (hike 7). Sleep in Grand Lake, or drive back over the top before dark if the weather is clear.")]) +
 '<div class="box forest"><h3>Season swap</h3><p style="margin:0">Trail Ridge Road closed (late fall to late May)? Swap day 2 for Wild Basin (hike 5) and Lily Lake on Highway 7, or for Gem Lake at Lumpy Ridge. In winter, try snowshoeing near Bear Lake (page 21).</p></div>'
 + '<h3>Book for this plan</h3>' + chk(["Timed Entry+ Bear Lake Road for day 1", "Timed Entry for day 2, or plan to enter before 9 am", "A room in Estes Park for night 1, and Grand Lake for night 2 if you stay west", "Entrance pass: a 7-day car pass covers both days"]))

page('<div class="kicker">Sample plans</div><h2>3 days in the park</h2>' +
 plan("3 days: east, south and west", "Sleep 2 nights in Estes Park, 1 in Grand Lake", [
  ("Day 1", "Arrive and adjust. Bear Lake Loop and Sprague Lake in the afternoon, elk at dusk in Moraine Park. Pick up a park map and the Junior Ranger booklet at Beaver Meadows."),
  ("Day 2", "Early start in Glacier Gorge: Alberta Falls and on to Mills Lake (hikes 3 and 4). Rest in the afternoon. Evening drive through Horseshoe Park, and Sheep Lakes for bighorns in early summer."),
  ("Day 3", "Wild Basin waterfalls at first light (hike 5), or Emerald Lake if you skipped it. Then cross Trail Ridge Road with the stops on page 15 and finish at Grand Lake with Adams Falls (hike 7).")]) +
 '''<div class="box forest"><h3>Make it your own</h3><p style="margin:0">Love quiet trails? Swap day 3 morning for Lulu City on the west side (hike 8). July or August? Drive up Old Fall River Road (one way, uphill) to the Alpine Visitor Center, and come back down on Trail Ridge Road.</p></div>
<h3>Booking order for this plan</h3>''' + chk(["Timed Entry+ Bear Lake Road for days 1 and 2", "Timed Entry for day 3 (or plan to enter before 9 am)", "Rooms in Estes Park and Grand Lake, or campsites", "Entrance pass (a 7-day car pass covers all 3 days)", "Write the plan on page 27 and leave a copy at home"])
 + '<div class="box"><h3 style="margin-top:0">Pace yourself</h3><p style="margin:0">Three days at altitude add up. Keep one afternoon free for rest, and if anyone in the group has a headache or poor sleep, swap the next hike for an easy lake walk.</p></div>')

# 20 rainy day
page("""<div class="kicker">Plan B</div><h2>Rainy-day and rest-day ideas</h2>
<p class="lead">Storms, smoke or tired legs are part of every mountain trip. Keep one of these in your pocket.</p>
<div class="mini">
<div><h3>Visitor centers</h3><div class="s">East and west</div><p>Beaver Meadows has a park film and a big relief map. The Moraine Park Discovery Center (summer) has nature exhibits and a meadow view from upstairs. Kawuneeche on the west side.</p></div>
<div><h3>Wildlife from the car</h3><div class="s">Dawn and dusk</div><p>Drive slowly through Moraine Park, Horseshoe Park and the Kawuneeche Valley. Pull fully off the road and watch with binoculars.</p></div>
<div><h3>Holzwarth Historic Site</h3><div class="s">West side</div><p>A flat walk to a 1920s dude ranch with original cabins. A gentle outing between showers.</p></div>
<div><h3>Short, low walks</h3><div class="s">Under 1 mi</div><p>Sprague Lake, Coyote Valley or Copeland Falls. Low, close to the car, and easy to cut short if thunder starts.</p></div>
<div><h3>Ranger programs</h3><div class="s">Free</div><p>Talks and walks run all summer, and some in winter. Check the schedule at any visitor center or on nps.gov/romo.</p></div>
<div><h3>Estes Park or Grand Lake</h3><div class="s">Town day</div><p>Gear shops, cafes and a lakeside walk in Grand Lake. Good for buying the rain jacket or traction devices you forgot.</p></div></div>
<div class="warn">Lightning nearby? Do not shelter under trees or in the open at a viewpoint. Get into a hard-top car or a building and wait 30 minutes after the last thunder.</div>
<div class="box"><h3 style="margin-top:0">Wildfire smoke</h3><p style="margin:0">On smoky days, check air quality on airnow.gov and choose short, easy walks or a drive instead of a hard climb.</p></div>""")

# 21 fall and winter
page("""<div class="kicker">Off season</div><h2>Fall and winter visits</h2>
<p class="lead">From late fall to spring the park is quiet, snowy and beautiful. No timed entry is needed, but roads close, days are short and trails are icy.</p>
<div class="cols">
<div><h3>What stays open</h3><p>Bear Lake Road, open all year (traction rules may apply), the east side of Trail Ridge Road to Many Parks Curve and Hidden Valley, the west side to the Colorado River Trailhead, and the Beaver Meadows and Fall River visitor centers. Moraine Park Campground stays open, first-come, first-served.</p>
<h3>Driving</h3><p>When Colorado's traction law is on, cars need snow-rated tires with enough tread, or chains or other approved devices. Check the forecast and road status before you set out.</p></div>
<div><h3>Snowshoe basics</h3>""" + chk(["Most trails above about 9,000 ft can be snowshoed when there is snow", "Rent snowshoes in Estes Park or Grand Lake (not in the park)", "Waterproof boots, gaiters and poles", "Stay off steep snow slopes and away from cornices", "Check the avalanche forecast and ask a ranger", "Ice is thin near lake inlets and outlets: stay off"]) + """</div></div>
<div class="mini">
<div><h3>Hidden Valley</h3><div class="s">Sledding</div><p>The only place in the park where sledding is allowed, on Trail Ridge Road. Plastic sleds only, no metal runners, feet first. Snow can be thin, so check conditions first.</p></div>
<div><h3>Ranger snowshoe walks</h3><div class="s">Mid-January to mid-March</div><p>Ranger-led walks and talks when snow allows. Some need a reservation. Check the park's winter programs page.</p></div></div>
<div class="em"><h3>Short days, cold nights</h3><p>Start by mid-morning, turn around early, and carry a headlamp, a warm hat, gloves and a puffy jacket. Traction devices are worth it on the packed, icy trails near Bear Lake.</p></div>""")

# 22 kids
page("""<div class="kicker">With children</div><h2>Kids and families</h2>
<p class="lead">Mountain lakes, waterfalls, elk by the road and a badge to earn. Keep hikes short, start early and let the kids set the pace at altitude.</p>
<div class="cols">
<div><h3>Junior Ranger program</h3><p>Free booklets at the visitor centers for different ages. Finish the activities, then go back to a ranger to be sworn in and get a badge. In summer, the Junior Ranger Headquarters at Hidden Valley has extra programs.</p>
<h3>Best hikes with kids</h3>""" + chk(["Bear Lake Loop: flat, 0.5 mi (hike 1)", "Sprague Lake: flat loop with a fishing pier", "Nymph or Dream Lake (hike 2)", "Alberta Falls (hike 3)", "Copeland Falls in Wild Basin (hike 5)", "Coyote Valley and Adams Falls on the west side"]) + """</div>
<div><h3>Altitude and kids</h3><p>Children can feel the altitude too, and may not say so. Watch for crankiness, headache, tummy ache or unusual tiredness, and stop, rest and go lower if it does not pass.</p>
<h3>Pack for kids</h3>""" + chk(["Their own water bottle and plenty of snacks", "Sunscreen, sunglasses and a hat", "A warm layer and a rain jacket, even in July", "Binoculars for elk and marmots", "A small treat for the walk back"]) + """</div></div>
<div class="warn">Hold hands near fast streams and waterfalls. The water is ice-cold and rocks by the edge are slippery. Never let children climb on wet rocks for a photo.</div>
<div class="box"><h3 style="margin-top:0">Babies and toddlers</h3><p style="margin:0">Carriers work better than strollers on most trails. The Coyote Valley Trail and the walk to Holzwarth are stroller friendly.</p></div>""")

# 23 accessibility
page("""<div class="kicker">For everyone</div><h2>Accessibility</h2>
<p class="lead">You do not need to hike far to see the best of the park. These places have accessible paths, parking or facilities, according to the NPS.</p>
<table><tr><th>Place</th><th>What to expect</th></tr>
<tr><td><b>Sprague Lake Trail</b></td><td>0.8 mi (1.3 km) loop of packed gravel, dirt and boardwalk, mostly gentle grades. Some rough spots, puddles after rain, snow into June</td></tr>
<tr><td><b>Coyote Valley Trail</b></td><td>About 1 mi (1.6 km) round trip, level, along the Colorado River. Benches and picnic tables</td></tr>
<tr><td><b>Lily Lake and Holzwarth</b></td><td>Lily Lake Trail and the Holzwarth access road: electric mobility devices permitted</td></tr>
<tr><td><b>Moraine Park Discovery Center</b></td><td>Elevator to the upper floor with a meadow view. Accessible restrooms. Summer only</td></tr>
<tr><td><b>Visitor centers</b></td><td>Accessible parking at Beaver Meadows, Fall River, Kawuneeche and the Alpine Visitor Center (summer)</td></tr>
<tr><td><b>Trail Ridge Road</b></td><td>Many overlooks and the views from the car, all the way to 12,183 ft (3,713 m)</td></tr>
<tr><td><b>Campgrounds</b></td><td>Accessible sites at Moraine Park, Glacier Basin, Aspenglen and Timber Creek, plus an accessible backcountry site at Sprague Lake</td></tr></table>
<div class="cols" style="margin-top:4pt">
<div><h3>Shuttles</h3><p>Most park shuttles are wheelchair accessible, with ramps, room for two wheelchairs, and drivers who can help. Tell the driver where you need to get off.</p></div>
<div><h3>Passes and loans</h3><p>US citizens and residents with a permanent disability can get the free Access Pass. Free all-terrain wheelchairs can be reserved in Estes Park: ask a visitor center for details.</p></div></div>
<div class="box"><h3 style="margin-top:0">Plan for the altitude too</h3><p style="margin:0">Thin air affects everyone, on foot or on wheels. Take breaks, drink often and keep a warm layer handy. At the Alpine Visitor Center (11,796 ft / 3,595 m) the toilets are vault toilets across the parking lot, and accessible parking is limited, so arrive early.</p></div>
<p class="small">Details change. For the latest Access Guide, go to nps.gov/romo and search "accessibility", or call (970) 586-1206.</p>""")

# 24 LNT and rules
page("""<div class="kicker">Park rules</div><h2>Leave No Trace and park rules</h2>
<p class="lead">More than four million people visit the park in a busy year. Small habits keep the lakes clean and the wildlife wild.</p>
<div class="diff">
<div><div class="tag">Always</div><h3>Do</h3><ul class="check"><li>Stay on the trail, and walk through mud, not around it</li><li>Pack out all trash, including food scraps and peels</li><li>Use restrooms at trailheads before you start</li><li>Give wildlife space (page 10)</li><li>Let uphill hikers keep their pace</li></ul></div>
<div><div class="tag">Never</div><h3>Don't</h3><ul class="check"><li>Pick flowers, take rocks or antlers</li><li>Walk on the tundra off the paths</li><li>Feed any animal, even a chipmunk</li><li>Build rock stacks or carve into trees</li><li>Play music out loud on the trail</li></ul></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Pets</h3><p>Pets are not allowed on any park trail, tundra or meadow, or in visitor centers. Leashed pets (6 ft / 1.8 m leash at most) may go on roads, in parking lots, campgrounds and picnic areas. Do not leave a pet in a hot car. Service animals are allowed; emotional support animals are not service animals.</p></div>
<div><h3>Drones</h3><p>Launching or flying drones is not allowed in US national parks, including Rocky Mountain.</p>
<h3>Water</h3><p>Do not drink from lakes or streams without treating it: boil it, or use a filter that removes Giardia.</p></div></div>
<div class="box forest"><h3>Fires</h3><p style="margin:0">Fires only in the grates at campgrounds and picnic areas, and only when there is no fire ban. Check the current fire rules at a visitor center.</p></div>""")

# 25 packing
page("""<div class="kicker">Checklist</div><h2>Packing list for the park</h2>
<div class="cl">
<div><h3>For every hike (the Ten Essentials)</h3>""" + chk(["Map, plus the NPS App with offline maps", "Headlamp with fresh batteries", "Sun protection: hat, sunglasses, sunscreen", "First aid kit, with blister care", "Knife or multi-tool", "Fire starter (for emergencies only)", "Emergency shelter: a space blanket", "Extra food", "Extra water, plus a filter or tablets", "Extra layer: warm top and rain jacket"]) + """
<h3>For this park</h3>""" + chk(["Timed entry reservation (screenshot it)", "Park pass and a card (no cash)", "Traction devices (October to June)", "Binoculars for elk, moose and bighorns"]) + """</div>
<div><h3>Layers for altitude</h3>""" + chk(["Moisture-wicking base layer (no cotton)", "Fleece or light puffy jacket", "Waterproof rain jacket with a hood", "Hiking pants or zip-offs", "Warm hat and light gloves, even in summer", "Broken-in hiking shoes with good grip", "Hiking socks, plus a dry spare pair"]) + """
<h3>For the car</h3>""" + chk(["More water and snacks for the drive", "Warm jacket for Trail Ridge Road", "Phone charger and power bank", "Printed maps and this guide", "Small trash bag: pack out everything", "Dry clothes and shoes for after"]) + """</div></div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Dress like an onion</h3><p style="margin:0">A cold start at 7 am, a warm climb at 10 am and a windy, wet lake at noon are all normal on the same hike. Start a little cold, take a layer off before you sweat, and put one back on when you stop.</p></div>""")

# 26 booking checklist + sources
page("""<div class="kicker">Before you go</div><h2>Booking checklist and dates to remember</h2>
<table class="spots"><tr><th>Task</th><th>When</th><th style="text-align:center">Done</th></tr>
<tr><td><b>Pick your dates</b></td><td class="small">Check the timed entry season and road openings for your year</td><td class="b"></td></tr>
<tr><td><b>Campsite</b></td><td class="small">Recreation.gov, up to 6 months before your stay</td><td class="b"></td></tr>
<tr><td><b>Rooms in Estes Park or Grand Lake</b></td><td class="small">As early as you can for summer and September</td><td class="b"></td></tr>
<tr><td><b>Flights and rental car</b></td><td class="small">Denver International (DEN)</td><td class="b"></td></tr>
<tr><td><b>Timed entry, first try</b></td><td class="small">8 am Mountain Time on the 1st of the month before your visit</td><td class="b"></td></tr>
<tr><td><b>Timed entry, second try</b></td><td class="small">7 pm Mountain Time the night before each day</td><td class="b"></td></tr>
<tr><td><b>Hiker Shuttle tickets</b></td><td class="small">Recreation.gov, if you will ride from Estes Park</td><td class="b"></td></tr>
<tr><td><b>Entrance pass</b></td><td class="small">Buy online or at the gate. Annual passes by mail take weeks</td><td class="b"></td></tr>
<tr><td><b>Download offline maps and this guide</b></td><td class="small">At home on Wi-Fi</td><td class="b"></td></tr>
<tr><td><b>Check alerts, roads and the forecast</b></td><td class="small">The week before, and each morning</td><td class="b"></td></tr></table>
<h3>Official sources</h3>
<div class="mini">
<div><h3>Rocky Mountain National Park</h3><div class="s">nps.gov/romo</div><p>Alerts, timed entry, trail conditions, maps. Information Office (970) 586-1206.</p></div>
<div><h3>Reservations</h3><div class="s">recreation.gov</div><p>Timed entry, campgrounds, Hiker Shuttle tickets and wilderness permits.</p></div>
<div><h3>Roads</h3><div class="s">(970) 586-1222 · cotrip.org</div><p>Trail Ridge Road status line (24 hours) and Colorado highways.</p></div>
<div><h3>Weather and air</h3><div class="s">weather.gov · airnow.gov</div><p>Forecasts, storm warnings and wildfire smoke.</p></div></div>
<p class="small">Facts in this guide were checked against nps.gov in November 2026. The official sources always win.</p>""")

# 27 trip planner
page(f"""<div class="kicker">Planner</div><h2>Trip planner</h2>
<div class="dp"><div class="f2"><div class="fl">Dates</div><div class="fl">Number of people</div><div class="fl">Sleeping in</div><div class="fl">Entrance pass</div></div></div>
<div class="lab">Timed entry reservations</div>
<table class="spots"><tr><th>Date</th><th>Type (Timed Entry or Timed Entry+)</th><th>Entry window</th><th style="text-align:center">Booked</th></tr>
""" + "".join('<tr><td style="height:30pt"></td><td></td><td></td><td class="b"></td></tr>' for _ in range(3)) + """</table>
<div class="lab">Day by day</div>
<table><tr><th style="width:0.9in">Day</th><th>Main hike or drive</th><th style="width:1.2in">Start by</th><th style="width:1.4in">Backup plan</th></tr>
""" + "".join(f'<tr><td style="height:44pt"><b>Day {d}</b></td><td></td><td></td><td></td></tr>' for d in range(1, 5)) + f"""</table>
<div class="lab">Left with someone at home</div>
<div class="f2"><div class="fl">Name and phone</div><div class="fl">Car and plate</div><div class="fl">Trailheads we plan to use</div><div class="fl">Call for help if no word by</div></div>
<div class="lab">Notes</div>""" + lines(3) + """
<div class="opts" style="margin-top:10pt"><span>Timed entry booked</span><span>Pass bought</span><span>Offline maps</span><span>Layers packed</span><span>Traction devices</span><span>Plan left at home</span></div>""")

# 28-29 hike log
def logbox():
    return f"""<div class="log"><div class="f2"><div class="fl">Date</div><div class="fl">Trail</div><div class="fl">Distance <span class="u"><b></b>mi / km</span></div><div class="fl">Climb <span class="u"><b></b>ft / m</span></div><div class="fl">Start and finish time</div><div class="fl">Weather</div></div>
<div class="lab">Wildlife and flowers we saw</div>{lines(2, 26)}
<div class="lab">Best moment</div>{lines(3, 26)}
<div class="opts"><span>Easy</span><span>Just right</span><span>Hard</span><span>Felt the altitude</span><span>Would do it again</span></div></div>"""
for k in (1, 2):
    page(f'<div class="kicker">Hike log</div><h2>Our hikes, part {k}</h2>' + logbox() + logbox())

# 30 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 95 L40 60 L60 75 L100 18 L120 40 L140 28 L200 90" stroke="#F5F1EA" stroke-width="4"/><path d="M100 18 L90 34 L100 30 L108 38 L114 33" stroke="#F5F1EA" stroke-width="3"/></svg>
<h2 style="margin-top:22pt">Enjoy the Rockies</h2>
<p>Thank you for choosing a HikeSupply guide. Book your timed entry first, start every hike early, take the first day slow, and give the elk plenty of room.</p>
<p style="margin-top:10pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">Plan your next adventure</p>
<div class="bkcards" style="grid-template-columns:1fr 1fr 1fr;width:6.4in"><div><b>US National Parks Hiking Tracker</b><span>Log every park you visit, all 64 plus Canada</span></div><div><b>Trail Ready</b><span>8-week beginner hiking training plan</span></div><div><b>Park trip guides</b><span>Smokies, Utah's Mighty 5, Yellowstone, Grand Canyon</span></div></div>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">General trip planning information only. Timed entry, roads, closures, fees and rules change: always check nps.gov/romo and ask a ranger before you hike. Hike within your ability and turn back when in doubt. Not affiliated with the National Park Service. For personal use only. COVERCREDIT</p>""", "back")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip() if os.path.exists(os.path.join(HERE, "cover-credit.txt")) else ""
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
