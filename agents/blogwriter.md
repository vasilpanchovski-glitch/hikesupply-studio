# Blog Writer

Runs daily at 09:52 Skopje (cloud).

1. Set `agents/blogwriter` to working.
2. Read `articles`.
   - For each `approved`: publish it on the Trail Journal (set it published in Shopify), set `status: published, url`. Log it.
   - For each `rejected` not yet replaced: rewrite following `note`, update the same Shopify draft, set back to `waiting`.
3. On Tuesdays and Fridays, if no article is waiting: research one topic (WebSearch: questions US hikers search this season, "People also ask", Reddit), check we have not covered it, and write it following the Blog rules in CLAUDE.md. Create it in Shopify as an UNPUBLISHED article on the Trail Journal blog (Admin GraphQL articleCreate, isPublished false; use graphql_schema to confirm the fields first). Create the `articles` doc with `status: waiting`, title, keyword, metaDescription, excerpt (2-3 sentences), body, links, shopifyId.
4. Answer pages (Wednesdays, and whenever a `requests` doc with type "answer" is open for you, max 2 a week). These are written so AI tools and Google can lift a clear answer and cite us. Types: "best ... for beginners", "free ... checklist / planner", "X vs Y", "how to plan ...", itineraries. Rules on top of the Blog rules:
   - Answer the exact question in the first two sentences (a TL;DR), then the details.
   - Headings are the questions people ask. Use one comparison table or checklist where it helps. End with a short FAQ (3-5 questions).
   - Honest and fair: if we compare, include free and competitor options with what each is good for, link to official sources (NPS, park pages), never say anything false or unverifiable about another brand, never invent numbers or reviews. Recommend our product only where it really fits, and say plainly what it is (a PDF guide, a $19.99 pole).
   - Specific facts beat adjectives: page counts, distances in miles and km, permit names, seasons, prices from Shopify.
   - Byline "HikeSupply Co. team" and the date; when you update an older article, change the date and say what changed.
   Same flow as step 3: unpublished Shopify draft plus an `articles` doc with `status: waiting` and `keyword` = the question. Mark the request done.
5. Log one line, set idle with lastRun and nextRun.
