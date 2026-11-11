MY_CSS = """<style>
.meal{background:#fff;border:1pt solid #CFC7B6;border-radius:9pt;padding:9pt 12pt 8pt}
.meal .top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1.5pt solid var(--forest);padding-bottom:5pt}
.meal .top h3{margin:0;font-size:13.5pt}
.meal .top span{font:700 7pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--sage)}
.mr{display:grid;grid-template-columns:0.72in 1fr 0.55in;gap:0 8pt;border-bottom:0.6pt solid var(--line)}
.mr .k{font:700 7.3pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);padding-top:7pt}
.mr .w{border-left:0.6pt dashed #CFC7B6;font:600 6.6pt/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#A39C8D;padding:7pt 0 0 6pt}
.mr .t .wl{height:19pt;border-bottom:0.6pt solid #E4DED2}
.mr .t .wl:last-child{border-bottom:0}
.m2{display:grid;grid-template-columns:1fr 1fr;gap:12pt}
.idea{display:grid;grid-template-columns:1fr 1fr;gap:10pt 14pt}
.idea>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:10pt 12pt}
.idea h3{margin:0 0 3pt;font-size:12.5pt}
.idea .who{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:5pt}
.idea ul{margin:0;padding-left:13pt;font-size:9.4pt;line-height:1.42}
.idea p{margin:0;font-size:9.3pt;line-height:1.42}
.combo{display:grid;grid-template-columns:1fr 1fr;gap:9pt 14pt}
.combo>div{border-bottom:0.6pt solid var(--line);padding:6pt 0 8pt}
.combo h3{margin:0 0 3pt;font-size:12pt}
.combo p{margin:0;font-size:9.3pt;line-height:1.4}
.combo .tg{font:700 6.8pt/1 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:4pt}
.hr{display:grid;grid-template-columns:0.7in 1fr 0.9in 0.45in;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:31pt;padding-bottom:4pt;font-size:9pt}
.hr.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.hr .n{font:600 12pt/1 var(--serif);color:var(--clay)}
.hr i{width:10pt;height:10pt;border:1.2pt solid var(--forest);border-radius:2pt;background:#fff;justify-self:center}
.fw{display:grid;grid-template-columns:2.3in 1fr 0.75in 1fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:23.5pt;padding-bottom:4pt;font-size:9pt}
.fw.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.fw span{color:#A39C8D;font-size:8pt;text-align:right}
.shop{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt 12pt}
.shop>div{background:#fff;border:1pt solid #CFC7B6;border-radius:8pt;padding:8pt 10pt 4pt}
.shop h3{margin:0 0 2pt;font-size:11pt}
.shop .r{display:flex;align-items:flex-end;gap:6pt;height:19pt;border-bottom:0.6pt solid #E4DED2}
.shop .r i{flex:none;width:9pt;height:9pt;border:1.1pt solid var(--forest);border-radius:2pt;margin-bottom:3pt}
.shop .r:last-child{border-bottom:0}
.grp{display:grid;grid-template-columns:1.25in 1.6in 1fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:30pt;padding-bottom:4pt;font-size:9pt}
.grp.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.at{display:grid;grid-template-columns:1.9in 0.85in 0.85in 1fr;gap:0 10pt;align-items:end;border-bottom:0.8pt solid #CFC7B6;height:24pt;padding-bottom:4pt;font-size:9pt}
.at.h{border-bottom:1.5pt solid var(--forest);height:auto;padding-bottom:5pt;font:700 7.2pt/1.2 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest)}
.rng{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt}
.rng>div{background:var(--soft);border-radius:8pt;padding:11pt 12pt}
.rng .stat{font-size:21pt}
.rng .u{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--forest);margin:4pt 0 5pt}
.rng p{margin:0;font-size:9.1pt;line-height:1.38}
.tl{display:grid;grid-template-columns:repeat(6,1fr);gap:0;margin:8pt 0 4pt;border-top:2pt solid var(--forest)}
.tl>div{padding:7pt 6pt 0;border-left:0.6pt solid var(--line);font-size:8.6pt;line-height:1.3}
.tl>div:first-child{border-left:0}
.tl b{display:block;font:600 12pt/1 var(--serif);color:var(--clay);margin-bottom:3pt}
.md .mr{grid-template-columns:0.55in 1fr 0.36in;gap:0 5pt}
.md .mr .k{font-size:6.6pt;letter-spacing:.06em}
.md .mr .w{font-size:5.6pt;letter-spacing:.02em;padding-left:4pt}
.cmp{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt}
.cmp>div{background:#fff;border:1pt solid var(--line);border-radius:9pt;padding:11pt 12pt}
.cmp h3{margin:0 0 3pt;font-size:13pt}
.cmp .who{font:700 7pt/1.3 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:var(--clay);margin-bottom:6pt}
.cmp p{font-size:9.2pt;line-height:1.4;margin:0 0 5pt}
.mr .t .wl{border-bottom:0.6pt solid #CFC7B6 !important}
html.bw .cmp>div,html.bw .meal,html.bw .idea>div,html.bw .shop>div{background:#fff}
html.bw .rng>div{background:#fff;border:0.8pt solid #999}
</style>"""

