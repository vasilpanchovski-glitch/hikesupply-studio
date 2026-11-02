"""Generates index.html for p13 (2027 Hiking Year Planner & Hike-a-Week Challenge). Run: python3 gen.py
Same look as p11 (base.css + extra.css). Calendar computed with Python's calendar module (weeks start on Sunday).
US federal holidays follow the OPM rules (Saturday holiday observed Friday, Sunday holiday observed Monday).
Canadian holidays: the federal statutory holidays plus the widely observed provincial February and August holidays,
marked as provincial. Daylight saving time 2027: starts Sunday March 14, ends Sunday November 7."""
import os, calendar, datetime as dt
HERE = os.path.dirname(os.path.abspath(__file__))
T = "2027 Hiking Year Planner"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))

Y = 2027
D = dt.date
# (date, label, country) country: us, ca, both
HOL = [
 (D(2027,1,1), "New Year's Day", "both"),
 (D(2027,1,18), "Martin Luther King Jr. Day", "us"),
 (D(2027,2,15), "Presidents Day (Washington's Birthday)", "us"),
 (D(2027,2,15), "Family Day and other February holidays (several provinces)", "ca"),
 (D(2027,3,26), "Good Friday", "ca"),
 (D(2027,5,24), "Victoria Day", "ca"),
 (D(2027,5,31), "Memorial Day", "us"),
 (D(2027,6,18), "Juneteenth (observed, June 19 is a Saturday)", "us"),
 (D(2027,7,1), "Canada Day", "ca"),
 (D(2027,7,5), "Independence Day (observed, July 4 is a Sunday)", "us"),
 (D(2027,8,2), "Civic Holiday (most provinces, names vary)", "ca"),
 (D(2027,9,6), "Labor Day / Labour Day", "both"),
 (D(2027,9,30), "National Day for Truth and Reconciliation", "ca"),
 (D(2027,10,11), "Columbus Day / Indigenous Peoples' Day", "us"),
 (D(2027,10,11), "Thanksgiving", "ca"),
 (D(2027,11,11), "Veterans Day", "us"),
 (D(2027,11,11), "Remembrance Day", "ca"),
 (D(2027,11,25), "Thanksgiving", "us"),
 (D(2027,12,24), "Christmas Day (observed, Dec 25 is a Saturday)", "us"),
 (D(2027,12,25), "Christmas Day", "ca"),
 (D(2027,12,26), "Boxing Day", "ca"),
 (D(2027,12,31), "New Year's Day 2028 (observed, Jan 1 is a Saturday)", "us"),
]
SHORT = {  # short labels for calendar cells
 "New Year's Day": "New Year", "Martin Luther King Jr. Day": "MLK Day", "Presidents Day (Washington's Birthday)": "Presidents Day",
 "Family Day and other February holidays (several provinces)": "Family Day*", "Good Friday": "Good Friday", "Victoria Day": "Victoria Day",
 "Memorial Day": "Memorial Day", "Juneteenth (observed, June 19 is a Saturday)": "Juneteenth obs.", "Canada Day": "Canada Day",
 "Independence Day (observed, July 4 is a Sunday)": "July 4 obs.", "Civic Holiday (most provinces, names vary)": "Civic Holiday*",
 "Labor Day / Labour Day": "Labor Day", "National Day for Truth and Reconciliation": "Truth & Recon.",
 "Columbus Day / Indigenous Peoples' Day": "Columbus / IPD", "Thanksgiving": "Thanksgiving", "Veterans Day": "Veterans Day",
 "Remembrance Day": "Remembrance", "Christmas Day (observed, Dec 25 is a Saturday)": "Christmas obs.", "Christmas Day": "Christmas",
 "Boxing Day": "Boxing Day", "New Year's Day 2028 (observed, Jan 1 is a Saturday)": "New Year obs.",
}
EXTRA = {D(2027,3,14): "Clocks forward", D(2027,11,7): "Clocks back", D(2027,6,21): "Longest day", D(2027,12,21): "Shortest day",
         D(2027,3,28): "Easter"}
FLAG = {"us": "US", "ca": "CA", "both": "US CA"}

def hols_on(day): return [h for h in HOL if h[0] == day]

MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
TIPS = {
 1: ("Ice season", "Shady sections of trail stay icy all winter. Traction devices (microspikes) over your boots help a lot on packed snow and ice. Days are short: start early and carry a headlamp."),
 2: ("Cold batteries", "Cold drains phone and headlamp batteries fast. Keep them in an inside pocket, and carry one warm layer you only put on when you stop."),
 3: ("Mud season", "Many trails turn to mud as the ground thaws. Walk through the middle of the mud, not around it, so the trail does not get wider. Clocks spring forward on March 14 in most of the US and Canada."),
 4: ("Snow up high", "Snow can stay on high and north-facing trails into early summer. Read recent trail reports, and turn back at snow you are not equipped for. Snowmelt makes streams fast and cold: if a crossing looks deep or fast, do not cross."),
 5: ("Tick check", "Tick season is here. Wear long pants in grass and brush, use a repellent made for ticks, and check your whole body after every hike."),
 6: ("Long days, hot trails", "June 21 is the longest day of the year. On hot days start early, carry more water than you think you need, and take breaks in the shade."),
 7: ("Afternoon storms", "In the mountains, thunderstorms often build in the afternoon. Start early and be off summits and open ridges before they form. If you hear thunder, head down."),
 8: ("Fire and smoke", "Wildfire season in many regions. Check fire restrictions, trail closures and air quality before you go. Campfires may be banned even where they are usually allowed."),
 9: ("Hunting seasons", "Hunting seasons open in many states and provinces. Wear a bright orange layer, and check your state or provincial wildlife agency for dates and areas."),
 10: ("Fall colors", "Fall colors bring crowds to popular trails: go on a weekday or early in the morning. Daylight shrinks fast now, so carry a headlamp even on short hikes."),
 11: ("Early dark", "Clocks fall back on November 7 in most of the US and Canada. Plan to finish an hour before sunset, and wear blaze orange during rifle seasons."),
 12: ("Short and cold", "December 21 is the shortest day. Pick shorter trails, tell someone your route and return time, and pack a warm layer, a headlamp and a hot drink."),
}

