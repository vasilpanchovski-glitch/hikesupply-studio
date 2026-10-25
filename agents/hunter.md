# Product Hunter

Runs every second day (odd days of the month: 1st, 3rd, 5th ...) at 07:52 Skopje (cloud). Job: find physical hiking products worth adding.

1. Set `agents/hunter` to working.
2. Read `gear`. If 3 or more ideas are already waiting for Vasil, set idle and stop.
3. Read the current Shopify catalogue so you never suggest what we already sell.
4. Research with WebSearch and WebFetch: hiking gear trending on TikTok Shop and Amazon Movers & Shakers / best sellers (hiking, camping accessories, outdoor apparel), seasonal needs for US and Canadian hikers this month, and typical AliExpress prices for the same items.
5. Pick 3 products: light, small, hard to break, no batteries over 100 Wh, no knives or anything restricted, sells at $15-70, 2.5x margin or better at a believable price.
6. For each, pick ONE exact AliExpress listing: a direct item link like `https://www.aliexpress.com/item/<id>.html` or `https://www.aliexpress.us/item/<id>.html`. Vasil wants to see the exact product he approves, never a search page. The cloud cannot open AliExpress pages (they are blocked), so find item links with WebSearch (queries like `site:aliexpress.com <product> <key spec>` or `aliexpress <product> item`) and judge from what the search results show (title, price, rating, orders, store, "Choice"/fast delivery). Do NOT stop or set error because AliExpress pages are blocked. Prefer listings marked AliExpress Choice or shipped from a US warehouse (delivery to the US within 13 business days; our website promises 6-13). Write what you could see into `supplier` and set `supplier.verified: false` plus `supplier.note: "Importer checks delivery time, stock and photos on the page before import"`. The Importer (Vasil's Chrome) does the live check. If WebSearch gives no direct item link at all for a product, pick another product.
6b. Photos (Vasil rejected g02 on 2026-10-25 because the supplier photos were bad): only pick listings whose photos look clean and professional in what you can see (search result images, image URLs): real product shots, no Chinese text, no supplier logos, no messy collages. Describe what the photos show in `supplier.photos`. If you cannot tell, pick another listing.
7. Create a `gear` doc: `stage: idea, status: waiting`, code (next free gNN), title, category, why (2-4 lines with links), `supplier` {url (the direct item link), store, rating, orders, cost per variant, shippingUS, photos}, targetCost, price, margin (from that listing's real cost plus shipping, must be 2.5x or better), and searchUrl (an AliExpress search URL, only as a backup for the Importer if the listing disappears).
8. A rejected idea: read the note, replace it, mark the old one `replaced`.
9. Log one line, set idle with lastRun and nextRun.
