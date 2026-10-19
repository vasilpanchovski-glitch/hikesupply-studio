"""Generates index.html for p03 (Winter Hiking Guide & Cold-Weather Checklist). Run: python3 gen.py"""
import os
T = "Winter Hiking Guide"
pages = []
def page(body, n, cls=""):
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if n else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def lab(t): return f'<div class="lab">{t}</div>'
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"

CSS = """<style>
@media print{html,body{background:#fff}}
body{font-size:11.3pt;line-height:1.55}
.lead{font-size:13pt}
h3{font-size:14pt}
ul.check li{padding:5pt 0 5pt 20pt}
.box,.warn{padding:12pt 15pt}
.box p,.warn,.box li{font-size:11pt}
.lab{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--forest);margin:11pt 0 3pt}
.wl{border-bottom:0.8pt solid #CFC7B6}
.f2{display:grid;grid-template-columns:1fr 1fr;gap:0 22pt}
.fl{display:flex;align-items:flex-end;gap:6pt;height:26pt;border-bottom:0.8pt solid #CFC7B6;font:600 8pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:var(--forest);padding-bottom:3pt}
.fl .u{margin-left:auto;font-weight:500;color:#8B8577;letter-spacing:.04em;text-transform:none;font-size:8.5pt}
.fl .u b{display:inline-block;width:0.5in}
.opts{display:flex;flex-wrap:wrap;gap:4pt 12pt;font-size:9pt;margin-top:5pt}
.opts span::before{content:"";display:inline-block;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-right:5pt;vertical-align:-1pt;background:#fff}
.sketch{border:1pt solid #CFC7B6;border-radius:8pt;background:#fff;position:relative}
.sketch span{position:absolute;left:10pt;top:8pt;font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:#A39C8D}
.big{font-size:11.5pt;line-height:1.55}
.diff{display:grid;grid-template-columns:1fr 1fr;gap:12pt}
.diff>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:13pt 14pt}
.diff h3{margin:0 0 5pt}
.diff p{margin:0;font-size:11pt;line-height:1.5}
.tag{display:inline-block;font:700 7pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay);margin-bottom:6pt}
.timeline{display:grid;grid-template-columns:repeat(5,1fr);gap:0;margin:10pt 0 4pt;border-top:3pt solid var(--forest);}
.timeline div{padding:9pt 8pt 0 0;font-size:10pt;line-height:1.35;position:relative}
.timeline div::before{content:"";position:absolute;top:-8pt;left:0;width:11pt;height:11pt;border-radius:50%;background:var(--paper);border:2.5pt solid var(--forest)}
.timeline div.hot::before{border-color:var(--clay);background:var(--clay)}
.timeline b{display:block;font:600 12pt/1.2 var(--serif);color:var(--forest);margin-bottom:2pt}
.layers{display:grid;grid-template-columns:repeat(3,1fr);gap:10pt;margin:10pt 0}
.layers>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:12pt;position:relative}
.layers .num{font:600 26pt/1 var(--serif);color:var(--clay)}
.layers h3{margin:6pt 0 4pt}
.layers p{font-size:10.5pt;margin:0 0 6pt}
.layers .eg{font-size:9.5pt;color:#6B6B66;border-top:0.6pt solid var(--line);padding-top:5pt}
.sym{display:grid;grid-template-columns:1fr 1fr;gap:10pt}
.sym>div{border-radius:9pt;padding:11pt 13pt;background:#fff;border:1pt solid var(--line)}
.sym h3{margin:0 0 5pt;font-size:12.5pt}
.sym .lbl{font:700 7pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage);margin:7pt 0 3pt}
.sym p,.sym li{font-size:10.3pt;line-height:1.45}
.sym ul{margin:0;padding-left:13pt}
.em{background:var(--forest);color:var(--stone);border-radius:9pt;padding:12pt 15pt;margin-top:10pt}
.em h3{color:var(--stone);margin:0 0 4pt}
.em p{margin:0;font-size:11pt}
.ess{display:grid;grid-template-columns:1fr 1fr;gap:8pt 14pt}
.ess>div{display:grid;grid-template-columns:26pt 1fr;gap:8pt;padding:11pt 0;border-bottom:0.6pt solid var(--line)}
.ess .n{font:600 16pt/1 var(--serif);color:var(--clay)}
.ess h3{margin:0 0 3pt;font-size:13pt}
.ess p{margin:0;font-size:10.2pt;line-height:1.42}
.cl{display:grid;grid-template-columns:1fr 1fr;gap:4pt 22pt}
.cl h3{margin:10pt 0 2pt;font-size:12pt}
.cl ul.check li{font-size:10.5pt;padding:5.5pt 0 5.5pt 19pt}
.ltab td{font-size:10pt;line-height:1.4;padding:8pt 6pt}
.ltab td:first-child{font-weight:600;color:var(--forest);white-space:nowrap}
.cards{display:grid;grid-template-columns:1fr 1fr;gap:0}
.qc{border:1.2pt dashed #A39C8D;padding:18pt 18pt;height:4.6in;background:#fff;margin:-0.6pt}
.qc h3{margin:0 0 8pt;font-size:15pt}
.qc .kicker{margin-bottom:5pt}
.qc ul.check li{font-size:10pt;padding:4pt 0 4pt 18pt}
.qc ul.check li::before{width:9pt;height:9pt;top:4pt}
.qc p{font-size:10pt;margin:0 0 7pt}
.hikehead{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2pt solid var(--forest);padding-bottom:6pt;margin-bottom:4pt}
.hikehead .no{font:600 24pt/1 var(--serif);color:var(--forest)}
.hikehead .no small{font:700 8pt/1 var(--sans);letter-spacing:.16em;color:var(--clay);display:block;margin-bottom:6pt;text-transform:uppercase}
.src{display:grid;grid-template-columns:1fr 1fr;gap:10pt}
.src>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:15pt 15pt;min-height:1.45in}
.src h3{margin:0 0 3pt;font-size:12pt}
.src .url{font:600 9pt/1.3 var(--sans);color:var(--clay);margin-bottom:4pt}
.src p{margin:0;font-size:10.5pt;line-height:1.42}
.back{background:var(--forest);color:var(--stone);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
.back h2{color:var(--stone)}
.back p{color:#D9DED6;max-width:4.6in}
html.bw .page{background:#fff}
html.bw{--forest:#222;--clay:#444;--sage:#666;--rust:#333;--soft:#fff}
html.bw .cover,html.bw .back{background:#fff;color:#222;border:2pt solid #222}
html.bw .cover h1,html.bw .back h2{color:#222}
html.bw .cover .sub,html.bw .cover .meta,html.bw .cover .brand,html.bw .back p,html.bw .back .brand{color:#333 !important}
html.bw .cover svg *{fill:none !important;stroke:#222 !important}
html.bw .box,html.bw .em{background:#fff;border:0.8pt solid #999;color:#222}
html.bw .em h3,html.bw .box.forest,html.bw .box.forest h3{color:#222}
html.bw .warn{background:#fff}
html.bw .timeline div::before{background:#fff}
html.bw .timeline div.hot::before{background:#444}
</style>"""

