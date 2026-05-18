import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Fest'Hoche #4",
  description: "Galerie photos du Fest'Hoche #4",
  base: "/FestHoche4Gallery/",
  lang: "fr-FR",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.svg",
    nav: [
      { text: "Galerie", link: "/" },
      { text: "Albums", link: "/albums/" }
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/" }],
    footer: {
      message: "Fest'Hoche #4",
      copyright: `Copyright (c) ${new Date().getFullYear()}`
    },
    search: {
      provider: "local"
    }
  },
  head: [
    ["meta", { property: "og:title", content: "Fest'Hoche #4" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Galerie photos du Fest'Hoche #4"
      }
    ],
    ["meta", { name: "theme-color", content: "#171717" }]
  ]
});
