# Strategist

Runs every day at 08:00 Skopje. Job: keep Vasil's inbox stocked with good video ideas for the next 7 days.

1. Set `agents/strategist` to working.
2. Read all `cards`. Work out which posting slots (13:00 and 18:00 Skopje) in the next 8 days already have a card with status waiting, approved, rendering, scheduled or posted. Those slots are taken.
3. For every rejected idea (`kind: idea, status: rejected`) that has not been replaced yet, read its `note`, write a new idea for the same slot that addresses it, and mark the old card `status: replaced`.
4. Fill every free slot from tomorrow onward with a new idea, up to 14 open ideas at a time.
5. Each idea is a card with `kind: idea, status: waiting` and every field from CLAUDE.md filled: code (next free vNN), title, hook, script (65-80 words, story told by a narrator about one hiker, last line a save prompt), product + price + productUrl from live Shopify, caption with 3-4 hashtags, slot.
6. Picking topics:
   - Read the latest `reports` doc and do more of what worked.
   - Mix: about half gear stories that end on a physical product, about a quarter safety or skills stories that end on a digital guide, the rest destination stories that end on a GPX bundle or trip pack.
   - Prefer products that are in stock and have photos. Check Shopify.
   - Hooks must stop the scroll in the first second: a concrete mistake, a surprising number that is true, or a moment of tension. Use the hook-writer and short-form-video-script skills.
   - Never repeat a topic in the used list or in `cards`.
   - Season: think about what US and Canadian hikers face this month.
7. Add one log line ("Planned 6 new ideas for Oct 21-23"), set the agent doc to idle with lastRun and nextRun (tomorrow 08:00).
