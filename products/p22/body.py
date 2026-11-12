MY_CSS = """<style>
.row{display:grid;gap:0 9pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:28pt;padding-bottom:4pt;font-size:9pt}
.row.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7pt/1.25 var(--sans);letter-spacing:.09em;text-transform:uppercase;color:var(--forest);align-items:end}
.row .n{font:600 12pt/1 var(--serif);color:var(--clay)}
.r-route{grid-template-columns:18pt 1.5fr 1fr 1fr 1.5fr}
.r-over{grid-template-columns:18pt 1.6fr 0.9fr 0.9fr 0.6fr 1.3fr}
.r-res{grid-template-columns:1.15fr 1.2fr 0.95fr 0.95fr 1.1fr 0.35in}
.r-lodge{grid-template-columns:0.7in 1.5fr 1fr 0.75in 0.8in 0.35in}
.r-bud{grid-template-columns:1.6fr 1fr 1fr}
.r-fuel{grid-template-columns:1.5fr 0.9fr 0.9fr 1fr}
.r-log{grid-template-columns:1.25fr 0.8fr 1.5fr 1.5fr}
.r-meal{grid-template-columns:0.65in 1fr 1fr 1fr}
.r-dream{grid-template-columns:18pt 1.6fr 1fr 1.5fr}
.r-pass{grid-template-columns:1.6fr 0.8fr 0.8fr 0.9fr}
.ok{width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;justify-self:center;margin-bottom:2pt}
.grid-sk{height:7.7in;border:1pt solid #CFC7B6;border-radius:10pt;background-color:#fff;background-image:radial-gradient(circle,#CFC7B6 0.9pt,transparent 1.1pt);background-size:0.25in 0.25in;background-position:center;position:relative}
.grid-sk span{position:absolute;font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#A39C8D;background:#fff;padding:2pt 4pt}
.cardg{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt}
.cardg>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:10pt 12pt}
.cardg h3{margin:0 0 3pt;font-size:12.5pt}
.cardg .who{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:5pt}
.cardg p{margin:0;font-size:9.3pt;line-height:1.42}
.cardg ul{margin:0;padding-left:13pt;font-size:9.3pt;line-height:1.42}
.day{display:grid;grid-template-columns:repeat(4,1fr);gap:10pt;margin:8pt 0}
.day>div{background:var(--soft);border-radius:8pt;padding:10pt 11pt}
.day .stat{font-size:20pt}
.day .u{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);margin-top:4pt}
.pocket{height:8.3in;border:1.2pt dashed #9E9686;border-radius:6pt;display:grid;grid-template-rows:1fr 1fr;position:relative;background:#fff}
.pocket>div{position:relative;padding:12pt 14pt}
.pocket .fold{border-bottom:1.2pt dashed #9E9686}
.pocket .tag{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);position:absolute;right:12pt;top:10pt}
.pocket h3{margin:0 0 4pt;font-size:14pt}
.pocket p{margin:0;font-size:9.4pt;color:#5F5F5A;max-width:5.6in}
.pocket .flap{background:var(--soft);border-top:1.2pt dashed #9E9686;display:flex;align-items:center;justify-content:center;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest)}
.notes-half{border:1pt solid #CFC7B6;border-radius:9pt;background:#fff;padding:8pt 12pt 4pt;margin-top:8pt}
.notes-half .lab{margin-top:2pt}
.stops{display:grid;grid-template-columns:1fr 1fr;gap:0 22pt}
.stp{display:grid;grid-template-columns:repeat(3,1fr);gap:12pt}
.stp>div{height:2.15in;border:1.1pt dashed #B9B1A0;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:16pt;font:700 6.6pt/1.5 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#B0A898;width:2.15in;justify-self:center}
.stp>div span{display:block;width:1.3in;border-bottom:0.8pt solid #CFC7B6;height:12pt;margin-bottom:3pt}
.tb2{font-size:9.2pt}
.tb2 td,.tb2 th{padding:4.5pt 6pt}
html.bw .cardg>div,html.bw .notes-half,html.bw .pocket,html.bw .grid-sk{background:#fff}
html.bw .day>div,html.bw .pocket .flap{background:#fff;border:0.8pt solid #999}
</style>"""

T = "National Parks Road Trip Planner"
CREDIT = "Sam McCool / Pexels"


