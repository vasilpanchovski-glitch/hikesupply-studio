"""Generates index.html for p04 (US National Parks Hiking Tracker, all 63 parks + Canada). Run: python3 gen.py
Park facts checked against nps.gov and parks.canada.ca in October 2026."""
import os
T = "National Parks Hiking Tracker"
CHECKED = "October 2026"
pages = []
def page(body, n, cls=""):
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if n else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')

def km(mi): return f"{mi * 1.609344:.1f}"
def m(ft): return f"{round(ft * 0.3048)}"

# name, state, best season, trail, miles (number or text), kind (RT/loop/about RT), gain ft (number, "flat" or None), level, entry note, non-resident fee park
P = [
 ("Acadia", "ME", "May to Oct", "Jordan Pond Path", 3.3, "loop", None, "Easy to moderate, rocky west side", "Vehicle reservation for Cadillac Summit Road, late May to Oct.", 1),
 ("American Samoa", "AS", "Year-round, go early", "Lower Sauma Ridge Trail", 0.4, "RT", None, "Easy, but steep and rugged", "Fly to Pago Pago. Respect village land and customs.", 0),
 ("Arches", "UT", "Mar to May, Sep to Oct", "The Windows and Turret Arch", 1.0, "RT", 99, "Easy", "No timed entry in 2026.", 0),
 ("Badlands", "SD", "May to Sep", "Door Trail", 0.75, "RT", None, "Easy", "Boardwalk first, then watch for drop-offs.", 0),
 ("Big Bend", "TX", "Nov to Apr", "Santa Elena Canyon Trail", 1.6, "RT", 80, "Easy", "Creek crossing can be impassable after rain.", 0),
 ("Biscayne", "FL", "Dec to Apr", "Convoy Point Jetty Walk", 0.8, "RT", "flat", "Easy", "Most of the park is water, reached by boat.", 0),
 ("Black Canyon of the Gunnison", "CO", "May to Oct", "Cedar Point Nature Trail", "0.2 mi / 0.3 km (NPS figure)", "", None, "Easy", "Two rim overlooks. Stay behind the rails.", 0),
 ("Bryce Canyon", "UT", "May to Oct", "Queen's Garden Trail", 1.8, "RT", 450, "Moderate: down first, climb back", "Starts near 8,000 ft.", 1),
 ("Canyonlands", "UT", "Mar to May, Sep to Oct", "Mesa Arch Trail", 0.6, "loop", 56, "Easy", "No reservation needed.", 0),
 ("Capitol Reef", "UT", "Mar to May, Sep to Oct", "Hickman Bridge Trail", 1.8, "RT", 400, "Moderate", "No reservation needed.", 0),
 ("Carlsbad Caverns", "NM", "Year-round", "Big Room Trail (inside the cave)", 1.25, "loop", None, "Easy", "Timed-entry reservation needed for the cavern.", 0),
 ("Channel Islands", "CA", "Mar to May, Sep to Nov", "Cavern Point Loop, Santa Cruz Island", 2.0, "loop", None, "Moderate", "Boat only. Book the ferry ahead.", 0),
 ("Congaree", "SC", "Oct to Apr", "Boardwalk Loop Trail", 2.6, "loop", "flat", "Easy", "No entrance fee. Low spots can flood.", 0),
 ("Crater Lake", "OR", "Jul to Sep", "Sun Notch Trail", 0.8, "loop", 150, "Easy", "Trails often under snow Dec to Jun.", 0),
 ("Cuyahoga Valley", "OH", "Apr to Oct", "Brandywine Gorge Loop", 1.5, "loop", 160, "Easy", "No entrance fee. Parking is limited.", 0),
 ("Death Valley", "CA / NV", "Nov to Mar", "Badwater Basin salt flat", 1.0, "RT", "flat", "Easy", "In summer, NPS advises no hiking after 10 am.", 0),
 ("Denali", "AK", "Late May to early Sep", "Savage River Loop", 2.0, "loop", "flat", "Easy", "Cars only to Mile 15 in summer, buses beyond.", 0),
 ("Dry Tortugas", "FL", "Nov to May", "Fort Jefferson moat wall walk", "Short and flat (NPS gives no distance)", "", None, "Easy", "Ferry or seaplane only.", 0),
 ("Everglades", "FL", "Dec to Apr", "Anhinga Trail", 0.8, "RT", "flat", "Easy", "Wheelchair accessible. Great for wildlife in winter.", 1),
 ("Gates of the Arctic", "AK", "Jun to Aug", "No trails or roads", "Fly-in wilderness", "", None, "Expert or guided only", "Air taxi from Fairbanks via Bettles or Anaktuvuk Pass.", 0),
 ("Gateway Arch", "MO", "Apr to Oct", "Arch grounds paved paths", "5+ mi of paths; NPS walking tour 30 to 45 min", "", "flat", "Easy", "The tram to the top is ticketed.", 0),
 ("Glacier", "MT", "Jul to Sep", "Trail of the Cedars", 0.9, "loop", 83, "Easy", "No vehicle reservations in 2026.", 1),
 ("Glacier Bay", "AK", "Jun to Aug", "Forest Trail, Bartlett Cove", 1.0, "loop", None, "Easy", "No roads in. Fly or ferry to Gustavus.", 0),
 ("Grand Canyon", "AZ", "Apr to May, Sep to Oct", "Rim Trail, Mather Point to Yavapai Point", 1.4, "RT", None, "Easy, paved", "No timed entry.", 1),
 ("Grand Teton", "WY", "Jun to Sep", "Taggart Lake Trail", 3.0, "RT", 360, "Easy to moderate", "Part of the trail is closed for rebuilding in 2026.", 1),
 ("Great Basin", "NV", "Jul to Sep", "Bristlecone Trail", 2.8, "RT", 600, "Moderate, starts near 9,900 ft", "Upper scenic drive is snow-closed much of the year.", 0),
 ("Great Sand Dunes", "CO", "May to Jun, Sep to Oct", "Montville Nature Trail", 0.5, "RT", 200, "Easy", "Dune sand gets very hot on summer afternoons.", 0),
 ("Great Smoky Mountains", "TN / NC", "Apr to May, Oct", "Lynn Camp Prong Cascades", 1.4, "RT", None, "Easy, gentle old railroad grade", "Parking tag needed to park over 15 min. Laurel Falls is closed for rebuilding.", 0),
 ("Guadalupe Mountains", "TX", "Oct to Apr", "Smith Spring Trail", 2.3, "loop", 402, "Easy to moderate", "No reservation needed.", 0),
 ("Haleakalā", "HI", "Year-round", "Pā Kaʻoao (White Hill) Trail", 0.4, "RT", 100, "Easy, but at high altitude", "Sunrise reservation needed to enter the summit 3 to 7 am.", 0),
 ("Hawaiʻi Volcanoes", "HI", "Year-round", "Kīlauea Iki Trail", 3.3, "loop", 400, "Moderate to challenging", "Steep, rocky descent into the crater floor.", 0),
 ("Hot Springs", "AR", "Mar to May, Oct to Nov", "Grand Promenade", 1.0, "RT", None, "Easy, paved brick", "No reservation needed.", 0),
 ("Indiana Dunes", "IN", "May to Oct", "Dune Succession Trail", 0.9, "loop", 81, "Short but steep: 270+ stairs", "A car fee applies at West Beach in summer.", 0),
 ("Isle Royale", "MI", "Jun to Sep", "Stoll Trail to Scoville Point", 4.2, "loop", None, "Moderate (1.9 mi option)", "Boat or seaplane only. Closed in winter.", 0),
 ("Joshua Tree", "CA", "Oct to Apr", "Hidden Valley Nature Trail", 1.0, "loop", None, "Easy, rock steps", "No reservation needed. Carry plenty of water.", 0),
 ("Katmai", "AK", "Jul, Sep", "Brooks Falls Trail", 2.4, "RT", None, "Easy", "Floatplane or boat only. Many bears on the trail.", 0),
 ("Kenai Fjords", "AK", "Jun to Sep", "Glacier View Loop, Exit Glacier", 1.0, "loop", None, "Easy, accessible", "No entrance fee. Road closed to cars in winter.", 0),
 ("Kings Canyon", "CA", "May to Oct", "General Grant Tree Trail", 0.3, "loop", None, "Easy, paved", "Cedar Grove road closes in winter.", 1),
 ("Kobuk Valley", "AK", "Jul to Sep", "No trails or facilities", "Fly-in wilderness", "", None, "Expert or guided only", "Air taxi from Kotzebue or Bettles to the sand dunes.", 0),
 ("Lake Clark", "AK", "Jun to Sep", "Tanalian Falls Trail, Port Alsworth", 4.0, "RT", None, "Moderate", "Fly-in only. No entrance fee.", 0),
 ("Lassen Volcanic", "CA", "Jun to Oct", "Manzanita Lake Trail", 1.8, "loop", None, "Easy", "No reservation needed.", 0),
 ("Mammoth Cave", "KY", "Apr to May, Sep to Oct", "Heritage Trail", 0.6, "RT", None, "Easy, boardwalk", "The cave is only on ticketed ranger tours. Book ahead.", 0),
 ("Mesa Verde", "CO", "May to Oct", "Soda Canyon Overlook Trail", 1.2, "RT", 67, "Easy", "Cliff dwelling tours need separate tickets.", 0),
 ("Mount Rainier", "WA", "Jul to Sep", "Nisqually Vista Trail, Paradise", 1.2, "loop", 200, "Easy, paved", "Snow can cover trails into July.", 0),
 ("New River Gorge", "WV", "Apr to Oct", "Long Point Trail", 3.2, "RT", None, "Moderate", "No reservation needed.", 0),
 ("North Cascades", "WA", "Jun to Oct", "Thunder Knob Trail", 3.8, "RT", 680, "Easy to moderate", "On the SR 20 corridor (Ross Lake NRA, part of the park complex).", 0),
 ("Olympic", "WA", "Year-round, driest Jul to Sep", "Hall of Mosses Trail, Hoh", 0.8, "loop", None, "Easy", "Long entrance lines at the Hoh in summer.", 0),
 ("Petrified Forest", "AZ", "Spring and fall", "Blue Mesa Trail", 1.0, "loop", None, "Easy, steep start", "The park has daily opening hours.", 0),
 ("Pinnacles", "CA", "Feb to May", "Moses Spring to Rim Trail Loop", 2.2, "loop", 500, "Moderate. Bring a flashlight", "Bear Gulch Cave closes mid-May to mid-July for bats.", 0),
 ("Redwood", "CA", "Year-round", "Lady Bird Johnson Grove Trail", 1.5, "loop", None, "Easy", "Steep, narrow access road. No RVs or trailers.", 0),
 ("Rocky Mountain", "CO", "Jun to early Oct", "Bear Lake Trail", 0.7, "loop", 20, "Easy", "Timed entry late May to mid-Oct in 2026.", 1),
 ("Saguaro", "AZ", "Oct to Apr", "Valley View Overlook Trail", 0.8, "RT", None, "Easy", "No reservation needed. Carry plenty of water.", 0),
 ("Sequoia", "CA", "Late May to Oct", "Big Trees Trail", 0.7, "loop", "flat", "Easy, paved", "In summer most people start at Giant Forest Museum.", 1),
 ("Shenandoah", "VA", "Apr to Nov", "Stony Man Trail", 1.6, "RT", 340, "Easy", "No reservation needed.", 0),
 ("Theodore Roosevelt", "ND", "May to Sep", "Wind Canyon Trail", 0.3, "loop", None, "Easy, cliff edges", "South Unit loop road reopened in 2025.", 0),
 ("Virgin Islands", "VI", "Dec to Apr", "Cinnamon Bay Nature Loop", "About 0.5 mi / 0.8 km loop", "", None, "Easy", "Reach St. John by ferry.", 0),
 ("Voyageurs", "MN", "Jun to Sep", "Oberholtzer Trail", 1.6, "RT", None, "Easy", "Most of the park is boat-only. This trail is by road.", 0),
 ("White Sands", "NM", "Oct to Apr", "Interdune Boardwalk", 0.4, "RT", None, "Easy, accessible", "The road can close up to 3 hours for missile tests.", 0),
 ("Wind Cave", "SD", "May to Oct", "Rankin Ridge Nature Trail", 1.0, "loop", None, "Easy", "Cave tours need tickets and often sell out.", 0),
 ("Wrangell-St. Elias", "AK", "Jun to early Sep", "Root Glacier Trail, Kennecott", "About 4 mi / 6.4 km RT", "", None, "Easy to moderate", "60 mi gravel road. Stay off the ice without a guide.", 0),
 ("Yellowstone", "WY / MT / ID", "Late May to Sep", "Grand Prismatic Overlook Trail", 1.2, "RT", 105, "Easy", "Stay on trails and boardwalks near hot springs.", 1),
 ("Yosemite", "CA", "Apr to Jun", "Lower Yosemite Fall Trail", 1.0, "loop", 50, "Easy, paved", "No reservation in 2026. The fall is often dry by late summer.", 1),
 ("Zion", "UT", "Mar to May, Sep to Nov", "Riverside Walk", "About 2 mi / 3.2 km RT", "", 154, "Easy, paved", "Shuttle on the scenic drive most of the year.", 1),
]
assert len(P) == 63, len(P)