T = "Trail Food Planner"
CREDIT = "Lindsey Mateo / Pexels"


def build(page, lines, opts):
    # ---------- 1 cover
    page('''<div class="cphoto"></div><div class="cshade"></div><div class="brand" style="position:relative">HikeSupply Co.</div>
<div class="art bwart"><svg width="500" height="340" viewBox="0 0 500 340" fill="none" stroke="#2C3B2E" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
<path d="M0 300 L120 170 L190 240 L280 120 L400 260 L450 220 L500 280"/>
<path d="M175 210 h150 v20 a75 75 0 0 1 -150 0 z"/><path d="M210 195 c-6 -14 6 -22 0 -36 M250 195 c-6 -14 6 -22 0 -36 M290 195 c-6 -14 6 -22 0 -36"/>
<path d="M325 222 h28"/></svg></div>
<div style="position:relative"><h1>Trail Food Planner</h1><p class="sub" style="max-width:6.2in">How much to pack, what to eat and when. Fill-in planners for a long day hike, a weekend overnight and a 3 to 5 day trip, with a food weight worksheet, no-cook and boil-only meal ideas, a shopping list and a repack checklist.</p>
<div class="meta" style="margin-top:22pt"><span>20 printable pages</span><span>lb + kg, oz + g</span><span>Day hikes to 5 days</span></div></div>''', 0, "cover photo")

    # ---------- 2 how to use
    page('''<div class="kicker">Start here</div><h2>How to use this planner</h2>
<p class="lead">Good trail food is simple: enough energy to enjoy the whole hike, nothing extra to carry, and nothing left behind. This planner walks you from the idea to the packed bag.</p>
<div class="steps2">
<div><div class="n">1</div><div><h3>Read the short guide</h3><p>Pages 3 to 9 explain how much food to plan, when to eat, what travels well, and whether you need a stove. Ten minutes of reading.</p></div></div>
<div><div class="n">2</div><div><h3>Fill in your plan</h3><p>Use the day hike planner (page 6), the overnight planner (page 10) or the 3 to 5 day planner (pages 11 and 12). Write in pencil so you can change it.</p></div></div>
<div><div class="n">3</div><div><h3>Weigh, shop, repack</h3><p>Weigh your food (page 13), make the shopping list (page 14), then repack and label everything by day (page 15).</p></div></div>
<div><div class="n">4</div><div><h3>Learn from each trip</h3><p>After the hike, note what you ate, what came home uneaten and what to change (page 19). Your next plan gets better every time.</p></div></div></div>
<div class="cols" style="margin-top:6pt"><div><h3 style="margin-top:6pt">Printing</h3><p>Print at Actual size on US Letter. An A4 file and a low-ink printer-friendly file are included. Print the fill-in pages again for every trip; they are yours to reuse for personal use.</p></div>
<div><h3 style="margin-top:6pt">Units</h3><table style="margin-top:2pt"><tr><th>Imperial</th><th>Metric</th></tr><tr><td>1 oz</td><td>28.35 g</td></tr><tr><td>1 lb = 16 oz</td><td>454 g</td></tr><tr><td>2.2 lb</td><td>1 kg</td></tr><tr><td>1 mile</td><td>1.61 km</td></tr></table></div></div>
<h3>What is inside</h3>
<table><tr><th>Pages</th><th>What</th><th>Pages</th><th>What</th></tr>
<tr><td>3 to 5</td><td>Why plan, how much, snack rhythm</td><td>13 to 15</td><td>Weight, shopping list, repack</td></tr>
<tr><td>6</td><td>Day hike food planner</td><td>16</td><td>Food storage and wildlife</td></tr>
<tr><td>7 to 9</td><td>No-cook and boil-only ideas, stoves</td><td>17 to 18</td><td>Group and diet needs, hot and cold</td></tr>
<tr><td>10 to 12</td><td>Overnight and 3 to 5 day planners</td><td>19</td><td>After-trip notes</td></tr></table>''', 2)

    # ---------- 3 why
    page('''<div class="kicker">The short guide</div><h2>Why food planning matters</h2>
<p class="lead">Food is fuel, weight and trash all at once. A few minutes of planning helps with all three.</p>
<div class="idea">
<div><div class="who">Energy</div><h3>Steady legs, clear head</h3><p>Hiking burns a lot of energy, and the body runs low faster on a climb, in the cold or with a heavy pack. Eating small amounts often keeps your pace steady and your decisions good late in the day, when most slips and wrong turns happen.</p></div>
<div><div class="who">Weight</div><h3>Every extra ounce is carried</h3><p>Food is often the heaviest thing in a backpack after water. Bringing too much is one of the most common beginner mistakes. Planning by weight per day keeps the pack lighter without leaving you hungry.</p></div>
<div><div class="who">Waste</div><h3>Pack it in, pack it out</h3><p>Every wrapper, peel and crumb goes home with you. Repacking food at home means less packaging on the trail and less trash to carry out.</p></div>
<div><div class="who">Wildlife</div><h3>Keep animals wild</h3><p>Bears, raccoons, squirrels and mice learn fast where food is. Careful storage protects your food and protects the animals, which can get into serious trouble once they learn to look for human food.</p></div></div>
<h3 style="margin-top:16pt">The three classic mistakes</h3>
<div class="steps2">
<div><div class="n">1</div><div><h3>Too much</h3><p>A heavy bag of food you carry back home. Plan by meals and by weight, and bring one sensible extra, not five.</p></div></div>
<div><div class="n">2</div><div><h3>Too little</h3><p>Running out of energy far from the car. Always carry extra food beyond the plan: it is one of the Ten Essentials.</p></div></div>
<div><div class="n">3</div><div><h3>Untested food</h3><p>A new meal you have never tried, a bar that melts, or crackers that turn to dust. Try new food at home or on a short hike first.</p></div></div>
<div><div class="n">4</div><div><h3>Bonus: no water plan</h3><p>Food and water go together. Salty snacks make you thirsty and dry meals need water to cook. Know where you will refill.</p></div></div></div>''', 3)

    # ---------- 4 how much
    page('''<div class="kicker">The short guide</div><h2>How much food should I bring?</h2>
<p class="lead">There is no single right number. These are common planning ranges that many hikers start from, then adjust after a few trips.</p>
<div class="rng">
<div><div class="stat">200&#8211;300</div><div class="u">calories per hour of hiking</div><p>A common starting point for day hikes: a small snack every hour or so instead of one big meal.</p></div>
<div><div class="stat">1.5&#8211;2.5 lb</div><div class="u">(0.7&#8211;1.1 kg) food per person per day</div><p>A common planning range for overnight and multi-day trips. Many beginners land near the middle.</p></div>
<div><div class="stat">100&#8211;125</div><div class="u">calories per ounce (3.5&#8211;4.4 per gram)</div><p>A handy target for trail food. Nuts, nut butters and oils are higher; fresh fruit is much lower.</p></div></div>
<h3 style="margin-top:14pt">What changes how much you need</h3>
<div class="cols" style="gap:0 20pt"><ul class="check"><li>Body size: bigger bodies need more</li><li>Distance, pace and the amount of climbing</li><li>Pack weight: a heavy pack costs energy</li></ul><ul class="check"><li>Cold weather: staying warm burns energy</li><li>Number of days: appetite often grows after day two</li><li>Your own appetite and experience</li></ul></div>
<h3>How to find your own number</h3>
<ol class="steps"><li>Start in the middle of the range for your trip type.</li><li>On a short trip, write down what you actually ate (page 19).</li><li>Weigh what came home uneaten and cut that next time. Hungry in the evening? Add a little more.</li><li>Always carry a small extra: one spare meal or a few extra snacks in case the hike runs long.</li></ol>
<div class="warn"><b>Not diet or medical advice.</b> These ranges are general planning numbers, not a prescription. If you have diabetes, a heart condition, food allergies, are pregnant, or follow a medical diet, ask your doctor or a registered dietitian how to plan food for long days outdoors.</div>
<div class="lab" style="margin-top:12pt">My starting numbers</div>
<div class="f2"><div class="fl">Day hikes <span class="u"><b></b>snacks per hour</span></div><div class="fl">Overnights <span class="u"><b></b>lb / <b></b>kg per day</span></div></div>''', 4)

    # ---------- 5 snack rhythm
    page('''<div class="kicker">The short guide</div><h2>Day hike snack rhythm</h2>
<p class="lead">Eat a little, often. Small snacks every hour or so keep energy steady, and short stops are good for checking the map, the weather and your feet.</p>
<h3>A sample 5-hour day hike</h3>
<div class="tl">
<div><b>Before</b>A real breakfast with some protein and fat, plus water.</div>
<div><b>1 h</b>Small snack: a handful of trail mix.</div>
<div><b>2 h</b>Salty snack and a good drink of water.</div>
<div><b>2.5 h</b>Lunch at the top or the lake.</div>
<div><b>3.5 h</b>Something sweet for the way down.</div>
<div><b>After</b>A snack in the car, water, rest.</div></div>
<div class="cols" style="margin-top:10pt">
<div><h3>Good habits</h3><ul class="check"><li>Eat before you feel hungry or tired</li><li>Mix salty and sweet: salt helps replace what you sweat out</li><li>Drink with every snack stop</li><li>Keep today's snacks in a hip belt or jacket pocket so stops stay short</li><li>Eat more on long climbs and in the cold</li><li>Keep one backup snack you do not touch unless the day runs long</li></ul></div>
<div><h3>What travels well</h3><table style="margin-top:2pt"><tr><th>Hot days</th><th>Cold days</th></tr>
<tr><td>Salted nuts, pretzels, crackers</td><td>Nut butter packets, trail mix</td></tr>
<tr><td>Dried fruit, fig bars</td><td>Chocolate and cookies</td></tr>
<tr><td>Hard cheese (eat early)</td><td>Cheese and salami-style sausage</td></tr>
<tr><td>Fresh fruit on day one</td><td>Warm drink in an insulated bottle</td></tr>
<tr><td>Electrolyte drink mix</td><td>Soft bars kept in an inside pocket</td></tr></table>
<p class="small">Chocolate and coated candy melt in the heat; many bars turn rock hard in the cold.</p></div></div>
<div class="box"><b>Feeling weak, shaky, grumpy or confused on the trail?</b> Stop, sit, eat something and drink. If you or a partner does not get better quickly, or feels very unwell, turn back and get help.</div>
<div class="lab" style="margin-top:12pt">My go-to trail snacks</div>''' + lines(3), 5)

    # ---------- 6 day hike planner
    hrs = "".join(f'<div class="hr"><div class="n">{h}</div><div></div><div></div><i></i></div>' for h in ["1 h", "2 h", "3 h", "4 h", "5 h", "6 h", "7 h", "8 h"])
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in</div><h2>Day hike food planner</h2></div><div class="r">Print one<br>for each hike</div></div>
<div class="f2"><div class="fl">Hike</div><div class="fl">Date</div><div class="fl">Distance <span class="u"><b></b>mi / <b></b>km</span></div><div class="fl">Climb <span class="u"><b></b>ft / <b></b>m</span></div><div class="fl">Expected time <span class="u"><b></b>hours</span></div><div class="fl">Start time</div></div>
<div class="lab" style="margin-top:14pt">Breakfast before the hike</div><div class="wl"></div>
<div class="lab">Snack plan, hour by hour</div>
<div class="hr h"><div>Hour</div><div>Snack</div><div>Weight oz / g</div><div>Eaten</div></div>{hrs}
<div class="f2" style="margin-top:6pt"><div><div class="lab">Lunch</div>{lines(2, 22)}</div><div><div class="lab">Backup food (do not eat unless needed)</div>{lines(2, 22)}</div></div>
<div class="f2"><div><div class="lab">Water: how much I carry, where I refill</div>{lines(2, 22)}</div><div><div class="lab">After-hike snack in the car</div>{lines(2, 22)}</div></div>
<div class="lab">Packed?</div>{opts("Snacks in a pocket", "Lunch", "Backup food", "Water and drink mix", "Trash bag for wrappers", "Wet wipes or hand sanitizer")}''', 6)

    # ---------- 7 no-cook ideas
    page('''<div class="kicker">Ideas</div><h2>No-cook trail food ideas</h2>