MORE = """
.cal{width:100%;border-collapse:collapse;table-layout:fixed;margin:6pt 0 0}
.cal th{text-align:center;font:700 7pt/1 var(--sans);letter-spacing:.12em;padding:5pt 0;border-bottom:1.5pt solid var(--forest)}
.cal td{height:0.66in;border:0.6pt solid var(--line);vertical-align:top;padding:3pt 4pt;background:#fff}
.cal td.o{background:transparent;border-color:#EAE4D8}
.cal td .n{font:600 10pt/1 var(--serif);color:var(--forest)}
.cal td.h{background:#F3E9E2}
.cal td.h .n{color:var(--rust)}
.cal td .l{display:block;font:600 6pt/1.15 var(--sans);color:var(--rust);margin-top:3pt}
.cal td .x{display:block;font:600 6pt/1.15 var(--sans);color:var(--sage);margin-top:3pt}
.mhead{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:6pt}
.mhead h2{margin:0;font-size:30pt}
.mhead .g{font:600 8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);width:2.6in;border-bottom:0.8pt solid #CFC7B6;padding-bottom:3pt}
.mb{display:grid;grid-template-columns:1.45fr 1fr;gap:16pt;margin-top:12pt}
.hp td{height:30pt;font-size:9pt}
.hp th{font-size:7pt;padding:4pt 5pt}
.tip{background:var(--forest);color:var(--stone);border-radius:9pt;padding:11pt 13pt}
.tip small{display:block;font:700 7pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:#C9D2C4;margin-bottom:5pt}
.tip h3{color:var(--stone);margin:0 0 5pt;font-size:13pt}
.tip p{margin:0;font-size:9.6pt;line-height:1.45;color:#E4E8E1}
.hl2{font-size:8.6pt;line-height:1.4;margin-top:9pt}
.hl2 div{padding:3pt 0;border-bottom:0.6pt solid var(--line)}
.hl2 b{color:var(--forest)}
.hl2 i{font-style:normal;font:700 6.5pt/1 var(--sans);letter-spacing:.1em;color:var(--clay);margin-left:4pt}
.yr{display:grid;grid-template-columns:repeat(4,1fr);gap:16pt 14pt;margin-top:8pt}
.mini2 h3{font-size:12.5pt;margin:0 0 4pt}
.mini2 table{margin:0;table-layout:fixed}
.mini2 th{font:700 6.5pt/1 var(--sans);padding:2pt 0;text-align:center;border-bottom:0.8pt solid var(--forest);letter-spacing:.05em}
.mini2 td{font-size:8.6pt;padding:3.4pt 0;text-align:center;border:0;line-height:1.15}
.mini2 td.h{background:var(--clay);color:#fff;border-radius:3pt;font-weight:700}
.lw{display:grid;grid-template-columns:1fr 1fr;gap:12pt;margin-top:10pt}
.lw>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:12pt 14pt}
.lw h3{margin:0 0 4pt;font-size:11.5pt}
.lw p{margin:0;font-size:9.6pt;line-height:1.5}
.lw p b{color:var(--forest)}
.wk{display:grid;grid-template-columns:repeat(6,1fr);gap:6pt;margin-top:8pt}
.wk div{background:#fff;border:1pt solid var(--line);border-radius:6pt;height:0.74in;padding:3pt 5pt;position:relative}
.wk div b{font:600 10pt/1 var(--serif);color:var(--clay)}
.wk div span{position:absolute;right:5pt;top:4pt;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt}
.wk div i{position:absolute;left:5pt;right:5pt;bottom:4pt;border-bottom:0.6pt solid #CFC7B6;font-style:normal}
.poster{display:flex;justify-content:center;margin-top:8pt}
.poster text{font-family:Inter,sans-serif}
.gift{border:2pt solid var(--forest);border-radius:12pt;padding:22pt 26pt;background:#fff;margin-top:8pt}
.gift h3{font-size:20pt;margin:0 0 6pt}
.tagrow{display:flex;gap:16pt;margin-top:16pt;justify-content:center}
.gtag{width:3.1in;height:2.05in;border:1.2pt dashed #A39C8D;border-radius:4pt 40pt 40pt 4pt;background:#fff;padding:12pt 18pt 10pt 16pt;position:relative}
.gtag::after{content:"";position:absolute;right:16pt;top:50%;margin-top:-7pt;width:14pt;height:14pt;border-radius:50%;border:1.2pt solid #A39C8D}
.gtag small{display:block;font:700 7pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay);margin-bottom:4pt}
.gtag b{display:block;font:600 13pt/1.15 var(--serif);color:var(--forest);margin-bottom:6pt;width:2.1in}
.gtag .fl{height:26pt;width:2.3in}
.cut{font:600 7.5pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#A39C8D;text-align:center;margin-top:8pt}
.qb{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:10pt 14pt;margin-bottom:9pt}
.qb .ph{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2pt solid var(--forest);padding-bottom:4pt}
.qb .ph b{font:600 15pt/1 var(--serif);color:var(--forest)}
.qb .ph span{font:600 7.5pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#8B8577}
.qb .f2 .fl{height:27pt}
.sum{display:grid;grid-template-columns:repeat(4,1fr);gap:8pt;margin:8pt 0}
.sum>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:9pt 10pt;height:1.1in}
.sum small{display:block;font:700 6.8pt/1.2 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage)}
.bl td{height:28pt;font-size:9pt}
.bl td.nn{font:600 10pt/1 var(--serif);color:var(--clay);width:0.3in}
.bl td.b{width:0.45in;text-align:center}
.bl td.b::before{content:"";display:inline-block;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.gd td{height:29pt;font-size:9pt}
html.bw .cal td.h,html.bw .cal td{background:#fff}
.g4 .fl{height:34pt}
.yrbig{font:600 46pt/1 var(--serif);color:#F5F1EA;margin-bottom:6pt}
html.bw .yrbig{color:#222}
.g4p .opts{font-size:10pt;gap:8pt 16pt}
.ess>div{padding:14pt 0}
.ess p{font-size:11pt;line-height:1.5}
.ess h3{font-size:14pt}
html.bw .mini2 td.h{background:#fff;color:#222;border:1pt solid #222}
html.bw .tip{background:#fff;border:0.8pt solid #999}
html.bw .tip h3,html.bw .tip p,html.bw .tip small{color:#222}
html.bw .poster svg [fill="#2C3B2E"]{fill:#fff}
"""

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 230 L70 170 L110 195 L190 80 L230 120 L265 95 L340 175 L380 150 L470 225" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M190 80 L172 106 L186 102 L198 114 L210 98 L230 120" stroke="#F5F1EA" stroke-width="2.5"/>
<path d="M90 300 C150 280 170 255 230 255 C290 255 300 230 360 222" stroke="#F5F1EA" stroke-width="3" stroke-dasharray="2 10"/>
</svg></div>
<div><div class="yrbig">2027</div><h1>Hiking Year Planner</h1><p class="sub">Set your goals, plan a hike for every month, take the Hike-a-Week Challenge and color in every mile. With US and Canadian holidays and long weekends, a seasonal tip for each month, and a gift page.</p>
<div class="meta" style="margin-top:22pt"><span>28 pages</span><span>12 monthly calendars</span><span>miles + km</span></div></div>""", "cover photo")

# 2 gift page
page("""<div class="kicker">A gift for the trail</div><h2>This year of trails belongs to</h2>
<div class="fl" style="height:40pt;font-size:10pt">Name</div>
<div class="gift"><h3>A note for you</h3>""" + lines(6, 30) + """
<div class="f2" style="margin-top:6pt"><div class="fl">With love from</div><div class="fl">Date</div></div></div>
<div class="box" style="margin-top:14pt"><h3 style="margin-top:0">Giving this as a gift?</h3><p style="margin:0">Print this page and the planner, write your note above, and add a promise if you like: a first hike together, a ride to the trailhead, or a picnic at the top. Cut out a tag below for the wrapping.</p></div>
<div class="tagrow">
<div class="gtag"><small>Gift tag</small><b>A year of trails is waiting</b><div class="fl">To</div><div class="fl">From</div></div>
<div class="gtag"><small>Gift tag</small><b>Here's to 52 hikes</b><div class="fl">To</div><div class="fl">From</div></div>
</div><div class="cut">Cut along the dashed line</div>""")

# 3 how to use
page("""<div class="kicker">Start here</div><h2>How to use this planner</h2>
<p class="lead">This is your plan for a year outside. It works for a first walk in the woods and for a big summit, alone, with friends or with the family. Print it, keep it on the fridge or in a binder, and fill it in as you go.</p>
<div class="ess" style="margin-top:8pt">
<div><div class="n">1</div><div><h3>Set your goals</h3><p>Page 4. Pick a distance in miles or kilometers, a few new trails, one big hike and one skill. Small and steady beats big and forgotten.</p></div></div>
<div><div class="n">2</div><div><h3>See the year</h3><p>Page 5 shows all of 2027 with the long weekends in the US and Canada. Circle the weekends you want to keep free.</p></div></div>
<div><div class="n">3</div><div><h3>Plan each month</h3><p>Pages 6 to 17: a calendar, space for the hikes you plan, and a tip for that season. Write hikes on the calendar in pencil, and in pen once they are done.</p></div></div>
<div><div class="n">4</div><div><h3>Take the challenge</h3><p>Page 18: one box for every week. Any walk outside on a trail counts. Miss a week? Just keep going.</p></div></div>
<div><div class="n">5</div><div><h3>Color it in</h3><p>Pages 19 to 21: color one space for every mile, every kilometer or every summit and viewpoint you reach.</p></div></div>
<div><div class="n">6</div><div><h3>Look back</h3><p>Pages 25 and 26: a short review every three months and a year in review in December. Use it to set next year's goals.</p></div></div>
</div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Pick your units</h3><p style="margin:0">Every distance has room for miles or kilometers. Use one for the whole year so your totals add up. 1 mile = 1.61 km, 1 km = 0.62 miles, 1,000 ft = 305 m.</p></div>
<div class="warn" style="margin-top:10pt">Seasonal tips are general. Conditions change from region to region and week to week: check the park or forest website and the weather before every hike, and turn back when in doubt.</div>""")

# 4 goals
page("""<div class="kicker">Goals</div><h2>My 2027 hiking goals</h2>
<p class="lead" style="margin-bottom:6pt">Write goals you can see yourself doing on a normal busy month. You can always raise them in July.</p>
<div class="dp g4"><div class="f2"><div class="fl">Distance this year <span class="u"><b></b>mi / km</span></div><div class="fl">Number of hikes</div><div class="fl">Longest single hike <span class="u"><b></b>mi / km</span></div><div class="fl">Biggest climb <span class="u"><b></b>ft / m</span></div></div></div>
<div class="lab" style="margin-top:14pt">New trails I want to try</div>""" + lines(3, 34) + """
<div class="lab">My big hike of the year</div>
<div class="f2 g4"><div class="fl">Trail or summit</div><div class="fl">When</div><div class="fl">Distance and climb</div><div class="fl">Start training by</div></div>
<div class="lab">A skill I want to learn</div>
<div class="opts" style="font-size:10pt;gap:8pt 16pt"><span>Reading a map</span><span>Using a compass</span><span>First aid</span><span>Winter hiking</span><span>Camp cooking</span><span>Backpacking</span><span>Leave No Trace</span><span>Photography</span></div>""" + lines(1, 30) + """
<div class="lab">Who I want to hike with</div>""" + lines(2, 34) + """
<div class="lab">Why this matters to me</div>""" + lines(3, 34))

# 5 year at a glance
def minical(m):
    hd = {h[0] for h in HOL}
    rows = ""
    for wk in calendar.Calendar(6).monthdayscalendar(Y, m):
        rows += "<tr>" + "".join(f'<td class="{"h" if d and D(Y,m,d) in hd else ""}">{d or ""}</td>' for d in wk) + "</tr>"
    return f'<div class="mini2"><h3>{MONTHS[m-1]}</h3><table><tr>' + "".join(f"<th>{x}</th>" for x in "SMTWTFS") + f"</tr>{rows}</table></div>"
page("""<div class="kicker">Year at a glance</div><h2>2027</h2>
<div class="yr">""" + "".join(minical(m) for m in range(1, 13)) + """</div>
<div class="lw">
<div><h3>US long weekends</h3><p><b>Jan 16-18</b> MLK Day · <b>Feb 13-15</b> Presidents Day · <b>May 29-31</b> Memorial Day · <b>Jun 18-20</b> Juneteenth · <b>Jul 3-5</b> Independence Day · <b>Sep 4-6</b> Labor Day · <b>Oct 9-11</b> Columbus Day · <b>Nov 25-28</b> Thanksgiving · <b>Dec 24-26</b> Christmas · <b>Dec 31-Jan 2</b> New Year</p></div>
<div><h3>Canada long weekends</h3><p><b>Jan 1-3</b> New Year · <b>Feb 13-15</b> Family Day* · <b>Mar 26-28</b> Good Friday · <b>May 22-24</b> Victoria Day · <b>Jul 31-Aug 2</b> Civic Holiday* · <b>Sep 4-6</b> Labour Day · <b>Oct 9-11</b> Thanksgiving · <b>Dec 25-28</b> Christmas and Boxing Day</p></div>
</div>
<p class="small" style="margin-top:7pt">Marked days are US federal and Canadian federal statutory holidays. *Provincial holidays: names and dates vary, and not every province has them. Not every employer gives every holiday off; check your own.</p>""")

# 6-17 monthly pages
def monthpage(m):
    weeks = calendar.Calendar(6).monthdatescalendar(Y, m)
    while len(weeks) < 6:
        last = weeks[-1][-1]
        weeks.append([last + dt.timedelta(days=i) for i in range(1, 8)])
    rows = ""
    for wk in weeks:
        rows += "<tr>"
        for d in wk:
            if d.month != m:
                rows += '<td class="o"></td>'; continue
            hs = hols_on(d)
            lab = "".join(f'<span class="l">{SHORT[h[1]]}</span>' for h in hs)
            ex = f'<span class="x">{EXTRA[d]}</span>' if d in EXTRA else ""
            rows += f'<td class="{"h" if hs else ""}"><span class="n">{d.day}</span>{lab}{ex}</td>'
        rows += "</tr>"
    hl = [h for h in HOL if h[0].month == m]
    hlist = "".join(f'<div><b>{h[0].strftime("%b")} {h[0].day}</b> {h[1]}<i>{FLAG[h[2]]}</i></div>' for h in hl)
    exl = "".join(f'<div><b>{d.strftime("%b")} {d.day}</b> {EXTRA[d]}{" (most of the US and Canada)" if "Clocks" in EXTRA[d] else ""}</div>' for d in sorted(EXTRA) if d.month == m)
    if not hlist and not exl:
        hlist = '<div>No federal holidays this month. A good month for a quiet weekday hike.</div>'
    t = TIPS[m]
    hp = '<table class="hp"><tr><th style="width:0.55in">Date</th><th>Trail</th><th style="width:0.75in">mi / km</th><th style="width:0.4in">Done</th></tr>' + "".join('<tr><td></td><td></td><td></td><td></td></tr>' for _ in range(6)) + "</table>"
    page(f"""<div class="mhead"><div><div class="kicker" style="margin-bottom:4pt">Month {m} of 12</div><h2>{MONTHS[m-1]} {Y}</h2></div><div class="g">My goal this month</div></div>
