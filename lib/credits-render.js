(function () {
  "use strict";
  var list = document.querySelector("[data-credits]");
  if (!list) return;

  fetch("assets/credits.json")
    .then(function (r) { return r.json(); })
    .then(function (credits) {
      var html = Object.keys(credits).map(function (id) {
        var c = credits[id];
        var creatorHTML = c.creator_url
          ? '<a href="' + c.creator_url + '" target="_blank" rel="noopener">' + (c.creator || "Autor desconocido") + "</a>"
          : (c.creator || "Autor desconocido");
        return "<li><strong>" + (c.title || id) + "</strong> — " + creatorHTML + " (" + c.source + ") · " +
          '<a href="' + c.license_url + '" target="_blank" rel="noopener">' + c.license.toUpperCase() + " " + (c.license_version || "") + "</a> · " +
          '<a href="' + c.foreign_landing_url + '" target="_blank" rel="noopener">Ver original ↗</a></li>';
      }).join("");
      list.innerHTML = html;
    })
    .catch(function () {
      list.innerHTML = "<li>No se pudieron cargar los créditos en este momento.</li>";
    });
})();
