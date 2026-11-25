# travismeyer.co

Static site. No build step, no server-side code, no dependencies to install.

## Folder layout

```
travismeyer.co/
├── index.html                  Page markup and content
├── README.md                   This file
└── assets/
    ├── css/
    │   └── style.css           All styles (layout, panels, boot sequence, responsive rules)
    ├── js/
    │   └── main.js             All behaviour (boot sequence, network core, panel frames,
    │                           portrait scan, Online/Offline status, copy buttons)
    └── img/
        ├── portrait.jpg        640x640 portrait used in the Identity panel scan
        ├── bg-plate.jpg        Background plate behind the whole interface
        ├── rack.webp           Holographic server-rack centrepiece (transparent)
        ├── ring.webp           Instrument ring used around the centrepiece and big numbers (transparent)
        ├── og-image.jpg        1200x630 link-preview image (LinkedIn, Teams, iMessage, etc.)
        └── favicon.svg         Browser tab icon
```

## Deploy

Upload everything in this folder, keeping the structure, to the web root so `index.html` is at `https://travismeyer.co/index.html`.

- **GitHub Pages:** commit the folder contents to the repo root (or `/docs`) of the branch Pages serves.
- **Nginx / Apache on a VPS:** copy the contents to the site root (for example `/var/www/travismeyer.co/`). No rewrite rules are needed.
- **Any static host:** upload as-is.

## External resources

- Google Fonts (Oxanium, Saira), loaded from `fonts.googleapis.com` / `fonts.gstatic.com`. If you use a Content-Security-Policy header, allow those two hosts for `style-src` and `font-src`.

Nothing else is loaded from outside the site.

## Things to edit later

- **Contact details and links:** `COMMS` array near the top of `assets/js/main.js`.
- **Certifications and partner credentials:** `CREDS` array in `assets/js/main.js`.
- **Online/Offline hours:** the `avail()` function in `assets/js/main.js` (currently Mon–Fri, 8am–5pm America/Los_Angeles).
- **Name, title, mission and about text:** `index.html`.
- **Portrait:** replace `assets/img/portrait.jpg`. The scan points in `main.js` (`LMP`) are mapped to the current portrait, so a new photo needs new points.

## Accessibility and performance notes

- Visitors with "reduce motion" turned on skip the boot sequence and see static visuals.
- Animations pause when scrolled off screen, and the network uses fewer points on phones.
