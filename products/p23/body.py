
# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 250 L60 215 L120 232 L200 180 L260 205 L330 170 L400 200 L470 185" stroke="#F5F1EA" stroke-width="3"/>
<path d="M120 300 L120 205 M120 240 L92 214 L84 186 M92 214 L78 222 M120 225 L148 196 L160 168 M148 196 L166 198 M120 205 L112 176 L118 150" stroke="#F5F1EA" stroke-width="4"/>
<path d="M84 186 l-6 -8 m6 8 l6 -9 m-6 9 l-9 -3 M160 168 l-5 -9 m5 9 l8 -7 m-8 7 l10 1 M118 150 l-6 -8 m6 8 l6 -8 m-6 8 l1 -10" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M300 300 C300 270 330 255 360 262 C390 255 420 272 418 300 Z M330 265 C340 245 372 244 380 262" stroke="#F5F1EA" stroke-width="3"/>
<circle cx="390" cy="70" r="22" stroke="#F5F1EA" stroke-width="3"/>
<path d="M30 60 l2 0 M70 30 l2 0 M250 50 l2 0 M300 25 l2 0 M180 40 l2 0" stroke="#F5F1EA" stroke-width="4"/>
</svg></div>
<div><h1>Joshua Tree National Park</h1><p class="sub">A trip planning guide for first-time visitors. When to go, the three entrances, where to camp, 1, 2 and 3-day plans, 12 day hikes from easy walks to a remote palm oasis, stargazing, and the plain desert safety that matters most: there is no water in the park.</p>
<div class="meta" style="margin-top:22pt"><span>30 pages</span><span>12 hikes and walks</span><span>mi + km, ft + m</span></div></div>""", "cover photo")

# 2 how to use
page(f"""<div class="kicker">Start here</div><h2>How to use this guide</h2>
<p class="lead">Joshua Tree is a big, quiet desert park with no gas, no food and no drinking water inside its borders. A little planning turns that from a worry into part of the adventure. This guide walks you through it.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>What is inside</h3>""" + chk(["The park at a glance, and when to go", "Passes, fees and campground bookings", "Getting around and where to stay", "Sample 1, 2 and 3-day plans, plus hot-day and windy-day plans", "Stargazing in a dark sky park", "12 day hikes and walks, from easy to hard", "Desert safety and a water-carry worksheet", "Packing list, planners, hike log, budget and checklists"]) + f"""</div>
<div><h3>Who it is for</h3><p>First-time visitors and beginner to intermediate hikers. Every hike here is a day hike on a marked trail, from a 15-minute walk among cactus to a half-day trek to a palm oasis.</p>
<h3>How to read the hikes</h3><p>Distances are round trip, in miles and kilometers. Climbs are total elevation gain, in feet and meters. Times are the park's own estimates. All trail figures come from the National Park Service.</p></div></div>
<div class="box forest"><h3>Checked against nps.gov in {CHECKED}</h3><p style="margin:0">Fees, campground rules, trail closures and seasonal hours change. Heat, flash floods and maintenance can close trails at short notice. Before you go, check the official pages on page 29, and ask a ranger at a visitor center.</p></div>
<h3>Print it or keep it offline</h3>
<p>Cell service in the park is very limited, and in many areas there is none. Print the pages you need, or save this PDF and the park's offline map in the NPS App before you leave town. The fill-in pages (6, 8, 21 and 25 to 28) are made for printing.</p>""")

# 3 at a glance
page("""<div class="kicker">The park</div><h2>At a glance</h2>
<p class="lead">Two deserts meet inside the park. The higher, cooler Mojave Desert in the west and north is where the Joshua trees and giant boulder piles are. The lower, hotter Colorado Desert in the south and east has cholla, ocotillo and wide open basins.</p>
<div class="glance">
<div><h3>Mojave Desert side</h3><table>
<tr><td>Where</td><td>West and north, along Park Boulevard</td></tr>
<tr><td>Height</td><td>Mostly above 3,000 ft (900 m). Keys View is 5,185 ft (1,580 m)</td></tr>
<tr><td>Highlights</td><td>Joshua tree forests, Hidden Valley, Barker Dam, Skull Rock, Keys View, Ryan Mountain</td></tr>
<tr><td>Feels like</td><td>The postcard Joshua Tree. Busier, a bit cooler</td></tr></table></div>
<div><h3>Colorado Desert side</h3><table>
<tr><td>Where</td><td>South and east, along Pinto Basin Road</td></tr>
<tr><td>Height</td><td>Lower: Cottonwood is about 3,000 ft (900 m)</td></tr>
<tr><td>Highlights</td><td>Cholla Cactus Garden, Cottonwood Spring, Mastodon Peak, Lost Palms Oasis</td></tr>
<tr><td>Feels like</td><td>Wide, empty and quiet. Warmer, fewer people</td></tr></table></div></div>
<h3>Three entrances</h3>
<table><tr><th>Entrance</th><th>Near</th><th>Good to know</th></tr>
<tr><td><b>West Entrance</b></td><td>Town of Joshua Tree</td><td>The busiest. Closest to Hidden Valley, Barker Dam and Keys View. Cards only</td></tr>
<tr><td><b>North Entrance</b></td><td>Twentynine Palms</td><td>Near the main visitor center and the Oasis of Mara. Cards only</td></tr>
<tr><td><b>Cottonwood (south)</b></td><td>Interstate 10, exit 168</td><td>About 7 mi (11 km) from I-10 to the Cottonwood Visitor Center. Quietest way in</td></tr></table>
<h3>How far is it? (check your route)</h3>
<p>Roughly 1 hour by car from Palm Springs, about 2.5 to 3 hours from Los Angeles, about 3 hours from San Diego, and about 4 hours from Phoenix to the Cottonwood entrance, without traffic. Weekend and holiday traffic can add a lot.</p>
<div class="box forest"><h3>Three things that surprise first-timers</h3><p style="margin:0">There is no water, gas or food inside the park, so you bring it all. Driving from the West Entrance to Cottonwood Spring takes about 1 hour 20 minutes without stops. And desert nights can be near freezing even when the day was warm.</p></div>""")

