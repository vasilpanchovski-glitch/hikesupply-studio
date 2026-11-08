"""Generates index.html for p18 (Yosemite National Park — Trip Planning Guide). Run: python3 gen.py
Same look as p11/p15/p16 (base.css + extra.css). Facts checked on November 8, 2026 against nps.gov/yose:
fees.htm, reservations.htm (no timed entry in 2026, page of Feb 18, 2026), May 13, 2026 summer release
(Tioga Road opened May 15, Glacier Point Road May 9), valleyhikes, vernalnevadatrail, yosemitefallstrail,
glacierhikes, tmhikes, wawonahikes, hetchhetchy, waterfalls, camping (release windows), wildpermitdates,
hdpermits, bears, tmbus. NPS round-trip distances used as given (km as NPS gives them)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Yosemite National Park"
CHECKED = "November 2026"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))

MORE = open(os.path.join(HERE, "more.css")).read() + ".cover.photo .cphoto{background-position:center 100%}"

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 250 L60 210 L110 222 L170 150 L200 165" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M200 165 C215 95 250 55 300 52 L300 160 L330 175 L380 150 L470 230" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M300 52 L300 160" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M60 300 L60 262 M48 270 L60 250 L72 270 M48 284 L60 262 L72 284 M410 300 L410 258 M396 268 L410 246 L424 268 M396 284 L410 260 L424 284" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M130 300 C200 286 300 286 360 300" stroke="#F5F1EA" stroke-width="3"/>
<circle cx="90" cy="70" r="20" stroke="#F5F1EA" stroke-width="3"/>
</svg></div>
<div><h1>Yosemite National Park</h1><p class="sub">A trip planning guide for first-time visitors. When to go for waterfalls, high country or quiet, how entry and permits work, where to stay, 1, 3 and 5-day plans, and 16 day hikes sorted by effort, from easy valley walks to the Mist Trail and Tuolumne's lakes.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>16 day hikes</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">Yosemite is two parks in one: the famous valley with its cliffs and waterfalls, and a high country of granite domes, meadows and lakes that is only open by car for part of the year. Most of the planning comes down to three questions: when you go, where you sleep, and which roads are open.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["The six areas of the park in plain words", "When to go, month by month", "Entry, passes and what changed in 2026", "Getting there and getting around", "What to book, and when", "Half Dome and wilderness permits", "Rivers, waterfalls, heat, altitude, bears", "How to choose a hike, and 16 day hikes", "Big days for fit hikers", "Sample 1, 3 and 5-day plans", "Packing list, budget and planners"]) + f"""</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers. Every hike here is a day hike on a marked trail, from a flat loop in a sequoia grove to the steep granite steps of the Mist Trail.</p>
<h3>How to read the hikes</h3><p>Distances are round trip, as the National Park Service gives them, in miles and kilometers. Climbs are elevation gain in feet and meters. Times are NPS estimates for an average hiker: add breaks.</p></div></div>
<div class="box forest"><h3>Checked against nps.gov in {CHECKED}</h3><p style="margin:0">Yosemite changes its entry rules, road openings and permits from year to year. In 2026 there was no entry reservation; that may not be true in 2027. Before you book, and again before you go, check the official pages on page 30 and ask a ranger when you arrive.</p></div>
<h3>Print it or keep it offline</h3>
<p>Cell service is weak or missing on most trails and along much of the high roads. Save this PDF to your phone before you leave home, or print the pages you need. Pages 26 to 29 are made for printing.</p>""")

# 3 at a glance
areas = [
 ("Yosemite Valley", "About 4,000 ft / 1,200 m", "The famous one: El Capitan, Half Dome, Yosemite Falls, Bridalveil Fall, meadows and the Merced River. Most lodging, food and the free valley shuttle are here. Also the busiest place in the park."),
 ("Glacier Point", "About 7,200 ft / 2,200 m", "A viewpoint high above the valley, at the end of Glacier Point Road (usually open May to November). Short hikes to Sentinel Dome and Taft Point."),
 ("Tuolumne Meadows", "About 8,600 ft / 2,600 m", "Wide subalpine meadows, domes and lakes along Tioga Road, open by car only in summer and fall. Cooler, quieter, and a lot higher: take it slower."),
 ("Mariposa Grove", "Near the South Entrance", "The park's largest grove of giant sequoias, including the Grizzly Giant. A free shuttle runs from the parking area in season."),
 ("Wawona", "South side", "A historic hotel, a meadow loop and the Chilnualna Falls trail. Close to the Mariposa Grove."),
 ("Hetch Hetchy", "Northwest corner", "A reservoir in a granite valley with spring waterfalls and one of the longest hiking seasons in the park. Its entrance is not open 24 hours."),
]
page('<div class="kicker">The park</div><h2>Yosemite at a glance</h2><p class="lead">Yosemite covers a huge area of the Sierra Nevada. The valley sits in the middle of the west side, and each other area is a drive of an hour or more from it. Plan your days by area, not by sight.</p>'
 + '<div class="stops">' + "".join(f"<div><b>{a}<small>{s}</small></b><p>{b}</p></div>" for a, s, b in areas) + '</div>'
 + '<div class="box forest" style="margin-top:9pt"><h3>Three things that surprise first-timers</h3><p style="margin:0">The drive from the park entrance to the valley takes 45 minutes to over an hour. Tioga Road and Glacier Point Road close for winter, so half the park is out of reach by car for months. And many famous waterfalls are a trickle or dry by late summer (page 4).</p></div>'
 + '<h3>Pick your base</h3><table><tr><th>If you mostly want</th><th>Sleep near</th></tr><tr><td>Waterfalls, big walls, short walks, no driving</td><td>Yosemite Valley or El Portal</td></tr><tr><td>Giant sequoias and quiet meadows</td><td>Wawona, Fish Camp or Oakhurst</td></tr><tr><td>High lakes and domes (summer and fall)</td><td>Tuolumne Meadows or Lee Vining</td></tr><tr><td>Spring waterfalls with fewer people</td><td>Groveland, for Hetch Hetchy</td></tr></table>')

# 4 when to go
months = [
 ("Jan, Feb", "Snow on the valley rim, sometimes on the valley floor. Quiet trails, low prices. Tioga Road and most of Glacier Point Road closed. In February, people gather to watch Horsetail Fall glow at sunset: check nps.gov for any special rules that year."),
 ("March, April", "Waterfalls start to build as snow melts. Low trails open, high trails still snowy. Spring storms are common."),
 ("May", "Waterfalls near their peak: Yosemite Falls usually peaks in May. Glacier Point Road and Tioga Road open when the snow is cleared (in 2026: May 9 and May 15). Memorial Day weekend is very busy."),
 ("June", "Big waterfalls, warm valley days, the high country waking up. Busy, especially on weekends."),
 ("July, Aug", "Peak season. Hot in the valley, the best time for Tuolumne Meadows and its lakes. Yosemite Falls often slows to a trickle or dries by August. Wildfire smoke possible."),
 ("September", "Fewer people after Labor Day, warm days, cool nights. Most high trails open. Low waterfalls."),
 ("October", "Fall color in the valley, cold mornings. Half Dome cables usually come down after the second Monday. First snow can close the high roads at any time."),
 ("Nov, Dec", "Tioga and Glacier Point roads close for the season, depending on snow. The valley stays open all year. Carry tire chains: chain controls can be in effect."),
]
page('<div class="kicker">Timing</div><h2>When to go: month by month</h2><p class="lead">There is no single best month. Spring is for waterfalls, summer for the high country, fall for quiet. No one can promise when the high roads open: it depends on the winter\'s snow.</p>'
 + '<table class="months">' + "".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in months) + '</table>'
 + '<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr><tr><td>The biggest waterfalls</td><td>May and June</td></tr><tr><td>Tuolumne Meadows and the high lakes</td><td>July to September</td></tr><tr><td>Fewer people</td><td>Weekdays, after Labor Day, or winter</td></tr><tr><td>Snow on granite, almost no crowds</td><td>December to March (valley and Wawona)</td></tr></table>')

# 5 getting in
page("""<div class="kicker">Entry</div><h2>Getting in: passes and reservations</h2>
<p class="lead">In several recent summers Yosemite asked visitors to reserve entry on busy days. For 2026 the park dropped that system. You only needed a park pass to drive in.</p>
<div class="now"><h3>In 2026</h3><p>No timed entry reservation. Instead the park managed traffic on busy days: rangers at crowded junctions, parking control in the valley, and alerts. The park asked visitors to buy a digital pass in advance, come midweek, arrive early or late, and explore beyond the valley. Saturday mornings were the worst for traffic.</p></div>
<h3>Entrance fees (2026)</h3>
<table class="fee"><tr><th>Pass (7 days)</th><th>Price</th><th>Covers</th></tr>
<tr><td>Private vehicle</td><td>$35</td><td>The car and everyone in it</td></tr>
<tr><td>Motorcycle</td><td>$30</td><td>Up to 2 motorcycles, 4 people</td></tr>
<tr><td>Per person</td><td>$20</td><td>On foot, bike or horse. 15 and under free</td></tr></table>
<table class="fee"><tr><th>Annual passes</th><th>Price</th><th>Covers</th></tr>
<tr><td>Yosemite annual pass</td><td>$70</td><td>This park, 12 months. US citizens and residents</td></tr>
<tr><td>America the Beautiful</td><td>$80 / $250</td><td>All national parks, one year. US residents / non-residents</td></tr>
<tr><td>Non-resident fee</td><td>$100 each</td><td>Visitors 16+ from outside the US, on top of the entrance fee, unless you hold an annual pass</td></tr></table>
<p class="small">The park is cashless: cards and mobile pay only. Digital passes are sold on Recreation.gov. Visiting from Canada? You count as a non-resident. Check nps.gov/yose/planyourvisit/fees.htm before you go.</p>
<div class="box forest"><h3>Planning a 2027 trip?</h3><p style="margin:0">Do not assume 2027 will work like 2026. The park announces its summer rules each winter or spring. Check nps.gov/yose and search "entrance reservations" before you book anything else.</p></div>""")

# 6 getting there and around
ent = [("South Entrance", "Hwy 41", "From Fresno, Oakhurst and Fish Camp. Closest to the Mariposa Grove and Wawona."),
 ("Arch Rock", "Hwy 140", "From Merced, Mariposa and El Portal. Lowest road into the valley, often the easiest in winter."),
 ("Big Oak Flat", "Hwy 120 west", "From the San Francisco Bay Area via Groveland. Leads to the valley and to Tioga Road."),
 ("Tioga Pass", "Hwy 120 east", "From Lee Vining and the eastern Sierra. Summer and fall only, at 9,945 ft (3,031 m)."),
 ("Hetch Hetchy", "Evergreen Road", "From Hwy 120 near Groveland. The only entrance not open 24 hours.")]
page('<div class="kicker">Getting there</div><h2>Getting there and getting around</h2>'
 + '<p class="lead">There are five entrances. Pick the one closest to your first night\'s bed. Drive times from the cities vary a lot with traffic and road work: check your route the day before.</p>'
 + '<div class="stops">' + "".join(f"<div><b>{a}<small>{s}</small></b><p>{b}</p></div>" for a, s, b in ent) + '</div>'
 + '''<div class="bk" style="margin-top:8pt">
<div><b>Valley shuttle</b><p>Free, all year, with stops at lodges, campgrounds and trailheads around Yosemite Valley. Park once and ride.</p></div>
<div><b>Mariposa Grove shuttle</b><p>Free, from the parking area near the South Entrance to the grove, from late April to November when conditions allow.</p></div>
<div><b>Tuolumne shuttle</b><p>Summer only, along Tioga Road between Tuolumne Meadows and Olmsted Point (in 2026 it ended September 13).</p></div>
<div><b>Glacier Point Tour</b><p>No public shuttle goes to Glacier Point. A ticketed tour bus runs in summer, reservations required.</p></div>
<div><b>YARTS buses</b><p>Regional buses into the valley from gateway towns, and from Mammoth Lakes over Tioga Pass in summer. Fares apply.</p></div>
</div>
<div class="em"><h3>Valley parking</h3><p>On busy days valley lots fill by mid-morning. Arrive before 9 am, park once at your lodging or a day-use lot, and use the shuttle and your feet for the rest of the day. There is no gas in the valley: fill up before you enter.</p></div>''')

# 7 where to stay
page("""<div class="kicker">Planning</div><h2>Where to stay, and when to book</h2>
<p class="lead">Beds inside the park are few for the number of visitors. Book the bed first, then build the days around it.</p>
<div class="bk">
<div><b>Lodging in the park</b><p>Hotels, lodge rooms, cabins and tent cabins in Yosemite Valley (The Ahwahnee, Yosemite Valley Lodge, Curry Village) and the historic Wawona Hotel, run by the park's lodging concessioner. Links on nps.gov/yose. Summer dates go early.</p></div>
<div><b>Gateway towns</b><p>Oakhurst and Fish Camp (south), Mariposa and El Portal (west, Hwy 140), Groveland (Hwy 120 west), Lee Vining (east, summer). Count the drive time to the valley before you book.</p></div>
<div><b>Campgrounds, 5 months ahead</b><p>Upper, Lower and North Pines, Wawona and Hodgdon Meadow: released on the 15th of each month at 7 am Pacific, five months ahead. They sell out within minutes.</p></div>
<div><b>Campgrounds, closer in</b><p>Tuolumne Meadows: half the sites 2 months ahead on the 15th, half 2 weeks ahead. Crane Flat, White Wolf, Bridalveil Creek and others: 2 weeks ahead, rolling. Camp 4: 1 week ahead in season.</p></div>
<div><b>How to book</b><p>Recreation.gov or 877-444-6777. Make an account, set your clock, and be logged in before 7 am Pacific. Two reservations per visit.</p></div>
<div><b>No luck?</b><p>Check for cancellations daily, try a first-come campground in winter (Camp 4, Wawona, Hodgdon Meadow), or stay in a gateway town.</p></div></div>
<div class="box"><h3 style="margin-top:0">Rule of thumb</h3><p style="margin:0">Bed first, rental car second, permits third (page 8). Sleeping in a vehicle is only allowed in a campsite you have reserved. Write every booking on page 28.</p></div>
<h3>Booking calendar (fill in)</h3>
<table class="spots"><tr><th>What</th><th>Opens on</th><th>Alarm set</th><th style="text-align:center">Booked</th></tr>"""
 + "".join(f'<tr><td style="height:24pt"><b>{a}</b></td><td></td><td></td><td class="b"></td></tr>' for a in ["Lodging or campsite", "Half Dome lottery", "Glacier Point Tour"]) + "</table>")

# 8 permits
page("""<div class="kicker">Permits</div><h2>Half Dome and wilderness permits</h2>
<p class="lead">You do not need a permit for any day hike in this guide. You need one for two things: climbing the Half Dome cables, and any night in the wilderness.</p>
<div class="permit">
<div class="plus"><small>Day hike</small><h3>Half Dome</h3><div class="hrs">Lottery</div><div class="hl">Every day the cables are up</div><p>The cables are usually up from the Friday before Memorial Day to the day after the second Monday in October. Up to 300 people a day may go past the base of the subdome.</p></div>
<div><small>Overnight</small><h3>Wilderness</h3><div class="hrs">Permit</div><div class="hl">Any night outside a campground</div><p>Every overnight trip in the wilderness needs a permit, and a bear-resistant food canister. Backpackers to Half Dome get it on their wilderness permit.</p></div></div>
<h3>Half Dome lotteries, in plain words</h3>
<table class="dep"><tr><th>Lottery</th><th>How it works (2026 rules)</th></tr>
<tr><td><b>Preseason</b></td><td>Apply March 1 to 31 on Recreation.gov for up to 6 people, with a list of dates. Results by email in mid-April. About 225 day-hike permits a day go this way.</td></tr>
<tr><td><b>Daily</b></td><td>Apply two days before your hike, from midnight to 4 pm Pacific. Results the same night. Good for flexible trips.</td></tr>
<tr><td><b>Cost</b></td><td>$10 per application, plus $10 per person if you win. Bring photo ID; the permit holder must be with the group at the checkpoint.</td></tr></table>
<h3>Wilderness permits</h3>
<p>60 percent of permits are given by a weekly lottery, opening 24 weeks before the start date. The other 40 percent open on Recreation.gov 7 days before. Start by choosing a trailhead: each one has a daily limit.</p>
<div class="warn">Half Dome is a long, hard day with a steep cable climb (page 22). Winning the lottery is not a reason to go: decide first if it is right for your group.</div>""")

# 9 safety
page("""<div class="kicker">Safety</div><h2>Rivers, waterfalls and the weather</h2>
<p class="lead">Yosemite's water is its beauty and its biggest danger. The park warns that rivers and creeks have very strong currents, and that rock near water is slick even when it looks dry.</p>
<div class="layers">
<div><div class="num">1</div><h3>Stay out of fast water</h3><p>Never swim or wade above a waterfall. Swimming at Emerald Pool and the Silver Apron, above Vernal Fall, is illegal and dangerous.</p><div class="eg">Spring melt makes rivers fast and ice cold.</div></div>
<div><div class="num">2</div><h3>Stay on the trail</h3><p>Do not climb past railings or walk on wet rock by falls and cliffs, even for a photo.</p><div class="eg">Keep children within reach at overlooks.</div></div>
<div><div class="num">3</div><h3>Get off domes in storms</h3><p>Summer afternoon thunderstorms are common. Leave domes, ridges and Half Dome before they build.</p><div class="eg">Thunder heard? Turn around.</div></div></div>
<div class="cols">
<div><h3>Heat</h3>""" + chk(["Valley and Hetch Hetchy trails get hot in summer", "Start steep hikes early, in the shade", "Drink often and eat salty snacks", "Smoky day? Check airnow.gov and pick a shorter hike"]) + """</div>
<div><h3>Altitude</h3><p>Tuolumne Meadows is about 8,600 ft (2,600 m), Tioga Pass 9,945 ft (3,031 m). Coming up from the coast in one day, many people feel short of breath.</p>""" + chk(["Go slower and drink water", "Do a short hike on day one up high", "If you feel ill and it gets worse, go down and get help"]) + """
</div></div>
<div class="warn"><b>Emergency: call 911.</b> Signal is patchy, so tell someone your plan before you go, and turn back early rather than late.</div>""")

# 10 bears
page("""<div class="kicker">Safety</div><h2>Bears and food storage</h2>
<p class="lead">Yosemite's bears are black bears, even when their fur is brown or blond. They have learned that people mean food, and they open cars to get it. The rules here protect the bears as much as your trip.</p>
<div class="dist"><div class="a"><div class="n">50 yards</div><div class="u">46 m, outside developed areas</div><p>Watch from a distance. Never approach.</p></div><div class="b"><div class="n">$5,000</div><div class="u">fine, at most</div><p>Plus your food or car can be impounded.</p></div></div>
<div class="diff">
<div><div class="tag">Food storage</div><h3>Where food goes</h3><ul class="check"><li>Car: only in daylight, out of sight, windows fully closed</li><li>After dark: in the food locker, never in the car or trunk</li><li>Campsite or tent cabin: in the locker, latched</li><li>Hotel room: inside, doors and windows closed</li><li>Hiking or picnicking: within arm's reach, never left alone</li></ul></div>
<div><div class="tag">If you see a bear</div><h3>Know what to do</h3><ul class="check"><li>On a trail: keep your distance and let it move on</li><li>In a campground or parking lot, or if it comes toward you: yell loudly, wave, make yourself big</li><li>Never run from a bear</li><li>Never feed one, even by accident</li><li>Tell a ranger where you saw it</li></ul></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>What counts as food</h3><p>Anything with a smell: drinks, canned food, sunscreen, toothpaste, soap, trash, an empty cooler, unwashed dishes, baby wipes.</p></div>
<div><h3>Backpacking</h3><p>Bear-resistant canisters are required for overnight trips in the wilderness. Hanging food is no longer allowed.</p></div></div>
<p class="small">Summary of the park's bear page. Read the full rules on nps.gov/yose before your trip.</p>""")