<p class="lead">No stove, no fuel, no washing up. Mix from each group so every snack stop has something salty, something sweet and something filling.</p>
<div class="idea">
<div><div class="who">Salty</div><h3>Crunch and salt</h3><ul><li>Salted nuts and seeds</li><li>Pretzels, crackers, rice crackers</li><li>Roasted chickpeas or broad beans</li><li>Sturdy chips in a hard container</li></ul></div>
<div><div class="who">Sweet</div><h3>Quick energy</h3><ul><li>Dried fruit: apricots, mango, dates, raisins</li><li>Fig bars and soft cookies</li><li>Gummies and hard candy</li><li>Chocolate on cool days</li></ul></div>
<div><div class="who">Filling</div><h3>Protein and fat</h3><ul><li>Jerky or meat sticks</li><li>Tuna or chicken in a pouch</li><li>Hard cheese, eaten in the first day or two</li><li>Peanut, almond or sunflower butter packets</li></ul></div>
<div><div class="who">Base</div><h3>Bread and grains</h3><ul><li>Tortillas: flat, sturdy, last for days</li><li>Bagels and pita</li><li>Granola or muesli</li><li>Bars you have tried at home</li></ul></div>
<div><div class="who">Day one only</div><h3>Fresh treats</h3><ul><li>Apples, oranges, baby carrots</li><li>A packed sandwich</li><li>Anything that needs a cooler, eaten early</li></ul></div>
<div><div class="who">Drinks</div><h3>In the bottle</h3><ul><li>Electrolyte powder</li><li>Instant coffee or tea (works cold too)</li><li>Powdered milk for cereal</li></ul></div></div>
<h3 style="margin-top:14pt">Easy no-cook combos</h3>
<div class="combo">
<div><p><b>Trail wrap:</b> tortilla, peanut butter, honey and banana chips.</p></div>
<div><p><b>Cracker lunch:</b> crackers, hard cheese, salami-style sausage, dried apricots.</p></div>
<div><p><b>Tuna wrap:</b> tortilla, tuna pouch, mayo or olive oil packet, salt and pepper.</p></div>
<div><p><b>Cold cereal:</b> granola and powdered milk, add cold water at the stop.</p></div></div>''', 7)

    # ---------- 8 boil-only
    page('''<div class="kicker">Ideas</div><h2>Boil-only meal ideas</h2>
