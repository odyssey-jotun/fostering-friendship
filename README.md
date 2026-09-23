# Fostering Friendships

### Live site: https://odyssey-jotun.github.io/fostering-friendship/

The site for Fostering Friendships, a 501c3 nonprofit founded by Jackson Jones in Little
Rock, Arkansas, helping foster children build real peer relationships.

Every word of copy and every photograph is from the original site. The design and the
markup are new.

## What is here

| File | What it is |
| --- | --- |
| `index.html` | The one-page site: hero, get started, about, research, contact |
| `blog.html` | Blog listing |
| `styles.css` | All styling |
| `script.js` | Nav, accordion, scroll behavior, form validation |
| `assets/` | Logo, photos, hero video, the 14-page guide PDF |

Plain static HTML, CSS and JavaScript. No framework, no build step, no dependencies.
Open `index.html` or run `python3 -m http.server 8000` and go to http://localhost:8000.

## The design

- Type is Fraunces over Inter. Headings sit tight to the text they introduce.
- Original palette kept: `#7EBEC5` teal, `#d4edf4` pale blue, `#d3582c` burnt orange.
- Full-bleed hero video with the still frame as poster, so it never shows blank.
- The research section is four collapsible cards, one open at a time, instead of the
  wall of text it used to be.
- Mobile nav, scroll-spy highlighting, back-to-top and reveal-on-scroll all work.
- Two generic stock images with "OUR CORE VALUES" and "WELCOME" baked into them were
  cut. The real photographs of Jackson and the volunteer team carry those sections.

## Making the contact form send

The form validates, counts characters and has a honeypot, but nothing receives it yet.
Make a free endpoint at [formspree.io](https://formspree.io) and paste it into the first
line of `script.js`:

    var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";

Until that is set, submitting shows a message saying the form is not connected. The
original posted to a WordPress backend that no longer exists, and there is no contact
email anywhere in the old site, so a mailto fallback was not possible.

## Notes

Both pages carry `noindex, nofollow` so this does not compete with the organization in
search results. Remove those tags if it goes up on its own domain.

`fosteringfriendship.org` expired and was deleted, so the original is offline. The copy,
photographs, video and PDF here were recovered from the last capture of it before it went
down. Not to be confused with `fosteringfriendships.org` (plural), a separate and still
active mentoring organization.