# 4 when to go
months = [
 ("Dec to Feb", "Cool days, highs around 60 °F (15 °C), nights near or below freezing. Snow now and then up high. Short days: plan around sunset."),
 ("March", "Comfortable and busy. Spring break crowds from March to mid-April. Wildflowers in years with good winter rain."),
 ("April", "Warm days, still busy, especially at Easter. Heat starts to build late in the month."),
 ("May", "Getting hot. Hike early. Last busy weekends before summer."),
 ("Jun to Aug", "Highs around 100 °F (38 °C), nights near 75 °F (24 °C). Hike only at dawn. Some campgrounds and 49 Palms Oasis close. Monsoon storms mid-July to early September."),
 ("September", "Still hot. Flash flood risk from late summer storms. Few visitors."),
 ("Oct to Nov", "The season starts again: highs of 70 to 85 °F (21 to 29 °C), cool nights, busy weekends. Campfire ban ends October 1."),
]
page('<div class="kicker">Timing</div><h2>When to go: season by season</h2><p class="lead">October to April is the main season, when days are mild enough for hiking. That is also when everyone else comes, so weekends and holidays are busy. Summer is for early mornings and starry nights, not long hikes.</p>'
 + '<table class="months">' + "".join(f"<tr><td>{a}</td><td>{b}</td></tr>" for a, b in months) + '</table>'
 + '<div class="box"><h3 style="margin-top:0">Why it gets so busy</h3><p style="margin:0">The park says to expect long lines, limited parking, busy trails and full campgrounds on holidays, on weekends from October to May, and during spring break. A weekday visit, or arriving at the gate before 8 am, makes a big difference.</p></div>'
 + '<table style="margin-top:4pt"><tr><th>If you want</th><th>Go in</th></tr><tr><td>Comfortable hiking weather</td><td>October to November, and February to April</td></tr><tr><td>Fewer people</td><td>Weekdays from December to February (pack warm layers)</td></tr><tr><td>Wildflowers</td><td>Spring, after a wet winter. Ask at a visitor center</td></tr><tr><td>Dark, warm nights for stars</td><td>Late spring and early fall, on a night with no moon</td></tr></table>'
 + '<p class="small">Weather can range from very hot to freezing, with gale-force winds, heavy rain and snow. Check the forecast for the part of the park you will visit, every day.</p>')

# 5 passes and fees
page("""<div class="kicker">Passes</div><h2>Passes and fees</h2>
<p class="lead">You do not need a reservation to enter Joshua Tree. You do need an entrance pass. The park is open 24 hours a day, every day of the year.</p>
<table class="fee"><tr><th>Pass</th><th>Price (2026)</th><th>Covers</th></tr>
<tr><td>Private vehicle</td><td>$30</td><td>7 days. One car and everyone in it</td></tr>
<tr><td>Motorcycle</td><td>$25</td><td>7 days. Up to 2 motorcycles, 4 people</td></tr>
<tr><td>Per person (walk-in or bike)</td><td>$15</td><td>7 days. Ages 16 and up; under 16 free</td></tr>
<tr><td>Joshua Tree annual pass</td><td>$55</td><td>12 months, this park only. US citizens and residents</td></tr>
<tr><td>America the Beautiful</td><td>$80 / $250</td><td>One year, all national parks. US residents / non-residents</td></tr>
<tr><td>Senior pass (62+)</td><td>$20 / $80</td><td>Annual / lifetime. US citizens and residents</td></tr>
<tr><td>Access, Military, 4th Grade</td><td>Free</td><td>For those who qualify. See nps.gov for the rules</td></tr></table>
<div class="cols" style="margin-top:6pt">
<div><h3>Buy it before you arrive</h3><p>Passes are sold on recreation.gov at no extra cost. Print it or save it to your phone before you drive in, because there is little or no signal at the gate. Buying ahead also gets you through the entrance line faster.</p></div>
<div><h3>Paying at the park</h3><p>The North and West entrance stations take cards only, no cash. Visitor centers take cash or card. The fee booth is sometimes closed: you may be asked to show your pass on the way out, so keep it handy.</p></div></div>
<div class="box forest"><h3>Fee-free days</h3><p style="margin:0">A few days a year, entry is free for US citizens and residents. The 2026 dates have passed. Check nps.gov/jotr for the next year's dates, and expect those days to be crowded.</p></div>
<div class="box"><h3 style="margin-top:0">Visiting from Canada or abroad?</h3><p style="margin:0">The non-resident America the Beautiful pass is $250. For a single visit to Joshua Tree, the $30 vehicle pass is enough. Prices change: check nps.gov/jotr/planyourvisit/fees.htm before you buy.</p></div>""")

# 6 reservations
camps = [("Black Rock", "99", "Reserve", "$35", "Yes", "4,000 ft / 1,220 m"),
 ("Cottonwood", "62", "Reserve", "$35", "Yes", "3,000 ft / 915 m"),
 ("Indian Cove", "101", "Reserve", "$35", "No", "3,200 ft / 975 m"),
 ("Jumbo Rocks", "124", "Reserve", "$30", "No", "4,400 ft / 1,340 m"),
 ("Ryan", "31", "Reserve (closed summer)", "$30", "No", "4,000 ft / 1,220 m"),
 ("Hidden Valley", "44", "First come", "$25", "No", "4,200 ft / 1,280 m"),
 ("Belle", "18", "First come (closed summer)", "$25", "No", "3,800 ft / 1,160 m"),
 ("White Tank", "15", "First come (closed summer)", "$25", "No", "3,800 ft / 1,160 m")]
page('<div class="kicker">Reservations</div><h2>Campground reservations</h2>'
 + '<p class="lead">Nearly 85 percent of the park\'s 500-plus campsites are reservation only. Book on recreation.gov or call 1-877-444-6777, from 6 months ahead up to the same day. Book before you drive in: there is no signal to do it later.</p>'
 + '<table class="tt"><tr><th>Campground</th><th>Sites</th><th>How</th><th>Per night</th><th>Water</th><th>Elevation</th></tr>'
 + "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td><td>{f}</td></tr>" for a, b, c, d, e, f in camps)
 + '</table><p class="small">2026 fees. Only Black Rock and Cottonwood have water and flush toilets; the others have pit toilets and no water. Sheep Pass has 6 group sites, tents only. Campfires only in campground fire rings, and never from June 15 to October 1.</p>'
 + '<div class="lab">My booking tracker</div>'
 + '<table class="spots"><tr><th>What</th><th>Booking date</th><th>Confirmation number</th><th style="text-align:center">Done</th></tr>'
 + "".join(f'<tr><td style="height:26pt"><b>{w}</b></td><td></td><td></td><td class="b"></td></tr>' for w in ["Campsite night 1", "Campsite night 2", "Campsite night 3", "Room in town", "Entrance pass", "Keys Ranch tour"])
 + '</table><div class="box"><h3 style="margin-top:0">Want a guided tour?</h3><p style="margin:0">Keys Ranch, a historic homestead, can only be visited on a ranger-led tour with an advance reservation ($10 to $20 a person in 2026).</p></div>')