def dist(p):
    mi, kind = p[4], p[5]
    if isinstance(mi, str): return mi
    k = {"RT": "round trip", "loop": "loop"}[kind]
    mis = f"{mi:g}"
    return f"{mis} mi / {km(mi)} km {k}"
def gain(p):
    g = p[6]
    if g is None: return ""
    if g == "flat": return "Mostly flat"
    return f"Gain {g} ft / {m(g)} m"

CSS = """<style>
@media print{html,body{background:#fff}}
.lab{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest);margin:11pt 0 3pt}
.wl{border-bottom:0.8pt solid #CFC7B6;height:24pt}
.f2{display:grid;grid-template-columns:1fr 1fr;gap:0 22pt}
.f3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0 18pt}
.fl{display:flex;align-items:flex-end;gap:6pt;height:25pt;border-bottom:0.8pt solid #CFC7B6;font:600 7.8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);padding-bottom:3pt}
.fl .u{margin-left:auto;font-weight:500;color:#8B8577;letter-spacing:.04em;text-transform:none;font-size:8.5pt}
.fl .u b{display:inline-block;width:0.45in}
.ph{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:7pt;margin-bottom:10pt}
.ph h2{margin:0;font-size:21pt}
.ph .r{font:700 7.5pt/1.3 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);text-align:right}
.pg{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(4,1fr);gap:8pt 11pt;height:8.42in}
.pk{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:9pt 10pt 8pt;display:grid;grid-template-columns:1fr 0.98in;gap:0 9pt}
.pk .nm{display:flex;align-items:flex-start;gap:6pt}
.pk .nm i{flex:none;width:11pt;height:11pt;border:1.3pt solid var(--forest);border-radius:2pt;margin-top:2pt}
.pk h3{margin:0;font-size:12.6pt;line-height:1.08}
.pk .st{font:700 7pt/1 var(--sans);letter-spacing:.12em;color:var(--clay);margin:4pt 0 0 17pt}
.pk .st .nr{display:inline-block;margin-left:5pt;padding:1.5pt 4pt;border:0.8pt solid var(--clay);border-radius:3pt;letter-spacing:.06em}
.pk .tr{font-size:8.6pt;line-height:1.3;margin-top:6pt}
.pk .tr b{display:block;color:var(--forest);font-size:9pt}
.pk .tr span{display:block;color:#5F5F5A}
.pk .en{font-size:7.9pt;line-height:1.28;color:#6B6B66;margin-top:4pt}
.pk .vd{display:flex;align-items:flex-end;gap:5pt;font:700 6.8pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);margin-top:auto;padding-top:4pt}
.pk .vd s{flex:1;border-bottom:0.8pt solid #BDB5A4;height:12pt;text-decoration:none}
.pk .l{display:flex;flex-direction:column}
.stamp{border:1.1pt dashed #B9B1A0;border-radius:6pt;display:flex;align-items:flex-end;justify-content:center;padding-bottom:5pt;font:700 6.3pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#B0A898}
.pk.blank{background:var(--soft);border-color:var(--soft);display:block}
.az{columns:3;column-gap:16pt;font-size:9.8pt;margin-top:6pt}
.az div{display:flex;align-items:center;gap:6pt;padding:5.6pt 0;border-bottom:0.6pt solid var(--line);break-inside:avoid}
.az div i{flex:none;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.az div em{font-style:normal;margin-left:auto;font:700 7pt/1 var(--sans);letter-spacing:.08em;color:var(--sage)}
.az div b{font-weight:500;font-size:7.5pt;color:var(--sage);width:13pt}
.ca{columns:3;column-gap:16pt;font-size:9.2pt}
.ca .prov{break-inside:avoid;margin-bottom:11pt}
.ca h4{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin:0 0 3pt;padding-top:3pt}
.ca div.r{display:flex;align-items:flex-start;gap:6pt;padding:4.6pt 0;border-bottom:0.6pt solid var(--line)}
.ca div.r i{flex:none;width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;margin-top:1pt}
.ca div.r em{font-style:normal;font:700 6.6pt/1 var(--sans);letter-spacing:.06em;color:var(--sage);margin-left:auto;padding-top:2pt}
.t10{display:grid;grid-template-columns:1fr 1fr;gap:9pt 12pt}
.t10>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:9pt 12pt;display:grid;grid-template-columns:22pt 1fr;gap:0 6pt}
.t10 .n{font:600 16pt/1 var(--serif);color:var(--clay)}
.t10 h3{margin:0 0 4pt;font-size:13pt}
.t10 p{margin:0;font-size:9.2pt;line-height:1.38}
.t10 p.s{color:#6B6B66;font-size:8.8pt;margin-top:4pt}
.steps2{display:grid;grid-template-columns:1fr 1fr;gap:10pt 16pt}
.steps2>div{display:grid;grid-template-columns:28pt 1fr;gap:8pt;padding:9pt 0;border-bottom:0.6pt solid var(--line)}
.steps2 .n{font:600 20pt/1 var(--serif);color:var(--clay)}
.steps2 h3{margin:0 0 3pt;font-size:12.5pt}
.steps2 p{margin:0;font-size:9.8pt;line-height:1.42}
.pass{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt}
.pass>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 13pt}
.pass h3{margin:0 0 4pt;font-size:13pt}
.pass p{margin:0 0 4pt;font-size:9.6pt;line-height:1.42}
.pass .pr{font:600 13.5pt/1.15 var(--serif);color:var(--clay);margin:2pt 0 5pt}
.log{border:1pt solid #CFC7B6;border-radius:9pt;background:#fff;padding:11pt 13pt;margin-bottom:12pt}
.log .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:2pt}
.log .top h3{margin:0;font-size:14pt}
.opts{display:flex;flex-wrap:wrap;gap:4pt 11pt;font-size:8.8pt;margin-top:5pt}
.opts span::before{content:"";display:inline-block;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-right:4pt;vertical-align:-1pt;background:#fff}
.lg{display:grid;grid-template-columns:1fr 1.15in;gap:0 12pt}
.lg .stamp{height:1.15in;margin-top:8pt}
.goal{display:grid;grid-template-columns:22pt 1.7fr 1fr 1fr 0.8fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:30pt;padding-bottom:4pt;font-size:9pt}
.goal.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.5pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.goal .n{font:600 14pt/1 var(--serif);color:var(--clay)}
.seas{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt;margin-top:8pt}
.seas>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:9pt 12pt;height:2.12in}
.seas h3{margin:0 0 2pt;font-size:12.5pt}
.seas p{margin:0;font-size:8.4pt;color:#6B6B66}
.seas .wl{height:21pt}
.cnt{display:grid;grid-template-columns:repeat(9,1fr);gap:5pt}
.cnt div{height:0.52in;border:1pt solid #CFC7B6;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font:600 8.5pt/1 var(--serif);color:#A39C8D}
.cnt div.ms{border:1.6pt solid var(--clay);color:var(--clay)}
.sts{display:grid;grid-template-columns:repeat(8,1fr);gap:5pt}
.sts div{border:1pt solid #CFC7B6;border-radius:5pt;background:#fff;text-align:center;padding:5pt 0;font:700 8.5pt/1 var(--sans);letter-spacing:.06em;color:var(--forest)}
.tot{display:grid;grid-template-columns:repeat(4,1fr);gap:10pt;margin-top:8pt}
.tot>div{background:var(--soft);border-radius:8pt;padding:10pt 12pt;height:1.0in;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.lnt{display:grid;grid-template-columns:1fr 1fr;gap:4pt 18pt}
.lnt>div{display:grid;grid-template-columns:24pt 1fr;gap:8pt;padding:11pt 0;border-bottom:0.6pt solid var(--line)}
.lnt .n{font:600 16pt/1 var(--serif);color:var(--clay)}
.lnt h3{margin:0 0 4pt;font-size:13pt}
.lnt p{margin:0;font-size:10.2pt;line-height:1.45}
.free{border:1pt solid #CFC7B6;border-radius:10pt;background:#fff;position:relative;height:8.55in}
.free span{position:absolute;left:12pt;top:10pt;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#A39C8D}
.back{background:var(--forest);color:var(--stone);display:flex;flex-direction:column;justify-content:space-between}
.back h2{color:var(--stone);font-size:28pt}
.back p{color:#D9DED6}
.back .brand{font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage)}
.bk{display:grid;grid-template-columns:1fr 1fr;gap:14pt}
.bk>div{border:1pt solid #5C6E5E;border-radius:10pt;padding:14pt 16pt}
.bk h3{color:var(--stone);margin:0 0 6pt;font-size:15pt}
.bk p{font-size:10pt;margin:0 0 8pt}
.bk .u{font:600 8.6pt/1.4 var(--sans);color:#E9C9B6;}
html.bw .page{background:#fff}
html.bw{--forest:#222;--clay:#444;--sage:#666;--rust:#333;--soft:#fff}
html.bw .cover,html.bw .back{background:#fff;color:#222;border:2pt solid #222}
html.bw .cover h1,html.bw .back h2,html.bw .bk h3{color:#222}
html.bw .cover .sub,html.bw .cover .meta,html.bw .cover .brand,html.bw .back p,html.bw .back .brand{color:#333 !important}
html.bw .bk .u{color:#222}
html.bw .bk>div{border-color:#999}
html.bw .cover svg *{fill:none !important;stroke:#222 !important}
html.bw .box,html.bw .tot>div,html.bw .pk.blank{background:#fff;border:0.8pt solid #999}
html.bw .warn{background:#fff}
html.bw .box.forest{color:#222}html.bw .box.forest h3{color:#222}
</style>"""

