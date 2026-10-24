# Chakra.io Project Handoff

This file consolidates Rosalind “Roz” Griffie’s website and product-world instructions, plus the project owner’s implementation preferences, so another agent can continue without reopening the original email PDFs.

## Repository and current state

- Repository: `rishabmohandoss/Chakra.io`
- Production branch: `main`
- Hosting: GitHub Pages at `https://rishabmohandoss.github.io/Chakra.io/`
- Site type: static HTML, CSS, and JavaScript; no build step.
- Latest code commit when this handoff was last updated: `cb5972d` (Vanta HALO hero). Before that: `7757c85` (new logo/favicon and magenta rule). Earlier: `f624b9d` (homepage readability and navigation fixes).
- GitHub Pages publishes the project from `main`; pushes there update the public site.
- Keep the `/Chakra.io/` path prefix in asset and internal links. The site is a GitHub Pages project site.

## Brand and company direction from Roz

### Brand line

- **After AI™ / Enabling the Intelligence Continuum**
- **One company. One digital ecosystem. Multiple product worlds within.**

### Company, mission, philosophy, and vision

- **Who we are:** “We develop solutions and technologies designed to ensure intelligent systems operate with integrity wherever and whenever those systems shape people, workforces, organizations, or the communities in which they live.”
- **Mission:** “To ensure intelligent systems operate with integrity whenever and wherever intelligent systems influence people, organizations, workforces, and communities.”
- **Philosophy:** “We believe reliable information must be a foundational property of intelligent systems wherever and whenever system-generated information informs or influences people, organizations, workforces, and communities.”
- **Vision:** “We envision a world where intelligent systems enrich human lived experience—not diminish it.”
- Supporting signature: **Intelligent Systems Operating with Integrity, Trust and Accountability**.
- A later update asked to remove the standalone “Our Vision” section because its language had been incorporated elsewhere. Preserve that instruction; do not restore the standalone section without new direction.

## Site architecture and build sequence

Roz described the corporate website as the “house” and product experiences as distinct worlds within one organized ecosystem.

1. **Phase 1 — Build the house:** finish the Chakra.io corporate website as a complete site that can stand on its own, while establishing stable routes and architecture for future product worlds.
2. **Phase 2 — Build the ROSA world:** ROSA® should become a distinct, immersive environment and should not ultimately feel like a standard corporate page.
3. **Phase 3 — Make the ROSA MVP the destination:** the MVP is ultimately the main attraction inside ROSA; it should be an experience, not a small demo buried in the corporate site.

Planned route architecture:

- `/` — Chakra corporate site (the house)
- `/rosa/` — ROSA® world
- `/rosa/systems-information-readiness/` — Systems Information Readiness™ experience
- `/rosa/runtime/` — Runtime Information Transformation™ experience
- `/rosa/mvp/` — ROSA® MVP destination
- `/hci/` — HCI product world

The routes should remain stable as their experiences develop. ROSA and HCI may have their own visual identities, interaction, and technology; HCI does not need to look like ROSA. Roz cited an immersive custom web application, potentially using WebGL, Three.js, or an equivalent, as a future direction. **Do not build the full immersive ROSA product or functional MVP as part of the corporate-site phase.**

Roz noted that Jordyn Washington is the company tech lead, has already been experimenting with a clickable MVP buildout, and that future ROSA implementation should align with her work. Roz’s email described the MVP as a later phase after the website, with a target of roughly 7–8 weeks; that schedule/payment discussion is planning context, not authorization to start the MVP.

## ROSA consumer-facing story from Roz

Roz supplied this sequence for the ROSA website introduction:

