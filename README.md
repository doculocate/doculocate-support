# DocuLocate Support

The support/help center for the **DocuLocate application**: search documents by meaning and retrieve original source passages.

Product: https://doculocate.com  
Support repository: https://github.com/doculocate/doculocate-support

## Preview and maintain

Node.js 18 or later; no npm dependencies to install.

```sh
npm run build  # regenerate the static HTML pages
npm run check  # check page structure, local links, assets, and anchors
npm run dev    # http://localhost:3018
```

Edit guide content in `content/guides.mjs`, the shared page layout in `build.mjs`, and styles in `assets/style.css`. Then rebuild and check. Generated HTML is kept in the repository so the site can be served directly by any static host, including GitHub Pages using the main branch root. `.nojekyll` is included. No custom domain or Pages configuration is assumed or activated.

Relative asset and page links work at both a domain root and a GitHub Pages project path. Topic search filters the visible guide cards in the browser; all guides remain available without JavaScript. There are no analytics, remote fonts, cookies, or runtime dependencies.

## Guides

- Getting started
- Documents & formats
- Searching by meaning
- Optional AI reranking
- Privacy & storage
- Troubleshooting & FAQ
- API for developers
- Running locally
- Report an issue

GitHub issue forms are included for bug reports and feature requests. GitHub Issues must be enabled on the remote repository for that workflow. No email address or response-time promise is invented.

## Source of truth

Content checked against the adjacent DocuLocate app source on September 27, 2026:

- `src/parsers/registry.ts`: supported extensions.
- `src/config/app.ts`: 25 MiB upload limit, one file per request, rate limit, hosted-mode availability.
- `src/config/server.ts`: current listen address default is `0.0.0.0`; local examples explicitly set `HOST=127.0.0.1`.
- `src/documents/document-store.ts`: in-memory storage, default capacity 50, oldest-first eviction.
- `src/api/routes/ui.route.ts`: actual UI controls and result display.
- `src/api/routes/documents.route.ts` and `src/api/schemas/search.schema.ts`: API paths and request fields.
- `src/search/search-service.ts`, `embeddings.ts`, and `get-reranker.ts`: retrieval, model loading, reranking, and external-provider behavior.

Prefer code over stale app README claims. In particular, no standalone `/openapi.json` route is asserted, and creating a `.env` file is not described as sufficient to load variables automatically. `/docs` is the verified interactive API reference route.

This repository documents the app; it contains no app code, secrets, customer documents, or production configuration. Review these guides when application behavior changes.
