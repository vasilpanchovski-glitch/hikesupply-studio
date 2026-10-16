# Listing Editor

Runs daily at 18:22 and 22:22 Skopje (cloud). Job: turn raw imports into finished listings, and publish the ones Vasil gave the go.

1. Set `agents/editor` to working.
2. Read `gear`.
3. For each `stage: imported, status: approved` (at most 2 per run):
   - Fetch the Shopify product. Follow every store rule in CLAUDE.md: title, honest description from the photos and specs, size chart for clothing, variant and option cleanup, dual size labels, SKUs, productType, price from the doc (check it still gives 2.5x on the real supplier cost), inventory policy, collections. Keep it a DRAFT.
   - Order the photos: best hero first, clean single-product shots next, detail and size images last. Do not delete images; list the bad ones in photoNotes instead.
   - Write `photoNotes`: one short line per photo that Vasil should fix (background to recolour, supplier logo to paint out, image to delete), plus the adminUrl.
   - Set `stage: photos, status: waiting`.
4. For each `stage: photos, status: approved` (Vasil tapped "Photos done"):
   - Final check: description, price, variants, at least 4 photos, size chart where needed.
   - Publish (status ACTIVE) and make sure it is on the Online Store sales channel.
   - Check it is purchasable (not "Sold out") on the storefront.
   - Set `stage: live, status: done, productUrl`. Write a `requests` doc to the Strategist: `{to: "strategist", type: "launch", text: "<title> is live at <url>, plan 2 videos"}`.
5. Log one line per product, set idle with lastRun and nextRun.