<p class="lead">Boil water, pour, stir, cover and wait. These simple combos use food from a normal grocery store. Follow the cooking time on each package.</p>
<h3>Breakfast</h3>
<div class="combo">
<div><div class="tg">Warm and sweet</div><h3>Loaded oatmeal</h3><p>Instant oats, powdered milk, brown sugar, raisins and chopped walnuts. Bag it at home, add hot water in camp.</p></div>
<div><div class="tg">Savory</div><h3>Cheesy grits</h3><p>Instant grits, a little hard cheese and a pinch of salt and pepper. Add a crumbled meat stick if you like.</p></div>
<div><div class="tg">Fast</div><h3>Granola with hot milk</h3><p>Granola with powdered milk and hot water. Good on a cold morning when you want to move quickly.</p></div>
<div><div class="tg">Drink</div><h3>Coffee or cocoa</h3><p>Instant coffee, tea bags or hot cocoa mix. A warm drink makes a cold start much easier.</p></div></div>
<h3 style="margin-top:12pt">Dinner</h3>
<div class="combo">
<div><div class="tg">Quick</div><h3>Couscous with tuna</h3><p>Couscous, an olive oil packet, a tuna or chicken pouch and dried herbs. Couscous only needs to sit in hot water.</p></div>
<div><div class="tg">Comfort</div><h3>Mashed potatoes</h3><p>Instant mashed potatoes, hard cheese, shelf-stable bacon bits and black pepper.</p></div>
<div><div class="tg">Salty</div><h3>Peanut noodles</h3><p>Instant ramen, a peanut butter packet, a soy sauce packet and dried vegetables. Use only part of the flavor packet.</p></div>
<div><div class="tg">Filling</div><h3>Rice and beans</h3><p>Instant rice, dehydrated refried beans and taco seasoning, rolled in a tortilla.</p></div></div>
<div class="cols" style="margin-top:12pt"><div class="box" style="margin:0"><h3 style="margin-top:0">Ready-made meals</h3><p style="margin:0">Freeze-dried meals from an outdoor store are light and easy. Use the amount of water and the soaking time on the bag, and try one at home first.</p></div>
<div class="box" style="margin:0"><h3 style="margin-top:0">Save fuel</h3><p style="margin:0">Put the lid on the pot, turn the stove off once the water boils, and keep the soaking meal warm inside a jacket or an insulated pouch.</p></div></div>''', 8)

    # ---------- 9 stove
    page(f'''<div class="kicker">The short guide</div><h2>Stove or no stove?</h2>
