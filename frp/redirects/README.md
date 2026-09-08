# redirects/

Two versions of the same 301 redirect map (old fourringsperformance.com
WordPress URLs -> new page paths), for whichever host this ends up on:

- `htaccess-redirects.txt` -- Apache / most shared/cPanel hosting.
  Paste the contents into `.htaccess` at the site root, above any
  existing WordPress rewrite block.

- `_redirects` -- Netlify or Cloudflare Pages. Drop this file
  (already correctly named) into the site's root alongside
  `index.html`.

If deploying somewhere else (Vercel, Nginx, etc.), the same old-URL
-> new-URL pairs apply; just translate them into that platform's
redirect config format.

## Why this matters

Search engines have already crawled and ranked the pages at the old
URLs (e.g. `/brake-repair-agoura-hills/`). Swapping in this new site's
URL structure without 301 redirects from every old URL breaks every
inbound link and search listing pointing at the old ones -- the new
pages effectively start from zero instead of inheriting that history.
A 301 tells search engines (and browsers) "this content permanently
moved here," which carries the old page's ranking signal forward to
the new URL.

## After the redirects are live

1. In Google Search Console (and Bing Webmaster Tools), submit
   `https://www.fourringsperformance.com/sitemap.xml` so both engines
   discover the new URLs quickly.
2. Use the "URL Inspection" / "Request Indexing" tools on the
   homepage and a couple of key service pages to speed up re-crawl.
3. Spot-check a handful of the old URLs in a browser once live to
   confirm each one actually lands on its new page (301, not 404).
