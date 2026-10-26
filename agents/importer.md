# Importer

Runs daily at 17:02 Skopje on Vasil's PC, using Claude in Chrome (his logged-in AliExpress, DSers and Shopify). Job: import approved product ideas into Shopify as drafts through DSers.

1. Set `agents/importer` to working (HQ database via ArtifactData).
2. Read open `requests` with `to: "importer", done: false` and do them first (rules below). Then read `gear` for `stage: idea, status: approved`. Take at most 2. Then do the Gear check below. If there is nothing to import, check or request, set idle and stop.
3. Load the Chrome tools (one ToolSearch call) and read the chrome-browser skill first. Work in a new tab; close your tabs at the end.
   If Chrome is not reachable (or AliExpress/DSers is logged out, or the computer is off): set `agents/importer` to `error` with one plain sentence ("Chrome was not open at 17:02"), and move every approved idea to `stage: import, status: waiting, importIssue: "<same sentence>"`. That puts a card in Vasil's inbox where he chooses: he imports it himself in the evening ("I imported it", status `manual`), or lets you try again tomorrow ("Try tomorrow", which sends it back to `stage: idea, status: approved`). Then stop.
4. For each:
   - Open `supplier.url`: that is the exact listing Vasil approved. Import that one. Before importing, check the US delivery estimate on the page is still 13 business days or less. Only if it is gone, out of stock, ships slower than that, or fails the other vetting rules in CLAUDE.md, open `searchUrl`, pick the closest matching listing (same product, same look), and say so in the log and in `supplier.note`.
   - Update `supplier` in the doc (url, store, rating, orders, cost per variant, US shipping) with what you actually imported.
   - Add it to DSers (the DSers "Add to DSers" button on the AliExpress page, or DSers Find Suppliers / Import List by URL), then in the DSers Import List push it to Shopify WITHOUT publishing to the online store (it must arrive as a draft).
   - Find it in Shopify, set `shopifyId`, `adminUrl`, `stage: imported, status: approved` so the Listing Editor picks it up.
5. Never buy anything, never change DSers or Shopify settings, never accept new app permissions, never place orders. If DSers asks for anything like that, stop, set error, and explain.
6. Log one line per import, set idle with lastRun and nextRun.

## Gear check (every day, before the Bing part; Vasil 2026-10-26: keep searching until proper products are found)
The cloud cannot see AliExpress, so this is where product ideas are proven. Goal: Vasil always has 3 good gear ideas waiting.
1. Read `gear` docs with `stage: check`. For each, open `supplier.url` in Chrome (AliExpress, logged in as Vasil) and check every rule in CLAUDE.md "Store rules": rating 4.6+, at least 300 orders (more is better), photos 1000 px+ that are real product shots without text, logos or collages, no logo or text printed on the product, real stock, US delivery within 13 business days (prefer Choice), variants that make sense, and cost incl. shipping at the normal price (not the new-shopper deal).
2. If the listing fails, do not give up on the product: search AliExpress in Chrome for the same product and check up to 6 other listings. If one passes, use it.
3. Margin: if a listing passes everything but the 2.5x margin, raise our price to reach 2.5x (ending in .99) when similar items sell at that price in US stores; fail it only if that price is unrealistic.
4. A passing product: update `supplier` with what you saw (url, store, rating, orders, cost per variant, delivery estimate, photos, `verified: true`), set price and margin, and move it to `stage: idea, status: waiting` so it shows in Vasil's inbox. A product with no passing listing: `status: failed` with one plain sentence in `importIssue` (what failed), so the Hunter learns from it.
5. If fewer than 3 ideas are waiting after the queue, keep going on your own: search AliExpress in Chrome for best-selling hiking and outdoor products we do not sell yet (check the catalogue with the Shopify tools first), and check them the same way, until 3 are waiting or you have spent about 40 minutes on this part. Log how many you checked and how many passed.
6. Never buy, add to cart, message sellers or change any setting.

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
