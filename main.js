(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "] failed:", e); }
  }

  /* ---------------------------------------------------------
     Icon system — minimal stroke icons, 24x24 viewBox
     --------------------------------------------------------- */
  var ICONS = {
    dumbbell: '<rect x="1" y="9" width="3" height="6" rx="1"/><rect x="20" y="9" width="3" height="6" rx="1"/><rect x="5" y="6.5" width="2.4" height="11" rx="1"/><rect x="16.6" y="6.5" width="2.4" height="11" rx="1"/><line x1="7.4" y1="12" x2="16.6" y2="12"/>',
    flame: '<path d="M12 3c2 3 4 5 4 8.2a4 4 0 1 1-8 0c0-1 .4-2 .9-2.8.5 1 1 1.4 1 1.4C10.3 7.2 12 5.2 12 3z"/>',
    activity: '<polyline points="2,13 6.5,13 9,5 13.5,20 16.5,13 22,13"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    leaf: '<path d="M20 4.2C10.5 4.2 4.6 9.9 4.6 17.6c0 .8 0 1.6.3 2.2C12.4 19 20 13.1 20 4.2z"/><path d="M5 20 12.5 12.5"/>',
    boxing: '<path d="M7.2 13.2V8.4a2.9 2.9 0 0 1 5.8 0v1a2.4 2.4 0 0 1 4.8 0v4a5.8 5.8 0 0 1-5.8 5.8h-1.6a4.8 4.8 0 0 1-4.8-4.8v-1a1.9 1.9 0 0 1 1.6-1.9z"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.3"/><path d="M15.8 14.1c2.7.4 4.7 2.7 4.7 5.9"/>',
    badge: '<path d="M12 2.5 14.3 7l5 .8-3.6 3.5.9 5-4.6-2.4-4.6 2.4.9-5-3.6-3.5 5-.8z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/>',
    heart: '<path d="M12 21c-4.5-3-9-6.4-9-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4.6-4.5 8-9 11z"/>',
    check: '<polyline points="4,12.5 9,17.5 20,6"/>',
    x: '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>',
    star: '<path d="M12 2.7 15 9l7 1-5.1 4.9 1.2 7L12 18.5 5.9 21.9l1.2-7L2 10l7-1z"/>',
    "chevron-left": '<polyline points="15,4 7,12 15,20"/>',
    "chevron-right": '<polyline points="9,4 17,12 9,20"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
    tiktok: '<circle cx="9.3" cy="17" r="3"/><path d="M12.3 17V4l5.7 1.8v3.1"/><path d="M12.3 8.3a5.8 5.8 0 0 0 5.7 3.4"/>',
    youtube: '<rect x="2" y="6" width="20" height="12" rx="4"/><polygon points="10,9.2 15.8,12 10,14.8" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 8.2h3V4.4h-3a4 4 0 0 0-4 4v2.8H7v4h3V21h4v-9.8h3l.8-4H14V8.2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3,7 12,13 21,7"/>',
    phone: '<path d="M4.2 4h3.6l1.7 4.4-2.3 1.6a11.5 11.5 0 0 0 5.8 5.8l1.6-2.3 4.4 1.7v3.6a1.8 1.8 0 0 1-2 1.8C10 19.8 4.2 14 3.4 7A1.8 1.8 0 0 1 4.2 4z"/>',
    mappin: '<path d="M12 22s7-7.4 7-12.4A7 7 0 0 0 5 9.6C5 14.6 12 22 12 22z"/><circle cx="12" cy="9.6" r="2.4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><polyline points="12,7.5 12,12 15.5,14"/>',
    send: '<polygon points="3,11 21,3 14,21 11,13 3,11"/>',
    zoom: '<path d="M8 3H3v5"/><path d="M21 8V3h-5"/><path d="M3 16v5h5"/><path d="M16 21h5v-5"/>'
  };

  function icon(name, size) {
    var s = size || 20;
    var body = ICONS[name] || "";
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  }

  /* ---------------------------------------------------------
     Mounts — idempotent, hardcode-first
     --------------------------------------------------------- */
  function mountStats() {
    var target = $("[data-stats]");
    if (!target || target.children.length > 0 || !data.stats) return;
    target.innerHTML = data.stats.map(function (s) {
      return '<div class="stat-card" data-reveal>' +
        '<div class="stat-icon">' + icon(s.icon, 26) + "</div>" +
        '<div class="stat-value" data-count-to="' + s.value + '" data-suffix="' + escHTML(s.suffix) + '">0' + escHTML(s.suffix) + "</div>" +
        '<div class="stat-label">' + escHTML(s.label) + "</div>" +
        "</div>";
    }).join("");
  }

  function mountTrustBadges() {
    var target = $("[data-hero-trust]");
    if (!target || target.children.length > 0 || !data.trustBadges) return;
    target.innerHTML = data.trustBadges.map(function (b) {
      return '<div class="hero-trust-item">' +
        '<span class="hero-trust-value" data-count-to="' + b.value + '" data-suffix="' + escHTML(b.suffix) + '">0' + escHTML(b.suffix) + "</span>" +
        '<span class="hero-trust-label">' + escHTML(b.label) + "</span>" +
        "</div>";
    }).join("");
  }

  function mountServices() {
    var target = $("[data-services]");
    if (!target || target.children.length > 0 || !data.services) return;
    target.innerHTML = data.services.map(function (s, i) {
      return '<article class="service-card has-halo has-tilt" data-reveal data-reveal-delay="' + ((i % 3) + 1) + '">' +
        '<span class="service-tag">' + escHTML(s.tag) + "</span>" +
        '<div class="service-icon">' + icon(s.icon, 26) + "</div>" +
        '<h3 class="service-name">' + escHTML(s.name) + "</h3>" +
        '<p class="service-desc">' + escHTML(s.desc) + "</p>" +
        "</article>";
    }).join("");
  }

  function mountPlans() {
    var target = $("[data-plans]");
    if (!target || target.children.length > 0 || !data.plans) return;
    target.innerHTML = data.plans.map(function (p, i) {
      var featured = p.featured ? " is-featured" : "";
      var badge = p.featured && p.badge ? '<span class="plan-badge">' + escHTML(p.badge) + "</span>" : "";
      var features = p.features.map(function (f) {
        var ico = f.included ? icon("check", 16) : icon("x", 16);
        return '<li class="plan-feature' + (f.included ? "" : " is-excluded") + '">' + ico + "<span>" + escHTML(f.text) + "</span></li>";
      }).join("");
      return '<article class="plan-card' + featured + '" data-reveal data-reveal-delay="' + (i + 1) + '">' +
        badge +
        '<h3 class="plan-name">' + escHTML(p.name) + "</h3>" +
        '<p class="plan-desc">' + escHTML(p.desc) + "</p>" +
        '<div class="plan-price"><span class="plan-price-currency">€</span><span class="plan-price-value">' + escHTML(p.price) + '</span><span class="plan-price-period">' + escHTML(p.period) + "</span></div>" +
        '<ul class="plan-features">' + features + "</ul>" +
        '<a href="#contacto" class="btn btn-block ' + (p.featured ? "btn-primary" : "btn-ghost") + '" data-magnetic data-magnetic-strength="0.15">' + escHTML(p.cta) + "</a>" +
        "</article>";
    }).join("");
  }

  function mountTrainers() {
    var target = $("[data-trainers]");
    if (!target || target.children.length > 0 || !data.trainers) return;
    target.innerHTML = data.trainers.map(function (t, i) {
      return '<article class="trainer-card has-tilt" data-reveal data-reveal-delay="' + ((i % 3) + 1) + '">' +
        '<img src="' + escHTML(t.photo) + '" alt="' + escHTML(t.name) + ", entrenador de " + escHTML(t.role) + '" loading="lazy" decoding="async" />' +
        '<div class="trainer-overlay"></div>' +
        '<div class="trainer-info">' +
        '<h3 class="trainer-name">' + escHTML(t.name) + "</h3>" +
        '<p class="trainer-role">' + escHTML(t.role) + "</p>" +
        '<p class="trainer-exp">' + escHTML(t.experience) + "</p>" +
        '<p class="trainer-bio">' + escHTML(t.bio) + "</p>" +
        '<div class="trainer-social">' +
        '<a href="#" aria-label="Instagram de ' + escHTML(t.name) + '" onclick="return false">' + icon("instagram", 15) + "</a>" +
        '<a href="#" aria-label="TikTok de ' + escHTML(t.name) + '" onclick="return false">' + icon("tiktok", 15) + "</a>" +
        "</div></div></article>";
    }).join("");
  }

  function mountTestimonials() {
    var track = $("[data-testi-slides]");
    var dots = $("[data-testi-dots]");
    if (!track || track.children.length > 0 || !data.testimonials) return;
    track.innerHTML = data.testimonials.map(function (t) {
      var stars = "";
      for (var i = 0; i < 5; i++) {
        stars += i < t.rating ? icon("star", 16) : '<span style="opacity:.25">' + icon("star", 16) + "</span>";
      }
      return '<div class="testi-slide">' +
        '<div class="testi-stars">' + stars + "</div>" +
        '<p class="testi-text">&ldquo;' + escHTML(t.text) + '&rdquo;</p>' +
        '<div class="testi-person">' +
        '<img class="testi-avatar" src="' + escHTML(t.photo) + '" alt="" loading="lazy" />' +
        '<div><div class="testi-name">' + escHTML(t.name) + '</div><div class="testi-meta">' + escHTML(t.meta) + "</div></div>" +
        "</div></div>";
    }).join("");
    if (dots && dots.children.length === 0) {
      dots.innerHTML = data.testimonials.map(function (_, i) {
        return '<button class="testi-dot' + (i === 0 ? " is-active" : "") + '" data-testi-go="' + i + '" aria-label="Ir al testimonio ' + (i + 1) + '"></button>';
      }).join("");
    }
  }

  function mountSchedule() {
    var target = $("[data-schedule-body]");
    var head = $("[data-schedule-head]");
    if (!target || target.children.length > 0 || !data.schedule) return;
    if (head && head.children.length === 0) {
      head.innerHTML = "<th scope=\"col\">Día</th>" + data.schedule.slots.map(function (s) {
        return "<th scope=\"col\">" + escHTML(s) + "</th>";
      }).join("");
    }
    target.innerHTML = data.schedule.days.map(function (d) {
      return "<tr><th scope=\"row\">" + escHTML(d.day) + "</th>" + d.classes.map(function (c) {
        return "<td>" + escHTML(c) + "</td>";
      }).join("") + "</tr>";
    }).join("");
  }

  function mountFAQ() {
    var target = $("[data-faq]");
    if (!target || target.children.length > 0 || !data.faqs) return;
    target.innerHTML = data.faqs.map(function (f, i) {
      return '<div class="faq-item" data-reveal data-reveal-delay="' + ((i % 4) + 1) + '">' +
        '<button class="faq-question" aria-expanded="false">' +
        "<span>" + escHTML(f.q) + "</span>" +
        '<span class="faq-icon">' + icon("plus", 14) + "</span>" +
        "</button>" +
        '<div class="faq-answer"><div class="faq-answer-inner">' + escHTML(f.a) + "</div></div>" +
        "</div>";
    }).join("");
  }

  function mountFooterSocial() {
    var target = $("[data-footer-social]");
    if (!target || target.children.length > 0 || !data.social) return;
    var keys = ["instagram", "tiktok", "youtube", "facebook"];
    target.innerHTML = keys.map(function (k) {
      return '<a href="' + escHTML(data.social[k] || "#") + '" aria-label="' + k + '" onclick="' + (data.social[k] === "#" ? "return false" : "") + '">' + icon(k, 16) + "</a>";
    }).join("");
  }

  function mountContactInfo() {
    var target = $("[data-contact-info]");
    if (!target || target.children.length > 0) return;
    var items = [
      { icon: "mappin", label: "Dirección", value: data.address },
      { icon: "phone", label: "Teléfono", value: data.phone },
      { icon: "mail", label: "Email", value: data.email },
      { icon: "clock", label: "Horario", value: data.hours.weekdays + " · " + data.hours.weekend }
    ];
    target.innerHTML = items.map(function (it) {
      return '<div class="contact-info-item">' +
        '<div class="contact-info-icon">' + icon(it.icon, 19) + "</div>" +
        '<div><div class="contact-info-label">' + escHTML(it.label) + '</div><div class="contact-info-value">' + escHTML(it.value) + "</div></div>" +
        "</div>";
    }).join("");
  }

  function mountTextFields() {
    $$("[data-brand-text]").forEach(function (el) {
      var path = el.getAttribute("data-brand-text").split(".");
      var val = data;
      for (var i = 0; i < path.length; i++) { val = val && val[path[i]]; }
      if (val != null) el.textContent = val;
    });
    $$("[data-brand-href]").forEach(function (el) {
      var path = el.getAttribute("data-brand-href").split(".");
      var val = data;
      for (var i = 0; i < path.length; i++) { val = val && val[path[i]]; }
      if (val != null) el.setAttribute("href", el.getAttribute("data-href-prefix") === "1" ? el.dataset.hrefPrefix + val : val);
    });
  }

  function mountYear() {
    var el = $("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------
     Cursor
     --------------------------------------------------------- */
  function initCursor() {
    var root = $("[data-cursor-root]");
    if (!root || !fineHover) return;
    document.documentElement.classList.add("has-cursor");
    var ring = root.querySelector(".cursor-ring");
    var dot = root.querySelector(".cursor-dot");
    var tx = 0, ty = 0, rx = 0, ry = 0, firstMove = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (dot) dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      if (!firstMove) {
        firstMove = true;
        rx = tx; ry = ty;
        if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
        root.classList.add("is-ready");
      }
    }, { passive: true });

    function tick() {
      rx += (tx - rx) * 0.18; ry += (ty - ry) * 0.18;
      if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    var HOVERABLES = "[data-cursor-hover], .btn, a[href], button, .faq-question";
    document.addEventListener("mouseover", function (e) { if (e.target.closest && e.target.closest(HOVERABLES)) root.classList.add("is-interactive"); });
    document.addEventListener("mouseout", function (e) {
      var related = e.relatedTarget;
      if (e.target.closest && e.target.closest(HOVERABLES) && !(related && related.closest && related.closest(HOVERABLES))) {
        root.classList.remove("is-interactive");
      }
    });
  }

  /* ---------------------------------------------------------
     Mouse-reactive hero gradient — signature effect
     --------------------------------------------------------- */
  function initHeroGradient() {
    var hero = $(".hero");
    if (!hero) return;
    var mx = 30, my = 40, tx = 30, ty = 40;
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    }, { passive: true });
    function frame() {
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      hero.style.setProperty("--mx", mx + "%");
      hero.style.setProperty("--my", my + "%");
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------
     Nav
     --------------------------------------------------------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      if (scrollY > 40) nav.classList.add("is-scrolled"); else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = $("[data-nav-burger]");
    var mobile = $("[data-nav-mobile]");
    var main = $("#main");
    var footer = $(".footer");
    var lockedScrollY = 0;

    function setMenu(open) {
      mobile.setAttribute("data-open", open ? "true" : "false");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-menu-open", open);

      // Hide the page behind the overlay entirely — some browsers paint
      // iframes (the Google Maps embed) in their own compositing layer
      // that ignores z-index and bleeds through fixed-position overlays.
      if (main) main.style.visibility = open ? "hidden" : "";
      if (footer) footer.style.visibility = open ? "hidden" : "";

      if (open) {
        lockedScrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = -lockedScrollY + "px";
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        window.scrollTo(0, lockedScrollY);
      }
    }

    if (burger && mobile) {
      burger.addEventListener("click", function () {
        setMenu(mobile.getAttribute("data-open") !== "true");
      });
      $$("a", mobile).forEach(function (a) {
        a.addEventListener("click", function () { setMenu(false); });
      });
    }
  }

  /* ---------------------------------------------------------
     Magnetic buttons
     --------------------------------------------------------- */
  function initMagnetic() {
    if (!fineHover) return;
    $$("[data-magnetic]").forEach(function (el) {
      if (el.dataset.magneticBound) return;
      el.dataset.magneticBound = "1";
      var strength = parseFloat(el.getAttribute("data-magnetic-strength") || "0.25");
      var inner = document.createElement("span");
      inner.className = "magnetic-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add("has-magnetic");
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        tx = (e.clientX - r.left - r.width / 2) * strength;
        ty = (e.clientY - r.top - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener("mouseleave", function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
      function loop() {
        cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
        inner.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------------------------------------------------------
     Tilt + halo cursor tracking (shared --mx/--my for cards)
     --------------------------------------------------------- */
  function initTilt() {
    if (!fineHover) return;
    $$(".has-tilt").forEach(function (card) {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "1";
      var MAX = 6;
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        tx = -py * MAX; ty = px * MAX;
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        if (!raf) raf = requestAnimationFrame(loop);
      });
      card.addEventListener("mouseleave", function () { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
      function loop() {
        cx += (tx - cx) * 0.15; cy += (ty - cy) * 0.15;
        card.style.setProperty("--rx", cx.toFixed(2) + "deg");
        card.style.setProperty("--ry", cy.toFixed(2) + "deg");
        raf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  /* ---------------------------------------------------------
     Scroll reveals
     --------------------------------------------------------- */
  function initReveals() {
    var els = $$("[data-reveal]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      $$("[data-reveal]:not(.is-revealed)").forEach(function (el) {
        if (el.getBoundingClientRect().top < innerHeight) el.classList.add("is-revealed");
      });
    }, 6000);
  }

  /* ---------------------------------------------------------
     Count-up numbers
     --------------------------------------------------------- */
  function initCountUp() {
    var els = $$("[data-count-to]");
    if (!els.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        var target = parseFloat(el.getAttribute("data-count-to"));
        var suffix = el.getAttribute("data-suffix") || "";
        var duration = 1500;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min(1, (ts - start) / duration);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     Testimonial carousel
     --------------------------------------------------------- */
  function initTestimonials() {
    var wrap = $("[data-testi]");
    var track = $("[data-testi-slides]");
    if (!wrap || !track) return;
    var slides = $$(".testi-slide", track);
    var dots = $$("[data-testi-go]");
    if (!slides.length) return;
    var idx = 0, timer = null;

    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (idx * 100) + "%)";
      dots.forEach(function (d, di) { d.classList.toggle("is-active", di === idx); });
    }
    function next() { go(idx + 1); }
    function prev() { go(idx - 1); }
    function restart() {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    }

    var nextBtn = $("[data-testi-next]");
    var prevBtn = $("[data-testi-prev]");
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });
    dots.forEach(function (d) {
      d.addEventListener("click", function () { go(parseInt(d.getAttribute("data-testi-go"), 10)); restart(); });
    });

    wrap.addEventListener("mouseenter", function () { clearInterval(timer); });
    wrap.addEventListener("mouseleave", restart);

    go(0);
    restart();
  }

  /* ---------------------------------------------------------
     BMI calculator
     --------------------------------------------------------- */
  function initBMI() {
    var card = $("[data-bmi]");
    if (!card) return;
    var weightInput = $("[data-bmi-weight]", card);
    var heightInput = $("[data-bmi-height]", card);
    var weightVal = $("[data-bmi-weight-val]", card);
    var heightVal = $("[data-bmi-height-val]", card);
    var resultVal = $("[data-bmi-result]", card);
    var resultCat = $("[data-bmi-cat]", card);
    var resultAdvice = $("[data-bmi-advice]", card);

    var CATS = [
      { max: 18.5, key: "bajo", label: "Bajo peso", advice: "Tu IMC sugiere bajo peso. Un programa de fuerza con superávit calórico moderado te ayudará a ganar masa muscular de forma controlada. Habla con nuestro equipo sobre el plan de nutrición del Elite." },
      { max: 25, key: "normal", label: "Peso normal", advice: "Tu IMC está en el rango saludable. Mantén una rutina combinada de fuerza y cardio como la de nuestros planes Premium o Elite para conservar tu composición corporal." },
      { max: 30, key: "sobrepeso", label: "Sobrepeso", advice: "Tu IMC indica sobrepeso. Una combinación de entrenamiento funcional, cardio y seguimiento nutricional suele dar los mejores resultados. Nuestra evaluación InBody te dará un punto de partida más preciso que el IMC por sí solo." },
      { max: Infinity, key: "obesidad", label: "Obesidad", advice: "Tu IMC indica obesidad. Te recomendamos empezar con una valoración inicial gratuita con uno de nuestros entrenadores para diseñar un plan progresivo y seguro." }
    ];

    function calc() {
      var w = parseFloat(weightInput.value);
      var h = parseFloat(heightInput.value) / 100;
      if (weightVal) weightVal.textContent = w + " kg";
      if (heightVal) heightVal.textContent = heightInput.value + " cm";
      if (!w || !h) return;
      var bmi = w / (h * h);
      var cat = CATS.filter(function (c) { return bmi < c.max; })[0] || CATS[CATS.length - 1];
      if (resultVal) resultVal.textContent = bmi.toFixed(1);
      if (resultCat) {
        resultCat.textContent = cat.label;
        resultCat.className = "bmi-result-cat cat-" + cat.key;
      }
      if (resultAdvice) resultAdvice.textContent = cat.advice;
    }

    if (weightInput) weightInput.addEventListener("input", calc);
    if (heightInput) heightInput.addEventListener("input", calc);
    calc();
  }

  /* ---------------------------------------------------------
     FAQ accordion
     --------------------------------------------------------- */
  function initFAQ() {
    var list = $("[data-faq]");
    if (!list) return;
    list.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".faq-question");
      if (!btn) return;
      var item = btn.closest(".faq-item");
      var answer = $(".faq-answer", item);
      var isOpen = item.classList.contains("is-open");
      $$(".faq-item", list).forEach(function (other) {
        other.classList.remove("is-open");
        $(".faq-question", other).setAttribute("aria-expanded", "false");
        $(".faq-answer", other).style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  }

  /* ---------------------------------------------------------
     Contact form
     --------------------------------------------------------- */
  function validateField(field, rule) {
    var errorEl = field.parentElement.querySelector(".field-error");
    var valid = true;
    var msg = "";
    var val = field.value.trim();
    if (field.hasAttribute("required") && !val) { valid = false; msg = "Este campo es obligatorio."; }
    else if (rule === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { valid = false; msg = "Introduce un email válido."; }
    else if (rule === "phone" && val && !/^[+\d][\d\s-]{7,}$/.test(val)) { valid = false; msg = "Introduce un teléfono válido."; }
    field.parentElement.classList.toggle("has-error", !valid);
    if (errorEl) errorEl.textContent = valid ? "" : msg;
    return valid;
  }

  function initContactForm() {
    var form = $("[data-contact-form]");
    if (!form) return;
    var success = $("[data-contact-success]");

    $$("input, select, textarea", form).forEach(function (field) {
      field.addEventListener("blur", function () { validateField(field, field.getAttribute("data-rule")); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.classList.contains("is-sending")) return;

      var fields = $$("input, select, textarea", form);
      var allValid = true;
      fields.forEach(function (f) {
        if (!validateField(f, f.getAttribute("data-rule"))) allValid = false;
      });
      if (!allValid) {
        var firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
        return;
      }

      form.classList.add("is-sending");
      var submitBtn = $("[type=submit]", form);
      if (submitBtn) submitBtn.setAttribute("disabled", "true");

      setTimeout(function () {
        form.classList.remove("is-sending");
        form.classList.add("is-sent");
        if (success) success.classList.add("is-visible");
        if (submitBtn) submitBtn.removeAttribute("disabled");
      }, 900);
    });
  }

  function initNewsletterForm() {
    var form = $("[data-newsletter-form]");
    if (!form) return;
    var msg = $("[data-newsletter-msg]", form.parentElement);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = $("input", form);
      if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        if (msg) { msg.textContent = "Introduce un email válido."; msg.style.color = "#ff6d6d"; }
        return;
      }
      if (msg) { msg.textContent = "¡Gracias! Revisa tu bandeja de entrada."; msg.style.color = ""; }
      input.value = "";
    });
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function boot() {
    safe(mountStats, "mountStats");
    safe(mountTrustBadges, "mountTrustBadges");
    safe(mountServices, "mountServices");
    safe(mountPlans, "mountPlans");
    safe(mountTrainers, "mountTrainers");
    safe(mountTestimonials, "mountTestimonials");
    safe(mountSchedule, "mountSchedule");
    safe(mountFAQ, "mountFAQ");
    safe(mountFooterSocial, "mountFooterSocial");
    safe(mountContactInfo, "mountContactInfo");
    safe(mountTextFields, "mountTextFields");
    safe(mountYear, "mountYear");

    safe(initCursor, "initCursor");
    safe(initHeroGradient, "initHeroGradient");
    safe(initNav, "initNav");
    safe(initMagnetic, "initMagnetic");
    safe(initTilt, "initTilt");
    safe(initReveals, "initReveals");
    safe(initCountUp, "initCountUp");
    safe(initTestimonials, "initTestimonials");
    safe(initBMI, "initBMI");
    safe(initFAQ, "initFAQ");
    safe(initContactForm, "initContactForm");
    safe(initNewsletterForm, "initNewsletterForm");

    if (window.gsap && window.ScrollTrigger) {
      try { gsap.registerPlugin(ScrollTrigger); } catch (_) {}
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
