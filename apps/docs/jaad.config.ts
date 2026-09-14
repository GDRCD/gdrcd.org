import { defineJaadConfig } from "@lancher-dev/jaad";

const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css2" +
  "?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400" +
  "&family=JetBrains+Mono:wght@400;600" +
  "&display=swap";

export default defineJaadConfig({
  title: "GDRCD",
  lang: "it",
  logo: "/brand/gdrcd-wordmark.png",

  social: { github: "https://github.com/GDRCD/GDRCD" },

  theme: { light: "vitesse-light", dark: "vitesse-dark" },

  head: [
    {
      tag: "link",
      attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
    },
    {
      tag: "link",
      attrs: {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: "anonymous",
      },
    },
    { tag: "link", attrs: { rel: "stylesheet", href: GOOGLE_FONTS } },
  ],

  ui: {
    it: {
      "breadcrumb.label": "Percorso di navigazione",
      "breadcrumb.root": "Documentazione",
      home: "Home",
      "locale.change": "Cambia lingua",
      "nav.documentation": "Navigazione della documentazione",
      "nav.jumpToSection": "Vai alla sezione…",
      "nav.mobile": "Apri o chiudi il menu",
      "nav.page": "Navigazione tra le pagine",
      "nav.selectPage": "Seleziona una pagina",
      "page.copied": "Copiata!",
      "page.copy": "Copia",
      "page.edit": "Modifica",
      "page.lastUpdated": "Ultimo aggiornamento il",
      scrollTop: "Torna in cima",
      "search.close": "chiudi",
      "search.empty": "Nessun risultato per",
      "search.label": "Cerca nella documentazione",
      "search.loading": "Caricamento…",
      "search.navigate": "naviga",
      "search.open": "apri",
      "search.placeholder": "Cerca nella documentazione…",
      "search.results": "Risultati della ricerca",
      "search.trigger": "Cerca…",
      "theme.toggle": "Cambia modalità",
      "toc.label": "Indice dei contenuti",
      "toc.title": "In questa pagina",
    },
  },
});