# ---------- 1 cover
page('''<div class="brand">HikeSupply Co.</div>
<div class="art"><svg width="480" height="350" viewBox="0 0 480 350" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle cx="372" cy="70" r="24" stroke="#F5F1EA" stroke-width="3"/>
<path d="M0 290 L130 110 L195 190 L282 80 L480 290 Z" fill="#3C5040" stroke="#F5F1EA" stroke-width="3.5"/>
<path d="M106 143 L130 110 L156 142 L144 136 L132 150 L120 137 Z" fill="#F5F1EA" stroke="#F5F1EA" stroke-width="2"/>
<path d="M248 123 L282 80 L318 126 L302 118 L284 136 L266 118 Z" fill="#F5F1EA" stroke="#F5F1EA" stroke-width="2"/>
<path d="M0 300 Q120 270 240 292 T480 285 V350 H0 Z" fill="#F5F1EA" stroke="#F5F1EA"/>
<path d="M58 300 L78 252 L98 300 Z M66 280 L78 258 L90 280" fill="#8A9A7E" stroke="#8A9A7E" stroke-width="2"/>
<path d="M398 296 L422 238 L446 296 Z" fill="#8A9A7E" stroke="#8A9A7E" stroke-width="2"/>
<path d="M360 300 L378 262 L396 300 Z" fill="#8A9A7E" stroke="#8A9A7E" stroke-width="2"/>
<path d="M130 340 C190 322 250 330 290 318 C320 309 340 304 360 304" stroke="#B85C38" stroke-width="3.5" stroke-dasharray="2 10"/>
<g stroke="#F5F1EA" stroke-width="2"><path d="M60 60 v10 M55 65 h10"/><path d="M200 40 v8 M196 44 h8"/><path d="M440 150 v8 M436 154 h8"/><path d="M30 180 v8 M26 184 h8"/></g>
</svg></div>
<div><h1>Winter Hiking Guide</h1><p class="sub">Keep hiking after the first frost. Layers, daylight, traction and the cold-weather warning signs, in plain words, plus printable checklists.</p>
<div class="meta" style="margin-top:22pt"><span>22 pages</span><span>°F + °C</span><span>Printable checklists</span></div></div>''', 0, "cover")

# ---------- 2 who for
page(f'''<div class="kicker">Start here</div><h2>Who this guide is for</h2>
<p class="lead">You already enjoy day hikes in spring and fall, and you want to keep going when the leaves drop and the trail turns white. This guide covers the step from three-season hiking to easy and moderate winter day hikes.</p>
<div class="cols" style="margin-top:6pt">
<div><h3>What it covers</h3>{chk(["Choosing a winter trail and a turnaround time", "Layering, and keeping hands and feet warm", "Traction: when boots are enough and when they are not", "Water, food, batteries and sun in the cold", "Frostnip, frostbite and hypothermia basics", "Avalanche awareness for hikers", "Checklists, a trip plan and a car kit"])}</div>
<div><h3>What it does not cover</h3><p>Winter camping, ice climbing, ski touring and travel in avalanche terrain. Those need hands-on training, and this guide tells you where to find it.</p>
<h3>How to use it</h3><p>Read pages 3 to 13 once at home. Print pages 14 to 20 and use them before every winter hike. Keep the quick-check card in your pack or your car.</p></div></div>
<div class="box forest"><h3>The three winter habits</h3><ol class="steps" style="margin:0">
<li><b>Start earlier and turn around sooner.</b> Days are short and you move slower on snow.</li>
<li><b>Stay dry.</b> Sweat and melted snow chill you faster than cold air. Vent before you sweat.</li>
<li><b>Tell someone your plan.</b> Fewer people on the trail means fewer people to help.</li></ol></div>
<div class="warn"><b>This guide is general advice.</b> Conditions change fast in winter. Always check the forecast, trail and road conditions with the park or land manager before you go, and follow their rules and closures.</div>''', 2)

