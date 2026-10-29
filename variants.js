/* MoKhairy style variants — shared micro-logic: language toggle + reveal on scroll */
(function () {
  'use strict';

  /* ---------- language ---------- */
  var root = document.documentElement;
  var LANG_KEY = 'mk-variant-lang';
  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
  var lang = saved === 'ar' ? 'ar' : 'en';

  function applyLang(next) {
    lang = next;
    root.setAttribute('lang', next === 'ar' ? 'ar' : 'en');
    root.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
    var nodes = document.querySelectorAll('[data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var v = el.getAttribute('data-' + next);
      if (v !== null) el.innerHTML = v;
    }
    var label = document.getElementById('langLabel');
    if (label) label.textContent = next === 'ar' ? 'EN' : 'عربية';
    var tEn = document.body.getAttribute('data-title-en');
    var tAr = document.body.getAttribute('data-title-ar');
    if (tEn && tAr) document.title = (next === 'ar') ? tAr : tEn;
    try { localStorage.setItem(LANG_KEY, next); } catch (e) {}
  }

  var btn = document.getElementById('langToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      applyLang(lang === 'en' ? 'ar' : 'en');
    });
  }
  applyLang(lang);

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  if (!reduced && 'IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- smooth anchor scrolling ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        }
      }
    });
  });
})();