<table class="cal"><tr>{"".join(f"<th>{x}</th>" for x in ["SUN","MON","TUE","WED","THU","FRI","SAT"])}</tr>{rows}</table>
<div class="mb"><div><div class="lab" style="margin-top:2pt">Hikes I plan</div>{hp}
<div class="lab">Notes</div>{lines(3, 26)}</div>
<div><div class="tip"><small>Season tip</small><h3>{t[0]}</h3><p>{t[1]}</p></div>
<div class="hl2">{hlist}{exl}</div>
<div class="f2" style="grid-template-columns:1fr;margin-top:6pt"><div class="fl">Total this month <span class="u"><b></b>mi / km</span></div></div></div></div>""")
for m in range(1, 13):
    monthpage(m)

# 18 hike-a-week challenge
page("""<div class="kicker">Challenge</div><h2>The Hike-a-Week Challenge</h2>
<p style="font-size:10.5pt;margin-bottom:2pt">One hike or trail walk every week of 2027. Write the trail on the line and tick the box. Short counts. Rain counts. A walk in a city park on a busy week counts too.</p>
<div class="wk">""" + "".join(f'<div><b>{i}</b><span></span><i></i></div>' for i in range(1, 53)) + """</div>
<div class="opts" style="margin-top:9pt"><span>Halfway: week 26</span><span>Hiked in every season</span><span>Brought a friend</span><span>Hiked in the rain</span><span>Saw a sunrise</span><span>All 52 done</span></div>""")

# 19 color-in: 100 miles, a triangle mountain split into 100 small triangles
def tri_poster(n=10, size=650):
    h = size * 0.866
    s = size / n; hh = h / n
    out = []; k = 0
    cells = []
    for r in range(n):  # r=0 bottom row
        y0 = h - r * hh; y1 = y0 - hh
        left = r * s / 2
        cnt = n - r
        for i in range(cnt):
            x = left + i * s
            cells.append(((x, y0), (x + s, y0), (x + s / 2, y1)))
            if i < cnt - 1:
                cells.append(((x + s / 2, y1), (x + s * 1.5, y1), (x + s, y0)))
    for idx, c in enumerate(cells, 1):
        pts = " ".join(f"{a:.1f},{b:.1f}" for a, b in c)
        cx = sum(p[0] for p in c) / 3; cy = sum(p[1] for p in c) / 3 + 3.5
        out.append(f'<polygon points="{pts}" fill="#fff" stroke="#2C3B2E" stroke-width="1.1"/><text x="{cx:.1f}" y="{cy:.1f}" text-anchor="middle" font-size="9" fill="#8B8577">{idx}</text>')
    return f'<svg width="{size+10}" height="{h+10:.0f}" viewBox="-5 -5 {size+10} {h+10:.0f}">' + "".join(out) + "</svg>", len(cells)
svg, ncells = tri_poster()
assert ncells == 100
page(f"""<div class="kicker">Color in</div><h2>100 miles in 2027</h2>
<p style="font-size:10.5pt">Color one triangle for every mile you hike, from the bottom up. Reach the top and you have walked 100 miles (161 km). Want more? Print this page again.</p>
<div class="poster">{svg}</div>
<div class="f2" style="margin-top:12pt"><div class="fl">Started on</div><div class="fl">Reached the top on</div></div>""")

# 20 color-in: 250 km, a mountain range of stacked squares
heights = [2,3,4,6,8,10,12,14,15,14,12,11,10,11,13,15,17,18,17,14,10,7,4,2,1]
assert sum(heights) == 250, sum(heights)
def range_poster():
    c = 26; W = len(heights) * c; H = max(heights) * c
    out = []; k = 0
    # number from left column bottom to top, column by column
    for i, hgt in enumerate(heights):
        for j in range(hgt):
            k += 1
            x = i * c; y = H - (j + 1) * c
            out.append(f'<rect x="{x}" y="{y}" width="{c}" height="{c}" fill="#fff" stroke="#2C3B2E" stroke-width="1"/>')
            if k % 10 == 0:
                out.append(f'<text x="{x + c/2}" y="{y + c/2 + 3}" text-anchor="middle" font-size="7.5" fill="#8B8577">{k}</text>')
    return f'<svg width="{W+6}" height="{H+6}" viewBox="-3 -3 {W+6} {H+6}">' + "".join(out) + "</svg>"
page(f"""<div class="kicker">Color in</div><h2>250 kilometers in 2027</h2>
<p style="font-size:10.5pt">Color one square for every kilometer you hike, column by column from left to right. Every tenth square is numbered. The whole range is 250 km (155 miles).</p>
<div class="poster" style="margin-top:16pt">{range_poster()}</div>
<div class="f2" style="margin-top:16pt"><div class="fl">Started on</div><div class="fl">Finished the range on</div></div>""")

# 21 color-in: 12 summits or viewpoints
def peak(i):
    return f'''<div style="background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:8pt 10pt 6pt;text-align:center">
<svg width="150" height="78" viewBox="0 0 120 62"><path d="M4 58 L42 14 L56 30 L72 8 L116 58 Z" fill="#fff" stroke="#2C3B2E" stroke-width="2" stroke-linejoin="round"/><path d="M72 8 L64 20 L72 17 L79 24 L84 20 Z" fill="#fff" stroke="#2C3B2E" stroke-width="1.5" stroke-linejoin="round"/></svg>
<div style="font:600 13pt/1 var(--serif);color:var(--clay);margin-top:2pt">{i}</div>
<div class="fl" style="height:24pt">Name</div><div class="fl" style="height:24pt">Date</div></div>'''
page("""<div class="kicker">Color in</div><h2>12 summits or viewpoints</h2>
<p style="font-size:10.5pt">One for each month, or all in one summer. A summit, a fire tower, a waterfall or a lookout all count. Color the mountain when you get there.</p>
<div class="cols3" style="gap:10pt">""" + "".join(peak(i) for i in range(1, 13)) + "</div>")

# 22 bucket list
page("""<div class="kicker">Bucket list</div><h2>20 trails I want to hike</h2>
<p style="font-size:10.5pt">Dream big and small: the trail across town, the park you keep driving past, the hike you saw in a photo. Tick them off as you go.</p>
<table class="bl"><tr><th style="width:0.3in">#</th><th>Trail and place</th><th style="width:1.15in">Best season</th><th style="width:0.9in">mi / km</th><th style="width:0.45in">Done</th></tr>""" +
"".join(f'<tr><td class="nn">{i}</td><td></td><td></td><td></td><td class="b"></td></tr>' for i in range(1, 21)) + "</table>")