# 11 LNT
page("""<div class="kicker">On the trail</div><h2>Leave No Trace and trail etiquette</h2>
<p class="lead">Millions of people visit a small valley each year. Little habits, repeated by everyone, keep it the place you came to see.</p>
<div class="diff">
<div><div class="tag">Leave No Trace</div><h3>Every visit</h3><ul class="check"><li>Stay on the trail, even when it is muddy or snowy</li><li>Do not cut switchbacks</li><li>Pack out all trash, peels and tissues</li><li>Leave rocks, cones, flowers and wood where they are</li><li>Never feed any animal, even a squirrel or a jay</li><li>Use restrooms; if none, go 200 ft (60 m) from water and trails</li><li>No drones: they are not allowed in national parks</li></ul></div>
<div><div class="tag">Etiquette</div><h3>On busy trails</h3><ul class="check"><li>Uphill hikers have the right of way</li><li>Step aside for horses and mules, on the downhill side</li><li>Pass with a friendly "on your left"</li><li>Keep music in headphones</li><li>Do not block steps and viewpoints for long photos</li><li>Pets: only on paved paths and roads, on a 6 ft leash, and the Wawona Meadow Loop</li></ul></div></div>
<div class="box forest" style="margin-top:8pt"><h3>Sequoias need space</h3><p style="margin:0">In the Mariposa Grove, stay on the trails and boardwalks. Giant sequoias have shallow roots, and feet packing the soil around them harm the trees.</p></div>
<h3>Water on the trail</h3><p>Treat any water from streams or lakes before you drink it: boil it, filter it or use tablets. Bring enough from the trailhead, because many trails have none.</p>""")

