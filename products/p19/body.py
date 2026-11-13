MY_CSS = """<style>
.tb{display:grid;gap:0 9pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;padding-bottom:4pt;font-size:9pt}
.tb.h{border-bottom:1.5pt solid var(--forest);height:auto !important;padding-bottom:5pt;font:700 6.9pt/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest)}
.tb .n{font:600 11pt/1 var(--serif);color:var(--clay)}
.tb i{width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;justify-self:center}
.chk{display:grid;grid-template-columns:1fr 1fr;gap:0 22pt}
.chk div{display:flex;align-items:flex-start;gap:7pt;padding:5.5pt 0;border-bottom:0.6pt solid var(--line);font-size:9.6pt;line-height:1.35}
.chk div i{flex:none;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;margin-top:1pt}
.chk div em{font-style:normal;margin-left:auto;display:flex;gap:6pt;flex:none}
.chk div em i{margin-top:0}
.scale{display:flex;gap:6pt;margin-left:auto;flex:none;font:700 6.6pt/1 var(--sans);color:var(--sage);letter-spacing:.06em}
.scale span{width:15pt;height:15pt;border:1pt solid #CFC7B6;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff}
.trl{display:grid;grid-template-columns:1.25in 1fr 1fr 1.05in;gap:0 9pt;font-size:8.8pt;line-height:1.3}
.trl>div{padding:5pt 0;border-bottom:0.6pt solid var(--line)}
.trl .h{font:700 6.9pt/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);border-bottom:1.5pt solid var(--forest)}
.trl b{font-family:var(--serif);font-weight:600;font-size:10pt;color:var(--forest)}
.cg{display:grid;grid-template-columns:1.25in repeat(4,1fr);border:1pt solid #CFC7B6;border-radius:8pt;overflow:hidden;background:#fff}
.cg>div{border-bottom:0.6pt solid #E4DED2;border-left:0.6pt solid #E4DED2;height:25pt;padding:4pt 6pt;font:700 6.9pt/1.2 var(--sans);letter-spacing:.06em;text-transform:uppercase;color:var(--forest)}
.cg>div.k{border-left:0;background:var(--soft)}
.cg>div.t{height:auto;padding:6pt;background:var(--soft)}
.cal{display:grid;grid-template-columns:0.5in repeat(7,1fr);gap:4pt}
.cal>div{background:#fff;border:1pt solid #CFC7B6;border-radius:5pt;height:1.27in;padding:4pt 5pt;font:700 6.6pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#A39C8D;position:relative}
.cal>div.d{height:auto;border:0;background:none;text-align:center;color:var(--forest);padding:2pt 0}
.cal>div.w{border:0;background:var(--soft);color:var(--forest);display:flex;align-items:center;justify-content:center;writing-mode:vertical-rl;transform:rotate(180deg)}
.cal>div s{position:absolute;left:5pt;right:5pt;bottom:5pt;text-decoration:none;font-weight:600;letter-spacing:.04em;color:#B0A898;border-top:0.6pt solid #E4DED2;padding-top:3pt}
.dlog{background:#fff;border:1pt solid #CFC7B6;border-radius:9pt;padding:10pt 13pt 6pt;margin-bottom:10pt}
.dlog .top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1.5pt solid var(--forest);padding-bottom:5pt;margin-bottom:2pt}
.dlog .top h3{margin:0;font-size:14pt}
.dlog .top span{font:700 7pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--sage)}
.dlog .fl{height:22pt}
.dlog .wl{height:20pt}
.f4{display:grid;grid-template-columns:repeat(4,1fr);gap:0 14pt}
.wk{display:grid;grid-template-columns:0.55in 2.2in 1fr 0.5in;gap:0 9pt;align-items:center;border-bottom:0.8pt solid #CFC7B6;min-height:34pt;padding:4pt 0;font-size:8.8pt;line-height:1.3}
.wk.h{border-bottom:1.5pt solid var(--forest);min-height:0;padding-bottom:5pt;font:700 6.9pt/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest)}
.wk .n{font:600 12pt/1 var(--serif);color:var(--clay)}
.wk i{width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;justify-self:center}
.mm{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:2pt solid var(--forest);margin:6pt 0 2pt}
.mm>div{padding:7pt 9pt 6pt;border-left:0.6pt solid var(--line);font-size:8.9pt;line-height:1.36}
.mm>div:first-child{border-left:0;padding-left:0}
.mm b{display:block;font:600 13pt/1.1 var(--serif);color:var(--clay);margin-bottom:4pt}
.mm ul{margin:0;padding-left:11pt}
.mm li{margin-bottom:2pt}
.addr{background:#fff;border:1.2pt dashed #B9B1A0;border-radius:8pt;padding:10pt 14pt;font:500 10pt/1.5 var(--sans)}
.sum{display:grid;grid-template-columns:repeat(4,1fr);gap:9pt;margin-top:8pt}
.sum>div{background:var(--soft);border-radius:8pt;padding:8pt 10pt;height:0.7in;font:700 6.9pt/1.25 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);display:flex;flex-direction:column;justify-content:space-between}
.sum>div span{font:500 8pt/1 var(--sans);letter-spacing:.02em;text-transform:none;color:#8B8577;text-align:right}
.rng{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt}
.rng>div{background:var(--soft);border-radius:8pt;padding:11pt 12pt}
.rng .stat{font-size:21pt}
.rng .u{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);margin:4pt 0 5pt}
.rng p{margin:0;font-size:9.1pt;line-height:1.38}
.cmp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt}
.cmp>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 12pt}
.cmp h3{margin:0 0 3pt;font-size:13pt}
.cmp .who{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:6pt}
.cmp p{font-size:9.2pt;line-height:1.4;margin:0 0 5pt}
html.bw .cmp>div{background:#fff}
html.bw .rng>div{background:#fff;border:0.8pt solid #999}
html.bw .cg>div.k,html.bw .cg>div.t,html.bw .cal>div.w,html.bw .sum>div{background:#fff}
html.bw .sum>div{border:0.8pt solid #999}
</style>"""