# 23 big trip planner
page("""<div class="kicker">Planner</div><h2>Big trip planner</h2>
<p style="font-size:10.5pt;margin-bottom:4pt">For the trip that needs more than a weekend of planning: a national park, a long trail, a summit.</p>
<div class="dp"><div class="f2"><div class="fl">Where</div><div class="fl">Dates</div><div class="fl">Who is coming</div><div class="fl">Sleeping in</div></div></div>
<div class="lab" style="margin-top:12pt">Booking reminders</div>
<table class="gd"><tr><th>What to book</th><th style="width:1.35in">Opens on</th><th style="width:1.2in">Booked on</th><th style="width:0.45in">Done</th></tr>
<tr><td>Entrance pass or timed entry</td><td></td><td></td><td></td></tr>
<tr><td>Campground, cabin or hotel</td><td></td><td></td><td></td></tr>
<tr><td>Trail or wilderness permit</td><td></td><td></td><td></td></tr>
<tr><td>Flights, car or shuttle</td><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td><td></td></tr></table>
<div class="lab">Training plan</div>
<div class="f2"><div class="fl">Start training by</div><div class="fl">Longest training hike</div><div class="fl">Practice with the full pack by</div><div class="fl">Gear tested by</div></div>
<div class="lab">Budget</div>
<div class="f2"><div class="fl">Travel</div><div class="fl">Sleeping</div><div class="fl">Permits and passes</div><div class="fl">Food and gear</div></div>
<div class="lab">Notes</div>""" + lines(5, 26) + """
<div class="opts" style="margin-top:8pt"><span>Weather checked</span><span>Offline maps</span><span>Trip plan left at home</span><span>Car serviced</span></div>""")