# 12-13 choosing a hike
page("""<div class="kicker">Choose your hike</div><h2>How to choose a hike</h2>
<p class="lead">The best hike is the one your whole group finishes smiling. Pick by effort first, then by view.</p>
<table class="tt"><tr><th>Level</th><th>What it means here</th><th>Examples</th></tr>
<tr><td>Easy</td><td>Under 3 mi (5 km), little climb. Most families, most fitness levels.</td><td>Lower Yosemite Fall, Cook's Meadow, Big Trees Loop</td></tr>
<tr><td>Moderate</td><td>2 to 5 mi (3 to 8 km) with a real climb of 300 to 1,000 ft (90 to 300 m).</td><td>Vernal Fall footbridge, Sentinel Dome, Lembert Dome</td></tr>
<tr><td>Hard</td><td>Steep and long, 1,000 ft (300 m) or more of climb, half a day or more.</td><td>Top of Vernal and Nevada Falls, Cathedral Lakes</td></tr>
<tr><td>Very hard</td><td>A full day, big climbs, permits or exposure.</td><td>Upper Yosemite Fall, Half Dome (page 22)</td></tr></table>
<h3>How long will it take?</h3>
<p>A simple planning rule many hikers use: about 2 mi (3 km) an hour on flat trail, plus about an hour for every 1,000 ft (300 m) of climb. Then add breaks, photos and lunch. The NPS times on each hike card already include a normal pace.</p>
<div class="box"><h3 style="margin-top:0">Worked example</h3><p style="margin:0">Top of Vernal Fall: 2.4 mi (3.9 km) and 1,000 ft (300 m) of climb. That is about 1.2 hours of walking plus 1 hour for the climb, so 2 to 2.5 hours, plus breaks. The NPS says about 3 hours. Plan for 3.</p></div>
<h3>Your hike, worked out</h3>
<div class="f2"><div class="fl">Distance (mi or km)</div><div class="fl">Climb (ft or m)</div><div class="fl">Walking time</div><div class="fl">Plus breaks</div></div>""")

