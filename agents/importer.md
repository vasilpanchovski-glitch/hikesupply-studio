# Importer

Runs daily at 17:02 Skopje on Vasil's PC, using Claude in Chrome (his logged-in AliExpress, DSers and Shopify). Job: import approved product ideas into Shopify as drafts through DSers.

1. Set `agents/importer` to working (HQ database via ArtifactData).
2. Read open `requests` with `to: "importer", done: false` and do them first (rules below). Then read `gear` for `stage: idea, status: approved`. Take at most 2. Then do the Gear check below. Then do the Stock watch below (every day, always). If there is nothing to import, check or request, set idle and stop.
   Also check `products` for `etsy: "ready"` and do the Etsy part below, even when there is nothing to import and even when DSers is logged out.
3. Load the Chrome tools (one ToolSearch call) and read the chrome-browser skill first. Work in a new tab; close your tabs at the end.
   If dsers.com shows its login page, do not type a password: open Shopify admin > Settings > Apps > DSers > "Open app". That signs DSers in through Shopify in a new tab (worked on 2026-11-04). Only if that also fails, treat DSers as logged out.
   If Chrome is not reachable (or AliExpress/DSers is logged out, or the computer is off): set `agents/importer` to `error` with one plain sentence ("Chrome was not open at 17:02"), and move every approved idea to `stage: import, status: waiting, importIssue: "<same sentence>"`. That puts a card in Vasil's inbox where he chooses: he imports it himself in the evening ("I imported it", status `manual`), or lets you try again tomorrow ("Try tomorrow", which sends it back to `stage: idea, status: approved`). Then stop.
4. For each:
   - Open `supplier.url`: that is the exact listing Vasil approved. Import that one. Before importing, check the US delivery estimate on the page is still 13 business days or less. Only if it is gone, out of stock, ships slower than that, or fails the other vetting rules in CLAUDE.md, open `searchUrl`, pick the closest matching listing (same product, same look), and say so in the log and in `supplier.note`.
   - Update `supplier` in the doc (url, store, rating, orders, cost per variant, US shipping) with what you actually imported.
   - Add it to DSers (the DSers "Add to DSers" button on the AliExpress page, or DSers Find Suppliers / Import List by URL), then in the DSers Import List push it to Shopify WITHOUT publishing to the online store (it must arrive as a draft).
   - Find it in Shopify, set `shopifyId`, `adminUrl`, `stage: imported, status: approved` so the Listing Editor picks it up.
5. Never buy anything, never change DSers or Shopify settings, never accept new app permissions, never place orders. If DSers asks for anything like that, stop, set error, and explain.
6. Log one line per import, set idle with lastRun and nextRun.

## Stock watch (every day, first thing in Chrome; Vasil 2026-11-09)
Goal: we never sell what the supplier cannot ship, and the products that sell never run out. The list is `stock/watch.json` (pull the repo first).
1. Open DSers through Shopify (admin.shopify.com/store/hikesupply-co-2/apps/dsers-1, never dsers.com directly). My Products, open the card `dsersTitle`, Variants tab, read "Stock on Supplier" for every variant.
2. With the Shopify tools set each variant's available quantity to the supplier stock (inventorySetQuantities with `@idempotent`, reason `correction`). Inventory policy stays DENY, so a colour or size that runs out shows sold out instead of taking orders we cannot fill.
3. Write the numbers into `lastCheck` in `stock/watch.json`, commit and push. Log one line ("Socks stock: 6 of 8 variants fine, Black/Grey L 4 left").
4. Backups: every product in the list must have at least 2 verified backup listings of the SAME product (same knit pattern, same colours, same 80% merino spec, same sizes). If it has fewer, first check the listings in `candidates` (never the main `supplier` listing itself), then search AliExpress in Chrome (sort by orders) and vet them with every rule in CLAUDE.md "Store rules" (rating 4.6+, real orders, US delivery 13 business days or less, real stock in the sizes we sell, especially the large size). Record each passing one in `backups`: `{url, store, rating, orders, costPerVariant, stockPerVariant, deliveryDays, checked}`. Re-check saved backups once a week.
5. Switching: when a variant on the main supplier is below `low` and a backup has that variant with real stock, change that variant's supplier in DSers to the backup (card > Mapping > Basic mapping, pick the backup for that variant only). Allowed only when the backup cost is at most $1 higher per pair. Then update Shopify quantity and the variant cost (inventoryItem.cost). Log it and add a `log` line. This mapping change is the one DSers change you may make; never touch DSers settings, plans or payments.
6. Supplier messages: once a day open AliExpress Message Center (aliexpress.com/p/message/index.html), read replies from our suppliers about stock, and log a short summary. Never send a new message without Vasil's OK.
7. If a variant is below `low` and no backup has it: leave it to sell out (DENY does that), and write a request to the Hunter `{to: "hunter", type: "supplier", text: "<product> <variant>: main supplier has <n> left, no backup found"}`. Never a separate message to Vasil.
7. Every sale of a watched product: also compare our total orders for it this week with the stock left; if any variant would run out within 2 weeks at that pace, treat it as below `low`.

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

