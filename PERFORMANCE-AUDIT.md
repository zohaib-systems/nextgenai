# Performance, SEO, and accessibility audit

Date: 2026-09-05. Next.js 16.2.12 App Router, React 19.2.4, Tailwind 4, Supabase public reads and server-side publishing. No repository AGENTS.md was found outside dependencies.

## Implemented

- Centralized production origin; corrected detail and library canonicals instead of inheriting the homepage canonical. Added library metadata and noindex directives for filtered results and publishing. Robots and sitemap now use the same origin. Removed publishing from the sitemap and removed fabricated last-modified timestamps.
- Replaced the missing social preview asset with a generated 1200 × 630 PNG route. Existing prompt titles, descriptions, and images remain the basis of detail metadata. No unsupported review/rating or business schema was added.
- Removed hero hydration with a native GET search form. Detail content now renders on the server with small copy/share client components. Library query changes use the History API, avoiding a server navigation on every keystroke and keeping URL state synchronized.
- Kept existing self-hosted Inter, inline CSS, responsive card images, and the modern-browser polyfill override. Added a production regression check for font requests, stylesheet links, native search, and legacy polyfills. The internal Next.js module alias must be rechecked on framework upgrades; URL.canParse compatibility remains covered.
- Added responsive sizing and preload for the detail hero image. Homepage audit identified text as LCP, so homepage card images remain lazy-loaded.
- Deduplicated detail data reads between metadata and rendering with React cache. Public homepage and sitemap regenerate every five minutes, with path invalidation after publishing. Library/detail responses remain dynamic. Database failures now produce errors instead of false empty results or false missing prompts.
- Removed buttons nested in links, retained whole-card navigation, added search labels, clear-button naming and sizing, category pressed state, menu expanded state, focus outlines, a skip link, reduced-motion handling, and higher-contrast secondary card text. Fixed library sticky-header overlap and small-screen input shrinking.
- Added usable error and not-found pages. Publishing now handles network failures and pending state, prevents repeated submissions, and reports invalid passcodes accessibly. Removed the client-side copy of the admin passcode; verification remains on the server.

## Validation and measured results

Production build and TypeScript passed. ESLint passed. `npm run check:production` passed.

Lighthouse 13.4.1, Chrome 152, local production server on Windows. Mobile uses Lighthouse simulated mobile defaults (4× CPU slowdown, 150 ms RTT, 1,638.4 Kbps); desktop uses the desktop preset. These are lab measurements, not field INP or production CDN measurements.

| Homepage measurement | Mobile run 1 | Mobile run 2 | Desktop |
| --- | ---: | ---: | ---: |
| Performance | 61 | 72 | 99 |
| Accessibility | 100 | 100 | 100 |
| Best practices | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 |
| FCP | 1.1 s | 0.9 s | 0.5 s |
| LCP | 3.6 s | 3.1 s | 0.7 s |
| Total Blocking Time | 2,630 ms | 1,040 ms | 80 ms |
| CLS | 0 | 0 | 0.001 |

Mobile run 2 transferred approximately 175 KB of scripts across 12 requests, one 49 KB font, and zero external stylesheets or third-party requests. Lighthouse still flags approximately 28 KiB of unused framework JavaScript. Essential router/runtime code was not removed to silence coverage results.

The library mobile audit scored 75 performance and 100 accessibility, best practices, and SEO, with 3.1 s LCP, 730 ms Total Blocking Time, and zero CLS. No console errors were recorded. Detail, publishing, and missing-page routes received browser/HTTP checks rather than individual Lighthouse score runs.

No reliable before/after timing comparison is available: the initial baseline failed during Chrome startup/build transition. An intermediate report with missing assets was excluded. Raw final reports are local `audit-final-*.json` files (gitignored). Variation between mobile runs is material; neither passes the LCP target.

Browser checks cover 320, 390, and 1440 pixel layouts, native search submission, local filtering without RSC requests, clear/category controls, detail canonical and copy action, publishing noindex, and missing content. No horizontal overflow, escaped search button, nested link/button controls, or uncaught exceptions were found. The 390 pixel screenshot was visually inspected.

Additional browser checks passed for the mobile menu, reduced-motion animation suppression, and a simulated publishing network failure with the submit button restored. The network-failure test intercepted fetch in the browser and wrote no data.

HTTP checks confirmed 200 responses for public routes, robots, sitemap, and the PNG social image; 404 plus noindex for invalid/missing routes; filtered library noindex; and no publishing URL in the sitemap.

## Remaining limitations and deployment checks

- Mobile LCP and main-thread blocking remain above desired levels. Further reductions require profiling hydration/runtime work under representative devices; field INP and 75th-percentile Core Web Vitals are unavailable.
- Search currently ships the catalog, including prompt text, to support immediate content filtering. A large catalog warrants server search and pagination as a separate behavior change. Supabase default row limits also need consideration at that scale.
- No analytics, chat, videos, or third-party browser scripts were found. No extra preconnects, service worker, blanket preloads, or generic SEO filler were added.
- Existing statistics such as “500+” and “10k+” were preserved, but their accuracy needs owner confirmation. They were not promoted into structured data.
- The existing server publishing endpoint still has a development passcode fallback. Set a strong server-only ADMIN_PASSCODE in deployment and rotate any value previously exposed through NEXT_PUBLIC_ADMIN_PASSCODE. Successful publishing was not tested against the live database to avoid creating content.
- Remote Unsplash image fetching timed out during some local runs. Final homepage audits had no console errors, but remote image reliability and CDN caching need verification after deployment.
- Inline CSS removes a request but increases HTML and forfeits separately cached CSS for repeat visits. Public revalidation can serve stale content during regeneration; private responses are not publicly cached.
- Deploy the changes, confirm NEXT_PUBLIC_SITE_URL is the production origin, and rerun representative route audits against the deployed host. Local results do not prove ranking improvement, field Core Web Vitals, global CDN performance, or complete accessibility compliance.

References: [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Next.js caching](https://nextjs.org/docs/app/getting-started/caching).
