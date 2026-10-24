/* MoKhairy 3.1 — theme · language · reveal · burger · copyEmail · cert filters */
(function () {
  "use strict";

  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Theme (dark is the identity; light is the guest) ---------- */
  var iconMoon = $("iconMoon");
  var iconSun = $("iconSun");

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      if (iconSun) iconSun.classList.remove("hidden");
      if (iconMoon) iconMoon.classList.add("hidden");
    } else {
      root.setAttribute("data-theme", "dark");
      if (iconMoon) iconMoon.classList.remove("hidden");
      if (iconSun) iconSun.classList.add("hidden");
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f2f5fb" : "#060a12");
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem("mk3-theme"); } catch (e) {}
  applyTheme(savedTheme === "light" ? "light" : "dark");

  var themeToggle = $("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("mk3-theme", next); } catch (e) {}
    });
  }

  /* ---------- Language (EN / AR with RTL) ---------- */
  var langLabel = $("langLabel");

  function pageTitle(lang) {
    return root.getAttribute(lang === "ar" ? "data-title-ar" : "data-title-en") || document.title;
  }

  function applyLang(lang) {
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var value = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if (value !== null) el.innerHTML = value;
    }
    /* bilingual certificate images swap with the language */
    var imgs = document.querySelectorAll("img[data-src-en]");
    for (var j = 0; j < imgs.length; j++) {
      var img = imgs[j];
      var src = lang === "ar" ? (img.getAttribute("data-src-ar") || img.getAttribute("data-src-en")) : img.getAttribute("data-src-en");
      if (src && img.getAttribute("src") !== src) img.setAttribute("src", src);
    }
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    var t = pageTitle(lang);
    if (t) document.title = t;
    if (langLabel) langLabel.textContent = lang === "ar" ? "English" : "عربية";
    try { localStorage.setItem("mk3-lang", lang); } catch (e) {}
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem("mk3-lang"); } catch (e) {}
  applyLang(savedLang === "ar" ? "ar" : "en");

  var langToggle = $("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      applyLang(root.getAttribute("dir") === "rtl" ? "en" : "ar");
    });
  }

  /* ---------- Mobile menu ---------- */
  var burger = $("navBurger");
  var menu = $("mobileMenu");
  function closeMenu() {
    if (menu) menu.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 700) closeMenu();
    });
  }

  /* ---------- Active nav link ---------- */
  var page = root.getAttribute("data-page") || "";
  var navLinks = document.querySelectorAll("[data-nav]");
  for (var k = 0; k < navLinks.length; k++) {
    if (navLinks[k].getAttribute("data-nav") === page) navLinks[k].classList.add("active");
  }

  /* ---------- Copy email + toast ---------- */
  var toast = $("toast");
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }
  var copyBtn = $("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var em = copyBtn.getAttribute("data-email") || "";
      function done() {
        showToast(root.getAttribute("dir") === "rtl" ? "اتنسخ الإيميل ✔" : "Email copied ✔");
      }
      function fallback() {
        var input = document.createElement("input");
        input.value = em;
        document.body.appendChild(input);
        input.select();
        try { document.execCommand("copy"); done(); } catch (e) {}
        document.body.removeChild(input);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(em).then(done, fallback);
      } else { fallback(); }
    });
  }

  /* ---------- Certificate filters ---------- */
  var filterBtns = document.querySelectorAll(".cert-filters button");
  if (filterBtns.length) {
    var cards = document.querySelectorAll("[data-cert-group]");
    Array.prototype.forEach.call(filterBtns, function (btn) {
      btn.addEventListener("click", function () {
        Array.prototype.forEach.call(filterBtns, function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
        var g = btn.getAttribute("data-filter");
        Array.prototype.forEach.call(cards, function (c) {
          c.style.display = (g === "all" || c.getAttribute("data-cert-group") === g) ? "" : "none";
        });
      });
    });
  }

  /* ---------- Reveal on scroll (light elegant motion) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    for (var m = 0; m < revealEls.length; m++) revealEls[m].classList.add("in");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
