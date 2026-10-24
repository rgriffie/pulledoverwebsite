# aichakra.io-v2

Chakra.io, rebuilt as one continuous scroll. Static site, no build step. Live at https://aichakra.io (GitHub Pages, custom domain via `CNAME`).

## The journey

Hero (WebGL sky, vapour text) → The Company → The Ecosystem (orbit) → The Information Gap → The House → Technologies (ROSA, HCI) → Institutional Support → The Question → Let's Connect → footer.

After the hero the sky gives way to a solid Astorian Midnight (`#0b193a`) background with very slow drifting light. Sections dissolve into one another as you scroll, and a glowing thread on the left edge tracks progress and can be dragged to scrub the page.

## Files

- `index.html`: the whole page. Each journey section carries `data-chapter`.
- `assets/site.css`: all styles. Key blocks: `.void` (midnight background and drift), `.void-glow` (per-chapter light), `.gap-beats` (Information Gap), `.company-panels`, `.connect`, `.thread`.
- `assets/app.js`: section arrivals, the orbiting ecosystem, the Information Gap flow (`beatList`), the per-chapter light and section fades (`LIGHT` table, `journey()`), and the draggable thread.
- `assets/space.js`: the WebGL hero sky (three.js) and the `.void` fade-in. The Earth layer still exists in code but is covered by the void.
- `assets/vapour.js`: the hero statement's vapour effect.
- `assets/supporters/`: supporter logos. `assets/earth/`: the NASA Earth photo.
- `CNAME`: the custom domain. GitHub rewrites it when the domain is changed in Pages settings.
- `handoff.md`: full project history, decisions, rejected experiments, copy awaiting approval, and the design audit. Read this before changing the design.

## Run locally

```
python3 -m http.server 8123
```

then open http://localhost:8123.

## Deploy and domain

- GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root, custom domain `aichakra.io`, Enforce HTTPS on. Every push to `main` goes live.
- DNS (GoDaddy, aichakra.io): four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `www` is a CNAME to `aichakra.io`. Email records (Microsoft 365: `autodiscover`, `msoid`, `lyncdiscover`, `sip`, `email`, MX, TXT) must stay untouched.
- If the certificate ever fails to issue, remove and re-add the custom domain in Pages settings (this deletes and re-creates `CNAME`; pull before pushing).

## Still open

- Real LinkedIn, Bluesky, and YouTube URLs (footer icons currently link to the platforms' homepages).
- Confirm `hello@chakra.io` for the Let's Connect button.
- Roz's approval of the draft copy ("What we do", the HCI description).
- Real-phone check of the mobile layouts.
- Optional "flat pass" to remove glows and gradients (see `handoff.md`).

## Credits

Earth imagery (public domain): NASA astronaut photograph ISS030-E-10008 (Iberian Peninsula at night, Dec 2011, images.nasa.gov), processed into `assets/earth/horizon.webp`.