1. ROSA means **Runtime Operations & Systems Analytics**.
2. ROSA detects information arriving from an LLM.
3. The information is attempting to enter a business environment.
4. ROSA intercepts information candidates before they enter the business environment and before they can shape or influence business actions or decisions.
5. ROSA isolates the information candidate, classifies it, assigns identifiers, secures custody, and prepares it for Runtime transformation.
6. ROSA transports source information into Runtime, where it becomes decision-ready information.
7. The information candidate completes intake and custody.
8. ROSA transports the custodied, conditioned candidate to the Runtime Transformation MVP to undergo Systems Information Readiness.
9. The consumer-facing ROSA journey ends at the **ROSA Runtime Systems Information Readiness MVP**.

Roz said to stop at the consumer-facing upfront ROSA website journey for now. The functional MVP build belongs to the next phase.

## Visual and interaction direction from Roz

- Slow the orbital movement down significantly. It should feel like **slow celestial drift, not rotation or spinning**.
- Keep movement subtle, continuous, graceful, and mysterious: the ecosystem should feel alive, but the motion should be noticed gradually rather than immediately.
- Keep the ecosystem motion atmospheric and centered on the Chakra core.
- Maintain distinct product worlds and permanent places for ROSA and HCI in the architecture, even while their full experiences are in development.
- Later website feedback says some letter spacing is too tight: increase horizontal spacing so characters can breathe and align sizing and spacing consistently throughout the site.
- Keep the lime-green emphasis style. Make the three emphasized headline phrases use the same font treatment and alignment.
- The site should work on phones as well as desktop; preserve readable, non-distorted responsive layouts.

### Ecosystem orbit and hierarchy — original company website feedback

- The old chakra/mandala flower placeholder has been removed (see "Logo, favicon, and magenta rule" below). The hero core now shows the new information-field mark. If Roz supplies an official logo, replace `assets/logo-mark.svg` and `assets/favicon.svg`.
- The orbital diagram should contain six connected celestial elements: **ROSA**, **Human-Computer Interaction (HCI)**, **Decisioning Intelligence**, **Systems Information Readiness™**, **Runtime Information Transformation™**, and **Information Candidate™**.
- Give ROSA, HCI, and Decisioning Intelligence greater prominence as major products/technologies/dimensions. The three foundational elements (Systems Information Readiness, Runtime Information Transformation, and Information Candidate) can be smaller or visually differentiated.
- Add the subtitle **Human-Computer Interaction** to the HCI orbit node. All six bodies belong to one connected universe.

### Hero and ecosystem copy — Website Refinement Requests #3 and #4

- The hero title instruction was to change **“Intelligence”** to **“Information”**, change **“in motion”** to **“Becomes”**, and remove **“in”**. The resulting title is **“Information Becomes”**; retain that wording.
- Use this hero supporting copy from Roz:

  > Chakra.io is built on a very simple belief: intelligent systems should operate with integrity—wherever, whenever, and however systems impact people, workforces, organizations, and the communities they serve.

- In the ecosystem section, use the headline **“One Intra-Connected Ecosystem. Distinct Product worlds.”** and the CTA **“ENTER THE CHAKRA ECOSYSTEM”** (replacing “Meet The Ecosystem”).
- Roz supplied this ecosystem paragraph:

  > Chakra is built on a simple belief: intelligent systems should operate with integrity—wherever, whenever, and however systems impact people, workforces, organizations, and the communities they serve. Across our intra-connected ecosystem, Chakra.io’s products and technologies each have a distinct purpose—while contributing to a shared vision of intelligent systems that enrich the human lived experience.

- Roz allowed editorial discretion if that paragraph makes the section too dense: split it into two sections with another headline, or omit its second sentence.

## Copy and layout change requests from Roz

### Contact section — Website Refinement Request #5

- Remove **“Chakra is building a connected ecosystem for ideas that deserve their own world.”** Roz said to save this phrase for later use.
- Replace the contact subtext with:

  > You’ve entered the Chakra Ecosystem. Now tell us what brought you here.
  >
  > Whether you’re exploring our technologies, building intelligent systems, solving a problem, or imagining what comes next—we’d love to begin the conversation.

- Change the CTA from **“Start A Conversation”** to **“Let’s Connect”**.

### Day 3 Chakra.io Website Updates PDF

