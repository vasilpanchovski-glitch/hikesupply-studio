"""Generates index.html for p10 (Hiking With Your Dog — Trail Guide & Checklists). Run: python3 gen.py
Same look as p09 (base.css + extra.css). Facts follow NPS pet pages and the BARK Ranger program
(nps.gov/subjects/pets), Parks Canada pet rules, Leave No Trace guidance on pet waste (lnt.org),
CDC guidance on ticks, and conservative general advice; every health topic sends the reader to a vet.
Written October 2026."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
T = "Hiking With Your Dog"
pages = []
def page(body, cls=""):
    n = len(pages) + 1
    folio = f'<div class="folio"><span>{T}</span><span>{n}</span></div>' if cls not in ("cover photo", "back") else ""
    pages.append(f'<section class="page {cls}">{body}{folio}</section>')
def chk(items): return '<ul class="check">' + "".join(f"<li>{i}</li>" for i in items) + "</ul>"
def lines(k, h=24): return "".join(f'<div class="wl" style="height:{h}pt"></div>' for _ in range(k))
def fl(label, unit=""): return f'<div class="fl">{label}{unit}</div>'
def yn(q): return f'<div class="qr"><span>{q}</span><span class="yn"><span><i></i>Yes</span><span><i></i>Not yet</span></span></div>'

MORE = """
.qs{margin:6pt 0 10pt;border-top:1.5pt solid var(--forest)}
.qr{display:grid;grid-template-columns:1fr auto;gap:14pt;align-items:center;padding:7.5pt 0;border-bottom:0.6pt solid var(--line);font-size:10.8pt}
.yn{display:inline-flex;gap:12pt;font:600 8pt/1 var(--sans);color:var(--forest);white-space:nowrap}
.yn i{display:inline-block;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-right:3pt;vertical-align:-1pt;background:#fff}
.gl td{font-size:10.2pt;padding:6.5pt 6pt;line-height:1.4}
.gl td:first-child{font-weight:600;color:var(--forest);width:1.45in}
.rt{display:grid;grid-template-columns:1fr 1fr;gap:10pt;margin:6pt 0}
.rt>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:10pt 13pt}
.rt h3{margin:0 0 4pt;font-size:12.5pt}
.rt p{margin:0;font-size:10.3pt;line-height:1.45}
.rt .n{font:600 20pt/1 var(--serif);color:var(--clay);margin-bottom:4pt}
.wkp td{font-size:10.2pt;padding:7pt 6pt;line-height:1.38;vertical-align:top}
.wkp td:first-child{font:600 13pt/1.2 var(--serif);color:var(--forest);width:0.85in}
.wkp td.d{white-space:nowrap;font-weight:600;color:var(--forest);width:1.25in}
.wkp td.t{width:0.6in;text-align:center}
.wkp td.t::before{content:"";display:inline-block;width:10pt;height:10pt;border:1.1pt solid var(--forest);border-radius:2pt;background:#fff}
.gear td{font-size:10.2pt;padding:6pt 6pt}
.gear td.b{width:0.3in}
.gear td.b::before{content:"";display:inline-block;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;background:#fff;vertical-align:-1pt}
.gear tr.sec td{font:700 7.5pt/1 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--clay);padding-top:11pt;border-bottom:1pt solid var(--forest)}
.gear .n{color:#8B8577;font-size:8.8pt}
.idc{border:1.4pt dashed #A39C8D;border-radius:4pt;background:#fff;padding:14pt 16pt;margin-bottom:12pt}
.idc .top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2pt solid var(--forest);padding-bottom:5pt;margin-bottom:2pt}
.idc .top b{font:600 15pt/1 var(--serif);color:var(--forest)}
.idc .top span{font:700 7pt/1 var(--sans);letter-spacing:.14em;text-transform:uppercase;color:var(--clay)}
.idc .fl{height:23pt}
.log{width:100%;border-collapse:collapse;margin:4pt 0}
.log th{font-size:7pt;padding:5pt 4pt;letter-spacing:.08em}
.log td{height:47pt;border-bottom:0.6pt solid #CFC7B6;border-right:0.6pt solid var(--line);font-size:9pt;color:#8B8577;vertical-align:top;padding:4pt}
.log td:last-child{border-right:0}
.log td.no{font:600 13pt/1 var(--serif);color:var(--forest);width:0.3in;vertical-align:middle;text-align:center}
.log .r{white-space:nowrap;font-size:8pt}
.log .r i{display:inline-block;width:8pt;height:8pt;border:1pt solid var(--forest);border-radius:50%;margin-right:2pt;background:#fff}
.tri{display:grid;grid-template-columns:repeat(3,1fr);gap:10pt;margin:8pt 0}
.tri>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 12pt}
.tri h3{margin:0 0 4pt;font-size:12.5pt}
.tri p{margin:0;font-size:10.1pt;line-height:1.45}
.tri .tag{margin-bottom:5pt}
.bark{display:grid;grid-template-columns:repeat(4,1fr);gap:8pt;margin:6pt 0 4pt}
.bark>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:10pt 11pt}
.bark .L{font:600 26pt/1 var(--serif);color:var(--clay)}
.bark p{margin:4pt 0 0;font-size:9.8pt;line-height:1.38}
.sig{display:grid;grid-template-columns:1fr 1fr;gap:10pt;margin:8pt 0}
.sig>div{border-radius:9pt;padding:11pt 13pt;background:#fff;border:1pt solid var(--line)}
.sig h3{margin:0 0 5pt;font-size:12.5pt}
.sig ul{margin:0;padding-left:14pt}
.sig li{font-size:10.3pt;line-height:1.45;margin-bottom:2pt}
.sig .stop{border:1.6pt solid var(--rust)}
.dog{float:right;margin:0 0 6pt 14pt}
.pl .fl{height:25pt}
.pl .wl{height:24pt}
.big p{font-size:11.3pt}
html.bw .sig .stop{border-color:#333}
.page:not(.cover):not(.back) p{font-size:11.6pt;line-height:1.55}
.page:not(.cover):not(.back) p.lead{font-size:13pt;line-height:1.45}
.page:not(.cover):not(.back) p.small{font-size:9pt;line-height:1.45}
ul.check li{font-size:11.4pt;padding:6.5pt 0 6.5pt 21pt}
ul.check li::before{top:8pt}
.cl ul.check li{font-size:11pt;padding:6.5pt 0 6.5pt 20pt}
.gl td{font-size:11pt;padding:7pt 7pt;line-height:1.45}
.rt p,.tri p{font-size:11pt;line-height:1.5}
.rt>div,.tri>div{padding:13pt 14pt}
.sig li{font-size:11pt;line-height:1.5;margin-bottom:3pt}
.sig>div{padding:13pt 15pt}
.bark p{font-size:10.6pt}
.bark>div{padding:12pt 12pt}
.qr{padding:14.5pt 0;font-size:11.4pt}
.wkp td{font-size:11pt;padding:11pt 7pt;line-height:1.45}
.box p,.warn{font-size:11.2pt}
.idc .fl{height:28pt}
.idc{padding:13pt 18pt;margin-bottom:12pt}
.pl .fl{height:33pt}
.pl .wl{height:31pt}
.pl .lab{margin-top:16pt}
.pl .opts{font-size:10pt}
.log td{height:73pt}
.gear td{font-size:11pt;padding:6.4pt 6pt}
.gear .n{font-size:9.4pt}
"""

DOGSVG = """<svg width="%d" height="%d" viewBox="0 0 220 150" fill="none" stroke="%s" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
<path d="M38 70 C50 58 110 58 150 64 L160 50 L168 38 L176 44 L180 34 L188 46 C196 50 204 56 206 62 L192 70 L172 72 C168 84 164 92 160 96 L164 128 L154 128 L148 100 C130 104 100 104 80 100 L70 128 L60 128 L62 98 C54 94 48 88 46 80 Z"/>
<path d="M44 72 C30 66 22 56 18 44"/><circle cx="186" cy="54" r="2" fill="%s"/>
<path d="M150 64 C152 76 156 82 164 84" stroke="%s"/></svg>"""

# 1 cover
page("""<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="470" height="330" viewBox="0 0 470 330" fill="none" stroke-linejoin="round" stroke-linecap="round">
<circle cx="380" cy="60" r="22" stroke="#F5F1EA" stroke-width="3"/>
<path d="M0 230 L110 100 L180 170 L270 60 L470 230" stroke="#F5F1EA" stroke-width="3.5"/>
<g transform="translate(150 170) scale(0.9)"><path d="M38 70 C50 58 110 58 150 64 L160 50 L168 38 L176 44 L180 34 L188 46 C196 50 204 56 206 62 L192 70 L172 72 C168 84 164 92 160 96 L164 128 L154 128 L148 100 C130 104 100 104 80 100 L70 128 L60 128 L62 98 C54 94 48 88 46 80 Z" stroke="#B85C38" stroke-width="3.5"/><path d="M44 72 C30 66 22 56 18 44" stroke="#B85C38" stroke-width="3.5"/></g>
<path d="M20 290 H450" stroke="#F5F1EA" stroke-width="3"/>
</svg></div>
<div><h1>Hiking With Your Dog</h1><p class="sub">A friendly trail guide for dog owners: getting your dog trail-ready, where dogs are allowed, water, heat, paws, ticks and wildlife, plus pack lists, an ID card and a hike log for the two of you.</p>
<div class="meta" style="margin-top:22pt"><span>20 pages</span><span>Guide + checklists</span><span>mi + km, °F + °C</span></div></div>""", "cover photo")

# 2 how to use + vet first
page("""<div class="kicker">Start here</div><h2>Two of you on the trail</h2>
<p class="lead">A dog makes a hike better: more excited at the trailhead, more curious on the way, happier at the top. This guide helps you plan hikes that are safe and fun for both of you, and polite to everyone else.</p>
<div class="cols" style="margin-top:4pt">
<div><h3>This guide is for you if</h3><ul class="check"><li>Your dog walks well around the neighborhood and you want to go further</li><li>You are new to hiking, new to dogs, or both</li><li>You hike day trips in the US or Canada</li><li>You want simple pack lists and a hike log</li></ul></div>
<div><h3>What is inside</h3><ul class="check"><li><b>Pages 3 to 12:</b> the guide, one topic per page</li><li><b>Pages 13 to 15:</b> first aid kit and pack lists</li><li><b>Pages 16 and 17:</b> dog ID card and trail plan</li><li><b>Pages 18 and 19:</b> a log for 16 hikes</li></ul></div></div>
<div class="box forest"><h3>Talk to your vet first</h3><p style="margin:0">Before your dog's first longer hikes, ask your vet whether your dog is ready and how far to go. This matters most for puppies (their joints are still growing), older dogs, dogs with health problems or extra weight, and flat-faced breeds such as pugs and bulldogs, which overheat easily. Ask about tick and flea prevention and vaccines for where you hike, too.</p></div>
<h3>The three habits that matter most</h3>
<div class="tri" style="margin:4pt 0 2pt"><div><div class="tag">Leash</div><p>On the leash, close to you, every time the rules ask for it.</p></div><div><div class="tag">Water</div><p>Clean water for your dog at every stop, carried from home.</p></div><div><div class="tag">Bags</div><p>Every poop bagged and carried out, all the way to the bin.</p></div></div>
<h3>How to use it</h3>
<p>Read the guide once. Print the checklists, ID card and log, and keep a filled-in card in your pack. Units are in miles and km, °F and °C.</p>
<p class="small">General information, not veterinary advice. Dog rules change: always check the official page for the place you hike.</p>""")

# 3 trail-ready self-check
page("""<div class="kicker">Before you go</div><h2>Is my dog trail-ready?</h2>
<p class="lead">Tick each line honestly. A "not yet" is not a stop sign, it is your training list for the next few weeks.</p>
<div class="qs">""" + "".join(yn(q) for q in [
    "My vet has said my dog is healthy enough for longer walks and hikes",
    "My dog is fully grown, or my vet has told me how far a young dog can go",
    "My dog walks on a loose leash without pulling me off balance",
    "My dog comes back when called, even when distracted",
    "My dog can calmly pass other dogs, people and bikes on a narrow path",
    "My dog has walked 1 to 2 hours on easy ground and was fine the next day",
    "My dog is used to a harness and maybe a small dog pack",
    "My dog's vaccines, tick prevention and ID tag are up to date",
    "My dog is microchipped, and the chip is registered with my current phone number",
]) + """</div>
<div class="cols">
<div class="box" style="margin:0"><h3 style="margin-top:0">Work on manners</h3><p style="margin:0">Practice "sit", "wait" and "leave it" on busy paths in town. A short training class is worth it if your dog pulls hard or reacts to other dogs. Reward calm behavior with a treat.</p></div>
<div class="box" style="margin:0"><h3 style="margin-top:0">Work on fitness</h3><p style="margin:0">Add a little distance to your regular walks each week, with some hills. Fitness builds over weeks, not in one big weekend. Page 4 has a simple plan.</p></div></div>""")

# 4 build up slowly
page("""<div class="kicker">Getting fit together</div><h2>Build up slowly: a 4-week start</h2>
<p class="lead">This is a gentle example for a healthy adult dog that already walks every day. Your vet may suggest something different, and that advice comes first.</p>
<table class="wkp"><tr><th>Week</th><th>Longest hike</th><th>What to practice</th><th>Done</th></tr>
<tr><td>1</td><td class="d">2 mi / 3 km<br><span class="small">mostly flat</span></td><td>Harness and leash on the trail, water breaks, a short sit at a viewpoint. Watch how your dog handles new smells and sounds.</td><td class="t"></td></tr>
<tr><td>2</td><td class="d">3 mi / 5 km<br><span class="small">a few small hills</span></td><td>Stepping aside for other hikers. Offering water every stop. Checking paws at the halfway point.</td><td class="t"></td></tr>
<tr><td>3</td><td class="d">4 mi / 6.5 km<br><span class="small">some climbing</span></td><td>A snack break and a longer rest. If you plan to use a dog pack, try it empty first.</td><td class="t"></td></tr>
<tr><td>4</td><td class="d">5 mi / 8 km<br><span class="small">your usual kind of trail</span></td><td>A full "real" hike with your pack list (pages 14 and 15). Check your dog that evening and the next morning.</td><td class="t"></td></tr></table>
<p>Keep the other walks in the week short and easy. If your dog is stiff, limping or very tired the next day, go back a step and talk to your vet if it does not clear up.</p>
<div class="sig">
<div><h3>Signs your dog needs a rest</h3><ul><li>Lagging behind you or lying down on the trail</li><li>Heavy panting that does not settle after a few minutes in the shade</li><li>Looking for every bit of shade or water</li><li>Licking or favoring a paw</li></ul></div>
<div class="stop"><h3>Signs to stop and turn back</h3><ul><li>Limping, or refusing to keep going</li><li>Stumbling, confusion or vomiting</li><li>Signs of overheating (page 8)</li><li>A cut pad or a paw that bleeds</li></ul></div></div>
<h3>On every hike day</h3>
<p>Short warm-up walk at the trailhead, water at every stop, a paw check halfway, and a slow last mile to cool down before the car.</p>
<p class="small">The dog sets the pace and the distance, not the plan. Turning back early is always a good hike.</p>""")

# 5 where dogs can hike
page("""<div class="kicker">Rules</div><h2>Where dogs can hike</h2>
<p class="lead">This is the most common surprise for new dog hikers: the place matters. Many beautiful parks keep dogs off their trails. Always check before you drive there.</p>
<table class="gl">
<tr><td>US national parks</td><td>The strictest. In most parks, pets are allowed in campgrounds, parking areas and along roads, but not on most trails. A few parks welcome leashed dogs on many trails. Rules differ park by park, so read the "Pets" page on the park's own nps.gov site.</td></tr>
<tr><td>US national forests and BLM land</td><td>Usually the most dog-friendly. Dogs are often allowed on trails, with a leash required in campgrounds and other developed areas. Some areas have extra rules. Ask the local ranger district.</td></tr>
<tr><td>State parks</td><td>Many allow leashed dogs on trails. Leash length limits are common (often 6 ft / 1.8 m). Some parks or trails do not allow dogs. Check the park's page.</td></tr>
<tr><td>Canada</td><td>In Parks Canada national parks, dogs must be on a leash at all times, and some trails and areas close to dogs, often because of wildlife. Provincial parks set their own rules. Check the park's official page.</td></tr>
<tr><td>Local and city trails</td><td>Rules vary. Look for signs at the trailhead and respect off-leash areas only where they are clearly marked.</td></tr></table>
<h3>The BARK Ranger rules</h3>
<p>Pet manners in four letters, from the National Park Service:</p>
<div class="bark"><div><div class="L">B</div><p><b>Bag</b> your pet's waste and carry it out.</p></div><div><div class="L">A</div><p><b>Always</b> leash your pet.</p></div><div><div class="L">R</div><p><b>Respect</b> wildlife.</p></div><div><div class="L">K</div><p><b>Know</b> where you can go.</p></div></div>
<div class="box"><h3 style="margin-top:0">Check the rules in two minutes</h3><p style="margin:0">Search the park name plus "pets", open the official page (.gov, .gc.ca or the state or provincial park site) and find the trails open to dogs. Not clear? Call the visitor center.</p></div>
""")

# 6 trail manners
page("""<div class="kicker">On the trail</div><h2>Trail manners</h2>
<p class="lead">Not everyone loves dogs, and some people are afraid of them. A calm, close, leashed dog keeps trails open to dogs for everyone.</p>
<div class="rt">
<div><div class="n">1</div><h3>Keep the leash on</h3><p>Even a friendly dog with great recall can chase a deer or run up to a scared child. Follow the leash rules, and use a fixed leash, not a long retractable one, on narrow trails.</p></div>
<div><div class="n">2</div><h3>Step aside and wait</h3><p>When you meet other hikers, move to the side of the trail, ask your dog to sit, and let them pass. Hold the leash short until they are by.</p></div>
<div><div class="n">3</div><h3>Ask before saying hello</h3><p>Do not let your dog greet other dogs or people unless the other person says yes. "Is it OK if they say hi?" is all it takes.</p></div>
<div><div class="n">4</div><h3>Keep the noise down</h3><p>Barking carries far in quiet places. If your dog barks at everything, practice on shorter, quieter trails first.</p></div></div>
<h3>Meeting horses</h3>
<p>Horses can be startled by dogs. Step off the trail, ideally on the downhill side, keep your dog close and sitting, and say hello to the rider so the horse knows you are a person. Ask the rider what they would like you to do.</p>
<p><b>Meeting bikes:</b> move aside with your dog on the far side from the bike, on a short leash.</p>
<h3>Off-leash areas</h3>
<p>Let your dog off leash only where the rules clearly allow it, and only if it comes back the first time you call, even near wildlife and other dogs.</p>
<div class="warn"><b>People who are scared of dogs.</b> If someone looks nervous, steps back or picks up a child, give them extra room, keep your dog close and do not say "he is friendly". Just let them pass.</div>""")

# 7 water and food
page("""<div class="kicker">Fuel</div><h2>Water and food on the trail</h2>
<p class="lead">Your dog cannot tell you it is thirsty, and it cannot carry a drink bottle in its paw. Plan water and snacks for two.</p>
<h3>Water</h3>
""" + chk(["Carry water for your dog as well as for yourself. Dogs often need more on a hike than at home, especially when it is warm", "Offer water at every stop, about every 15 to 30 minutes in warm weather, even if your dog did not ask", "Use a collapsible bowl or a dog bottle with a built-in trough", "Plan to finish the hike with some water left over", "Ask your vet how much water your dog needs for the hikes you plan"]) + """
<h3>Food</h3>
""" + chk(["Bring dog snacks or a small portion of their usual food", "Offer a small snack at longer breaks, rather than one big meal", "Many vets advise against a big meal just before or right after hard exercise, especially for large, deep-chested breeds. Ask yours about timing", "Pack out every wrapper and dropped crumb"]) + """
<h3>After the hike</h3>
<p>Offer water first. Give the main meal later, once your dog has cooled down and settled. A tired dog that will not eat or drink after a hike should see a vet.</p>
<div class="box"><h3 style="margin-top:0">Never share these on the trail</h3><p style="margin:0">Some human hiking snacks are poisonous to dogs, including chocolate, grapes and raisins (often in trail mix), and anything with xylitol (some gums, candies and peanut butters). Keep your snacks zipped and out of reach.</p></div>
<p class="small">Collapsible bowl, dog water bottle and snacks are on the dog pack list on page 14.</p>""")

# 8 heat and cold
page("""<div class="kicker">Weather</div><h2>Heat and cold</h2>
<p class="lead">Dogs cool down mainly by panting, which works much less well than sweating. Heat is one of the biggest risks for hiking dogs.</p>
<div class="cols">
<div><h3>On warm days</h3>""" + chk(["Hike early in the morning or in the evening", "Pick shady trails, ideally with safe water nearby", "Check the ground: if you cannot keep the back of your hand on pavement or rock for 7 seconds, it is too hot for paws", "Rest in the shade often and offer water", "Shorten the hike, or leave your dog home on hot days"]) + """</div>
<div><h3>On cold days</h3>""" + chk(["Short-coated, small and older dogs may need a dog jacket", "Snow can pack into balls between the toes: check paws often", "Booties protect paws from ice and road salt; practice with them at home first", "Dry your dog off before a long car ride home", "Watch for shivering, lifting paws or slowing down"]) + """</div></div>
<div class="sig">
<div class="stop"><h3>Signs of overheating</h3><ul><li>Very heavy, fast panting</li><li>Lots of drool, or very red gums and tongue</li><li>Weakness, stumbling or confusion</li><li>Vomiting or diarrhea</li><li>Collapse</li></ul></div>
<div class="stop"><h3>What to do right away</h3><ul><li>Stop and move into the shade</li><li>Offer small amounts of water</li><li>Wet your dog with cool (not ice-cold) water, especially the belly and paws, and fan it</li><li>Call a vet and head for help: overheating can be an emergency even if your dog seems to recover</li></ul></div></div>
<div class="warn"><b>Never leave your dog in a parked car on a warm day,</b> not even for a few minutes with the windows cracked. Cars heat up fast, even in the shade.</div>
<p class="small">Flat-faced breeds, thick-coated breeds, overweight, older and very young dogs overheat more easily. Ask your vet what temperatures are safe for yours.</p>""")

# 9 paws and ticks
page("""<div class="kicker">After every hike</div><h2>Paws and ticks</h2>
<p class="lead">Two quick checks turn small problems into nothing. Do them at the car, before your dog jumps in.</p>
<h3>Paw check</h3>
""" + chk(["Look at each pad for cuts, cracks, blisters or worn, shiny patches", "Spread the toes and remove burrs, grass seeds, small stones and snow", "Feel for heat or swelling, and watch for limping or licking later that day", "Keep nails trimmed: long nails catch and split on rocks", "Brush the coat: it finds burrs, seeds and ticks hiding in the fur", "A small cut: rinse with clean water and keep it clean. A deep or bleeding cut: cover it, keep your dog off it and see a vet"]) + """
<h3>Tick check, for the dog</h3>
<p>Run your hands slowly over your dog and feel for small bumps. Look closely at the places ticks like most:</p>
<div class="bark"><div><p><b>Head and ears</b><br>inside and around the ears</p></div><div><p><b>Neck</b><br>under the collar or harness</p></div><div><p><b>Legs</b><br>armpits, between the toes</p></div><div><p><b>Belly and tail</b><br>groin, under the tail</p></div></div>
<p>If you find one, remove it with fine-tipped tweezers or a tick tool: grip it close to the skin and pull straight out with steady pressure. Clean the spot. Ask your vet about tick prevention for where you hike.</p>
<p>Then watch the spot over the next few weeks. If your dog seems unwell, tired or stiff, or stops eating, call your vet and mention the tick bite.</p>
<div class="box"><h3 style="margin-top:0">And for you</h3><p style="margin:0">Check yourself too: behind the knees, the waist, the hairline and behind the ears. A shower soon after the hike helps. A dog can also carry ticks into the car and home.</p></div>""")

# 10 wildlife
page("""<div class="kicker">Wild neighbors</div><h2>Wildlife</h2>
<p class="lead">A leash is the best wildlife protection there is. A dog that chases an animal can get hurt, lost, or bring trouble back to you.</p>
<div class="tri">
<div><div class="tag">Bears</div><h3>Keep your dog close</h3><p>An off-leash dog can surprise a bear and run back to you with the bear behind it. Keep your dog leashed, make noise on blind corners, and store dog food like your own.</p></div>
<div><div class="tag">Snakes</div><h3>Stay on the trail</h3><p>Keep your dog on the path, away from tall grass, rock piles and logs. If you think it was bitten, keep it calm, carry it if you can and get to a vet right away.</p></div>
<div><div class="tag">Porcupines</div><h3>Leave quills to a vet</h3><p>Curious dogs often get a face full of quills. Do not pull them yourself: they break, and a dog in pain may bite. Go to a vet.</p></div></div>
<h3>Others to know about</h3>
<table class="gl">
<tr><td>Deer, elk, moose</td><td>Big animals can kick hard, especially mothers with young. Give them lots of room and turn around if one is on the trail.</td></tr>
<tr><td>Coyotes</td><td>Usually shy, but they may follow or test a dog. Keep your dog leashed and close, and leave calmly.</td></tr>
<tr><td>Skunks</td><td>Mostly out at dawn and dusk. A sprayed dog is unpleasant but usually fine; rinse its eyes with clean water.</td></tr>
<tr><td>Small animals</td><td>Squirrels and marmots are wildlife too. Do not let your dog chase or dig after them.</td></tr></table>
<div class="box"><h3 style="margin-top:0">Hunting season</h3><p style="margin:0">In many forests, hunting is allowed in fall. Put a bright orange vest or bandana on your dog and wear something bright yourself. Check the hunting dates on your state or provincial wildlife agency's site.</p></div>
<p class="small">Learn which animals live where you hike from the park or forest's official page, and follow its advice.</p>""")

# 11 water crossings and drinking from streams
page("""<div class="kicker">Water</div><h2>Streams, lakes and crossings</h2>
<p class="lead">Water is the best part of the hike for many dogs. A few simple habits keep it that way.</p>
<h3>Carry clean water instead</h3>
<p>Streams and lakes can carry germs and parasites that make dogs sick, the same ones that make people sick. The easy answer: bring clean water from home and offer it often, so your dog is less tempted to drink from puddles and ponds.</p>
<div class="warn"><b>Stay away from scummy water.</b> Toxic algae (blue-green algae) can make water look green, blue-green or like spilled paint, and it can be deadly for dogs. If water looks or smells odd, or there is a warning sign, keep your dog out of it and do not let it drink or lick its fur. If your dog has been in it, rinse it with clean water and call a vet.</div>
<h3>Crossing streams</h3>
""" + chk(["Cross only where the water is slow and shallow, well below your dog's chest", "If the water is fast or deep, do not cross. Turn back or find another way", "Keep your dog on leash, or carry a small dog across", "A dog life jacket with a handle helps for swimming in calm lakes", "Never throw sticks or balls into moving water"]) + """
<h3>Swimming</h3>
""" + chk(["Let your dog go in at its own pace; not every dog is a swimmer", "Stay out of cold water, strong currents and big waves; rinse off lake water after", "Watch for fishing hooks and line near the shore"]) + """
<div class="box"><h3 style="margin-top:0">Ask your vet</h3><p style="margin:0">Ask about vaccines and prevention for diseases your dog can catch from water and wildlife in your area. The answer depends on where you live and hike.</p></div>""")

# 12 poop and LNT
page("""<div class="kicker">Leave No Trace</div><h2>Poop and Leave No Trace</h2>
<p class="lead">Dog waste is not "natural" on a trail. It can pollute water, spread disease to wildlife and other dogs, and it is one of the most common complaints about dogs on trails.</p>
<div class="rt">
<div><div class="n">1</div><h3>Bag it</h3><p>Pick it up every time, right away, with a bag. Bring more bags than you think you need.</p></div>
<div><div class="n">2</div><h3>Carry it out</h3><p>Never leave a bag beside the trail "for the way back". Many are forgotten. A small odor-proof bag or a clip-on pouch makes carrying easy.</p></div>
<div><div class="n">3</div><h3>Follow local rules</h3><p>Some places allow burying dog waste in a cathole away from water and trails; many ask you to pack it out. When in doubt, pack it out.</p></div>
<div><div class="n">4</div><h3>Stay on the trail</h3><p>Keep your dog on the path, out of fragile plants, meadows and lake shores, and away from other people's campsites.</p></div></div>
<h3>The seven Leave No Trace principles, with a dog</h3>
""" + chk(["Plan ahead: check the dog rules and the weather for that day", "Travel on durable surfaces: trails and rock, not meadows", "Dispose of waste properly: bag it, carry it out", "Leave what you find: no digging, no chewing up plants", "Respect wildlife: leash on, no chasing, no feeding", "Minimize campfire impacts: keep your dog away from fire rings and hot coals", "Be considerate of other visitors: quiet, close and polite"]) + """
<p class="small">Learn more about Leave No Trace at lnt.org.</p>""")

# 13 first aid kit
page("""<div class="kicker">Checklist</div><h2>Dog first aid kit</h2>
<p class="lead">A small kit for the scrapes and cuts that happen on a trail, and the phone numbers you need when it is more than that. It does not replace a vet.</p>
<div class="cl">
<div><h3>Wound care</h3>""" + chk(["Gauze pads and a gauze roll", "Non-stick wound pads", "Self-stick bandage wrap (vet wrap)", "Medical tape", "Saline or clean water to rinse wounds", "Blunt-tip scissors"]) + """
<h3>Tools</h3>""" + chk(["Tick remover or fine-tipped tweezers", "Disposable gloves", "A spare dog bootie or sock to cover a hurt paw", "A small towel"]) + """</div>
<div><h3>Just in case</h3>""" + chk(["Emergency blanket", "A soft muzzle or a strip of cloth (a dog in pain may bite, even its owner)", "A spare leash", "Any medicine your vet prescribed for your dog"]) + """
<h3>Paperwork</h3>""" + chk(["Your vet's phone number", "Nearest 24-hour emergency vet clinic near the trail", "Pet poison helpline number", "Photo of your dog and vaccine records on your phone"]) + """</div></div>
<div class="warn"><b>No human painkillers.</b> Many common human medicines, including ibuprofen and naproxen, are dangerous for dogs. Never give your dog any medicine unless a vet tells you to.</div>
<div class="box"><h3 style="margin-top:0">Check it twice a year</h3><p style="margin:0">Replace anything used or out of date, and update the phone numbers when you travel somewhere new.</p></div>
<p class="small">Consider a pet first aid class: many animal welfare groups and some vets offer one. Write the phone numbers on the ID card on page 16.</p>""")

# 14 dog pack list
page("""<div class="kicker">Checklist</div><h2>Dog hiking pack list</h2>
<p class="lead">Tick it off the night before. Items marked with a dot can go in your dog's own pack once your dog is used to carrying one.</p>
<table class="gear">
<tr class="sec"><td colspan="3">Wear</td></tr>
<tr><td class="b"></td><td>Well-fitted harness</td><td class="n">two fingers fit under the straps</td></tr>
<tr><td class="b"></td><td>Collar with ID tag and rabies tag</td><td class="n">phone number up to date</td></tr>
<tr><td class="b"></td><td>Fixed leash</td><td class="n">check the local length rule</td></tr>
<tr class="sec"><td colspan="3">Water and food</td></tr>
<tr><td class="b"></td><td>Water for your dog</td><td class="n">plus a little extra</td></tr>
<tr><td class="b"></td><td>Collapsible bowl or dog bottle</td><td class="n">&bull;</td></tr>
<tr><td class="b"></td><td>Snacks or a small portion of food</td><td class="n">&bull; in a sealed bag</td></tr>
<tr class="sec"><td colspan="3">Care</td></tr>
<tr><td class="b"></td><td>Poop bags, plenty</td><td class="n">&bull;</td></tr>
<tr><td class="b"></td><td>Odor-proof bag or pouch for used bags</td><td class="n">&bull;</td></tr>
<tr><td class="b"></td><td>Dog first aid kit</td><td class="n">page 13</td></tr>
<tr><td class="b"></td><td>Tick remover</td><td class="n">&nbsp;</td></tr>
<tr><td class="b"></td><td>Towel for the car</td><td class="n">&nbsp;</td></tr>
<tr class="sec"><td colspan="3">By weather</td></tr>
<tr><td class="b"></td><td>Dog jacket</td><td class="n">cold, wet days or short coats</td></tr>
<tr><td class="b"></td><td>Booties</td><td class="n">ice, salt, sharp rock</td></tr>
<tr><td class="b"></td><td>Cooling vest or bandana</td><td class="n">warm days</td></tr>
<tr><td class="b"></td><td>Light or reflective collar</td><td class="n">dawn, dusk, hunting season</td></tr>
</table>
<p class="small">Dog packs: ask your vet how much weight your dog can carry, start empty, add weight slowly and balance both sides. Puppies and older dogs should not carry packs.</p>""")

# 15 human pack list
page("""<div class="kicker">Checklist</div><h2>Your pack for a hike with your dog</h2>
<p class="lead">Your usual day-hike kit, plus a few things that make hiking with a dog easier.</p>
<div class="cl">
<div><h3>The Ten Essentials</h3>""" + chk(["Navigation: map, compass or GPS, and you know how to use them", "Headlamp with spare batteries", "Sun protection: sunglasses, sunscreen, hat", "First aid kit (yours, plus the dog kit)", "Knife or multi-tool", "Fire starter", "Emergency shelter, such as a space blanket", "Extra food", "Extra water", "Extra clothes"]) + """</div>
<div><h3>Dog extras for you</h3>""" + chk(["Hands-free waist leash, for easier climbing", "A second water bottle, just for the dog", "Gloves for a strong puller", "Bear spray in bear country, if the land manager recommends it", "Plastic bag to keep the car seat clean"]) + """
<h3>Before you leave home</h3>""" + chk(["Check the dog rules for this exact trail", "Check the weather and temperature", "Share your trail plan (page 17)", "Charge your phone"]) + """</div></div>
<h3>For the drive home</h3>
<div class="cl" style="margin-top:-4pt"><div>""" + chk(["Water and a bowl in the car", "Old towel or sheet for the seat"]) + """</div><div>""" + chk(["A safe spot: crate, dog seat belt or barrier", "Snack for after the cool-down"]) + """</div></div>
<div class="box"><h3 style="margin-top:0">Tip: one shared bag</h3><p style="margin:0">Keep a "dog hike bag" packed by the door with the bowl, bags, first aid kit, towel and spare leash. Add fresh water and snacks and you are out the door in two minutes.</p></div>""")

# 16 ID card
def idcard():
    return ('<div class="idc"><div class="top"><b>If you find this dog</b><span>Dog ID and emergency card</span></div>'
            '<div class="f2">' + fl("Dog's name") + fl("Breed / color") + fl("Owner") + fl("Owner phone") + fl("Second contact") + fl("Phone") + fl("Microchip no.") + fl("Rabies tag no.") + fl("Our vet") + fl("Vet phone") + fl("Medical notes") + fl("Medicines") + "</div></div>")
page("""<div class="kicker">Print, fill, carry</div><h2>Dog ID and emergency card</h2>
<p>Fill in both cards. Keep one in your pack and one in the car. If you and your dog get separated, or if you are hurt and someone else has to care for your dog, this card tells them who to call.</p>
""" + idcard() + idcard() + """
<div class="idc" style="padding:11pt 16pt"><div class="top"><b>Emergency vets near this trail</b><span>Fill in before each trip</span></div>
<div class="f2">""" + fl("Clinic name") + fl("Phone") + fl("Address") + fl("Open hours") + """</div></div>""")

# 17 trail plan
page("""<div class="kicker">Plan</div><h2>Trail plan for the two of you</h2>
<p>Fill it in before the hike, then share a copy or a photo with someone at home who will know when to expect you back.</p>
<div class="pl"><div class="f2">""" + fl("Date") + fl("Trail name") + fl("Park / forest") + fl("Trailhead") + fl("Distance", '<span class="u"><b></b>mi / <b></b>km</span>') + fl("Elevation gain", '<span class="u"><b></b>ft / <b></b>m</span>') + fl("Start time") + fl("Expected back by") + """</div>
<div class="lab">Dog rules for this trail</div>
<div class="opts"><span>Dogs allowed</span><span>Leash required</span><span>Leash length limit: ______</span><span>Checked on the official page</span></div>
<div class="lab">Weather and temperature</div><div class="opts"><span>Forecast checked</span><span>Max temp ______ °F / °C</span><span>Shade on the route</span><span>Hot ground: test with your hand</span></div>
<div class="lab">Water on the route (check it looks clean before your dog goes in)</div>""" + lines(2) + """
<div class="lab">Turnaround time</div><p class="small" style="margin:2pt 0 0">The time you turn back wherever you are, so you finish in daylight and before your dog is too tired.</p>""" + lines(1) + """
<div class="lab">Nearest emergency vet</div>""" + lines(1) + """
<div class="lab">Who knows our plan</div>""" + lines(1) + """
<div class="lab">Notes</div>""" + lines(3) + """</div>""")

# 18-19 logs
def log(first):
    rows = "".join(f'<tr><td class="no">{n}</td><td></td><td></td><td></td><td></td><td><span class="r"><i></i><i></i><i></i><i></i><i></i></span></td></tr>' for n in range(first, first + 8))
    return ('<table class="log"><tr><th></th><th style="width:0.95in">Date</th><th style="width:1.75in">Trail and place</th><th style="width:0.9in">mi / km</th>'
            '<th>Weather, water, wildlife, how the dog did</th><th style="width:0.75in">Tail wags</th></tr>' + rows + '</table>')
page("""<div class="kicker">Our trail log</div><h2>Dog hike log</h2>
<p style="margin-bottom:4pt">One line per hike. Fill in the tail wags: how much your dog loved it, from one to five.</p>""" + log(1))
page("""<div class="kicker">Our trail log</div><h2>Dog hike log, continued</h2>
<p style="margin-bottom:4pt">Before your next hike, look back: what did your dog love most?</p>""" + log(9))

# 20 back
page("""<div class="brand" style="font:700 9pt/1 var(--sans);letter-spacing:.3em;text-transform:uppercase;color:var(--sage);margin-bottom:28pt">HikeSupply Co.</div>
<svg width="200" height="120" viewBox="0 0 200 120" fill="none" stroke-linejoin="round" stroke-linecap="round"><path d="M10 110 L70 40 L100 75 L130 30 L190 110" stroke="#F5F1EA" stroke-width="4"/><circle cx="160" cy="25" r="10" fill="#B85C38" stroke="#B85C38"/></svg>
<h2 style="margin-top:26pt">Happy trails, both of you</h2>
<p>Thank you for choosing a HikeSupply guide. We hope it leads to many muddy paws, long naps after the hike and quiet moments at the top, side by side.</p>
<p style="margin-top:14pt;font:600 9pt/1.4 var(--sans);letter-spacing:.12em;text-transform:uppercase;color:var(--sage)">Also from HikeSupply Co.</p>
<div class="bkcards" style="grid-template-columns:1fr 1fr;width:5.2in;margin-top:8pt"><div><b>Beginner's Hiking Guide</b><span>Day-hike basics, from choosing a trail to reading the weather</span></div><div><b>Ultimate Hiking Packing Checklist</b><span>Packing lists for different kinds of trips</span></div></div>
<p style="margin-top:18pt;font:600 10pt/1.4 var(--sans);letter-spacing:.06em">hikesupplyco.com</p>
<p class="small" style="color:#AEB8AA;margin-top:24pt">This guide is general information for dog owners who hike and does not replace advice from your veterinarian or official park rules. Rules, closures and conditions change: check official sources before every hike. In an emergency, contact a vet right away. For personal use only. Cover photo: Emilio Aguilar / Pexels.</p>""", "back")

css = open(os.path.join(HERE, "base.css")).read() + open(os.path.join(HERE, "extra.css")).read() + MORE
html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../_kit/brand.css"><style>{css}</style></head><body>{"".join(pages)}</body></html>'
open(os.path.join(HERE, "index.html"), "w").write(html)
print("pages", len(pages))
