#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Downloads the original Four Rings Performance photos into assets/images/.

Why this script exists instead of the images already being in the zip:
this file was built in a sandboxed environment whose network access is
restricted to a small allowlist of package-registry domains, and
fourringsperformance.com is not on it. The HTML already points at
assets/images/<filename> everywhere, so run this once on a machine
with normal internet access and every page will pick the photos up
immediately -- no HTML changes needed.

Usage:
    python3 fetch_images.py

If you're on macOS with the python.org installer and see
CERTIFICATE_VERIFY_FAILED, that's a known macOS quirk (Python doesn't
use the system's root certificates by default) -- this script works
around it automatically using the `certifi` package. If `certifi`
isn't installed, it tries to install it for you; if that fails too,
the two permanent fixes are:
    1. Run "Install Certificates.command" in your /Applications/Python 3.x/ folder, OR
    2. pip3 install certifi
As a last resort, pass --insecure to skip certificate verification
for this one-off download of public marketing images.
"""
import os
import ssl
import subprocess
import sys
import urllib.request

BASE = "https://www.fourringsperformance.com/wp-content/uploads/"
OUT_DIR = os.path.dirname(os.path.abspath(__file__))

FILES = [
    "115825208_s-1-300x200.jpg",
    "64860809_s.jpg",
    "90559065_s-1-300x200.jpg",
    "IMG_5248.jpg",
    "agoura-hills-four-wheel-alignment-mechanic.jpeg",
    "audi-brake-job.jpg",
    "audi-r8-engine.jpg",
    "audi-transmission-repair-agoura-hills.jpg",
    "car-air-conditioning-760.jpg",
    "car-key-programming.png",
    "electronic-diagnosis-760.jpg",
    "four-rings-performance-audi-maintenance.jpg",
    "mini-cooper-radiator-repairs.jpg",
    "suspension-issues.jpg",
    "timing-belt-repairs.jpg",
    "volkswagen-beetle-cabriolet-600_fx.jpg",
    "frp-auto-logos.gif",
]

def build_ssl_context(insecure):
    if insecure:
        print("WARNING: certificate verification disabled (--insecure). "
              "Fine for these public marketing photos, not a general habit.\n")
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx

    try:
        import certifi
        return ssl.create_default_context(cafile=certifi.where())
    except ImportError:
        pass

    print("No valid certificate bundle found -- attempting 'pip install certifi'...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "--quiet", "certifi"])
        import certifi
        print("certifi installed. Continuing.\n")
        return ssl.create_default_context(cafile=certifi.where())
    except Exception as e:
        print(f"Could not auto-install certifi ({e}).")
        print("Fix options:")
        print("  1. On macOS with python.org's installer, run:")
        print('     "/Applications/Python 3.x/Install Certificates.command"')
        print("  2. Or just run:  pip3 install certifi")
        print("  3. Or re-run this script with --insecure as a one-off workaround:")
        print("     python3 fetch_images.py --insecure")
        sys.exit(1)

def main():
    insecure = "--insecure" in sys.argv
    ctx = build_ssl_context(insecure)

    os.makedirs(OUT_DIR, exist_ok=True)
    ok, failed = 0, []
    for name in FILES:
        dest = os.path.join(OUT_DIR, name)
        if os.path.exists(dest):
            print(f"skip  (already have) {name}")
            ok += 1
            continue
        url = BASE + name
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15, context=ctx) as resp, open(dest, "wb") as f:
                f.write(resp.read())
            print(f"saved {name}")
            ok += 1
        except Exception as e:
            print(f"FAILED {name}: {e}")
            failed.append(name)

    print(f"\n{ok}/{len(FILES)} images saved to {OUT_DIR}")
    if failed:
        print("Could not fetch (download manually and place in assets/images/):")
        for f in failed:
            print(" -", f, "->", BASE + f)

if __name__ == "__main__":
    main()
