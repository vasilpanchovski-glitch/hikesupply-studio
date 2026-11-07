"""Generates index.html for p17 (Pocket Trail Log, print-and-fold mini journal). Run: python3 gen.py
Each 'sheet' page is one US Letter sheet laid out as a classic 8-page one-cut zine
(landscape 11 x 8.5 in, rotated onto the portrait page). Panels are 2.75 x 4.25 in.
Imposition (landscape, printed side up): top row upside down 5 4 3 2, bottom row 6 7 8 1.
Cut: the middle horizontal line across the two centre columns."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Pocket Trail Log"
pages = []


def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls in ("",) else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')


# ---------- zine building blocks ----------
def f(label, unit=""):
    u = f'<span class="u">{unit}</span>' if unit else ""
    return f'<div class="zf">{label}{u}</div>'


def f2(a, b):
    return f'<div class="z2">{a}{b}</div>'


def ln(n, h=15):
    return "".join(f'<div class="zl" style="height:{h}pt"></div>' for _ in range(n))


def opts(items):
    return '<div class="zo">' + "".join(f"<span>{i}</span>" for i in items) + "</div>"


def head(k, t):
    return f'<div class="zk">{k}</div>' + (f'<div class="zt">{t}</div>' if t else '<div class="zrule"></div>')


WEATHER = opts(["Sun", "Cloud", "Rain", "Snow", "Wind"])

ART = {
    "ridge": '<path d="M0 70 L30 44 L44 54 L76 16 L92 34 L106 26 L140 62" /><path d="M76 16 L76 4 L88 7 L76 10"/>',
    "seasons": '<circle cx="104" cy="20" r="9"/><path d="M0 70 L36 36 L52 48 L78 22 L140 70"/><path d="M78 22 L70 30 L78 34 L86 28 Z" />',
    "lake": '<path d="M0 52 L34 22 L50 34 L74 12 L104 40 L140 30"/><path d="M8 62 H132 M24 70 H116"/>',
    "summit": '<path d="M0 72 L50 28 L70 6 L90 28 L140 72"/><path d="M70 6 L70 -8 L84 -4 L70 0"/><path d="M58 40 L70 30 L82 40"/>',
    "blank": '<path d="M0 66 C30 56 44 40 70 40 C96 40 110 56 140 66"/><circle cx="70" cy="22" r="8"/>',
    "gift": '<path d="M0 70 L36 34 L54 50 L80 20 L140 70"/><path d="M104 8 L106 14 L112 14 L107 18 L109 24 L104 20 L99 24 L101 18 L96 14 L102 14 Z"/>',
    "trees": '<path d="M20 70 L20 58 M8 58 L20 28 L32 58 Z M60 70 L60 54 M44 54 L60 14 L76 54 Z M104 70 L104 60 M92 60 L104 32 L116 60 Z"/><path d="M0 70 H140"/>',
}


def svg(name, w=1.7):
    return (f'<svg class="za" width="{w}in" height="{w*0.6}in" viewBox="-4 -12 148 88" fill="none" '
            f'stroke-linejoin="round" stroke-linecap="round" stroke-width="2.4">{ART[name]}</svg>')


def cover(title, sub, art, foot):
    return (f'<div class="zcb"><div class="zbr">HikeSupply Co.</div><div class="zart">{svg(art)}</div>'
            f'<div class="zct">{title}</div><div class="zcs">{sub}</div><div class="zcf">{foot}</div></div>')


def num(n):
    return f'<div class="pn">{n}</div>'


def hike(k, prompt, nlines=9, extra=""):
    return (head(k, "") .replace('<div class="zt"></div>', '') +
            f(f"Date") + f("Trail / place") + f2(f("Distance", "mi · km"), f("Climb", "ft · m")) +
            f("With") + WEATHER + f'<div class="zq">{prompt}</div>' + ln(nlines) + extra)


def tally(rows, boxes=8):
    out = '<div class="zty">'
    for r in rows:
        out += f'<div><span>{r}</span>' + "".join("<i></i>" for _ in range(boxes)) + "</div>"
    return out + "</div>"


def back(inner):
    return inner + '<div class="zbk">Pocket Trail Log · hikesupplyco.com</div>'


# landscape positions: page number -> (left in, top in, upside down)
POS = {5: (0, 0, 1), 4: (2.75, 0, 1), 3: (5.5, 0, 1), 2: (8.25, 0, 1),
       6: (0, 4.25, 0), 7: (2.75, 4.25, 0), 8: (5.5, 4.25, 0), 1: (8.25, 4.25, 0)}


def sheet(panels, label):
    """panels: dict page-number -> html. Page 1 is the front cover (a .zcb box), 8 the back."""
    out = '<div class="sheet">'
    for x in (2.75, 5.5, 8.25):
        out += f'<div class="gv" style="left:{x}in"></div>'
    out += '<div class="gh" style="left:0.15in;width:2.6in"></div><div class="gh" style="left:8.25in;width:2.6in"></div>'
    out += '<div class="cut"></div><div class="cutl" style="left:3.45in">Cut this line only</div><div class="cutl" style="left:6.2in">Cut this line only</div>'
    for n, html in panels.items():
        x, y, up = POS[n]
        cls = "zp up" if up else "zp"
        if n == 1:
            cls += " cov"
        pn = "" if n in (1,) else num(n)
        out += f'<div class="{cls}" style="left:{x}in;top:{y}in">{html}{pn}</div>'
    out += f'<div class="slab">{label}</div></div>'
    page(out, "sheetpg")


# ---------- 1 cover ----------
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="300" viewBox="0 0 470 300" fill="none" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 230 L80 160 L120 190 L210 70 L250 110 L290 90 L360 160 L400 140 L470 210" stroke="#F5F1EA" stroke-width="3.5"/>
<rect x="160" y="150" width="110" height="140" rx="4" stroke="#F5F1EA" stroke-width="3"/><path d="M180 180 H250 M180 200 H250 M180 220 H235" stroke="#F5F1EA" stroke-width="2.5"/>
</svg></div>
<div><div class="yrbig">Print-and-fold mini hiking journal</div><h1>Pocket Trail Log</h1><p class="sub">One sheet of paper, three folds and one cut make an 8-page booklet that fits a shirt pocket. Six editions to print as often as you like, with a short prompt for every hike. Miles or kilometers, feet or meters.</p>
<div class="meta" style="margin-top:22pt"><span>12 pages</span><span>6 booklets to print</span><span>Letter and A4</span></div></div>""", "cover photo")