<p class="lead">For a day hike, most people need no stove at all. For overnights, choose the simplest option that fits your trip and the local fire rules.</p>
<div class="cmp">
<div><div class="who">No stove</div><h3>Cold food and cold soak</h3><p>Lightest and simplest. No fuel and no fire risk. Some hikers soak couscous, oats or instant noodles in cold water for an hour.</p><p class="small">Best for: warm weather, short trips, fire bans.</p></div>
<div><div class="who">Canister stove</div><h3>Screw-on gas</h3><p>Fast, easy and quiet, with a valve you can turn off. Usually the easiest choice for a beginner. Performance can drop when it is close to or below freezing.</p><p class="small">Best for: most overnight trips.</p></div>
<div><div class="who">Alcohol stove</div><h3>Small liquid-fuel cup</h3><p>Very light and simple, but slower, hard to see the flame, and often not allowed during fire restrictions because it cannot be turned off.</p><p class="small">Best for: experienced hikers, mild weather.</p></div></div>
<h3 style="margin-top:14pt">Fuel planning basics</h3>
<ol class="steps"><li>At home, weigh your fuel canister, boil the amount of water you use for one meal, then weigh it again. The difference is your fuel per boil.</li><li>Count your boils: meals plus hot drinks for the whole trip.</li><li>Fuel per boil times boils is what you need. Bring a little extra: wind, cold and high elevation all use more.</li><li>Write your numbers here:</li></ol>
<div class="f3"><div class="fl">Fuel per boil <span class="u"><b></b>oz / g</span></div><div class="fl">Boils on trip</div><div class="fl">Fuel needed <span class="u"><b></b>oz / g</span></div></div>
<div class="warn" style="margin-top:14pt"><b>Stove safety.</b> Never cook inside a tent or a closed vestibule: there is a risk of fire and of carbon monoxide poisoning. Read and follow your stove maker's instructions, including what they say about windscreens. Check fire restrictions for your area before every trip: during fire bans some places allow only stoves with an on/off valve, and some allow no flame at all.</div>
<div class="lab" style="margin-top:12pt">My stove and fuel notes</div>{lines(4, 22)}''', 9)

    # ---------- meal card helper
    def card(title, sub, meals, h=2):
        rows = "".join(f'<div class="mr"><div class="k">{m}</div><div class="t">{lines(h, 19)}</div><div class="w">oz / g</div></div>' for m in meals)
        return f'<div class="meal"><div class="top"><h3>{title}</h3><span>{sub}</span></div>{rows}<div class="mr" style="border-bottom:0"><div class="k">Day total</div><div></div><div class="w">lb / kg</div></div></div>'

    # ---------- 10 overnight
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in</div><h2>Overnight meal planner</h2></div><div class="r">One night,<br>two days</div></div>
<div class="f2"><div class="fl">Trip</div><div class="fl">Dates</div><div class="fl">People</div><div class="fl">Stove</div></div>
<div class="m2" style="margin-top:12pt">
{card("Day 1", "Start", ["Lunch", "Snacks", "Dinner", "Dessert", "Drinks"], 3)}
{card("Day 2", "Finish", ["Breakfast", "Hot drink", "Snacks", "Lunch", "Spare food"], 3)}</div>
<div class="f3" style="margin-top:8pt"><div class="fl">Trip food weight <span class="u"><b></b>lb / <b></b>kg</span></div><div class="fl">Water sources</div><div class="fl">Food storage</div></div>
<div class="lab" style="margin-top:12pt">Notes</div>{lines(3, 22)}''', 10)

    # ---------- 11-12 multi-day
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in · 1 of 2</div><h2>3 to 5 day meal planner</h2></div><div class="r">Days 1 to 3</div></div>
<div class="f2"><div class="fl">Trip</div><div class="fl">Dates</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10pt;margin-top:10pt">
{"".join(card(f"Day {d}", "", ["Breakfast", "Snacks", "Lunch", "Snacks", "Dinner", "Drinks"], 4) for d in (1, 2, 3))}</div>''', 11, "md")
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in · 2 of 2</div><h2>3 to 5 day meal planner</h2></div><div class="r">Days 4 and 5,<br>trip totals</div></div>
<div class="m2" style="margin-top:4pt">
{card("Day 4", "", ["Breakfast", "Snacks", "Lunch", "Snacks", "Dinner", "Drinks"], 3)}
{card("Day 5", "", ["Breakfast", "Snacks", "Lunch", "Snacks", "Dinner", "Drinks"], 3)}</div>
<div class="lab" style="margin-top:12pt">Trip totals</div>
<div class="f3"><div class="fl">Days</div><div class="fl">People</div><div class="fl">Spare meals</div><div class="fl">Food <span class="u"><b></b>lb / <b></b>kg</span></div><div class="fl">Per day <span class="u"><b></b>lb / <b></b>kg</span></div><div class="fl">Fuel <span class="u"><b></b>oz / g</span></div></div>
<div class="lab" style="margin-top:12pt">Resupply, water and notes</div>{lines(2, 22)}''', 12)

    # ---------- 13 weight worksheet
    rows = "".join('<div class="fw"><div></div><div></div><div></div><div></div></div>' for _ in range(17))
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in</div><h2>Food weight worksheet</h2></div><div class="r">Use a kitchen scale</div></div>
<p style="font-size:9.6pt">Weigh each item once in its trail bag. Weight of one serving times the number of servings gives the total. Add up the totals, then divide by the number of days.</p>
<div class="fw h"><div>Food item</div><div>One serving oz / g</div><div>Servings</div><div>Total oz / g</div></div>{rows}
<div class="tot" style="grid-template-columns:repeat(3,1fr)"><div>Trip total<br><br>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;lb / &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;kg</div><div>Days on trail</div><div>Per day<br><br>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;lb / &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;kg</div></div>
<p class="small" style="margin-top:8pt">Quick check: compare your per-day weight with the common 1.5&#8211;2.5 lb (0.7&#8211;1.1 kg) range on page 4. 16 oz = 1 lb. 1,000 g = 1 kg. 1 lb = 454 g.</p>''', 13)

    # ---------- 14 shopping list
    secs = [("Breakfast", 6), ("Bread and tortillas", 6), ("Nuts and dried fruit", 6), ("Bars and sweets", 6), ("Cheese and meat", 6), ("Pasta, rice, potatoes", 6), ("Pouches and cans", 6), ("Drinks and mixes", 6), ("Spices and extras", 6), ("Outdoor store", 6), ("Packing supplies", 6), ("Other", 6)]
    shop = "".join(f'<div><h3>{s}</h3>' + "".join('<div class="r"><i></i></div>' for _ in range(n)) + "</div>" for s, n in secs)
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in</div><h2>Shopping list</h2></div><div class="r">Grouped by<br>store section</div></div>
<div class="shop">{shop}</div>
<p class="small" style="margin-top:8pt">Packing supplies: zip bags, a marker, labels, a bag for trash. Outdoor store: freeze-dried meals, fuel, a bear canister if your area needs one.</p>''', 14)

    # ---------- 15 repack
    page('''<div class="kicker">Checklist</div><h2>Repack and label checklist</h2>
