# Chakra.io — migration notes

This is Roz's new website repository. The static site was copied from the working code in `rishabmohandoss/aichakra.io-v2` on October 24, 2026.

## Website structure

- `index.html`: main Chakra homepage
- `use-cases/index.html`: rotating industry use-case carousel
- `rosa/index.html`, `hci/index.html`: research/product sections
- `privacy/index.html`: privacy statement
- `assets/`: shared scripts, styling, locally stored images, supporting libraries

The source README has been preserved as `ORIGINAL-PRODUCTION-README.md`. Its old owner and deployment URLs are historical, not the new destination.

## Publishing

The old `CNAME` has deliberately **not** been copied into the new repository yet, to avoid attaching the custom domain before the new site has been tested. First enable GitHub Pages and verify all pages using the new project URL. Then configure `aichakra.io` under **this repository's Settings → Pages → Custom domain**, verify control of the domain, and enable HTTPS. An inaccessible old Pages attachment may require GitHub Support to release or reassign.

Do not replace or delete GoDaddy email MX/TXT records when working on the domain. The site images from Unsplash and typography from Google Fonts are third-party runtime resources.

## Legacy repository cleanup

This repository is the intended successor. Verify every page, asset, and the Pages deployment before removing the active website files from the old repo. Repository deletion itself requires the old owner's admin access.