def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def opts(*o): return '<div class="opts">' + "".join(f"<span>{x}</span>" for x in o) + "</div>"

# ---------- 1 cover
page(f'''<div class="brand">HikeSupply Co.</div>
<div class="art"><svg width="520" height="390" viewBox="0 0 520 390" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle cx="408" cy="82" r="34" fill="#B85C38"/>
<path d="M0 300 L110 160 L170 225 L262 96 L380 250 L430 205 L520 285 V390 H0 Z" fill="#3C5040"/>
<path d="M236 133 L262 96 L290 136 L274 128 L262 142 L250 128 Z" fill="#F5F1EA"/>
<path d="M88 188 L110 160 L128 182 L118 178 L110 188 Z" fill="#F5F1EA"/>
<path d="M0 328 Q130 290 260 318 T520 306 V390 H0 Z" fill="#4E6450"/>
<g fill="#8A9A7E"><path d="M42 344 L66 288 L90 344 Z"/><path d="M78 348 L96 306 L114 348 Z"/><path d="M430 344 L456 280 L482 344 Z"/><path d="M398 350 L416 312 L434 350 Z"/></g>
<path d="M140 386 C200 362 250 362 290 350 C320 341 340 334 362 330" stroke="#C9A04A" stroke-width="4" stroke-dasharray="3 12"/>
<g transform="translate(14 4)">
 <circle cx="70" cy="70" r="66" fill="#F5F1EA" stroke="#F5F1EA"/>
 <circle cx="70" cy="70" r="57" stroke="#2C3B2E" stroke-width="2" stroke-dasharray="3 5"/>
 <text x="70" y="70" text-anchor="middle" font-family="Fraunces" font-weight="600" font-size="40" fill="#2C3B2E">63</text>
 <text x="70" y="90" text-anchor="middle" font-family="Inter" font-weight="700" font-size="9" letter-spacing="2.4" fill="#B85C38">US PARKS</text>
 <text x="70" y="104" text-anchor="middle" font-family="Inter" font-weight="700" font-size="7.5" letter-spacing="2" fill="#2C3B2E">+ CANADA</text>
</g>
</svg></div>
<div><h1>National Parks Hiking Tracker</h1><p class="sub" style="max-width:6.2in">All 63 US national parks, A to Z, each with one easy-to-plan day hike in miles and kilometers, a stamp box and a visit log. Plus Canada's national parks and reserves.</p>
<div class="meta" style="margin-top:22pt"><span>26 printable pages</span><span>mi + km, ft + m</span><span>Checked against nps.gov, {CHECKED}</span></div></div>''', 0, "cover")

