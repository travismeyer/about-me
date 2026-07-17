# Travis Meyer — About Me Site

Static replacement for the Carrd page, built for GitHub Pages. No build step, no dependencies.

## Folder structure

```
travis-meyer-site/
├── index.html
└── assets/
    ├── styles.css
    ├── script.js
    └── travis-meyer.jpg
```

- `index.html` — page content and structure
- `assets/styles.css` — design system (colors, type, layout, responsive rules)
- `assets/script.js` — animated network-node background (canvas)
- `assets/travis-meyer.jpg` — your profile photo

## Deploy to GitHub Pages

1. Create a new repository on GitHub (public), e.g. `travis-meyer-site`.
2. Upload `index.html` and the `assets/` folder to the repository root, keeping the structure above intact — either drag-and-drop through the GitHub web UI, or:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a live URL within a minute or two, typically `https://<your-username>.github.io/<repo-name>/`.
6. Optional — custom domain: add a `CNAME` file at the repo root containing just your domain (e.g. `travismeyer.com`), and point a DNS `CNAME` record at `<your-username>.github.io`. GitHub Pages picks it up automatically once DNS propagates.

## Notes on image sourcing

- Your profile photo is at `assets/travis-meyer.jpg`, resized and compressed (400×400, ~30KB) from the original upload — plenty sharp at the 176px display size, without the multi-hundred-KB weight of the full-resolution original.
- The 7 certification/partner logos are hotlinked directly from your existing `travismeyer.carrd.co` assets, so nothing broke on launch and there was nothing to guess at for color/transparency. This works fine long-term as long as that Carrd page stays live. If you'd rather fully self-host and cut the Carrd dependency, download these into `assets/certs/` and swap the `<img src>` paths in `index.html`:
  - 1Password: `https://travismeyer.carrd.co/assets/images/gallery01/ae864d11.png`
  - Allworx: `https://travismeyer.carrd.co/assets/images/gallery01/db7ff31a.jpg`
  - Axcient: `https://travismeyer.carrd.co/assets/images/gallery01/0d3748c1.png`
  - Barracuda: `https://travismeyer.carrd.co/assets/images/gallery01/ba80726e.png`
  - DNSFilter: `https://travismeyer.carrd.co/assets/images/gallery01/e8adcdd9.png`
  - AuthPoint: `https://travismeyer.carrd.co/assets/images/gallery01/52f4768a.png`
  - Firebox: `https://travismeyer.carrd.co/assets/images/gallery01/f7b7f116.png`
  - Endpoint Security (unbranded/no link on original site): `https://travismeyer.carrd.co/assets/images/gallery01/4f982a83.png`

## Instagram

No Instagram link was present anywhere on the live `travismeyer.carrd.co` page (only Phone, Email, Text, Teams, Telegram, LinkedIn). Rather than guess a handle, it's left out. Send the correct URL and it's a one-line add to the contact grid in `index.html`.

## Editing content later

- Contact links live in the `.contact-grid` block in `index.html`.
- Certification tiles live in the `.certs-grid` block.
- Colors and fonts are all CSS custom properties at the top of `assets/styles.css` (`:root`) — change once, applies everywhere.