# ---------- 3 winter is different
page(f'''<div class="kicker">Chapter 1</div><h2>Winter is different</h2>
<p class="lead">The same trail you hiked in October can be a very different trip in January. Four things change.</p>
<div class="diff">
<div><span class="tag">Light</span><h3>Short days</h3><p>Around the winter solstice, many US and Canadian trails get roughly 8 to 10 hours of daylight: more in the far south, less in the far north. Sunset comes early, and it gets cold fast once the sun drops behind a ridge.</p></div>
<div><span class="tag">Temperature</span><h3>Cold and wind</h3><p>Wind pulls heat from your body much faster than still air. A calm 30°F (-1°C) day can feel pleasant; the same temperature with a strong wind on an open ridge can be harsh. Check the wind forecast, not only the temperature.</p></div>
<div><span class="tag">Surface</span><h3>Snow and ice</h3><p>Snow hides the trail, blazes and roots. Packed trails turn icy where the sun melts them by day and they refreeze at night. Everything takes longer: plan on moving slower than your summer pace.</p></div>
<div><span class="tag">People</span><h3>Quiet trails</h3><p>Fewer hikers is part of the magic, but it also means less help if something goes wrong. Some roads, visitor centers and restrooms close for the season, and phone signal is just as patchy as in summer.</p></div>
</div>
<h3>Good news</h3>
<p>Winter has no bugs, no crowds and long views through bare trees. With the right layers and a sensible plan, a winter day hike is very comfortable. Start with a trail you already know from summer, so the snow is the only new thing.</p>
<div class="box"><h3 style="margin-top:0">Rule of thumb</h3><p style="margin:0">Pick a winter hike that is shorter and easier than what you would choose in summer. Once you know how you and your gear handle the cold, build up from there.</p></div>''', 3)

# ---------- 4 trail + turnaround
page(f'''<div class="kicker">Chapter 2</div><h2>Picking a trail and a turnaround time</h2>
<h3>Good first winter trails</h3>
{chk(["A trail you already hiked in summer, so you know the route", "Well used, so other hikers pack down the snow", "Below treeline and away from steep open slopes", "Short enough to finish with daylight to spare", "A trailhead on a road that is plowed in winter"])}
<h3>Plan backwards from sunset</h3>
<p>Look up sunset for the date and place of your hike. Then work backwards:</p>
<div class="timeline">
<div><b>Start</b>Leave the trailhead as early as you can.</div>
<div class="hot"><b>Turnaround</b>Head back at this time, even if you are not at the top.</div>
<div><b>Buffer</b>Extra time for slow sections, breaks and surprises.</div>
<div><b>Car</b>Back at least an hour before sunset.</div>
<div><b>Sunset</b>It gets colder and darker quickly after this.</div></div>
<div class="box" style="margin-top:14pt"><h3 style="margin-top:0">Work it out</h3>
<div class="f2"><div class="fl">Sunset today</div><div class="fl">Back at car by<span class="u">sunset minus 1 hr</span></div>
<div class="fl">Time to walk back</div><div class="fl">Turnaround time</div></div>
<p class="small" style="margin:8pt 0 0">The walk back usually takes about as long as the walk in on flat trails, and a bit less going downhill. On snow, give yourself extra.</p></div>
<h3>Turn around when</h3>
{chk(["You reach your turnaround time", "The trail gets icy or steep and you do not have the traction for it", "Anyone in the group is getting very cold, wet or tired", "The weather turns worse than forecast, or visibility drops", "You lose the trail and cannot find it again quickly"])}''', 4)

# ---------- 5 layering
page(f'''<div class="kicker">Chapter 3</div><h2>Layering: stay dry, then warm</h2>
<p class="lead">Wear several thin layers instead of one big coat. You will add and remove them all day: less while climbing, more at every stop.</p>
<div class="layers">
<div><div class="num">1</div><h3>Base layer</h3><p>Next to your skin. Moves sweat away so you stay dry.</p><p class="eg">Merino wool or synthetic long-sleeve top, and leggings on colder days.</p></div>
<div><div class="num">2</div><h3>Mid layer</h3><p>Holds warmth. Add or remove it as your effort changes.</p><p class="eg">Fleece jacket, or a light synthetic or down puffy. Bring a warm puffy for breaks.</p></div>
<div><div class="num">3</div><h3>Shell</h3><p>Blocks wind and snow. Keeps the warm layers dry.</p><p class="eg">Waterproof or wind-resistant jacket, plus shell pants for deep snow or wind.</p></div></div>
<div class="warn"><b>Skip cotton.</b> Jeans, cotton T-shirts and cotton socks hold water. Once damp with sweat or snow, they stay cold and take a long time to dry.</div>
<h3>Be bold, start cold</h3>
<p>Start walking feeling a little cool. Within ten minutes you will warm up. If you start warm, you will sweat into your layers and feel chilled at the first stop.</p>
<div class="cols">
<div><h3>While moving</h3>{chk(["Open zips to vent before you sweat", "Take a layer off on long climbs", "Keep the warm puffy in the pack"])}</div>
<div><h3>At every stop</h3>{chk(["Puffy on as soon as you stop", "Hat back on, gloves on", "Sit on a foam pad, not on snow"])}</div></div>
<div class="box"><h3 style="margin-top:0">Common layering mistakes</h3><p style="margin:0">Hiking uphill in the big puffy. One thick cotton hoodie instead of thin layers. No dry layer left for the summit or the drive home. Waiting until you are already cold to add a layer.</p></div><p class="small">For a temperature-by-temperature starting point, see the layering checklist on page 15.</p>''', 5)