<p class="lead">Repacking at home makes food lighter, smaller, easier to find, and leaves less trash on the trail.</p>
<div class="cols"><div><h3>Before you pack</h3><ul class="check"><li>Take food out of boxes and big packaging</li><li>Cut out the cooking directions and put them in the bag</li><li>Bag each meal: one bag, one meal</li><li>Squeeze the air out of every bag</li><li>Double-bag powders and anything crumbly</li><li>Put oils and sauces in small leak-proof bottles</li><li>Label each bag with the day, the meal and the water to add</li><li>Weigh it all and fill in page 13</li></ul></div>
<div><h3>In the pack</h3><ul class="check"><li>One bag per day, in the order you will eat it</li><li>Today's snacks in a pocket you can reach</li><li>Day one lunch on top</li><li>Spare food packed and marked as spare</li><li>An empty bag just for trash and wrappers</li><li>Food fits in the canister or bag you will store it in</li><li>Lighter or matches packed with the stove</li><li>A copy of this menu left at home with your trip plan</li></ul></div></div>
<div class="box forest" style="margin-top:12pt"><h3>Pack out every wrapper</h3><p style="margin:0">Orange peels, apple cores and nut shells are trash too: they take a long time to break down and teach animals to look for food. Everything that came in goes back out.</p></div>
<div class="lab" style="margin-top:14pt">My own extra steps</div>''' + lines(6), 15)

    # ---------- 16 storage
    page(f'''<div class="kicker">The short guide</div><h2>Food storage: bears and critters</h2>