T = "Long Trail Planner"
CREDIT = "julia chuma / Pexels"


def build(page, lines, opts):
    def fl(label, unit=""):
        return f'<div class="fl">{label}{" <span class=u>" + unit + "</span>" if unit else ""}</div>'

    def tb(cols, heads, n, h=24, first=None):
        st = f'grid-template-columns:{cols}'
        head = f'<div class="tb h" style="{st}">' + "".join(f"<div>{x}</div>" for x in heads) + "</div>"
        rows = ""
        for k in range(n):
            cells = ["<div></div>"] * len(heads)
            if first:
                cells[0] = f'<div class="n">{first(k)}</div>'
            if heads[-1] in ("Done", "Got it"):
                cells[-1] = "<i></i>"
            rows += f'<div class="tb" style="{st};height:{h}pt">' + "".join(cells) + "</div>"
        return head + rows

    def chk(items):
        return '<div class="chk">' + "".join(f"<div><i></i><span>{x}</span></div>" for x in items) + "</div>"

    def ph(kicker, title, right):
        return f'<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">{kicker}</div><h2>{title}</h2></div><div class="r">{right}</div></div>'

    MI = "<b></b>mi / <b></b>km"

    # ---------- 1 cover
    page('''<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="500" height="340" viewBox="0 0 500 340" fill="none" stroke="#2C3B2E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 250 L70 170 L120 210 L200 90 L270 190 L330 130 L410 220 L460 170 L500 210"/>
<path d="M30 320 C120 300 140 270 210 270 S300 300 360 260 S450 240 490 250" stroke-dasharray="2 12"/>
<circle cx="30" cy="320" r="7"/><path d="M490 250 v-40 l22 9 l-22 9"/></svg></div>
<div style="position:relative"><h1>Long Trail Planner</h1><p class="sub" style="max-width:6.3in">A fill-in workbook for a section hike or a thru-hike on any long trail: choosing the trail, permits, daily miles, resupply and mail drops, budget, food, water, gear weight, a safety plan and a trail log.</p>
<div class="meta" style="margin-top:22pt"><span>32 printable pages</span><span>mi + km, oz + g</span><span>Any long trail</span></div></div>''', 0, "cover photo")

    # ---------- 2 how to use
    page('''<div class="kicker">Start here</div><h2>How to use this workbook</h2>
<p class="lead">A long trail is a big dream made of small, plannable pieces. This workbook takes you from "one day" to a start date, one page at a time.</p>
<div class="cmp" style="grid-template-columns:1fr 1fr">
<div><div class="who">Section hike</div><h3>A long trail in pieces</h3><p>You hike the trail a few days or weeks at a time, over months or years. Easier on work and family, and you can pick the best season for each part.</p><p class="small">Most useful pages: 5, 6, 8, 9, 17 to 20, 22.</p></div>
<div><div class="who">Thru-hike</div><h3>The whole trail in one go</h3><p>You walk the whole trail in a single season, usually over weeks or months. It needs more planning: time off, resupply, budget and home logistics.</p><p class="small">Use every page, in order, starting a year ahead if you can.</p></div></div>
<h3 style="margin-top:14pt">Work through it in four stages</h3>
<div class="steps2">
<div><div class="n">1</div><div><h3>Dream and decide</h3><p>Pages 3 to 6: what you want, an honest fit check, choosing a trail and splitting it into sections.</p></div></div>
<div><div class="n">2</div><div><h3>Plan the logistics</h3><p>Pages 7 to 17: timeline, permits, transport, daily miles, resupply, budget, food and water.</p></div></div>
<div><div class="n">3</div><div><h3>Gear, training, safety</h3><p>Pages 18 to 23: gear weights, a shakedown hike, training, a safety plan and your life at home.</p></div></div>
<div><div class="n">4</div><div><h3>On the trail and after</h3><p>Pages 24 to 31: six weeks at a glance, daily log pages, a town day checklist and your look back.</p></div></div></div>
<div class="cols" style="margin-top:8pt"><div><h3 style="margin-top:6pt">Printing</h3><p style="font-size:10pt">Print at Actual size on US Letter. An A4 file and a low-ink printer-friendly file are included. Print the log and table pages as often as you need for your own trips. Use pencil: plans change.</p></div>
<div><h3 style="margin-top:6pt">Units</h3><table style="margin-top:2pt"><tr><th>Imperial</th><th>Metric</th></tr><tr><td>1 mile</td><td>1.61 km</td></tr><tr><td>1 ft</td><td>0.305 m</td></tr><tr><td>1 oz / 1 lb</td><td>28.35 g / 454 g</td></tr><tr><td>1 quart</td><td>0.95 liter</td></tr></table></div></div>''', 2)

    # ---------- 3 dream page
    page(f'''{ph("Fill in", "My long trail dream", "Write it down.<br>It gets real.")}
<div class="f2">{fl("The trail")}{fl("Total length", MI)}{fl("Section or thru-hike")}{fl("Direction (north, south, flip)")}{fl("Dream start date")}{fl("Dream finish date")}</div>
<div class="lab" style="margin-top:14pt">Why I want to hike it</div>{lines(4)}
<div class="lab">What I am most looking forward to</div>{lines(3)}
<div class="lab">What worries me (and one thing I can do about each)</div>{lines(3)}
<div class="f2"><div><div class="lab">Hiking alone or with</div>{lines(2, 22)}</div><div><div class="lab">People I need to talk to first</div>{lines(2, 22)}</div></div>
<div class="lab">My promise to myself</div>{lines(2)}
<div class="f2" style="margin-top:6pt">{fl("Signed")}{fl("Date")}</div>''', 3)

    # ---------- 4 fit check
    def q(t):
        return f'<div><i></i><span>{t}</span><span class="scale"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></span></div>'
    qs = ["I can take the time off I need, including buffer days", "Work, family and pets are covered while I am away",
          "I have done at least one overnight backpacking trip", "I have hiked several days in a row with a full pack",
          "I can walk my planned daily distance with hills", "I have a realistic budget, with money set aside for surprises",
          "I can read a map and use a navigation app, and I carry a backup", "I know how to treat water and store food on this trail",
          "I am ready for bad weather days, blisters and boredom", "I am fine turning around or getting off trail when needed",
          "My gear has been tested on a trip like this", "Someone at home will follow my plan and check-ins"]
    page(f'''<div class="kicker">Honest self-check</div><h2>Is it a good fit right now?</h2>
<p class="lead">Rate each line from 1 (not yet) to 5 (yes, ready). Low scores are not a no. They are your to-do list.</p>
<div class="chk" style="grid-template-columns:1fr">{"".join(q(x) for x in qs)}</div>
<div class="cols" style="margin-top:12pt"><div class="box" style="margin:0"><h3 style="margin-top:0">Reading your score</h3><p style="margin:0;font-size:9.6pt">Mostly 4 and 5: start planning dates. Some 1 and 2: work on them first, or start with a shorter section. A long trail is not going anywhere; a well-planned section hike is a great way to begin.</p></div>
<div><div class="lab" style="margin-top:0">My three lowest scores and the fix</div>{lines(3, 22)}</div></div>
<p class="small" style="margin-top:10pt">If you have a health condition or have not been active for a while, talk to your doctor before starting a long hike or a training plan.</p>''', 4)

    # ---------- 5 choose a trail
    rows5 = ["Length (mi / km)", "Season window", "Permits needed", "Typical daily miles", "Resupply style", "Hardest part", "Getting there", "Rough budget", "Gut feeling"]
    cg = '<div class="cg"><div class="k t">Compare</div>' + "".join('<div class="t">Trail</div>' for _ in range(4))
    for r in rows5:
        cg += f'<div class="k">{r}</div>' + "<div></div>" * 4
    cg += "</div>"
    page(f'''<div class="kicker">Fill in</div><h2>Choose a trail</h2>
<p style="font-size:10pt;margin-top:-2pt">Compare up to four trails side by side. Get every number from the trail's official organization: lengths, seasons and permit rules are updated often.</p>
{cg}
<h3 style="margin-top:14pt">A few long trails to start your research</h3>
<div class="trl"><div class="h">Trail</div><div class="h">Where</div><div class="h">Approximate length</div><div class="h">Official info</div>
<div><b>Appalachian Trail</b></div><div>Georgia to Maine, 14 states</div><div>about 2,200 mi (3,540 km)</div><div>Appalachian Trail Conservancy</div>
<div><b>Pacific Crest Trail</b></div><div>Mexico to Canada, CA, OR, WA</div><div>about 2,650 mi (4,265 km)</div><div>Pacific Crest Trail Association</div>
<div><b>Long Trail</b></div><div>Vermont, Massachusetts line to Canada</div><div>about 272 mi (438 km)</div><div>Green Mountain Club</div>
<div><b>Colorado Trail</b></div><div>Denver to Durango, Colorado</div><div>about 485 mi (780 km)</div><div>Colorado Trail Foundation</div>
<div><b>Bruce Trail</b></div><div>Niagara to Tobermory, Ontario</div><div>about 560 mi (900 km)</div><div>Bruce Trail Conservancy</div></div>
<p class="small" style="margin-top:6pt">Lengths are rounded and change with reroutes and alternates. Always check the official site before you plan.</p>
<div class="lab" style="margin-top:10pt">My choice and why</div>{lines(4, 22)}''', 5)

    # ---------- 6 section planner
    page(f'''{ph("Fill in", "Section planner", "Split the trail<br>into trips")}
<p style="font-size:9.8pt;margin-top:-2pt">Cut the trail into pieces that fit your weekends and vacations. Good section ends have a trailhead you can reach and a way to get back to your car.</p>
{tb("0.38in 1.25in 1.25in 0.85in 0.62in 1fr 0.42in", ["#", "From", "To", "mi / km", "Days", "Best time / planned dates", "Done"], 15, 31, first=lambda k: k + 1)}
<div class="sum"><div>Total sections</div><div>Total distance<span>mi / km</span></div><div>Sections done</div><div>Distance left<span>mi / km</span></div></div>''', 6)

    # ---------- 7 timeline
    page('''<div class="kicker">Checklist</div><h2>Planning timeline</h2>
<p class="lead">For a thru-hike, start about a year ahead. For a section hike, start the 6-month list.</p>
<div class="mm">
<div><b>12 months</b><ul><li>Choose the trail and direction</li><li>Read the official trail site</li><li>Note permit dates and rules</li><li>Talk to work and family</li><li>Start saving</li><li>Start regular walking</li></ul></div>
<div><b>6 months</b><ul><li>Apply for permits when they open</li><li>Set a start window</li><li>Plan sections and daily miles</li><li>List your gear and its weight</li><li>Book a shakedown overnight</li><li>Start a training plan</li></ul></div>
<div><b>1 month</b><ul><li>Book travel to the trailhead</li><li>Finish the resupply plan</li><li>Pack mail drop boxes</li><li>Do a final shakedown</li><li>Set up bills, mail and pets</li><li>Leave your trip plan with a contact</li></ul></div>
<div><b>1 week</b><ul><li>Check trail conditions, closures and fire news</li><li>Check the weather forecast</li><li>Charge and update devices</li><li>Download offline maps</li><li>Pack and weigh your pack</li><li>Rest your legs</li></ul></div></div>
<div class="lab" style="margin-top:14pt">My own to-dos and deadlines</div>''' + tb("1fr 1.1in 0.42in", ["To do", "By when", "Done"], 13, 26), 7)

    # ---------- 8 permits
    page(f'''{ph("Fill in", "Permits and registration", "Check the official<br>site every year")}
<p style="font-size:9.8pt;margin-top:-2pt">Some long trails need a long-distance permit, and parks or forests along the way can have their own permits, campsite rules or fees. Rules and opening dates change from year to year: write down where you checked and when.</p>
{tb("1.5in 0.95in 1.05in 1fr 0.42in", ["Permit or registration", "Opens", "Applied on", "Confirmation number / notes", "Got it"], 9, 34)}
<div class="lab" style="margin-top:14pt">Where I checked</div>
{tb("1.6in 1fr 1in", ["Organization", "Website or phone", "Checked on"], 5, 26)}
<div class="box" style="margin-top:12pt"><p style="margin:0;font-size:9.4pt">Carry permits the way the issuer asks: printed, on your phone, or both. Keep a photo of each one, and write the confirmation numbers here in case your phone dies.</p></div>''', 8)

    # ---------- 9 transport
    page(f'''{ph("Fill in", "Getting to and from the trail", "Start, finish<br>and in between")}
<div class="f2" style="margin-top:2pt"><div><div class="lab">Getting to the start</div>{fl("Trailhead")}{fl("Date and time")}{fl("Travel by (flight, bus, train, car)")}{fl("Booking number")}{fl("Shuttle or ride")}{fl("Shuttle phone")}{fl("Night before: where I sleep")}</div>
<div><div class="lab">Getting home from the end</div>{fl("Trailhead")}{fl("Expected date")}{fl("Nearest town")}{fl("Travel by")}{fl("Booking number (flexible?)")}{fl("Shuttle or ride")}{fl("Shuttle phone")}</div></div>
<div class="lab" style="margin-top:14pt">Section hikes: car and shuttle plan</div>
{tb("1.2in 1.2in 1.15in 1fr", ["Section", "Park car at", "Shuttle by", "Phone and price"], 6, 27)}
<div class="lab" style="margin-top:12pt">Notes (parking rules, overnight permits for cars, public transport)</div>{lines(4, 22)}
<p class="small" style="margin-top:8pt">Ask the land manager whether overnight parking is allowed at a trailhead and if a parking pass is needed. Avoid leaving valuables in the car.</p>''', 9)

    # ---------- 10 daily mileage guide + planner
    page(f'''<div class="kicker">Plan your pace</div><h2>Daily mileage planner</h2>
<p style="font-size:10pt;margin-top:-2pt">Start with short days and build up. Most injuries come from doing too much too soon, so plan your first week well below the distance you think you can do.</p>
<div class="cmp">
<div><div class="who">Hiking day</div><h3>Your target</h3><p>A distance you can walk with your full pack, day after day, with time to eat, rest and set up camp before dark.</p></div>
<div><div class="who">Zero and nero</div><h3>Rest days</h3><p>A zero is a day with no trail miles, usually in town. A nero is a "nearly zero": a short day into or out of town.</p></div>
<div><div class="who">Buffer</div><h3>Spare days</h3><p>Days for weather, a sore ankle, a closed trail or a slow section. Plans without buffer days tend to break.</p></div></div>
<div class="lab" style="margin-top:12pt">My trip in numbers</div>
<div class="f3">{fl("Length", MI)}{fl("Per day", MI)}{fl("Hiking days")}{fl("Zero and nero days")}{fl("Buffer days")}{fl("Total days")}</div>
<p class="small" style="margin-top:6pt">Hiking days = length divided by your target per day. Total days = hiking days + zero and nero days + buffer days.</p>
<div class="lab" style="margin-top:8pt">Day by day</div>
{tb("0.4in 0.7in 1.15in 1.15in 0.72in 0.75in 1fr", ["Day", "Date", "From", "To", "mi / km", "Climb ft / m", "Camp, water, notes"], 9, 26, first=lambda k: "")}''', 10)

    # ---------- 11 day-by-day continued
    page(f'''{ph("Fill in · print more as needed", "Daily mileage planner", "Day by day,<br>continued")}
{tb("0.4in 0.7in 1.15in 1.15in 0.72in 0.75in 1fr", ["Day", "Date", "From", "To", "mi / km", "Climb ft / m", "Camp, water, notes"], 22, 27.2, first=lambda k: "")}''', 11)

    # ---------- 12 resupply guide
    page(f'''<div class="kicker">Plan your food stops</div><h2>Resupply planner</h2>
<p style="font-size:10pt;margin-top:-2pt">Resupply means getting more food and supplies along the way. There are two main ways, and most hikers mix them.</p>
<div class="cmp" style="grid-template-columns:1fr 1fr">
<div><div class="who">Buy in town</div><h3>Shop as you go</h3><p>Flexible and simple: you buy what you feel like eating. Small-town stores can have little choice and higher prices, and some are a long hitch or walk from the trail.</p></div>
<div><div class="who">Mail drop</div><h3>Send boxes ahead</h3><p>Good for places with no store, special diets and gear swaps. Needs a helper at home or careful packing before you leave, and you must reach the post office while it is open.</p></div></div>
<div class="cols" style="margin-top:12pt"><div><h3 style="margin-top:0">General Delivery address (USPS)</h3>
<div class="addr">Your full legal name<br>c/o General Delivery<br>Town, State ZIP<br>Please hold for hiker. ETA: date</div>
<p class="small" style="margin-top:6pt">General Delivery is a USPS service, so use the Postal Service, not other carriers. Mail is held for a limited time (often up to 30 days). Bring photo ID to collect it. In Canada, ask Canada Post about General Delivery: hold times differ.</p></div>
<div><h3 style="margin-top:0">Before you rely on a stop</h3><ul class="check"><li>Call the post office: small offices can have short hours and close on weekends</li><li>Some hostels and outfitters hold packages for hikers; ask first, some charge a fee</li><li>Check how far the town is from the trail and how you get there</li><li>Carry enough food to reach the next stop, plus a spare day</li></ul></div></div>
<div class="lab" style="margin-top:10pt">My first stops</div>
{tb("1.3in 0.85in 0.7in 0.95in 1fr", ["Town or stop", "Mile / km", "Days of food", "Buy / mail drop", "Post office hours, phone, notes"], 6, 26)}''', 12)

    # ---------- 13 resupply table
    page(f'''{ph("Fill in · print more as needed", "Resupply planner", "Every stop<br>on the trail")}
{tb("0.3in 1.25in 0.75in 0.62in 0.88in 0.82in 1fr", ["#", "Town or stop", "Mile / km", "Days of food", "Buy / mail drop", "Arrive (ETA)", "Hours, phone, notes"], 17, 31.6, first=lambda k: k + 1)}
<div class="sum" style="grid-template-columns:repeat(3,1fr)"><div>Mail drops</div><div>Longest stretch<span>days of food</span></div><div>Boxes sent</div></div>''', 13)

    # ---------- 14 mail drop box
    items = ["Breakfasts", "Lunches and snacks", "Dinners", "Drink mixes and coffee", "Spices, oil, condiments", "Toilet paper and wipes",
             "Hand sanitizer and soap", "Sunscreen and lip balm", "Insect repellent", "Blister care and first-aid refills",
             "Medication refills", "Spare socks", "Water treatment refills", "Batteries or power bank", "Maps or pages for the next section",
             "Zip bags and a trash bag", "Seasonal gear swap", "A treat or a note from home"]
    page(f'''{ph("Checklist", "Mail drop box packing list", "Copy for every box")}
<div class="f3" style="margin-top:2pt">{fl("Box number")}{fl("Send to (town)")}{fl("Mail by date")}{fl("Days of food")}{fl("Box weight", "<b></b>lb / <b></b>kg")}{fl("Tracking number")}</div>
<div class="lab" style="margin-top:12pt">In the box</div>{chk(items)}
<div class="cols" style="margin-top:12pt"><div><div class="lab" style="margin-top:0">Also in this box</div>{lines(7, 22)}</div>
<div class="box" style="margin:0"><h3 style="margin-top:0">Packing tips</h3><p style="margin:0;font-size:9.4pt">Write your name and expected arrival date in big letters on every side. Tape a copy of this list inside the lid. Bag liquids twice. Check the carrier's rules for what can be mailed: fuel canisters, lighters and some sprays have special rules or cannot be mailed at all.</p></div></div>''', 14)

    # ---------- 15 budget
    rows = [("Gear", "Pack, shelter, sleep system, clothing, replacements"), ("Food on trail", "Groceries, mail drop food, shipping"),
            ("Towns", "Lodging, restaurants, laundry, showers"), ("Transport", "Flights, buses, shuttles, gas, parking"),
            ("Permits and fees", "Trail permits, parks, campsites"), ("Health", "Insurance, check-ups, medication, foot care"),
            ("Home", "Rent or mortgage, bills, phone, pet care"), ("Emergency fund", "Money you do not plan to spend")]
    br = "".join(f'<div class="tb" style="grid-template-columns:1.25in 1fr 0.95in 0.95in;height:40pt"><div><b style="font-family:var(--serif);font-size:11pt;color:var(--forest)">{a}</b></div><div style="font-size:8.6pt;color:#6B6B66">{b}</div><div></div><div></div></div>' for a, b in rows)
    page(f'''{ph("Fill in", "Budget planner", "Plan it,<br>then track it")}
<p style="font-size:9.8pt;margin-top:-2pt">Estimate each line before you go, then write what you really spent as you travel. Towns are where many budgets break, so plan your zero days with care.</p>
<div class="tb h" style="grid-template-columns:1.25in 1fr 0.95in 0.95in"><div>Category</div><div>Includes</div><div>Planned $</div><div>Spent $</div></div>{br}
<div class="tb" style="grid-template-columns:1.25in 1fr 0.95in 0.95in;height:34pt;border-bottom:2pt solid var(--forest)"><div><b style="font-family:var(--serif);font-size:13pt;color:var(--clay)">Total</b></div><div></div><div></div><div></div></div>
<div class="f3" style="margin-top:12pt">{fl("Days on trail")}{fl("Planned per day $")}{fl("Saved so far $")}</div>
<div class="lab" style="margin-top:12pt">Ways I can save</div>{lines(4, 22)}''', 15)

    # ---------- 16 food planner
    meal = ["Breakfast", "Morning snacks", "Lunch", "Afternoon snacks", "Dinner", "Drinks and extras"]
    mr = "".join(f'<div class="tb" style="grid-template-columns:1.3in 1fr 1fr 0.8in;height:34pt"><div style="font:700 7.2pt/1.2 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest)">{m}</div><div></div><div></div><div></div></div>' for m in meal)
    page(f'''<div class="kicker">Fill in</div><h2>Food planner</h2>
<p style="font-size:10pt;margin-top:-2pt">Appetite often grows a lot after the first week or two on a long trail. Plan by weight and adjust at every resupply.</p>
<div class="rng" style="grid-template-columns:1fr 1fr">
<div><div class="stat">1.5&#8211;2.5 lb</div><div class="u">(0.7&#8211;1.1 kg) food per person per day</div><p>A common planning range for backpacking. Many long-distance hikers end up at the top of it or above.</p></div>
<div><div class="stat">100&#8211;125</div><div class="u">calories per ounce (3.5&#8211;4.4 per gram)</div><p>A handy target for trail food. Nuts, nut butters and oils are higher; fresh food is much lower.</p></div></div>
<div class="f3" style="margin-top:10pt">{fl("My daily calorie range")}{fl("Per day", "<b></b>lb / <b></b>kg")}{fl("Longest carry", "<b></b>days")}</div>
<div class="lab" style="margin-top:12pt">My standard trail day</div>
<div class="tb h" style="grid-template-columns:1.3in 1fr 1fr 0.8in"><div>Meal</div><div>Option A</div><div>Option B</div><div>oz / g</div></div>{mr}
<div class="lab" style="margin-top:10pt">Foods I never get tired of / foods to avoid</div>{lines(2, 22)}
<div class="warn" style="margin-top:10pt"><b>Not diet or medical advice.</b> Energy needs vary widely. If you have diabetes, a heart condition, food allergies or a medical diet, plan your food with your doctor or a registered dietitian.</div>''', 16)

    # ---------- 17 water
    page(f'''{ph("Fill in", "Water planner", "Know your next<br>source")}
<p style="font-size:9.8pt;margin-top:-2pt">Water is heavy: 1 liter weighs about 2.2 lb (1 kg). Carry enough to reach the next reliable source, plus a margin for heat and climbs. Treat all water from streams, lakes and springs.</p>
<div class="f3">{fl("Carry capacity", "<b></b>liters")}{fl("Treatment method")}{fl("Backup method")}</div>
<div class="lab" style="margin-top:12pt">Sources on this stretch</div>
{tb("1.35in 0.75in 0.95in 1fr 0.85in", ["Source", "Mile / km", "Type", "Reliable? Last report", "Carry to next (L)"], 14, 26)}
<div class="cols" style="margin-top:12pt"><div><h3 style="margin-top:0">Treatment options</h3><ul class="check"><li>Filter: squeeze, pump or gravity</li><li>Chemical: tablets or drops; follow the wait time</li><li>UV light pen: works best with clear water</li><li>Boiling: needs fuel and time</li></ul></div>
<div class="box" style="margin:0"><p style="margin:0;font-size:9.3pt">Follow the instructions of your filter or treatment exactly, and protect filters from freezing. In dry areas, never count on a water cache: they can be empty. Check recent water reports from the trail organization or land manager.</p></div></div>''', 17)

    # ---------- 18 gear list
    cats = [("Big three: pack, shelter, sleep system", 5), ("Shelter extras", 2), ("Kitchen", 4), ("Water", 3), ("Clothing packed", 5), ("Navigation and safety", 4)]
    gl = ""
    for c, n in cats:
        gl += f'<div style="font:700 7.2pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin:7pt 0 0">{c}</div>'
        gl += "".join('<div class="tb" style="grid-template-columns:1fr 0.7in 0.7in 0.42in 0.42in;height:22.5pt"><div></div><div></div><div></div><i></i><i></i></div>' for _ in range(n))
    page(f'''{ph("Fill in · 1 of 2", "Gear list with weights", "Weigh everything<br>on a kitchen scale")}
<div class="tb h" style="grid-template-columns:1fr 0.7in 0.7in 0.42in 0.42in"><div>Item</div><div>oz</div><div>g</div><div>Worn</div><div>Packed</div></div>{gl}''', 18)

    # ---------- 19 gear list 2 + base weight
    cats2 = [("Hygiene and first aid", 5), ("Electronics", 4), ("Other", 4)]
    gl2 = ""
    for c, n in cats2:
        gl2 += f'<div style="font:700 7.2pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin:7pt 0 0">{c}</div>'
        gl2 += "".join('<div class="tb" style="grid-template-columns:1fr 0.7in 0.7in 0.42in 0.42in;height:22.5pt"><div></div><div></div><div></div><i></i><i></i></div>' for _ in range(n))
    calc = [("A", "All packed gear (not worn)"), ("B", "Food for the longest carry"), ("C", "Water at the heaviest point"), ("D", "Fuel")]
    cr = "".join(f'<div class="tb" style="grid-template-columns:0.35in 1fr 0.9in 0.9in;height:25pt"><div class="n">{a}</div><div>{b}</div><div></div><div></div></div>' for a, b in calc)
    page(f'''{ph("Fill in · 2 of 2", "Gear list and base weight", "What you carry<br>every day")}
<div class="tb h" style="grid-template-columns:1fr 0.7in 0.7in 0.42in 0.42in"><div>Item</div><div>oz</div><div>g</div><div>Worn</div><div>Packed</div></div>{gl2}
<h3 style="margin-top:14pt">Base weight calculator</h3>
<p style="font-size:9.6pt;margin-top:0">Base weight is your packed gear without food, water and fuel, which change every day. Clothes you wear are not counted.</p>
<div class="tb h" style="grid-template-columns:0.35in 1fr 0.9in 0.9in"><div></div><div></div><div>lb / oz</div><div>kg / g</div></div>{cr}
<div class="sum" style="grid-template-columns:1fr 1fr"><div>Base weight = A<span>lb &#160;&#160;&#160;&#160;&#160;&#160;/&#160;&#160;&#160;&#160;&#160;&#160; kg</span></div><div>Heaviest pack = A + B + C + D<span>lb &#160;&#160;&#160;&#160;&#160;&#160;/&#160;&#160;&#160;&#160;&#160;&#160; kg</span></div></div>
<p class="small" style="margin-top:8pt">Check your heaviest pack against the load range your backpack maker recommends. 16 oz = 1 lb, 1,000 g = 1 kg.</p>''', 19)

    # ---------- 20 shakedown
    page(f'''{ph("Fill in", "Shakedown hike log", "Test everything<br>before the big trip")}
<p style="font-size:9.8pt;margin-top:-2pt">A shakedown is a test trip with your full long-trail kit, ideally one or two nights with a full food carry. Use what you learn to cut, swap and fix before you leave.</p>
<div class="f3">{fl("Where")}{fl("Dates")}{fl("Distance", MI)}{fl("Pack", "<b></b>lb / <b></b>kg")}{fl("Low temp", "<b></b>°F / <b></b>°C")}{fl("Weather")}</div>
<div class="lab" style="margin-top:12pt">What I tested</div>{opts("Shelter in wind or rain", "Sleeping warm enough", "Stove and fuel use", "Water treatment", "Shoes and socks", "Pack fit with full food", "Rain gear", "Navigation app and backup", "Charging plan", "Food storage method")}
<div class="lab" style="margin-top:12pt">What worked well</div>{lines(4, 22)}
<div class="f2"><div><div class="lab">Did not use (leave home?)</div>{lines(3, 22)}</div><div><div class="lab">Missing (add)</div>{lines(3, 22)}</div></div>
<div class="f2"><div><div class="lab">Hot spots, aches, blisters</div>{lines(3, 22)}</div><div><div class="lab">To fix or replace</div>{lines(3, 22)}</div></div>
<div class="lab">Ready for the big trip?</div>{opts("Yes", "After one more test", "Not yet")}
<div class="lab" style="margin-top:12pt">Notes</div>{lines(5, 22)}''', 20)

    # ---------- 21 training
    wk = [("1", "Easy walks most days, one longer weekend walk"), ("2", "Same, plus a few hills or stairs"), ("3", "Longer weekend hike with a light pack"),
          ("4", "Easier week to recover"), ("5", "Add pack weight slowly on hills"), ("6", "Two hiking days in a row with a pack"),
          ("7", "Longest hike or a shakedown overnight"), ("8", "Lighter week: rest before you start")]
    wr = "".join(f'<div class="wk"><div class="n">{a}</div><div>{b}</div><div></div><i></i></div>' for a, b in wk)
    page(f'''{ph("Fill in", "Training plan link-up", "8 weeks to<br>trail-ready legs")}
<p style="font-size:9.8pt;margin-top:-2pt">You do not need to be an athlete to start a long trail, but strong legs and tough feet make the first weeks much nicer. This is a simple outline. For a full day-by-day plan, see our Trail Ready 8-week training plan (optional).</p>
<div class="wk h"><div>Week</div><div>Focus</div><div>My plan and what I did</div><div>Done</div></div>{wr}
<div class="cols" style="margin-top:12pt"><div><h3 style="margin-top:0">Good habits</h3><ul class="check"><li>Train in the shoes and socks you will hike in</li><li>Build up slowly; rest when something hurts</li><li>Hills and stairs are the best practice for climbs</li><li>Practice with the pack you will carry</li></ul></div>
<div class="warn" style="margin:0"><b>Check with your doctor</b> before starting a new training plan, especially if you have a health condition, an old injury, or have not been active for a while. Stop and get help for chest pain, dizziness or unusual shortness of breath.</div></div>
<div class="lab" style="margin-top:12pt">My training notes</div>{lines(4, 22)}''', 21)

    # ---------- 22 safety plan
    page(f'''{ph("Fill in", "Safety plan", "Leave a copy<br>with your contact")}
<div class="f2" style="margin-top:2pt">{fl("Home contact")}{fl("Phone")}{fl("Backup contact")}{fl("Phone")}</div>
<div class="f2">{fl("Check-in plan (how and how often)")}{fl("If no check-in by, call")}{fl("Communication device")}{fl("Device ID / app")}</div>
<div class="lab" style="margin-top:12pt">Emergency numbers along the way</div>
{tb("1.6in 1.5in 1fr", ["Area", "Who (ranger, sheriff, park)", "Phone"], 4, 25)}
<div class="lab" style="margin-top:12pt">Ten Essentials packed</div>{opts("Navigation", "Headlamp", "Sun protection", "First aid", "Knife and repair kit", "Fire starter", "Emergency shelter", "Extra food", "Extra water", "Extra clothes")}{""}
<div class="lab" style="margin-top:12pt">My turnaround rules</div>
{chk(["Thunderstorm building: get off ridges and summits early", "Too tired or hurt to go on safely", "River crossing too fast or too deep", "Lost the trail and cannot find it again", "Smoke, fire or a closure ahead", "Out of water with no sure source"])}
<div class="cols" style="margin-top:12pt"><div><h3 style="margin-top:0">Where I check conditions</h3><ul class="check"><li>Weather: weather.gov (US), weather.gc.ca (Canada)</li><li>Wildfires: inciweb.wildfire.gov and the land manager</li><li>Smoke and air quality: airnow.gov</li><li>Closures: the trail organization's alerts page</li></ul></div>
<div><div class="lab" style="margin-top:0">Medical notes for my contact</div>{lines(5, 22)}</div></div>
<p class="small" style="margin-top:8pt">In an emergency, call 911 (US and Canada) if you have signal, or use your satellite device.</p>''', 22)

    # ---------- 23 home logistics
    page(f'''{ph("Checklist", "Home logistics", "Leave with<br>a quiet mind")}
<div class="cols" style="gap:0 22pt"><div><h3 style="margin-top:0">Money and bills</h3>{chk(["Bills on autopay or paid ahead", "Bank and card told about travel", "Backup card stored separately", "Budget shared with my contact"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}
<h3>Work</h3>{chk(["Time off approved in writing", "Out-of-office plan and handover", "Return date set, with buffer"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}
<h3>Mail and home</h3>{chk(["Mail forwarded or held", "Someone checks the house or apartment", "Plants and fridge sorted", "Car stored, insurance checked"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}</div>
<div><h3 style="margin-top:0">Pets and family</h3>{chk(["Pet care arranged, vet info shared", "Family has my plan and check-in schedule", "Who sends mail drops, with the list"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}
<h3>Phone and accounts</h3>{chk(["Phone plan covers the area", "Passwords and two-factor work away from home", "Important documents photographed", "Offline maps downloaded"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}
<h3>Health</h3>{chk(["Check-up done", "Prescriptions filled for the trip", "Insurance card packed"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}</div></div>
<div class="lab" style="margin-top:12pt">Helpers at home</div>
{tb("1.4in 1.6in 1fr", ["Name", "Helps with", "Phone"], 4, 25)}''', 23)

    # ---------- 24 six weeks
    cal = '<div class="d"></div>' + "".join(f'<div class="d">{d}</div>' for d in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
    for w in range(1, 7):
        cal += f'<div class="w">Week {w}</div>' + '<div>Date<s>mi / km</s></div>' * 7
    page(f'''{ph("Fill in", "Six weeks at a glance", "Miles, zeros<br>and towns")}
<p style="font-size:9.6pt;margin-top:-2pt">Write the date in each box, where you slept and the distance. Mark zero days with a Z and town days with a T. Print another copy for the next six weeks.</p>
<div class="cal">{cal}</div>''', 24)

    # ---------- 25-29 daily log
    def dlog():
        return f'''<div class="dlog"><div class="top"><h3>Day&#160;&#160;______</h3><span>Date&#160;&#160;___________</span></div>
<div class="f4">{fl("From")}{fl("To")}{fl("Distance", "mi / km")}{fl("Total so far")}</div>
<div class="f4">{fl("Start time")}{fl("End time")}{fl("Weather")}{fl("Water left")}</div>
<div class="lab" style="margin-top:7pt">Today on the trail</div>{lines(5, 20)}
<div class="f2"><div><div class="lab">Best moment</div>{lines(2, 20)}</div><div><div class="lab">Body and feet</div>{lines(2, 20)}</div></div>
<div class="lab">Tomorrow</div>{lines(1, 20)}</div>'''
    for n in range(25, 30):
        page(f'''<div class="ph" style="margin-bottom:8pt"><div><h2>Trail log</h2></div><div class="r">Print as many<br>as you need</div></div>{dlog()}{dlog()}''', n)

    # ---------- 30 town day
    page(f'''<div class="kicker">Checklist</div><h2>Town day checklist</h2>
<p class="lead">Town stops go fast. Use this list so you leave rested, fed and ready, without forgetting the one thing you came for.</p>
<div class="cols" style="gap:0 22pt"><div><h3 style="margin-top:0">Must do</h3>{chk(["Pick up mail drop (check hours)", "Buy food to the next stop, plus a spare day", "Fuel and water treatment refills", "Charge phone, power bank, headlamp", "Check in with home", "Check weather, trail alerts and fire news", "Check the next water sources"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}</div>
<div><h3 style="margin-top:0">Look after yourself</h3>{chk(["Shower and laundry", "Eat a big meal and drink plenty", "Check feet, treat blisters, trim nails", "Tick check in tick country", "Air out and dry your gear", "Sleep: rest is the point", "Send home gear you do not need"]).replace('class="chk"', 'class="chk" style="grid-template-columns:1fr"')}</div></div>
<div class="f2" style="margin-top:12pt">{fl("Town")}{fl("Date")}{fl("Stayed at")}{fl("Spent $")}</div>
<div class="lab" style="margin-top:12pt">Shopping list for the next stretch</div>{lines(8, 22)}
<div class="lab">Getting back to the trail (ride, shuttle, time)</div>{lines(3, 22)}''', 30)

    # ---------- 31 after the trail
    page(f'''{ph("Fill in", "After the trail", "Look back,<br>plan forward")}
<div class="f3" style="margin-top:2pt">{fl("Trail or section")}{fl("Dates")}{fl("Distance", MI)}{fl("Days on trail")}{fl("Zero days")}{fl("Total spent $")}</div>
<div class="lab" style="margin-top:12pt">The moments I want to remember</div>{lines(5)}
<div class="lab">What I learned about myself</div>{lines(3)}
<div class="lab" style="margin-top:8pt">Gear review</div>
{tb("1.6in 0.85in 1fr", ["Item", "Keep / swap", "Why"], 7, 25)}
<div class="f2" style="margin-top:6pt"><div><div class="lab">People to thank</div>{lines(3, 22)}</div><div><div class="lab">My next trail</div>{lines(3, 22)}</div></div>''', 31)

    # ---------- 32 back
    page(f'''<div class="brand">HikeSupply Co.</div>
<div><h2>Getting ready for your long trail?</h2><p style="font-size:12pt;max-width:5.6in;margin-top:10pt">Two printables that pair well with this workbook.</p>
<div class="bk" style="margin-top:22pt">
<div><h3>First Backpacking Trip</h3><p>A beginner's guide and planner for your first nights on the trail, before you take on a long one.</p><div class="u">hikesupplyco.com</div></div>
<div><h3>Trail Ready</h3><p>An 8-week printable training plan to build strong legs and steady lungs for a bigger hike.</p><div class="u">hikesupplyco.com</div></div></div></div>
<div><p style="font-size:9pt;max-width:6.4in">Trail lengths, permits, fees and rules change. Check the official trail organization, park or forest website, or ask a ranger, before every trip, and hike within your experience. This workbook is for planning only and is not medical, legal or safety advice. For personal use: print as many copies as you like for yourself and your family. Cover photo: {CREDIT}.</p>
<p style="font-size:10pt;margin-top:10pt"><b style="color:#F5F1EA">hikesupplyco.com</b></p></div>''', 0, "back")
