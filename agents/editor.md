# Listing Editor

Runs daily at 10:22, 18:22 and 22:22 Skopje (cloud). Job: turn raw imports into finished listings with our own studio photos, and publish the ones Vasil gave the go.

1. Set `agents/editor` to working.
2. Read `gear` fresh with ArtifactData (every doc, every run). Decide only by each doc's current `stage` and `status`, never by your own earlier task text or log lines: `stage: photos, status: approved` means the photos are finished (made by you or by Claude).
3. For each `stage: import, status: manual` (Vasil imported it himself through DSers): find the new draft in Shopify (recently created drafts matching the idea's title and category). If found, set `shopifyId`, `adminUrl`, `stage: imported, status: approved` and continue with it below. If not found, set `status: waiting` with `importIssue: "I could not find your import in Shopify drafts yet"` and move on.
4. For each `stage: imported, status: approved` (at most 2 per run):
   - Fetch the Shopify product. Follow every store rule in CLAUDE.md: title, honest description from the photos and specs, size chart for clothing, variant and option cleanup, dual size labels, SKUs, productType, price from the doc (check it still gives 2.5x on the real supplier cost), inventory policy, collections. Keep it a DRAFT.
   - Make the photos yourself (Vasil 2026-11-09: Claude does the photos, Vasil no longer edits them). Follow the "Product photos" store rule in CLAUDE.md:
     - Download the supplier images from Shopify into `build/photos/<handle>/src_NN.jpg` (downscale anything over 2000 px first, large files crash rembg).
     - `python3 scripts/photos/prep.py <in> <out> [crop=x0,y0,x1,y1] [blank=x0,y0,x1,y1]` to crop or paint out supplier text and logos (fractions of width and height).
     - `python3 scripts/photos/studio.py cut <in> <out>` for product shots, `flat` for white-background diagrams with useful labels, and `TITLE="..." SUB="line1|line2" python3 scripts/photos/studio.py cut ...` for feature cards with true facts from our own description. Thin or tiny products that break when cut out: use `flat`. Never keep supplier photos with dark, snowy or scene backgrounds or infographics, and never cut out people.
     - Look at every result before using it (contact sheet). Redo anything with halos, cut edges, leftover supplier text, odd colours or a visible box edge.
     - At least 4 photos, all on the same warm studio background. Hero first, then clean product shots, then feature and size cards. Recolouring is fine only to show a colour we really sell.
     - Commit them to `media/store-photos/<handle>/` and push, then add them with productUpdate media (originalSource = the raw.githubusercontent URL, with a plain alt text). Link each colour or style photo to its variant (productVariantsBulkUpdate mediaId).
     - Detach the old supplier photos with fileUpdate referencesToRemove (they stay in Shopify Files). Never delete images.
   - Set `stage: photos, status: approved`, `photoNote: "Photos done by the Editor <date>: ..."` and continue with step 5 in the same run.
5. For each `stage: photos, status: approved`:
   - Final check: description, price, variants, at least 4 photos, size chart where needed.
   - Publish (status ACTIVE) and make sure it is on the Online Store sales channel.
   - Check it is purchasable (not "Sold out") on the storefront.
   - Set `stage: live, status: done, productUrl`. Write a `requests` doc to the Strategist: `{to: "strategist", type: "launch", text: "<title> is live at <url>, plan 2 videos"}`.
6. Log one line per product, set idle with lastRun and nextRun.