# 24 gear wish list + season check
page("""<div class="kicker">Gear</div><h2>Gear wish list and season check</h2>
<table class="gd"><tr><th>Gear I want</th><th style="width:1.4in">Why I need it</th><th style="width:0.8in">Price</th><th style="width:0.62in">Got it</th></tr>""" +
"".join('<tr><td></td><td></td><td></td><td></td></tr>' for _ in range(9)) + """</table>
<div class="lab" style="margin-top:10pt">Before each season</div>
<div class="cl">
<div><h3>Spring and summer</h3>""" + chk(["Sunscreen, sunglasses and a sun hat", "Tick repellent", "Enough water bottles for hot days", "Rain jacket still waterproof", "First aid kit restocked", "Bug net or long sleeves for buggy trails"]) + """</div>
<div><h3>Fall and winter</h3>""" + chk(["Headlamp works, spare batteries", "Warm hat, gloves and a puffy layer", "Traction devices for icy trails", "Bright orange layer for hunting seasons", "Insulated bottle for a warm drink", "Spare dry socks and a warm layer in the car"]) + """</div></div>
<div class="opts" style="margin-top:8pt"><span>Boots checked for wear</span><span>Pack straps and zips OK</span><span>Water filter cleaned</span><span>Phone power bank charged</span></div>""")

