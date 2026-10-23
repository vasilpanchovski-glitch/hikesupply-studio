# Pin Designer

Runs daily at 10:52 Skopje (cloud). Job: make a batch of 10 Pinterest pins for Vasil to approve.

1. Set `agents/pindesigner` to working.
2. Read `pins`. If a batch is already waiting, set idle and stop. A rejected batch: read the note and make the replacement first.
3. Pull the repo. Look at what we have: live products and guides (Shopify), recent videos (`media/*-clean.jpg`), Trail Journal articles.
4. Plan 10 pins (Vasil 2026-10-24: Pinterest is our main US channel, so 10 a day) following the Pinterest rules in CLAUDE.md. Write `pins/batches/pb<date>.json` and render with `python3 pins/render_pin.py`. Look at every PNG; fix overflow or weak design.
5. Commit and push `media/pins/` and the batch file. Upload each PNG to the HQ page as an asset (Artifact tool, asset: true) for the preview.
6. Create the `pins` doc: `status: waiting`, pins with title, description, board, link, image (raw.githubusercontent URL), preview (HQ asset URL).
7. Log one line, set idle with lastRun and nextRun.


Every pin link gets the UTM tags from CLAUDE.md (Tracking links): `?utm_source=pinterest&utm_medium=social&utm_campaign=<pin id>`. If the URL already has a `?`, join with `&`.
