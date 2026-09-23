/* Fostering Friendships
   Set this once and the contact form posts for real, no page reload.
   Make a free endpoint at https://formspree.io and paste it here. */
var FORM_ENDPOINT = "";

(function () {
  "use strict";

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ── Header shadow on scroll ──────────────────── */
  var header = $("#siteHeader");
  var toTop  = $("#toTop");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop)  toTop.classList.toggle("show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ──────────────────────────────── */
  var burger = $("#burger");
  var nav    = $("#nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* ── Highlight the section you are in ─────────── */
  var sections = $$("main section[id]");
  var navLinks = {};
  $$('.nav a[href^="#"]').forEach(function (a) {
    navLinks[a.getAttribute("href").slice(1)] = a;
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = navLinks[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Reveal on scroll ─────────────────────────── */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var targets = $$(".section .split, .section .steps > li, .section .card, .section .callout, .section .mission, .section .values, .section .cta-band, .section .promise, .section .study");
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        var el = en.target;
        setTimeout(function () { el.classList.add("in"); }, Math.min(i * 70, 280));
        ro.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    targets.forEach(function (el) { ro.observe(el); });
  }

  /* ── One study open at a time ─────────────────── */
  var studies = $$(".study");
  studies.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      studies.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ── Contact form ─────────────────────────────── */
  var form = $("#contactForm");
  if (!form) return;

  var note    = $("#formNote");
  var counter = $("#count");
  var message = $("#message");

  if (message && counter) {
    message.addEventListener("input", function () {
      counter.textContent = String(message.value.length);
    });
  }

  function setError(id, msg) {
    var slot = $('.err[data-for="' + id + '"]');
    var field = $("#" + id).closest(".field");
    if (slot) slot.textContent = msg || "";
    if (field) field.classList.toggle("invalid", Boolean(msg));
    return !msg;
  }

  function validate() {
    var ok = true;
    ok = setError("first", $("#first").value.trim() ? "" : "Please enter your first name.") && ok;
    ok = setError("last",  $("#last").value.trim()  ? "" : "Please enter your last name.")  && ok;
    var email = $("#email").value.trim();
    ok = setError("email", !email ? "Please enter your email address."
                    : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? "" : "That does not look like a valid email address.") && ok;
    ok = setError("message", $("#message").value.trim() ? "" : "Please write a message.") && ok;
    return ok;
  }

  ["first", "last", "email", "message"].forEach(function (id) {
    var el = $("#" + id);
    el.addEventListener("blur", validate);
    el.addEventListener("input", function () {
      if (el.closest(".field").classList.contains("invalid")) validate();
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    note.className = "form-note";
    note.textContent = "";

    if ($("#website").value) return;          // honeypot
    if (!validate()) {
      note.className = "form-note bad";
      note.textContent = "Please fix the fields marked above.";
      return;
    }

    if (!FORM_ENDPOINT) {
      note.className = "form-note bad";
      note.textContent = "This form is not connected yet. Add a Formspree endpoint to FORM_ENDPOINT at the top of script.js and it will start sending.";
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (r) {
        if (!r.ok) throw new Error("bad status " + r.status);
        form.reset();
        if (counter) counter.textContent = "0";
        note.className = "form-note ok";
        note.textContent = "Thank you. Your message has been sent.";
      })
      .catch(function () {
        note.className = "form-note bad";
        note.textContent = "Something went wrong sending that. Please try again.";
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
  });
})();
