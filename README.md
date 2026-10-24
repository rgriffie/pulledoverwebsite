# Chakra.io website

This is the Roz-owned repository for the Chakra Intelligent Systems website. The complete static website was migrated and SHA-verified on October 24, 2026.

## Website pages

- `index.html` — main Chakra.io homepage
- `rosa/index.html` — ROSA® presentation
- `hci/index.html` — HCI presentation
- `use-cases/index.html` — animated interactive use-case gallery
- `privacy/index.html` — privacy statement
- `assets/` — local stylesheets, scripts, logos, imagery and other media

## Publishing checklist

1. Enable GitHub Pages for this repository: `main` branch, `/(root)` directory. A repository on GitHub Free must be public to use GitHub Pages; a paid plan can allow private repository source.
2. Verify the default Pages URL and the four main page routes before switching the production domain.
3. When the site is ready, configure `aichakra.io` in repository Settings → Pages, following GitHub's domain verification directions.
4. At GoDaddy, retain the GitHub Pages apex A records and set the `www` CNAME to `rgriffie.github.io`. Preserve all email-related records.
5. Enable HTTPS and verify both apex and `www` before retiring the old publishing source.

The new repository does not depend on the old source repository. Do not delete the existing live website until the new Pages deployment and custom domain are confirmed functional.