# ---------- 2 how to use
page(f'''<div class="kicker">Start here</div><h2>How to use this tracker</h2>
<p class="lead">One page per eight parks, in alphabetical order, so you can find any park in seconds. Tick it off, add the date, and press your passport stamp or a sticker into the box.</p>
<div class="steps2">
<div><div class="n">1</div><div><h3>Print</h3><p>Print at Actual size on US Letter. An A4 file and a low-ink printer-friendly file are included. Card stock holds stamps and glue best. Reprint any page for your own use as often as you like.</p></div></div>
<div><div class="n">2</div><div><h3>Check off</h3><p>Page 3 lists all 63 parks on one sheet. Tick each park as you visit, then fill in its full card on pages 4 to 11.</p></div></div>
<div><div class="n">3</div><div><h3>Stamp</h3><p>Most visitor centers have a free cancellation stamp for park passport books. Ink it right into the stamp box, or add a ticket stub or sticker.</p></div></div>
<div><div class="n">4</div><div><h3>Log</h3><p>Use the visit log on pages 18 to 21 for the full story, and the two blank pages at the back for extra stamps, sketches and photos.</p></div></div></div>
<h3>How to read a park card</h3>
<table><tr><th>On the card</th><th>What it means</th></tr>
<tr><td>Best</td><td>When the park is usually most pleasant for day hiking. Every season can work with the right plan.</td></tr>
<tr><td>Hike</td><td>One short, well-known day hike from the park's own trail pages, with distance and elevation gain as NPS lists them, converted to km and m.</td></tr>
<tr><td>Round trip, loop</td><td>Round trip means out and back the same way. A loop brings you back without repeating the trail.</td></tr>
<tr><td>Level</td><td>Easy, moderate or harder, as the park describes it. A few parks have no truly easy trail, and we say so.</td></tr>
<tr><td><span style="font:700 7pt/1 var(--sans);letter-spacing:.06em;color:var(--clay);border:0.8pt solid var(--clay);border-radius:3pt;padding:1.5pt 4pt">NR FEE</span></td><td>One of 11 parks that charge an extra $100 per person (age 16+) to non-US residents in 2026, unless they hold the $250 non-resident annual pass. See page 16.</td></tr></table>
<div class="warn"><b>Rules change every year.</b> Reservations, road openings and trail closures in this tracker were checked against nps.gov in {CHECKED}. Always check the park's alerts page on nps.gov before you go. Page 13 shows how in two minutes.</div>''', 2)