# 7 getting around
page("""<div class="kicker">Getting around</div><h2>Getting around the park</h2>
<p class="lead">You need a car. There is no park shuttle, and rideshare apps will not work without a signal, so do not count on one to get you out.</p>
<div class="layers">
<div><div class="num">1</div><h3>Fill up first</h3><p>No gas stations, restaurants or stores in the park. Fill the tank and buy food and water in town.</p><div class="eg">Twentynine Palms, Joshua Tree, Yucca Valley or the I-10 towns.</div></div>
<div><div class="num">2</div><h3>Go offline</h3><p>Download the park in the NPS App and carry a paper map. The park warns that hiking apps can show routes that are not real trails.</p><div class="eg">Pick up a free map at the gate or a visitor center.</div></div>
<div><div class="num">3</div><h3>Drive slowly</h3><p>Speed limits are low to protect wildlife, including the threatened desert tortoise. Watch for people walking at pullouts.</p><div class="eg">Check under your car before driving off.</div></div></div>
<h3>Driving times inside the park (approximate)</h3>
<table><tr><th>From</th><th>To</th><th>Distance</th><th>Time</th></tr>
<tr><td>Joshua Tree Visitor Center (west)</td><td>Hidden Valley</td><td>14 mi / 23 km</td><td>26 min</td></tr>
<tr><td>Joshua Tree Visitor Center (west)</td><td>Keys View</td><td>21 mi / 34 km</td><td>37 min</td></tr>
<tr><td>Cottonwood Visitor Center (south)</td><td>Cholla Cactus Garden</td><td>20 mi / 32 km</td><td>31 min</td></tr>
<tr><td>Joshua Tree Visitor Center (west)</td><td>Cottonwood Spring</td><td>56 mi / 90 km</td><td>1 h 19 min</td></tr></table>
<div class="cols">
<div><h3>Parking fills early</h3><p>On busy days the small lots at Hidden Valley, Barker Dam, Ryan Mountain and Skull Rock fill by mid-morning. Arrive early, have a second hike in mind, and never park on plants or off the pavement.</p></div>
<div><h3>Dirt roads</h3><p>Some roads, like Geology Tour Road, are unpaved, sandy or rough. Ask a ranger before you try one.</p></div></div>
<div class="warn">Never drive into a flooded dip or wash. Water on the road can be deeper and faster than it looks. Wait, or turn around.</div>""")

# 8 where to stay
page("""<div class="kicker">Where to stay</div><h2>Where to stay</h2>
<p class="lead">There are no hotels or lodges inside the park. You either camp in one of the park campgrounds (page 6) or sleep in a town just outside.</p>
<div class="mini">
<div><h3>Joshua Tree and Yucca Valley</h3><div class="s">Near the West Entrance</div><p>Vacation rentals, motels, cafes and the Joshua Tree Visitor Center. Closest to Hidden Valley, Barker Dam and Keys View.</p></div>
<div><h3>Twentynine Palms</h3><div class="s">Near the North Entrance</div><p>Motels, restaurants and the main park visitor center. A short drive to Skull Rock, Jumbo Rocks and Arch Rock.</p></div>
<div><h3>Park campgrounds</h3><div class="s">Inside the park</div><p>The full desert experience: sunrise on the rocks, stars from your tent. Book early for October to May.</p></div>
<div><h3>I-10 and the Coachella Valley</h3><div class="s">South, via Cottonwood</div><p>More choice and often lower prices. Handy for Cottonwood Spring, but far from the Joshua tree forests in the north.</p></div></div>
<div class="lab">Compare your options</div>
<table class="spots"><tr><th style="width:1.5in">Place</th><th>Price per night</th><th>Distance to entrance</th><th>Pros</th><th>Cons</th></tr>
""" + "".join('<tr><td style="height:36pt"></td><td></td><td></td><td></td><td></td></tr>' for _ in range(4)) + """</table>
<div class="lab">My choice</div>
<div class="f2"><div class="fl">Where we sleep</div><div class="fl">Check-in time</div><div class="fl">Address</div><div class="fl">Phone</div></div>
<div class="box" style="margin-top:10pt"><h3 style="margin-top:0">One tip for campers</h3><p style="margin:0">Only Black Rock and Cottonwood have drinking water. At every other campground, bring all the water you will need for cooking, washing and drinking.</p></div>""")

# 9 1-day plan
def plan(title, note, days):
    return f'<div class="plan"><div class="ph"><b>{title}</b><span>{note}</span></div>' + "".join(f'<div class="d"><i>{d}</i><div>{t}</div></div>' for d, t in days) + "</div>"
page('<div class="kicker">Sample plans</div><h2>1 day in the park</h2>' +
 plan("1 day: Joshua trees and boulders", "West in, north out", [
  ("Before 8", "Buy your pass online, fill up with water and gas in Joshua Tree, and enter early to get a parking spot."),
  ("Morning", "Hidden Valley loop (hike 3), then the Barker Dam loop (hike 4). Watch for bighorn sheep near the water."),
  ("Midday", "Picnic lunch in the shade at a picnic area. Cap Rock for a short, easy walk among the Joshua trees."),
  ("Afternoon", "Drive to Keys View (hike 2) for the big view, then Skull Rock (hike 6) on the way east."),
  ("Sunset", "Stay for golden light on the rocks, then stars at a designated stargazing lot (page 13) before driving out.")]) +
 '''<div class="box"><h3 style="margin-top:0">Coming from Phoenix or the I-10?</h3><p style="margin:0">Enter at Cottonwood instead. Walk to Cottonwood Spring, hike Mastodon Peak (hike 8) in the cool morning, then drive north through the Cholla Cactus Garden (hike 1) and leave by the North Entrance after Skull Rock at sunset.</p></div>
<h3>Rules of thumb</h3>''' + chk(["Start early, and do your longest walk first while it is cool", "Carry at least a gallon (3.8 L) of water per person for the day", "Keep half a tank of gas, there is none in the park", "Plan your last hike to finish before dark", "Have a second hike in mind if a parking lot is full"]))

