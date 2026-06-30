/* =====================================================================
   Dalley Law Firm — progressive-enhancement JS
   --------------------------------------------------------------------
   Pages remain fully usable without JS. main.js only adds:
       • accessible mobile menu toggle
       • sticky-header shadow on scroll
       • FAQ accordion (uses native <details>, JS only enhances icon a11y)
       • current-year injection in the footer
       • root index.html: one-time language hint redirect
   ===================================================================== */
(function () {
  "use strict";

  /* ---- mobile nav ------------------------------------------------ */
  var toggle = document.querySelector(".nav__toggle");
  var links  = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    /* collapse menu when a link is clicked (mobile) */
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- sticky header shadow on scroll ---------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- FAQ: ensure each <details> opens exclusively -------------- */
  var faqs = document.querySelectorAll(".faq");
  faqs.forEach(function (group) {
    var items = group.querySelectorAll("details.faq__item");
    items.forEach(function (det) {
      det.addEventListener("toggle", function () {
        if (det.open) {
          items.forEach(function (other) { if (other !== det) other.open = false; });
          /* move focus to the question for screen readers */
          var q = det.querySelector(".faq__q");
          if (q) q.focus({ preventScroll: true });
        }
      });
    });
  });

  /* ---- footer year ------------------------------------------------ */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- root: one-time language hint redirect --------------------- */
  /* Only on the language-selection landing page, if the visitor has
     a navigator.language preference AND has not previously chosen a
     language, gently send them there ONCE. Explicit clicks always win
     and set a flag so we never override a deliberate choice.          */
  var root = document.body && document.body.getAttribute("data-page");
  if (root === "selector") {
    try {
      var chosen = sessionStorage.getItem("dalleylaw_langChosen");
      if (chosen) return; /* user explicitly picked a language this session */
      var seen  = localStorage.getItem("dalleylaw_langSeen");
      if (seen) return;   /* only auto-redirect the very first visit */
      localStorage.setItem("dalleylaw_langSeen", "1");
      var lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
      var go = lang.indexOf("es") === 0 ? "es/index.html" : "en/index.html";
      /* keep UTM-style params if any (helps analytics continuity) */
      if (location.search) go += location.search;
      /* replace so the selector stays reachable via Back */
      location.replace(go);
    } catch (e) { /* ignore storage/redirect failures */ }
  }
})();

/* global helper so inline onclick handlers can mark a deliberate choice */
window.dalleyMarkChosen = function () {
  try { sessionStorage.setItem("dalleylaw_langChosen", "1"); } catch (e) {}
};

/* ---- tel: links: only fire on touch devices (phones) ---------------- */
/* On desktop/tablet the browser shows an annoying "Pick an app" dialog.
   We detect touch capability and suppress the click on non-touch devices,
   so the phone number shows as text and can be copied instead.       */
(function () {
  var isTouch = (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) ||
                ("ontouchstart" in window) ||
                (navigator.maxTouchPoints > 0);
  if (isTouch) return; /* phones — let tel: work normally */
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      /* optionally copy the number to clipboard for convenience */
      var num = a.getAttribute("href").replace("tel:", "");
      if (navigator.clipboard && num) {
        navigator.clipboard.writeText(num.replace("+1", "")).catch(function(){});
      }
    });
    /* change cursor to text on desktop so it reads as copyable text */
    a.style.cursor = "text";
  });
})();