page("""<div class="kicker">Choose your hike</div><h2>Water, start time and turnaround</h2>
<div class="mini">
<div><h3>Water</h3><div class="s">More than you think</div><p>Most Yosemite trails have no drinking water. The park recommends about 4 quarts (4 liters) for the top of Yosemite Falls in summer. For short walks, a liter per person is a minimum.</p></div>
<div><h3>Start early</h3><div class="s">Before 8 am in summer</div><p>Cooler air, easier parking, and you are off domes before afternoon storms build.</p></div>
<div><h3>Turnaround time</h3><div class="s">Write it down</div><p>Decide before you start when you will turn back, wherever you are. The way down on steep granite steps is slow, and it is where knees and ankles get hurt.</p></div>
<div><h3>Footwear</h3><div class="s">Grip matters</div><p>Granite, sand and wet steps are slippery. Wear shoes with a good tread. Poles help a lot on the way down.</p></div></div>
<h3>Turnaround planner</h3>
<table class="spots"><tr><th style="width:1.6in">Hike</th><th>Start time</th><th>Turn back by</th><th>Back at car by</th></tr>"""
 + "".join('<tr><td style="height:26pt"></td><td></td><td></td><td></td></tr>' for _ in range(3)) + """</table>
<h3>Turn back if</h3>""" + chk(["Anyone in the group is struggling, dizzy or very tired", "You reach your turnaround time, even near the top", "Clouds build fast or you hear thunder", "The trail is covered in ice or water is running over it"]) + """
<div class="em"><h3>The halfway rule</h3><p>Use half your time and half your energy going out. The return on steep trails is just as long, and the light does not wait.</p></div>""")

