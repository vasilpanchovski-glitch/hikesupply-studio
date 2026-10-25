# Blog Writer

Runs daily at 09:52 Skopje (cloud).

1. Set `agents/blogwriter` to working.
2. Read `articles`.
   - For each `approved`: publish it on the Trail Journal (set it published in Shopify), set `status: published, url`. Log it.
   - For each `rejected` not yet replaced: rewrite following `note`, update the same Shopify draft, set back to `waiting`.
3. On odd days of the month (every second day), if no article is waiting: research one topic (WebSearch: questions US hikers search this season, "People also ask", Reddit), check we have not covered it, and write it following the Blog rules in CLAUDE.md. Create it in Shopify as an UNPUBLISHED article on the Trail Journal blog (Admin GraphQL articleCreate, isPublished false; use graphql_schema to confirm the fields first). Create the `articles` doc with `status: waiting`, title, keyword, metaDescription, excerpt (2-3 sentences), body, links, shopifyId.
4. Answer pages (on even days of the month when no article is waiting, and whenever a `requests` doc with type "answer" is open for you, max 3 a week). These are written so AI tools and Google can lift a clear answer and cite us. Types: "best ... for beginners", "free ... checklist / planner", "X vs Y", "how to plan ...", itineraries. Rules on top of the Blog rules:
   - Answer the exact question in the first two sentences (a TL;DR), then the details.
   - Headings are the questions people ask. Use one comparison table or checklist where it helps. End with a short FAQ (3-5 questions).
   - Honest and fair: if we compare, include free and competitor options with what each is good for, link to official sources (NPS, park pages), never say anything false or unverifiable about another brand, never invent numbers or reviews. Recommend our product only where it really fits, and say plainly what it is (a PDF guide, a $19.99 pole).
   - Specific facts beat adjectives: page counts, distances in miles and km, permit names, seasons, prices from Shopify.
   - Byline "HikeSupply Co. team" and the date; when you update an older article, change the date and say what changed.
   Same flow as step 3: unpublished Shopify draft plus an `articles` doc with `status: waiting` and `keyword` = the question. Mark the request done.
5. Log one line, set idle with lastRun and nextRun.

Featured photo (Vasil 2026-10-24: every article needs one; Google, Facebook and Pinterest use it as the preview):
- Pick one real, landscape photo from Pexels only (free commercial license): WebSearch with allowed_domains ["pexels.com"], e.g. "winter hiking snowy forest trail". Take the photo id from a result URL `pexels.com/photo/<words>-<id>/`.
- It must match the topic and season, show no logos, brands, text or close-up recognisable faces, and look like real US/Canada hiking. Not the same photo as another article.
- Set it on the Shopify article (in articleCreate, or articleUpdate) with `image: {url: "https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?auto=compress&cs=tinysrgb&w=1600", altText: one plain sentence describing the photo}`. Shopify copies it to its own CDN.
- Check the returned image url is set (not null). If the fetch fails, try a different photo. Save the Pexels page URL in the `articles` doc as `photo`.
