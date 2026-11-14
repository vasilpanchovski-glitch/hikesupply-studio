"""Generates index.html for p20 (Acadia National Park — Trip Planning Guide). Run: python3 gen.py
Same look as p11/p15/p16/p18 (base.css + extra.css + more.css). Facts checked on November 14, 2026 against nps.gov/acad:
fees.htm (2026 fees, cashless from April 15, 2026), vehicle_reservations.htm (Cadillac Summit Road, May 20 to Oct 25, 2026,
$6, 30% at 90 days and 70% at 2 days, 10 am ET), hours.htm (Park Loop Road Apr 15 to Dec 1, campground seasons 2026),
camping.htm (90% six months ahead on the 1st at 10 am ET, 10% 14 days ahead, Duck Harbor April 1), news 20260414 and 20260302
(peregrine closures from March 1), the NPS hike pages (thingstodo) for distances and times, cr_guide.htm (carriage roads),
exploreacadia.com (2026 Island Explorer season). Summit heights from USGS / NPS. Drive times are rough and marked as such."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Acadia National Park"
CHECKED = "November 2026"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))

MORE = open(os.path.join(HERE, "more.css")).read() + ".cover.photo .cphoto{background-position:center 70%}"

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 230 C60 200 110 150 170 140 C230 130 260 175 300 170 C350 165 380 120 470 150" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M0 262 C80 255 140 270 220 262 C300 254 380 268 470 260" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M0 292 C90 286 160 298 250 290 C330 284 400 296 470 290" stroke="#F5F1EA" stroke-width="2"/>
<path d="M60 240 L60 205 M48 214 L60 192 L72 214 M48 228 L60 205 L72 228 M400 220 L400 180 M386 190 L400 166 L414 190 M386 206 L400 182 L414 206" stroke="#F5F1EA" stroke-width="2.5"/>
<circle cx="360" cy="70" r="22" stroke="#F5F1EA" stroke-width="3"/>
</svg></div>
<div><h1>Acadia National Park</h1><p class="sub">A trip planning guide for first-time visitors. When to go, what to book (Cadillac Summit Road, campgrounds), the free Island Explorer bus, 1, 2 and 3-day plans, and 12 day hikes from easy ocean walks to the iron-rung Beehive and Precipice.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>12 day hikes</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">Acadia is small for a national park, but it packs in a lot: granite mountains that drop to the sea, quiet ponds, sand and cobble beaches, and 45 miles of old carriage roads. It is also one of the busiest parks in the country, on an island with narrow roads. Good planning is mostly about timing and parking.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["The park's three parts in plain words", "When to go, season by season", "Passes, fees and the Cadillac reservation", "The free Island Explorer bus", "Where to stay, and when to book", "Sample 1, 2 and 3-day plans", "Rainy-day and low-tide plans", "Sunrise on Cadillac Mountain", "12 day hikes, easy to iron rungs", "Carriage roads, safety, wildlife", "Packing list, planners and budget"]) + f"""</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers, families, and anyone driving up from New England or over from the Maritimes.</p>
<h3>How to read the hikes</h3><p>Distances and times are the National Park Service's own, in miles and kilometers. The level is ours:</p>
<table class="tt"><tr><td>Easy</td><td>Short, little climb, fine for most families</td></tr><tr><td>Moderate</td><td>A real climb on rock and steps</td></tr><tr><td>Hard</td><td>Steep, long or both</td></tr><tr><td>Very hard</td><td>Iron rungs, ladders, cliff exposure</td></tr></table></div></div>
<div class="box forest"><h3>Checked against nps.gov in {CHECKED}</h3><p style="margin:0">Acadia changes its reservation dates, fees, road openings and trail closures from year to year. Dates in this guide are the 2026 ones. Before you book, and again before you go, check the official pages on page 29 and the park's alerts at go.nps.gov/AcadiaAlerts.</p></div>
<h3>Print it or keep it offline</h3>
<p>Cell service is patchy on trails and summits. Save this PDF and the NPS App's offline Acadia content to your phone before you leave, or print the pages you need. Pages 25 to 28 are made for printing.</p>""")

# 3 at a glance
areas = [
 ("Mount Desert Island", "Most of the park", "The main event: Cadillac Mountain, the Park Loop Road, Sand Beach, Jordan Pond, the carriage roads and most of the hikes. Bar Harbor is the big town. The island is linked to the mainland by a bridge at Trenton."),
 ("The quiet side", "West of Somes Sound", "Southwest Harbor, Bass Harbor Head Lighthouse, Echo Lake, Ship Harbor and Acadia Mountain. Fewer people, same granite and sea."),
 ("Schoodic Peninsula", "About 1 hour's drive east", "The park's only part on the mainland. A one-way loop road past wave-washed ledges at Schoodic Point, with a campground and bike paths. Much quieter than the island."),
 ("Isle au Haut", "By mailboat from Stonington", "A remote island with rugged coastal trails and the small Duck Harbor campground. A full-day trip, for people who want solitude."),
]
page('<div class="kicker">The park</div><h2>Acadia at a glance</h2><p class="lead">The park is a patchwork of land mixed with private towns and villages. You drive in and out of the park many times a day. The 27-mile Park Loop Road ties the main sights together.</p>'
 + '<div class="stops">' + "".join(f"<div><b>{a}<small>{s}</small></b><p>{b}</p></div>" for a, s, b in areas) + '</div>'
 + '<h3>How far is it?</h3><table><tr><th>From</th><th>To Bar Harbor, roughly</th></tr><tr><td>Bangor, Maine (nearest big airport)</td><td>About 50 mi / 80 km, 1 hour</td></tr><tr><td>Portland, Maine</td><td>About 175 mi / 280 km, 3 to 3.5 hours</td></tr><tr><td>Boston, Massachusetts</td><td>About 280 mi / 450 km, 5 hours or more</td></tr><tr><td>Saint John, New Brunswick</td><td>About 180 mi / 290 km, 3.5 to 4 hours plus the border</td></tr></table>'
 + '<p class="small">Rough summer drive times without traffic. Check your route the day before. Coming from Canada? Bring passports for everyone, and check what food you may bring across.</p>'
 + '<div class="box forest" style="margin-top:6pt"><h3>Three things that surprise first-timers</h3><p style="margin:0">There are no hotels inside the park: you sleep in a campground or in a nearby town. Parking at the famous stops fills by mid-morning in summer. And the summit road up Cadillac Mountain needs its own timed reservation for most of the year (page 6).</p></div>')

