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
});
