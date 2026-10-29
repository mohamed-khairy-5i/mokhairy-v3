/* MoKhairy — NAV component (single source)
   ----------------------------------------
   The whole header (brand + links + lang/theme toggles + burger + mobile menu)
   lives HERE and only here. Every page mounts it with one line:

     root pages:        <script src="nav.js"></script>
     inside /projects/: <script src="../nav.js"></script>

   Paths are resolved automatically from the script src, so one edit
   updates all pages. */
(function () {
  "use strict";

  var script = document.currentScript;
  var R = script ? (script.getAttribute("src") || "").replace(/nav\.js.*$/, "") : "";
  var isHome = document.documentElement.getAttribute("data-page") === "home";
  var contactHref = isHome ? "#contact" : R + "index.html#contact";

  var html =
    '<header class="nav">' +
      '<div class="container nav-inner">' +
        '<a class="brand" href="' + R + 'index.html" aria-label="Mohamed Khairy — home">' +
          '<span class="brand-mark" aria-hidden="true">' +
            '<svg viewBox="0 0 48 48" width="34" height="34" focusable="false">' +
              '<defs>' +
                '<linearGradient id="bm-g" x1="0" y1="0" x2="1" y2="1">' +
                  '<stop offset="0" stop-color="#4C5BE0"/>' +
                  '<stop offset="0.52" stop-color="#a78bfa"/>' +
                  '<stop offset="1" stop-color="#f0919b"/>' +
                '</linearGradient>' +
              '</defs>' +
              '<rect x="1" y="1" width="46" height="46" rx="13" fill="url(#bm-g)"/>' +
              '<path d="M12 33 V21.5 Q12 15.5 17 17.8 L24 26.5 L31 17.8 Q36 15.5 36 21.5 V33" ' +
                'fill="none" stroke="#fff" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
          '</span>' +
          '<span class="brand-name" data-en="Mo Khairy" data-ar="مو خيري">Mo Khairy</span>' +
        '</a>' +
        '<nav class="nav-links" aria-label="Primary">' +
          '<a href="' + R + 'index.html" data-nav="home" data-en="Home" data-ar="الرئيسية">Home</a>' +
          '<a href="' + R + 'projects.html" data-nav="projects" data-en="Projects" data-ar="المشاريع">Projects</a>' +
          '<a href="' + R + 'certificates.html" data-nav="certs" data-en="Certificates" data-ar="الشهادات">Certificates</a>' +
          '<a href="' + contactHref + '" data-en="Contact" data-ar="تواصل">Contact</a>' +
        '</nav>' +
        '<div class="nav-actions">' +
          '<button id="langToggle" class="chip-btn" type="button" aria-label="Switch language">' +
            '<span id="langLabel">عربية</span>' +
          '</button>' +
          '<button id="themeToggle" class="chip-btn icon-btn" type="button" aria-label="Toggle theme">' +
            '<svg id="iconSun" class="icon hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
            '<svg id="iconMoon" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
          '</button>' +
          '<button id="navBurger" class="nav-burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobileMenu">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<nav id="mobileMenu" class="mobile-menu" aria-label="Mobile">' +
        '<a href="' + R + 'index.html" data-nav="home" data-en="Home" data-ar="الرئيسية">Home</a>' +
        '<a href="' + R + 'projects.html" data-nav="projects" data-en="Projects" data-ar="المشاريع">Projects</a>' +
        '<a href="' + R + 'certificates.html" data-nav="certs" data-en="Certificates" data-ar="الشهادات">Certificates</a>' +
        '<a href="' + contactHref + '" data-en="Contact" data-ar="تواصل">Contact</a>' +
      '</nav>' +
    '</header>';

  if (script && script.parentNode) {
    script.insertAdjacentHTML("afterend", html);
  } else {
    /* fallback if ever loaded async: mount at the top of body */
    document.addEventListener("DOMContentLoaded", function () {
      document.body.insertAdjacentHTML("afterbegin", html);
    });
  }
})();
