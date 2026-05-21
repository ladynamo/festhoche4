import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import GalleryModeSwitch from "./components/GalleryModeSwitch.vue";
import GalleryGrid from "./components/GalleryGrid.vue";
import "./styles.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () => h(GalleryModeSwitch)
    });
  },
  enhanceApp({ app }) {
    app.component("GalleryGrid", GalleryGrid);
  }
};
