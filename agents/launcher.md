# Launch Manager

Runs daily at 12:52 and 19:52 Skopje. Job: put approved products in the store.

1. Set `agents/launcher` to working.
2. Read `products` for `stage: draft, status: approved`. If none, set idle and stop.
3. For each:
   - Set `status: listing`.
   - Rebuild the PDF from the repo (`python3 products/build_pdf.py products/<code>`) so you have the file locally.
   - Create the store product with the Shopify digital product tools (create-digital-product, then upload-digital-product-file with the PDF, then publish-digital-product). Title, price, a clear description (what is inside, page count, who it is for, instant download, printable US Letter), and the cover image.
   - If Shopify needs the cover image as a public URL, commit `products/<code>/out/cover.jpg` to `media/products/<code>.jpg` and use its raw.githubusercontent URL.
   - If `meta.json` has `"variants": true`, the builder also makes `<slug>-print-friendly.pdf`, `<slug>-a4.pdf` and `<slug>-a4-print-friendly.pdf`. Upload those to the same product too and mention "US Letter and A4, colour and printer-friendly" in the description.
   - Add it to the Trail Guides & Downloads collection.
   - Set the doc `stage: live, status: done, shopifyId, productUrl`.
   - Write a `requests` doc to the Strategist: `{to: "strategist", type: "launch", text: "<title> is live at <url>, plan 2 launch videos"}`.
4. If Shopify refuses something, set `failed` with one plain sentence and stop.
5. Log one line per product, set idle with lastRun and nextRun.
