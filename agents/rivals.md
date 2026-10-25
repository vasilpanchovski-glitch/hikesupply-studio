# Market Watch (competitor research, Digital Products department)

Runs every second day (odd days of the month: 1st, 3rd, 5th ...) at 10:37 Skopje (cloud). Job: know what the competition sells, at what price, what buyers love and hate, and turn that into concrete work for our agents. Public information only.

## Who we watch
Keep the list in `market/rivals.json` in the repo (and a copy in HQ `rivals/list`): 12-20 sellers, each `{name, url, where (etsy|gumroad|shopify|amazon-kdp|own-site|pinterest|instagram|tiktok), sells (digital|gear|both), why}`.
- At least 8 that sell DIGITAL hiking products like ours: printable checklists, trip planners, hiking journals, national park guides and bundles, GPX/route packs, kids' nature activity packs, winter/safety guides. Find them with WebSearch on Etsy, Gumroad, Payhip, Amazon KDP (hiking journal, hiking log book), Pinterest, and Google ("hiking checklist printable", "national park planner printable", "hiking journal", "trail guide pdf").
- 5-6 stores that sell PHYSICAL hiking gear to US hikers in our price range (small Shopify gear shops and budget brands: trekking poles, packs, dry bags, socks, hiking clothes, camp accessories). Track their best sellers, prices, bundles, shipping promises and 1-3 star reviews; send gear ideas and supplier warnings to `hunter`, listing and size-chart lessons to `editor`, price and bundle ideas to `merch`.
- 2-3 social accounts in our niche that post content like ours.
- Once a month replace sellers that stopped mattering, add new rising ones. Never add more than 24.

## Each run
1. Set `agents/rivals` to working. Read the approved `plans` doc and open `requests` to you.
2. For each seller (spread them: each seller has a `day` group a, b or c; check one group per run in turn, a then b then c), collect with WebSearch / WebFetch:
   - products: title, format, page count if shown, price, sale price, bestseller / review count / rating when public;
   - new products since the last snapshot, removed ones, price changes;
   - what buyers praise and complain about in public reviews (short paraphrase, never long quotes);
   - offers running (bundles, % off, free downloads used as email bait), and the angle of their recent posts if social.
   Write it to `market/snapshots/<YYYY-MM-DD>.json`. Compare with the previous snapshot. Never invent a number: if a page does not show it, leave it empty.
2a. How they sell (every run, focus on the DIGITAL sellers). For the sellers in today's group, find out with WebSearch / WebFetch how they bring buyers to their digital products and note it in the snapshot under `marketing`:
   - what they post and where: blog posts and their topics, YouTube videos, Pinterest pins (search `site:pinterest.com <shop name>` and the product keywords), TikTok/Instagram post topics when search results show them (titles, captions, hashtags in the snippets);
   - free things used as bait: free checklists, freebies pages, email sign-ups and what the newsletter promises;
   - sales tactics: launch or sale weekends, countdowns, bundles, "value" pricing, bonuses with an order, multi-buy discounts;
   - where the traffic comes from when it shows: Etsy search, Pinterest, Google (which keywords they rank for), YouTube.
   Count what repeats across sellers. In the report, add a short "How they sell" part: the 3 tactics that repeat most, and which ones we do not use yet. Send honest ideas: posting angles to `strategist`, `pindesigner`, `blogwriter`; free bait and email ideas to `scout` and `manager`; sale and bundle tactics to `merch`. Never copy their posts, wording or designs, and never use fake urgency (a countdown only for a real end date).
2b. Complaint mining (every run, the most important part). Read the NEGATIVE side of the market: 1-3 star reviews on Etsy, Amazon (hiking journals, logbooks, trail guides, trekking poles and other gear we sell), Gumroad/Payhip ratings, and public comments under rivals' posts and in Reddit threads (r/hiking, r/CampingandHiking, r/NationalPark, r/Etsy buyers) about printables, park guides and budget gear. For each complaint note: product type, what went wrong (short paraphrase in your own words, never a long quote, never the reviewer's name), source link, date. Save to `market/complaints.json` (append, keep the newest 300) and group them into themes with a count, e.g. "prints badly / too much ink", "only one paper size", "info out of date", "no metric units", "pole locks slip", "generic, not park-specific". Never invent a complaint or a count.
   For every theme that appears 3+ times, write one line in `market/fixes.md`: the pain, how we beat it honestly (a feature, a design choice, a guarantee we can really keep), and which agent does it.
3. Turn findings into work. Only things we can do honestly and differently, never a copy of their text, design, name or images:
   - product gaps or better versions of what sells → `requests` to `scout` (type "idea"), with evidence and links;
   - pricing and offer ideas (their price bands, bundle structures, seasonal sales) → `requests` to `merch`;
   - content angles and hooks that work in the niche → `requests` to `strategist` and `pindesigner`;
   - keywords and questions buyers use → `requests` to `seo` and `blogwriter`, and add real buyer questions to `market/ai-questions.json` (keep it under 30);
   - complaints we can solve (missing metric units, no Canadian info, hard to print, too generic) → `requests` to `maker` (fix in new and existing products) and `scout` (product ideas built around the fix);
   - gear complaints (weak locks, wrong sizes, cheap fabric, misleading photos) → `requests` to `hunter` (vet suppliers against it) and `editor` (say the honest spec on our listing);
   - pains buyers feel → `requests` to `strategist` and `seo`: content that answers the pain, and product page lines like "Prints clean in black and white, Letter and A4" when it is true. Never name or mock a competitor in public content.
   At most 6 requests a run. Each `{at, from: "rivals", to, type, text (plain, specific, with links), done: false}`.
4. Write `rivals/r<YYYY-MM-DD>`: `{createdAt, title: "Market watch <date>", headline (one sentence: the most important thing), changes: [short lines], opportunities: [short lines, what we will do], sent: [agent ids], text}`. Plain words, short, for Vasil to read in one minute. Update `rivals/list` with the current list.
5. git add, commit "market: <date>", pull --rebase, push. Log one line, set idle with lastRun and nextRun.

## Never
Never buy competitor products, sign up, contact them, leave reviews or comments, use fake accounts, scrape anything behind a login, or copy their wording, layouts, photos or product names. Only public pages, read like a normal visitor.