# 4 when to go
months = [
 ("Dec to March", "Most of the Park Loop Road is closed to cars (from December 1). Snow and ice on trails, quiet carriage roads for skiing and snowshoeing. Many town businesses close. Campgrounds are closed: no winter camping."),
 ("April", "The Park Loop Road opens April 15. Mud season: carriage roads close for the thaw. Cold, wet and quiet. Some peregrine falcon cliffs and trails closed."),
 ("May, June", "The park wakes up. Campgrounds and visitor centers open in May. Cool days, black flies and mosquitoes, fog some mornings. The Island Explorer starts (May 20 in 2026)."),
 ("July, August", "Peak season: warm days, all bus routes running, very busy parking lots. Sea water is still cold, about 55°F (13°C) at Sand Beach."),
 ("September", "Calmer after Labor Day, warm days, cool nights. Still busy on weekends and cruise ship days in Bar Harbor."),
 ("October", "Fall color, usually best in early to mid-October, and big crowds to see it. Cold mornings on the summits. Many services wind down after Columbus Day / Indigenous Peoples' Day."),
 ("November", "Quiet, cold, short days, hunting season outside the park. The Park Loop Road closes for the winter on December 1."),
]
page('<div class="kicker">Timing</div><h2>When to go: season by season</h2><p class="lead">Summer and fall color bring the crowds. Late May, June and September are the sweet spots for many hikers: everything is open and the lots are a little calmer.</p>'
 + '<table class="months">' + "".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in months) + '</table>'
 + '<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr><tr><td>Everything open, warmest weather</td><td>July and August (book early)</td></tr><tr><td>Fall color</td><td>Early to mid-October</td></tr><tr><td>Fewer people, mild weather</td><td>Weekdays in June or September</td></tr><tr><td>Snowy carriage roads, empty trails</td><td>January and February</td></tr></table>'
 + '<p class="small" style="margin-top:6pt">Opening dates change each year. Check "Operating Hours and Seasons" on nps.gov/acad for your dates.</p>')

# 5 passes and fees
page("""<div class="kicker">Entry</div><h2>Passes and fees</h2>
<p class="lead">You need a park pass all year, even in winter. Buy it before you go and keep it on your windshield. A Cadillac Summit Road reservation is a separate thing (page 6).</p>
<h3>Entrance fees (2026)</h3>
<table class="fee"><tr><th>Pass (7 days)</th><th>Price</th><th>Covers</th></tr>
<tr><td>Private vehicle</td><td>$35</td><td>The car and everyone in it</td></tr>
<tr><td>Motorcycle</td><td>$30</td><td>Up to 2 motorcycles, 4 people</td></tr>
<tr><td>Per person</td><td>$20</td><td>On foot or bike. 15 and under free</td></tr></table>
<table class="fee"><tr><th>Annual passes</th><th>Price</th><th>Covers</th></tr>
<tr><td>Acadia annual pass</td><td>$70</td><td>This park, 12 months. US citizens and residents</td></tr>
<tr><td>America the Beautiful</td><td>$80 / $250</td><td>All national parks, one year. US residents / non-residents</td></tr>
<tr><td>Non-resident fee</td><td>$100 each</td><td>Visitors 16+ from outside the US, on top of the entrance fee, unless you hold an annual pass</td></tr></table>
<div class="cols">
<div><h3>Where to buy</h3><p>Online (go.nps.gov/AcadiaPass or Recreation.gov), or at fee machines and visitor centers in the park. Since April 15, 2026 the park is cashless: card or mobile pay only.</p></div>
<div><h3>Visiting from Canada?</h3><p>You count as a non-resident, so the $100 fee per person 16+ applies, unless you buy the $250 non-resident annual pass. Do the sums for your group on page 27.</p></div></div>
<div class="box forest"><h3>Free entrance days</h3><p style="margin:0">A few days a year are free for US citizens and residents. The Cadillac reservation fee still applies on those days. Check the list for your year on nps.gov/acad/planyourvisit/fees.htm.</p></div>""")

# 6 reservations
page("""<div class="kicker">Book ahead</div><h2>Reservations: Cadillac and campgrounds</h2>
<div class="permit">
<div class="plus"><small>Cadillac Summit Road</small><h3>Vehicle reservation</h3><div class="hrs">$6 per car</div><div class="hl">May 20 to Oct 25 in 2026</div><p>Needed to drive up Cadillac Mountain in season, on top of your park pass. Sold only on Recreation.gov, never at the park. Sunrise and daytime slots.</p></div>
<div><small>Campgrounds</small><h3>Campsite</h3><div class="hrs">Recreation.gov</div><div class="hl">Up to 6 months ahead</div><p>Blackwoods, Seawall and Schoodic Woods: all sites are reserved in advance. No backcountry camping and no overnight parking anywhere in the park.</p></div></div>
<table class="dep"><tr><th>What</th><th>How it opens (2026 rules)</th></tr>
<tr><td><b>Cadillac, early</b></td><td>30 percent of slots go on sale 90 days ahead, at 10 am Eastern.</td></tr>
<tr><td><b>Cadillac, late</b></td><td>The other 70 percent go on sale 2 days ahead, at 10 am Eastern. Good for flexible trips.</td></tr>
<tr><td><b>Campgrounds</b></td><td>90 percent open 6 months ahead, a month at a time, on the 1st at 10 am Eastern. The other 10 percent open 14 days ahead.</td></tr>
<tr><td><b>Duck Harbor</b></td><td>Isle au Haut's 5 lean-tos: the whole season opens April 1 at 10 am.</td></tr></table>
<p class="small">Walking, biking or riding a taxi up Cadillac? No reservation needed. The Island Explorer does not go up. RVs, trailers and vehicles over 21 ft (6.4 m) are not allowed on the summit road. Save your QR code offline.</p>
<h3>Booking tracker (fill in)</h3>
<table class="spots"><tr><th>What</th><th>Opens on</th><th>Alarm set</th><th>Confirmation no.</th><th style="text-align:center">Booked</th></tr>"""
 + "".join(f'<tr><td style="height:24pt"><b>{a}</b></td><td></td><td></td><td></td><td class="b"></td></tr>' for a in ["Campsite or lodging", "Cadillac sunrise", "Cadillac daytime", "Boat tour / ferry"]) + "</table>")