# ---------- 6 hands feet head
page(f'''<div class="kicker">Chapter 4</div><h2>Hands, feet, head and neck</h2>
<p class="lead">Fingers, toes, ears and nose get cold first. Keep them warm and the rest of the day feels easy.</p>
<div class="cols">
<div><h3>Hands</h3><p>Bring two pairs: thin liner gloves for moving and warm mittens or insulated gloves for stops. Mittens are warmer than gloves because your fingers share heat. Pack a spare pair in a dry bag in case one gets wet.</p>
<h3>Feet</h3><p>Wool or synthetic socks, one pair only, not so thick that your boots feel tight. Tight boots cut circulation and make feet colder. Waterproof, insulated boots help in snow. Gaiters keep snow out of the boot top. Carry spare socks.</p></div>
<div><h3>Head and ears</h3><p>A warm hat or beanie that covers your ears. Take it off on a hard climb if you overheat and put it back on at the top.</p>
<h3>Neck and face</h3><p>A neck gaiter or buff blocks wind and can be pulled up over your nose and cheeks on exposed sections. In strong cold wind, a balaclava or face mask protects more skin.</p>
<h3>Hand and toe warmers</h3><p>Chemical warmer packets are a useful backup for stops. Follow the packet directions, and do not put them directly on bare skin for long periods.</p></div></div>
<div class="box forest"><h3>Warm-up tricks</h3><ul style="margin:0;padding-left:15pt">
<li>Cold hands: windmill your arms, or tuck your hands into your armpits for a few minutes.</li>
<li>Cold feet: keep walking, wiggle your toes, and check your laces are not too tight.</li>
<li>Eat a snack. Your body needs fuel to make heat.</li></ul></div>
<div class="box"><h3 style="margin-top:0">Buddy check</h3><p style="margin:0">You cannot see your own face. At each break, look at each other's nose, cheeks and ears for pale or white patches, and ask about fingers and toes. Catching cold skin early is the easiest fix there is.</p></div><div class="warn">If fingers or toes go numb and stay numb, or the skin turns white or gray, read page 11 and warm them now. Do not keep hiking and hope.</div>''', 6)

# ---------- 7 traction
page(f'''<div class="kicker">Chapter 5</div><h2>Traction: boots, microspikes, snowshoes</h2>
<p class="lead">The right footwear depends on the snow, not the date. Ask the park or check recent trail reports before you go.</p>
<table><tr><th style="width:24%">Conditions</th><th style="width:28%">What to use</th><th>Notes</th></tr>
<tr><td><b>Dry trail, light frost</b></td><td>Your normal hiking boots</td><td>Watch for icy patches on shady sections, bridges and rocks.</td></tr>
<tr><td><b>Packed snow, icy spots</b></td><td>Microspikes (slip-on traction with short chains and spikes)</td><td>The most useful winter item for day hikers on popular trails. Put them on before you reach the slippery part.</td></tr>
<tr><td><b>Deep, soft snow</b></td><td>Snowshoes</td><td>Stop you sinking in to your knees (postholing). Many come with crampon teeth for grip.</td></tr>
<tr><td><b>Steep ice, hard snow slopes</b></td><td>Mountaineering crampons and an ice axe</td><td>Need training. If you meet this on a hiking trail, turn back.</td></tr></table>
<div class="cols" style="margin-top:6pt">
<div><h3>Poles help</h3><p>Trekking poles give you two more points of contact on slippery ground. Swap summer baskets for wider snow baskets so they do not sink.</p>
<h3>Trail manners</h3><p>Do not walk in the tracks of cross-country skiers. On deep snow, wear snowshoes so you do not leave holes that freeze and trip the next hiker.</p></div>
<div><h3>When to turn back</h3>{chk(["The trail is steeper and icier than your traction can handle", "You are sliding even with microspikes", "Snow is deeper than expected and you have no snowshoes", "A slope above or below the trail looks steep and loaded with snow"])}</div></div>
<div class="box"><h3 style="margin-top:0">Practice at home</h3><p style="margin:0">Put your microspikes or snowshoes on in the living room once, with gloves on. At the trail, put them on before the slippery part, on flat ground. Carry microspikes in a small bag so the spikes do not tear your pack.</p></div><div class="warn"><b>Downhill is harder.</b> Most slips happen on the way down. If you struggled to climb an icy section, it will be harder to descend. Turn around before it, not after.</div>''', 7)

# ---------- 8 water food
page(f'''<div class="kicker">Chapter 6</div><h2>Water and food in the cold</h2>
<p class="lead">You still sweat and breathe out water in winter, but you feel less thirsty. Drink and eat on a schedule, not by feel.</p>
<div class="cols">
<div><h3>Keep water from freezing</h3>{chk(["Use an insulated bottle, or a bottle inside an insulated sleeve", "Store bottles upside down in your pack: ice forms at the top, which is then the bottom, so the lid does not freeze shut", "Hydration bladder hoses freeze easily. Blow the water back into the bladder after each sip, or leave the bladder at home", "Carry one insulated bottle of a warm drink for stops", "Start with warm (not boiling) water in your bottles"])}</div>
<div><h3>Eat little and often</h3><p>Your body burns extra energy staying warm and walking through snow. Snack every hour or so, even when you are not hungry.</p>
{chk(["Food that stays soft in the cold: trail mix, nuts, cheese, tortillas with nut butter, soft bars", "Keep a snack in an inside pocket so it is not frozen hard", "A warm drink or soup at the top is a big morale boost"])}</div></div>
<div class="box"><h3 style="margin-top:0">Eating snow is not a water plan</h3><p style="margin:0">Eating snow cools you down and takes a lot of snow to make a little water. On a day hike, carry all the water you need. Melting snow on a stove is a winter camping skill, outside this guide.</p></div>
<div class="box"><h3 style="margin-top:0">Signs you need to drink more</h3><p style="margin:0">Headache, unusual tiredness, feeling dizzy, or dark yellow pee. Cold air is dry and you lose water with every breath, so sip at every stop.</p></div><div class="box forest"><h3>A simple routine</h3><p style="margin:0">At every break: puffy on, a few sips, a few bites, check hands and feet, then go. Keep breaks short on cold, windy days and take them in sheltered spots.</p></div>''', 8)

