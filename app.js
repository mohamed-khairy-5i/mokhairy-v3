/* MoKhairy 3.1 — multi-page · theme · language · reveal · filters · brief */
(function () {
  "use strict";

  var root = document.documentElement;
  var $ = function (id) { return document.getElementById(id); };
  var page = document.body.getAttribute("data-page") || "home";

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
    home: {
      en: "Mohamed Khairy — Frontend Developer · Arabic-first products & dev tools",
      ar: "محمد خيري — مطور واجهات · منتجات عربية أولًا وأدوات للمطورين"
    },
    work: { en: "Work — Mohamed Khairy · 20 shipped projects", ar: "الأعمال — محمد خيري · 20 مشروع منشور" },
    certificates: { en: "Certifications — Mohamed Khairy · 28 verified certificates", ar: "الشهادات — محمد خيري · 28 شهادة موثقة" },
    about: { en: "About — Mohamed Khairy · Frontend Developer from Cairo", ar: "عني — محمد خيري · مطور واجهات من القاهرة" },
    contact: { en: "Contact — Mohamed Khairy · Frontend Developer in Cairo", ar: "تواصل — محمد خيري · مطور واجهات في القاهرة" }
  };

  var countLabels = {
    all: { en: "20 projects", ar: "٢٠ مشروع" },
    product: { en: "11 web products", ar: "١١ منتج ويب" },
    design: { en: "9 design works", ar: "٩ أعمال تصميم" }
  };
  var workFilter = "all";

  function updateCount() {
    var out = document.querySelector(".work-count");
    if (!out) return;
    var l = countLabels[workFilter] || countLabels.all;
    out.textContent = root.getAttribute("dir") === "rtl" ? l.ar : l.en;
  }

  function isRtl() { return root.getAttribute("dir") === "rtl"; }

  function applyLang(lang) {
    var nodes = document.querySelectorAll("[data-en]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var value = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if (value === null) continue;
      if (el.tagName === "IMG") { el.setAttribute("src", value); continue; }
      el.innerHTML = value;
    }
    var ph = document.querySelectorAll("[data-en-placeholder]");
    for (var p = 0; p < ph.length; p++) {
      ph[p].setAttribute("placeholder", lang === "ar" ? ph[p].getAttribute("data-ar-placeholder") : ph[p].getAttribute("data-en-placeholder"));
    }
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    var t = titles[page] || titles.home;
    document.title = t[lang] || t.en;
    if (langLabel) langLabel.textContent = lang === "ar" ? "English" : "عربية";
    updateCount();
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

  /* ---------- Nav active state (per page) ---------- */
  var pageHrefs = { home: "index.html", work: "work.html", certificates: "certificates.html", about: "about.html", contact: "contact.html" };
  var currentHref = pageHrefs[page];
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(function (a) {
    if (a.getAttribute("href") === currentHref) a.classList.add("active");
  });

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

  /* ---------- Certification filters (certificates.html) ---------- */
  var certChips = document.querySelectorAll(".cert-chip[data-filter]");
  if (certChips.length) {
    var certCards = document.querySelectorAll(".cert-card");
    var recentHead = document.querySelector("[data-cert-recent-head]");
    certChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        certChips.forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        var f = chip.getAttribute("data-filter");
        certCards.forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-group") === f;
          card.style.display = show ? "" : "none";
        });
        if (recentHead) recentHead.style.display = f === "all" ? "" : "none";
      });
    });
  }

  /* ---------- Work filters (work.html) ---------- */
  var workChips = document.querySelectorAll("[data-work-filter]");
  if (workChips.length) {
    var workBlocks = document.querySelectorAll("[data-work-block]");
    workChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        workChips.forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        workFilter = chip.getAttribute("data-work-filter");
        workBlocks.forEach(function (b) {
          b.style.display = (workFilter === "all" || b.getAttribute("data-work-block") === workFilter) ? "" : "none";
        });
        updateCount();
      });
    });
  }

  /* ---------- Project brief (contact.html) ---------- */
  var briefForm = $("briefForm");
  if (briefForm) {
    var need = $("briefNeed");
    var timeline = $("briefTimeline");
    var notes = $("briefNotes");
    var mailBtn = $("briefMail");
    var waBtn = $("briefWa");
    var EMAIL = "mohamedkhairy0887@gmail.com";

    var compose = function () {
      var ar = isRtl();
      var type = need ? need.value : "";
      var time = timeline ? timeline.value : "";
      var txt = notes && notes.value.trim() ? notes.value.trim() : "—";
      var msg = ar
        ? "مرحبًا محمد،\n\nنوع الاحتياج: " + type + "\nالجدول التقريبي: " + time + "\nالتفاصيل: " + txt + "\n\n"
        : "Hi Mohamed,\n\nProject need: " + type + "\nTimeline: " + time + "\nNotes: " + txt + "\n\n";
      var subject = ar ? "موجز مشروع جديد" : "New project brief";
      if (mailBtn) mailBtn.setAttribute("href", "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(msg));
      if (waBtn) waBtn.setAttribute("href", "https://wa.me/201060487315?text=" + encodeURIComponent(msg));
    };
    briefForm.addEventListener("input", compose);
    briefForm.addEventListener("change", compose);
    compose();
  }

  /* ---------- Copy email + toast ---------- */
  var copyBtn = $("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email") || "mohamedkhairy0887@gmail.com";
      var done = function () {
        var t = $("toast");
        if (t) {
          t.textContent = isRtl() ? "تم نسخ الإيميل ✓" : "Email copied ✓";
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
