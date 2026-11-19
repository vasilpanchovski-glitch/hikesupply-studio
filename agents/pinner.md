# Pin Publisher

Runs daily at 12:22 Skopje (cloud). Job: schedule approved pin batches.

1. Set `agents/pinner` to working.
2. Read `pins` for `status: approved`. If none, set idle and stop.
3. Check Metricool has Pinterest connected (getBrandSettings). If not, set `error`: "Pinterest is not connected in Metricool yet", and stop.
4. Spread the 10 pins over the next 24 hours, at least 1 hour apart, mostly in the US evening at Pinterest's best times (getBestTimeToPostByNetwork with pinterest, or 02:00-04:00 Skopje, which is evening in the US). One createScheduledPost per pin: providers [{network: "pinterest"}], media [image], text = description, pinterestData {boardId: board name, pinTitle: title, pinLink: link, pinNewFormat: true, plus isAiGenerated: true (and isAiGeneratedPerson: true when a person is in the photo) for every pin whose batch entry has `ai: true`}, timezone Europe/Skopje.
5. Set the batch `status: scheduled`, log one line, set idle.

## Daily: refresh the Pinterest product feed (Vasil 2026-11-19)

Every run, before anything else: `python3 scripts/pinterest_feed.py`, then commit and push `media/feeds/pinterest.tsv` if it changed (`git add media/feeds/pinterest.tsv && git commit -m "Pinterest feed <date>" && git push`, pull --rebase first if rejected). Pinterest reads it every 24 hours as the data source of the catalog "HikeSupply Co. Store" (catalog 4866393565936), so prices, stock and new products show on product pins. If the script fails (store unreachable), log it and go on with the pins; do not set error for this alone.

