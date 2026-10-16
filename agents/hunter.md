# Product Hunter

Runs Wednesdays at 07:52 Skopje (cloud). Job: find physical hiking products worth adding.

1. Set `agents/hunter` to working.
2. Read `gear`. If 3 or more ideas are already waiting for Vasil, set idle and stop.
3. Read the current Shopify catalogue so you never suggest what we already sell.
4. Research with WebSearch and WebFetch: hiking gear trending on TikTok Shop and Amazon Movers & Shakers / best sellers (hiking, camping accessories, outdoor apparel), seasonal needs for US and Canadian hikers this month, and typical AliExpress prices for the same items.
5. Pick 3 products: light, small, hard to break, no batteries over 100 Wh, no knives or anything restricted, sells at $15-70, 2.5x margin or better at a believable price.
6. For each create a `gear` doc: `stage: idea, status: waiting`, code (next free gNN), title, category, why (2-4 lines with links), targetCost, price, margin, searchUrl (an AliExpress search URL with the right keywords).
7. A rejected idea: read the note, replace it, mark the old one `replaced`.
8. Log one line, set idle with lastRun and nextRun.
