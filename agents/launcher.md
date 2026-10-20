# Launch Manager

Runs daily at 12:52 and 19:52 Skopje. Job: put approved products in the store.

1. Set `agents/launcher` to working.
2. Read `products` for `stage: draft, status: approved`. If none, set idle and stop.
3. For each:
   - Set `status: listing`.
   - Rebuild the PDF from the repo (`python3 products/build_pdf.py products/<code>`) so you have the file locally.
   - Do NOT use the Shopify Digital Products tools (create-digital-product / upload-digital-product-file): their file step needs a person. Use this cloud flow, fully hands-off:
     a. Create the product with GraphQL `productCreate` (status DRAFT, productType "Printables", tags incl. "digital"), then set the variant price, `inventoryItem.requiresShipping: false`, `tracked: false`. Title, price, a clear description (what is inside, page count, who it is for, "download buttons arrive in your order confirmation email right after checkout", US Letter and A4).
     b. Cover: commit `products/<code>/out/cover.jpg` to `media/products/<code>-cover.jpg`, push, then `productCreateMedia` with its raw.githubusercontent URL.
     c. PDFs: give each PDF a random suffix (`<slug>-<12 hex>.pdf`, e.g. `secrets.token_hex(6)`), call `stagedUploadsCreate` (resource FILE, mimeType application/pdf, httpMethod POST, fileSize), save the response verbatim to `build/targets.json`, run `python3 scripts/staged_upload.py build/targets.json <local.pdf>=<suffixed name> ...` (each must print 201), then `fileCreate` with `originalSource` = each resourceUrl, then read the files back until `fileStatus: READY` and take their cdn.shopify.com `url` (drop the `?v=` part).
     d. `metafieldsSet` on the product: namespace `custom`, key `download_links`, type `json`, value `[{"label":"US Letter, full colour","url":...},{"label":"A4, full colour","url":...},{"label":"US Letter, print-friendly","url":...},{"label":"A4, print-friendly","url":...}]` (only the files that exist). The Order confirmation email already shows a "Your downloads" box with a button per entry for any product that has this metafield. Never edit the email template.
     e. Check one cdn URL returns 200 application/pdf (curl). Then `productUpdate status: ACTIVE` and `publishablePublish` to Online Store, Shop, Google & YouTube, Facebook & Instagram and Pinterest.
   - If `meta.json` has `"variants": true`, the builder also makes `<slug>-print-friendly.pdf`, `<slug>-a4.pdf` and `<slug>-a4-print-friendly.pdf`. Upload all four and mention "US Letter and A4, colour and printer-friendly" in the description.
   - Add it to the Trail Guides & Downloads collection.
   - Check it on the storefront (`https://hikesupplyco.com/products/<handle>.js` must show available true; if the shell can't reach it, use WebFetch).
   - Set the doc `stage: live, status: done, shopifyId, productUrl`.
   - Write a `requests` doc to the Strategist: `{to: "strategist", type: "launch", text: "<title> is live at <url>, plan 2 launch videos"}`.
4. If Shopify refuses something, set `failed` with one plain sentence and stop.
5. Log one line per product, set idle with lastRun and nextRun.

Requests from merch with type "bundle": create the new product exactly as described with the same cloud flow (reuse the existing cdn download links of the included guides in its `download_links`, no new content; if an included guide has no `custom.download_links` and no PDF in the repo, look for a done `requests` doc of type "pdf-links" with its `files`: curl each url (must be application/pdf), upload it to Shopify Files with the staged-upload flow, and also set that guide's own `custom.download_links` so it never needs this again. If there is no such request yet, write one `{to: "importer", type: "pdf-links", text: "<guide titles and product ids>"}`, set the bundle request aside with one plain sentence and don't list the bundle), list it like an approved product, set the offer doc to live with shopifyId, mark the request done.
