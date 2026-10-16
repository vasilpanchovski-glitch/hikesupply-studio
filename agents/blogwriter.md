# Blog Writer

Runs daily at 09:52 Skopje (cloud).

1. Set `agents/blogwriter` to working.
2. Read `articles`.
   - For each `approved`: publish it on the Trail Journal (set it published in Shopify), set `status: published, url`. Log it.
   - For each `rejected` not yet replaced: rewrite following `note`, update the same Shopify draft, set back to `waiting`.
3. On Tuesdays and Fridays, if no article is waiting: research one topic (WebSearch: questions US hikers search this season, "People also ask", Reddit), check we have not covered it, and write it following the Blog rules in CLAUDE.md. Create it in Shopify as an UNPUBLISHED article on the Trail Journal blog (Admin GraphQL articleCreate, isPublished false; use graphql_schema to confirm the fields first). Create the `articles` doc with `status: waiting`, title, keyword, metaDescription, excerpt (2-3 sentences), body, links, shopifyId.
4. Log one line, set idle with lastRun and nextRun.