- The technology table/list should have four rows total.
- Remove the **Systems Information Readiness** row from that table/list.
- Row 1: **Information Intelligence** — **Before Information Becomes**.
- Row 4: **Decisioning Intelligence** — **The Next Intelligence Domain**.
- Change **“Chapter”** to **“Dimension”** in the referenced headline.
- Replace the marked paragraph with:

  > Advancing a connected product ethosphere in which intelligent technologies inform, influence, and shape people, workplaces, organizations, and communities—so that integrity is built into intelligent systems before human, social, or environmental impacts occur.

- Improve tight font spacing and align font sizing/spacing throughout.
- The referenced three headline treatments should match; keep the lime-green style.
- Remove the marked standalone vision section (“Our Vision”); Roz said the language had been incorporated elsewhere.
- Add a footer row containing **Privacy Statement**, **Copyright Chakra Intelligent Systems, Inc. 2026**, **LinkedIn**, **Blue Sky/Bluesky**, and **YouTube**.
- Include this information-reliability question in the site:

  > Your organization is allowing generated information to flow through intelligent and automated systems to inform consequential actions and decisions. How do you know that information is actually fit to rely upon?

- Two product areas should remain closed and must not open when clicked. In the reference, these are the ROSA and HCI product cards. Keep product entry points non-actionable until Roz says to open them.

### Website Refinement Request #6 — Supported By section

- Add a minimal **SUPPORTED BY** section near the bottom, just above Let’s Connect or the footer.
- It should present institutional supporters with generous whitespace, even alignment and sizing, muted or monochrome treatment where possible, and no heavy borders or extra copy. Keep Chakra’s visual aesthetic.
- The five institutions named by Roz are:
  1. NJEDA
  2. Princeton University Office of Innovation
  3. Rutgers MBS
  4. NJIT
  5. NSF I-Corps
- Roz said she would obtain approval and formal logos from all five before release. The current implementation uses text wordmarks as placeholders. Replace them with supplied, approved logo assets when received; do not invent or download substitute logos.

### Website Refinement Request #6 — Navigation and Information Gap

- Navigation journey: **Chakra.io › The Information Gap › The Information Ecosystem › Technologies › Let’s Connect**.
- Rename the old **Our Approach** tab to **Technologies**.
- Use subtle, lightweight, right-facing chevrons between the navigation items.
- Add a dedicated page or full-page section for **The Information Gap** before **The Information Ecosystem**. Keep it visually consistent with Chakra, but cleaner and more explanatory than the ecosystem section.
- Visitor journey: understand Chakra, then the problem, then the broader information ecosystem, then the technologies, and finally how to engage.
- Explain **The Systems Information Readiness Gap** with this core statement:

  > Organizations increasingly rely on intelligent systems to produce information, inform decisions, and drive outcomes before the organization can determine whether that information is ready to be relied upon.

- Present these three cards and preserve their meaning:
  - **Operational Influence:** Once introduced into the enterprise operational environment, information directly informs and influences downstream decisions, actions, operations, and outcomes.
  - **Unready Information:** Organizations lack an operational mechanism to ready upstream information BEFORE that information is acted upon or shapes and influences downstream business operations.
  - **Consequential Reliance:** When unreadied, deficient information reaches or informs a consequential decision; the failure can become operational, regulatory, evidentiary, financial, or human.
- After explaining the problem, invite the visitor into the Information Ecosystem to see Chakra’s response.

## Project owner preferences and recent implementation notes

These are the website owner’s directions, separate from Roz’s source feedback:

- Keep a video-game influence in the visual design, with animated transitions inspired by landonorris.com.
- The brand symbol was originally a chakra/mandala, not a letter C. Roz's Oct 6 email superseded this with the information-field logo described below.
- Support both desktop and mobile without distorting the layout.
- The owner most recently said not to prioritize or change the social links yet. The current footer social links may still point to general platform homepages; wait for official profile URLs before changing those destinations.