# ---------- 9 batteries
page(f'''<div class="kicker">Chapter 7</div><h2>Batteries, phones and headlamps</h2>
<p class="lead">Cold drains batteries fast. A phone at 60% in a warm car can switch off on a cold summit. Plan for it.</p>
<div class="cols">
<div><h3>Phone</h3>{chk(["Charge it fully the night before", "Keep it in an inside pocket, close to your body", "Download offline maps and turn on airplane or low-power mode when you do not need signal", "Carry a small power bank, also kept warm inside your jacket", "Know how to call for help where you hike: 911 works across the US and Canada"])}</div>
<div><h3>Headlamp</h3>{chk(["Pack a headlamp every winter hike, even a short one", "Put in fresh batteries, or charge it before you go", "Carry spare batteries in a warm pocket", "Lithium AA and AAA batteries handle cold better than alkaline ones in devices that accept them"])}
<h3>Other electronics</h3><p>GPS units, satellite messengers and watches lose charge faster too. Keep them warm and carry the cable to top up from your power bank.</p></div></div>
<div class="box forest"><h3>Do not rely on one device</h3><p style="margin:0">Carry a paper map of the area as well as your phone. If your phone dies, you still know where you are and how to get back. Snow can cover trail signs and blazes, so check the map often.</p></div>
<div class="box"><h3 style="margin-top:0">No signal?</h3><p style="margin:0">Many winter trails have no phone coverage. A satellite messenger, or a phone with satellite SOS, can send a help request outside coverage. Learn how yours works at home, before you need it.</p></div><div class="warn"><b>Phone switched off in the cold?</b> Warm it inside your jacket for a few minutes before trying again. A cold battery often wakes up once it warms.</div>''', 9)

# ---------- 10 sun
page(f'''<div class="kicker">Chapter 8</div><h2>Sun and snow glare</h2>
<p class="lead">Snow reflects a large share of the sun's ultraviolet light back up at you. You can get sunburned on a cold day, under your chin and nose too.</p>
<div class="cols">
<div><h3>Protect your skin</h3>{chk(["Sunscreen on the face, ears and neck, even when it is cold", "Reapply after a few hours, or after wiping your face", "Lip balm with SPF", "A neck gaiter or buff for wind and sun"])}</div>
<div><h3>Protect your eyes</h3>{chk(["Sunglasses that block 100% of UV, ideally wraparound", "Goggles on windy or snowy days", "Spare sunglasses for longer hikes in bright snow"])}</div></div>
<div class="box"><h3 style="margin-top:0">Snow blindness</h3><p style="margin:0">Strong UV from snow can burn the surface of the eye (the medical name is photokeratitis). It often shows up hours later as painful, gritty, watery eyes and blurry vision. It is easy to prevent with good sunglasses. If it happens, get out of bright light and see a doctor or eye care professional.</p></div>
<h3>Higher means stronger</h3>
<p>UV gets stronger the higher you go, and clear mountain air lets more of it through. A sunny winter day at altitude on fresh snow is one of the strongest sun exposures a hiker can get, even when the air feels freezing.</p>
<h3>Sun check at every break</h3><div class="opts" style="font-size:10.5pt;gap:6pt 16pt"><span>Sunglasses on</span><span>Sunscreen on nose, cheeks and ears</span><span>Lip balm</span><span>Neck gaiter up on open snow</span><span>Kids covered too</span></div><div class="box forest"><h3>Cloudy days too</h3><p style="margin:0">UV passes through thin cloud. Wear sunglasses and sunscreen on bright overcast days as well, especially on open snow.</p></div>''', 10)

# ---------- 11 warning signs
page(f'''<div class="kicker">Chapter 9</div><h2>Cold-weather warning signs</h2>
<p>Know the early signs, act early, and get help when it is serious. This is a short overview, not medical training. A wilderness first aid course is the best next step.</p>
<div class="sym">
<div><h3>Frostnip</h3><div class="lbl">What you notice</div><p>Skin on fingers, toes, cheeks, ears or nose feels cold, tingly or numb and looks red or pale. It is an early warning.</p>
<div class="lbl">What to do</div><ul><li>Warm the area now with body heat: hands in armpits, a warm palm over the face</li><li>Get out of the wind, add layers</li><li>Skin should return to normal as it warms</li></ul></div>
<div><h3>Frostbite</h3><div class="lbl">What you notice</div><p>Skin goes numb and looks white, grayish-yellow or waxy, and may feel hard or firm.</p>
<div class="lbl">What to do</div><ul><li>Get to shelter and seek medical care</li><li>Do not rub the area or rub it with snow</li><li>Do not use a fire, heater or heat pack directly on it: numb skin burns easily</li><li>Do not thaw it if it could freeze again before you reach help</li></ul></div>
<div style="grid-column:1 / -1"><h3>Hypothermia</h3>
<div class="cols" style="gap:0 18pt"><div><div class="lbl">What you notice</div><ul><li>Shivering, clumsy hands, stumbling</li><li>Confusion, poor decisions, slurred speech</li><li>Unusual tiredness or drowsiness</li><li>The person may not realize anything is wrong</li></ul></div>
<div><div class="lbl">What to do</div><ul><li>Get out of wind and wet, into shelter if possible</li><li>Replace wet clothes with dry ones, add hat and layers, insulate from the ground</li><li>Warm, sweet drinks only if the person is fully alert and can swallow</li><li>Handle gently, stay with them, call for help early</li></ul></div></div></div></div>
<div class="em"><h3>Call 911 when</h3><p>someone is confused, very drowsy, stops shivering while still cold, or is hard to wake; or frostbite is likely. Keep them warm and still while you wait. These are signs of a medical emergency.</p></div>
<p class="small" style="margin-top:8pt">Based on public guidance from the US Centers for Disease Control and Prevention (CDC) and the National Park Service. See page 21.</p>''', 11)