# ---------- 3 A-Z overview
az = "".join(f'<div><b>{k}</b><i></i><span>{p[0]}</span><em>{p[1].replace(" ", "")}</em></div>' for k, p in enumerate(P, 1))
page(f'''<div class="kicker">The whole list on one page</div><h2>The 63 US national parks, A to Z</h2>
<p style="margin-bottom:10pt">Tick each park the day you visit. Pages 4 to 11 have a full card for every park in the same order.</p>
<div class="az">{az}</div>
<div class="f3" style="margin-top:12pt"><div class="fl">Parks visited<span class="u"><b></b> of 63</span></div><div class="fl">First park</div><div class="fl">Latest park</div></div>''', 3)

# ---------- 4-11 park pages
def card(p):
    nr = '<span class="nr">NR FEE</span>' if p[9] else ''
    g = gain(p)
    meta = dist(p) + (f"</span><span>{g}" if g else "")
    return (f'<div class="pk"><div class="l"><div class="nm"><i></i><h3>{p[0]}</h3></div>'
            f'<div class="st">{p[1]}{nr}</div>'
            f'<div class="tr"><span>Best: {p[2]}</span></div>'
            f'<div class="tr"><b>{p[3]}</b><span>{meta}</span><span>{p[7]}</span></div>'
            f'<div class="en">{p[8]}</div>'
            f'<div class="vd">Visited<s></s></div></div>'
            f'<div class="stamp">Stamp</div></div>')