Recent fixes already pushed to `main` in `f624b9d`:

- Made the marquee static under reduced-motion preference so it cannot stop after one pass; it loops continuously for visitors with normal motion enabled.
- Increased the smallest text sizes and switched to a menu layout at narrower widths.
- Kept the navigation fixed while scrolling and added anchor offset spacing.
- Made reveal content visible by default, using scroll observation only when supported.
- Updated the hero orbit label to Information Intelligence to match its accessible description.
- Disabled homepage ROSA/HCI cards and ROSA destination links so they do not imply that the product experiences are open.

## Logo, favicon, and magenta rule (Roz email, Oct 6, 2026 — "Remove The Current Chakra Logo Place Holder")

Roz asked to remove the placeholder logo and try her concept, taking creative liberties.

- **Concept:** scattered squares represent information moving toward the business enterprise. They reach a boundary, where they are stopped and checked for accuracy and "readiness" before proceeding into the organization — stopped, eventually, by ROSA.
- **Implemented:**
  - `assets/logo-mark.svg` — squares (blue fading to white, growing toward the boundary) fan toward a vertical magenta boundary line with a glowing white node. Used in the header and footer wordmark (all pages) and in the hero core.
  - `assets/logo-watermark.svg` — pink-free monochrome version, used only for the large faded background mark in the contact section.
  - `assets/favicon.svg` — simplified bolder version on a navy rounded square. `favicon-32.png` and `apple-touch-icon.png` are linked in every page `<head>`. `icon-192.png` is generated but not linked yet (for a future web manifest).
  - `assets/mandala.svg` (old flower placeholder) was deleted.
- **MAGENTA RULE (strict, from Roz):** the magenta/pink on the boundary is the **only** use of magenta on the site. It is a quiet homage to women in technology and Chakra's woman-founded identity — not a brand color. **No decorative pink/magenta anywhere else.** The exclusivity is what gives the mark meaning.
  - The only pink in the repo is the boundary line (`#ff2fa8`) inside `logo-mark.svg` and `favicon.svg`.
  - The `--magenta` CSS variable was removed. Former pink accents are now lime (`--arcade`, `#d9ff55`). The HCI card's purple gradient is now navy.
  - Before shipping any visual change, check that no pink or purple has been introduced (computed-style scan or visual review). Do not use pink in new components, hover states, glows, or gradients.
- Logo CSS lives in the "Logo layer" block at the end of `assets/site.css`.

## Motion, launch screen, and type system (Oct 6, 2026 — owner direction)

The owner asked for the site to feel like starting a video game, not a static page. Roz's earlier \"slow celestial drift\" direction still governs the orbit. **The boot screen, warp, and HALO are bolder than Roz's original guidance and need her sign-off.**

### Libraries (all vendored, MIT, no build step, no CDN)
- `assets/vendor/motion.js` — Motion v14 (motion.dev), UMD global `Motion`.
- `assets/vendor/three.r134.min.js` + `assets/vendor/vanta.halo.min.js` — three.js r134 and Vanta v0.5.24 HALO (~620KB together). Loaded lazily, desktop only.
- All site motion code is in `assets/motion.js`, numbered by section.

### Retro launch screen (`motion.js` §4)
- Plays on the **first page of a browser session** (any page), tracked with the `chakraBooted` key in `sessionStorage`. A new tab or visit shows it again.
- An inline `<head>` script adds `intro-pending` to `<html>` before first paint so content doesn't flash. A 9s safety timeout removes it if JS fails.
- Sequence (~4s):
  1. CRT screen (scanlines, flicker, Press Start 2P pixel font) with the CHAKRA.IO title and boot log.
  2. A 20-block loading bar fills, then ▶ PRESS START blinks.
  3. It auto-launches, or launches early on Enter, click or tap.
  4. A CRT power-off squeeze, then a starfield **space warp**. As the warp slows, the hero **fades in** (opacity only; the headline no longer flies or scales in).