# 10 2-day plan
page('<div class="kicker">Sample plans</div><h2>2 days in the park</h2>' +
 plan("Day 1: the classic north side", "Sleep north", [
  ("Morning", "Early start on Ryan Mountain (hike 11) for the view over the whole park, if it is cool. Or Barker Dam (hike 4) for an easy start."),
  ("Midday", "Hidden Valley loop (hike 3). Lunch in the shade."),
  ("Afternoon", "Keys View (hike 2) and the walk to Lost Horse Mine (hike 9) if you have the energy."),
  ("Evening", "Sunset at Cap Rock, then stargazing at Hidden Valley or Cap Rock parking.")]) +
 plan("Day 2: rocks, cactus and a palm oasis", "North to south", [
  ("Morning", "Skull Rock (hike 6) and Split Rock (hike 7), then Arch Rock (hike 5) near White Tank."),
  ("Midday", "Drive south to the Cholla Cactus Garden (hike 1). Stay on the path."),
  ("Afternoon", "Cottonwood Spring and the Mastodon Peak loop (hike 8) if it is not too warm, then out to the I-10.")]) +
 '<div class="box forest"><h3>Book for this plan</h3><p style="margin:0">A 7-day vehicle pass ($30) covers both days. If you camp, Jumbo Rocks is central for day 1 and day 2. Leave your plan with someone at home (page 25).</p></div>')

# 11 3-day plan
page('<div class="kicker">Sample plans</div><h2>3 days in the park</h2>' +
 plan("3 days: the whole park", "Sleep north or at Jumbo Rocks", [
  ("Day 1", "Arrive and settle in. Stop at a visitor center for maps and the trail report. Barker Dam (hike 4) and Hidden Valley (hike 3) in the late afternoon. Stars after dark."),
  ("Day 2", "First light on Ryan Mountain (hike 11). Rest in the heat of the day. Keys View (hike 2) and Lost Horse Mine (hike 9) later. Skull Rock (hike 6) at dusk."),
  ("Day 3", "Drive south early. Cholla Cactus Garden (hike 1) in soft morning light, then Lost Palms Oasis (hike 12) for strong hikers in cool weather, or Mastodon Peak (hike 8) for a shorter day.")]) +
 '''<div class="box forest"><h3>Make it your own</h3><p style="margin:0">Love palms? Add 49 Palms Oasis (hike 10) on the north edge of the park, from its own trailhead off Highway 62. Short on energy? Swap Ryan Mountain for Split Rock (hike 7). Visiting with kids? See page 24.</p></div>
<h3>Booking order for this plan</h3>''' + chk(["Campsites or rooms (6 months ahead for spring weekends)", "Entrance pass on recreation.gov (a 7-day pass covers all 3 days)", "Keys Ranch tour, if you want one", "Download the NPS App offline map at home", "Write the plan on page 25 and leave a copy at home"])
 + '<div class="box"><h3 style="margin-top:0">Pace yourself</h3><p style="margin:0">Sun, dry air and wind tire you out faster than you expect. Keep the middle of each day easy, drink before you are thirsty, and swap a long hike for a short walk if anyone feels unwell.</p></div>')

# 12 hot day and windy day
page("""<div class="kicker">Plan B</div><h2>A hot-day plan and a windy-day plan</h2>
<p class="lead">Desert weather can change your plans. Keep one of these ready so a bad forecast does not waste a day.</p>
<div class="plan"><div class="ph"><b>Hot day: above about 85 °F (29 °C)</b><span>Out before the heat</span></div>
<div class="d"><i>Dawn</i><div>One short hike only, finished by 10 am: Barker Dam, Hidden Valley or the Discovery Trail at Skull Rock.</div></div>
<div class="d"><i>10 to 4</i><div>Stay out of the sun. Visitor center exhibits and films, a long lunch in town, a drive with the air conditioning on and short stops at viewpoints.</div></div>
<div class="d"><i>After 4</i><div>Keys View or Cap Rock as it cools, then stars after dark when the desert is at its best.</div></div></div>
<div class="plan"><div class="ph"><b>Windy day</b><span>Gale-force gusts happen</span></div>
<div class="d"><i>Morning</i><div>Choose sheltered walks among the boulders, like Hidden Valley, rather than open ridges such as Ryan Mountain.</div></div>
<div class="d"><i>Midday</i><div>Drive the park and stop at short walks near the car. Sunglasses help keep blowing sand out of your eyes.</div></div>
<div class="d"><i>Evening</i><div>Campers: pack away awnings and loose gear, and stake tents well. Skip the stove if gusts are strong.</div></div></div>
<div class="cols">
<div><h3>Summer rule from the park</h3><p>In hot months, start your activity before 10 am or after 4 pm, take shade breaks, and turn back early. The strenuous hikes in this guide are not for hot days at all.</p></div>
<div><h3>Rain and storms</h3><p>Summer storms (mid-July to early September) can cause flash floods, even where it is sunny. Stay out of washes and canyons when storms are around, and never drive through water.</p></div></div>""")

# 13 stargazing
page("""<div class="kicker">After dark</div><h2>Stargazing</h2>
<p class="lead">Joshua Tree is an International Dark Sky Park. On a clear, moonless night you can see the Milky Way from a parking lot. Light from nearby towns still glows on some horizons, so the darkest skies are in the south and east.</p>
<div class="mini">
<div><h3>Designated stargazing lots</h3><div class="s">Easiest</div><p>Quail Springs, Hidden Valley, Cap Rock and Ryan Mountain parking areas.</p></div>
<div><h3>Pinto Basin Road</h3><div class="s">Darkest by road</div><p>Pullouts between the Cholla Cactus Garden and Cottonwood have the least traffic and the darkest skies.</p></div>
<div><h3>Cottonwood Campground</h3><div class="s">Darkest campground</div><p>The darkest skies of any park campground. Camping fees apply.</p></div>
<div><h3>Your campsite</h3><div class="s">No driving needed</div><p>Jumbo Rocks, Ryan and Belle are all good, away from town lights.</p></div></div>
<div class="cols">
<div><h3>Make it a good night</h3>""" + chk(["Check the moon: moonless nights are best", "Use red light only. Eyes take 20 to 30 minutes to adjust", "Bring warm layers: it cools fast after sunset", "A folding chair and a blanket", "Snacks and water"]) + """</div>
<div><h3>Stay safe in the dark</h3>""" + chk(["Stay awake and within 20 ft (6 m) of your car at lots and pullouts", "Closed-toe shoes: cactus and uneven ground", "Park only in lots and pullouts", "No sleeping in cars on roadsides or lots", "Day-use areas close from dusk to dawn"]) + """</div></div>
<div class="em"><h3>Make your own red light</h3><p>Tape a piece of red cellophane or a red plastic bag over a flashlight. A white phone screen undoes your night vision in seconds, so turn the brightness right down.</p></div>""")

