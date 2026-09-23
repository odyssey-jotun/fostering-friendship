/* Fostering Friendships */

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
})();