# ---------- 2 guide ----------
D = 'fill="none" stroke="#2C3B2E" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"'
DASH = 'stroke="#8A9A7E" stroke-width="1.2" stroke-dasharray="4 3" fill="none"'
CUT = 'stroke="#B85C38" stroke-width="2.4" fill="none"'
S1 = f'''<svg viewBox="0 0 176 100" width="1.95in" height="1.1in"><rect x="10" y="8" width="156" height="84" rx="2" {D}/>
<g fill="#EEE8DC"><rect x="16" y="13" width="31" height="33"/><rect x="55" y="13" width="31" height="33"/><rect x="94" y="13" width="31" height="33"/><rect x="133" y="13" width="28" height="33"/></g>
<g font-family="Inter" font-size="9" font-weight="700" fill="#2C3B2E" text-anchor="middle"><text x="31" y="33" transform="rotate(180 31 30)">5</text><text x="70" y="33" transform="rotate(180 70 30)">4</text><text x="109" y="33" transform="rotate(180 109 30)">3</text><text x="147" y="33" transform="rotate(180 147 30)">2</text>
<text x="31" y="76">6</text><text x="70" y="76">7</text><text x="109" y="76">8</text><text x="147" y="76">1</text></g></svg>'''
S2 = f'''<svg viewBox="0 0 176 100" width="1.95in" height="1.1in"><rect x="10" y="8" width="156" height="84" rx="2" {D}/>
<path d="M49 8 V92 M88 8 V92 M127 8 V92 M10 50 H166" {DASH}/></svg>'''
S3 = f'''<svg viewBox="0 0 176 100" width="1.95in" height="1.1in"><rect x="49" y="8" width="78" height="84" rx="2" {D}/>
<path d="M49 8 V92" stroke="#2C3B2E" stroke-width="3.2"/><path d="M88 8 V92" {DASH}/><path d="M49 50 H88" {CUT}/>
<path d="M88 50 H127" {DASH}/><text x="49" y="6" font-family="Inter" font-size="7" font-weight="700" fill="#2C3B2E" text-anchor="middle">FOLDED EDGE</text><text x="68" y="44" font-family="Inter" font-size="7.5" font-weight="700" fill="#B85C38" text-anchor="middle">CUT</text></svg>'''
S4 = f'''<svg viewBox="0 0 176 100" width="1.95in" height="1.1in"><rect x="10" y="50" width="156" height="42" rx="2" {D}/>
<path d="M49 50 V92 M88 50 V92 M127 50 V92" {DASH}/><path d="M49 51 H127" {CUT}/>
<path d="M30 40 C30 22 60 14 88 14" {D}/><path d="M80 9 L89 14 L80 19" {D}/><path d="M146 40 C146 22 116 14 88 14" {D}/></svg>'''
S5 = f'''<svg viewBox="0 0 176 100" width="1.95in" height="1.1in"><path d="M88 14 V86 M52 50 H124" stroke="#2C3B2E" stroke-width="3"/>
<path d="M88 50 L70 32 M88 50 L106 32 M88 50 L70 68 M88 50 L106 68" {DASH}/>
<path d="M10 50 H36 M30 44 L37 50 L30 56 M166 50 H140 M146 44 L139 50 L146 56" {D}/></svg>'''
S6 = f'''<svg viewBox="0 0 176 100" width="1.95in" height="1.1in"><rect x="62" y="10" width="52" height="82" rx="3" fill="#2C3B2E"/>
<path d="M70 46 L80 36 L86 42 L96 30 L106 46" stroke="#F5F1EA" stroke-width="2" fill="none" stroke-linejoin="round"/>
<text x="88" y="64" font-family="Fraunces" font-size="9" font-weight="600" fill="#F5F1EA" text-anchor="middle">Trail Log</text><path d="M62 10 V92" stroke="#8A9A7E" stroke-width="3"/></svg>'''
steps = [
    (S1, "Print and turn", "Print one sheet at actual size. Lay it printed side up with the long side across, so the upside-down pages are on top."),
    (S2, "Crease eight boxes", "Fold in half top to bottom, crease, open. Fold in half side to side, then each end to the middle. Open it flat."),
    (S3, "One cut", "Fold in half side to side again. From the folded edge, cut along the solid line to the center crease. Open."),
    (S4, "Long fold", "Fold in half top to bottom along the long crease, with the printing on the outside."),
    (S5, "Push into a plus", "Hold both ends and push them toward each other. The cut opens into a diamond, then a plus shape."),
    (S6, "Fold it shut", "Fold the pages around so the cover is on top. Crease the spine. Done, no glue."),
]
sg = "".join(f'<div><div class="sd">{s}</div><div class="sn">{i+1}</div><h3>{h}</h3><p>{p}</p></div>' for i, (s, h, p) in enumerate(steps))
page(f"""<div class="kicker">Start here</div><h2>One sheet, one cut, one booklet</h2>
<p class="lead">Each printable sheet folds into its own 8-page booklet, 2.75 x 4.25 in (7 x 11 cm). Print the edition you want, as many times as you like.</p>
<div class="inside">
<div><b>Page 3</b>Day Hikes<span>5 hikes, one prompt each</span></div>
<div><b>Page 4</b>Four Seasons<span>one hike for each season</span></div>
<div><b>Page 5</b>Trip<span>one park or one weekend</span></div>
<div><b>Page 6</b>Peak and Summit<span>5 summits with turnaround times</span></div>
<div><b>Page 7</b>Blank<span>lines and sketch boxes</span></div>
<div><b>Page 8</b>Gift<span>a note, a promise, 5 hikes</span></div>
</div>
<div class="steps">{sg}</div>
<div class="box" style="margin-top:8pt"><h3 style="margin-top:0">Print tips</h3><p style="margin:0">Print one page at a time (for example "page 3"), single-sided, at actual size or 100%. Plain copy paper folds best. Kraft or colored paper looks great for gifts, card stock is too thick. On A4 paper, use the A4 file and fold on the printed dotted lines. Write in pencil or a fine pen.</p></div>""")