n = 4
for i in range(0, 64, 8):
    grp = P[i:i + 8]
    cards = "".join(card(p) for p in grp)
    if len(grp) < 8:
        cards += ('<div class="pk blank"><div class="kicker" style="margin-bottom:5pt">All 63 done?</div>'
                  '<h3 style="margin:0 0 6pt">Date I finished</h3><div class="wl"></div>'
                  '<h3 style="margin:10pt 0 6pt">Favorite park of all</h3><div class="wl"></div></div>')
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Parks A to Z · {i // 8 + 1} of 8</div><h2>{grp[0][0]} to {grp[-1][0]}</h2></div><div class="r">Distances and gains<br>as listed by NPS</div></div>
<div class="pg">{cards}</div>''', n)
    n += 1

# ---------- 12 territory parks
page(f'''<div class="kicker">Farthest from the mainland</div><h2>The two territory parks</h2>
<p class="lead">Many park lists leave these two out. They count, they are worth the trip, and they need a little more planning than a mainland park.</p>
<div class="cols">
<div><h3>National Park of American Samoa</h3>
<p>The only US national park south of the equator, spread over the islands of Tutuila, Ofu, Olosega and Taʻū: rainforest ridges, steep sea cliffs and coral reefs.</p>
<p><b>Getting there.</b> Fly to Pago Pago on Tutuila. Flights are few, so plan the whole trip around them.</p>
<p><b>Village land.</b> Much of the park is land the National Park Service leases from local villages. Be a polite guest: ask before you walk through a village, dress modestly, and ask at the visitor center about Sunday and evening customs.</p>
<p><b>Trails.</b> NPS calls the park's trails unimproved, steep and rugged. Start with Lower Sauma Ridge (0.4 mi / 0.6 km round trip). Hike early, before the heat.</p></div>
<div><h3>Virgin Islands National Park</h3>
<p>Covers a large part of the island of St. John: white beaches, coral bays, old sugar plantation ruins and dry forest trails.</p>
<p><b>Getting there.</b> Fly to St. Thomas, then take the ferry to St. John. There is no airport on St. John.</p>
<p><b>Papers.</b> It is a US territory. Canadian and other visitors should bring a passport, as for any US trip.</p>
<p><b>Trails.</b> Start with the Cinnamon Bay Nature Loop (about 0.5 mi / 0.8 km). The dry season, roughly December to April, is the most comfortable. Atlantic hurricane season runs June 1 to November 30.</p>
<p><b>Beach fee.</b> Trunk Bay charges an amenity fee.</p></div></div>
<div class="f2" style="margin-top:16pt">
<div><div class="lab">American Samoa: date and who with</div>{lines(2)}<div class="lab">Best moment</div>{lines(3)}<div class="stamp" style="height:1.05in;margin-top:12pt">Stamp</div></div>
<div><div class="lab">Virgin Islands: date and who with</div>{lines(2)}<div class="lab">Best moment</div>{lines(3)}<div class="stamp" style="height:1.05in;margin-top:12pt">Stamp</div></div></div>''', 12)

# ---------- 13 checked + alerts
page(f'''<div class="kicker">Before every trip</div><h2>Checked against nps.gov in {CHECKED}</h2>
<p class="lead">Every park, trail, distance and entry note in this tracker was checked against the official National Park Service pages in {CHECKED}. Parks change their rules often, so here is how to check the latest in two minutes.</p>
<div class="steps2">
<div><div class="n">1</div><div><h3>Open the park page</h3><p>Search "nps.gov" plus the park name. Any alert sits in a banner at the top of every page: closures, fire, flooding, road work.</p></div></div>
<div><div class="n">2</div><div><h3>Check your trail</h3><p>Look under Plan Your Visit, then Conditions or Trail Closures. Trails close for storms, rebuilding and wildlife.</p></div></div>
<div><div class="n">3</div><div><h3>Check reservations</h3><p>Timed entry, sunrise permits, cave tours and ferries are booked on recreation.gov or with the park's listed partner. Many open weeks or months ahead.</p></div></div>
<div><div class="n">4</div><div><h3>Ask a ranger</h3><p>Call the visitor center or stop by when you arrive. Rangers know today's trail, weather and wildlife conditions better than any app.</p></div></div></div>
<h3>What changed for 2026</h3>
<table><tr><th>Park</th><th>2026 rule, as listed on nps.gov</th></tr>
<tr><td>Arches, Glacier, Yosemite</td><td>No timed-entry or vehicle reservation this year.</td></tr>
<tr><td>Rocky Mountain</td><td>Timed entry kept, late May to mid-October.</td></tr>
<tr><td>Acadia</td><td>Vehicle reservation for Cadillac Summit Road, late May to late October.</td></tr>
<tr><td>Haleakalā</td><td>Sunrise reservation for the summit area, 3 to 7 am.</td></tr>
<tr><td>Carlsbad Caverns</td><td>Timed-entry reservation to enter the cavern.</td></tr>
<tr><td>Great Smoky Mountains</td><td>No entrance fee, but a parking tag to park longer than 15 minutes. Laurel Falls Trail closed for rebuilding.</td></tr>
<tr><td>11 popular parks</td><td>$100 per person non-resident fee (age 16+). See page 16.</td></tr></table>
<div class="lab" style="margin-top:12pt">My notes before the next trip</div>{lines(3)}''', 13)

# ---------- 14 Canada A-Z by province
CA = [
 ("Alberta", ["Banff", "Elk Island", "Jasper", "Waterton Lakes", ("Wood Buffalo", "AB / NT")]),
 ("British Columbia", ["Glacier", ("Gulf Islands", "Reserve"), ("Gwaii Haanas", "Reserve"), "Kootenay", "Mount Revelstoke", ("Pacific Rim", "Reserve"), "Yoho"]),
 ("Manitoba", ["Riding Mountain", "Wapusk"]),
 ("New Brunswick", ["Fundy", "Kouchibouguac"]),
 ("Newfoundland and Labrador", [("Akami-Uapishkᵁ-KakKasuak-Mealy Mountains", "Reserve"), "Gros Morne", "Terra Nova", "Torngat Mountains"]),
 ("Northwest Territories", ["Aulavik", ("Nááts'įhch'oh", "Reserve"), ("Nahanni", "Reserve"), ("Thaidene Nëné", "Reserve"), "Tuktut Nogait"]),
 ("Nova Scotia", ["Cape Breton Highlands", "Kejimkujik", ("Sable Island", "Reserve")]),
 ("Nunavut", ["Auyuittuq", "Qausuittuq", "Quttinirpaaq", "Sirmilik", "Ukkusiksalik"]),
 ("Ontario", ["Bruce Peninsula", "Georgian Bay Islands", "Point Pelee", "Pukaskwa", "Thousand Islands"]),
 ("Prince Edward Island", ["Prince Edward Island"]),
 ("Quebec", ["Forillon", "La Mauricie", ("Mingan Archipelago", "Reserve")]),
 ("Saskatchewan", ["Grasslands", "Prince Albert"]),
 ("Yukon", ["Ivvavik", ("Kluane", "Park + reserve"), "Vuntut"]),
]
assert sum(len(x[1]) for x in CA) == 47
def carow(x):
    nm, tag = (x, "") if isinstance(x, str) else x
    return f'<div class="r"><i></i><span>{nm}</span><em>{tag.upper()}</em></div>'
cah = "".join(f'<div class="prov"><h4>{pv}</h4>' + "".join(carow(x) for x in lst) + '</div>' for pv, lst in CA)
page(f'''<div class="kicker">For our Canadian hikers, and everyone heading north</div><h2>Canada's national parks and reserves</h2>
<p>Canada has 37 national parks and 11 national park reserves. Kluane is both, so you see 47 names here, A to Z within each province and territory. A reserve is run like a park while Indigenous land claims are settled. Checked against parks.canada.ca in {CHECKED}.</p>
<div class="ca">{cah}</div>
<div class="f3" style="margin-top:10pt"><div class="fl">Visited<span class="u"><b></b> of 47</span></div><div class="fl">First</div><div class="fl">Next</div></div>''', 14)

# ---------- 15 Canada top 10
T10 = [
 ("Banff", "AB", "Johnston Canyon to the Lower Falls", "2.4 km / 1.5 mi round trip · gain 50 m / 164 ft", "Catwalks along the canyon wall. Very busy, so go early. Calmer option: Fenland Trail, 2.1 km / 1.3 mi loop, flat."),
 ("Jasper", "AB", "Valley of the Five Lakes, Wetland Way", "1.8 km / 1.1 mi round trip · easy", "Trail reopened in May 2026 after the 2024 wildfire. Check the park page for recovering areas."),
 ("Pacific Rim (reserve)", "BC", "Shorepine Bog Trail", "0.8 km / 0.5 mi loop · boardwalk, no stairs", "Rainforest Trail is lovely too, but has many stairs."),
 ("Prince Edward Island", "PE", "Balsam Hollow Trail", "0.8 km / 0.5 mi loop · easy", "Pair it with a beach walk along the dunes."),
 ("Mount Revelstoke + Glacier", "BC", "Giant Cedars Boardwalk, Mount Revelstoke", "0.5 km / 0.3 mi · some stairs", "Parks Canada counts these two neighbors together. Old cedars right off the Trans-Canada Highway."),
 ("Yoho", "BC", "Emerald Lake Shoreline", "5.2 km / 3.2 mi loop · minimal gain", "Flat path all the way round the lake."),
 ("Waterton Lakes", "AB", "Cameron Lakeshore", "3.0 km / 1.9 mi round trip · easy", "Shorter option: Linnet Lake, 1 km / 0.6 mi loop."),
 ("Kootenay", "BC", "Marble Canyon", "1.8 km / 1.1 mi round trip · gain 65 m / 213 ft", "Bridges over a narrow, deep limestone canyon."),
 ("Bruce Peninsula", "ON", "Cyprus Lake Trail", "5 km / 3.1 mi · low difficulty", "Parking reservation needed May 1 to Oct 31 in the Cyprus Lake and Grotto area."),
 ("Point Pelee", "ON", "Marsh Boardwalk", "1.0 km / 0.6 mi loop · flat", "Famous for spring bird migration."),
]
t10 = "".join(f'<div><div class="n">{k}</div><div><h3>{a} <span style="font:700 7pt/1 var(--sans);letter-spacing:.12em;color:var(--sage)">{b}</span></h3><p><b>{c}</b><br>{d}</p><p class="s">{e}</p></div></div>' for k, (a, b, c, d, e) in enumerate(T10, 1))
page(f'''<div class="kicker">Canada's busiest parks</div><h2>A first hike in the 10 most visited</h2>
<p>Ranked by Parks Canada visitor numbers for April 2025 to March 2026. Each pick is an easy trail from the park's own hiking pages.</p>
<div class="t10">{t10}</div>
<div class="warn" style="margin-top:10pt"><b>Mountain parks are bear country.</b> Parks Canada asks hikers in Banff, Jasper, Yoho, Kootenay and Waterton to carry bear spray, know how to use it, hike in groups and make noise. Check the park's trail report before you go.</div>''', 15)

