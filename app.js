/* MoKhairy 3.0 — theme · language · reveal */
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
    if (meta) meta.setAttribute("content", theme === "light" ? "#f2f6f2" : "#060a08");
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
  var titles = {
    en: "Mohamed Khairy — Frontend Developer · Arabic-first products & dev tools",
    ar: "محمد خيري — مطور واجهات · منتجات عربية أولًا وأدوات للمطورين"
  };

  function applyLang(lang) {
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var value = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if (value !== null) el.innerHTML = value;
    }
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.title = titles[lang] || titles.en;
    if (langLabel) langLabel.textContent = lang === "ar" ? "English" : "عربية";
  }

  var savedLang = null;
  try { savedLang = localStorage.getItem("mk3-lang"); } catch (e) {}
  applyLang(savedLang === "ar" ? "ar" : "en");

  var langToggle = $("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      var next = root.getAttribute("dir") === "rtl" ? "en" : "ar";
      applyLang(next);
      try { localStorage.setItem("mk3-lang", next); } catch (e) {}
    });
  }

  /* ---------- Reveal on scroll (light elegant motion) ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    for (var j = 0; j < revealEls.length; j++) revealEls[j].classList.add("in");
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

  /* ---------- Mobile menu ---------- */
  var burger = $("navBurger");
  var menu = $("mobileMenu");
  if (burger && menu) {
    var closeMenu = function () {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    };
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  /* ---------- Scrollspy (nav active state) ---------- */
  var navAnchors = document.querySelectorAll(".nav-links a");
  var spyPairs = [];
  navAnchors.forEach(function (a) {
    var sec = document.getElementById(a.getAttribute("href").slice(1));
    if (sec) spyPairs.push({ link: a, sec: sec });
  });
  if ("IntersectionObserver" in window && spyPairs.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        for (var k = 0; k < spyPairs.length; k++) {
          if (spyPairs[k].sec === en.target) {
            navAnchors.forEach(function (a) { a.classList.remove("active"); });
            spyPairs[k].link.classList.add("active");
          }
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    spyPairs.forEach(function (o) { spy.observe(o.sec); });
  }

  /* ---------- Copy email + toast ---------- */
  var copyBtn = $("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "mohamedkhairy0887@gmail.com";
      var done = function () {
        var t = $("toast");
        if (t) {
          t.textContent = root.getAttribute("dir") === "rtl" ? "تم نسخ الإيميل ✓" : "Email copied ✓";
          t.classList.add("show");
          setTimeout(function () { t.classList.remove("show"); }, 2200);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }
})();