# hike cards
def card(no, name, where, level, stats, see, tip, note=""):
    nt = f'<div class="nt">{note}</div>' if note else ""
    st = "".join(f'<div><b>{a}</b><span>{b}</span><em>{c}</em></div>' for a, b, c in stats)
    return f'''<div class="hk"><div class="top"><div><small>Hike {no}</small><h3>{name}</h3></div><span class="lv">{level}</span></div>
<div class="st">{st}</div>
<p><span class="lb">Where</span>{where}</p><p><span class="lb">What you see</span>{see}</p><p><span class="lb">Good to know</span>{tip}</p>{nt}</div>'''
def rt(mi, kmv, lab="Round trip"): return (lab, f"{mi:g} mi", f"{kmv:g} km")
def gain(ft): return ("Climb", f"{ft:,} ft", mt(ft))

page('<div class="kicker">Hikes · Easy walks</div>' +
 card(1, "Cholla Cactus Garden", "Pinto Basin Road, 20 mi (32 km) north of the Cottonwood Visitor Center, in the middle of the park.", "Easy",
      [rt(0.25, 0.4, "Loop"), ("Climb", "10 ft", "3 m"), ("Time", "15 to 30 min", "Flat path"), ("Best", "Early or late", "Soft light")],
      "A flat loop through a dense stand of teddybear cholla that glows silver-gold when the sun is low. It sits where the Mojave and Colorado deserts meet.",
      "Stay on the path and keep children and hands close: cholla segments break off at the lightest touch and the spines hook into skin. Bees are common here in warm months.",
      "The garden closed for trail work in the past. Check current conditions on nps.gov/jotr before you plan around it.") +
 card(2, "Keys View", "End of Keys View Road, off Park Boulevard, about 37 minutes from the Joshua Tree Visitor Center.", "Easy",
      [rt(0.25, 0.4, "Loop"), ("Climb", "25 ft", "8 m"), ("Height", "5,185 ft", "1,580 m"), ("Time", "30 min", "Plus the view")],
      "A short, steep paved path to a viewpoint over the Coachella Valley, with views toward the San Andreas Fault and the Salton Sea on clear days.",
      "Haze often softens the view, so clear mornings are best. Sunset is lovely but the lot gets very busy. It is windy and cooler up here: bring a layer."))

page('<div class="kicker">Hikes · Easy walks</div>' +
 card(3, "Hidden Valley", "Hidden Valley picnic area, off Park Boulevard, about 26 minutes from the West Entrance.", "Easy",
      [rt(1, 1.6, "Loop"), gain(100), ("Time", "1 hour", "Some steps"), ("Best", "Morning", "Shade early")],
      "A loop inside a valley almost completely ringed by giant boulders, with Joshua trees, pinyon and climbers on the rock walls.",
      "A few rocky steps on the way in. One of the most popular walks in the park, so the lot fills early. Signs along the trail explain the plants and history.") +
 card(4, "Barker Dam", "Barker Dam parking lot, at the end of the side road past Hidden Valley Campground, about 1.5 mi (2.4 km) off Park Boulevard.", "Easy",
      [rt(1.1, 1.8, "Loop"), ("Climb", "50 ft", "15 m"), ("Time", "1 hour", "Sandy"), ("Best", "Morning", "Wildlife")],
      "A small water tank built by early cattle ranchers, holding water after wet winters. Birds, reptiles and sometimes desert bighorn sheep come to it. The loop also passes a rock art site, a highlight of the trail.",
      "View the rock art from the signed viewing area and never touch it. Whether there is water in the dam depends on recent rain: it is often low or dry."))

page('<div class="kicker">Hikes · Easy walks</div>' +
 card(5, "Arch Rock", "Twin Tanks parking lot (Arch Rock Trailhead), near White Tank Campground on Pinto Basin Road.", "Easy",
      [rt(1.4, 2.1, "Lollipop"), gain(100), ("Time", "1 hour", "Sandy, rocky"), ("Best", "Late day", "Warm light")],
      "A natural granite arch halfway around the loop, plus boulder piles and sandy washes. A favorite for photos.",
      "People like to climb around the arch: only go where you can easily get back down. The rock is slick where it is worn smooth, and falls are the most common injury in the park.") +
 card(6, "Skull Rock", "Skull Rock parking area, just east of Jumbo Rocks Campground. You can also start from inside the campground.", "Easy",
      [rt(1.7, 2.7, "Loop"), gain(160), ("Time", "1 to 2 hours", "Boulders"), ("Best", "Sunrise", "Quiet")],
      "The famous rock that looks like a skull sits right by the road. The full loop winds through boulder piles and washes behind Jumbo Rocks.",
      "Want just the rock? It is a few steps from the parking area. The short Discovery Trail (0.7 mi / 1.1 km loop) from the same lot links to Split Rock."))

page('<div class="kicker">Hikes · Moderate</div>' +
 card(7, "Split Rock Loop", "Split Rock picnic area, on a short side road off Park Boulevard near Live Oak.", "Moderate",
      [rt(2.5, 4, "Loop"), gain(150), ("Time", "1.5 to 2.5 h", "Washes"), ("Best", "Cool days", "Quiet")],
      "A quiet loop through rock formations, Joshua trees and washes, with a side trip to Face Rock. Fewer people than the classic stops.",
      "Junctions and washes look alike among the boulders. Follow the trail markers, check the map at each junction, and look back now and then so you know the way out.") +
 card(8, "Mastodon Peak", "Cottonwood Spring parking area, 1 mi (1.5 km) east of the Cottonwood Visitor Center.", "Moderate",
      [rt(3, 4.8, "Loop"), gain(375), ("Time", "1.5 to 2.5 h", "Optional scramble"), ("Best", "Oct to Apr", "Cool mornings")],
      "A loop in the Colorado Desert past the ruins of an old gold mine, with an optional rock scramble up a granite peak for a wide view over the desert.",
      "The scramble to the top is steep: skip it if you are not sure of your footing, the loop is great without it. Start with a look at the palms at Cottonwood Spring."))

