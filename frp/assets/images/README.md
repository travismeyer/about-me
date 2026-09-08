# assets/images

Every page already points at files in this folder (e.g. `assets/images/audi-brake-job.jpg`,
or `../assets/images/audi-brake-job.jpg` from a page under `services/`).

The actual photos aren't bundled in this zip: this site was built in a sandboxed
environment that can't reach fourringsperformance.com to download them.

To fill this folder with the real photos, run once from a machine with normal
internet access:

    python3 fetch_images.py

That pulls all 16 images (plus the rings logo GIF) straight from the live
Four Rings Performance site into this folder, using the exact filenames the
HTML already expects. No HTML edits needed -- refresh the page afterward and
every photo appears.

If a particular file fails to download (e.g. the source site reorganizes its
media library), the script prints the direct URL so you can save it manually
under the same filename.