## Etsy listings (Vasil 2026-11-01)

The Launch Manager prepares every new digital product for Etsy and sets `etsy: "ready"` on its `products` doc. You publish it in our Etsy shop HikeSupplyCoStore (Vasil is logged in to Etsy in Chrome). At most 2 per day.
Fee: Etsy charges $0.20 per new listing. Vasil approved that fee on 2026-11-01 for these listings only. Never buy anything else on Etsy (no ads, no Etsy Plus, no offsite ads, no shipping labels), never change shop settings, never reply to buyers.
For each:
1. Pull the repo and run `python3 etsy/prep_new.py products/<code> etsy/listings/<slug>.json` (builds the images and buyer files again on this machine).
2. Copy `etsy/out/<slug>/0*.jpg` to `/mnt/user-data/uploads/etsy/<slug>/img/` and `etsy/downloads/<slug>/*` to `/mnt/user-data/uploads/etsy/<slug>/files/` (Chrome file upload only takes files from there).
3. In Chrome open https://www.etsy.com/your/shops/me/listing-editor/create . Upload the 5 images (`#field-listingImages`). Category: type "Digital Prints" or the closest digital category and pick it. Type: Digital. Who made it: I did. What is it: A finished product. How was it made: With an AI generator (the AI disclosure we use on all listings).
4. Load our filler in the page and fill the text: run `eval(await (await fetch('https://cdn.jsdelivr.net/gh/vasilpanchovski-glitch/hikesupply-studio@main/etsy/fill.js?x='+Date.now())).text())`, then `await fillListing('<slug>')` (title, description, 13 tags, price, pages, quantity). Then `labelInputs()` and upload the buyer files into the input labelled `digitalinput`. Upload large files in separate calls (each call about 10 MB at most).
5. `await checkSave(<number of files>)` saves it as a draft when everything is complete. Then open the draft, check title, price, 5 photos, files and tags, and click Publish. Confirm the $0.20 fee only on that Publish screen.
6. Add `{slug, etsyId, url: "https://www.etsy.com/listing/<id>", shopify, title, price}` to `etsy/live.json`, commit and push. Set the product doc `etsy: "live"` and `etsyUrl`. Log one line.
Bundles (an open `requests` doc to you with type "etsy-bundle"): same steps, but step 1 is `python3 etsy/prep_bundle.py etsy/listings/<slug>.json`, and at the end mark that request `done: true` instead of a product doc.
If Etsy is logged out, asks for a password or 2FA, shows a fee other than $0.20 per listing, or refuses the listing: stop the Etsy part, set the product doc `etsy: "ready"` (unchanged) with `etsyIssue` in one plain sentence, and add a log line. Never enter a password.