- Skip: the Skip button or Escape. Scrolling does **not** skip (that was removed on purpose).

### Other motion
- **Living logo:** squares stream into the boundary line in the header and hero core. The hero core mark drifts toward the cursor (hero only).
- **Kinetic headlines:** h1/h2 reveal word by word. The hero h1 is excluded (the launch handles it). `#supported-heading` is excluded.
- **Scroll:** the hero copy and orbit scale and fade as you scroll past (fly-through). Cards, rows, kickers and supporters spring in when they enter the viewport. A lime progress bar runs along the top of the window.
- **Magnetic CTAs:** mouse only.
- **Cross-page View Transitions:** CSS `@view-transition`. The header persists.
- **Orbit:** the six nodes orbit **clockwise**, one lap per 150s. The rings turn clockwise over 240–400s. This applies on mobile too. Direction was verified in the browser.
- **Vanta HALO** (`motion.js` §4b):
  - Hero background, desktop only (>800px, WebGL required). Loads after the boot screen.
  - Destroyed when the hero scrolls out of view and recreated on return. Mouse controls are on.
  - **HALO's shader generates pink/purple regardless of options.** A CSS filter on `.hero .vanta-canvas` forces a single blue hue. Never remove it (magenta rule).
  - Halo strength is toned down to opacity 0.36. Motion's fade-in sets it inline in `motion.js`, so change it there as well as in `site.css`.
  - Vanta wraps the hero's whitespace text nodes in `<span>`s. `.hero>span:not([class]){display:contents}` keeps them from breaking the grid.

### Rules for any new motion
- **Reduced motion:** everything must respect `prefers-reduced-motion`. When it is on, `motion.js` exits early: no boot, no HALO, static content.
- **No pink:** no pink or magenta in any effect, glow, canvas or gradient. Verify with a computed-style and pixel check.
- **Performance:** animate only transform, opacity and filter. Pause or destroy effects while they are off screen.

### Type system (final layer in `assets/site.css`)
- One fluid scale, about a 1.25 \"major third\", defined as tokens on `:root`. Floor: **no text below 15px**, except ®/™ superscripts.
- Desktop maximums:

| Token | Use | Size |
|---|---|---|
| `--fs-label` | mono labels | 15px |
| `--fs-small` | nav/buttons | 16px |
| `--fs-body` | body text | 17–20px |
| `--fs-lead` | lead text | 19–24px |
| `--fs-h3` | card/row titles | 22–32px |
| `--fs-h2` | section headlines | 38–84px |
| `--fs-display` | hero headline | 56–150px |

- Orbit node titles are 22px (major) and 17px (foundation).
- Because older CSS layers above hard-code sizes, the final layer uses `!important` on sizes. A cleanup that removes the old layers would let those `!important`s go.
- Decorative edge micro-labels (coordinates, orbit corner labels, route index) were removed. Content keeps a `--gutter` of at least 20px.
- Section vertical padding is `--section-y` (64–104px). Two-column section heads use a balanced grid, centered vertically.
- **Mobile:** the hero stacks the copy above the orbit. The hero h1 is 40–56px.

## Current source map

- `index.html` — corporate home, primary navigation, information gap, ecosystem, technology list, supporters, contact, and footer.
- `assets/site.css` — shared corporate styles, mobile rules, typography, motion, and navigation.
- `assets/logo-mark.svg`, `assets/logo-watermark.svg`, `assets/favicon.svg` (+ PNG icons) — brand marks (see logo section).
- `assets/motion.js` — launch screen, HALO loader, headline/scroll/logo/magnetic motion.
- `assets/vendor/` — Motion, three.js r134, Vanta HALO (vendored).
- `assets/site.js` — reveal effects, mobile navigation, and ROSA story progress behavior.
- `assets/world.css` — ROSA/HCI and dedicated-world presentation.
- `rosa/index.html` — consumer-facing ROSA story.
- `rosa/systems-information-readiness/index.html`, `rosa/runtime/index.html`, `rosa/mvp/index.html` — stable ROSA routes.
- `hci/index.html` — HCI world route.
- `privacy/index.html` — privacy statement.