# 7 getting around
page("""<div class="kicker">Getting around</div><h2>The Island Explorer, parking and bikes</h2>
<p class="lead">Parking is the hardest part of a summer day in Acadia. The best trick in the park is free: leave the car and ride the Island Explorer.</p>
<div class="bk">
<div><b>Island Explorer</b><p>Fare-free propane buses to Bar Harbor, the Park Loop Road, Jordan Pond, Sand Beach, campgrounds and villages. You still need a park pass. In 2026 some routes started May 20 and the full service June 23, running into mid-October.</p></div>
<div><b>Where to park for it</b><p>Free all-day parking at the Acadia Gateway Center in Trenton, before the bridge to the island. Buses into the park from there.</p></div>
<div><b>Bikes on the bus</b><p>Racks for six bikes on each bus. No e-bikes, tandems or fat tires on the racks. Leashed or crated pets may ride, but not on seats.</p></div>
<div><b>Not on the bus</b><p>Cadillac Summit Road, the Precipice trailhead and Ship Harbor have no bus service. Plan a car, or a bike, for those.</p></div>
</div>
<div class="em"><h3>Summer parking</h3><p>Sand Beach, Jordan Pond and the Bubbles fill early, often by 9 or 10 am. Arrive before 8 am, come after 4 pm, or take the bus. Never park on the grass or the roadside where signs say no: it blocks traffic and gets ticketed or towed.</p></div>
<div class="cols">
<div><h3>Driving tips</h3>""" + chk(["Part of the Park Loop Road is one-way: you can't turn back", "Parking in the right lane of the one-way part is allowed only where signed", "Fill the tank in Bar Harbor or Ellsworth", "Watch for cyclists and walkers on the road"]) + """</div>
<div><h3>Bikes</h3><p>Bikes go on the Park Loop Road and the carriage roads, never on hiking trails. Only Class 1 e-bikes (pedal assist up to 20 mph) are allowed on carriage roads. Rent in Bar Harbor; Maine law requires helmets under 16.</p></div></div>
<p class="small">Bus routes and dates change every year: check exploreacadia.com before you plan around it.</p>""")

# 8 where to stay
page("""<div class="kicker">Planning</div><h2>Where to stay</h2>
<p class="lead">There is no lodge or hotel inside Acadia. Pick a campground or a town, and book early for July, August and October.</p>
<div class="bk">
<div><b>Blackwoods</b><p>Park campground on the east side of the island, close to Cadillac, Sand Beach and the Ocean Path. Open May 1 to October 19 in 2026.</p></div>
<div><b>Seawall</b><p>Park campground on the quiet side, near Ship Harbor and Bass Harbor. Open May 20 to October 12 in 2026.</p></div>
<div><b>Schoodic Woods</b><p>Park campground on the Schoodic Peninsula, the quietest of the three. Open May 20 to October 12 in 2026.</p></div>
<div><b>Bar Harbor</b><p>The busy hub: inns, hotels, food, bus routes, the Bar Island land bridge. Most choice, highest summer prices.</p></div>
<div><b>The quiet side</b><p>Southwest Harbor, Northeast Harbor, Bass Harbor: smaller villages, calmer evenings, a longer drive to Sand Beach.</p></div>
<div><b>Off the island</b><p>Trenton and Ellsworth: often cheaper, near the Gateway Center bus park-and-ride. Winter Harbor for Schoodic.</p></div></div>
<h3>Compare your options (fill in)</h3>
<table class="spots"><tr><th style="width:1.5in">Place</th><th>Price per night</th><th>Drive to first hike</th><th>Bus nearby?</th><th>Notes</th></tr>"""
 + "".join('<tr><td style="height:28pt"></td><td></td><td></td><td></td><td></td></tr>' for _ in range(4)) + """</table>
<div class="box"><h3 style="margin-top:0">Rule of thumb</h3><p style="margin:0">Bed first, then Cadillac reservations, then everything else. Firewood: buy it locally, never bring it from home (it can carry invasive insects).</p></div>""")

def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"

# 9 one day
page('<div class="kicker">Sample plans</div><h2>1 day: the Park Loop Road highlights</h2>' +
 plan("A full day on the east side", "Late May to October", [
  ("Before 8", "Start at Sand Beach before the lot fills. Walk the Ocean Path (hike 1) to Thunder Hole and Otter Cliffs and back."),
  ("Late morning", "Drive or bus to Jordan Pond. Walk the easy east side of the Jordan Pond Path (hike 2), or the Bubbles (hike 5) for a view over the pond."),
  ("Lunch", "The Jordan Pond House (seasonal) for its popovers, or a picnic. Keep food packed up and never feed wildlife."),
  ("Afternoon", "Your daytime Cadillac slot: drive the summit road and walk the short summit loop. Layers: it is windy up there."),
  ("Evening", "Dinner in Bar Harbor. At low tide, walk out on the Bar Island land bridge (hike 3), but watch the time.")]) +
 '<div class="box forest"><h3>No Cadillac reservation?</h3><p style="margin:0">Hike up instead (Cadillac North Ridge, hike 8), or swap the afternoon for Sieur de Monts and the Wild Gardens of Acadia, near the start of the Park Loop Road.</p></div>'
 + '<h3>Rules of thumb</h3>' + chk(["One main hike, started early", "Park once, then use the bus and your feet", "Check the tide table and the Cadillac time the night before", "Fill the tank and pack lunch before you enter"])
 + '<div class="em"><h3>Leave time to look</h3><p>Some of Acadia\'s best moments are sitting on a warm granite ledge, watching the sea. Plan less than you think you can do.</p></div>')