<p class="lead">The rule is set by the place, not by you. Before every overnight trip, check the park or forest website or call the ranger station for its food storage rule.</p>
<div class="cmp">
<div><div class="who">Hard-sided</div><h3>Bear canister</h3><p>A rigid, locking container. Required in some places, for example much of Yosemite's wilderness and parts of New York's Adirondacks. Use an approved model where one is required.</p></div>
<div><div class="who">Provided</div><h3>Food lockers and poles</h3><p>Many campgrounds and some backcountry sites have metal food lockers or bear poles. Use them for all food and scented items, and close them every time.</p></div>
<div><div class="who">Where allowed</div><h3>Hanging food</h3><p>A classic method, often taught as at least 10 ft (3 m) up and 4 ft (1.2 m) from the trunk. It is hard to do well, and many areas no longer accept it.</p></div></div>
<div class="cols" style="margin-top:12pt"><div><h3>Store everything with a smell</h3><ul class="check"><li>All food, snacks and drink mixes</li><li>Trash and wrappers</li><li>Toothpaste, sunscreen, lip balm, wipes</li><li>Cooking pot and stove</li></ul></div>
<div><h3>Good camp habits</h3><ul class="check"><li>Never keep food in the tent</li><li>Cook and store food well away from where you sleep; 200 ft (about 60 m) is a common guideline</li><li>Do not leave your pack open or alone</li><li>Never feed wildlife, not even squirrels or birds</li></ul></div></div>
<div class="warn"><b>In bear country,</b> learn the local advice before you go: park and forest websites explain what to do if you meet a bear in that area. Rules and advice differ between black bear and grizzly country.</div>
<div class="f2"><div class="fl">My trip's food storage rule</div><div class="fl">Checked on (website or ranger)</div></div>
<div class="lab" style="margin-top:12pt">Wildlife notes for this trip</div>{lines(4, 22)}''', 16)

    # ---------- 17 group & diet
    gr = "".join('<div class="grp"><div></div><div></div><div></div></div>' for _ in range(6))
    wb = "".join('<div class="grp"><div></div><div></div><div></div></div>' for _ in range(7))
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in</div><h2>Group food plan and diet needs</h2></div><div class="r">For two or<br>more hikers</div></div>
<div class="lab">Who is coming and what they need</div>
<div class="grp h"><div>Name</div><div>Allergies or diet</div><div>Notes (likes, dislikes, medication location)</div></div>{gr}
<div class="lab" style="margin-top:14pt">Who brings what</div>
<div class="grp h"><div>Item or meal</div><div>Who brings it</div><div>Notes (weight, shared or own)</div></div>{wb}
<div class="cols" style="margin-top:12pt"><div><h3 style="margin-top:0">Shared gear</h3>{opts("Stove", "Fuel", "Pot", "Lighter", "Bear canister", "Water filter", "Trash bag")}</div>
<div class="box" style="margin:0"><p style="margin:0;font-size:9.4pt">Anyone with a serious allergy carries their own prescribed medication and shows the group where it is. Read every label, including "may contain", and keep allergy-safe food in its own bag. Ask a doctor if you are unsure.</p></div></div>''', 17)

    # ---------- 18 hot and cold
    page('''<div class="kicker">The short guide</div><h2>Food in hot and cold weather</h2>
<p class="lead">The same snack can melt into a puddle in July and freeze into a brick in January. Plan for the weather you expect.</p>
<div class="idea">
<div><div class="who">Hot days</div><h3>Keep it from melting or spoiling</h3><ul><li>Skip chocolate and coated candy; pick dried fruit, gummies and hard candy</li><li>Choose hard cheese over soft cheese and eat it early</li><li>Eat fresh and perishable food on day one</li><li>Keep food deep in the pack, away from the sun</li><li>Salty snacks plus electrolyte drink mix help replace what you sweat out</li><li>Drink often: start the hike well hydrated</li></ul></div>
<div><div class="who">Cold days</div><h3>Keep it soft and keep eating</h3><ul><li>Carry today's snacks in an inside pocket so they stay soft</li><li>Eat more often: staying warm uses energy</li><li>A warm drink in an insulated bottle helps at every stop</li><li>Keep water bottles in an insulated sleeve or inside the pack</li><li>Storing a bottle upside down helps stop ice forming at the lid</li><li>Canister stoves can weaken in freezing weather; keep the canister warm before use</li></ul></div></div>
<h3 style="margin-top:14pt">Water and food work together</h3>
<p>Dry trail food needs water: to drink with salty snacks and to cook boil-only meals. Plan where you will refill, carry a way to treat water from streams and lakes, and follow the instructions of your filter or treatment. You can still get dehydrated in cold weather, so keep drinking even when you do not feel thirsty.</p>
<div class="f2"><div class="fl">Expected temperature <span class="u"><b></b>°F / <b></b>°C</span></div><div class="fl">Water refill points</div></div>
<div class="lab">My changes for this weather</div>''' + lines(6), 18)

    # ---------- 19 after-trip
    ar = "".join('<div class="at"><div></div><div></div><div></div><div></div></div>' for _ in range(9))
    page(f'''<div class="ph"><div><div class="kicker" style="margin-bottom:5pt">Fill in</div><h2>After-trip notes</h2></div><div class="r">Fill in within<br>a day of coming home</div></div>
<div class="f2"><div class="fl">Trip</div><div class="fl">Dates</div></div>
<div class="lab" style="margin-top:12pt">What I packed and what happened</div>
<div class="at h"><div>Food</div><div>Ate it all?</div><div>Came home oz / g</div><div>Next time</div></div>{ar}
<div class="f2" style="margin-top:8pt"><div><div class="lab">Best food of the trip</div>{lines(2, 22)}</div><div><div class="lab">Never again</div>{lines(2, 22)}</div></div>
<div class="f2"><div><div class="lab">Was I hungry? When?</div>{lines(2, 22)}</div><div><div class="lab">Food weight next time per day</div>{lines(2, 22)}</div></div>
<div class="lab">Notes</div>{lines(4, 22)}''', 19)

    # ---------- 20 back
    page(f'''<div class="brand">HikeSupply Co.</div>
<div><h2>Planning your first night out?</h2><p style="font-size:12pt;max-width:5.6in;margin-top:10pt">Pair this planner with the rest of your trip.</p>
<div class="bk" style="margin-top:22pt">
<div><h3>First Backpacking Trip</h3><p>A beginner's guide and planner for your first night on the trail: an easy route, the gear, the night in camp.</p><div class="u">hikesupplyco.com</div></div>
<div><h3>Camping Trip Planner</h3><p>Checklists for tent and car camping at a campground: booking, meals, the camp kitchen and packing the car.</p><div class="u">hikesupplyco.com</div></div></div></div>
<div><p style="font-size:9pt;max-width:6.4in">The numbers in this planner are common planning ranges, not diet or medical advice. Food storage rules and fire restrictions change: check the official website of the park or forest, or ask a ranger, before every trip, and hike within your experience. For personal use: print as many copies as you like for yourself and your family. Cover photo: {CREDIT}.</p>
<p style="font-size:10pt;margin-top:10pt"><b style="color:#F5F1EA">hikesupplyco.com</b></p></div>''', 0, "back")
