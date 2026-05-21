<script setup lang="ts">
import { onMounted } from "vue";
import {
  galleryDisplayMode,
  initGalleryDisplayMode,
  setGalleryDisplayMode,
  type GalleryDisplayMode
} from "../galleryDisplayMode";

const options: { value: GalleryDisplayMode; label: string }[] = [
  { value: "loose", label: "Libre" },
  { value: "grid", label: "Rangé" }
];

onMounted(() => {
  initGalleryDisplayMode();
});
</script>

<template>
  <div class="gallery-mode-switch" aria-label="Humeur d'affichage">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="{ active: galleryDisplayMode === option.value }"
      :aria-pressed="galleryDisplayMode === option.value"
      @click="setGalleryDisplayMode(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