page('<div class="kicker">Hikes · Moderate to hard</div>' +
 card(9, "Lost Horse Mine", "Lost Horse Mine trailhead, off Keys View Road.", "Moderate",
      [rt(4, 6.4, "Out and back"), gain(550), ("Time", "2 to 3 hours", "Old mine road"), ("Best", "Cool days", "Little shade")],
      "A walk up an old road to the remains of a former gold mine and its mill, with views over the mountains on the way.",
      "Stay outside the fenced area and never enter old mine openings. For a longer day, the 6.5 mi (10.5 km) Lost Horse Loop goes on from the mine, 3 to 4 hours.") +
 card(10, "49 Palms Oasis", "Fortynine Palms parking area, off Highway 62 west of Twentynine Palms. Not reached from the park roads.", "Strenuous",
      [rt(3, 4.8, "Out and back"), gain(300), ("Time", "2 to 3 hours", "Rocky"), ("Season", "Oct to May", "Closed in summer")],
      "A trail over a ridge with barrel cactus, then down to a shady grove of fan palms around a spring. A real oasis in a dry canyon.",
      "The climb back out comes at the end, often in full sun: avoid it when it is hot. The trail is closed June 1 to September 30 and has had weekday maintenance closures before, so check the status first."))

page('<div class="kicker">Hikes · Strenuous</div>' +
 card(11, "Ryan Mountain", "Parking area on Park Boulevard between Sheep Pass and Ryan Campground.", "Strenuous",
      [rt(3, 4.8, "Out and back"), gain(1050), ("Time", "1.5 to 2.5 h", "Steep, steps"), ("Top", "5,457 ft", "1,663 m")],
      "A steady climb up rock steps to a summit with a view over the whole park: Joshua tree valleys, boulder piles and distant mountains in every direction.",
      "No shade at all. One of the most popular summits in the park, so start at dawn. The steps are hard on knees on the way down: take it slow, and poles help.") +
 card(12, "Lost Palms Oasis", "Cottonwood Spring parking area, 1 mi (1.5 km) east of the Cottonwood Visitor Center.", "Strenuous",
      [rt(7.5, 12, "Out and back"), gain(500), ("Time", "5 to 6 hours", "Sandy washes"), ("Best", "Cool days", "Start early")],
      "A long walk through sandy washes and over low ridges to a remote canyon full of fan palms. The longest and most rewarding hike in this guide.",
      "The climb out of the oasis canyon is strenuous and comes at the far end of the hike. Do not try it in heat. Carry plenty of water and a turnaround time, and tell someone your plan.")
 + '<div class="box forest"><h3>Before any hike in this guide</h3><p style="margin:0">Check the trail status at a visitor center or on nps.gov/jotr. Carry more water than you think, and turn back when half is gone. Pick a turnaround time and keep to it. Leave your plan with someone at home. On hot days, choose a short walk instead: the strenuous hikes are not for heat.</p></div>')

# 20 scrambling
page("""<div class="kicker">On the rocks</div><h2>Rock scrambling and climbing</h2>
<p class="lead">Joshua Tree's boulder piles are world famous with climbers, and almost everyone wants to scramble up a few. Done with care, it is the most fun you will have in the park. Done carelessly, it is the most common way people get hurt.</p>
<div class="diff">
<div><div class="tag">Do</div><h3>Scramble smart</h3><ul class="check"><li>Only climb up what you can easily climb back down</li><li>Going down is harder than going up: test it early</li><li>Wear shoes with sticky soles, not sandals</li><li>Keep children within arm's reach on rocks</li><li>Stay off rocks when they are wet or icy</li></ul></div>
<div><div class="tag">Know your limits</div><h3>Real climbing</h3><ul class="check"><li>Roped climbing needs gear and training</li><li>Want to try? Book a guide service permitted by the park</li><li>Some areas close to climbing to protect wildlife and cultural sites</li><li>Check the park's climbing closures before you go</li><li>Never climb on rock art or historic structures</li></ul></div></div>
<h3>Look after the living soil</h3>
<p>Between the rocks you will see a dark, lumpy crust on the sand. This is living soil: tiny organisms that hold the desert together and help plants grow. One footstep can crush it, and it takes many years to recover. Stay on trails, rock or sandy washes.</p>
<div class="cols">
<div><h3>Plants are fragile too</h3><p>Do not climb on Joshua trees or break their branches. Walk around shrubs, not through them, and leave flowers and seed pods where they are.</p></div>
<div><h3>Getting lost in the boulders</h3><p>Boulder piles all look alike. Note landmarks, look back often, and stay on marked trails. The park warns that some routes on apps are not real trails.</p></div></div>
<div class="warn">Falls are serious here: the nearest hospital is a long drive away and rescues take time. If you are not sure you can get down, do not go up.</div>""")

# 21 desert safety + water worksheet
page("""<div class="kicker">Safety</div><h2>Desert safety and your water plan</h2>
<p class="lead">There is no water in the interior of the park: only a few visitor centers and campgrounds near the edges have it. The park asks you to carry at least one gallon of water per person each day.</p>
<div class="dist"><div class="a"><div class="n">1 gallon</div><div class="u">per person, per day, at least</div><p>About 3.8 liters, weighing 8.3 lb (3.8 kg).</p></div><div class="b"><div class="n">Turn back</div><div class="u">at half your water</div><p>When half is gone, head back.</p></div></div>
<div class="lab">Water-carry worksheet</div>
<table class="spots"><tr><th>Line</th><th>Your numbers</th></tr>
<tr><td>People in the group</td><td style="height:19pt"></td></tr>
<tr><td>Days in the park</td><td style="height:19pt"></td></tr>
<tr><td>People x days x 1 gallon (3.8 L) = the minimum to bring</td><td style="height:19pt"></td></tr>
<tr><td>Extra for heat, wind, longer hikes, cooking, plus a spare gallon in the car</td><td style="height:19pt"></td></tr>
<tr><td><b>Total to buy before entering the park</b></td><td style="height:19pt"></td></tr></table>
<div class="cols">
<div><h3>Heat</h3><p>Drink when thirsty and eat salty snacks. Dizzy, weak or sweating heavily? Stop, rest in shade and drink, and get medical help if it gets worse. In summer, hike only before 10 am or after 4 pm.</p>
<h3>Flash floods</h3><p>They can strike suddenly, even when it is sunny where you are. Stay out of washes when storms are around.</p></div>
<div><h3>Tell someone your plan</h3><p>Leave your route and return time with someone at home. Bring a second way to call for help, like a satellite messenger.</p>
<h3>Emergency</h3><p>Call 911, or park dispatch 909-383-5651. No signal? Move to higher ground or drive toward a town. Pick a turnaround time before you start.</p></div></div>""")

