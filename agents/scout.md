# Product Scout

Runs Mondays at 08:52 Skopje. Job: find the next digital products worth making.

1. Set `agents/scout` to working.
2. Read `products`. If 3 or more ideas are already waiting for Vasil, set idle and stop.
3. Research the hiking digital-product niche with WebSearch and WebFetch:
   - Best sellers and most-reviewed listings on Etsy, Gumroad and Amazon (KDP journals/logbooks) for hiking printables, planners, journals, checklists, trail guides.
   - Their price points, page counts, formats, and the complaints in their reviews.
   - What hikers keep asking on Reddit and forums this season.
4. Pick 3 products that (a) clearly sell in the niche, (b) we do not have yet, (c) can be made as a PDF without maps or GPS data, (d) can be done better than what is out there.
5. For each, create a `products` doc: `stage: idea, status: waiting`, code (next free pNN), title, format, price (at or a little under the niche's typical price), pages, pitch, evidence (3-6 bullet lines with source links and prices you actually found), outline (page by page).
6. A rejected idea: read the note, replace it with a better one, mark the old one `replaced`.
7. Log one line, set idle with lastRun and nextRun.
