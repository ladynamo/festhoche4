import { ref } from "vue";

export type GalleryDisplayMode = "loose" | "grid";

const storageKey = "festhoche-gallery-display-mode";
const modes = new Set<GalleryDisplayMode>(["loose", "grid"]);

export const galleryDisplayMode = ref<GalleryDisplayMode>("loose");

export function initGalleryDisplayMode() {
  if (typeof window === "undefined") {
    return;
  }

  const savedMode = window.localStorage.getItem(storageKey);

  if (modes.has(savedMode as GalleryDisplayMode)) {
    galleryDisplayMode.value = savedMode as GalleryDisplayMode;
  }
}

export function setGalleryDisplayMode(mode: GalleryDisplayMode) {
  galleryDisplayMode.value = mode;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey, mode);
  }
}