# 25 quarterly look-back
def qb(q, months):
    return f'''<div class="qb"><div class="ph"><b>Quarter {q}</b><span>{months}</span></div>
<div class="f2"><div class="fl">Hikes</div><div class="fl">Distance <span class="u"><b></b>mi / km</span></div><div class="fl">Best hike</div><div class="fl">On track for my goal?</div></div>
<div class="fl" style="height:27pt">Next three months I want to</div><div class="wl" style="height:24pt"></div></div>'''
page('<div class="kicker">Look back</div><h2>Every three months</h2>' + qb(1, "January to March") + qb(2, "April to June") + qb(3, "July to September") + qb(4, "October to December"))

# 26 year in review
page("""<div class="kicker">Year in review</div><h2>My 2027 on the trail</h2>
<div class="sum"><div><small>Hikes</small></div><div><small>Total distance (mi / km)</small></div><div><small>Weeks of the challenge</small></div><div><small>Summits and viewpoints</small></div></div>
<div class="f2"><div class="fl">Best hike</div><div class="fl">Hardest hike</div><div class="fl">Favorite photo spot</div><div class="fl">Best trail snack</div><div class="fl">Most hikes with</div><div class="fl">Wildlife I saw</div></div>
<div class="lab" style="margin-top:12pt">The moment I will remember</div>""" + lines(4, 30) + """
<div class="lab">What I learned</div>""" + lines(3, 30) + """
<div class="lab">Goals for 2028</div>""" + lines(3, 30) + """
<div class="sketch" style="height:1.3in;margin-top:10pt"><span>Stick a photo or a ticket here</span></div>""")