# ---------- 12 avalanche
page(f'''<div class="kicker">Chapter 10</div><h2>Avalanche awareness</h2>
<p class="lead">Avalanches are not only a skier problem. Some popular hiking trails in the mountains cross or run below avalanche paths in winter.</p>
<div class="box forest"><h3>The simple rule for hikers</h3><p style="margin:0">If you have not taken an avalanche course and you are not carrying a transceiver, shovel and probe with partners who know how to use them, stay out of avalanche terrain. That includes the open slopes above you and the gullies and flats below them.</p></div>
<div class="cols">
<div><h3>What avalanche terrain looks like</h3>{chk(["Open slopes, often as steep as an expert ski run", "Most avalanches start on slopes of around 30 to 45 degrees", "Gullies, bowls and chutes that funnel snow", "Flat ground at the bottom of a steep slope, where snow lands (the runout)", "Trees with broken tops or missing branches on the uphill side"])}</div>
<div><h3>Before you go</h3>{chk(["Check the avalanche forecast for the area: avalanche.org in the US, avalanche.ca in Canada", "Ask the ranger station whether your trail crosses avalanche paths", "Pick trails in the trees, on gentle ground, away from steep open slopes", "Be extra careful after heavy snow, strong wind or a fast warm-up"])}</div></div>
<h3>Warning signs on the trail</h3>
{chk(["Recent avalanches on similar slopes", "Cracks shooting out from your feet in the snow", "A &ldquo;whumpf&rdquo; sound as the snowpack settles under you", "Heavy new snow or snow blown into deep drifts"])}
<div class="warn"><b>Any of these signs means turn around</b> and go back the way you came, staying on low-angle ground. Want to go further into the mountains in winter? Take an avalanche course first (avalanche.org and avalanche.ca list them).</div>''', 12)

# ---------- 13 winter ten essentials
ess = [("Navigation", "Paper map, compass, phone with offline map. Snow hides the trail."),
       ("Headlamp", "Fresh batteries plus spares, kept warm. Always, even on short hikes."),
       ("Sun protection", "Sunglasses or goggles, sunscreen, SPF lip balm."),
       ("First aid", "A basic kit plus blister care, and hand and toe warmers."),
       ("Knife or multitool", "Small repairs to straps, gaiters and snowshoe bindings."),
       ("Fire", "Lighter and waterproof matches. For emergencies only, where allowed."),
       ("Emergency shelter", "A bivy bag or space blanket, and a small foam pad to sit on."),
       ("Extra food", "More than you plan to eat, soft enough to eat frozen."),
       ("Extra water", "Insulated bottle, plus a warm drink in a vacuum flask."),
       ("Extra clothes", "Warm puffy, spare hat, spare gloves or mittens, spare socks.")]
eb = "".join(f'<div><div class="n">{i}</div><div><h3>{h}</h3><p>{p}</p></div></div>' for i, (h, p) in enumerate(ess, 1))
page(f'''<div class="kicker">Chapter 11</div><h2>The winter Ten Essentials</h2>
<p class="lead">The classic Ten Essentials list, with the changes winter adds. Carry all ten on every winter hike, even short ones.</p>
<div class="ess">{eb}</div>
<div class="box" style="margin-top:12pt"><h3 style="margin-top:0">Winter extras</h3><p style="margin:0">Traction for the conditions (microspikes or snowshoes), trekking poles with snow baskets, gaiters, a whistle, and a small trash bag. A fully charged power bank, kept warm.</p></div>
<p class="small">The Ten Essentials list was first published by The Mountaineers. The winter notes here are ours.</p>''', 13)

# ---------- 14 checklist
page(f'''<div class="kicker">Printable checklist</div><h2>Winter day-hike checklist</h2>
<p>Print one for each hike. Tick items as you pack them, then do the car check at the trailhead.</p>
<div class="cl">
<div><h3>Clothing (wear)</h3>{chk(["Base layer top and bottom", "Hiking pants (not jeans)", "Fleece or mid layer", "Wool or synthetic socks", "Insulated waterproof boots", "Gaiters", "Hat or beanie", "Liner gloves"])}
<h3>Clothing (pack)</h3>{chk(["Warm puffy jacket", "Waterproof shell jacket", "Shell pants", "Mittens or warm gloves", "Spare gloves and socks (dry bag)", "Neck gaiter or balaclava"])}</div>
<div><h3>Gear</h3>{chk(["Microspikes or snowshoes", "Trekking poles with snow baskets", "Map, compass, phone with offline map", "Headlamp and spare batteries", "Power bank (warm pocket)", "First aid kit, hand and toe warmers", "Emergency bivy or space blanket", "Sit pad", "Sunglasses, sunscreen, lip balm", "Whistle, lighter, knife"])}
<h3>Food and water</h3>{chk(["Insulated water bottles", "Hot drink in a vacuum flask", "Snacks plus extra food"])}</div></div>
<div class="box"><h3 style="margin-top:0">Before you leave the car</h3><div class="opts" style="font-size:9.5pt"><span>Trip plan left with someone</span><span>Sunset time checked</span><span>Turnaround time set</span><span>Forecast and avalanche forecast checked</span><span>Phone charged</span></div></div>''', 14)

