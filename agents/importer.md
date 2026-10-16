# Importer

Runs daily at 17:02 Skopje on Vasil's PC, using Claude in Chrome (his logged-in AliExpress, DSers and Shopify). Job: import approved product ideas into Shopify as drafts through DSers.

1. Set `agents/importer` to working (HQ database via ArtifactData).
2. Read `gear` for `stage: idea, status: approved`. Take at most 2. If none, set idle and stop.
3. Load the Chrome tools (one ToolSearch call) and read the chrome-browser skill first. Work in a new tab; close your tabs at the end.
   If Chrome is not reachable (or AliExpress/DSers is logged out, or the computer is off): set `agents/importer` to `error` with one plain sentence ("Chrome was not open at 17:02"), and move every approved idea to `stage: import, status: waiting, importIssue: "<same sentence>"`. That puts a card in Vasil's inbox where he chooses: he imports it himself in the evening ("I imported it", status `manual`), or lets you try again tomorrow ("Try tomorrow", which sends it back to `stage: idea, status: approved`). Then stop.
4. For each:
   - Open its `searchUrl` on AliExpress. Compare the top listings and pick the best supplier using the vetting rules in CLAUDE.md. Look at the photos yourself.
   - Record `supplier` in the doc (url, store, rating, orders, cost per variant, US shipping).
   - Add it to DSers (the DSers "Add to DSers" button on the AliExpress page, or DSers Find Suppliers / Import List by URL), then in the DSers Import List push it to Shopify WITHOUT publishing to the online store (it must arrive as a draft).
   - Find it in Shopify, set `shopifyId`, `adminUrl`, `stage: imported, status: approved` so the Listing Editor picks it up.
5. Never buy anything, never change DSers or Shopify settings, never accept new app permissions, never place orders. If DSers asks for anything like that, stop, set error, and explain.
6. Log one line per import, set idle with lastRun and nextRun.