# 10 two days
page('<div class="kicker">Sample plans</div><h2>2 days: east side and quiet side</h2>' +
 plan("Mountains, ponds and lighthouses", "1 or 2 nights", [
  ("Day 1 AM", "Sand Beach and Great Head (hike 7), then the Ocean Path to Thunder Hole (hike 1)."),
  ("Day 1 PM", "Jordan Pond and the Bubbles (hikes 2 and 5). Cadillac at sunset with a daytime slot that ends near sunset, or Bar Island at low tide."),
  ("Day 2 AM", "Cross Somes Sound to the quiet side. Acadia Mountain (hike 9) for views over the sound, or Ship Harbor (hike 4) for an easy walk."),
  ("Day 2 PM", "Echo Lake Beach for a swim in fresher water, then Bass Harbor Head Lighthouse. Small lot: be patient or come late in the day.")]) +
 '''<div class="cols"><div><h3>Booking order</h3>''' + chk(["One night or two, near Bar Harbor or the quiet side", "One 7-day vehicle pass covers both days", "Cadillac slot, 90 days or 2 days ahead", "Tide times for Bar Island and tide pools"]) + '''</div>
<div><h3>Strong hikers?</h3><p>Swap day 1 morning for the Beehive (hike 11), going down by the Bowl Trail, and day 2 for Penobscot and Sargent from Jordan Pond (hike 10).</p></div></div>
<div class="box"><h3 style="margin-top:0">Pace yourself</h3><p style="margin:0">Granite steps are hard on knees going down. Put the big hike early in the day and in the trip, and keep an easy afternoon after it.</p></div>''')

# 11 three days
page('<div class="kicker">Sample plans</div><h2>3 days: the island and Schoodic</h2>' +
 plan("The whole park, slowly", "2 or 3 nights", [
  ("Day 1", "Arrive. Ocean Path (hike 1) late in the day when the lots empty. Low tide? Bar Island (hike 3)."),
  ("Day 2", "Sunrise on Cadillac (page 13). Rest. Jordan Pond Path (hike 2) and the Bubbles (hike 5). A bike ride on the carriage roads (page 20)."),
  ("Day 3", "Drive to the Schoodic Peninsula, about an hour. The one-way loop road, Schoodic Point at mid-tide, and the bike paths. Quiet and wild."),
  ("Extra day", "The quiet side: Ship Harbor and Acadia Mountain (hikes 4 and 9), Bass Harbor Head Lighthouse.")]) +
 '''<div class="cols"><div><h3>Book for this plan</h3>''' + chk(["2 or 3 nights on the island", "A Cadillac sunrise slot (90 days or 2 days ahead)", "Bike rental for the carriage roads", "One 7-day vehicle pass"]) + '''</div>
<div><h3>Make it your own</h3><p>Small children? Skip sunrise and add tide pools at low tide. Fall trip? Do the carriage roads by bike in the morning for the color.</p></div></div>
<div class="em"><h3>Schoodic Point and the waves</h3><p>Storm swells from far out at sea can throw big waves over the ledges even on a sunny day. Stay well back from wet, dark rock and never turn your back on the ocean.</p></div>''')

# 12 rainy day and low tide
page("""<div class="kicker">Sample plans</div><h2>Rainy-day and low-tide plans</h2>
<div class="diff">
<div><div class="tag">Rainy or foggy day</div><h3>What to do</h3><ul class="check"><li>Skip the summits and all rung and ladder trails: wet granite is very slippery</li><li>Walk a carriage road loop, wide gravel and no ledges (page 20)</li><li>The Jordan Pond east side, or Ship Harbor in the mist</li><li>Sieur de Monts, the Nature Center and the Wild Gardens (seasonal)</li><li>Abbe Museum in Bar Harbor, on the Wabanaki people of Maine</li><li>Sand Beach and Otter Cliffs from the overlooks in fog</li></ul></div>
<div><div class="tag">Low tide</div><h3>Plan around it</h3><ul class="check"><li>The tide here rises and falls about 10 ft (3 m) or more, twice a day</li><li>Bar Island land bridge: from 1.5 hours before to 1.5 hours after low tide</li><li>Tide pools at Ship Harbor and Wonderland: go on a falling tide</li><li>Thunder Hole booms best 1 to 2 hours before high tide</li><li>Tide pools: look, don't take, and step only on bare rock</li><li>Write the times on your day planner (page 25)</li></ul></div></div>
<h3>Today's tides (fill in)</h3>
<table class="spots"><tr><th>Date</th><th>Low tide</th><th>High tide</th><th>Plan</th></tr>"""
 + "".join('<tr><td style="height:22pt"></td><td></td><td></td><td></td></tr>' for _ in range(3)) + """</table>
<div class="warn"><b>Do not get stranded on Bar Island.</b> Once the sea covers the bar, the NPS says it is about nine hours until you can walk back. Never try to wade across a covered bar: the current is strong and the water cold. Never park on the bar.</div>
""")

# 13 sunrise on cadillac
page("""<div class="kicker">Big moment</div><h2>Sunrise on Cadillac Mountain</h2>
<p class="lead">At 1,530 ft (466 m), Cadillac is the highest point on the North Atlantic coast of the US, and one of the first places in the country to see the sun rise for part of the year. It is also very popular.</p>
<div class="mini">
<div><h3>Book it</h3><div class="s">Sunrise slot, $6</div><p>In season you need a sunrise vehicle reservation (one per vehicle every 7 days). 30 percent open 90 days ahead, the rest 2 days ahead, at 10 am Eastern.</p></div>
<div><h3>Or walk up</h3><div class="s">No reservation on foot</div><p>Fit hikers can climb the North Ridge (hike 8) in the dark with headlamps. Allow plenty of time and know the way down.</p></div>
<div><h3>It is cold</h3><div class="s">Even in July</div><p>Wind on the summit makes it feel much colder than town. Bring a warm jacket, hat, gloves, a blanket and a hot drink.</p></div>
<div><h3>Clouds happen</h3><div class="s">Have a plan B</div><p>Fog can hide the sunrise. Check the forecast; the summit walk is still lovely after the cloud lifts.</p></div></div>
<h3>Sunrise checklist</h3>""" + chk(["Reservation QR code saved offline", "Park pass on the windshield", "Alarm 90 minutes before sunrise, plus drive time", "Headlamp for the dark parking lot", "Warm layers, hat, gloves, blanket", "Breakfast and a thermos"]) + """
<div class="em"><h3>On the summit</h3><p>Stay on the paved paths and bare rock: the thin plants on the summit take years to grow back. Keep your voice low for the people around you.</p></div>""")