# hike cards
def card(no, name, where, level, stats, see, tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    st = "".join(f'<div><b>{a}</b><span>{b}</span><em>{c}</em></div>' for a, b, c in stats)
    return f'''<div class="hk"><div class="top"><div><small>Hike {no}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st">{st}</div>
<p><span class="lb">Where</span>{where}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Good to know</span>{tip}</p>{nt}</div>'''

page('<div class="kicker">Hikes · Yosemite Valley · Easy</div>' +
 card(1, "Lower Yosemite Fall", "Lower Yosemite Fall Trailhead, by the valley shuttle stop. Start here before the crowds.", "Easy",
      [("Loop", "1 mi", "1.6 km"), ("Climb", "50 ft", "15 m"), ("Time", "About 30 min", "Plus photos"), ("Best", "March to June", "Falls at peak in May")],
      "A short loop through the forest to the foot of Lower Yosemite Fall, with Upper Yosemite Fall above it. Together the falls drop 2,425 ft (740 m).",
      "In spring the spray soaks the bridge: bring a rain jacket. Stay off the wet boulders at the base: they are slick and people get hurt every year.",
      "Yosemite Falls often slows to a trickle or dries by August. In late summer, pick Vernal Fall instead.") +
 card(2, "Cook's Meadow Loop", "Starts near the Yosemite Valley Welcome Center and the Lower Yosemite Fall shuttle stops.", "Easy",
      [("Loop", "1 mi", "1.6 km"), ("Climb", "Flat", "Boardwalk"), ("Time", "About 30 min", "Any time"), ("Best", "All year", "Sunrise, sunset")],
      "A flat walk on boardwalk across an open meadow with views of Half Dome, Sentinel Rock and Yosemite Falls in one sweep. One of the best photo spots in the valley.",
      "Stay on the boardwalk: the meadow is fragile and often wet. Great for little legs and grandparents.",
      "Add Bridalveil Fall on the drive out: 0.5 mi (0.8 km) round trip, 80 ft (24 m) of climb. It flows all year and peaks in May."))

page('<div class="kicker">Hikes · Yosemite Valley</div>' +
 card(3, "Mirror Lake", "Mirror Lake shuttle stop in the east end of Yosemite Valley. Little parking: take the shuttle.", "Easy to moderate",
      [("To the lake", "2 mi", "3.2 km round trip"), ("Climb", "100 ft", "30 m"), ("Full loop", "5 mi", "8 km, 200 ft"), ("Best", "April to June", "Water is highest")],
      "A gentle walk up Tenaya Creek to a quiet lake right under the face of Half Dome. On a calm morning the cliffs reflect in the water.",
      "Mirror Lake is seasonal. It is fullest in spring and early summer and often shrinks to a sandy meadow by late summer. Still a lovely walk.") +
 card(4, "Vernal Fall (Mist Trail)", "Happy Isles Trailhead, shuttle stop 16. No parking at the trailhead: park at Curry Village, under 1 mi away.", "Moderate to hard",
      [("Footbridge", "1.6 mi", "2.6 km round trip"), ("Climb", "400 ft", "120 m"), ("Top of fall", "2.4 mi", "3.9 km, 1,000 ft"), ("Time", "1 to 3 hours", "By turnaround")],
      "A paved climb to a footbridge with a full view of Vernal Fall. Strong hikers continue up hundreds of steep granite steps beside the fall, through the mist, to the top.",
      "The steps are steep and wet in spring: wear grippy shoes and a rain jacket. The lower Mist Trail closes in winter for ice and rockfall; a winter route stays open.",
      "Water: only at the trailhead and at the footbridge (May to October). Never cross railings at the top of the fall, and never enter the river above it."))

page('<div class="kicker">Hikes · Yosemite Valley · Hard</div>' +
 card(5, "Nevada Fall via the Mist Trail", "Happy Isles Trailhead (shuttle stop 16), on past Vernal Fall.", "Hard",
      [("Round trip", "5.4 mi", "8.7 km"), ("Climb", "2,000 ft", "610 m"), ("Time", "5 to 6 hours", "NPS estimate"), ("Best", "May to October", "Start early")],
      "Above Vernal Fall the trail climbs steep switchbacks to the top of Nevada Fall, with Liberty Cap towering beside it. Two great waterfalls in one hike.",
      "Many people go up the Mist Trail and come down the longer, gentler John Muir Trail (about 4 mi / 6.4 km one way instead of 2.5 mi / 4 km). It saves the knees and the wet steps.",
      "Sprained ankles and knee injuries are common here: loose rock, high steps, wet granite. Bring a headlamp and more water than you think.") +
 card(6, "Columbia Rock", "Upper Yosemite Fall Trailhead near Camp 4, shuttle stop 7. Park in the Yosemite Falls lot, not the Camp 4 lot.", "Moderate",
      [("Round trip", "2 mi", "3.2 km"), ("Climb", "1,000 ft", "300 m"), ("Time", "2 to 3 hours", "NPS estimate"), ("Best", "Spring and fall", "Mornings")],
      "Short, steep switchbacks to a rocky viewpoint high above the valley, looking across to Half Dome and down on the meadows. A big view for a short hike.",
      "Steep from the first step, and hot and sunny in summer. Loose sand on rock makes the way down slippery. Stay behind the railing at the viewpoint.",
      "This is the first part of the Upper Yosemite Fall trail. The full hike to the top is a big day (page 22)."))

page('<div class="kicker">Hikes · Glacier Point Road</div>' +
 card(7, "Sentinel Dome", "Sentinel Dome and Taft Point Trailhead on Glacier Point Road (road usually open May to November).", "Moderate",
      [("Round trip", "2 mi", "3.2 km"), ("Climb", "400 ft", "120 m"), ("Time", "1 to 2 hours", "NPS estimate"), ("Top", "8,122 ft", "2,476 m")],
      "An easy forest walk, then a short walk up bare granite to the top of a dome with a full circle view: Half Dome, El Capitan, Yosemite Falls and the high Sierra.",
      "The last part is steep, open granite: walk slowly and stay away from the edges. Never be on a dome in a thunderstorm. Sunset is beautiful, so bring a headlamp for the way back.") +
 card(8, "Taft Point", "Same trailhead as Sentinel Dome. You can do both in one outing.", "Easy to moderate",
      [("Round trip", "2.2 mi", "3.5 km"), ("Climb", "200 ft", "60 m, on return"), ("Time", "1 to 2 hours", "NPS estimate"), ("Best", "June to Oct", "Late afternoon")],
      "A gentle walk down through forest to a sheer cliff edge with a view straight across to El Capitan and Yosemite Falls, and deep cracks in the rock called the Fissures.",
      "There is a railing at the main viewpoint, but most of the cliff edge has none. Keep children by the hand, stay well back from edges and fissures, and never sit on the rim for a photo.",
      "Glacier Point itself is a 600 yd (550 m) paved walk from its parking lot, the easiest big view in the park."))

page('<div class="kicker">Hikes · Glacier Point and Mariposa Grove</div>' +
 card(9, "McGurk Meadow", "McGurk Meadow Trailhead on Glacier Point Road.", "Easy",
      [("Round trip", "1.6 mi", "2.5 km"), ("Climb", "150 ft", "45 m, on return"), ("Time", "1 to 1.5 hours", "NPS estimate"), ("Best", "June, July", "Wildflowers")],
      "A short walk through a quiet forest to a long meadow full of wildflowers in early summer, with an old log cabin at its edge.",
      "Mosquitoes can be thick in early summer: bring repellent. A good quiet choice when Glacier Point is crowded.",
      "Longer option: on to Dewey Point on the valley rim, 7.6 mi (12.2 km) round trip with 750 ft (230 m) of climb, 4 to 5 hours.") +
 card(10, "Grizzly Giant Loop", "Mariposa Grove Arrival Area near the South Entrance. Free shuttle to the grove in season.", "Easy to moderate",
      [("Loop", "2 mi", "3.2 km"), ("Climb", "300 ft", "90 m"), ("Time", "1.5 to 2 hours", "NPS estimate"), ("Best", "May to Oct", "Morning")],
      "A climb through giant sequoias to the Grizzly Giant, one of the oldest trees in the grove, and the California Tunnel Tree, which you can walk through.",
      "Partly wheelchair accessible; people with a disability placard can drive to the Grizzly Giant parking area. Stay on the trail to protect the roots.",
      "Short option: the Big Trees Loop, 0.3 mi (0.5 km), flat, boardwalk and packed path, wheelchair accessible, 30 to 45 minutes."))

page('<div class="kicker">Hikes · Hetch Hetchy and Wawona</div>' +
 card(11, "Wapama Falls", "O'Shaughnessy Dam, Hetch Hetchy. The trail crosses the dam and goes through a tunnel.", "Moderate",
      [("Round trip", "5 mi", "8 km"), ("Climb", "507 ft", "155 m"), ("Start", "Hetch Hetchy", "Northwest corner"), ("Best", "April to June", "Falls at their biggest")],
      "Along the shore of the Hetch Hetchy Reservoir under granite walls, past Tueeulala Falls, to the foot of thundering Wapama Falls. One of the longest hiking seasons in the park.",
      "In big spring flows, water can rush over the trail and footbridges at the falls. If water covers the trail or bridges, do not cross: turn around. Hot in summer, so start early.",
      "No pets on the dam or trails, and no swimming or boating: the reservoir is drinking water for San Francisco. The Hetch Hetchy entrance is not open 24 hours.") +
 card(12, "Wawona Meadow Loop", "Starts by the Wawona Hotel on Hwy 41.", "Easy",
      [("Loop", "3.5 mi", "5.6 km"), ("Climb", "Mostly flat", "Uneven"), ("Time", "2 to 3 hours", "NPS estimate"), ("Best", "Spring", "Wildflowers")],
      "A quiet loop around a large meadow under pine and cedar, with wildflowers in spring and early summer. Pair it with the Mariposa Grove on the same day.",
      "The only hiking trail in Yosemite where bikes and leashed pets are allowed, so it is the one to choose if your dog came along.",
      "Nearby: the Swinging Bridge, 0.6 mi (1 km) round trip, flat, a footbridge over the South Fork of the Merced River."))

page('<div class="kicker">Hikes · Tuolumne Meadows (summer and fall)</div>' +
 card(13, "Soda Springs and Parsons Lodge", "Lembert Dome parking area or the Tuolumne Meadows Visitor Center, on Tioga Road.", "Easy",
      [("Round trip", "1.4 mi", "2.3 km"), ("Climb", "Mostly flat", "Unpaved"), ("Time", "About 1 hour", "Any time"), ("Altitude", "About 8,600 ft", "2,600 m")],
      "A walk across the edge of Tuolumne Meadows to cold, bubbling springs and a historic stone lodge, with domes and peaks all around. The perfect first walk up high.",
      "Do not drink the spring water. A good day-one hike to get used to the altitude.") +
 card(14, "Dog Lake and Lembert Dome", "Dog Lake parking area, off Tioga Road in Tuolumne Meadows.", "Moderate",
      [("Round trip", "3.8 mi", "6.1 km"), ("Climb", "850 ft", "260 m"), ("Time", "3 to 4 hours", "NPS estimate"), ("Best", "July to Sept", "Mornings")],
      "A steep forest climb to a calm lake, and a side trip up the back of Lembert Dome for a huge view over the meadows and the high peaks.",
      "The dome is steep, smooth granite: go only as high as feels safe, and never go up with storms near. Start early to beat the afternoon clouds.",
      "Both can be joined in a loop of about 5 mi (8 km)."))

page('<div class="kicker">Hikes · Tuolumne Meadows (summer and fall)</div>' +
 card(15, "Gaylor Lakes", "Gaylor Lakes Trailhead at the Tioga Pass Entrance, on Tioga Road.", "Moderate",
      [("Round trip", "2.6 mi", "4.2 km"), ("Climb", "500 ft", "152 m"), ("Time", "2 to 3 hours", "NPS estimate"), ("Start", "9,945 ft", "3,031 m")],
      "A short, steep climb to a ridge, then down 200 ft (60 m) to a high alpine lake ringed by peaks. Above the trees, with big views of the Sierra crest.",
      "This trail starts at almost 10,000 ft. The air is thin: go slowly and rest often. Not a first-day hike if you came up from the coast this morning.") +
 card(16, "Cathedral Lakes", "Cathedral Lakes Trailhead by the Tuolumne Meadows Visitor Center. The roadside parking fills early.", "Hard",
      [("Round trip", "7.6 mi", "12 km"), ("Climb", "1,000 ft", "305 m"), ("Time", "6 to 7 hours", "NPS estimate"), ("Best", "July to Sept", "Full day")],
      "The most popular trail in Tuolumne: through forest and up to granite-rimmed lakes under the spire of Cathedral Peak. A swim in the lake on a warm day is a reward.",
      "Long and high. Carry enough water and a filter, eat often, and keep to your turnaround time. Watch the sky after midday.",
      "A 0.7 mi (1.1 km) side trail leads to Lower Cathedral Lake. Ask at the visitor center which lake suits your group."))

# 22 big days
page("""<div class="kicker">Big days</div><h2>Big days for fit hikers</h2>
<p class="lead">These are serious, all-day hikes with large climbs. Go only with training behind you, an early start, plenty of water, a headlamp and a turnaround time you keep.</p>
<table class="tt"><tr><th>Hike</th><th>Distance</th><th>Climb</th><th>Time</th></tr>
<tr><td>Top of Yosemite Falls</td><td>7.2 mi / 11.6 km round trip</td><td>2,700 ft / 825 m</td><td>6 to 8 h</td></tr>
<tr><td>Half Dome (permit)</td><td>14 to 16.4 mi / 22.4 to 26.2 km round trip</td><td>4,800 ft / 1,475 m</td><td>Full day</td></tr>
<tr><td>Chilnualna Falls (Wawona)</td><td>8.2 mi / 13 km round trip</td><td>2,400 ft / 732 m</td><td>5 to 7 h</td></tr>
<tr><td>Four Mile Trail</td><td>4.8 mi / 7.7 km one way</td><td>3,200 ft / 975 m</td><td>3 to 4 h down</td></tr>
<tr><td>Panorama Trail</td><td>8.2 mi / 13.2 km one way</td><td>800 ft climb after Illilouette</td><td>6 to 8 h</td></tr>
<tr><td>Elizabeth Lake (Tuolumne)</td><td>6.8 mi / 11 km round trip</td><td>1,000 ft / 305 m</td><td>6 to 7 h</td></tr></table>
<div class="mini">
<div><h3>Upper Yosemite Fall</h3><div class="s">Hot, steep, no shade</div><p>The park recommends about 4 quarts (4 liters) of water. No water or restrooms on the trail. Start at first light in summer.</p></div>
<div><h3>Half Dome</h3><div class="s">Permit, cables, exposure</div><p>The last 400 ft (120 m) is a cable climb up smooth granite. Never go up when the rock is wet or storms are near. Turning around below the top is a good choice, not a failure.</p></div>
<div><h3>One-way trails</h3><div class="s">Need a ride up</div><p>Four Mile and Panorama run from Glacier Point down to the valley. Plan the ride up first (the Glacier Point Tour bus, reservations required).</p></div>
<div><h3>Chilnualna Falls</h3><div class="s">Long and steep</div><p>The lower cascades are only 0.25 mi (400 m) from the trailhead. The rest is a long climb: turn back whenever you like.</p></div></div>
<div class="warn">Hikes this big go wrong in the afternoon: heat, storms, empty water bottles and tired legs on the way down. Set your turnaround before you start and keep it.</div>""")

def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"

# 23 one day
page('<div class="kicker">Sample plans</div><h2>1 day: the valley highlights</h2>' +
 plan("A full day in Yosemite Valley", "Any season", [
  ("Before 8", "Arrive early and park once. Walk the Lower Yosemite Fall loop (hike 1) in the quiet morning."),
  ("Morning", "Shuttle to Happy Isles. Vernal Fall footbridge (hike 4), or the top of the fall if legs are strong."),
  ("Midday", "Picnic by the Merced River (food within arm's reach). Visit the Welcome Center and its exhibits."),
  ("Afternoon", "Cook's Meadow (hike 2), then drive to Tunnel View for the classic view of El Capitan, Bridalveil Fall and Half Dome."),
  ("Evening", "Bridalveil Fall on the way out, or sunset at Valley View by the Merced River.")]) +
 '<div class="box forest"><h3>Summer swap: Glacier Point</h3><p style="margin:0">When Glacier Point Road is open (usually May to November), trade the afternoon for the drive up, Glacier Point and Sentinel Dome or Taft Point (hikes 7 and 8). Allow about an hour each way from the valley.</p></div>'
 + '<h3>Rules of thumb</h3>' + chk(["One main hike, started early", "Park once in the valley and ride the shuttle", "Food always in reach or locked away", "Fill the tank before you enter", "Check road and trail alerts in the morning"])
 + '<div class="em"><h3>Leave time to look</h3><p>The best moments in the valley are often from a meadow, not a summit. Do less, and sit still for a while.</p></div>')

# 24 three days
page('<div class="kicker">Sample plans</div><h2>3 days: the valley, the rim and the big trees</h2>' +
 plan("Valley, rim and big trees", "2 or 3 nights", [
  ("Day 1", "Arrive. Lower Yosemite Fall and Cook's Meadow (hikes 1 and 2). Evening at Tunnel View."),
  ("Day 2", "Early start for the Mist Trail: Vernal Fall, or Nevada Fall for strong hikers (hikes 4 and 5). Rest by the river in the afternoon. Mirror Lake (hike 3) if you still have legs."),
  ("Day 3", "Drive to the Mariposa Grove: Grizzly Giant Loop (hike 10), then Wawona Meadow or the Swinging Bridge (hike 12). In summer, go up Glacier Point Road for sunset at Sentinel Dome (hike 7).")]) +
 '''<div class="box forest"><h3>Make it your own</h3><p style="margin:0">Small children? Swap the Mist Trail for the Vernal Fall footbridge only, and add the Big Trees Loop. Spring trip? Add Wapama Falls at Hetch Hetchy (hike 11) when the falls are at their best.</p></div>
<h3>Booking order for this plan</h3>''' + chk(["Lodging or campsite for 2 or 3 nights", "Rental car, and fill the tank before you enter", "Park pass: one 7-day vehicle pass covers all 3 days", "Glacier Point Tour bus, if you will not drive up"])
 + '<div class="box"><h3 style="margin-top:0">Pace yourself</h3><p style="margin:0">The Mist Trail day is the hard one. Put an easy day after it, not before.</p></div>')

# 25 five days
page('<div class="kicker">Sample plans</div><h2>5 days with Tuolumne (summer and fall)</h2>' +
 plan("Valley, rim and high country", "5 nights", [
  ("Day 1", "Arrive. Valley walks: Lower Yosemite Fall, Cook's Meadow (hikes 1 and 2), Tunnel View."),
  ("Day 2", "Mist Trail early (hikes 4 and 5). Easy afternoon."),
  ("Day 3", "Mariposa Grove (hike 10) in the morning. Glacier Point Road in the afternoon: Taft Point and sunset on Sentinel Dome (hikes 7 and 8)."),
  ("Day 4", "Drive Tioga Road east, with stops at Olmsted Point and Tenaya Lake. Easy first walk up high: Soda Springs (hike 13). Sleep near Tuolumne or in Lee Vining."),
  ("Day 5", "Dog Lake and Lembert Dome (hike 14), or Cathedral Lakes for a full day (hike 16). Leave over Tioga Pass or back west.")]) +
 '''<div class="cols"><div><h3>Book for this plan</h3>''' + chk(["3 nights near the valley", "2 nights at Tuolumne Meadows Campground or in Lee Vining", "One 7-day vehicle pass", "Check that Tioga Road is open"]) + '''</div>
<div><h3>Altitude on day 4</h3><p>You climb from about 4,000 ft (1,200 m) to 8,600 ft (2,600 m) in one drive. Keep day 4 easy, drink water, and save the long hike for day 5.</p></div></div>
<div class="em"><h3>Before late May or after early November?</h3><p>Tioga Road is usually closed. Swap days 4 and 5 for Hetch Hetchy (hike 11) and a quiet valley day: the Valley Loop Trail or Mirror Lake (hike 3).</p></div>
<div class="box"><h3 style="margin-top:0">Fuel for Tioga Road</h3><p style="margin:0">Services in Tuolumne are very limited. The nearest gas is at Crane Flat inside the park, or Lee Vining outside it. Fill up and bring all the food and water you need for the day.</p></div>''')

# 26 packing by season
page("""<div class="kicker">Checklist</div><h2>Packing checklist by season</h2>
<div class="cl">
<div><h3>Every hike (the Ten Essentials)</h3>""" + chk(["Map, plus the NPS App with offline maps", "Headlamp with fresh batteries", "Sun protection: hat, sunglasses, sunscreen", "First aid kit, with blister care", "Knife or multi-tool", "Fire starter (for emergencies only)", "Emergency shelter: a space blanket", "Extra food", "Extra water, plus a filter or tablets", "Extra layer: warm top and rain jacket"]) + """
<h3>For this park</h3>""" + chk(["Park pass on your phone (screenshot)", "A card: the park is cashless", "Shoes with good grip for wet granite", "Trekking poles for steep steps", "Small bag to pack out all trash"]) + """</div>
<div><h3>Spring (March to May)</h3>""" + chk(["Rain jacket for waterfall spray", "Warm layer for cold mornings", "Traction for icy trails early in spring"]) + """
<h3>Summer (June to August)</h3>""" + chk(["Extra water: 3 to 4 liters for big days", "Sun hat and a light long-sleeve shirt", "Insect repellent for meadows", "Warm layer for Tuolumne evenings"]) + """
<h3>Fall (September to November)</h3>""" + chk(["Layers for freezing mornings", "Hat and gloves up high", "Headlamp: days are short"]) + """
<h3>Winter (December to February)</h3>""" + chk(["Tire chains in the car", "Insulated jacket, hat, gloves", "Microspikes for icy trails", "Thermos with a warm drink"]) + """</div></div>
<div class="box forest" style="margin-top:10pt"><h3>Layers beat one big jacket</h3><p style="margin:0">A morning in the valley and an afternoon at Glacier Point or Tuolumne can feel like two different seasons. Pack a base layer, a warm layer and a rain shell, skip cotton, and add or remove layers before you get too hot or too cold.</p></div>""")

# 27 budget
rows = [("Park pass", "7-day vehicle pass or annual pass (page 5)"), ("Flights", ""), ("Rental car and gas", "Fill up outside the park"), ("Lodging and campsites", ""), ("Half Dome lottery", "$10 per application, $10 per person"), ("Glacier Point Tour", "Optional"), ("Food and groceries", ""), ("Gear", "Poles, water filter, layers"), ("Souvenirs", ""), ("Extra for surprises", "About 10 percent")]
page('<div class="kicker">Money</div><h2>Trip budget planner</h2><p class="lead">Lodging is usually the biggest cost near Yosemite in season. Write the plan first, then the real numbers as you book.</p>'
 + '<div class="f2"><div class="fl">Number of people</div><div class="fl">Number of nights</div></div>'
 + '<table class="bud" style="margin-top:6pt"><tr><th>Item</th><th>Notes</th><th style="text-align:right">Planned</th><th style="text-align:right">Actual</th></tr>'
 + "".join(f'<tr><td class="c">{a}</td><td class="small">{b}</td><td class="a"></td><td class="a"></td></tr>' for a, b in rows)
 + '<tr class="tot"><td>Total</td><td></td><td class="a"></td><td class="a"></td></tr></table>'
 + '<div class="box" style="margin-top:10pt"><h3 style="margin-top:0">Ways to spend less</h3><p style="margin:0">One vehicle pass covers everyone in the car for 7 days. Visiting more parks this year? An annual pass may cost less. Groceries from a gateway town cost far less than meals in the park, and a campsite costs far less than a hotel room.</p></div>')

# 28 day-by-day planner
def dayp():
    return '<div class="dayp"><div class="f2"><div class="fl">Day and date</div><div class="fl">Sleeping in</div><div class="fl">Area and main hike</div><div class="fl">Start by / turn back by</div><div class="fl">Bookings that day</div><div class="fl">Backup plan</div></div></div>'
page('<div class="kicker">Planner</div><h2>Day-by-day trip planner</h2><p style="margin-bottom:6pt">One box a day. Fill it in pencil: weather, smoke and road openings change plans.</p>' + "".join(dayp() for _ in range(5)))

# 29 hike log + memories
page('<div class="kicker">Memories</div><h2>Hike log and park memories</h2>'
 + '<table class="spots"><tr><th style="width:1.6in">Hike</th><th>Date</th><th>Who with</th><th>Best moment</th><th style="text-align:center">Done</th></tr>'
 + "".join('<tr><td style="height:27pt"></td><td></td><td></td><td></td><td class="b"></td></tr>' for _ in range(10))
 + '</table><div class="notes"><div class="lab">The view I will remember</div>' + lines(4) + '<div class="lab">Wildlife we saw (from a distance)</div>' + lines(3) + '<div class="lab">Next time in Yosemite</div>' + lines(4) + '</div>')

# 30 sources + back
page("""<div class="kicker">Before you go</div><h2>Official sources</h2>
<div class="mini">
<div><h3>Yosemite National Park</h3><div class="s">nps.gov/yose · 209-372-0200</div><p>Alerts, current conditions, road status, entry rules for your year, trail closures, bear rules.</p></div>
<div><h3>Reservations</h3><div class="s">recreation.gov · 877-444-6777</div><p>Campgrounds, Half Dome lotteries, wilderness permits and digital passes.</p></div>
<div><h3>Roads</h3><div class="s">nps.gov/yose · quickmap.dot.ca.gov</div><p>Park road status and chain controls, plus California state highways to the park.</p></div>
<div><h3>Weather and air</h3><div class="s">weather.gov · airnow.gov</div><p>Forecasts, storm warnings and wildfire smoke.</p></div></div>
<div class="box forest" style="margin-top:12pt"><div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:10pt">HikeSupply Co.</div><h3>Enjoy Yosemite</h3><p>Thank you for choosing a HikeSupply guide. Start early, stay out of fast water, keep your food close, and turn back when the trail or the sky says so.</p>
<p style="margin:0">Plan your next trip: the US National Parks Hiking Tracker, the Trail Ready training plan and our other park trip guides at <b>hikesupplyco.com</b></p></div>
<h3>Notes</h3>""" + lines(9, 24) + """
<p class="small" style="margin-top:8pt">General trip planning information only, checked against nps.gov in November 2026. Roads, entry rules, permits, fees and closures change: always check nps.gov/yose and ask a ranger before you hike. Hike within your ability and turn back when in doubt. Not affiliated with the National Park Service. For personal use only. COVERCREDIT</p>""")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip()
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
