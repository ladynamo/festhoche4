import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Fest'Hoche #4",
  description: "Galerie photos du Fest'Hoche #4",
  base: "/festhoche4/",
  lang: "fr-FR",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Galerie", link: "/" },
      { text: "Albums", link: "/albums/" }
    ],
    footer: {
      message: "Fest'Hoche #4",
      copyright: `Copyright (c) ${new Date().getFullYear()}`
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