## Pending inputs

- Roz's approval of the retro boot screen, warp, and HALO background (they go beyond her "slow celestial drift" direction).
- Roz's feedback on the new logo/favicon concept (she invited iteration; blue tone and square density are my choices and easy to adjust). Replace with an official logo if one is supplied.
- Supporter logos: the owner supplied logo files on Oct 6, 2026. They are in `assets/supporters/`, converted to white monochrome on transparent, with captions for Princeton (Office of Innovation) and Rutgers (MBS). The Rutgers and Princeton files are the parent-university marks; swap in unit-specific marks if Roz provides them. Confirm Roz has the institutions' approval before wider launch.
- Obtain Chakra’s official LinkedIn, Bluesky, and YouTube profile URLs before changing the footer social destinations.
- Keep ROSA/HCI entry points closed until Roz explicitly changes that direction.
- Coordinate any functional ROSA MVP work with Jordyn; it is a separate phase from corporate-site refinements.

## Temporary password lock (removed)

A surface-level preview password lock (`assets/lock.js`, plus one `<script>` line per page) was added on Oct 6, 2026 in commit `19b2059` and later removed. To bring it back, run `git revert` on the removal commit.

## aichakra.io-v2 — redesign notes (Oct 10, 2026, owner direction)

Repo: https://github.com/rishabmohandoss/aichakra.io-v2 (local: `~/aichakra.io-v2`). A static, no-build, one-page rebuild of this site. Preview with `python3 -m http.server 8123` from that folder. Pushed to `main` (latest `9a64746`).