# ---------- 3 sheet A: day hikes ----------
A = {
    1: cover("Trail Log", "Day Hikes", "ridge", '<div class="zcl">No.</div><div class="zcl">Year</div>'),
    2: head("Before you start", "This log belongs to") + f("Name") + f("If found, please return to") + ln(1, 18) +
       f2(f("Started"), f("Finished")) + f("Emergency contact") + f("Phone") +
       '<div class="zn">Circle mi or km, ft or m on each page. Before every hike, tell someone where you are going and when you will be back.</div>',
    3: hike("Hike 1", "Best view today"),
    4: hike("Hike 2", "What I heard"),
    5: hike("Hike 3", "Trail snack verdict"),
    6: hike("Hike 4", "Who I'd bring next time"),
    7: hike("Hike 5", "One word for today", 2) + '<div class="zbox" style="height:1.0in"><span>Sketch it</span></div>',
    8: back(head("My hiking year", "") + tally(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]) +
            f2(f("Hikes"), f("Total", "mi · km"))),
}
sheet(A, "Sheet A · Day Hikes · page 3")

# ---------- 4 sheet B: four seasons ----------
def season(k, prompt):
    return hike(k, prompt)


B = {
    1: cover("Trail Log", "Four Seasons", "seasons", '<div class="zcl">Year</div>'),
    2: head("A year outside", "My four seasons") + f("Name") + f("Year") +
       '<div class="zq">One trail I want to hike in every season</div>' + ln(3) +
       '<div class="zq">What I hope to see this year</div>' + ln(6),
    3: season("Spring", "First wildflower I spotted"),
    4: season("Summer", "My earliest start, and was it worth it?"),
    5: season("Fall", "Best fall color, and where"),
    6: season("Winter", "First frost or first snow day"),
    7: head("Best of the year", "My favorites") + f("Spring") + f("Summer") + f("Fall") + f("Winter") +
       '<div class="zq">My favorite season to hike, and why</div>' + ln(7),
    8: back(head("Hikes per season", "") + tally(["Spring", "Summer", "Fall", "Winter"], 7) + f2(f("Hikes"), f("Total", "mi · km")) +
            '<div class="zq">Next year I want to</div>' + ln(4)),
}
sheet(B, "Sheet B · Four Seasons · page 4")