# 22 wildlife and plants
page("""<div class="kicker">Nature</div><h2>Wildlife and plants</h2>
<p class="lead">Most desert animals are shy and come out at dawn, dusk and night. A few plants and animals need respect. None of them are a reason to stay home.</p>
<div class="sig">
<div><h3>Cholla cactus</h3><div class="lbl">Watch for</div><p>Spiny segments that break off at a touch and stick to skin, shoes and dogs.</p><div class="act"><p>Do not pull with fingers. Lift it off with a comb or tweezers, then remove the spines one by one.</p></div></div>
<div><h3>Rattlesnakes</h3><div class="lbl">Watch for</div><p>Most active in warm months, often at dusk. They rest under rocks and bushes.</p><div class="act"><p>Watch where you put hands and feet. Back away slowly. If bitten, walk calmly to your car and go to the nearest hospital.</p></div></div>
<div><h3>Bees</h3><div class="lbl">Watch for</div><p>Drawn to water and food in summer, at Jumbo Rocks, Keys View and the Cholla Cactus Garden.</p><div class="act"><p>Move away calmly, do not swat. Keep drinks covered. Bring your allergy medicine if you need it.</p></div></div></div>
<div class="cols">
<div><h3>Scorpions</h3><p>They hide under rocks and come out on warm nights. Shake out shoes, clothes and sleeping bags in the morning, and use a light when walking in camp at night.</p>
<h3>Desert tortoise</h3><p>A federally threatened species. If you see one, enjoy it from a distance and never pick it up: a frightened tortoise can lose water it needs to survive. Check under your car before driving off.</p></div>
<div><h3>Bighorn sheep, coyotes, birds</h3><p>Watch from a distance and never feed any animal. Fed coyotes become bold and often have to be removed. Keep food packed away in your car or a closed container.</p>
<h3>Leave No Trace</h3><p>Pack out every scrap, including fruit peels. Take only photos: rocks, plants and old mining objects stay where they are.</p></div></div>
<div class="box"><h3 style="margin-top:0">First aid tip</h3><p style="margin:0">Pack tweezers and a fine comb with your first aid kit. They are the most useful tools in the park.</p></div>""")

# 23 packing
page("""<div class="kicker">Checklist</div><h2>Packing list for the desert</h2>
<div class="cl">
<div><h3>For every hike (the Ten Essentials)</h3>""" + chk(["Map, plus the NPS App with offline maps", "Headlamp with fresh batteries", "Sun protection: wide hat, sunglasses, sunscreen", "First aid kit, plus tweezers and a comb", "Knife or multi-tool", "Fire starter (for emergencies only)", "Emergency shelter: a space blanket", "Extra food: salty snacks", "Extra water: more than you think", "Extra layer: warm top and wind jacket"]) + """
<h3>For this park</h3>""" + chk(["Entrance pass saved offline or printed", "A card for the North and West entrances", "Electrolyte drink mix", "Whistle or signal mirror"]) + """</div>
<div><h3>Clothes for sun and cold</h3>""" + chk(["Light, long-sleeved sun shirt", "Breathable hiking pants (cactus spines)", "Fleece or light puffy for evenings", "Warm hat and gloves (October to April)", "Wind jacket", "Closed-toe shoes with sticky soles", "Hiking socks, plus a spare pair"]) + """
<h3>For the car and camp</h3>""" + chk(["Gallons of water: see the worksheet on page 21", "Cooler with food for the day", "Phone charger and power bank", "Printed maps and this guide", "Trash bag: pack out everything", "Red light and a folding chair for stars"]) + """</div></div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Dress for a 40 degree swing</h3><p style="margin:0">A desert day can start near freezing and reach the 80s °F (high 20s °C) by afternoon, then drop fast after sunset. Start in layers, take them off as you warm up, and keep a warm layer in your pack, even for short walks.</p></div>""")

# 24 kids and dogs
page("""<div class="kicker">With kids and dogs</div><h2>With kids and with dogs</h2>
<p class="lead">Boulders to scramble, a skull-shaped rock and a cactus garden make Joshua Tree a great park for kids. Dogs have a harder time here: the rules are strict, for good reasons.</p>
<div class="cols">
<div><h3>Junior Ranger program</h3><p>Free activity booklets at the visitor centers. Finish the activities, then go back to a ranger for a badge.</p>
<h3>Best walks with kids</h3>""" + chk(["Cap Rock: flat, 0.4 mi (0.6 km) loop", "Hidden Valley (hike 3)", "Barker Dam (hike 4)", "Discovery Trail and Skull Rock (hike 6)", "Arch Rock (hike 5)", "Oasis of Mara at the Twentynine Palms visitor center"]) + """
<h3>Kids in the desert</h3><p>Children heat up and dry out faster than adults and may not say so. Give them their own water bottle, plan shady breaks, and turn back at the first signs of crankiness, headache or tiredness.</p></div>
<div><h3>The rules for dogs</h3>""" + chk(["Dogs are not allowed on any trail, except the paved Oasis of Mara walk", "Always on a leash, and within 100 ft (30 m) of a road", "Allowed in campgrounds and picnic areas", "Never left alone, and never in a hot car"]) + """
<h3>Why the strict rules</h3><p>Hot sand and rock can burn paws, cholla spines stick to fur and mouths, and dogs can disturb wildlife and the fragile soil. If your plan is mostly hiking, think about boarding your dog in town for the day.</p>
<h3>Service animals</h3><p>Trained service animals are allowed. Check the current pet and service animal rules on nps.gov/jotr before you go.</p></div></div>
<div class="warn">Hold hands on high rocks. Boulder tops are often higher than they look, and coming down is the tricky part.</div>""")

# 25 day planner
def dayplan():
    return f"""<div class="log"><div class="f2"><div class="fl">Day and date</div><div class="fl">Sunrise / sunset</div><div class="fl">Forecast high / low</div><div class="fl">Water carried</div></div>
<table style="margin:6pt 0 0"><tr><th style="width:0.9in">When</th><th>Plan</th><th style="width:1.5in">Backup</th></tr>
""" + "".join(f'<tr><td style="height:36pt"><b>{w}</b></td><td></td><td></td></tr>' for w in ["Morning", "Midday", "Afternoon", "Evening"]) + """</table>
<div class="opts"><span>Gas full</span><span>Water packed</span><span>Food packed</span><span>Offline map</span><span>Plan left at home</span></div></div>"""
page('<div class="kicker">Planner</div><h2>Day planner</h2>' + dayplan() + dayplan()
 + '<div class="lab">Left with someone at home</div><div class="f2"><div class="fl">Name and phone</div><div class="fl">Call for help if no word by</div></div>')

