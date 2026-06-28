/* =====================================================================
   Dalley Law Firm — English ↔ Spanish page map (i18n-map.js)
   --------------------------------------------------------------------
   The language-switch buttons in each page's header have their `href`
   HARDCODED at build time (so the site works with JavaScript disabled).
   This file is a reference + a defensive enhancer: it re-confirms the
   switcher href matches the page you are actually on. Safe to ignore
   if JS is unavailable.

   Keep this map in sync whenever pages are added or renamed.
   ===================================================================== */
window.DALLEY_I18N_MAP = {
  "/index.html":                 { en: "/en/index.html",                       es: "/es/index.html" },
  "/en/index.html":              { en: "/en/index.html",                       es: "/es/index.html" },
  "/en/services-persons.html":   { en: "/en/services-persons.html",             es: "/es/servicios-personas.html" },
  "/en/services-business.html":  { en: "/en/services-business.html",           es: "/es/servicios-negocios.html" },
  "/en/contact.html":            { en: "/en/contact.html",                      es: "/es/contacto.html" },
  "/en/persons/housing.html":         { en: "/en/persons/housing.html",         es: "/es/personas/vivienda.html" },
  "/en/persons/bankruptcy.html":      { en: "/en/persons/bankruptcy.html",      es: "/es/personas/bancarrota.html" },
  "/en/persons/criminal.html":        { en: "/en/persons/criminal.html",        es: "/es/personas/criminal.html" },
  "/en/persons/disputes.html":        { en: "/en/persons/disputes.html",        es: "/es/personas/disputas.html" },
  "/en/persons/divorce.html":         { en: "/en/persons/divorce.html",         es: "/es/personas/divorcio.html" },
  "/en/persons/family.html":          { en: "/en/persons/family.html",          es: "/es/personas/familia.html" },
  "/en/persons/immigration.html":     { en: "/en/persons/immigration.html",     es: "/es/personas/inmigracion.html" },
  "/en/persons/estates-wills.html":   { en: "/en/persons/estates-wills.html",   es: "/es/personas/patrimonios-testamentos.html" },
  "/en/business/creation.html":            { en: "/en/business/creation.html",            es: "/es/negocios/creacion.html" },
  "/en/business/lease-reviews.html":       { en: "/en/business/lease-reviews.html",       es: "/es/negocios/revision-arrendamientos.html" },
  "/en/business/buying-business.html":     { en: "/en/business/buying-business.html",     es: "/es/negocios/compra-negocio.html" },
  "/en/business/accounting-finance.html":  { en: "/en/business/accounting-finance.html",  es: "/es/negocios/contabilidad-finanzas.html" },
  "/en/business/contracts.html":           { en: "/en/business/contracts.html",           es: "/es/negocios/contratos.html" },
  "/en/business/commercial-disputes.html": { en: "/en/business/commercial-disputes.html", es: "/es/negocios/disputas-comerciales.html" },
  "/en/business/intellectual-property.html": { en: "/en/business/intellectual-property.html", es: "/es/negocios/propiedad-intelectual.html" },
  "/en/business/selling-business.html":    { en: "/en/business/selling-business.html",    es: "/es/negocios/venta-negocio.html" }
};

/* keys for the spanish side are auto-resolved below */
window.DALLEY_I18N_RESOLVE = function (path) {
  var map = window.DALLEY_I18N_MAP;
  var key = path.replace(/\/+/, "/").replace(/\/$/, "");
  if (key === "") key = "/index.html";
  /* find by current page (normalize) */
  var entry = map[key];
  if (!entry) {
    /* try to derive: search any value whose en/es matches path */
    for (var k in map) {
      if (map[k].en === key || map[k].es === key) { entry = map[key] = map[k]; break; }
    }
  }
  return entry || null;
};