# ---------- 5 sheet C: trip ----------
def day(k):
    return (head(k, "") .replace('<div class="zt"></div>', '') + f("Date") + f("Trail / place") +
            f2(f("Distance", "mi · km"), f("Climb", "ft · m")) + WEATHER + '<div class="zq">Highlight of the day</div>' + ln(9))


PACK = ["Map and navigation", "Headlamp", "Sun protection", "First aid kit", "Knife or multitool", "Fire starter",
        "Emergency shelter", "Extra food", "Extra water", "Extra layers", "Park pass or permit", "Phone, charged"]
C = {
    1: cover("Trip Log", "One park, one weekend", "lake", '<div class="zcl">Where</div><div class="zcl">When</div>'),
    2: head("Before we go", "The plan") + f("Where") + f("Dates") + f("Crew") + f("Staying at") +
       opts(["Weather checked", "Park alerts checked", "Plan left with someone"]) + f("Who has our plan") +
       '<div class="zq">What we most want to see</div>' + ln(4),
    3: head("Pack it", "") + '<ul class="zck">' + "".join(f"<li>{p}</li>" for p in PACK) + "</ul>",
    4: day("Day 1"),
    5: day("Day 2"),
    6: day("Day 3"),
    7: head("Remember this", "") + '<div class="zbox" style="height:1.35in"><span>Sketch or stick a ticket here</span></div>' + ln(8),
    8: back(head("After the trip", "") + f("The trip in one word") + '<div class="zr">Rating <i></i><i></i><i></i><i></i><i></i></div>' +
            '<div class="zq">Next time I would</div>' + ln(4) + '<div class="zq">Best meal of the trip</div>' + ln(2)),
}
sheet(C, "Sheet C · Trip · page 5")