def build(page, lines, opts):
    def rows(cls, k, first=None, h=28, cells=5, nums=False):
        out = []
        for i in range(k):
            c = [f'<div class="n">{i+1}</div>'] if nums else []
            c += ['<div></div>'] * (cells - (1 if nums else 0))
            if first: c[-1] = first
            out.append(f'<div class="row {cls}" style="height:{h}pt">' + "".join(c) + '</div>')
        return "".join(out)

    def head(kicker, title, right):
        return f'<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">{kicker}</div><h2>{title}</h2></div><div class="r">{right}</div></div>'

    # ---------- 1 cover
    page('''<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="500" height="340" viewBox="0 0 500 340" fill="none" stroke="#2C3B2E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 230 L110 110 L170 170 L250 70 L350 190 L410 150 L500 220"/>
<path d="M210 340 C230 290 280 280 300 240 C320 205 290 200 310 175"/><path d="M262 340 C275 300 315 290 330 250 C342 220 320 210 333 180" stroke-dasharray="2 10"/>
<circle cx="420" cy="60" r="22"/></svg></div>
<div style="position:relative"><h1>National Parks Road Trip Planner</h1><p class="sub" style="max-width:6.2in">Plan a trip through several parks in one workbook: the route, honest drive days, every timed entry, permit and campsite, passes and fees, the budget, and the one hike that matters at each stop.</p>
<div class="meta" style="margin-top:22pt"><span>32 printable pages</span><span>Miles + km, mpg + L/100 km</span><span>USA and Canada</span></div></div>''', 0, "cover photo")

    # ---------- 2 how to use
    page('''<div class="kicker">Start here</div><h2>How to use this workbook</h2>
<p class="lead">A park road trip has many moving parts: long drives, booking windows that open months ahead, and short daylight for the hikes you came for. This workbook keeps them all in one place.</p>
<div class="steps2">
<div><div class="n">1</div><div><h3>Dream and choose</h3><p>List the parks you want (page 3), compare them (page 4), and check your drive days against daylight (page 5).</p></div></div>
<div><div class="n">2</div><div><h3>Book early</h3><p>Write every timed entry, permit, campsite and room in the tracker (pages 8 and 9). Some windows open many months ahead.</p></div></div>
<div><div class="n">3</div><div><h3>Plan each stop</h3><p>One page per park (pages 13 to 18): arrival, the one hike that matters, a backup hike, food and fuel nearby.</p></div></div>
<div><div class="n">4</div><div><h3>Take it in the car</h3><p>Keep the workbook in a folder with the pocket page (page 10) for tickets and passes. Log each day and stamp each park.</p></div></div></div>
<div class="warn" style="margin-top:12pt"><b>Rules change every year.</b> Entrance fees, timed entry, permits, road openings and pet rules are set by each park and change often. Check the official park website (nps.gov in the USA, parks.canada.ca in Canada) and recreation.gov before you book and again the week before you leave.</div>
<div class="cols" style="margin-top:4pt"><div><h3 style="margin-top:6pt">Printing</h3><p>Print at Actual size on US Letter. An A4 file and a low-ink printer-friendly file are included. Print the stop page and the daily page as many times as you need. For personal use.</p></div>
<div><h3 style="margin-top:6pt">Units</h3><table class="tb2" style="margin-top:2pt"><tr><th>Imperial</th><th>Metric</th></tr><tr><td>1 mile</td><td>1.61 km</td></tr><tr><td>1 US gallon</td><td>3.79 liters</td></tr><tr><td>1,000 ft</td><td>305 m</td></tr><tr><td>mpg to L/100 km</td><td>235.2 &divide; mpg</td></tr></table></div></div>
<h3 style="margin-top:8pt">What is inside</h3>
<table class="tb2" style="font-size:8.8pt"><tr><th>Pages</th><th>What</th><th>Pages</th><th>What</th></tr>
<tr><td>3&ndash;7</td><td>Dream list, route, drive days, overview, sketch</td><td>20&ndash;21</td><td>Budget, fuel and empty roads</td></tr>
<tr><td>8&ndash;10</td><td>Booking guide, tracker, ticket pocket</td><td>22&ndash;26</td><td>Car kit, day pack, plan B, border, before you go</td></tr>
<tr><td>11&ndash;12</td><td>Passes and fees, lodging plan</td><td>27&ndash;28</td><td>Meals, kids and pets</td></tr>
<tr><td>13&ndash;19</td><td>Six park stop pages, daily plan</td><td>29&ndash;31</td><td>Trip log, park stamps, notes</td></tr></table>''', 2)

    # ---------- 3 dream list
    page(head("Fill in", "Dream list", "Every park<br>you want to see") + '''
<p style="margin-top:0">Write down every park that pulls at you, even the far ones. You will narrow it down on the next page.</p>
<div class="row r-dream h"><div></div><div>Park</div><div>Best season for me</div><div>Why I want to go</div></div>''' + rows("r-dream", 10, nums=True, cells=4, h=32) + '''
<div class="f2" style="margin-top:10pt"><div class="fl">Trip length <span class="u"><b></b>days</span></div><div class="fl">Earliest start date</div><div class="fl">Starting from (home)</div><div class="fl">Ending at</div></div>
<div class="lab" style="margin-top:12pt">Who is coming (names, ages, any needs)</div>''' + lines(2, 22) + '''
<div class="lab">What matters most on this trip</div>''' + opts("Big views", "Long hikes", "Easy walks", "Wildlife", "Dark skies", "Photography", "Camping", "Comfort and real beds", "Low budget", "Slow pace") + '''
<div class="lab" style="margin-top:12pt">Must not miss</div>''' + lines(2, 22), 3)

    # ---------- 4 choose the route
    page(head("Fill in", "Choose the route", "One row<br>per park") + '''
<p style="margin-top:0">Put the parks in the order you will drive them. Drive time is from the previous stop; look it up in a map app and add a buffer for stops and slow park roads.</p>
<div class="row r-route h"><div></div><div>Park</div><div>Best months</div><div>Drive time from last stop (h) / mi or km</div><div>Must-do hike or view</div></div>''' + rows("r-route", 9, nums=True, cells=5, h=41) + '''
<div class="cardg" style="margin-top:12pt">
<div><div class="who">Good routes</div><h3>Loops beat out-and-backs</h3><p>A loop or a one-way trip with a return flight sees more country for the same driving. Check one-way rental fees before you choose.</p></div>
<div><div class="who">Fewer, longer stops</div><h3>Two nights is the sweet spot</h3><p>With one night per park you mostly see the car. Two or more nights give you one full day to hike without checking out.</p></div></div>''', 4)

    # ---------- 5 honest drive days
    page('''<div class="kicker">The short guide</div><h2>Honest drive days</h2>
<p class="lead">Map apps show driving time with no stops for fuel, food, photos, road work or slow park roads. On a park trip the real day is longer.</p>
<div class="day">
<div><div class="stat">+25%</div><div class="u">Our rule of thumb: add to map time</div></div>
<div><div class="stat">2 h</div><div class="u">Take a real break at least this often</div></div>
<div><div class="stat">4&#8211;5 h</div><div class="u">Most driving that still leaves a hike</div></div>
<div><div class="stat">0</div><div class="u">Long drives after dark on wildlife roads</div></div></div>
<div class="cols" style="margin-top:6pt">
<div><h3>Why park roads are slow</h3><ul class="check"><li>Speed limits inside parks are often 25 to 45 mph (40 to 70 km/h)</li><li>Winding mountain roads and steep grades</li><li>Wildlife on the road, and traffic stopped to watch it</li><li>Lines at the entrance station on busy days</li><li>Road work in the short summer season</li></ul></div>
<div><h3>Daylight check</h3><p style="font-size:9.4pt">Day length changes a lot with the season. Near the middle of the USA (about 40&deg; N) it is roughly:</p>
<table class="tb2"><tr><th>Month</th><th>Daylight</th></tr><tr><td>December</td><td>about 9 hours</td></tr><tr><td>March and September</td><td>about 12 hours</td></tr><tr><td>June</td><td>about 15 hours</td></tr></table>
<p class="small">Farther north (Montana, Alberta, BC) winter days are shorter and summer days longer. Look up sunrise and sunset for each park and date.</p></div></div>
<div class="lab" style="margin-top:8pt">My check for the longest drive day</div>
<div class="f2"><div class="fl">Map time <span class="u"><b></b>h</span></div><div class="fl">+ 25% buffer <span class="u"><b></b>h</span></div><div class="fl">Sunrise</div><div class="fl">Sunset</div><div class="fl">Hike time <span class="u"><b></b>h</span></div><div class="fl">Still fits in daylight? <span class="u">yes / no</span></div></div>''', 5)

    # ---------- 6 trip overview
    page(head("Fill in", "Trip overview", "The whole trip<br>at a glance") + '''
<div class="f2"><div class="fl">Trip name</div><div class="fl">Dates</div><div class="fl">Total distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Vehicle</div></div>
<div class="lab" style="margin-top:12pt">Night by night</div>
<div class="row r-over h"><div></div><div>Where we sleep</div><div>Date in</div><div>Date out</div><div>Nights</div><div>Booked? confirmation</div></div>''' + rows("r-over", 12, nums=True, cells=6, h=27) + '''
<div class="f2" style="margin-top:8pt"><div><div class="lab">Rest days or free days</div>''' + lines(2, 22) + '''</div><div><div class="lab">Left a copy of this plan with</div>''' + lines(2, 22) + '''</div></div>''', 6)

    # ---------- 7 route sketch
    page(head("Draw", "Route sketch", "Big and clean,<br>to read in the car") + '''
<div class="grid-sk"><span style="left:12pt;top:10pt">Draw your route: start, each park, fuel stops, where you sleep</span><span style="right:12pt;bottom:10pt">N &uarr;</span></div>
<p class="small" style="margin-top:6pt">Tip: also download offline maps for the whole route in your map app, and carry a paper road map. Phones often have no signal in and around parks.</p>''', 7)

    # ---------- 8 reservations guide
    page('''<div class="kicker">The short guide</div><h2>What needs booking, and when</h2>
<p class="lead">Popular parks now fill months ahead. The single most useful thing you can do is find every booking window early and put it in your calendar.</p>
<div class="cardg">
<div><div class="who">Timed entry and vehicle reservations</div><h3>A ticket just to drive in</h3><p>In recent seasons parks such as Arches, Rocky Mountain, Glacier and Haleakal&#257; (sunrise) used timed entry or vehicle reservations at busy times. Which parks use them, the dates and the release times change every year.</p></div>
<div><div class="who">Hiking permits and lotteries</div><h3>Famous hikes</h3><p>Some hikes need a permit, often by lottery, for example Angels Landing in Zion and the Half Dome cables in Yosemite. Overnight backcountry trips almost always need a permit.</p></div>
<div><div class="who">Campgrounds</div><h3>Often months ahead</h3><p>Many park campgrounds are booked on recreation.gov (USA) or reservation.pc.gc.ca (Canada). Many open sites on a rolling window several months ahead and popular dates go in minutes.</p></div>
<div><div class="who">Lodges and hotels</div><h3>Inside and near the park</h3><p>Lodges inside parks are run by companies with their own booking sites. Some open about a year ahead or more. Towns at park gates fill on summer weekends.</p></div></div>
<h3 style="margin-top:14pt">How to win the booking day</h3>
<ol class="steps"><li>Find the exact release date and time on the official page, and note the time zone.</li><li>Create your recreation.gov or Parks Canada account days before, and log in early.</li><li>Have two or three choices of date and site ready.</li><li>Missed out? Check for cancellations, next-day releases, or a quieter park nearby.</li></ol>
<div class="warn"><b>Check nps.gov, parks.canada.ca and recreation.gov every year.</b> Never rely on last year's rules, a blog post or this page for dates.</div>''', 8)

    # ---------- 9 reservations tracker
    page(head("Fill in", "Reservations tracker", "Timed entry, permits,<br>campsites, rooms") + '''
<div class="row r-res h"><div>Park</div><div>What to book</div><div>Window opens (date, time, zone)</div><div>Booked for (date, time)</div><div>Confirmation no.</div><div>Done</div></div>''' + "".join('<div class="row r-res" style="height:38pt"><div></div><div></div><div></div><div></div><div></div><i class="ok"></i></div>' for _ in range(15)) + '''
<p class="small" style="margin-top:8pt">Rules change every year: check nps.gov, parks.canada.ca and recreation.gov for each park. Screenshot or print every confirmation, because there may be no signal at the gate.</p>''', 9)

    # ---------- 10 pocket page
    page('''<div class="kicker">Print, fold, tape</div><h2 style="margin-bottom:8pt">Pocket for tickets and passes</h2>
<div class="pocket">
<div class="fold"><span class="tag">Front of the pocket</span><h3>Trip tickets and passes</h3><p>Keep in here: park pass, printed timed-entry tickets, permits, campground and lodge confirmations, a paper map.</p>
<div class="fl" style="max-width:5.6in;margin-top:8pt">Trip</div><div class="fl" style="max-width:5.6in">Dates</div><div class="fl" style="max-width:5.6in">If found, please call</div>
<div style="margin-top:12pt">''' + opts("Park pass", "Timed entry tickets", "Permits", "Campsite bookings", "Lodge bookings", "Paper map") + '''</div></div>
<div style="transform:rotate(180deg)"><span class="tag">Back of the pocket (folds behind)</span><h3>Emergency contacts</h3><p>Who to call, and where your trip plan is.</p>
<div class="fl" style="max-width:5.6in;margin-top:8pt">Name</div><div class="fl" style="max-width:5.6in">Phone</div><div class="fl" style="max-width:5.6in">Name</div><div class="fl" style="max-width:5.6in">Phone</div><div class="fl" style="max-width:5.6in">Trip plan left with</div></div></div>
<p class="small" style="margin-top:6pt">How to make it: print on thick paper if you can and cut along the outer dashed line. Fold backward along the middle dashed line, so both printed sides face out and the opening is at the top. Tape the two sides closed, then tape or clip the pocket inside your folder.</p>''', 10)

    # ---------- 11 passes and fees
    page('''<div class="kicker">The short guide</div><h2>Passes and fees</h2>
<p class="lead">On a multi-park trip, an annual pass often costs less than paying at every gate. Do the sum below before you buy.</p>
<div class="cardg">
<div><div class="who">USA</div><h3>America the Beautiful pass</h3><p>An annual pass for national parks and other federal recreation lands. For 2026 the National Park Service set it at $80 for US residents and $250 for nonresidents. It covers the pass holder and passengers in one private vehicle where the fee is per vehicle.</p></div>
<div><div class="who">USA, nonresidents</div><h3>Extra fee at busy parks</h3><p>From 2026, nonresidents (including Canadians) without the annual pass pay an extra fee per person at some of the most visited US national parks. Check nps.gov for the current list and prices.</p></div>
<div><div class="who">USA, other passes</div><h3>Seniors, military and more</h3><p>There are also passes for US seniors, current military and veterans, people with a permanent disability and others. Check who qualifies on nps.gov.</p></div>
<div><div class="who">Canada</div><h3>Parks Canada Discovery Pass</h3><p>An annual pass for national parks and historic sites run by Parks Canada, sold for adults, seniors and families or groups. Check the current price on parks.canada.ca.</p></div></div>
<div class="lab" style="margin-top:14pt">My sum: pay at each gate or buy a pass?</div>
<div class="row r-pass h"><div>Park</div><div>Entry fee</div><div>Extra fees</div><div>Total</div></div>''' + rows("r-pass", 7, cells=4, h=30) + '''
<div class="f2" style="margin-top:6pt"><div class="fl">Total at the gates</div><div class="fl">Annual pass price</div></div>
<p class="small" style="margin-top:8pt">Prices above are as published for 2026 and can change. Some parks and state parks have separate fees for camping, tours or parking that no pass covers.</p>''', 11)

    # ---------- 12 lodging plan
    page(head("Fill in", "Lodging plan", "Campground, motel,<br>lodge, per night") + '''
<div class="row r-lodge h"><div>Date</div><div>Name and town</div><div>Type</div><div>Check-in</div><div>Cost</div><div>Paid</div></div>''' + "".join('<div class="row r-lodge" style="height:35pt"><div></div><div></div><div></div><div></div><div></div><i class="ok"></i></div>' for _ in range(14)) + '''
<div class="lab" style="margin-top:10pt">Late arrival notes (gate codes, after-hours check-in)</div>''' + lines(3, 22), 12)

    # ---------- 13-18 stop pages
    for k in range(6):
        page(head(f"Stop {k+1} of 6", "Park stop", "One page<br>for each park") + '''
<div class="f2"><div class="fl">Park</div><div class="fl">Dates <span class="u">nights: <b></b></span></div><div class="fl">Arrive at</div><div class="fl">Entrance / timed entry</div><div class="fl">Sleeping at</div><div class="fl">Visitor center hours</div></div>
<div class="f2" style="margin-top:10pt"><div><div class="lab">The one hike that matters</div><div class="fl">Trail</div><div class="fl">Distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Climb <span class="u"><b></b>ft / <b></b>m</span></div><div class="fl">Start by <span class="u">turn back by <b></b></span></div></div>
<div><div class="lab">Backup hike (weather, crowds, closures)</div><div class="fl">Trail</div><div class="fl">Distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Climb <span class="u"><b></b>ft / <b></b>m</span></div><div class="fl">Why it is my backup</div></div></div>
<div class="f2" style="margin-top:6pt"><div><div class="lab">Sunrise or sunset spot</div>''' + lines(2, 22) + '''</div><div><div class="lab">Food and fuel nearby</div>''' + lines(2, 22) + '''</div></div>
<div class="lab">Check before I go</div>''' + opts("Park alerts and closures", "Weather forecast", "Trail status", "Fire and smoke", "Water at the trailhead", "Wildlife notices") + '''
<div class="notes-half"><div class="lab">Notes</div>''' + lines(12, 22) + '''</div>''', 13 + k)

    # ---------- 19 daily plan
    page(head("Fill in", "Daily plan", "Copy as many<br>as you need") + '''
<div class="f2"><div class="fl">Day <span class="u">date: <b></b></span></div><div class="fl">From / to</div><div class="fl">Sunrise</div><div class="fl">Sunset</div></div>
<div class="row r-log h" style="margin-top:12pt"><div>Time</div><div>Drive / hike</div><div>What</div><div>Notes</div></div>''' + rows("r-log", 10, cells=4, h=28) + '''
<div class="f2" style="margin-top:6pt"><div class="fl">Fuel up at</div><div class="fl">Food and water at</div></div>
<div class="notes-half" style="margin-top:12pt"><div class="lab">Notes for the day</div>''' + lines(8, 22) + '''</div>''', 19)

    # ---------- 20 budget
    page(head("Fill in", "Budget planner", "Plan it, then<br>write what you spent") + '''
<div class="row r-bud h"><div>Item</div><div>Planned</div><div>Spent</div></div>''' + "".join(f'<div class="row r-bud" style="height:31pt"><div>{x}</div><div></div><div></div></div>' for x in ["Fuel (see helper below)", "Park passes and entry fees", "Timed entry and permit fees", "Campsites", "Motels and lodges", "Groceries", "Restaurants and coffee", "Rental car or one-way fee", "Flights or train", "Tours, showers, laundry", "Souvenirs and gifts", "Emergency fund", "", ""]) + '''
<div class="row r-bud" style="height:27pt;border-bottom:1.5pt solid var(--forest)"><div style="font:700 8pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)">Total</div><div></div><div></div></div>
<div class="lab" style="margin-top:14pt">Fuel cost helper</div>
<div class="f2"><div class="fl">Total distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Car uses <span class="u"><b></b>mpg / <b></b>L/100 km</span></div><div class="fl">Fuel needed <span class="u"><b></b>gal / <b></b>L</span></div><div class="fl">Price <span class="u"><b></b>per gal / L</span></div></div>
<p class="small" style="margin-top:6pt">Miles &divide; mpg = gallons. Or km &divide; 100 &times; L/100 km = liters. Then multiply by the price. Add 10 to 15% for park detours and mountain climbs.</p>''', 20)

    # ---------- 21 fuel and long empty roads
    page('''<div class="kicker">The short guide</div><h2>Fuel and long empty roads</h2>
<p class="lead">In the desert Southwest, the northern Rockies and much of Canada there can be long stretches with no fuel, no shop and no phone signal.</p>
<div class="cols">
<div><h3>Habits that keep you safe</h3><ul class="check"><li>Fill up whenever the tank is about half empty in remote country</li><li>Fill up before you enter a park: there may be no fuel inside</li><li>Check opening hours: small stations close early and some take only certain cards</li><li>Carry plenty of water in the car, more in hot places</li><li>Download offline maps and keep a paper map</li><li>Tell someone your route and when you expect to arrive</li><li>Do not follow a map app onto dirt roads you do not know</li></ul></div>
<div><h3>Heat and the car</h3><p>Many desert parks advise carrying at least 1 gallon (about 4 liters) of water per person per day. Never leave children or pets in a parked car, even for a few minutes.</p>
<h3>If the car breaks down</h3><p>Stay with the vehicle in remote areas: it is easier to find than a person walking, and it gives shade. Call or text for help if you have signal, and wait.</p></div></div>
<div class="lab" style="margin-top:12pt">Long stretches on my route</div>
<div class="row r-fuel h"><div>From / to</div><div>Distance mi / km</div><div>Last fuel at</div><div>Water carried</div></div>''' + rows("r-fuel", 8, cells=4, h=30), 21)

    # ---------- 22 car kit
    page('''<div class="kicker">Checklist</div><h2>Car kit checklist</h2>
<p class="lead">Pack these once and leave them in the car for the whole trip.</p>
<div class="cols" style="gap:0 22pt">
<div><h3>Car and road</h3><ul class="check"><li>Spare tire checked and inflated, jack and wrench</li><li>Tire pressure gauge</li><li>Jumper cables or a jump starter pack</li><li>Paper road map and offline maps</li><li>Phone charger and power bank</li><li>Flashlight or headlamp, spare batteries</li><li>Ice scraper and snow brush (spring, fall, winter)</li><li>Windshield washer fluid</li><li>Roadside help number and insurance card</li><li>Vehicle registration and rental papers</li></ul>
<h3>Comfort</h3><ul class="check"><li>Cooler and ice</li><li>Trash bags (pack out everything)</li><li>Wet wipes and hand sanitizer</li><li>Sun shade for the windshield</li><li>Bug spray</li><li>Camp chairs</li></ul></div>
<div><h3>Safety and supplies</h3><ul class="check"><li>Water: plenty, more for desert parks</li><li>Extra food that keeps</li><li>Warm blankets or sleeping bags</li><li>First aid kit</li><li>Rain jacket and warm layer for everyone</li><li>Small shovel (snow or sand)</li><li>Toilet paper and a trowel or waste bags</li><li>Spare glasses and any medicines you take</li></ul>
<h3>My extras</h3>''' + lines(6, 22) + '''</div></div>''', 22)

    # ---------- 23 day pack checklist
    page('''<div class="kicker">Checklist</div><h2>Day pack for each stop</h2>
<p class="lead">Check it every morning before the hike. The car is not with you on the trail.</p>
<div class="cols" style="gap:0 22pt">
<div><h3>The Ten Essentials</h3><ul class="check"><li>Navigation: map, compass or offline map app</li><li>Headlamp with spare batteries</li><li>Sun protection: hat, sunglasses, sunscreen</li><li>First aid kit</li><li>Knife or multi-tool</li><li>Fire starter</li><li>Emergency shelter or space blanket</li><li>Extra food</li><li>Extra water and a way to treat it</li><li>Extra clothes: warm and rain layers</li></ul></div>
<div><h3>Also</h3><ul class="check"><li>Park map and today's trail notes</li><li>Phone, charged, in a safe pocket</li><li>Park pass or permit if the trail needs one</li><li>Whistle</li><li>Trekking poles</li><li>Bear spray where it is recommended, and know how to use it</li><li>Trash bag</li><li>Toilet paper and waste bag</li></ul>
<h3>Before you leave the car</h3><ul class="check"><li>Turnaround time decided</li><li>Food out of sight or in a bear box if required</li><li>Someone knows where you are hiking</li></ul><div class="lab" style="margin-top:10pt">My extras</div>''' + lines(5, 22) + '''</div></div>''', 23)

    # ---------- 24 weather and closures
    page('''<div class="kicker">Plan B</div><h2>Weather, closures and plan B</h2>
<p class="lead">Roads close for snow, trails close for fire, storms roll in every summer afternoon in the mountains. A trip with a plan B still feels like a good trip.</p>
<div class="cardg">
<div><div class="who">Snow and road openings</div><h3>High roads open late</h3><p>Some mountain roads open only in early or mid summer and close again in fall. Check the park's road status page before you plan a route over a pass.</p></div>
<div><div class="who">Heat</div><h3>Hike early</h3><p>In desert parks, hike at dawn and rest in the hottest hours. Some trails are not safe in summer afternoons. Carry more water than you think.</p></div>
<div><div class="who">Storms</div><h3>Off high ground by early afternoon</h3><p>Summer thunderstorms are common in the mountains in the afternoon. Start early. In slot canyons and washes, flash floods can come from rain far away.</p></div>
<div><div class="who">Fire and smoke</div><h3>Check the air</h3><p>Wildfires can close trails and roads. Check park alerts and the air quality (airnow.gov in the USA, weather.gc.ca in Canada) before a long hike.</p></div></div>
<div class="lab" style="margin-top:14pt">My plan B for each park</div>
<div class="row r-dream h"><div></div><div>Park</div><div>If closed or stormy</div><div>Backup plan</div></div>''' + rows("r-dream", 6, nums=True, cells=4, h=27) + '''
<div class="lab" style="margin-top:10pt">Where I check conditions</div>''' + opts("Park alerts page", "Road status", "weather.gov / weather.gc.ca", "Air quality", "Visitor center", "Ranger"), 24)

    # ---------- 25 border
    page('''<div class="kicker">The short guide</div><h2>Crossing the border</h2>
<p class="lead">Many trips join US and Canadian parks: Glacier and Waterton, the North Cascades and the BC mountains, Acadia and the Maritimes. A little preparation makes the crossing easy.</p>
<div class="cardg">
<div><div class="who">Documents</div><h3>For every person in the car</h3><p>A valid passport is the safest choice. By land, citizens of the USA and Canada can also use a NEXUS card, and in some places an enhanced driver's license or a US passport card. Check the CBP and CBSA websites for what you need.</p></div>
<div><div class="who">Children</div><h3>Traveling with kids</h3><p>Bring the children's documents. If only one parent is traveling, or you travel with someone else's child, carry a signed consent letter from the other parent or guardians.</p></div>
<div><div class="who">Rental cars</div><h3>Ask before you book</h3><p>Not every rental company allows cross-border trips, and some charge a fee. Ask for written permission and the right insurance card.</p></div>
<div><div class="who">Phones</div><h3>Roaming and data</h3><p>Check your plan for roaming in the other country, or buy a travel add-on. Download offline maps before you cross.</p></div></div>
<h3 style="margin-top:14pt">Things to check before you cross</h3>
<div class="cols" style="gap:0 22pt"><ul class="check"><li>Fresh fruit, vegetables, meat and plants: rules apply</li><li>Firewood: never carry it across, buy it locally</li><li>Cannabis: illegal to take across the border either way</li></ul><ul class="check"><li>Bear spray: check the rules for the country you enter</li><li>Pets: vaccination papers for dogs and cats</li><li>Cash in the local currency for small towns</li></ul></div>
<div class="lab" style="margin-top:10pt">Documents for everyone in the car</div>
<div class="row r-pass h"><div>Name</div><div>Document</div><div>Last 4 digits</div><div>Expires</div></div>''' + rows("r-pass", 3, cells=4, h=26) + '''
<div class="warn"><b>Rules change.</b> Check cbp.gov (entering the USA) and cbsa-asfc.gc.ca (entering Canada) before you leave, and fees for nonresidents on nps.gov.</div>''', 25)

    # ---------- 26 before you go
    page('''<div class="kicker">Checklist</div><h2>Before you go: USA and Canada</h2>
<p class="lead">Go through this list about two weeks before you leave, and again the night before.</p>
<div class="cols" style="gap:0 22pt">
<div><h3>Parks in the USA</h3><ul class="check"><li>America the Beautiful pass bought, or entry fees planned</li><li>Nonresidents: extra fees at busy parks checked on nps.gov</li><li>Timed entry and vehicle reservations for each park</li><li>Hiking permits and lottery results</li><li>Campground and lodge confirmations printed</li><li>Park alerts read for every stop</li><li>NPS App: offline content downloaded</li></ul>
<h3>Parks in Canada</h3><ul class="check"><li>Parks Canada Discovery Pass or daily fees planned</li><li>Campground bookings on reservation.pc.gc.ca</li><li>Shuttles or parking reservations for busy areas</li><li>Important bulletins read on parks.canada.ca</li></ul></div>
<div><h3>The car and the road</h3><ul class="check"><li>Oil, tires, brakes and wipers checked</li><li>Fuel plan for long empty stretches</li><li>Cell coverage gaps on the route noted</li><li>Offline maps for the whole route</li><li>Roadside help number saved</li></ul>
<h3>Home and people</h3><ul class="check"><li>Trip plan and route left with someone</li><li>Check-in times agreed</li><li>Bank told you are traveling (card abroad)</li><li>Mail, pets and plants sorted</li><li>Travel and health insurance checked (abroad)</li></ul><h3>My extras</h3>''' + lines(6, 22) + '''</div></div>''', 26)

    # ---------- 27 meals
    page(head("Fill in", "Meal and grocery planner", "Eat well, spend less<br>on the road") + '''
<div class="row r-meal h"><div>Day</div><div>Breakfast</div><div>Lunch / trail food</div><div>Dinner</div></div>''' + "".join(f'<div class="row r-meal" style="height:38pt"><div class="n">{d}</div><div></div><div></div><div></div></div>' for d in range(1, 11)) + '''
<div class="lab" style="margin-top:12pt">Grocery list</div>
<div class="f3">''' + lines(24, 22) + '''</div>
<p class="small" style="margin-top:6pt">Shop in the last big town before the park: stores inside and near parks are small and cost more. Keep food in the car or a food locker as the park requires, never in the tent in bear country.</p>''', 27)

    # ---------- 28 kids and pets
    page('''<div class="kicker">The short guide</div><h2>Kids and pets on a park road trip</h2>
<div class="cols" style="gap:0 24pt">
<div><h3>Kids</h3><ul class="check"><li>Short drive days: plan stops every hour or two</li><li>One easy hike per park with a payoff: a lake, a waterfall, a view</li><li>Junior Ranger booklets at visitor centers keep them busy</li><li>Snacks, water and a layer in a pack they carry</li><li>A whistle and the rule: if lost, stay put and blow it</li><li>Car games and audiobooks for the long stretches</li><li>Rest days with a pool or a playground</li></ul>
<div class="lab" style="margin-top:12pt">Our kid-friendly hikes</div>''' + lines(13, 22) + '''</div>
<div><h3>Pets</h3><p style="font-size:9.6pt">Pet rules differ a lot. In many US national parks pets may go on roads, in campgrounds and on a few trails, on a leash no longer than 6 ft (1.8 m), but not on most trails. Many Canadian national parks allow leashed dogs on more trails. Check each park's pet page before you go.</p>
<ul class="check"><li>Leash, waste bags, water and a bowl</li><li>Vaccination papers (needed to cross the border)</li><li>Never leave a pet in a parked car</li><li>Pet-friendly lodging booked</li><li>A kennel or sitter for trail days if pets are not allowed</li></ul>
<div class="lab" style="margin-top:12pt">Pet rules for each park</div>''' + lines(13, 22) + '''</div></div>''', 28)

    # ---------- 29 trip log
    page(head("Fill in", "Trip log", "One line<br>for each day") + '''
<div class="row r-log h"><div>Date / park</div><div>Driven mi / km</div><div>Hikes done</div><div>Best moment</div></div>''' + rows("r-log", 14, cells=4, h=30) + '''
<div class="f2" style="margin-top:8pt"><div class="fl">Total driven <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Total hiked <span class="u"><b></b>mi / <b></b>km</span></div></div>''', 29)

    # ---------- 30 stamps
    page(head("Collect", "Parks visited", "Stamp, sign<br>or sketch") + '''
<p style="margin-top:0">Many visitor centers have a free passport stamp. Stamp each circle and write the park and date underneath.</p>
<div class="stp" style="margin-top:8pt">''' + "".join('<div><span></span>Park &middot; date</div>' for _ in range(9)) + '''</div>''', 30)

    # ---------- 31 notes
    page(head("Notes", "Notes", "Ideas for the<br>next trip") + lines(26, 24), 31)

    # ---------- 32 back
    page(f'''<div class="brand">HikeSupply Co.</div>
<div><h2>Make every park stop count</h2><p style="font-size:12pt;max-width:5.6in;margin-top:10pt">Pair this planner with the rest of your trip.</p>
<div class="bk" style="margin-top:22pt">
<div><h3>Parks Tracker</h3><p>A printable tracker for every US national park, with space to check off each one you visit.</p><div class="u">hikesupplyco.com</div></div>
<div><h3>Park trip guides</h3><p>Our planning guides for single parks: the best hikes, when to go, where to stay and what to pack.</p><div class="u">hikesupplyco.com</div></div></div></div>
<div><p style="font-size:9pt;max-width:6.4in">Fees, passes, timed entry, permits, road openings, pet rules and border rules change often. Check the official websites (nps.gov, recreation.gov, parks.canada.ca, cbp.gov, cbsa-asfc.gc.ca) before you book and before you leave, and hike within your experience. For personal use: print as many copies as you like for yourself and your family. Cover photo: {CREDIT}.</p>
<p style="font-size:10pt;margin-top:10pt"><b style="color:#F5F1EA">hikesupplyco.com</b></p></div>''', 0, "back")