### What changed and why
- **Background (`assets/space.js`, `.void` in `assets/site.css`).** The hero keeps the WebGL sky exactly as before (aurora, stars, vapour text). After the hero a solid Astorian Midnight `#0b193a` layer fades in and covers everything (no stars, aurora, or Earth) to signal deep emptiness. Two huge, near-identical radial washes (`.void::before/::after`, 80 s and 100 s drifts, `#15306a` / `#050c20`) give very slow movement; owner asked for it to be slightly more noticeable and then approved. A third layer (`.void-glow`, driven by the `LIGHT` table in `assets/app.js`) slowly moves and re-tints the light per chapter (3 s transition, uses `@property` for `--gx/--gy/--gc`). Reduced motion stops the drift.
- **Earth.** A version where the Earth rose only in "Supported by" was tried and rejected as ugly; reverted. The Earth markup and code remain but are covered by the void. Do not re-add without asking.
- **Footer socials.** LinkedIn, Bluesky, and YouTube are now icon-only links (inline SVG, `aria-label`). URLs are still the generic homepages: **replace with Chakra's real profiles**.
- **The Information Gap (`#gap`).** The pinned scroll-jacked "scramble" sequence (340vh) was removed because it felt like the page had ended. It is now three ideas in normal flow, each led by a small dim "Information", joined by a vertical thread that fills with scroll; the idea nearest screen centre is in focus, the others dim. Idea 03 holds the Readiness Boundary flow. Logic: `beatList` block in `assets/app.js`.
- **Technologies.** ROSA now shows "Runtime Operations & Systems Analytics" plus a description taken from Roz's ROSA story (above). HCI's description is the owner's direction, "a human in the loop": *HCI keeps a human in the loop. Intelligent systems do the work, and people review, direct and approve what matters before it becomes a decision.* The spinning artwork now sits in its own space above the text so words never cover it.
- **Let's Connect (`#contact`).** New closing section restoring the old "Build the house. Make room for what's next." page in the current theme (accent blue, serif italic middle line, faint rings). Button is `mailto:hello@chakra.io` (carried over from the old site; **confirm**).
- **Supporter logos.** Each logo sits in an identical 96 px box so all share one centre line; captions hang below. The NJIT logo is nudged down 10 px (`img[alt="NJIT"]`).
- **Company page (`#company`).** Title "Chakra / Intelligent / Systems" on the left. On the right, two separate stacked blocks with a hairline between: **Who we are** (Roz's official statement, verbatim) and **What we do** (draft, see below). Boxed/frosted panels, a single merged paragraph, a three-column list, and a centred layout were each tried and rejected.
- **Spacing.** From section 04 (The House) onward, and for The Company and The Ecosystem, sections no longer fill a full screen; they take their content height with 48–90 px padding so one hands off to the next.
- **Continuity.** Each section (except hero and gap) fades with scroll so one dissolves into the next (`journey()` in `assets/app.js`). A rail/index of chapter dots, chapter pop-up titles, and a progress bar were tried and rejected as "an index, not an experience". Bridge lines between sections and an overlapping-sections layout were prototyped and not chosen.
- **The thread (chosen).** A glowing point on the left edge tracks scroll progress and **can be dragged (or the line clicked) to scrub the page**; arrow/Page/Home/End keys also work and it is exposed as a `role="scrollbar"`. Scrolling is set with `behavior: 'instant'` so the page's smooth-scroll doesn't lag behind the pointer. Hidden under 860 px (touch scrolls natively). No network cost; performance is bounded by the same per-scroll work the page already does.

### Copy that is a draft and needs Roz's approval
- **What we do:** "We build the technologies that determine whether information from intelligent systems is ready to be relied upon, with people kept in the loop, before it shapes a decision or an action." (Written from the site's own ROSA/readiness/HCI language; it is a claim about what the company does.)
- The HCI description above.
- The "Who we are" label is from the "Who we are" note earlier in this file.

### Design audit — "vibe-coded" tells (flagged, deliberately NOT yet fixed; owner chose to leave as is for now)
Owner flagged glowy buttons and gradients (ROSA/HCI cards, Readiness Boundary icons). Audit of `assets/site.css` found:
- **Glows (~10 places):** ROSA "R" text-shadow, HCI "H" disc halo, orbit-dot drop-shadows, pink/blue ring glows on ecosystem nodes, three-layer thread-orb halo, thread/beat-dot/level-dot glows, Let's Connect hover shadow.
- **Gradients:** teal and indigo radial-gradient card backgrounds (ROSA/HCI), gradient icon discs with glow ring (Readiness Boundary `.ficon`), ecosystem node discs, and a background light that drifts to violet (`#241b55` in the Gap) — the most-cited purple/blue tell.
- **Other tells:** icon-in-a-circle everywhere; blur-in on every `.reveal`; `backdrop-filter` blur on the world cards; numbered mono kickers ("03 / …") on nearly every section; sans headline with an italic-serif accent word; hero aurora is pink/purple (hero kept at owner's request).
- **Proposed "flat pass" (awaiting go-ahead):** remove glows (flat solid dots, plain fill-swap button hover); replace gradient cards with flat navy + 1 px hairline; bare line icons or numbers instead of circles; keep fades but drop blur; use fewer numbered labels; one blue accent used for action/emphasis only; keep light drift inside one blue family (no violet/teal). Keep the serif accent unless the owner decides otherwise (brand decision).
- **Wider checklist from the research:** replace generic copy with specific claims; vary layout instead of equal cards; check on a real phone (not yet done for v2); contrast checks if any glass is kept. Sources: thefountaininstitute.com/blog/signs-vibe-coded-ui, codemyspec.com/blog/vibe-coded-websites-look-the-same, 21st.dev/blog/website-not-look-ai-generated, superdesign.dev/blog/fix-generic-ai-landing-page, blog.logrocket.com/ux-design/what-is-glassmorphism (practitioner opinion, not research).

### Pending for v2
- Real social profile URLs; confirm `hello@chakra.io`.
- Roz's approval of the draft copy above.
- Decide on the flat pass.
- A real-phone QA pass (mobile layouts for the new sections were written but not verified on a device).
