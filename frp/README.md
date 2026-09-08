# Four Rings Performance -- redesign

A from-scratch, modernized rebuild of fourringsperformance.com. Same copy,
same reviews, same phone number and hours, same logo concept -- new visual
system (graphite/near-black with a diagnostic-scan cyan accent), fully
responsive, no build step required.

## Structure

    index.html                     Homepage
    about.html                     About Brian / the shop
    automotive-services.html       Services hub (links to all 14 below)
    reviews.html                   All customer reviews
    contact.html                   Contact form + map
    privacy-policy.html
    site-map.html

    services/
      air-conditioning.html
      brakes.html
      car-key-programming.html
      component-protection.html
      diagnostics.html
      electrical.html
      engine-repair.html
      wheel-alignment.html
      oil-change.html
      radiator-belts-hoses.html
      routine-maintenance.html
      suspension.html
      timing-belt-chain.html
      transmission.html

    assets/
      css/style.css                All styling, one shared stylesheet
      js/script.js                 Nav toggle, scroll reveal, active-link highlight
      images/                      Photos (see images/README.md -- one setup step)

## Viewing it

Open `index.html` in a browser, from this folder, with the `assets/`
subfolder intact alongside it. Every internal link is a relative path, so
navigation between all 21 pages works exactly as it will once hosted.

To host it: this is plain HTML/CSS/JS with zero dependencies or build step,
so any static host works as-is -- Netlify, Cloudflare Pages, GitHub Pages,
or the client's existing hosting.

## One setup step: images

The photos are referenced locally (`assets/images/...`) but aren't bundled
in this zip -- see `assets/images/README.md` for the one-line script that
pulls them in. Until that's run, pages will show broken image icons where
photos belong; everything else (layout, copy, styling, navigation) works
immediately.