# hike cards
def card(no, name, where, level, stats, see, tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    st = "".join(f'<div><b>{a}</b><span>{b}</span><em>{c}</em></div>' for a, b, c in stats)
    return f'''<div class="hk"><div class="top"><div><small>Hike {no}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st">{st}</div>
<p><span class="lb">Where</span>{where}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Good to know</span>{tip}</p>{nt}</div>'''

page('<div class="kicker">Hikes · Easy</div>' +
 card(1, "Ocean Path", "Sand Beach, upper parking lot (walk up the steps behind the restrooms). Island Explorer stops at Sand Beach, Thunder Hole and Otter Point.", "Easy",
      [("One way", "2.2 mi", "3.5 km"), ("Climb", "Gentle", "A few steps"), ("Time", "1 to 2 hours", "One way, NPS"), ("Best", "Early or late", "Fewer people")],
      "The classic Acadia walk along pink granite cliffs: Sand Beach, Thunder Hole, Monument Cove and the 110 ft (34 m) Otter Cliffs. Take the bus back, or walk out and back.",
      "The first 0.7 mi (1.1 km) is wide and gentle; past Thunder Hole it gets narrower and rougher. Stay on the path and away from wet, dark rock at the water's edge.",
      "Thunder Hole is loudest 1 to 2 hours before high tide. In big swells, stay off the lower rocks: waves have swept people away.") +
 card(2, "Jordan Pond Path", "Jordan Pond boat launch, North Lot just before the Jordan Pond House. Island Explorer stops at Jordan Pond House.", "Easy to moderate",
      [("Loop", "3.3 mi", "5.3 km"), ("Climb", "Flat", "Rough west side"), ("Time", "1 to 3 hours", "NPS"), ("Best", "All year", "Calm mornings")],
      "A loop around a clear glacial pond with the two rounded Bubbles at its north end. Boardwalk, gravel and rocks right at the water's edge.",
      "The east side is easy. The west side is much harder: stepping stones, boulders and uneven footing. Start on the east side so you can turn back if needed.",
      "Jordan Pond is drinking water: no swimming, wading or dogs in the water. Stay on the boardwalk to protect the plants."))

page('<div class="kicker">Hikes · Easy</div>' +
 card(3, "Bar Island", "Bridge Street in downtown Bar Harbor. Park on West Street, never on the bar or Bridge Street. Island Explorer to Bar Harbor.", "Easy",
      [("Round trip", "1.9 mi", "3.1 km"), ("Climb", "Gentle", "Through forest"), ("Time", "45 to 90 min", "NPS"), ("Window", "Low tide ±1.5 h", "Check the tide")],
      "A walk across a gravel bar that appears only at low tide, then up through the woods to a lookout back over Bar Harbor and the mountains.",
      "Cross only from 1.5 hours before to 1.5 hours after low tide. Note the time you must be back on the bar and set a phone alarm.",
      "Miss the window and you wait about nine hours on the island. Never wade across a covered bar.") +
 card(4, "Ship Harbor", "Ship Harbor parking lot on Route 102A (Seawall Road), south of Southwest Harbor. No bus service.", "Easy",
      [("Figure 8", "1.3 mi", "2.1 km"), ("Climb", "Mostly flat", "A few steps"), ("Time", "30 to 60 min", "NPS"), ("Best", "Low tide", "Tide pools")],
      "A gentle figure-8 through spruce woods to pink granite ledges where the harbor meets the open sea. Great for families and birders.",
      "The first loop is accessible. Roots and rocks are slippery when wet. Walk the middle of the trail and do a tick check after.",
      "Pair it with Bass Harbor Head Lighthouse, a few minutes away."))

page('<div class="kicker">Hikes · Moderate</div>' +
 card(5, "The Bubbles and Bubble Rock", "Bubbles Divide trailhead, Bubbles parking lot on the Park Loop Road. The lot is small and fills early.", "Moderate",
      [("Round trip", "1.5 mi", "2.4 km"), ("Top", "766 ft", "233 m, South Bubble"), ("Time", "1 to 1.5 hours", "NPS"), ("Best", "Morning", "Before the lot fills")],
      "A short climb to the twin summits above Jordan Pond, and Bubble Rock, a huge boulder left perched on the edge by a glacier. Views of the pond and the Cranberry Isles.",
      "Steep rocky sections and open granite ledges, slick in wet weather. Stay back from the edge by Bubble Rock and never try to push it.",
      "For both summits: from North Bubble, go back to the junction and follow the Bubbles Divide Trail about 0.7 mi (1.1 km) to South Bubble.") +
 card(6, "Gorham Mountain Loop", "Gorham Mountain parking lot on the Park Loop Road, past Sand Beach. Look for the big carved stump.", "Moderate",
      [("Round trip", "3.5 mi", "5.6 km"), ("Top", "525 ft", "160 m"), ("Time", "1 to 3 hours", "NPS"), ("Best", "Spring to fall", "Clear days")],
      "A rocky climb over open ledges to wide views of Sand Beach, Great Head and the ocean. One of the best views for the effort in the park.",
      "There is a false summit before the real one: follow the trail to the summit marker. The optional Cadillac Cliffs section has rungs; skip it with small children.",
      "Join it to the Ocean Path for a longer loop."))

page('<div class="kicker">Hikes · Moderate</div>' +
 card(7, "Great Head", "The far (east) end of Sand Beach, up the granite steps. Island Explorer to Sand Beach.", "Moderate",
      [("Round trip", "1.9 mi", "3.1 km"), ("Short loop", "1.3 mi", "2.1 km"), ("Top", "About 145 ft", "44 m"), ("Time", "2 to 4 hours", "NPS")],
      "A loop around a rocky headland with cliffs dropping straight into the sea, views back over Sand Beach to the Beehive, and the ruins of an old teahouse.",
      "Rocky, uneven footing, short steep bits and some scrambling. There are big drops to the ocean with no railings: keep children close.",
      "Dogs: from May 15 to September 15 they may cross Sand Beach only to reach this trail.") +
 card(8, "Cadillac North Ridge", "Kebo Brook trailhead by the Island Explorer stop (best), or the small North Ridge pull-off on the one-way Park Loop Road.", "Moderate",
      [("Round trip", "4.4 mi", "7.1 km"), ("Top", "1,530 ft", "466 m"), ("Time", "2 to 4 hours", "NPS"), ("Best", "Morning", "Or for sunrise")],
      "The most direct trail up the park's highest mountain: open granite slopes and stairs with ocean and island views the whole way.",
      "Exposed to sun and wind: bring water, sun protection and a warm layer. Parking is very limited; the bus is easier. No bus from the summit.",
      "Hiking up for sunrise? You need headlamps, warm clothes, and time to go slowly in the dark."))

page('<div class="kicker">Hikes · Moderate to hard</div>' +
 card(9, "Acadia Mountain", "Acadia Mountain parking area on Route 102 on the quiet side, at the west end of the Man O'War Brook Trail.", "Moderate to hard",
      [("Loop", "2.5 mi", "4 km"), ("Top", "681 ft", "208 m"), ("Time", "About 2 hours", "Our estimate"), ("Best", "Spring to fall", "Dry days")],
      "Stone steps up mossy ledges to a summit with views down Somes Sound, a long inlet carved by glaciers, and over Echo Lake.",
      "The way down is steep over ledges with some scrambling and loose rock. Go back by the Man O'War Brook Trail to make the loop.") +
 card(10, "Penobscot and Sargent Mountains", "Jordan Pond House (Island Explorer route 5). Spring Trail from the carriage road near signpost 15.", "Hard",
      [("Round trip", "6 to 7 mi", "10 to 11 km"), ("Top", "1,373 ft", "418 m, Sargent"), ("Time", "3 to 4 hours", "NPS, fast pace"), ("Best", "Clear, dry days", "Start early")],
      "Two big, bare summits in a row, with Sargent the second highest mountain on the island. Huge views over the sea, the islands and Jordan Pond.",
      "NPS suggests it only for fit, experienced hikers, and not for small children, people afraid of heights or wet weather. Wind picks up on the ridges.",
      "Less steep way down: Sargent South Ridge, then the Deer Brook Trail to the carriage road. Plan more time than the NPS figure if you stop a lot."))

page('<div class="kicker">Hikes · Iron rungs and ladders</div>' +
 card(11, "Beehive Loop", "Bowl Trail, across the Park Loop Road from Sand Beach (use the crosswalk). Island Explorer to Sand Beach.", "Very hard",
      [("Loop", "1.4 mi", "2.3 km"), ("Top", "520 ft", "158 m"), ("Time", "1 to 3 hours", "NPS"), ("Climb", "Rungs, ladders", "Cliff edges")],
      "A short, steep climb up a 450 ft (137 m) cliff face on iron rungs, ladders and narrow ledges, with Sand Beach far below. Thrilling and very exposed.",
      "Not for anyone afraid of heights, small children or wet rock. Do not climb back down the rungs: continue over the top and descend by the Bowl Trail.",
      "No dogs on rung and ladder trails. Turning around at the bottom is a smart choice if you feel unsure.") +
 card(12, "Precipice Loop", "Precipice trailhead on the one-way Park Loop Road, about 1.5 mi past Sieur de Monts. No bus service.", "Very hard",
      [("Loop", "3.2 mi", "5.1 km"), ("Climb", "1,000+ ft", "305 m in 0.9 mi"), ("Time", "2 to 3 hours", "NPS"), ("Open", "Check alerts", "Spring falcon closure")],
      "The hardest trail in the park: a non-technical climb up the cliffs of Champlain Mountain on iron rungs and ladders, with open drops and huge views.",
      "Closed each spring and summer while peregrine falcons nest (from March 1 in 2026), and only reopened when the park says so. Check alerts. Never climb down it: go down the Champlain North Ridge and the Orange and Black Path.",
      "Not for children, people afraid of heights, or wet or icy days. No dogs."))

# 20 carriage roads
page("""<div class="kicker">Walk and bike</div><h2>The carriage roads</h2>
<p class="lead">About 45 miles (72 km) of broken-stone roads, built in the early 1900s with granite bridges and no cars allowed. Wide, smooth and gentle: perfect for walking, biking, strollers and skiing in winter.</p>
<div class="mini">
<div><h3>Who goes where</h3><div class="s">Shared roads</div><p>Walkers, bikes and horses share the carriage roads. Bikes, e-bikes and horses are never allowed on hiking trails.</p></div>
<div><h3>E-bikes</h3><div class="s">Class 1 only</div><p>Pedal-assist e-bikes up to 20 mph are allowed. Class 2 and 3 (throttle or faster) are not.</p></div>
<div><h3>Mud season</h3><div class="s">Closed in the thaw</div><p>The roads close in spring and sometimes after heavy rain to protect the surface. Check alerts.</p></div>
<div><h3>Private sections</h3><div class="s">No bikes</div><p>Some carriage roads outside the park are private. Bikes are not allowed there: follow the signs.</p></div></div>
<div class="diff" style="margin-top:6pt">
<div><div class="tag">Etiquette</div><h3>Who yields</h3><ul class="check"><li>Cyclists yield to everyone</li><li>Walkers yield to horses</li><li>Keep right, pass on the left with a friendly call</li><li>Speed limit 20 mph (32 km/h) for everyone</li><li>Step aside when you stop</li></ul></div>
<div><div class="tag">Good loops</div><h3>Easy ideas</h3><ul class="check"><li>Around Eagle Lake: flat and scenic</li><li>Jordan Pond to the Bubble Pond bridge</li><li>Around Witch Hole Pond, near Hulls Cove</li><li>Ask at a visitor center for a carriage road map</li></ul></div></div>
<div class="box forest" style="margin-top:8pt"><h3>Signposts</h3><p style="margin:0">Every junction has a numbered wooden signpost. Carry the park's carriage road map and write your route by numbers, for example 6, 7, 8, 9. It makes getting lost hard.</p></div>""")

# 21 safety on granite
page("""<div class="kicker">Safety</div><h2>Trail safety on granite and by the sea</h2>
<p class="lead">Acadia's trails are short but rough. Most injuries come from slips on wet rock, falls on steep steps going down, and getting caught by the sea.</p>
<div class="layers">
<div><div class="num">1</div><h3>Wet rock</h3><p>Granite is slick after rain, in fog and near water. Wait for it to dry before rung trails or ledges.</p><div class="eg">Good grip shoes, not sandals.</div></div>
<div><div class="num">2</div><h3>Cliffs</h3><p>Many edges have no railings. Stay well back, especially for photos, and keep children within reach.</p><div class="eg">If you need to lean, it is too close.</div></div>
<div><div class="num">3</div><h3>The ocean</h3><p>Big waves can surge over low rocks at Thunder Hole, Otter Cliffs and Schoodic Point, even on calm, sunny days.</p><div class="eg">Never turn your back on the sea.</div></div></div>
<div class="cols">
<div><h3>Finding the way</h3>""" + chk(["Follow the blue paint blazes on trees and rock", "On open rock, follow the cairns (rock piles)", "Never move cairns or build new ones", "Carry a real trail map: phone signal is patchy", "Fog can hide the next cairn: turn back if you lose the trail"]) + """</div>
<div><h3>Weather and time</h3>""" + chk(["Fog can roll in fast from the sea", "Thunderstorm? Get off summits and ledges", "Carry at least 1 liter (32 oz) of water each, more on warm days", "Bring a headlamp: short hikes run late", "Pick a turnaround time and keep it"]) + """</div></div>
<div class="warn"><b>Emergency: call 911.</b> Know your trail name and the last signpost or junction you passed. Tell someone your plan before you go.</div>""")

# 22 wildlife and LNT
page("""<div class="kicker">On the trail</div><h2>Wildlife and Leave No Trace</h2>
<p class="lead">Acadia gets millions of visits on a small island. Little habits, repeated by everyone, keep it wild.</p>
<div class="diff">
<div><div class="tag">Wildlife</div><h3>What you may see</h3><ul class="check"><li>Peregrine falcons on the cliffs (with binoculars)</li><li>Harbor seals, seabirds, sometimes whales from boat tours</li><li>White-tailed deer, red squirrels, snowshoe hares</li><li>Black bears live here but are rarely seen</li><li>If an animal changes what it is doing, you are too close</li><li>Never feed any animal, even gulls or chipmunks</li></ul></div>
<div><div class="tag">Leave No Trace</div><h3>Every visit</h3><ul class="check"><li>Stay on the trail and on bare rock, never on summit plants</li><li>Do not stack rocks or change cairns</li><li>Pack out all trash, peels and tissues</li><li>Leave rocks, shells, flowers and tide pool animals</li><li>No swimming or pets in public water supplies like Jordan Pond</li><li>Drones are not allowed in national parks</li><li>Found an old object? Leave it, photo it, tell a ranger</li></ul></div></div>
<div class="box forest" style="margin-top:8pt"><h3>Ticks</h3><p style="margin:0">Deer ticks live in Maine's woods and grass. Walk the middle of the trail, wear long pants in brush, use repellent, and check everyone (and the dog) every evening. Pull ticks out early with tweezers, and see a doctor if a rash or fever follows.</p></div>
<h3>Mosquitoes and black flies</h3><p>Worst in late May and June, especially near ponds and in still air. Bring repellent and a light long-sleeve shirt.</p>""")

# 23 packing
page("""<div class="kicker">Checklist</div><h2>Packing list for the coast</h2>
<div class="cl">
<div><h3>Every hike (the Ten Essentials)</h3>""" + chk(["Paper trail map, plus offline maps on your phone", "Headlamp with fresh batteries", "Sun protection: hat, sunglasses, sunscreen", "First aid kit, with blister care", "Knife or multi-tool", "Fire starter (for emergencies only)", "Emergency shelter: a space blanket", "Extra food", "Extra water: 1 liter (32 oz) each, more on warm days", "Extra layer: warm top and rain jacket"]) + """
<h3>For this park</h3>""" + chk(["Park pass on the windshield", "Cadillac QR code saved offline", "Tide table for your dates", "A card: the park is cashless", "Shoes with good grip on wet granite"]) + """</div>
<div><h3>Layers for sea and summit</h3>""" + chk(["Wind and rain jacket, every day", "Fleece or light puffy", "Hat and light gloves for sunrise", "No cotton next to the skin on long hikes"]) + """
<h3>Summer</h3>""" + chk(["Insect repellent", "Light long-sleeve shirt", "Swimsuit and towel for Sand Beach or Echo Lake"]) + """
<h3>Spring and fall</h3>""" + chk(["Warm hat and gloves", "Waterproof shoes for mud", "Extra layer for cold mornings"]) + """
<h3>Winter</h3>""" + chk(["Microspikes or ice traction", "Insulated jacket, hat, gloves", "Thermos with a warm drink"]) + """</div></div>
<div class="box forest" style="margin-top:10pt"><h3>Fog changes everything</h3><p style="margin:0">A sunny Bar Harbor morning can be a cold, wet, windy summit an hour later. Pack the rain jacket and warm layer even when the sky is blue.</p></div>""")

# 24 kids and dogs
page("""<div class="kicker">Families</div><h2>With kids and with dogs</h2>
<div class="diff">
<div><div class="tag">With kids</div><h3>Good picks</h3><ul class="check"><li>Ship Harbor and the Ocean Path (hikes 4 and 1)</li><li>Jordan Pond east side, then popovers</li><li>Bar Island at low tide (hike 3)</li><li>Tide pools on a falling tide</li><li>Carriage roads by bike or stroller</li><li>The Junior Ranger program: ask at a visitor center</li></ul></div>
<div><div class="tag">With dogs</div><h3>Acadia is dog-friendly</h3><ul class="check"><li>Most trails and carriage roads allow leashed dogs</li><li>Leash 6 ft (1.8 m) or shorter, at all times</li><li>Pick up and pack out all waste</li><li>No dogs on rung and ladder trails (Beehive, Precipice and others)</li><li>No dogs in public water supplies like Jordan Pond</li><li>Beaches: limits in summer, for example Sand Beach May 15 to Sept 15</li></ul></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Kids near cliffs and water</h3><p>Hold hands at every overlook without a railing. Set one rule before you start: nobody goes past the adults toward an edge or the waterline.</p></div>
<div><h3>Dogs and heat</h3><p>Granite heats up in the sun. Carry water and a bowl for the dog, rest in the shade, and check paws on rough rock.</p></div></div>
<p class="small">Pet and beach rules change. Check "Pets" on nps.gov/acad before you go.</p>
<h3>Our family's plan (fill in)</h3>
<table class="spots"><tr><th>Day</th><th>Easy hike or activity</th><th>Snack and rest stop</th><th>Dog-friendly?</th></tr>"""
 + "".join('<tr><td style="height:24pt"></td><td></td><td></td><td></td></tr>' for _ in range(4)) + "</table>")

# 25 day planner
def dayp():
    return '<div class="dayp"><div class="f2"><div class="fl">Day and date</div><div class="fl">Sleeping in</div><div class="fl">Main hike and area</div><div class="fl">Start by / turn back by</div><div class="fl">Tides / Cadillac time</div><div class="fl">Backup plan</div></div></div>'
page('<div class="kicker">Planner</div><h2>Day-by-day trip planner</h2><p style="margin-bottom:6pt">One box a day. Fill it in pencil: fog, tides and parking change plans.</p>' + "".join(dayp() for _ in range(5)))

# 26 hike log
page('<div class="kicker">Memories</div><h2>Hike log and park memories</h2>'
 + '<table class="spots"><tr><th style="width:1.6in">Hike</th><th>Date</th><th>Who with</th><th>Best moment</th><th style="text-align:center">Done</th></tr>'
 + "".join('<tr><td style="height:27pt"></td><td></td><td></td><td></td><td class="b"></td></tr>' for _ in range(10))
 + '</table><div class="notes"><div class="lab">The view I will remember</div>' + lines(4) + '<div class="lab">Wildlife we saw (from a distance)</div>' + lines(3) + '<div class="lab">Next time in Acadia</div>' + lines(4) + '</div>')

# 27 budget
rows = [("Park pass", "7-day vehicle or annual pass (page 5)"), ("Non-resident fee", "If visiting from outside the US"), ("Cadillac reservations", "$6 per slot"), ("Travel and gas", ""), ("Campsite or lodging", ""), ("Bike rental", "Carriage roads"), ("Boat tour or ferry", "Optional"), ("Food and groceries", ""), ("Gear", "Layers, poles, repellent"), ("Extra for surprises", "About 10 percent")]
page('<div class="kicker">Money</div><h2>Trip budget planner</h2><p class="lead">Summer lodging is usually the biggest cost on Mount Desert Island. Write the plan first, then the real numbers as you book.</p>'
 + '<div class="f2"><div class="fl">Number of people</div><div class="fl">Number of nights</div></div>'
 + '<table class="bud" style="margin-top:6pt"><tr><th>Item</th><th>Notes</th><th style="text-align:right">Planned</th><th style="text-align:right">Actual</th></tr>'
 + "".join(f'<tr><td class="c">{a}</td><td class="small">{b}</td><td class="a"></td><td class="a"></td></tr>' for a, b in rows)
 + '<tr class="tot"><td>Total</td><td></td><td class="a"></td><td class="a"></td></tr></table>'
 + '<div class="box" style="margin-top:10pt"><h3 style="margin-top:0">Ways to spend less</h3><p style="margin:0">The Island Explorer is free and saves parking stress. A campsite costs far less than a summer room in Bar Harbor. Groceries from Ellsworth or Trenton beat eating out three times a day. Visiting more parks this year? An annual pass may cost less.</p></div>')

# 28 trip checklist
page("""<div class="kicker">Checklist</div><h2>Trip checklist</h2>
<div class="cl">
<div><h3>6 months to 2 months before</h3>""" + chk(["Choose dates (page 4)", "Book campsite or lodging (opens 6 months ahead)", "Set an alarm for the Cadillac 90-day release", "Plan your days (pages 9 to 12)", "Break in hiking shoes", "Passports ready if crossing the border"]) + """
<h3>2 weeks before</h3>""" + chk(["Buy the park pass online", "Check nps.gov/acad alerts and trail closures", "Check Island Explorer dates and routes", "Look up tide times for your dates", "Book bike rental or a boat tour"]) + """</div>
<div><h3>2 days before</h3>""" + chk(["Try the 2-day Cadillac release at 10 am ET", "Download offline maps and the NPS App content", "Print the pages you need", "Check the forecast for fog and storms"]) + """
<h3>The night before</h3>""" + chk(["Pack the bag (page 23)", "Charge phone, headlamp, power bank", "Water bottles filled, snacks packed", "Write start and turnaround times", "Tell someone your plan"]) + """
<h3>On the day</h3>""" + chk(["Leave early, or take the bus", "Pass on the windshield", "Check tides before Bar Island", "Turn back on time"]) + """</div></div>""")

# 29 sources
page("""<div class="kicker">Before you go</div><h2>Useful official links and emergency numbers</h2>
<div class="mini">
<div><h3>Acadia National Park</h3><div class="s">nps.gov/acad · 207-288-3338</div><p>Alerts, trail closures, road status, seasons, pets and fees. Alerts: go.nps.gov/AcadiaAlerts.</p></div>
<div><h3>Reservations</h3><div class="s">recreation.gov</div><p>Cadillac Summit Road vehicle reservations, campgrounds and digital passes.</p></div>
<div><h3>Island Explorer</h3><div class="s">exploreacadia.com</div><p>Routes, timetables, season dates and the bike bus.</p></div>
<div><h3>Tides and weather</h3><div class="s">tidesandcurrents.noaa.gov · weather.gov</div><p>Tide times for Bar Harbor, forecasts, fog and storm warnings.</p></div></div>
<div class="em" style="margin-top:10pt"><h3>Emergency</h3><p>Call 911 for any emergency in the park. Know where you are: trail name, last junction or signpost. The nearest hospital is in Bar Harbor; there are others in Ellsworth and Bangor.</p></div>
<h3>My numbers (fill in)</h3>
<table class="spots"><tr><th style="width:2in">Who</th><th>Phone</th><th>Notes</th></tr>"""
 + "".join(f'<tr><td style="height:24pt"><b>{a}</b></td><td></td><td></td></tr>' for a in ["Lodging / campground", "Emergency contact at home", "Bike or boat rental", "Car rental"]) + """</table>
<p class="small" style="margin-top:8pt">Check the park phone number and links on nps.gov/acad before your trip. Not affiliated with the National Park Service.</p>""")

# 30 notes + back
page("""<div class="kicker">Notes</div><h2>Notes</h2>""" + lines(16, 24) + """
<div class="box forest" style="margin-top:12pt"><div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:10pt">HikeSupply Co.</div><h3>Enjoy Acadia</h3><p>Thank you for choosing a HikeSupply guide. Start early, watch the tide, stay back from the edge, and turn back when the rock is wet or the fog rolls in.</p>
<p style="margin:0">Plan your next trip: the US National Parks Hiking Tracker, the Trail Ready training plan and our other park trip guides at <b>hikesupplyco.com</b></p></div>
<p class="small" style="margin-top:8pt">General trip planning information only, checked against nps.gov in November 2026. Reservations, roads, fees, closures and pet rules change: always check nps.gov/acad and ask a ranger before you hike. Hike within your ability and turn back when in doubt. Not affiliated with the National Park Service. For personal use only. COVERCREDIT</p>""")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip()
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
