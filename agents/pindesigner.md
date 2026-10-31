# Pin Designer

Runs daily at 10:52 Skopje (cloud). Job: make a batch of 10 Pinterest pins for Vasil to approve.

1. Set `agents/pindesigner` to working.
2. Read `pins`. If a batch is already waiting, set idle and stop. A rejected batch: read the note and make the replacement first.
3. Pull the repo. Look at what we have: live products and guides (Shopify), recent videos (`media/*-clean.jpg`), Trail Journal articles.
4. Plan 10 pins (Vasil 2026-10-24: Pinterest is our main US channel, so 10 a day) following the Pinterest rules in CLAUDE.md. Write `pins/batches/pb<date>.json` and render with `python3 pins/render_pin.py`. Look at every PNG; fix overflow or weak design.
5. Commit and push `media/pins/` and the batch file. Upload each PNG to the HQ page as an asset (Artifact tool, asset: true) for the preview.
6. Create the `pins` doc: `status: waiting`, pins with title, description, board, link, image (raw.githubusercontent URL), preview (HQ asset URL).
7. Log one line, set idle with lastRun and nextRun.


Etsy pins (Vasil 2026-10-31): 2 of the 10 pins in every batch link to one of our live Etsy listings, from `etsy/live.json` (url, title, price, slug). Rotate through the list so each listing gets a turn (check the last batches in `pins/batches/` and skip listings pinned in the last 14 days). Keyword-first title and description written for that product, like any other pin. For the image, use our own Etsy listing image: render it with `python3 etsy/render.py etsy/listings/<slug>.json` if `etsy/out/<slug>/01.jpg` is missing, then build the pin from that image or from the product's `media/*-clean.jpg` frames. Board: the one that fits the product. The other 8 pins keep linking to hikesupplyco.com.

Every pin link gets the UTM tags from CLAUDE.md (Tracking links): `?utm_source=pinterest&utm_medium=social&utm_campaign=<pin id>`. If the URL already has a `?`, join with `&`.