# 26 hike log
def logbox():
    return f"""<div class="log"><div class="f2"><div class="fl">Date</div><div class="fl">Trail</div><div class="fl">Distance <span class="u"><b></b>mi / km</span></div><div class="fl">Climb <span class="u"><b></b>ft / m</span></div><div class="fl">Start and finish time</div><div class="fl">Water used</div></div>
<div class="lab">Plants, animals and rocks we saw</div>{lines(3, 24)}
<div class="lab">Best moment</div>{lines(3, 24)}
<div class="opts"><span>Easy</span><span>Just right</span><span>Hard</span><span>Too hot</span><span>Would do it again</span></div></div>"""
page('<div class="kicker">Hike log</div><h2>Our hikes</h2>' + logbox() + logbox())

# 27 budget
items = ["Entrance pass", "Campsites", "Rooms in town", "Gas", "Groceries and water", "Meals out", "Tours (Keys Ranch)", "Gear and supplies", "Souvenirs", "Other"]
page('<div class="kicker">Planner</div><h2>Budget planner</h2><p class="lead">Fill in what you expect to spend, then what you really spent. Remember: everything you eat and drink in the park comes from town.</p>'
 + '<table class="spots"><tr><th>Item</th><th>Planned</th><th>Actual</th><th>Notes</th></tr>'
 + "".join(f'<tr><td style="height:30pt"><b>{i}</b></td><td></td><td></td><td></td></tr>' for i in items)
 + '<tr><td style="height:32pt"><b>Total</b></td><td></td><td></td><td></td></tr></table>'
 + '<div class="lab">Money notes</div>' + lines(3)
 + '<div class="box" style="margin-top:8pt"><h3 style="margin-top:0">Ways to save</h3><p style="margin:0">One $30 vehicle pass covers a whole car for 7 days. First-come campgrounds cost less than reservable ones. Buying water by the gallon in town costs far less than small bottles.</p></div>')

# 28 trip checklist
page("""<div class="kicker">Checklist</div><h2>Trip checklist</h2>
<div class="cl">
<div><h3>2 months before</h3>""" + chk(["Pick your dates (avoid holidays if you can)", "Book campsites on recreation.gov (up to 6 months ahead)", "Or book a room in Joshua Tree, Twentynine Palms or Yucca Valley", "Book a Keys Ranch tour if you want one", "Choose your hikes and sample plan", "Check you have shoes broken in"]) + """
<h3>2 weeks before</h3>""" + chk(["Buy the entrance pass online", "Check nps.gov/jotr alerts and trail closures", "Download the NPS App offline map", "Plan your water: worksheet on page 21", "Check headlamp batteries and first aid kit", "Fill in the day planner (page 25)"]) + """</div>
<div><h3>The night before</h3>""" + chk(["Check the forecast for heat, wind and storms", "Check moon phase for stargazing", "Buy water by the gallon and food for the day", "Fill the gas tank", "Charge phone and power bank", "Save the pass and confirmations offline", "Leave your plan with someone at home", "Set an early alarm"]) + """
<h3>On the day</h3>""" + chk(["Visitor center first for the trail report", "Start the longest hike first", "Turn back at half your water", "Out of the sun from 10 to 4 when it is hot"]) + """</div></div>""")

# 29 links + emergency + notes
page("""<div class="kicker">Before you go</div><h2>Useful links and emergency numbers</h2>
<div class="mini">
<div><h3>Joshua Tree National Park</h3><div class="s">nps.gov/jotr</div><p>Alerts, closures, trail info, fees, maps. Information line 760-367-5500.</p></div>
<div><h3>Reservations</h3><div class="s">recreation.gov · 1-877-444-6777</div><p>Campgrounds, entrance passes and Keys Ranch tours.</p></div>
<div><h3>Weather</h3><div class="s">weather.gov</div><p>Forecasts, heat warnings, wind and flash flood watches.</p></div>
<div><h3>Roads</h3><div class="s">quickmap.dot.ca.gov</div><p>California highway conditions and closures (Caltrans).</p></div>
<div><h3>NPS App</h3><div class="s">Free · download offline</div><p>Park map, trails and alerts without a signal. Download at home.</p></div>
<div><h3>Night sky</h3><div class="s">Moon phase calendar</div><p>Any moon calendar: plan stargazing for nights with no moon.</p></div></div>
<table><tr><th>Who</th><th>Number</th></tr>
<tr><td><b>Emergency</b></td><td>911</td></tr>
<tr><td><b>Park dispatch (emergencies)</b></td><td>909-383-5651</td></tr>
<tr><td><b>Park information</b></td><td>760-367-5500</td></tr></table>
<div class="lab">Visitor centers</div>
<p class="small">Joshua Tree Visitor Center, 6554 Park Blvd, Joshua Tree. Joshua Tree National Park Visitor Center, 6533 Freedom Way, Twentynine Palms. Cottonwood Visitor Center, Pinto Basin Road, about 7 mi (11 km) north of I-10 exit 168. Black Rock Nature Center, at Black Rock Campground, Yucca Valley (shorter hours in summer).</p>
<div class="lab">Notes</div>""" + lines(5) + """
<p class="small">Facts in this guide were checked against nps.gov in November 2026. The official sources always win.</p>""")

# 30 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 100 L60 82 L110 92 L200 70" stroke="#F5F1EA" stroke-width="3"/><path d="M90 105 L90 50 M90 70 L70 52 L64 34 M90 62 L110 44 L116 26 M90 50 L86 30" stroke="#F5F1EA" stroke-width="4"/><circle cx="160" cy="28" r="12" stroke="#F5F1EA" stroke-width="3"/></svg>
<h2 style="margin-top:22pt">Enjoy the desert</h2>
<p>Thank you for choosing a HikeSupply guide. Bring more water than you think, start early, stay on the trail among the boulders, and stay up late for the stars.</p>
<p style="margin-top:10pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">Plan your next adventure</p>
<div class="bkcards" style="grid-template-columns:1fr 1fr 1fr;width:6.4in"><div><b>US National Parks Hiking Tracker</b><span>Log every park you visit, all 64 plus Canada</span></div><div><b>National Parks Road Trip Planner</b><span>Itinerary, booking and budget for many parks</span></div><div><b>Park trip guides</b><span>Utah's Mighty 5, Grand Canyon, Yosemite, Smokies</span></div></div>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">General trip planning information only. Fees, closures, trail conditions and rules change: always check nps.gov/jotr and ask a ranger before you hike. Hike within your ability and turn back when in doubt. Not affiliated with the National Park Service. For personal use only. COVERCREDIT</p>""", "back")
