# Fostering Friendships

### Live site: https://odyssey-jotun.github.io/fostering-friendship/

The site for Fostering Friendships, a 501c3 nonprofit founded by Jackson Jones in Little
Rock, Arkansas, helping foster children build real peer relationships.

The copy and photographs come from the original site, with two deliberate exceptions:
Jackson's bio is updated (he is now a freshman at UCLA, and the project dates to his junior
year of high school), and Keene Jones has been added as Acting President with a new bio and
portrait. Everything else is the original wording. The design and the markup are new.

## What is here

| File | What it is |
| --- | --- |
| `index.html` | The one-page site: hero, get started, about, research references |
| `research.html` | The four studies in full, one `h2` each, with a sticky table of contents |
| `blog.html` | Blog listing |
| `styles.css` | All styling |
| `script.js` | Nav, accordion, scroll behavior |
| `assets/` | Logo, photos, hero video, the 14-page guide PDF |

Plain static HTML, CSS and JavaScript. No framework, no build step, no dependencies.
Open `index.html` or run `python3 -m http.server 8000` and go to http://localhost:8000.

## The design

- Type is Fraunces over Inter.
- **Vertical rhythm is a two-sided rule.** A heading hugs the content it introduces AND always
  has clearly more space above it than below it. Both halves, always. Zeroing a heading's
  `margin-top` so it does not push down inside a card will make it sit flush against whatever
  block precedes it, which is what happened here once. The container owns the gap
  (`--flow-block`); headings zero out only as a first child. Spacing tokens live on `:root`.
- `tools-spacing-audit.mjs` checks it. Serve the site on :8000 and run
  `node tools-spacing-audit.mjs`; it prints every heading with the gap above and below and
  flags any where above <= below. It should print no `**` lines.
- Original palette kept: `#7EBEC5` teal, `#d4edf4` pale blue, `#d3582c` burnt orange.
- Full-bleed hero video with the still frame as poster, so it never shows blank.
- The research lives on its own page. The landing page keeps the intro, a "Learn More
  About The Research" button and the reference list; the full write-ups are on `research.html`.
- "What We Do" and "Our Values" are split into two paragraphs each instead of one wall of text,
  and the three values carry an icon and a one-line gloss.
- Mobile nav, scroll-spy highlighting, back-to-top and reveal-on-scroll all work.
- Two generic stock images with "OUR CORE VALUES" and "WELCOME" baked into them were
  cut. The real photographs of Jackson and the volunteer team carry those sections.

## Why there is no contact form

The original had one, but it posted to a WordPress backend that no longer exists and its
reCAPTCHA key was bound to the dead domain, so it could never have worked again. There is
also no contact email anywhere in the archived site, so there was nothing to fall back to.
It was removed rather than left on the page as a dead end.

## Notes

Both pages carry `noindex, nofollow` so this does not compete with the organization in
search results. Remove those tags if it goes up on its own domain.

`fosteringfriendship.org` expired and was deleted, so the original is offline. The copy,
photographs, video and PDF here were recovered from the last capture of it before it went
down. Not to be confused with `fosteringfriendships.org` (plural), a separate and still
active mentoring organization.