# ---------- 6 sheet D: peak and summit ----------
def summit(k, prompt):
    return (head(k, "") .replace('<div class="zt"></div>', '') + f("Summit") + f("Date") + f2(f("Elevation", "ft · m"), f("With")) +
            f2(f("Start"), f("Turnaround")) + f2(f("Top"), f("Back at car")) +
            opts(["Summit", "Turned back, good call"]) + '<div class="zr">View <i></i><i></i><i></i><i></i><i></i></div>' +
            f'<div class="zq">{prompt}</div>' + ln(6))


Dd = {
    1: cover("Summit Log", "Peaks and high points", "summit", '<div class="zcl">Name</div>'),
    2: head("My summit rule", "Back down is the goal") +
       '<div class="zn" style="font-size:7.6pt;line-height:1.45">Before each climb I write down a turnaround time and I keep it, summit or not. I check the mountain forecast the evening before and the morning of. The top is optional. Getting back down is not.</div>' +
       f("Signed") + f("My next big peak") + f2(f("Elevation", "ft · m"), f("Target date")) +
       '<div class="zq">Peaks on my list</div>' + ln(5),
    3: summit("Summit 1", "From the top I could see"),
    4: summit("Summit 2", "Hardest part of the climb"),
    5: summit("Summit 3", "What I ate on top"),
    6: summit("Summit 4", "How the weather changed"),
    7: summit("Summit 5", "What I'll tell people"),
    8: back(head("Summit tally", "") + '<div class="zcirc">' + "<i></i>" * 15 + '</div>' + f("Highest point", "ft · m") + f("Favorite summit") + '<div class="zq">Summit notes</div>' + ln(4)),
}
sheet(Dd, "Sheet D · Peak and Summit · page 6")

# ---------- 7 sheet E: blank ----------
E = {
    1: cover("Trail Log", "", "trees", '<div class="zcl">Title</div><div class="zcl">Name</div>'),
    2: ln(16),
    3: '<div class="zbox" style="height:1.45in"></div>' + ln(9),
    4: ln(16),
    5: '<div class="zbox" style="height:1.45in"></div>' + ln(9),
    6: ln(16),
    7: '<div class="zbox" style="height:2.95in"></div>',
    8: back(f("Name") + f("Dates") + ln(11)),
}
sheet(E, "Sheet E · Blank · page 7")

# ---------- 8 sheet F: gift ----------
F = {
    1: cover("For your next trail", "A tiny trail log", "gift", '<div class="zcl">For</div>'),
    2: head("A note for you", "") + f2(f("To"), f("From")) + ln(7) +
       '<div class="zq">A promise for the trail</div>' + opts(["A ride to the trailhead", "Trail snacks on me", "A hike together"]) + f("Or my own idea"),
    3: hike("Hike 1", "The moment I'll remember"),
    4: hike("Hike 2", "Best thing I saw"),
    5: hike("Hike 3", "What we talked about"),
    6: hike("Hike 4", "What I ate at the top"),
    7: hike("Hike 5", "Where to next?"),
    8: back(head("Five hikes", "") + '<div class="zcirc">' + "<i></i>" * 5 + '</div>' +
            '<div class="zq">Thank you for this gift. Our next hike together</div>' + ln(7)),
}
sheet(F, "Sheet F · Gift · page 8")