# ---------- 15 layering table
page(f'''<div class="kicker">Printable checklist</div><h2>What to wear by temperature</h2>
<p>A starting point for a moderate winter day hike. Adjust for wind, sun, effort and how warm or cold you run. Always pack one warm layer more than you think you need.</p>
<table class="ltab"><tr><th>Air temperature</th><th>While moving</th><th>Pack for stops and emergencies</th></tr>
<tr><td>40 to 50°F<br>4 to 10°C</td><td>Light base layer, light fleece if windy, light gloves, thin hat or headband</td><td>Shell jacket, fleece, spare socks</td></tr>
<tr><td>25 to 40°F<br>-4 to 4°C</td><td>Midweight base layer, fleece, liner gloves, beanie, wool socks</td><td>Warm puffy, shell jacket, mittens, neck gaiter</td></tr>
<tr><td>10 to 25°F<br>-12 to -4°C</td><td>Midweight base top and bottom, fleece, shell if windy, warm gloves, beanie, neck gaiter</td><td>Warm puffy, shell pants, mittens over liners, spare hat and gloves, warmers</td></tr>
<tr><td>Below 10°F<br>Below -12°C</td><td>Heavy base layers, fleece, shell, mittens, balaclava, goggles</td><td>Very warm puffy, all spares. For experienced winter hikers: keep the hike short and close to the car</td></tr></table>
<div class="box"><h3 style="margin-top:0">Wind changes everything</h3><p style="margin:0">On exposed ridges and summits, wind can make any of these rows feel one row colder. Check the wind forecast and put your shell on before you step out of the trees.</p></div>
<h3>My own notes</h3>
<p class="small" style="margin:0 0 2pt">After each hike, write what you wore and how it felt. In a few weeks you will know your own perfect layering.</p>
<table class="tbl"><tr><th style="width:22%">Temp and wind</th><th>What I wore</th><th style="width:26%">Too warm / too cold?</th></tr>
<tr><td style="height:28pt"></td><td></td><td></td></tr><tr><td style="height:28pt"></td><td></td><td></td></tr><tr><td style="height:28pt"></td><td></td><td></td></tr><tr><td style="height:28pt"></td><td></td><td></td></tr><tr><td style="height:28pt"></td><td></td><td></td></tr><tr><td style="height:28pt"></td><td></td><td></td></tr><tr><td style="height:28pt"></td><td></td><td></td></tr></table>''', 15)

# ---------- 16 trip plan
page(f'''<style>.tp .fl{{height:32pt}} .tp .wl{{height:30pt !important}}</style><div class="tp"><div class="kicker">Printable</div><h2>Trip plan to leave with someone</h2>
<p>Fill this in and give it (or a photo of it) to someone who is not on the hike. If you are not back by the "call for help" time, they should call 911 or the park and share this page.</p>
<div class="f2"><div class="fl">Hiker names</div><div class="fl">Date</div>
<div class="fl">Trail and park</div><div class="fl">Trailhead / parking</div>
<div class="fl">Car make, color, plate</div><div class="fl">Planned route</div>
<div class="fl">Start time</div><div class="fl">Turnaround time</div>
<div class="fl">Expected back by</div><div class="fl">Call for help if not back by</div></div>
{lab("Clothing colors (jackets, packs)")}{lines(1)}
{lab("Gear we carry")}<div class="opts"><span>Microspikes</span><span>Snowshoes</span><span>Headlamps</span><span>Emergency shelter</span><span>Satellite messenger</span><span>First aid kit</span><span>Stove / hot drink</span></div>
{lab("Phone numbers of the group")}{lines(2)}
{lab("Park or ranger station phone")}{lines(1)}
{lab("Other notes (medical needs, plan B route)")}{lines(2)}
<div class="box forest" style="margin-top:14pt"><h3>For the person at home</h3><p style="margin:0">If the call-for-help time passes and you cannot reach them, call 911 (or the park's emergency number). Read them this page. Do not drive out to search alone.</p></div></div>''', 16)

# ---------- 17 car kit
page(f'''<div class="kicker">Printable checklist</div><h2>Car kit for winter trailheads</h2>
<p class="lead">Winter trailheads can be remote, unplowed or icy, and the drive home starts when you are tired and cold. Keep these in the car all season.</p>
<div class="cl">
<div><h3>Road and car</h3>{chk(["Full tank of gas (or charge) before the last town", "Ice scraper and snow brush", "Small shovel", "Sand, cat litter or traction mats", "Jumper cables or a jump starter", "Tire chains if the road requires them", "Flashlight and spare batteries"])}</div>
<div><h3>Warmth and comfort</h3>{chk(["Blanket or old sleeping bag", "Dry change of clothes and socks for the drive home", "Spare warm hat and gloves", "Thermos of hot drink or soup", "Water and snacks", "Phone charger cable", "Towel for wet boots and gear"])}</div></div>
<h3>Before you drive</h3>
{chk(["Check road conditions and closures: some park roads and gates close for winter", "Check whether the road needs 4WD, AWD or chains", "Check where the trailhead parking is plowed, and park where you will not block the plow", "Note the closest place with phone signal on the way in"])}
<div class="warn"><b>If you get stuck on the road</b>, stay with your car unless help is very close and in sight. Keep the exhaust pipe clear of snow if the engine is running, and run it only for short periods with a window opened slightly.</div>''', 17)

