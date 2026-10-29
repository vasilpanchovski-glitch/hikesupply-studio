"""Generates index.html for p08 (Grand Canyon South Rim — Trip Planning Guide). Run: python3 gen.py
Same look as p06 (base.css + extra.css copied from p06). Facts checked in October 2026 against nps.gov/grca
(day hiking, trail distances, Bright Angel / South Kaibab / Rim Trail day-hike sheets, fees, shuttles, camping,
lodging, weather, safety, wildlife, key hiking messages, North Rim status, Oct 26 2026 trail reopening release)
and grandcanyonlodges.com alerts (Oct 28 2026)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Grand Canyon South Rim"
CHECKED = "October 2026"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))

MORE = """
.hk .st{grid-template-columns:1.05fr 1.05fr 1fr 1fr}
.prof{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:10pt 12pt 6pt;margin:8pt 0}
.prof text{font-family:var(--sans)}
.tt td{font-size:10pt;padding:6pt 6pt}
.tt td:first-child{font-weight:600;color:var(--forest)}
.sig{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt;margin:8pt 0}
.sig>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 12pt}
.sig h3{margin:0 0 5pt;font-size:13pt}
.sig .lbl{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin:7pt 0 3pt}
.sig p{margin:0;font-size:10pt;line-height:1.42}
.sig .act{border-top:0.6pt solid var(--line);margin-top:7pt;padding-top:6pt}
.spots td{font-size:10pt;padding:6pt 6pt}
.spots td.b{width:0.9in;text-align:center}
.spots td.b::before{content:"";display:inline-block;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.now{border:1.6pt solid var(--clay);border-radius:9pt;padding:11pt 14pt;margin:10pt 0;background:#fff}
.now h3{margin:0 0 4pt;font-size:13pt;color:var(--rust)}
.now p{margin:0;font-size:10.3pt;line-height:1.45}
html.bw .now{border-color:#444}
"""

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 120 L120 120 L120 150 L150 150 L150 185 L185 185 L185 230 L215 230 L215 280 L255 280 L255 230 L285 230 L285 185 L320 185 L320 150 L350 150 L350 120 L470 120" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M215 300 Q235 292 255 300" stroke="#F5F1EA" stroke-width="3"/>
<circle cx="380" cy="60" r="20" stroke="#F5F1EA" stroke-width="3"/>
<path d="M40 120 L40 100 M30 104 L40 92 L50 104 M420 120 L420 98 M410 102 L420 90 L430 102" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M60 165 C100 175 120 200 160 205 C190 210 200 240 230 255" stroke="#F5F1EA" stroke-width="3" stroke-dasharray="2 10"/>
</svg></div>
<div><h1>Grand Canyon South Rim</h1><p class="sub">A trip planning guide for first-time visitors. When to go and what to book, 1, 2 and 3-day plans, 6 rim walks, 4 short canyon hikes with honest turnaround points, and the heat and water rules that keep you safe.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>10 walks and hikes</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">The Grand Canyon is a mile deep and up to 18 miles wide, and most visitors only see it from the top. This guide helps you plan a first trip to the South Rim: the side that is open all year, with the most viewpoints, walks and services.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["The park at a glance, and when to go", "A booking timeline, fees and passes", "Airports, gateway towns and the free shuttles", "Sample 1, 2 and 3-day plans", "6 rim walks for every fitness level", "4 short canyon hikes with turnaround points", "Heat, water, winter ice and edge safety", "Packing list, day plans, budget and trip log"]) + f"""</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers. Every walk here is a day walk on a marked trail, from a flat paved path to a steep half-day climb back out of the canyon.</p>
<h3>How to read the hikes</h3><p>Distances are round trip, in miles and kilometers. Elevation is in feet and meters. Inside the canyon you walk down first, so the climb is the part you do at the end, when you are tired. The figures come from the National Park Service.</p></div></div>
<div class="box forest"><h3>Checked against nps.gov in {CHECKED}</h3><p style="margin:0">Fees, shuttle seasons, water stations and trail closures change, and floods, fires and storms can close areas at short notice. Before you go, check the official pages on page 27, and ask a ranger when you arrive.</p></div>
<h3>Print it or keep it offline</h3>
<p>Cell service in the park is limited. Print the pages you need, or save this PDF to your phone before you leave home. The fill-in pages (23 to 26) are made for printing.</p>""")

# 3 at a glance
page("""<div class="kicker">The park</div><h2>At a glance</h2>
<p class="lead">The canyon has two rims. The South Rim is where most first trips happen: one park road along the edge, a village with lodges and a visitor center, and free shuttle buses between the viewpoints.</p>
<div class="glance">
<div><h3>South Rim</h3><table>
<tr><td>Height</td><td>About 7,000 ft (2,135 m)</td></tr>
<tr><td>Open</td><td>All year, 24 hours</td></tr>
<tr><td>Village</td><td>Lodges, visitor center, Mather Point and the Bright Angel Trailhead</td></tr>
<tr><td>West</td><td>Hermit Road, 7 mi (11 km) to Hermits Rest. Closed to private cars March 1 to November 30: ride the Red shuttle</td></tr>
<tr><td>East</td><td>Desert View Drive, 23 mi (37 km) to the Desert View Watchtower and the East Entrance</td></tr></table></div>
<div><h3>North Rim</h3><table>
<tr><td>Height</td><td>About 8,000 ft (2,438 m)</td></tr>
<tr><td>Open</td><td>Seasonal only. Closed to cars in winter</td></tr>
<tr><td>2026</td><td>The 2025 Dragon Bravo Fire destroyed the Grand Canyon Lodge. No lodging or campground inside the park and many trails closed in 2026</td></tr>
<tr><td>Getting there</td><td>A drive of more than 200 mi (320 km) from the South Rim</td></tr>
<tr><td>Before you plan</td><td>Check nps.gov/grca/northrimstatus.htm</td></tr></table></div></div>
<h3>The free shuttle buses</h3>
<table><tr><th>Route</th><th>Goes to</th><th>Season</th></tr>
<tr><td><b>Village (Blue)</b></td><td>Visitor center, lodges, Market Plaza, campground</td><td>All year</td></tr>
<tr><td><b>Kaibab Rim (Orange)</b></td><td>Mather Point, Yavapai, and the only way to the South Kaibab Trailhead and Yaki Point</td><td>All year</td></tr>
<tr><td><b>Hermits Rest (Red)</b></td><td>The nine stops along Hermit Road</td><td>March 1 to Nov 30</td></tr>
<tr><td><b>Hikers' Express</b></td><td>Early buses from Bright Angel Lodge to the South Kaibab Trailhead</td><td>Seasonal times</td></tr>
<tr><td><b>Tusayan (Purple)</b></td><td>From the gateway town of Tusayan into the park</td><td>Summer only</td></tr></table>
<p class="small">Shuttles are free with your entrance pass, and no tickets are needed. Pets are not allowed on the buses. Times change by season: check the current schedule on nps.gov/grca.</p>""")

# 4 when to go
page("""<div class="kicker">Timing</div><h2>When to go</h2>
<p class="lead">Spring and fall are the best seasons for a first hiking trip: mild days on the rim and a canyon that is warm, not dangerously hot. Summer is the busiest time, and the inner canyon is at its most dangerous.</p>
<div class="seas">
<div class="best"><div class="m">March to May</div><h3>Spring</h3><p>Rim highs climb from the 50s and 60s °F (10 to 21 °C) in April toward the 70s and 80s by June. Nights can still freeze in April and May, and the upper trails can be icy early in spring.</p></div>
<div><div class="m">June to August</div><h3>Summer</h3><p>Rim highs are usually in the 80s °F (27 to 32 °C), but the canyon floor passes 100 °F (38 °C) and can exceed 110 °F (43 °C). Thunderstorms are frequent in July and August. The busiest months.</p></div>
<div class="best"><div class="m">September to November</div><h3>Fall</h3><p>Rim highs fall from the 60s °F (16 to 21 °C) in September to the 50s by November, and the canyon cools from the 90s toward the 70s. Storms ease after mid-September. Fewer people after Labor Day.</p></div>
<div><div class="m">December to February</div><h3>Winter</h3><p>Rim highs in the 40s °F (4 to 9 °C), nights in the teens (about -10 °C). The South Rim gets about 58 in (147 cm) of snow a year. Quiet and beautiful, but trails can be icy (page 18).</p></div></div>
<h3>Crowds</h3>
<p>Mather Point, the Village and the South Entrance are busiest from late morning to mid-afternoon, on weekends and in summer. Come in early or late, use the free shuttles instead of hunting for parking, and do your canyon hike first thing in the morning.</p>
<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr>
<tr><td>The best weather for a hike below the rim</td><td>April to May, late September to October</td></tr>
<tr><td>Snow on the canyon walls, few people</td><td>December to February</td></tr>
<tr><td>Long days and every service open</td><td>June to August (hike only early in the day)</td></tr>
<tr><td>Hermit Road by your own car</td><td>December to February</td></tr></table>""")

# 5 booking timeline
page("""<div class="kicker">Plan ahead</div><h2>Booking timeline</h2>
<p class="lead">Beds and campsites inside the park fill early for spring, summer and fall. Book where you sleep first, then plan the days around it. Day hikes need no permit.</p>
<div class="bk">
<div><b>15 months before</b><p>Phantom Ranch, at the bottom of the canyon, books by online lottery 15 months ahead. It is a hike or mule ride down, never a day trip. Closed after a flood in August 2026: check its status first.</p></div>
<div><b>As early as allowed</b><p>South Rim lodges: El Tovar, Bright Angel, Kachina, Thunderbird and Maswik (grandcanyonlodges.com), and Yavapai Lodge (visitgrandcanyon.com). They often fill a year ahead. Check each site for its booking window.</p></div>
<div><b>6 months before</b><p>Mather Campground (open all year) and Desert View Campground (spring to mid-fall) on recreation.gov. You can book up to six months ahead.</p></div>
<div><b>Any time</b><p>Rooms in Tusayan, Williams and Flagstaff, rental cars and flights. A backcountry permit (recreation.gov) is only needed to sleep below the rim.</p></div>
<div><b>On arrival</b><p>Nothing. There is no timed entry, and the shuttle buses need no tickets.</p></div></div>
<h3>Entrance fees (October 2026)</h3>
<table class="fee"><tr><th>Pass</th><th>Price</th><th>Covers</th></tr>
<tr><td>Private vehicle</td><td>$35</td><td>One car and everyone in it, 7 days, both rims</td></tr>
<tr><td>Per person (walk-in or bike)</td><td>$20</td><td>7 days. Under 16 free</td></tr>
<tr><td>America the Beautiful, US residents</td><td>$80</td><td>One year, all national parks</td></tr>
<tr><td>America the Beautiful, non-residents</td><td>$250</td><td>One year, all national parks, no extra per-person fee</td></tr>
<tr><td>Non-resident fee</td><td>$100 each</td><td>Per person 16+, on top of the entrance fee, unless you hold an annual pass</td></tr></table>
<p class="small">The park takes cards only, no cash. Visiting from Canada or anywhere outside the US? You count as a non-resident, and the non-resident fee is being challenged in court, so check nps.gov/grca/planyourvisit/fees.htm before you go.</p>""")

# 6 getting there
page("""<div class="kicker">Getting there</div><h2>Airports and gateway towns</h2>
<p class="lead">Most visitors fly to Phoenix or Las Vegas and drive. Plan a car: the park shuttles are great once you are there, but there is little public transport to the park.</p>
<table><tr><th>Airport</th><th>Distance to the South Rim</th><th>Good to know</th></tr>
<tr><td><b>Flagstaff (FLG)</b>, Arizona</td><td>About 80 mi (130 km)</td><td>Closest airport with rental cars, but few flights</td></tr>
<tr><td><b>Phoenix (PHX)</b>, Arizona</td><td>About 230 mi (370 km)</td><td>Most flights. About 3.5 to 4 hours by car via Flagstaff</td></tr>
<tr><td><b>Las Vegas (LAS)</b>, Nevada</td><td>About 275 mi (445 km)</td><td>Many flights. About 4.5 hours by car via Williams</td></tr>
<tr><td><b>Grand Canyon Airport</b>, Tusayan</td><td>7 mi (11 km)</td><td>Small; mostly tour flights from the Las Vegas area. No rental cars</td></tr></table>
<div class="box"><h3 style="margin-top:0">Two ways in</h3><p style="margin:0">The South Entrance (Highway 64 through Tusayan) leads to Grand Canyon Village. The East Entrance (Highway 64 from Cameron, 25 mi / 40 km away) brings you in at Desert View. Come in one way and leave the other to see the whole rim drive.</p></div>
<h3>Gateway towns</h3>
<div class="cols" style="gap:4pt 20pt">
<p><b>Tusayan</b>, 7 mi (11 km) south. Hotels and restaurants right outside the South Entrance. Summer shuttle into the park.</p>
<p><b>Williams</b>, 60 mi (100 km) south. Route 66 town and home of the Grand Canyon Railway, a historic train to the Village (book ahead).</p>
<p><b>Flagstaff</b>, 80 mi (130 km) southeast. A real city with the most rooms, food and gear stores.</p>
<p><b>Inside the park</b>. The least driving and the best sunrises, if you book far ahead (page 5).</p></div>
<div class="warn"><b>Fill up before you arrive.</b> Gas stations are few, and in winter some services at Desert View close. Keep the tank over half full.</div>""")

# 7-8 sample plans
def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"
page('<div class="kicker">Sample plans</div><h2>1 day and 2 days</h2>' +
plan("1 day: the essentials", "Spring or fall", [
 ("Early", "Hikers' Express or the Orange shuttle to the South Kaibab Trailhead. Walk down to Ooh Aah Point (hike A) and back up while it is cool."),
 ("Morning", "Orange shuttle to Mather Point, then walk the Rim Trail to Yavapai Point and the Geology Museum (walk 1)."),
 ("Afternoon", "Walk the Trail of Time toward the Village (walk 2). Lunch, then look around the historic buildings by El Tovar."),
 ("Evening", "Red shuttle out Hermit Road to Hopi Point or Mohave Point for sunset (walk 3). The last bus leaves one hour after sunset.")]) +
plan("2 days: rim and canyon", "Arrive the evening before if you can", [
 ("Day 1", "Mather Point and the Rim Trail to Yavapai (walk 1), the Trail of Time (walk 2). Red shuttle to Hopi Point for sunset."),
 ("Day 2", "Early start: Cedar Ridge on the South Kaibab (hike B) or the Bright Angel to the 1.5 Mile Resthouse (hike C). After lunch and a rest, ride the Red shuttle to Monument Creek Vista and walk the Greenway to Hermits Rest (walk 4).")]) +
'<div class="box"><h3 style="margin-top:0">How many days do you need?</h3><p style="margin:0">One day shows you the famous views and a taste of the trail. Two days lets you hike below the rim without rushing. Three days adds the quiet east side and a sunrise. In summer, plan your hikes for the first hours after dawn and keep the middle of the day for the rim, the museum and shade.</p></div>')

page('<div class="kicker">Sample plans</div><h2>3 days on the South Rim</h2>' +
plan("3 days: slow and complete", "Sleep in the park or Tusayan", [
 ("Day 1", "Arrive, park once and switch to the shuttles. Mather Point, the Rim Trail to Yavapai (walk 1) and the Trail of Time to the Village (walk 2). Sunset at Hopi Point."),
 ("Day 2", "Canyon day. Start at first light on the South Kaibab: Cedar Ridge (hike B), or Skeleton Point only if it is cool and you are a strong hiker. Rest in the afternoon. Evening walk on the Greenway to Hermits Rest (walk 4)."),
 ("Day 3", "Sunrise at Mather Point or Yavapai Point. Drive east on Desert View Drive: Shoshone Point (walk 5), Grandview Point, Moran Point and Lipan Point, then the Watchtower at Desert View (walk 6). Leave by the East Entrance.")]) +
'''<div class="box forest"><h3>Make it your own</h3><p style="margin:0">Have more time? Add the Bright Angel to the 3 Mile Resthouse (hike D) in the cool season, or ride the Grand Canyon Railway from Williams. Less energy? Every day here works on the rim alone, with no hike below the edge.</p></div>
<h3>Rules of thumb for planning</h3>''' + chk(["One canyon hike a day, started early and finished before the heat", "Use the shuttles: parking near the rim fills by late morning", "Plan sunset and sunrise spots ahead, and check the last bus time", "Keep one loose half-day for storms, closures or a slow morning", "Write your plan on the day pages (23 to 24) and leave a copy with someone at home"]))

# 9-15 walks and hikes
def card(no, kind, name, where, level, stats, see, tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    st = "".join(f'<div><b>{a}</b><span>{b}</span><em>{c}</em></div>' for a, b, c in stats)
    return f'''<div class="hk"><div class="top"><div><small>{kind} {no}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st">{st}</div>
<p><span class="lb">Where</span>{where}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Good to know</span>{tip}</p>{nt}</div>'''
def hpage(sub, a, b, extra=""):
    page(f'<div class="kicker">{sub}</div>{a}{b}{extra}')
W = "Rim walk"; H = "Canyon hike"

hpage("Rim walks · The Village",
 card(1, W, "Mather Point to Yavapai Point", "Start at Mather Point, a short walk from the Grand Canyon Visitor Center (Orange or Blue shuttle).", "Easy",
      [("Round trip", "1.4 mi", "2.3 km"), ("Climb", "Nearly flat", "Mostly paved"), ("Water", "Visitor center", "None on the rim path"), ("Season", "All year", "Icy after snow")],
      "The classic first view: the canyon opens up below Mather Point, and the Rim Trail follows the edge to Yavapai Point, where the Geology Museum's big windows look straight across to the North Rim.",
      "Walk out and ride the Orange shuttle back, or turn this into a longer day on walk 2."),
 card(2, W, "Trail of Time", "From the Yavapai Geology Museum west along the Rim Trail toward Grand Canyon Village.", "Easy",
      [("One way", "2.8 mi", "4.56 km"), ("Climb", "Nearly flat", "Paved"), ("Time", "About 1 hr", "NPS estimate"), ("Season", "All year", "Fully accessible")],
      "A geology timeline on the rim path: every meter you walk is one million years of the canyon's history, with real rock samples to touch along the way. Good with kids (page 29).",
      "Ride the Blue shuttle back from the Village. There is no water along the Rim Trail itself, so carry a bottle."))
hpage("Rim walks · Hermit Road",
 card(3, W, "Powell Point to Mohave Point", "Hermit Road. Ride the Red shuttle (March 1 to November 30) to Powell Point and walk west.", "Easy",
      [("One way", "1.1 mi", "1.8 km"), ("Climb", "Small", "Dirt path, 3 ft wide"), ("Water", "None", "Carry your own"), ("Season", "All year", "Best at sunset")],
      "The Rim Trail turns into a narrow dirt path past Hopi Point, a favorite sunrise and sunset spot, to Mohave Point, where you can see the Colorado River far below.",
      "Shuttles stop at Hopi Point both ways, but only on the way back at Powell and Mohave. Check when the last bus leaves before sunset.",
      "Summer storms: lightning has killed and injured visitors at the park. If a storm builds, leave the rim and get into a bus, car or building."),
 card(4, W, "The Greenway to Hermits Rest", "Ride the Red shuttle to Monument Creek Vista and walk west past Pima Point.", "Easy",
      [("One way", "2.8 mi", "4.5 km"), ("Climb", "Gentle", "Paved, 9 ft wide"), ("Water", "Hermits Rest", "Snack bar, restrooms"), ("Season", "All year", "Bikes share it")],
      "A wide paved path on the old 1912 road, open to walkers, bikes and wheelchairs. Pima Point has huge views west, and on a quiet day you may hear the river. It ends at Hermits Rest, a stone building from 1914.",
      "Ride the Red shuttle back from Hermits Rest. In winter Hermit Road can close for a while in bad weather."))
hpage("Rim walks · Desert View Drive",
 card(5, W, "Shoshone Point", "Unpaved parking area off Desert View Drive, east of Yaki Point. Car only: no shuttle stops here.", "Easy",
      [("Round trip", "2 mi", "3.2 km"), ("Climb", "Flat", "Dirt road"), ("Water", "None", "Vault toilet only"), ("Season", "Dry months", "Muddy at thaw")],
      "A quiet walk through the pines on an old dirt road to one of the most peaceful viewpoints on the South Rim, with picnic tables and a long view east to the Watchtower.",
      "Shoshone Point can be reserved for private events. If the gate on the road is open, someone may have booked it: the park asks you to choose another spot."),
 card(6, W, "Desert View and the Watchtower", "End of Desert View Drive, 23 mi (37 km) east of the Village, near the East Entrance.", "Easy",
      [("Walk", "Short", "Lot to the rim"), ("Climb", "Stairs", "Inside the tower"), ("Tower", "Free", "Timed tickets"), ("Season", "All year", "Some shops close in winter")],
      "Mary Colter's stone Watchtower at the eastern edge of the rim, with one of the best views of the Colorado River and the painted desert beyond. On the drive here, stop at Grandview, Moran and Lipan Points.",
      "The tower is usually open 9 am to 5 pm, for up to 25 people at a time, with free tickets on the day. The gas pumps take cards 24 hours."))

hpage("Canyon hikes · South Kaibab Trail",
 card("A", H, "Ooh Aah Point", "South Kaibab Trailhead near Yaki Point. No private cars: take the Orange shuttle or the early Hikers' Express.", "Moderate",
      [("Round trip", "1.8 mi", "2.9 km"), ("Climb back", "600 ft", "183 m"), ("Water", "None", "Tank at trailhead"), ("Best", "Spring, fall", "Early in summer")],
      "The steep switchbacks drop straight off the rim, and in less than a mile the canyon opens up in a wide view east. The best payoff for the effort below the rim.",
      "Little shade and no water on the trail. Walk down slowly: every step down is a step back up at 7,000 ft (2,100 m)."),
 card("B", H, "Cedar Ridge", "Same trailhead. Keep going down past Ooh Aah Point.", "Strenuous",
      [("Round trip", "3 mi", "4.8 km"), ("Climb back", "1,140 ft", "347 m"), ("Water", "None", "Restrooms here"), ("Best", "Spring, fall", "Early in summer")],
      "A flat ridge with restrooms and wide views in every direction: the natural place to rest, eat and turn around.",
      "This is your turnaround in summer.",
      "The NPS says: do not go past Cedar Ridge on a summer day hike. In the cool season, strong hikers can go on to Skeleton Point (6 mi / 9.7 km round trip, 2,060 ft / 628 m to climb back), but no further on a day hike."))
hpage("Canyon hikes · Bright Angel Trail",
 card("C", H, "1.5 Mile Resthouse", "Bright Angel Trailhead, just west of Bright Angel Lodge in the Village (Blue shuttle).", "Strenuous",
      [("Round trip", "3 mi", "4.8 km"), ("Climb back", "1,130 ft", "345 m"), ("Water", "Seasonal", "Often off"), ("Best", "Spring, fall", "Early in summer")],
      "A wide, well-used trail that winds down past two short tunnels, with shade in the morning and a stone resthouse with toilets at the turnaround.",
      "Mules use this trail. Step off on the uphill side, away from the edge, and stand still until the last mule is 50 ft (15 m) past you.",
      "Water at the resthouses normally runs May to September only and is subject to pipe breaks. In fall 2026 it was turned off for the winter. Carry all the water you need."),
 card("D", H, "3 Mile Resthouse", "Same trailhead. Keep going down past the 1.5 Mile Resthouse.", "Strenuous",
      [("Round trip", "6 mi", "9.7 km"), ("Climb back", "2,110 ft", "644 m"), ("Water", "Seasonal", "Often off"), ("Best", "Spring, fall", "Not midday in summer")],
      "Steeper switchbacks down to a second resthouse on a ledge, with a big view down to Havasupai Gardens and the Tonto Plateau.",
      "A full morning, and the climb out takes much longer than the way down. Only for fit hikers on a cool day, with an early start.",
      "Havasupai Gardens (9 mi / 14.5 km round trip) is as far as the NPS suggests going on a summer day hike. For a first canyon hike, turn around well before it."))

# 14 profile + turnaround table
def px(mi): return 60 + mi * 165
def py(ft): return 18 + (7400 - ft) / 2800 * 190
SK = [(0, 7260), (0.9, 6660), (1.5, 6120), (3, 5220)]
BA = [(0, 6860), (1.5, 5729), (3, 4748)]
def path(pts): return "M" + " L".join(f"{px(a):.0f} {py(b):.0f}" for a, b in pts)
grid = "".join(f'<line x1="60" x2="565" y1="{py(f):.0f}" y2="{py(f):.0f}" stroke="#E6E0D3" stroke-width="1"/><text x="54" y="{py(f)+3:.0f}" font-size="9" text-anchor="end" fill="#8B8577">{f:,} ft</text>' for f in (7000, 6000, 5000))
xt = "".join(f'<text x="{px(m):.0f}" y="230" font-size="9" text-anchor="middle" fill="#8B8577">{m} mi</text>' for m in (0, 1, 2, 3))
def lab(pts, specs, col):
    out = ""
    for (a, b), (n, dx, dy, an) in zip(pts, specs):
        out += f'<circle cx="{px(a):.0f}" cy="{py(b):.0f}" r="4" fill="{col}"/><text x="{px(a)+dx:.0f}" y="{py(b)+dy:.0f}" font-size="9.5" fill="{col}" font-weight="600" text-anchor="{an}">{n}</text>'
    return out
svg = f'''<svg width="100%" viewBox="0 0 580 240">{grid}{xt}
<path d="{path(SK)}" fill="none" stroke="#2C3B2E" stroke-width="3"/><path d="{path(BA)}" fill="none" stroke="#B85C38" stroke-width="3" stroke-dasharray="7 5"/>
{lab(SK, [("South Kaibab Trailhead", 6, -8, "start"), ("Ooh Aah Point", 6, -8, "start"), ("Cedar Ridge", 6, -8, "start"), ("Skeleton Point", -8, -14, "end")], "#2C3B2E")}
{lab(BA, [("Bright Angel Trailhead", 2, 42, "start"), ("1.5 Mile Resthouse", -6, 16, "end"), ("3 Mile Resthouse", -8, 4, "end")], "#9C4221")}</svg>'''
page('''<div class="kicker">Turnaround points</div><h2>How far down, how far back up</h2>
<p class="lead">Canyon hikes work upside down: the easy part comes first. Pick your turnaround point before you start, based on the climb back, not the distance.</p>
<div class="prof"><div class="lab" style="margin-top:0">Elevation from the rim, one way (NPS figures)</div>''' + svg + '''<p class="small" style="margin:0">Solid line: South Kaibab. Dashed line: Bright Angel. The South Kaibab is steeper and has no water or shade; the Bright Angel is gentler, with some morning shade.</p></div>
<table class="tt"><tr><th>Turnaround</th><th>Round trip</th><th>Climb back</th><th>Advice</th></tr>
<tr><td>Ooh Aah Point (SK)</td><td>1.8 mi / 2.9 km</td><td>600 ft / 183 m</td><td>Best first taste</td></tr>
<tr><td>1.5 Mile Resthouse (BA)</td><td>3 mi / 4.8 km</td><td>1,130 ft / 345 m</td><td>Toilets at the turnaround</td></tr>
<tr><td>Cedar Ridge (SK)</td><td>3 mi / 4.8 km</td><td>1,140 ft / 347 m</td><td>NPS limit on a summer day</td></tr>
<tr><td>3 Mile Resthouse (BA)</td><td>6 mi / 9.7 km</td><td>2,110 ft / 644 m</td><td>Cool season, fit hikers</td></tr>
<tr><td>Skeleton Point (SK)</td><td>6 mi / 9.7 km</td><td>2,060 ft / 628 m</td><td>NPS limit on any day hike</td></tr></table>
<div class="warn"><b>Grandview and Hermit trails</b> are steep and unmaintained. The NPS suggests them only for experienced desert hikers, so they are not in this guide.</div>''')

# 15 on the trail
page("""<div class="kicker">On the trail</div><h2>Trail manners and practical stuff</h2>
<p class="lead">The two main trails are busy, steep and shared with mules. A few simple habits keep everyone safe.</p>
<div class="diff" style="margin-top:6pt">
<div><div class="tag">Always</div><h3>Do</h3><ul class="check"><li>Give uphill hikers the right of way</li><li>Step to the uphill side for mules and stand still until the last one is 50 ft (15 m) past</li><li>Pack out every bit of trash, including food scraps</li><li>Stay on the trail: cutting switchbacks causes erosion and falls</li></ul></div>
<div><div class="tag">Never</div><h3>Don't</h3><ul class="check"><li>Feed the squirrels or birds, even a crumb</li><li>Throw rocks over the edge: people hike below you</li><li>Take a dog below the rim (only service animals, after checking in)</li><li>Count on finding water on the trail</li></ul></div></div>
<h3>Water and toilets on the trails</h3>
<p>Both trailheads have drinking water all year: in 2026, from a large black tank beside the restrooms. On the Bright Angel, the resthouses normally have water from May to September only, and pipe breaks can shut it off without warning. The South Kaibab has no water at all. Toilets: Cedar Ridge, and the 1.5 and 3 Mile Resthouses.</p>
<div class="now"><h3>Fall 2026: what changed</h3><p>On August 29, 2026 a flash flood in Bright Angel Canyon damaged trails, bridges and the park's water line. The day hikes in this guide reopened, but Phantom Ranch, the river bridges and the North Kaibab Trail stayed closed, trail water was off for the winter, and South Rim lodges closed to overnight guests until November 20. Check nps.gov/grca/planyourvisit/key-messages.htm before your trip.</p></div>
<div class="box"><h3 style="margin-top:0">Your hike plan</h3><div class="f2"><div class="fl">Trail and turnaround</div><div class="fl">Water carried <span class="u"><b></b>L / fl oz</span></div><div class="fl">Start walking down</div><div class="fl">Turn around by</div></div></div>""")

# 16 down is optional
page("""<div class="kicker">The golden rule</div><h2>Down is optional, up is mandatory</h2>
<p class="lead">That old Grand Canyon saying explains most rescues here. Walking down feels easy and fast, so people go too far. Then they have to climb back out in the heat of the day, tired and out of water.</p>
<div class="dist"><div class="a"><div class="n">1 hour</div><div class="u">walking down</div><p>Feels like a gentle stroll.</p></div><div class="b"><div class="n">2 hours</div><div class="u">walking back up</div><p>The NPS says: plan on twice as long to hike up as it took to hike down.</p></div></div>
<div class="layers">
<div><div class="num">1</div><h3>Set a turnaround time</h3><p>Before you start, decide when you will turn back, wherever you are. Then stick to it.</p><div class="eg">A simple test: turn around when one third of your water and energy is gone.</div></div>
<div><div class="num">2</div><h3>It gets hotter</h3><p>The temperature rises about 5.5 °F for every 1,000 ft you go down (about 3 °C per 300 m).</p><div class="eg">The 3 Mile Resthouse is about 11 °F (6 °C) warmer than the rim.</div></div>
<div><div class="num">3</div><h3>Help is slow</h3><p>The NPS says more than 300 people are rescued from the canyon each year, and rescue can be delayed by heat, storms and other calls.</p><div class="eg">Plan to get yourself out.</div></div></div>
<h3>Why not to the river and back in one day?</h3>
<p>The river is about 4,400 to 4,800 ft (1,340 to 1,460 m) below the South Rim trailheads, and the round trip is about 15 mi (24 km) or more of steep trail, ending with the hardest climb of the day. The NPS asks hikers not to try it, especially from May to September. In fall 2026 the bridges at the bottom were closed after the flood anyway.</p>
<div class="em"><h3>Feeling sick, dizzy or wiped out?</h3><p>Stop in the shade, rest, eat something salty and drink. The NPS notes that recovering can take an hour or longer. Then walk up slowly, with rests, and ask other hikers for help if you need it.</p></div>""")

# 17 heat
page("""<div class="kicker">Safety</div><h2>Heat, water and salty snacks</h2>
<p class="lead">From May to September the inner canyon can pass 110 °F (43 °C). The NPS asks summer hikers not to be below the rim between 10 am and 4 pm.</p>
<div class="cols">
<div><h3>Hike in the cool hours</h3><p>Start at first light and be back on the rim before 10 am, or go after 4 pm with a headlamp for the walk up. Rest often in the shade.</p>
<h3>Drink when thirsty</h3><p>Carry enough water for the whole hike, plus extra, and a way to treat water. Drink when you are thirsty, but do not force down huge amounts: too much water without food can be dangerous too.</p></div>
<div><h3>Eat more than usual</h3><p>The NPS suggests eating double your normal carbohydrates and salty foods when hiking in heat. Pack pretzels, salted nuts, crackers and an electrolyte drink.</p>
<h3>Stay wet, stay cool</h3><p>Where there is water, soak your hat, scarf or shirt. A wet layer in the dry air cools you down fast.</p></div></div>
<div class="sig">
<div><h3>Heat exhaustion</h3><div class="lbl">Signs</div><p>Heavy sweating, headache, nausea, dizziness, weakness, pale skin.</p><div class="act"><p>Stop in the shade, cool down with water, drink and eat something salty. Rest until you feel normal.</p></div></div>
<div><h3>Heat stroke</h3><div class="lbl">Signs</div><p>Confusion, strange behavior, very hot skin, collapse. Life-threatening.</p><div class="act"><p>Call 911 or send for help at once. Move to shade and cool the person with water and fanning.</p></div></div>
<div><h3>Low salt (hyponatremia)</h3><div class="lbl">Signs</div><p>Nausea, vomiting, confusion, lots of clear urine, after drinking a lot without eating.</p><div class="act"><p>Stop drinking more water. Eat salty food. If confused or vomiting, get help.</p></div></div></div>
<div class="warn">Confusion is always an emergency. If someone is not making sense, do not let them walk on alone: call 911 or get a ranger.</div>""")

# 18 winter
page("""<div class="kicker">Safety</div><h2>Winter on the rim</h2>
<p class="lead">Snow on the red walls is one of the canyon's best sights, and the rim is quiet. It also brings ice, cold nights and short days.</p>
<div class="layers">
<div><div class="num">1</div><h3>Ice</h3><p>The NPS warns the upper parts of the Bright Angel and South Kaibab can be extremely icy in winter and early spring, and rim paths can be icy too.</p><div class="eg">Wear over-the-shoe traction devices and use hiking poles.</div></div>
<div><div class="num">2</div><h3>Cold</h3><p>Highs in the 40s °F (4 to 9 °C) and nights in the teens (about -10 °C) on the rim. Much warmer down in the canyon.</p><div class="eg">Dress in layers you can open on the climb and close at the top.</div></div>
<div><div class="num">3</div><h3>Short days</h3><p>The sun sets around dinner time and canyon walls shade the trails early.</p><div class="eg">Carry a headlamp, and check sunset before you start.</div></div></div>
<div class="cols">
<div><h3>Roads</h3><p>Snow can close roads for a while, including Hermit Road and Desert View Drive. From December to February you can drive Hermit Road in your own car, since the shuttle does not run. For road conditions, the park lists (928) 638-7496.</p></div>
<div><h3>What to pack</h3>""" + chk(["Traction devices and poles", "Warm hat, gloves, puffy jacket", "Waterproof boots and wool socks", "Hot drink in an insulated bottle", "Headlamp with spare batteries"]) + """</div></div>
<div class="em"><h3>Turn back at ice you cannot handle</h3><p>If the trail looks like a frozen slide and you have no traction devices, enjoy the view from the top. A fall on an icy switchback above a drop is not worth any viewpoint.</p></div>""")

# 19 altitude and weather
page("""<div class="kicker">Safety</div><h2>Altitude, storms and sun</h2>
<p class="lead">The South Rim sits at 7,000 ft (2,135 m), higher than most visitors live. The air is thin and dry, the sun is strong and summer storms build fast.</p>
<div class="layers">
<div><div class="num">1</div><h3>Altitude</h3><p>The NPS lists sunburn, dehydration, nausea, shortness of breath and exhaustion as risks up here. Take your time on the first day.</p><div class="eg">Headache or nausea that does not ease with rest? Take it easy and get help if it gets worse.</div></div>
<div><div class="num">2</div><h3>Storms</h3><p>Thunderstorms are frequent in July, August and early September, usually in the afternoon. Lightning has killed and injured visitors here.</p><div class="eg">Move away from the rim and lone trees. Shelter in a car, bus or building.</div></div>
<div><div class="num">3</div><h3>Flash floods</h3><p>Rain far away can send a flood down a side canyon without warning. Stay out of narrow drainages when storms are around.</p><div class="eg">Rushing water may be the first sign of rain upstream.</div></div></div>
<div class="cols">
<div><h3>Sun</h3><p>Many trails have little or no shade. Wear a wide-brim hat, sunglasses and sunscreen even on cool days, and a light long-sleeve shirt in summer.</p>
<h3>Layers</h3><p>Summer days in the 80s °F (27 to 32 °C) and nights in the 40s (4 to 9 °C) are normal. Carry a warm layer and a wind or rain jacket on every hike.</p></div>
<div><h3>Check every morning</h3>""" + chk(["Forecast at weather.gov for Grand Canyon Village", "Park alerts and the Key Hiking Messages page", "Sunrise and sunset times", "Heat warnings for the inner canyon", "Air quality on airnow.gov if there is smoke"]) + """</div></div>""")

# 20 wildlife and edge
page("""<div class="kicker">Safety</div><h2>The edge and the wildlife</h2>
<p class="lead">Most rim viewpoints have railings, but long stretches of the Rim Trail do not. The NPS asks everyone to stay at least 6 ft (2 m) from the edge.</p>
<div class="diff">
<div><div class="tag">At the edge</div><h3>Stay safe</h3><ul class="check"><li>Keep both feet on the path or the paved overlook</li><li>Never climb over railings or walls for a photo</li><li>No running, jumping or stunts near the rim</li><li>Hold children's hands at every viewpoint</li><li>Look where you step when you walk and take photos</li></ul></div>
<div><div class="tag">Wildlife</div><h3>Give room</h3><ul class="check"><li>Elk and bison: at least 100 ft (30 m)</li><li>Deer, bighorn sheep, condors, mountain lions: at least 75 ft (23 m), about two bus lengths</li><li>Squirrels, birds and reptiles: at least 20 ft (6 m)</li><li>Never feed any animal. It is illegal in all national parks</li></ul></div></div>
<div class="em"><h3>The most dangerous animal is the cute one</h3><p>The NPS says rock squirrels cause the most injuries to visitors here. Fed by people, they lose their fear and bite, and they can carry disease. Keep food packed away at viewpoints.</p></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Elk on the road</h3><p>Elk often walk through the Village and along the roads, especially at dawn and dusk. They are most aggressive in the fall rut and in spring with calves. Watch from your car or from far away.</p></div>
<div><h3>Pets</h3><p>Leashed pets may walk the Rim Trail, but they are not allowed below the rim, in buildings or on the shuttle buses. A kennel on the South Rim boards pets during your hike.</p></div></div>""")

# 21 no signal
page("""<div class="kicker">Before you go</div><h2>Limited signal: what to download and print</h2>
<p class="lead">Phone service in the park is limited and you should not rely on it, especially below the rim. Do this at home, on Wi-Fi.</p>
<div class="cols">
<div><h3>Download</h3><ul class="check"><li>The free NPS App, with Grand Canyon saved for offline use</li><li>Offline maps of the park and your gateway town</li><li>This guide, saved to your phone</li><li>Lodging, car and flight confirmations as screenshots</li><li>Your park pass, if you bought a digital one</li><li>The shuttle map and schedule for your dates</li></ul></div>
<div><h3>Print</h3><ul class="check"><li>The official park map and the free park newspaper (also handed out at the entrance)</li><li>Your day plans (pages 23 to 24) and the hike pages you need</li><li>Lodging addresses and phone numbers</li><li>The packing list (page 22)</li><li>An emergency contact card for each person</li></ul></div></div>
<div class="box"><h3 style="margin-top:0">Your trip plan, left with someone at home</h3>
<div class="f2"><div class="fl">Name</div><div class="fl">Phone</div><div class="fl">Dates in the park</div><div class="fl">Car, plate</div><div class="fl">Where we sleep</div><div class="fl">Call for help if no word by</div></div></div>
<div class="em"><h3>In an emergency</h3><p>Dial 911. If you have no signal below the rim, send someone up for help, or ask other hikers to tell a ranger. The park's main line is (928) 638-7888, and the Backcountry Information Center is (928) 638-7875.</p></div>""")

# 22 packing
page("""<div class="kicker">Checklist</div><h2>Packing list for the park</h2>
<div class="cl">
<div><h3>For a canyon hike (the Ten Essentials)</h3>""" + chk(["Map, and the NPS App with offline maps", "Headlamp with fresh batteries", "Sun protection: hat, sunglasses, sunscreen", "First aid kit, with blister care", "Knife or multi-tool", "Fire starter (no fires on the trails; for emergencies)", "Emergency shelter: a space blanket", "Extra food, with salty snacks", "Extra water, plus a way to treat it", "Extra layer: warm top and rain jacket"]) + """
<h3>For this park</h3>""" + chk(["Electrolyte drink mix", "Traction devices (late fall to spring)", "Spray bottle or bandana to stay wet and cool", "Park pass, ID and a card (no cash at entrances)"]) + """</div>
<div><h3>Clothes</h3>""" + chk(["Broken-in hiking shoes with good grip", "Hiking socks, two or more pairs", "Light long-sleeve sun shirt", "Hiking pants or shorts", "Fleece or light puffy jacket", "Wind or rain jacket", "Wide-brim hat (summer), warm hat (winter)"]) + """
<h3>For a rim day</h3>""" + chk(["Day pack and a refillable bottle", "Lunch and snacks for the shuttles", "Binoculars for the river and condors", "Phone charger and a power bank", "Printed maps and this guide", "Small trash bag: pack out everything", "Warm layer for sunrise and sunset"]) + """</div></div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Two climates in one hike</h3><p style="margin:0">A cold, windy morning on the rim can turn into a hot afternoon a few thousand feet below. Start with layers you can take off, and keep a dry shirt and extra water in the car.</p></div>""")

# 23-24 day plans
def dayplan(k):
    page(f"""<div class="kicker">Day plan {k}</div><h2>Plan one day</h2>
<div class="dp"><div class="f2"><div class="fl">Date</div><div class="fl">Area of the park</div><div class="fl">Sunrise</div><div class="fl">Sunset</div><div class="fl">Rim forecast</div><div class="fl">Canyon heat risk</div><div class="fl">Wake up</div><div class="fl">First shuttle</div></div></div>
<div class="lab">Main walk or hike</div>
<div class="dp"><div class="f2"><div class="fl">Trail</div><div class="fl">Turnaround point</div><div class="fl">Distance <span class="u"><b></b>mi / km</span></div><div class="fl">Climb back <span class="u"><b></b>ft / m</span></div><div class="fl">Start walking</div><div class="fl">Turn around by</div><div class="fl">Water carried</div><div class="fl">Backup if it is hot or icy</div></div></div>
<div class="lab">Viewpoints and stops</div>{lines(5)}
<div class="lab">Sunset or sunrise spot, and last bus back</div>{lines(2)}
<div class="f2" style="margin-top:4pt"><div><div class="lab">Food and gas</div>{lines(2)}</div><div><div class="lab">Sleep tonight</div>{lines(2)}</div></div>
<div class="f2"><div class="fl">Told someone at home</div><div class="fl">Back on the rim at</div></div>
<div class="opts" style="margin-top:8pt"><span>Water filled</span><span>Salty snacks</span><span>Hat and sunscreen</span><span>Layers</span><span>Headlamp</span><span>Park pass</span></div>""")
dayplan("A"); dayplan("B")

# 25 budget
rows = [("Park pass", "Entrance fee or an annual pass (page 5)"), ("Non-resident fees", "Visitors from outside the US"), ("Flights", ""), ("Rental car and gas", ""), ("Lodging and campsites", ""), ("Food and groceries", ""), ("Grand Canyon Railway", "Optional, from Williams"), ("Tours or ranger programs", "Many ranger talks are free"), ("Gear", "Traction devices, water bottles"), ("Souvenirs and books", ""), ("Extra for surprises", "About 10 percent")]
page('<div class="kicker">Money</div><h2>Trip budget</h2><p class="lead">Fill in your own numbers as you book. Write the plan first, then track what you really spend.</p>'
 + '<table class="bud"><tr><th>Item</th><th>Notes</th><th style="text-align:right">Planned</th><th style="text-align:right">Spent</th></tr>'
 + "".join(f'<tr><td class="c">{a}</td><td class="small">{b}</td><td class="a"></td><td class="a"></td></tr>' for a, b in rows)
 + '<tr class="tot"><td>Total</td><td></td><td class="a"></td><td class="a"></td></tr></table>'
 + '<div class="f2" style="margin-top:6pt"><div class="fl">Number of people</div><div class="fl">Cost per person</div></div>'
 + '<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Ways to spend less</h3><p style="margin:0">One car pass covers everyone in it for 7 days. The shuttles, rim walks, ranger talks and Junior Ranger program are free. Picnic lunches from the Market Plaza or a supermarket in Flagstaff cost far less than restaurant meals, and Tusayan or Williams rooms are often cheaper than the rim in busy months.</p></div>')

# 26 trip log + spots
spots = [("Mather Point", "Village, near the visitor center"), ("Yavapai Point", "Village, by the Geology Museum"), ("Hopi Point", "Hermit Road, a favorite at sunset"), ("Mohave Point", "Hermit Road, river views"), ("Pima Point", "Hermit Road, wide views west"), ("Shoshone Point", "Desert View Drive, quiet"), ("Grandview Point", "Desert View Drive"), ("Lipan Point", "Desert View Drive, river views"), ("Desert View", "The Watchtower, far east")]
page('<div class="kicker">Memories</div><h2>Trip log and sunrise and sunset spots</h2><p style="margin-bottom:4pt">Tick each viewpoint you see at sunrise or sunset. Always check when the last shuttle leaves.</p>'
 + '<table class="spots"><tr><th>Viewpoint</th><th>Where</th><th style="text-align:center">Sunrise</th><th style="text-align:center">Sunset</th></tr>'
 + "".join(f'<tr><td><b>{a}</b></td><td class="small">{b}</td><td class="b"></td><td class="b"></td></tr>' for a, b in spots) + '</table>'
 + '<div class="lab" style="margin-top:10pt">Walks and hikes we did</div>' + lines(4)
 + '<div class="lab">Best moment</div>' + lines(3)
 + '<div class="lab">Next time we want to</div>' + lines(3))

# 27 official sources
page("""<div class="kicker">Check before you go</div><h2>Official sources</h2>
<p class="lead">This guide gives you the plan. These pages give you today's rules, closures and conditions.</p>
<div class="src">
<div><h3>Grand Canyon National Park</h3><div class="url">nps.gov/grca</div><p>Alerts, fees, maps, shuttle schedules, trail pages and the free park newspaper.</p></div>
<div><h3>Key Hiking Messages</h3><div class="url">nps.gov/grca/planyourvisit/key-messages.htm</div><p>Trail closures, where the water is on or off, and the heat risk for the inner canyon.</p></div>
<div><h3>North Rim status</h3><div class="url">nps.gov/grca/northrimstatus.htm</div><p>What is open on the North Rim after the 2025 fire.</p></div>
<div><h3>Arizona roads</h3><div class="url">az511.gov · call 511</div><p>Highways to the park, winter road conditions and closures.</p></div>
<div><h3>In-park lodging</h3><div class="url">grandcanyonlodges.com · visitgrandcanyon.com</div><p>South Rim lodges, Phantom Ranch lottery and current alerts.</p></div>
<div><h3>Campgrounds and permits</h3><div class="url">recreation.gov</div><p>Mather and Desert View campgrounds, and backcountry permits to sleep below the rim.</p></div>
<div><h3>NPS App</h3><div class="url">App Store and Google Play</div><p>Free. Save Grand Canyon for offline use. Maps, shuttle info and park news.</p></div>
<div><h3>Weather and air</h3><div class="url">weather.gov · airnow.gov</div><p>Forecasts, heat and storm warnings, and wildfire smoke.</p></div></div>
<p class="small" style="margin-top:10pt">Facts in this guide were checked against these sources in October 2026. Rules and conditions change; the official sources always win.</p>""")

# 28 ranger questions
qs = ["Is water on at the trailheads and resthouses today?", "Which trails or viewpoints are closed this week, and why?", "What is the heat risk in the canyon today, and when should we be back up?", "Is there ice on the upper switchbacks? Do we need traction devices?", "Which trail suits our group for a first hike below the rim?", "What time do afternoon storms usually start right now?", "When does the last shuttle leave from the sunset viewpoints?", "Which ranger programs are on while we are here?"]
page('<div class="kicker">At the visitor center</div><h2>Questions to ask a ranger</h2><p class="lead">Rangers know what changed this morning. Take this page to the desk at the Grand Canyon Visitor Center or the Backcountry Information Center and write the answers down.</p><div class="qq">'
 + "".join(f'<div><b>{q}</b><div class="wl"></div></div>' for q in qs) + '</div>')

# 29 kids
page("""<div class="kicker">With children</div><h2>Kids at the canyon</h2>
<p class="lead">Kids love the Grand Canyon: rocks to touch, ravens and condors to spot, and a badge to earn. The one rule that matters most is the edge.</p>
<div class="box forest"><h3>Rim rules for families</h3><p style="margin:0">Hold hands at every viewpoint. Stay on paved paths and behind railings, at least 6 ft (2 m) from the edge everywhere else. Agree on a meeting spot in case you get separated, and put your phone number in each child's pocket.</p></div>
<div class="cols">
<div><h3>Junior Ranger program</h3><p>Free, for ages 4 and up (adults can join too). Pick up a booklet at any visitor center, finish the activities for your age, and bring it back for a certificate and badge. Available all year on the South Rim.</p>
<h3>Best walks with kids</h3>""" + chk(["Trail of Time: paved, flat, real rocks to touch (walk 2)", "Yavapai Geology Museum and its giant windows", "The Greenway to Hermits Rest: wide and paved (walk 4)", "The Watchtower at Desert View (walk 6)"]) + """</div>
<div><h3>Below the rim with kids</h3><p>Keep it short. Ooh Aah Point (hike A) is the best first taste for older kids who are steady on their feet. Remember that every step down is one they must climb back up, and children overheat faster than adults.</p>
<h3>Pack for kids</h3>""" + chk(["Their own water bottle and salty snacks", "Hats and sunscreen", "A warm layer for cold mornings", "Binoculars and a notebook for the Junior Ranger booklet", "A small treat for the climb back up"]) + """</div></div>
<div class="warn">Never let children run ahead on the Rim Trail, and never lift them onto walls or railings for a photo.</div>""")

# 30 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 30 L50 30 L50 45 L65 45 L65 62 L82 62 L82 90 L118 90 L118 62 L135 62 L135 45 L150 45 L150 30 L200 30" stroke="#F5F1EA" stroke-width="4"/><path d="M90 100 Q100 95 110 100" stroke="#F5F1EA" stroke-width="3"/></svg>
<h2 style="margin-top:22pt">Enjoy the canyon</h2>
<p>Thank you for choosing a HikeSupply guide. Start early, carry more water than you think, stay back from the edge, and remember: down is optional, up is mandatory.</p>
<p style="margin-top:10pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">More in our national park series</p>
<div class="bkcards" style="grid-template-columns:1fr 1fr 1fr;width:6.4in"><div><b>Great Smoky Mountains</b><span>Trip Planning Guide</span></div><div><b>Utah's Mighty 5</b><span>Trip Planning Guide</span></div><div><b>Yellowstone &amp; Grand Teton</b><span>Trip Planning Guide</span></div></div>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">General trip planning information only. Trail conditions, closures, fees and rules change: always check nps.gov/grca and ask a ranger before you hike. Hike within your ability and turn back when in doubt. Not affiliated with the National Park Service. For personal use only. COVERCREDIT</p>""", "back")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip() if os.path.exists(os.path.join(HERE, "cover-credit.txt")) else ""
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
