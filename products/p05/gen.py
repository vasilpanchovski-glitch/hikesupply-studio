"""Generates index.html for p05 (Trail Ready: 8-Week Beginner Hiking Training Plan). Run: python3 gen.py
Base styles in base.css (shared look with p03). Facts: CDC adult activity guidelines, NPS Ten Essentials, PAR-Q+."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Trail Ready"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')

EXTRA = """
.wk{display:grid;grid-template-columns:repeat(3,1fr);gap:8pt;margin:4pt 0 10pt}
.wk>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:9pt 12pt}
.wk .l{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin-bottom:5pt}
.wk .v{font:600 15pt/1.15 var(--serif);color:var(--forest)}
.wk .v small{display:block;font:500 9pt/1.3 var(--sans);color:#6B6B66;margin-top:2pt}
.days td{font-size:10.8pt;line-height:1.4;padding:10pt 6pt}
.days td.d{font:700 8pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);width:0.55in;padding-top:12pt}
.days td.s{width:1.35in;font-weight:600;color:var(--forest)}
.days td.c{width:0.35in;text-align:center}
.days td.c i{display:inline-block;width:11pt;height:11pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff}
.days tr.rest td{color:#8B8577}
.days tr.rest td.s{color:#8B8577}
.moves{display:grid;grid-template-columns:1fr 1fr;gap:10pt}
.mv{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:10pt 12pt;display:grid;grid-template-columns:1.05in 1fr;gap:10pt;align-items:start}
.mv svg{width:1.05in;height:1.05in;background:var(--soft);border-radius:7pt}
.mv h3{margin:0 0 3pt;font-size:12.5pt}
.mv p{margin:0;font-size:9.8pt;line-height:1.4}
.mv .t{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);margin-bottom:4pt}
.str{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 13pt;display:grid;grid-template-columns:1.35in 1fr;gap:13pt;margin-bottom:9pt}
.str svg{width:1.35in;height:1.35in;background:var(--soft);border-radius:8pt}
.str h3{margin:0 0 3pt;font-size:14pt}
.str p{margin:0 0 4pt;font-size:10.2pt;line-height:1.42}
.str .ez{display:grid;grid-template-columns:1fr 1fr;gap:8pt;margin-top:5pt}
.str .ez div{font-size:9.6pt;line-height:1.38;border-top:0.6pt solid var(--line);padding-top:4pt}
.str .ez b{display:block;font:700 7pt/1.2 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin-bottom:2pt}
.str .reps{font:600 9pt/1 var(--sans);color:var(--clay);float:right}
.log{margin-bottom:16pt}
.log table{margin:4pt 0}
.log td{height:31pt;font-size:9pt;border-right:0.6pt solid var(--line)}
.log td:last-child{border-right:0}
.log td.d{font:700 7.5pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);width:0.5in;vertical-align:middle}
.log .wh{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:4pt}
.log .wh b{font:600 16pt/1 var(--serif);color:var(--forest)}
.log .wh span{font:600 8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#8B8577}
.prog td{height:35pt;font-size:9.5pt;border-right:0.6pt solid var(--line)}
.prog td:last-child{border-right:0}
.prog td:first-child{font:600 13pt/1 var(--serif);color:var(--forest);width:0.55in;vertical-align:middle}
.firsts{display:grid;grid-template-columns:repeat(4,1fr);gap:8pt;margin-top:8pt}
.firsts div{background:#fff;border:1pt solid var(--line);border-radius:8pt;padding:10pt 10pt;font-size:9.5pt;line-height:1.35;min-height:1.1in;display:flex;flex-direction:column;justify-content:space-between}
.firsts div b{display:block;color:var(--forest)}
.firsts div span{display:block;border-bottom:0.8pt solid #CFC7B6;font-size:7.5pt;color:#8B8577}
.qs{margin:6pt 0 10pt;border-top:1.5pt solid var(--forest)}
.qr{display:grid;grid-template-columns:1fr auto;gap:14pt;align-items:center;padding:9pt 0;border-bottom:0.6pt solid var(--line);font-size:10.8pt}
.yn{display:inline-flex;gap:12pt;font:600 8pt/1 var(--sans);color:var(--forest)}
.yn i{display:inline-block;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-right:3pt;vertical-align:-1pt;background:#fff}
.sched{display:grid;grid-template-columns:repeat(7,1fr);gap:5pt;margin:8pt 0 10pt}
.sched div{background:#fff;border:1pt solid var(--line);border-radius:7pt;padding:8pt 6pt;text-align:center;font-size:9pt;line-height:1.3;min-height:0.95in}
.sched div b{display:block;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin-bottom:6pt}
.sched div.on{background:var(--forest);color:var(--stone);border-color:var(--forest)}
.sched div.on b{color:#CFD6CC}
.sched div.st{background:var(--soft)}
.talk{display:grid;grid-template-columns:repeat(3,1fr);gap:8pt}
.talk div{border-radius:8pt;padding:10pt 12pt;background:#fff;border:1pt solid var(--line);font-size:10pt;line-height:1.4}
.f2 .fl{height:30pt}
.cl ul.check li{padding:6.5pt 0 6.5pt 19pt}
.talk div b{display:block;font:600 13pt/1.2 var(--serif);color:var(--forest);margin-bottom:3pt}
html.bw .sched div.on{background:#fff;color:#222;border:1.6pt solid #222}
html.bw .sched div.on b{color:#444}
html.bw .mv svg,html.bw .str svg{background:#fff}
"""

# ---------- stick figures ----------
F = "#2C3B2E"; B = "#8A9A7E"; C = "#B85C38"; G = "#A39C8D"
def fig(p, extra="", back=True):
    """p: dict of joints in a 100x100 box. 'b' prefixed limbs are drawn as the far side (lighter)."""
    s = []
    def ln(pts, col, w=4.2):
        d = "M" + " L".join(f"{x} {y}" for x, y in pts)
        s.append(f'<path d="{d}" stroke="{col}" stroke-width="{w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
    if back:
        if "bknee" in p: ln([p["hip"], p["bknee"], p["bfoot"]], B)
        if "belbow" in p: ln([p["neck"], p["belbow"], p["bhand"]], B, 3.6)
    ln([p["neck"], p["hip"]], F, 4.6)
    ln([p["hip"], p["knee"], p["foot"]], F)
    if "elbow" in p: ln([p["neck"], p["elbow"], p["hand"]], F, 3.8)
    hx, hy = p["head"]
    s.append(f'<circle cx="{hx}" cy="{hy}" r="6.2" fill="{F}"/>')
    return f'<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">{extra}{"".join(s)}</svg>'

def ground(y=92): return f'<path d="M6 {y} H94" stroke="{G}" stroke-width="1.6"/>'
def arrow_up(x, y1, y2): return f'<path d="M{x} {y1} V{y2} M{x-4} {y2+5} L{x} {y2} L{x+4} {y2+5}" stroke="{C}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
def circ(cx, cy, r): return f'<path d="M{cx+r} {cy} A{r} {r} 0 1 1 {cx} {cy-r}" stroke="{C}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M{cx-4} {cy-r-4} L{cx} {cy-r} L{cx-4} {cy-r+4}" stroke="{C}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
def chair(x=14, flip=False):
    # simple side-view chair, seat at y 64, back on the left
    return f'<path d="M{x} 40 V92 M{x} 64 H{x+22} V92" stroke="{G}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'

stand = dict(head=(50, 14), neck=(50, 23), hip=(50, 53), knee=(48, 72), foot=(47, 91), bknee=(53, 72), bfoot=(54, 91),
             elbow=(45, 38), hand=(43, 52), belbow=(55, 38), bhand=(57, 52))

SV = {}
SV["march"] = fig(dict(stand, knee=(62, 60), foot=(60, 78), elbow=(44, 33), hand=(52, 26), belbow=(56, 40), bhand=(52, 54)), ground())
SV["ankle"] = fig(dict(stand, knee=(56, 70), foot=(64, 84), hand=(36, 46), elbow=(40, 34), bhand=(64, 46), belbow=(60, 34)), ground() + circ(70, 84, 7))
SV["legswing"] = fig(dict(stand, knee=(60, 70), foot=(72, 85), elbow=(42, 36), hand=(30, 40), belbow=(56, 38), bhand=(58, 52)),
                     ground() + '<path d="M20 30 V92" stroke="#A39C8D" stroke-width="2.6"/>' + f'<path d="M58 92 Q74 92 82 80" stroke="{C}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M76 79 L82 80 L81 86" stroke="{C}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
SV["hips"] = fig(dict(stand, knee=(45, 72), foot=(42, 91), bknee=(56, 72), bfoot=(58, 91), elbow=(36, 42), hand=(46, 52), belbow=(64, 42), bhand=(54, 52)),
                 ground() + f'<ellipse cx="50" cy="55" rx="20" ry="6" stroke="{C}" stroke-width="2.2" fill="none" stroke-dasharray="4 4"/>')
SV["arms"] = fig(dict(stand, elbow=(36, 25), hand=(22, 25), belbow=(64, 25), bhand=(78, 25)), ground() + circ(16, 25, 7) + circ(84, 25, 7), back=True)
SV["calf"] = fig(dict(head=(66, 20), neck=(62, 28), hip=(46, 55), knee=(60, 72), foot=(62, 91), bknee=(34, 73), bfoot=(22, 91),
                      elbow=(72, 36), hand=(84, 30), belbow=(70, 40), bhand=(84, 38)), ground() + '<path d="M87 8 V92" stroke="#A39C8D" stroke-width="3"/>')
SV["quad"] = fig(dict(stand, knee=(51, 75), foot=(35, 62), bknee=(52, 72), bfoot=(53, 91), elbow=(42, 42), hand=(36, 61), belbow=(62, 34), bhand=(76, 38)),
                 ground() + '<path d="M78 36 V92 M78 64 H92 V92" stroke="#A39C8D" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
SV["ham"] = fig(dict(head=(66, 30), neck=(60, 36), hip=(40, 56), knee=(64, 72), foot=(80, 90), bknee=(40, 74), bfoot=(38, 91),
                     elbow=(62, 50), hand=(62, 64), belbow=(58, 50), bhand=(58, 64)), ground())
SV["hipflex"] = fig(dict(head=(48, 24), neck=(48, 32), hip=(46, 62), knee=(68, 66), foot=(68, 91), bknee=(34, 89), bfoot=(18, 91),
                         elbow=(40, 46), hand=(46, 60), belbow=(56, 46), bhand=(50, 60)), ground())
SV["walk"] = fig(dict(stand, knee=(56, 71), foot=(62, 90), bknee=(46, 72), bfoot=(38, 90), elbow=(42, 38), hand=(38, 50), belbow=(57, 38), bhand=(62, 50)), ground())

SV["stepup"] = fig(dict(head=(44, 12), neck=(44, 21), hip=(44, 50), knee=(60, 56), foot=(64, 74), bknee=(42, 70), bfoot=(36, 91),
                        elbow=(38, 34), hand=(36, 48), belbow=(50, 34), bhand=(54, 46)),
                   ground() + f'<rect x="52" y="74" width="40" height="18" rx="2" fill="#DCD5C7" stroke="{G}" stroke-width="1.6"/>')
SV["squat"] = fig(dict(head=(54, 28), neck=(50, 36), hip=(34, 60), knee=(58, 62), foot=(58, 91), bknee=(60, 64), bfoot=(61, 91),
                       elbow=(66, 40), hand=(80, 38), belbow=(64, 42), bhand=(78, 41)), ground() + chair(8))
SV["lunge"] = fig(dict(head=(46, 18), neck=(46, 27), hip=(48, 56), knee=(32, 66), foot=(30, 91), bknee=(64, 84), bfoot=(80, 91),
                       elbow=(41, 42), hand=(44, 56), belbow=(52, 42), bhand=(50, 56)), ground())
SV["calfraise"] = fig(dict(stand, head=(50, 11), neck=(50, 20), hip=(50, 50), knee=(49, 70), foot=(51, 86), bknee=(52, 70), bfoot=(54, 86),
                           elbow=(60, 34), hand=(74, 38), belbow=(62, 36), bhand=(74, 40)),
                      ground() + '<path d="M78 34 V92 M78 62 H92 V92" stroke="#A39C8D" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
                      + f'<path d="M51 86 L56 91 M54 86 L59 91" stroke="{F}" stroke-width="3.4" stroke-linecap="round"/>' + arrow_up(30, 82, 62))
SV["bridge"] = fig(dict(head=(12, 84), neck=(20, 86), hip=(52, 70), knee=(70, 64), foot=(76, 90), bknee=(72, 66), bfoot=(80, 90),
                        elbow=(30, 90), hand=(42, 90)), ground() + arrow_up(52, 86, 58))
SV["plank"] = fig(dict(head=(16, 58), neck=(24, 63), hip=(56, 71), knee=(72, 78), foot=(90, 86), bknee=(72, 79), bfoot=(90, 88),
                       elbow=(24, 88), hand=(36, 88)), ground(90))

# ---------- pages ----------
# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="460" height="330" viewBox="0 0 460 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle cx="360" cy="64" r="24" stroke="#F5F1EA" stroke-width="3"/>
<path d="M0 280 L120 120 L190 200 L280 70 L460 280 Z" fill="#3C5040" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M60 310 C120 300 150 270 200 262 C250 254 262 214 300 196 C330 182 350 150 380 140" stroke="#B85C38" stroke-width="3.5" stroke-dasharray="2 10"/>
<path d="M0 300 Q120 276 240 296 T460 290 V330 H0 Z" fill="#F5F1EA" stroke="#F5F1EA"/>
<g fill="#F5F1EA" stroke="#F5F1EA"><circle cx="380" cy="132" r="6"/></g>
</svg></div>
<div><h1>Trail Ready</h1><p class="sub">An 8-week beginner hiking training plan. Walks, stairs and simple bodyweight moves, no gym needed, with a printable log to track every session.</p>
<div class="meta" style="margin-top:22pt"><span>28 pages</span><span>8 weeks</span><span>mi + km, lb + kg</span></div></div>""", "cover photo")

# 2 who it's for
page("""<div class="kicker">Start here</div><h2>Who this plan is for</h2>
<p class="lead">You have a bigger hike coming up: a national park trip, your first 10-miler, a summit with a view. You want to arrive strong, enjoy it, and still feel good the next day. You do not need a gym.</p>
<div class="cols" style="margin-top:6pt">
<div><h3>This plan is a good fit if you</h3><ul class="check"><li>Can walk for about 20 to 30 minutes at an easy pace today</li><li>Are new to hiking, or coming back after a long break</li><li>Have 8 weeks before your big hike (or want a solid base)</li><li>Can train 5 days a week, mostly 20 to 45 minutes on weekdays</li><li>Prefer simple sessions you can do at home or near home</li></ul></div>
<div><h3>What you need</h3><ul class="check"><li><b>Shoes</b> you will hike in: trail runners or hiking shoes, broken in during this plan</li><li><b>A daypack</b> with a hip belt if you have one</li><li><b>Water bottles</b>: they double as pack weight</li><li><b>Stairs or a hill</b>: a stairwell, bleachers, a parking garage or a local hill</li><li><b>A sturdy chair</b> and a step or the bottom stair</li><li><b>A watch or phone</b> to time sessions</li></ul></div></div>
<div class="box forest"><h3>What you will build in 8 weeks</h3><p style="margin:0">Legs that handle long climbs, knees and ankles used to the way down, a back and hips used to carrying a pack, and the confidence of knowing your shoes, socks, food and pace before the big day. Step by step, with an easier week in the middle.</p></div>
<h3>How to use this plan</h3>
<p>Read pages 3 to 7 once. Then print one week page at a time (pages 8 to 15) and stick it on the fridge. Write every session in the log on pages 20 to 23. If life gets in the way, repeat a week rather than skipping ahead.</p>""")

# 3 before you start
page("""<div class="kicker">Before you start</div><h2>A quick self-check</h2>
<p class="lead">Most healthy adults can start a walking and bodyweight plan like this one. Answer these questions honestly first.</p>
<div class="qs">
<div class="qr"><span>Has a doctor ever told you that you have a heart condition or high blood pressure?</span><span class="yn"><span><i></i>Yes</span><span><i></i>No</span></span></div>
<div class="qr"><span>Do you get chest pain or pressure at rest, during daily activity or during exercise?</span><span class="yn"><span><i></i>Yes</span><span><i></i>No</span></span></div>
<div class="qr"><span>In the past year, have you lost your balance from dizziness or fainted?</span><span class="yn"><span><i></i>Yes</span><span><i></i>No</span></span></div>
<div class="qr"><span>Do you have a bone, joint or back problem that gets worse with activity?</span><span class="yn"><span><i></i>Yes</span><span><i></i>No</span></span></div>
<div class="qr"><span>Do you have a long-term health condition, or take medicine for one?</span><span class="yn"><span><i></i>Yes</span><span><i></i>No</span></span></div>
<div class="qr"><span>Are you pregnant, or did you give birth in the last few months?</span><span class="yn"><span><i></i>Yes</span><span><i></i>No</span></span></div>
<div class="qr"><span>Are you recovering from an injury, illness or surgery?</span><span class="yn"><span><i></i>Yes</span><span><i></i>No</span></span></div>
</div>
<div class="box"><h3 style="margin-top:0">If you answered yes to any question</h3><p style="margin:0">Talk to your doctor before you start, and take this plan with you. Ask which parts are right for you. A longer free screening form, the PAR-Q+, is at eparmedx.com.</p></div>
<h3>Listen to your body</h3>
<p>Training should feel like effort, not pain. Slow down if you cannot speak in short sentences. Feeling tired and a bit sore the next day is normal. Sharp pain, joint pain or pain that makes you limp is not: page 19 explains the difference.</p>
<div class="warn"><b>Stop right away and call 911</b> (US and Canada) if you have chest pain or pressure, severe shortness of breath, fainting, or a racing or irregular heartbeat that does not settle with rest.</div>""")

# 4 how the plan works
page("""<div class="kicker">How it works</div><h2>Five short sessions a week</h2>
<p class="lead">Every week has three walking or hiking days, two strength days and two rest days. Sessions grow a little each week, and week 4 is easier on purpose.</p>
<div class="sched">
<div class="st"><b>Mon</b>Strength<br>20 to 30 min</div>
<div><b>Tue</b>Brisk walk</div>
<div class="st"><b>Wed</b>Strength<br>20 to 30 min</div>
<div><b>Thu</b>Stairs and hills</div>
<div><b>Fri</b>Rest</div>
<div class="on"><b>Sat</b>Long hike with pack</div>
<div><b>Sun</b>Rest</div></div>
<p>Move the days to fit your week. Two rules: keep a rest day before the long hike, and do not do two long or hard days in a row.</p>
<h3>How hard? Use the talk test</h3>
<div class="talk"><div><b>Easy</b>You can chat in full sentences. Warm-ups, cool-downs, easier weeks.</div><div><b>Brisk</b>You can talk, but not sing. Most walks and long hikes.</div><div><b>Hard</b>Only a few words at a time. Short stair and hill climbs only.</div></div>
<div class="cols" style="margin-top:10pt">
<div><h3>Make it easier</h3><ul class="check"><li>Shorten the session by 10 minutes</li><li>Use the easier strength versions</li><li>Carry less pack weight</li><li>Repeat the week before moving on</li></ul></div>
<div><h3>Make it harder</h3><ul class="check"><li>Pick hillier routes</li><li>Use the harder strength versions</li><li>Add one round of strength moves</li><li>Add 2 to 3 lb (1 kg) to the pack, not more</li></ul></div></div>
<p class="small" style="margin-top:6pt">This plan follows the spirit of the CDC guidelines for adults: at least 150 minutes of moderate activity a week, plus muscle-strengthening on 2 or more days.</p>""")

# 5 warm-up and cool-down
def mv(key, tag, name, text):
    return f'<div class="mv">{SV[key]}<div><div class="t">{tag}</div><h3>{name}</h3><p>{text}</p></div></div>'
page(f"""<div class="kicker">Every session</div><h2>Warm-up and cool-down</h2>
<p style="margin-bottom:8pt">Five to eight minutes before every session and five to ten after. Move gently: no bouncing, no forcing a stretch.</p>
<h3 style="margin-top:4pt">Warm-up</h3>
<div class="moves">
{mv("march", "2 to 3 min", "March or easy walk", "March on the spot or walk slowly. Swing your arms. Let your breathing pick up a little.")}
{mv("ankle", "10 each way", "Ankle circles", "Lift one foot and draw slow circles with your toes. Both directions, both feet.")}
{mv("legswing", "10 each leg", "Leg swings", "Hold a wall or tree. Swing one leg forward and back, small at first, then a bit bigger.")}
{mv("hips", "10 each way", "Hip circles", "Hands on hips, feet apart. Draw big slow circles with your hips.")}
</div>
<h3>Cool-down: walk slowly 3 to 5 minutes, then hold each stretch 20 to 30 seconds per side</h3>
<div class="moves">
{mv("calf", "Calf", "Wall calf stretch", "Hands on a wall, one foot back, heel down, back leg straight. Lean in until the calf stretches.")}
{mv("quad", "Front thigh", "Standing quad stretch", "Hold a chair. Bend one knee and hold your ankle behind you. Knees together, stand tall.")}
{mv("ham", "Back thigh", "Hamstring stretch", "One heel forward, leg straight, toes up. Bend the other knee and hinge at the hips, back flat.")}
{mv("hipflex", "Front of hip", "Kneeling hip stretch", "Kneel on a soft surface, one foot forward. Tuck your hips and shift forward gently.")}
</div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Short on time?</h3><p style="margin:0">Keep the warm-up and cut the main session shorter instead. Warm muscles and joints handle stairs, hills and strength moves better than cold ones.</p></div>""")

# 6-7 strength
def st(key, name, reps, how, easy, hard):
    return f'<div class="str">{SV[key]}<div><span class="reps">{reps}</span><h3>{name}</h3><p>{how}</p><div class="ez"><div><b>Easier</b>{easy}</div><div><b>Harder</b>{hard}</div></div></div></div>'
page(f"""<div class="kicker">Strength days</div><h2>Strength moves for hikers, part 1</h2>
<p style="margin-bottom:10pt">Do the six moves on pages 6 and 7 in a row, then rest one to two minutes: that is one round. Your week page says how many rounds. Move slowly and with control.</p>
{st("stepup", "Step-ups", "8 to 12 each leg", "Use the bottom stair or a sturdy step about 6 to 8 in (15 to 20 cm) high. Place your whole foot on the step, press through the heel and stand up tall. Step down slowly with the other foot. Finish one leg, then switch.", "A lower step. Hold a rail or wall for balance.", "A higher step, up to about 12 to 16 in (30 to 40 cm), or wear your loaded pack.")}
{st("squat", "Squat to chair", "8 to 12", "Stand in front of a sturdy chair, feet hip-width apart. Push your hips back and bend your knees until you lightly touch the seat, then stand up. Keep your chest up and your knees in line with your toes.", "Add a cushion to raise the seat, and use your hands to help.", "Lower for a slow count of three, or hover just above the seat for two seconds.")}
{st("lunge", "Reverse lunge", "8 to 10 each leg", "Stand tall. Step one foot back and bend both knees until the back knee is a few inches above the floor. Push through the front heel to return. The front knee stays over the ankle.", "Hold a chair or wall, and only bend part way.", "Wear your loaded pack, or pause for a second at the bottom.")}
<div class="box" style="margin-top:2pt"><h3 style="margin-top:0">Rounds by week</h3><table style="margin:2pt 0 0"><tr><th>Week</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr><tr><td><b>Rounds</b></td><td>1</td><td>1 to 2</td><td>2</td><td>1 to 2</td><td>2</td><td>2 to 3</td><td>2 to 3</td><td>1 to 2</td></tr><tr><td><b>Reps</b></td><td>8</td><td>10</td><td>10</td><td>10</td><td>12</td><td>12</td><td>12</td><td>10</td></tr></table><p class="small" style="margin:4pt 0 0">Reps are per leg for step-ups and lunges. Calf raises, bridges and the plank use their own numbers above.</p></div>""")
page(f"""<div class="kicker">Strength days</div><h2>Strength moves for hikers, part 2</h2>
{st("calfraise", "Calf raises", "12 to 15", "Hold a chair or counter. Rise up onto the balls of your feet as high as you can, pause, then lower slowly. Strong calves help on every climb and keep ankles steady.", "Smaller lifts, both hands on the chair.", "One leg at a time, or stand on a stair edge and lower the heels just below the step.")}
{st("bridge", "Glute bridge", "10 to 12", "Lie on your back, knees bent, feet flat and hip-width apart. Squeeze your seat and lift your hips until your shoulders, hips and knees make a straight line. Hold two seconds and lower slowly.", "A smaller lift. Rest between reps.", "Hold five seconds at the top, or lift with one leg while the other is straight.")}
{st("plank", "Forearm plank", "15 to 45 sec", "Forearms on the floor, elbows under shoulders, legs straight. Keep a straight line from head to heels and breathe normally. A strong middle helps you carry a pack and keep your balance.", "Knees down, or hands on a kitchen counter.", "Hold longer, or lift one foot for a few seconds at a time.")}
<div class="box forest"><h3>Form beats speed</h3><p style="margin:0">Slow, controlled reps build more strength than fast ones. If a move hurts a joint, switch to the easier version or skip it for that day and tell your doctor or a physical therapist if it keeps happening.</p></div>""")

# 8-15 weeks
W = [
 (1, "Find your baseline", "Get moving, test your shoes and learn the moves.",
  ("45 min", "about 2 mi / 3 km"), ("Light", "water only, about 5 lb / 2.3 kg"),
  ["Strength", "1 round, 8 reps of each move, easier versions. Learn the form."],
  ["Brisk walk", "20 to 25 min, brisk pace. Wear the shoes you will hike in."],
  ["Strength", "1 round, 8 reps. Note which moves feel hardest."],
  ["Stairs and hills", "10 min: climb steadily for 1 min, walk down slowly, repeat."],
  ["Long hike", "45 min on paths or an easy trail with your daypack."],
  "Wear your hiking shoes on every walk from today. Eight weeks is a good amount of time to break them in and find out if they rub."),
 (2, "Build the habit", "Same sessions, a little longer. Consistency matters more than speed.",
  ("1 hour", "about 2.5 mi / 4 km"), ("Light", "about 5 lb / 2.3 kg"),
  ["Strength", "1 to 2 rounds, 10 reps of each move."],
  ["Brisk walk", "25 to 30 min, brisk pace."],
  ["Strength", "1 to 2 rounds, 10 reps."],
  ["Stairs and hills", "12 min of 1-minute climbs with easy walks down."],
  ["Long hike", "1 hour on an easy trail. Note any hot spots on your feet."],
  "Socks matter as much as shoes. Wear synthetic or merino wool hiking socks, not cotton. Cotton holds sweat, and damp skin blisters more easily."),
 (3, "Add hills", "Find some climbing on your long hike and add pack weight.",
  ("1 h 15 min", "3 to 3.5 mi / 5 to 5.5 km"), ("Building", "about 8 lb / 3.6 kg"),
  ["Strength", "2 rounds, 10 reps of each move."],
  ["Brisk walk", "30 min, brisk, include a hill if you can."],
  ["Strength", "2 rounds, 10 reps."],
  ["Stairs and hills", "15 min of climbs. Keep a steady pace you could hold."],
  ["Long hike", "1 h 15 min on a trail with some ups and downs."],
  "Fit your pack: loosen all straps, tighten the hip belt on your hip bones, then the shoulder straps. The hip belt should carry most of the weight."),
 (4, "Easier week", "Shorter sessions so your body can catch up and get stronger.",
  ("1 hour", "about 3 mi / 4.8 km"), ("Building", "about 8 lb / 3.6 kg"),
  ["Strength", "1 to 2 rounds, 10 reps, focus on slow form."],
  ["Easy walk", "30 min at a relaxed pace."],
  ["Strength", "1 round, 10 reps."],
  ["Stairs and hills", "10 min at an easy, steady effort."],
  ["Long hike", "1 hour on a trail you enjoy. No need to push."],
  "Easier weeks are part of the plan, not a break from it. Your muscles adapt during rest. If you feel great, still keep this week easy."),
 (5, "Go longer", "The long hike steps up. Practice eating and drinking on the move.",
  ("1 h 30 min", "3.5 to 4 mi / 5.5 to 6.5 km"), ("Building", "about 10 lb / 4.5 kg"),
  ["Strength", "2 rounds, 12 reps. Try a harder version of one move."],
  ["Brisk walk", "35 min, brisk."],
  ["Strength", "2 rounds, 12 reps."],
  ["Stairs and hills", "18 min of climbs."],
  ["Long hike", "1 h 30 min with hills. Eat a small snack after the first hour."],
  "On any hike longer than about an hour and a half, plan a small snack every hour or so. Use training hikes to find foods you like and that sit well (page 18)."),
 (6, "Climb more", "Look for the steepest trail or longest stairs you can find.",
  ("2 hours", "4 to 5 mi / 6.5 to 8 km"), ("Near full", "about 12 lb / 5.4 kg"),
  ["Strength", "2 to 3 rounds, 12 reps, harder versions where they feel good."],
  ["Brisk walk", "40 min, brisk."],
  ["Strength", "2 to 3 rounds, 12 reps."],
  ["Stairs and hills", "20 min of climbs wearing your loaded pack."],
  ["Long hike", "2 hours with as much climbing as you can find."],
  "Practice the way down. Short steps, soft knees and poles if you have them (page 17). Descents are where tired legs slip and knees complain."),
 (7, "Longest week", "Your biggest training hike, with the pack you will carry on the day.",
  ("2 h 30 min to 3 h", "5 to 6.5 mi / 8 to 10.5 km"), ("Full", "your big-hike pack, 12 to 15 lb / 5.4 to 6.8 kg"),
  ["Strength", "2 to 3 rounds, 12 reps."],
  ["Brisk walk", "40 to 45 min, brisk."],
  ["Strength", "2 to 3 rounds, 12 reps."],
  ["Stairs and hills", "20 to 25 min of climbs with your pack."],
  ["Long hike", "2 h 30 min to 3 hours. Hold a pace you could keep all day."],
  "Is your big hike much longer or steeper than this one? Repeat weeks 6 and 7, adding 20 to 30 minutes to the long hike each time, before you move on to week 8."),
 (8, "Dress rehearsal", "Shorter weekday sessions, then a full practice of the big day.",
  ("2 h 30 min", "about 5 to 6 mi / 8 to 9.5 km"), ("Full", "everything you will bring"),
  ["Strength", "1 to 2 rounds, 10 reps. Nothing new this week."],
  ["Brisk walk", "30 min, brisk."],
  ["Strength", "1 round, 10 reps, easy."],
  ["Stairs and hills", "10 min, easy effort. Keep your legs fresh."],
  ["Dress rehearsal", "2 h 30 min with all your gear, food and timing (page 16)."],
  "In the days before the big hike, keep moving with short easy walks, sleep well and pack the night before. You will not get fitter in the last few days, but you can get tired."),
]
for n, title, lead, hike, pack, mon, tue, wed, thu, sat, tip in W:
    rows = [("Mon", *mon), ("Tue", *tue), ("Wed", *wed), ("Thu", *thu), ("Fri", "Rest", "Rest, or a gentle 15-minute stroll and stretch."), ("Sat", *sat), ("Sun", "Rest", "Rest. Check your feet and gear, write in your log.")]
    trs = "".join(f'<tr class="{"rest" if s == "Rest" else ""}"><td class="d">{d}</td><td class="s">{s}</td><td>{t}</td><td class="c"><i></i></td></tr>' for d, s, t in rows)
    page(f"""<div class="kicker">Week {n} of 8</div><h2>{title}</h2>
<p class="lead" style="margin-bottom:8pt">{lead}</p>
<div class="wk"><div><div class="l">Long hike</div><div class="v">{hike[0]}<small>{hike[1]}</small></div></div>
<div><div class="l">Pack weight</div><div class="v">{pack[0]}<small>{pack[1]}</small></div></div>
<div><div class="l">Week dates</div><div class="v" style="border-bottom:0.8pt solid #CFC7B6;height:20pt"></div></div></div>
<table class="days"><tr><th>Day</th><th>Session</th><th>What to do</th><th>Done</th></tr>{trs}</table>
<p class="small">Every session starts with the warm-up and ends with the cool-down (page 5). Distances are a guide at an easy trail pace of about 2 mph (3.2 km/h). Time on your feet matters more than distance.</p>
<div class="box forest"><h3>Tip of the week</h3><p style="margin:0">{tip}</p></div>
<div class="lab">My notes this week</div><div class="wl" style="height:25pt"></div><div class="wl" style="height:25pt"></div><div class="wl" style="height:25pt"></div>""")

# 16 dress rehearsal
page("""<div class="kicker">Week 8</div><h2>The dress rehearsal hike</h2>
<p class="lead">Do the long hike of week 8 exactly the way you will do the big day. The goal is not to go far. It is to find out what works before it matters.</p>
<div class="cols">
<div><h3>Do it like the real day</h3><ul class="check"><li>Same shoes and the same socks</li><li>Same pack, packed with everything on your list (page 25)</li><li>Same amount of water and the same snacks</li><li>Same breakfast, eaten at the same time before you start</li><li>Same layers, rain jacket and hat</li><li>Poles at the length you will use</li><li>Start at the time you plan to start</li><li>Set a turnaround time and stick to it</li></ul></div>
<div><h3>Write it down</h3>
<div class="fl">Total time<span class="u"><b></b>h <b></b>min</span></div>
<div class="fl">Distance<span class="u"><b></b>mi / <b></b>km</span></div>
<div class="fl">Climb, if known<span class="u"><b></b>ft / <b></b>m</span></div>
<div class="fl">My pace<span class="u"><b></b>min per mi / km</span></div>
<div class="fl">Water left at the end<span class="u"><b></b></span></div>
<div class="fl">Food left at the end<span class="u"><b></b></span></div>
<div class="lab">What rubbed, pinched or hurt</div><div class="wl" style="height:22pt"></div><div class="wl" style="height:22pt"></div>
<div class="lab">What I carried but did not need</div><div class="wl" style="height:22pt"></div>
<div class="lab">What I wished I had</div><div class="wl" style="height:22pt"></div></div></div>
<div class="box"><h3 style="margin-top:0">Use your pace to plan the big day</h3><p style="margin:0">Your rehearsal pace tells you roughly how long the big hike will take. Plan extra time for steeper climbs, breaks, photos and a slower return. Then work back from sunset to set your start and turnaround times on page 26.</p></div>
<div class="lab">Change before the big day</div><div class="wl" style="height:24pt"></div><div class="wl" style="height:24pt"></div>""")

# 17 downhill
page("""<div class="kicker">Technique</div><h2>Going down, kindly on your knees</h2>
<p class="lead">Many hikers find the way down harder on the body than the way up. Gravity speeds you up and your legs work hard to brake. Good technique takes much of the strain away.</p>
<div class="ess">
<div><div class="n">1</div><div><h3>Short steps</h3><p>Take small steps, especially on steep or loose ground. Long steps make each landing harder.</p></div></div>
<div><div class="n">2</div><div><h3>Soft knees</h3><p>Keep a slight bend in your knees as you land. Never lock them straight on the way down.</p></div></div>
<div><div class="n">3</div><div><h3>Weight over your feet</h3><p>Stay upright or lean very slightly forward. Leaning back is how feet slide out from under you.</p></div></div>
<div><div class="n">4</div><div><h3>Look ahead</h3><p>Scan two or three steps in front, so you can pick flat spots and avoid loose rock and wet roots.</p></div></div>
<div><div class="n">5</div><div><h3>Use poles</h3><p>Plant them a little ahead of you. Many hikers lengthen them by a few inches (5 to 10 cm) for descents.</p></div></div>
<div><div class="n">6</div><div><h3>Slow down</h3><p>Control beats speed. Take short breaks on long descents to rest your legs and look around.</p></div></div>
</div>
<div class="cols" style="margin-top:12pt">
<div><h3>Stop toe bang</h3><p>If your toes hit the front of your shoes, re-tie your laces snug across the top of the foot before the descent. A heel-lock lacing loop at the top eyelets holds your heel back. Keep toenails trimmed short.</p></div>
<div><h3>Stay on the trail</h3><p>Follow switchbacks all the way. Cutting the corners speeds up erosion, damages plants and is often loose and slippery.</p></div></div>
<div class="box forest"><h3>Practice in training</h3><p style="margin:0">Walk down the stairs slowly on your stair days, and choose long hikes with real descents from week 3. Your legs adapt to downhill work the same way they adapt to climbing.</p></div>""")

# 18 food and water
page("""<div class="kicker">Fuel</div><h2>Food and water on training hikes</h2>
<p class="lead">You do not need a special diet to train for a hike. You need enough water, enough food, and to know what your stomach likes before the big day.</p>
<div class="cols">
<div><h3>Water</h3>
<p>Start the hike well hydrated, then sip regularly instead of drinking a lot at once. How much you need depends on heat, effort, climb and your body.</p>
<p>A common starting point is about half a liter (17 oz) per hour of moderate hiking in mild weather, and more in heat or on steep climbs. Use your training hikes to learn your own number.</p>
<p>Water is heavy: one liter weighs about 2.2 lb (1 kg). That is why it counts as pack weight.</p>
<div class="warn" style="margin-top:4pt">Signs you need more: strong thirst, dark urine, a headache or feeling dizzy. On long hot hikes, salty snacks or an electrolyte drink help replace the salt you sweat out.</div></div>
<div><h3>Food</h3>
<p>Eat a normal meal one to three hours before a long hike. On hikes longer than about an hour and a half, have a small snack every hour or so, before you feel empty.</p>
<h3 style="font-size:12pt">Easy trail snacks</h3>
<ul class="check"><li>Trail mix, nuts or seeds</li><li>Peanut butter or cheese sandwich</li><li>Granola or energy bars</li><li>Dried fruit, bananas, apples</li><li>Crackers, pretzels, jerky</li></ul>
<p>Carry one more snack than you think you need, and pack out every wrapper.</p></div></div>
<div class="box forest"><h3>Nothing new on the big day</h3><p style="margin:0">Use weeks 5 to 8 to test the exact breakfast, snacks and drinks you plan to bring. A new energy gel or a big unfamiliar meal on the morning of the big hike is a gamble you do not need to take.</p></div>
<div class="f2" style="margin-top:4pt"><div><div class="fl">Water I drink per hour<span class="u"><b></b>oz / <b></b>L</span></div><div class="fl">Breakfast that works</div></div><div><div class="fl">Snacks that work</div><div class="fl">Snacks to skip</div></div></div>""")

# 19 sore vs hurt
page("""<div class="kicker">Listen to your body</div><h2>Sore or hurt?</h2>
<p class="lead">Some muscle soreness is a normal part of getting fitter. Pain that signals an injury is different, and it needs rest, not more training.</p>
<div class="sym">
<div><h3>Normal training soreness</h3><div class="lbl">What it feels like</div><ul><li>A dull ache or stiffness in the muscles</li><li>Starts later that day or the next day</li><li>Is worst for a day or two, then fades</li><li>Feels better once you warm up and move</li></ul>
<div class="lbl">What to do</div><p>Keep moving gently: an easy walk and the cool-down stretches. If you are still very sore on a strength or hill day, do the easier version or swap it for an easy walk.</p></div>
<div><h3>Warning signs</h3><div class="lbl">What it feels like</div><ul><li>Sharp or stabbing pain</li><li>Pain in a joint (knee, ankle, hip) rather than a muscle</li><li>Swelling or bruising</li><li>Pain that makes you limp or change how you walk</li><li>Pain that gets worse as you keep going</li><li>Numbness or tingling</li></ul>
<div class="lbl">What to do</div><p>Stop that activity and rest it. If it is not clearly better within a few days, or it wakes you at night, see a doctor or physical therapist before you train on it.</p></div></div>
<div class="cols" style="margin-top:10pt">
<div><h3>Blisters start as hot spots</h3><p>The moment you feel rubbing or heat on your foot, stop and cover it with tape or a blister dressing. Two minutes now saves a painful hike later.</p></div>
<div><h3>Missed a few days?</h3><p>It happens. Pick up where you left off. If you missed a week or more, or were ill, repeat the last week you completed before moving on.</p></div></div>
<div class="em"><h3>Emergency: call 911 (US and Canada)</h3><p>Chest pain or pressure, severe shortness of breath, fainting, confusion, or a fall with a head injury or a bone that may be broken.</p></div>""")

# 20-23 logs, two weeks per page
def logweek(n):
    rows = "".join(f'<tr><td class="d">{d}</td><td></td><td></td><td></td><td></td><td></td></tr>' for d in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"])
    return f"""<div class="log"><div class="wh"><b>Week {n}</b><span>Dates ____________________</span></div>
<table><tr><th>Day</th><th style="width:2.2in">What I did</th><th>Time</th><th>mi / km</th><th>Pack lb / kg</th><th>Effort 1 to 10</th></tr>{rows}</table>
<div class="lab" style="margin-top:6pt">How I felt this week</div><div class="wl" style="height:20pt"></div></div>"""
for a in (1, 3, 5, 7):
    page(f'<div class="kicker">Training log</div><h2 style="margin-bottom:14pt">Weeks {a} and {a+1}</h2>{logweek(a)}{logweek(a+1)}')

# 24 progress
prow = "".join(f"<tr><td>{n}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>" for n in range(1, 9))
page(f"""<div class="kicker">Progress</div><h2>Watch yourself get stronger</h2>
<p class="lead" style="margin-bottom:6pt">Fill in one line at the end of each week. Look back at week 1 whenever motivation dips.</p>
<table class="prog"><tr><th>Week</th><th>Long hike time</th><th>Long hike mi / km</th><th>Pack lb / kg</th><th>Stairs and hill min</th><th>Total for the week mi / km</th><th>Felt 1 to 10</th></tr>{prow}
<tr><td style="font-size:9pt;font-family:var(--sans);font-weight:700">Total</td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>
<h3>Firsts</h3>
<div class="firsts"><div><b>First 3 miles (5 km)</b><span>Date</span></div><div><b>First 2-hour hike</b><span>Date</span></div><div><b>First full pack hike</b><span>Date</span></div><div><b>First 20 min of stairs</b><span>Date</span></div>
<div><b>First harder strength version</b><span>Date</span></div><div><b>Longest climb so far</b><span>ft / m</span></div><div><b>Favorite training trail</b><span>Name</span></div><div><b>Big hike day</b><span>Date</span></div></div>""")

# 25 pre-trip checklist
page("""<div class="kicker">Big hike</div><h2>Pre-trip checklist</h2>
<div class="cl">
<div><h3>The week before</h3><ul class="check"><li>Check trail conditions and alerts with the park or land manager</li><li>Permits or reservations booked, printed or saved</li><li>Check the weather forecast, then check it again the day before</li><li>Look up sunrise and sunset; set a turnaround time</li><li>Download an offline map of the trail</li><li>Fill in the trip plan (page 26) and give it to someone</li><li>Charge phone, headlamp and power bank</li><li>Trim toenails, check shoes and laces</li></ul>
<h3>The night before</h3><ul class="check"><li>Pack using this list and the dress rehearsal notes</li><li>Fill water bottles or bladder</li><li>Set out clothes and breakfast</li><li>Sleep early</li></ul></div>
<div><h3>The Ten Essentials (NPS)</h3><ul class="check"><li>Navigation: map, compass or GPS, offline map</li><li>Headlamp and spare batteries</li><li>Sun protection: hat, sunglasses, sunscreen</li><li>First aid kit, including blister care</li><li>Knife or multi-tool</li><li>Fire: matches or a lighter</li><li>Emergency shelter: a space blanket or bivy</li><li>Extra food</li><li>Extra water, or a way to treat it</li><li>Extra clothes: warm layer and rain jacket</li></ul>
<h3>Also</h3><ul class="check"><li>Broken-in shoes and spare socks</li><li>Trekking poles</li><li>Phone, ID, car keys, park pass</li><li>Whistle</li><li>Trash bag to pack out everything</li></ul></div></div>""")

# 26 trip plan
page("""<div class="kicker">Leave this with someone</div><h2>Trip-day plan</h2>
<p class="lead" style="margin-bottom:6pt">Give a copy to a friend or family member who is not hiking with you. If you are not back on time, they know where to send help.</p>
<div class="f2">
<div><div class="fl">Hikers' names</div><div class="fl"></div><div class="fl">Phone numbers</div><div class="fl"></div>
<div class="fl">Car: make, color</div><div class="fl">License plate</div>
<div class="fl">Trailhead and parking</div><div class="fl"></div></div>
<div><div class="fl">Date of hike</div><div class="fl">Park or area</div><div class="fl">Trail names and route</div><div class="fl"></div><div class="fl"></div>
<div class="fl">Planned distance<span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Pack and jacket colors</div><div class="fl"></div></div></div>
<div class="wk" style="margin-top:14pt"><div><div class="l">Start time</div><div class="v" style="height:22pt;border-bottom:0.8pt solid #CFC7B6"></div></div>
<div><div class="l">Turnaround time</div><div class="v" style="height:22pt;border-bottom:0.8pt solid #CFC7B6"></div></div>
<div><div class="l">Back at the car by</div><div class="v" style="height:22pt;border-bottom:0.8pt solid #CFC7B6"></div></div></div>
<div class="box forest"><h3>If we are not back</h3><p style="margin:0 0 6pt">If you have not heard from us by ______________ (time), call 911 or the park or ranger station at ______________________ and give them this page.</p></div>
<div class="lab">Anything rescuers should know</div><div class="wl" style="height:24pt"></div><div class="wl" style="height:24pt"></div>
<div class="lab">Backup plan or other trail if the first one is closed</div><div class="wl" style="height:24pt"></div>
<div class="lab">Check-in plan (when and how we will message you)</div><div class="wl" style="height:24pt"></div>
<p class="small" style="margin-top:8pt">Phone signal is patchy on many trails. Do not count on calling for help. Tell your contact as soon as you are back.</p>""")

# 27 sources
page("""<div class="kicker">Learn more</div><h2>Sources and further reading</h2>
<p class="lead">This plan gives you the basics. These sources give you more detail and today's trail conditions.</p>
<div class="src">
<div><h3>Physical activity for adults</h3><div class="url">cdc.gov/physical-activity-basics</div><p>CDC guidelines on how much activity adults need, and how to build up safely.</p></div>
<div><h3>Before you get more active</h3><div class="url">eparmedx.com</div><p>The free PAR-Q+ questionnaire, a widely used check before starting an exercise plan.</p></div>
<div><h3>The Ten Essentials</h3><div class="url">nps.gov/articles/10essentials.htm</div><p>The National Park Service list of what every hiker should carry.</p></div>
<div><h3>Parks Canada</h3><div class="url">parks.canada.ca</div><p>Trail reports, closures and safety information for Canada's national parks.</p></div>
<div><h3>Permits and reservations, US</h3><div class="url">recreation.gov</div><p>Timed entry, permits and campsites for many US parks and public lands.</p></div>
<div><h3>Weather</h3><div class="url">weather.gov and weather.gc.ca</div><p>National forecasts and warnings for the US and Canada.</p></div>
<div><h3>American Hiking Society</h3><div class="url">americanhiking.org</div><p>Beginner tips, trail etiquette and ways to find local hiking groups.</p></div>
<div><h3>Local rangers</h3><div class="url">Ranger station or visitor center</div><p>The best source of truth for your trail this week. Ask about conditions and closures.</p></div></div>
<div class="box forest"><h3>After the big hike</h3><p style="margin:0">Keep one long hike and one strength day a week and you will keep most of what you built. Then pick your next goal and start again from week 3.</p></div>""")

# 28 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:28pt">HikeSupply Co.</div>
<svg width="200" height="120" viewBox="0 0 200 120" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M10 110 L70 40 L100 75 L130 30 L190 110" stroke="#F5F1EA" stroke-width="4"/><path d="M30 112 C60 104 80 92 100 88 C122 84 128 64 146 52" stroke="#B85C38" stroke-width="3" stroke-dasharray="2 8"/><circle cx="160" cy="25" r="10" fill="#B85C38" stroke="#B85C38"/></svg>
<h2 style="margin-top:26pt">See you at the top</h2>
<p>Thank you for choosing a HikeSupply plan. Eight weeks from now you will walk up to that trailhead knowing your legs, your pack and your pace. Enjoy every step of it.</p>
<p style="margin-top:18pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:30pt">This plan is general fitness information for healthy adults and does not replace advice from your doctor or a qualified trainer. Check with a doctor before starting if you have any health concerns. Stop if you feel pain. Conditions change: check official sources before every hike. For personal use only. Cover photo: Dusan Stupar / Pexels.</p>""", "back")

css = open(os.path.join(HERE, "base.css")).read() + EXTRA
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