# ---------- 18 quick cards
qc1 = f'''<div class="kicker">Before the hike</div><h3>Winter quick check</h3>{chk(["Forecast, wind and avalanche forecast checked", "Sunset time and turnaround time", "Trip plan left with someone", "Traction for the conditions", "Headlamp, map, phone charged", "Puffy, spare gloves and socks", "Hot drink and extra food"])}'''
qc2 = '''<div class="kicker">On the trail</div><h3>Turn around if</h3><ul class="check"><li>It is turnaround time</li><li>The ice is beyond your traction</li><li>Someone is very cold, wet or tired</li><li>Weather or visibility gets worse</li><li>You lose the trail</li><li>You see avalanche warning signs</li></ul><p><b>Be bold, start cold.</b> Vent before you sweat.</p>'''
qc3 = '''<div class="kicker">Cold injuries</div><h3>Warning signs</h3><p><b>Frostnip:</b> red or pale, tingly skin. Warm it with body heat now.</p><p><b>Frostbite:</b> numb, white, waxy or hard skin. No rubbing, no direct heat. Get medical care.</p><p><b>Hypothermia:</b> shivering, stumbling, confusion, slurred speech. Shelter, dry layers, insulate, call for help.</p><p><b>Emergency: call 911.</b></p>'''
qc4 = f'''<div class="kicker">My details</div><h3>In case of emergency</h3><div class="fl">Name</div><div class="fl">Emergency contact</div><div class="fl">Phone</div><div class="fl">Medical notes</div><div class="fl">Trail today</div><p class="small" style="margin-top:8pt">Cut out the four cards along the dashed lines. Keep them in your pack lid or a zip bag.</p>'''
page(f'''<div class="cards"><div class="qc">{qc1}</div><div class="qc">{qc2}</div><div class="qc">{qc3}</div><div class="qc">{qc4}</div></div>''', 18)

# ---------- 19-20 logs
def log(n):
    page(f'''<div class="hikehead"><div class="no"><small>Winter hike log</small>Hike ______</div><div class="fl" style="width:2.6in;height:20pt">Date</div></div>
<div class="f2"><div class="fl">Trail and park</div><div class="fl">Who came</div>
<div class="fl">Distance<span class="u"><b></b> mi / <b></b> km</span></div><div class="fl">Elevation gain<span class="u"><b></b> ft / <b></b> m</span></div>
<div class="fl">Start / turnaround / finish</div><div class="fl">Sunset</div>
<div class="fl">Temperature<span class="u"><b></b> °F / <b></b> °C</span></div><div class="fl">Wind</div></div>
{lab("Conditions")}<div class="opts"><span>Dry</span><span>Frost</span><span>Packed snow</span><span>Deep snow</span><span>Ice</span><span>Slush and mud</span><span>Sunny</span><span>Cloudy</span><span>Snowing</span></div>
{lab("Traction used")}<div class="opts"><span>Boots only</span><span>Microspikes</span><span>Snowshoes</span><span>Poles</span></div>
{lab("What I wore, and was it right?")}{lines(2)}
{lab("Hands and feet: warm enough? What would I change?")}{lines(2)}
{lab("Best moment")}{lines(2)}
<div class="sketch" style="height:2.1in;margin-top:12pt"><span>Sketch, map or photo</span></div>
{lab("Next time I will")}{lines(1)}''', n)
log(19); log(20)

# ---------- 21 sources
src = [("National Park Service", "nps.gov", "Each park's page lists winter road closures, trail conditions and alerts. Call the visitor center for current conditions."),
       ("Parks Canada", "parks.canada.ca", "Trail reports, winter closures and safety notes for Canada's national parks."),
       ("Avalanche forecasts, US", "avalanche.org", "Links to every regional avalanche center, daily forecasts and course listings."),
       ("Avalanche Canada", "avalanche.ca", "Daily avalanche forecasts for Canada, plus free online tutorials and course finder."),
       ("Weather, US", "weather.gov", "National Weather Service forecasts, including wind and winter weather warnings."),
       ("Weather, Canada", "weather.gc.ca", "Environment Canada forecasts and weather warnings."),
       ("Cold injuries", "cdc.gov/winter-weather", "CDC guidance on frostbite and hypothermia: signs and first aid."),
       ("Local rangers", "Ranger station or visitor center", "The best source of truth for your trail this week. Ask about snow depth, ice and traction.")]
sb = "".join(f'<div><h3>{h}</h3><div class="url">{u}</div><p>{p}</p></div>' for h, u, p in src)
page(f'''<div class="kicker">Before every hike</div><h2>Official sources</h2>
<p class="lead">This guide gives you the basics. These sources give you today's conditions. Check them before every winter hike.</p>
<div class="src">{sb}</div>
<div class="box forest"><h3>Keep learning</h3><p style="margin:0">A wilderness first aid course and an avalanche awareness course are the two best next steps for anyone who wants to hike more in winter. Many outdoor clubs and gear stores run beginner winter skills days too.</p></div>''', 21)

# ---------- 22 back
page('''<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:28pt">HikeSupply Co.</div>
<svg width="200" height="120" viewBox="0 0 200 120" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M10 110 L70 40 L100 75 L130 30 L190 110" stroke="#F5F1EA" stroke-width="4"/><path d="M58 54 L70 40 L82 54 M120 44 L130 30 L141 45" stroke="#F5F1EA" stroke-width="3"/><circle cx="160" cy="25" r="10" fill="#B85C38" stroke="#B85C38"/></svg>
<h2 style="margin-top:26pt">See you on the snow</h2>
<p>Thank you for choosing a HikeSupply guide. Start small, stay dry, turn around early, and enjoy the quietest trails of the year.</p>
<p style="margin-top:18pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:30pt">This guide is general information for day hikers and does not replace training, local knowledge or medical advice. Conditions change: check official sources before every hike. For personal use only.</p>''', 0, "back")

html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css">{CSS}</head><body>{"".join(pages)}</body></html>'
open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html"), "w").write(html)
print(len(pages), "pages")
