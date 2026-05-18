import DefaultTheme from "vitepress/theme";
import GalleryGrid from "./components/GalleryGrid.vue";
import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("GalleryGrid", GalleryGrid);
  }
};
