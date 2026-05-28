import { defineConfig } from "vitepress";
import { galleryAlbums } from "./data/gallery";

const albumNavItems = galleryAlbums.map((album) => ({
  text: album.title,
  link: `/albums/${album.id}`
}));

const siteBase = "/festhoche4/";

export default defineConfig({
  title: "Fest'Hoche #4",
  description: "La galerie photo du Fest'Hoche #4",
  base: siteBase,
  lang: "fr-FR",
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Galerie", link: "/" },
      {
        text: "Albums",
        items: [{ text: "Tous les albums", link: "/albums/" }, ...albumNavItems]
      }
    ],
    outline: false
  },
  head: [
    ["link", { rel: "icon", type: "image/png", href: `${siteBase}logo.png` }],
    [
      "link",
      { rel: "shortcut icon", type: "image/png", href: `${siteBase}logo.png` }
    ],
    ["meta", { property: "og:title", content: "Fest'Hoche #4" }],
    [
      "meta",
      {
        property: "og:description",
        content: "La galerie photo du Fest'Hoche #4"
      }
    ],
    ["meta", { name: "theme-color", content: "#171717" }]
  ]
});