# ---------- 9 gift wrap ----------
ENV = '''<svg class="env" viewBox="0 0 450 775" width="4.5in" height="7.75in">
<path d="M75 125 L115 25 Q225 2 335 25 L375 125 L440 150 L440 550 L375 575 L340 770 L110 770 L75 575 L10 550 L10 150 Z" fill="#fff" stroke="#3A3A38" stroke-width="1.6"/>
<path d="M75 125 H375 V575 H75 Z" fill="none" stroke="#8A9A7E" stroke-width="1.4" stroke-dasharray="6 5"/>
<g fill="#2C3B2E" font-family="Inter" font-weight="700" font-size="11" letter-spacing="1.6" text-anchor="middle">
<text x="225" y="345">BOOKLET GOES HERE</text>
<text x="225" y="365" font-weight="500" letter-spacing="0.5" fill="#8B8577">fits a 2.75 x 4.25 in booklet</text>
<text x="225" y="680" fill="#8B8577">GLUE OR TAPE</text>
<text x="225" y="90" fill="#8B8577">TUCK IN</text>
<text x="44" y="350" fill="#8B8577" transform="rotate(-90 44 350)">FOLD IN</text>
<text x="408" y="350" fill="#8B8577" transform="rotate(90 408 350)">FOLD IN</text></g>
<path d="M150 470 L185 435 L203 452 L232 418 L262 452 L300 470" fill="none" stroke="#2C3B2E" stroke-width="2.4" stroke-linejoin="round"/>
</svg>'''
TAGS = [("Gift tag", "For your next trail"), ("Gift tag", "Happy trails"), ("Gift tag", "See you out there")]
tg = "".join(f'<div class="gt"><small>{a}</small><b>{b}</b><div class="fl">To</div><div class="fl">From</div></div>' for a, b in TAGS)
page(f"""<div class="kicker">Wrap it</div><h2>A mini envelope and three gift tags</h2>
<p class="lead" style="font-size:11.5pt">Cut along the solid lines. Fold the side flaps in, fold the bottom flap up and glue or tape it. Slip the booklet in and tuck the top flap.</p>
<div class="wrap">{ENV}<div class="gts">{tg}</div></div>""")

# ---------- 10 prompt bank ----------
PROMPTS = [
    "The first thing I noticed at the trailhead", "A sound I want to remember", "The best snack of the day, and why",
    "Who I'd bring next time", "One word for today", "The steepest part, in three words", "Something small I almost missed",
    "The weather, as a feeling", "A smell from the trail", "What I saw where I turned around", "Where I stopped to rest",
    "A bird, bug or animal I spotted", "What the light looked like", "Something I learned about the trail",
    "Something I learned about myself", "What I'd tell a friend about this hike", "What I'd pack differently",
    "The color I saw most", "A tree, rock or flower worth a sketch", "The moment I felt most awake",
    "Something that made me laugh", "How my legs felt at the end", "The view I'd put on a postcard",
    "Something I left just as I found it", "What the path felt like underfoot", "What I thought about on the way up",
    "A question to look up at home", "Tracks or signs of animals I noticed", "The quietest moment",
    "What changed since I last hiked here", "Someone I met on the trail", "My trail rating, and why",
    "A hike I want to try next", "What surprised me today", "The best part of the ride home",
    "Water I saw: creek, lake, puddle or falls", "How the sky looked when I finished", "Something I'm proud of today",
    "The part I'd do again tomorrow", "A thank-you to someone who made today possible",
]
half = len(PROMPTS) // 2
col = lambda xs, s: "".join(f'<li><b>{s+i+1}</b>{p}</li>' for i, p in enumerate(xs))
page(f"""<div class="kicker">Prompt bank</div><h2>40 prompts to write in</h2>
<p class="lead">Use them in the Blank edition, swap one for a prompt you have already answered, or pick one at random before you leave the car.</p>
<div class="pb"><ol>{col(PROMPTS[:half], 0)}</ol><ol>{col(PROMPTS[half:], half)}</ol></div>""")