# ---------- 16 passes
page(f'''<div class="kicker">Save on entry</div><h2>Park passes in plain words</h2>
<p>Prices as listed on nps.gov and parks.canada.ca in {CHECKED}. They change, so check before you buy.</p>
<div class="pass">
<div><h3>America the Beautiful annual pass</h3><div class="pr">$80 US residents<br>$250 non-residents</div>
<p>Covers entrance fees at all US national parks, and many other federal sites, for 12 months. It covers the pass holder and the passengers in one private car.</p><p class="small">nps.gov/planyourvisit/passes.htm</p></div>
<div><h3>Non-resident fee, new for 2026</h3><div class="pr">$100 per person, age 16+</div>
<p>Charged on top of the entrance fee at Acadia, Bryce Canyon, Everglades, Glacier, Grand Canyon, Grand Teton, Rocky Mountain, Sequoia and Kings Canyon, Yellowstone, Yosemite and Zion. The $250 non-resident annual pass covers it.</p></div>
<div><h3>Other US passes</h3>
<p><b>Senior</b> (US citizens and residents 62+): $20 a year or $80 for life.</p>
<p><b>4th Grade</b>: free for US 4th graders and their family car.</p>
<p><b>Military</b> and <b>Access</b> (permanent disability): free.</p>
<p class="small">Some parks charge no entrance fee at all, and the Great Smoky Mountains parking tag is separate from any pass.</p></div>
<div><h3>Parks Canada Discovery Pass</h3><div class="pr">CAD $83.50 adult, $71.50 senior<br>$167.50 family or group</div>
<p>12 months of entry to more than 80 Parks Canada places. Youth 17 and under enter free. The family or group pass covers up to 7 people in one vehicle.</p>
<p class="small">parks.canada.ca/passes. Canada has run free-entry periods (the Canada Strong Pass) in 2025 and 2026. Watch the Parks Canada site for the next one.</p></div></div>
<h3>My passes</h3>
<div class="f2"><div class="fl">Pass type</div><div class="fl">Valid until</div><div class="fl">Pass type</div><div class="fl">Valid until</div></div>
<h3 style="margin-top:16pt">Reservations to make</h3>
<div class="goal h" style="grid-template-columns:1.4fr 1.4fr 1fr 0.7fr"><span>Park</span><span>What to book</span><span>Opens on</span><span>Done</span></div><div class="goal" style="grid-template-columns:1.4fr 1.4fr 1fr 0.7fr"><span></span><span></span><span></span><span></span></div><div class="goal" style="grid-template-columns:1.4fr 1.4fr 1fr 0.7fr"><span></span><span></span><span></span><span></span></div><div class="goal" style="grid-template-columns:1.4fr 1.4fr 1fr 0.7fr"><span></span><span></span><span></span><span></span></div>''', 16)

# ---------- 17 goals
gr = "".join(f'<div class="goal"><span class="n">{k}</span><span></span><span></span><span></span><span></span></div>' for k in range(1, 6))
seas = [("Spring", "Deserts and the South: Big Bend, Saguaro, Zion, Congaree."),
        ("Summer", "Mountains and the North: Glacier, Mount Rainier, Alaska, Isle Royale."),
        ("Fall", "Colors and cool air: Acadia, Shenandoah, Smokies, Utah."),
        ("Winter", "Warm escapes: Everglades, Death Valley, Joshua Tree, Hawaiʻi.")]
sb = "".join(f'<div><h3>{a}</h3><p>{b}</p>{lines(4, 22)}</div>' for a, b in seas)
page(f'''<div class="kicker">Plan ahead</div><h2>My park goals</h2>
<p>Write down the next five parks you want to see, then match each one to the season that suits it best.</p>
<div class="goal h"><span>#</span><span>Park</span><span>Season</span><span>Who with</span><span>Booked</span></div>{gr}
<h3 style="margin-top:16pt">Parks by season</h3>
<div class="seas">{sb}</div>
<div class="f2" style="margin-top:12pt"><div class="fl">Dream park</div><div class="fl">By the year</div></div>''', 17)

