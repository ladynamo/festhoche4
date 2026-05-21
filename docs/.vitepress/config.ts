import { defineConfig } from "vitepress";
import { galleryAlbums } from "./data/gallery";

const albumNavItems = galleryAlbums.map((album) => ({
  text: album.title,
  link: `/albums/${album.id}`
}));

export default defineConfig({
  title: "Fest'Hoche #4",
  description: "Chronologie photo du Fest'Hoche #4",
  base: "/festhoche4/",
  lang: "fr-FR",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Chronologie", link: "/" },
      {
        text: "Albums",
        items: [{ text: "Tous les albums", link: "/albums/" }, ...albumNavItems]
      }
    ],
    footer: {
      message: "Fest'Hoche #4",
      copyright: `Copyright (c) ${new Date().getFullYear()}`
    },
    outline: false
  },
  head: [
    ["meta", { property: "og:title", content: "Fest'Hoche #4" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Chronologie photo du Fest'Hoche #4"
      }
    ],
    ["meta", { name: "theme-color", content: "#171717" }]
  ]
});