# 27 dates to look up
page("""<div class="kicker">Before you plan</div><h2>Dates to look up for 2027</h2>
<p class="lead">Some of the most useful dates for hikers are announced by the parks themselves, often only weeks or months ahead. We did not guess them here. Look them up and write them in.</p>
<div class="src" style="margin-top:6pt">
<div><h3>Fee-free days</h3><div class="url">nps.gov</div><p>The US National Park Service announces its fee-free entrance days each year. Check who they apply to and which parks charge fees at all.</p></div>
<div><h3>Parks Canada</h3><div class="url">parks.canada.ca</div><p>Reservation launch dates for campgrounds and backcountry are set park by park. Popular sites can fill on the first morning.</p></div>
<div><h3>Reservations and timed entry</h3><div class="url">recreation.gov</div><p>Some busy parks need a timed entry or vehicle reservation in season, and many campgrounds open months ahead. Rules change from year to year.</p></div>
<div><h3>Permits and lotteries</h3><div class="url">Your park or forest website</div><p>Famous day hikes and backcountry trips can need a permit or a lottery entry, with deadlines months before the hike.</p></div>
</div>
<table class="gd" style="margin-top:12pt"><tr><th style="width:1.2in">Date</th><th>What</th><th style="width:1.8in">Where to book or check</th><th style="width:0.45in">Done</th></tr>""" +
"".join('<tr><td></td><td></td><td></td><td></td></tr>' for _ in range(9)) + """</table>
<p class="small">State and provincial parks have their own fees, passes and booking dates. Always check the official website before you go.</p>""")

# 28 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 95 L40 60 L60 75 L100 18 L120 40 L140 28 L200 90" stroke="#F5F1EA" stroke-width="4"/><path d="M100 18 L90 34 L100 30 L108 38 L114 33" stroke="#F5F1EA" stroke-width="3"/></svg>
<h2 style="margin-top:22pt">Here's to a great year outside</h2>
<p>Thank you for choosing a HikeSupply planner. Start small, go often, and write it all down. The hikes you plan this year become the stories you tell next year.</p>
<p style="margin-top:10pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">Keep going</p>
<div class="bkcards" style="grid-template-columns:1fr 1fr 1fr;width:6.4in"><div><b>Hiking Journal &amp; Trail Log</b><span>A page for every hike you do</span></div><div><b>US National Parks Hiking Tracker</b><span>All 63 parks plus Canada</span></div><div><b>Trail Ready</b><span>8-week beginner hiking training plan</span></div></div>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">General planning information only. Holidays shown are US federal and Canadian federal statutory holidays plus some provincial holidays; your employer, state or province may differ. Seasonal tips are general: check official park, forest and weather sources before every hike, hike within your ability and turn back when in doubt. For personal use only. COVERCREDIT</p>""", "back")

COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip()
css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
html = html.replace("COVERCREDIT", COVERCREDIT)
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