# ---------- 18-21 visit logs (2 per page)
def logbox():
    return f'''<div class="log"><div class="top"><h3>Park</h3><span class="small">Visit no. ______</span></div>
<div class="lg"><div>
<div class="f2"><div class="fl">Date</div><div class="fl">Who with</div>
<div class="fl">Trail</div><div class="fl">Distance<span class="u"><b></b> mi / <b></b> km</span></div></div>
<div class="lab">Weather</div>{opts("Sunny", "Cloudy", "Rain", "Wind", "Snow", "Hot", "Cold")}
<div class="lab">Wildlife and plants</div>{lines(2, 22)}
<div class="lab">Highlight</div>{lines(3, 22)}
</div><div class="stamp">Stamp or sticker</div></div></div>'''
for k in range(4):
    page(f'<div class="kicker">Visit log · {k + 1} of 4</div><h2 style="margin-bottom:12pt">Park visits</h2>{logbox()}{logbox()}', 18 + k)

# ---------- 22 stats
ms = {10, 25, 50, 63}
cnt = "".join(f'<div class="{"ms" if i in ms else ""}">{i}</div>' for i in range(1, 64))
ST = ["AK", "AZ", "AR", "CA", "CO", "FL", "HI", "ID", "IN", "KY", "ME", "MI", "MN", "MO", "MT", "NV",
      "NM", "NC", "ND", "OH", "OR", "SC", "SD", "TN", "TX", "UT", "VA", "WA", "WV", "WY", "AS", "VI"]
sts = "".join(f'<div>{s}</div>' for s in ST)
page(f'''<div class="kicker">Keep count</div><h2>My park stats</h2>
<p>Color a circle for every park you visit. Circled numbers are milestones worth a celebration.</p>
<div class="cnt">{cnt}</div>
<h3 style="margin-top:14pt">States and territories with a national park</h3>
<p class="small" style="margin-top:-2pt">30 states plus American Samoa and the US Virgin Islands. Color each one you have hiked in.</p>
<div class="sts">{sts}</div>
<h3 style="margin-top:14pt">Totals</h3>
<div class="tot"><div>US parks</div><div>Canadian parks</div><div>Miles hiked</div><div>Kilometers hiked</div></div>
<div class="f2" style="margin-top:10pt"><div class="fl">Longest hike<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Most gain<span class="u"><b></b> ft / <b></b> m</span></div></div>
<p class="small" style="margin-top:10pt">Handy to know: 1 mile is about 1.6 kilometers, and 1,000 feet is about 305 meters.</p>''', 22)

# ---------- 23 etiquette + LNT
LNT = [("Plan ahead and prepare", "Know the rules, the weather and your turnaround time. Carry water, food, layers, a light and a map."),
       ("Travel on durable surfaces", "Stay on the trail, even through mud, so it does not widen. Never shortcut switchbacks."),
       ("Dispose of waste properly", "Pack out everything you bring, food scraps and wrappers too. Use restrooms where there are some."),
       ("Leave what you find", "Rocks, flowers, antlers and artifacts stay. Collecting is not allowed in national parks."),
       ("Minimize campfire impacts", "Use a stove. Make fires only where allowed, in existing rings, and only when there is no fire ban."),
       ("Respect wildlife", "Watch from a distance and never feed animals. Yellowstone asks for at least 100 yd / 91 m from bears and wolves."),
       ("Be considerate of others", "Hikers going uphill have the right of way. Step aside for horses, keep music off, and let the quiet win.")]
lnt = "".join(f'<div><div class="n">{k}</div><div><h3>{a}</h3><p>{b}</p></div></div>' for k, (a, b) in enumerate(LNT, 1))
page(f'''<div class="kicker">One page to remember</div><h2>Trail etiquette and Leave No Trace</h2>
<p class="lead">Popular trails see a lot of boots. These seven habits keep them wild for the next hiker.</p>
<div class="lnt">{lnt}</div>
<div class="box forest" style="margin-top:12pt"><h3>Park-specific rules matter</h3><p style="margin:0">Pets, drones and stamp hunting have their own rules in each park. Pets are only allowed on some trails, and launching a drone is not allowed in national parks without a permit. Check the park page before you go.</p></div>
<h3>Pack these on every park day hike</h3>
<div class="cols" style="gap:0 20pt"><ul class="check"><li>Water, more than you think</li><li>Snacks or lunch</li><li>Rain shell and a warm layer</li><li>Map, offline or on paper</li></ul><ul class="check"><li>Headlamp or flashlight</li><li>Sun hat and sunscreen</li><li>Small first aid kit</li><li>Tell someone your plan and return time</li></ul></div>
<p class="small" style="margin-top:8pt">Based on the seven Leave No Trace principles. Learn more at lnt.org.</p>''', 23)

# ---------- 24-25 free pages
page('<div class="kicker">Free page</div><h2 style="margin-bottom:10pt">Stamps, tickets and sketches</h2><div class="free"><span>No lines, no boxes</span></div>', 24)
page('<div class="kicker">Free page</div><h2 style="margin-bottom:10pt">More stamps and notes</h2><div class="free"><span>Your page</span></div>', 25)

# ---------- 26 back
page(f'''<div class="brand">HikeSupply Co.</div>
<div><h2>Going deeper on a park?</h2><p style="font-size:12pt;max-width:5.6in;margin-top:10pt">Our trip guides turn one park into a full plan: when to go, where to start, and the best day hikes with GPX routes for your phone.</p>
<div class="bk" style="margin-top:22pt">
<div><h3>Great Smoky Mountains Trip Pack</h3><p>Planning Guide plus 10 GPX day hikes for America's most visited national park.</p><div class="u">hikesupplyco.com/products/<br>great-smoky-mountains-trip-pack</div></div>
<div><h3>Utah's Mighty 5 Trip Pack</h3><p>Planning Guide plus 10 GPX day hikes for Zion, Bryce Canyon, Capitol Reef, Canyonlands and Arches.</p><div class="u">hikesupplyco.com/products/<br>utahs-mighty-5-trip-pack</div></div></div></div>
<div><p style="font-size:9pt;max-width:6.4in">Facts in this tracker were checked against nps.gov and parks.canada.ca in {CHECKED}. Trails, fees and reservation rules change. Check official park sources before every trip and hike within your experience. For personal use: print as many copies as you like for yourself and your family.</p>
<p style="font-size:10pt;margin-top:10pt"><b style="color:#F5F1EA">hikesupplyco.com</b></p></div>''', 0, "back")

html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css">{CSS}</head><body>{"".join(pages)}</body></html>'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"), "w").write(html)
print(len(pages), "pages")
