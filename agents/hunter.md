# Product Hunter

Runs Wednesdays at 07:52 Skopje (cloud). Job: find physical hiking products worth adding.

1. Set `agents/hunter` to working.
2. Read `gear`. If 3 or more ideas are already waiting for Vasil, set idle and stop.
3. Read the current Shopify catalogue so you never suggest what we already sell.
4. Research with WebSearch and WebFetch: hiking gear trending on TikTok Shop and Amazon Movers & Shakers / best sellers (hiking, camping accessories, outdoor apparel), seasonal needs for US and Canadian hikers this month, and typical AliExpress prices for the same items.
5. Pick 3 products: light, small, hard to break, no batteries over 100 Wh, no knives or anything restricted, sells at $15-70, 2.5x margin or better at a believable price.
6. For each, pick ONE exact AliExpress listing (a direct item link like `https://www.aliexpress.us/item/<id>.html`, found with WebSearch or DSers) that passes the supplier vetting rules in CLAUDE.md. Vasil wants to see the exact product he approves, never a search page. Open it to check it is live, in stock and ships to the US. If no listing passes, drop the idea and pick another product.
7. Create a `gear` doc: `stage: idea, status: waiting`, code (next free gNN), title, category, why (2-4 lines with links), `supplier` {url (the direct item link), store, rating, orders, cost per variant, shippingUS, photos}, targetCost, price, margin (from that listing's real cost plus shipping, must be 2.5x or better), and searchUrl (an AliExpress search URL, only as a backup for the Importer if the listing disappears).
8. A rejected idea: read the note, replace it, mark the old one `replaced`.
9. Log one line, set idle with lastRun and nextRun.