# ---------- 11 color-in covers ----------
CA = {
    "ridge": '<path d="M0 150 L45 105 L70 122 L120 52 L150 86 L175 70 L240 140"/><path d="M120 52 L120 28 L140 34 L120 40"/><path d="M0 175 C60 160 90 150 120 150 C160 150 190 165 240 172"/><circle cx="190" cy="32" r="14"/>',
    "forest": '<path d="M30 175 V160 M10 160 L30 100 L50 160 Z M90 175 V155 M64 155 L90 70 L116 155 Z M155 175 V160 M136 160 L155 105 L174 160 Z M210 175 V162 M194 162 L210 118 L226 162 Z"/><path d="M0 175 H240"/><circle cx="196" cy="40" r="14"/>',
    "lake": '<path d="M0 110 L50 62 L72 80 L110 40 L150 82 L176 66 L240 110"/><path d="M0 110 H240"/><path d="M30 130 H210 M60 146 H180 M90 162 H150"/><path d="M28 30 C40 22 52 22 64 30 M150 24 C160 18 170 18 180 24"/>',
}


def ccov(name, label):
    art = CA.get(name, "")
    t = ('<text x="120" y="250" text-anchor="middle" font-family="Fraunces" font-weight="700" font-size="40" fill="none" stroke="#2C3B2E" stroke-width="1.3">Trail Log</text>'
         if art else "")
    body = (f'<svg viewBox="0 0 240 300" width="2.1in" height="2.62in" fill="none" stroke="#2C3B2E" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">{art}{t}</svg>'
            if art else '<div class="own">Draw your own cover</div>')
    return f'<div class="cc"><div class="ccl">{label}</div>{body}<div class="ccn">Name</div></div>'


page(f"""<div class="kicker">Color-in covers</div><h2 style="font-size:18pt;margin-bottom:4pt">Make the cover your own</h2>
<p style="font-size:10pt;margin:0 0 8pt">Color one in, cut on the dashed line and glue or tape it over the front of any booklet. Each one is the exact booklet size.</p>
<div class="ccg">{ccov("ridge", "Ridge")}{ccov("forest", "Forest")}{ccov("lake", "Lake")}{ccov("", "Your own")}</div>""", "ccpg")

# ---------- 12 back ----------
COVERCREDIT = open(os.path.join(HERE, "cover-credit.txt")).read().strip()
page(f"""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:24pt">HikeSupply Co.</div>
<svg width="200" height="110" viewBox="0 0 200 110" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M0 95 L40 60 L60 75 L100 18 L120 40 L140 28 L200 90" stroke="#F5F1EA" stroke-width="4"/></svg>
<h2 style="margin-top:22pt">Fill one, print another</h2>
<p>Thank you for choosing a HikeSupply printable. Keep a booklet in your pocket, fill it one hike at a time, and print a new one whenever you like.</p>
<p>Want a full page for every hike? Look for the Hiking Journal &amp; Trail Log at hikesupplyco.com.</p>
<p style="margin-top:14pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt;max-width:5.4in">For personal use: print as many copies as you like for yourself and to give as gifts. Please do not resell or share the file. Always tell someone your plan, check conditions with the land manager and hike within your ability. {COVERCREDIT}</p>""", "back")

MORE = open(os.path.join(HERE, "zine.css")).read()
css = open(os.path.join(HERE, "base.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
