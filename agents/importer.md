# Importer

Runs daily at 17:02 Skopje on Vasil's PC, using Claude in Chrome (his logged-in AliExpress, DSers and Shopify). Job: import approved product ideas into Shopify as drafts through DSers.

1. Set `agents/importer` to working (HQ database via ArtifactData).
2. Read open `requests` with `to: "importer", done: false` and do them first (rules below). Then read `gear` for `stage: idea, status: approved`. Take at most 2. If there are no gear ideas and no requests, set idle and stop.
3. Load the Chrome tools (one ToolSearch call) and read the chrome-browser skill first. Work in a new tab; close your tabs at the end.
   If Chrome is not reachable (or AliExpress/DSers is logged out, or the computer is off): set `agents/importer` to `error` with one plain sentence ("Chrome was not open at 17:02"), and move every approved idea to `stage: import, status: waiting, importIssue: "<same sentence>"`. That puts a card in Vasil's inbox where he chooses: he imports it himself in the evening ("I imported it", status `manual`), or lets you try again tomorrow ("Try tomorrow", which sends it back to `stage: idea, status: approved`). Then stop.
4. For each:
   - Open `supplier.url`: that is the exact listing Vasil approved. Import that one. Before importing, check the US delivery estimate on the page is still 13 business days or less. Only if it is gone, out of stock, ships slower than that, or fails the other vetting rules in CLAUDE.md, open `searchUrl`, pick the closest matching listing (same product, same look), and say so in the log and in `supplier.note`.
   - Update `supplier` in the doc (url, store, rating, orders, cost per variant, US shipping) with what you actually imported.
   - Add it to DSers (the DSers "Add to DSers" button on the AliExpress page, or DSers Find Suppliers / Import List by URL), then in the DSers Import List push it to Shopify WITHOUT publishing to the online store (it must arrive as a draft).
   - Find it in Shopify, set `shopifyId`, `adminUrl`, `stage: imported, status: approved` so the Listing Editor picks it up.
5. Never buy anything, never change DSers or Shopify settings, never accept new app permissions, never place orders. If DSers asks for anything like that, stop, set error, and explain.
6. Log one line per import, set idle with lastRun and nextRun.

## Requests of type "pdf-links" (from the Launch Manager)

Some older guides keep their PDFs only inside the Shopify Digital Downloads app, which the cloud cannot read. For each product named in the request:
- In Shopify admin (Chrome), open the product, then the Digital Downloads app page for it, and find each attached PDF.
- Read the direct link of each file (the href of its download/view link). Do not download, upload, replace or delete anything, and do not change any setting.
- Write the links into the request doc as `files: [{product, name, url}]`, set `done: true` and log one line.
- If the app shows no link you can read, write one plain sentence in the request's `note`, leave `done: false`, and carry on with the gear work.

## Weekly: tell Bing about new pages (Mondays, after the import part, Vasil 2026-10-25)
ChatGPT and Copilot take their answers from Bing, and Bing Webmaster Tools is only reachable in Vasil's Chrome, so this job lives here.
1. With the Shopify tools, list articles, products and collections created or updated in the last 8 days (onlineStoreUrl / blog article URLs on hikesupplyco.com, published only).
2. In Chrome open https://www.bing.com/webmasters/submiturl?siteUrl=https://hikesupplyco.com/ (Vasil is logged in; if not, skip this part and note it in your agent task). Click "Submit URLs", paste the URLs one per line (max 100 a day), click Submit, and check the "Success" message.
3. Open https://www.bing.com/webmasters/aiperformance?siteUrl=https://hikesupplyco.com/ , read Total Citations (last 30 days) and the cited pages, and write them into the newest `aiwatch` doc as `bing: {citations, pages: [{url, citations}], checkedAt}`. Log one line.
