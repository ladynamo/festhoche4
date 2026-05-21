<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { withBase } from "vitepress";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

type Photo = {
  src: string;
  thumb?: string;
  title: string;
  description?: string;
};

const props = defineProps<{
  photos: Photo[];
}>();

const root = ref<HTMLElement | null>(null);
let gallery: { destroy: () => void; refresh?: () => void } | null = null;
const photoCredit = "Photo : Alicja Pakulska";
const masonryColumnCount = ref(4);

const masonryColumns = computed(() =>
  Array.from({ length: masonryColumnCount.value }, (_, columnIndex) =>
    props.photos.filter((_, photoIndex) => photoIndex % masonryColumnCount.value === columnIndex)
  ).filter((column) => column.length > 0)
);

function assetUrl(path: string) {
  return /^https?:\/\//.test(path) ? path : withBase(path);
}

function caption(photo: Photo) {
  const description = photo.description ? `<p>${photo.description}</p>` : "";

  return `<h4>${photo.title}</h4>${description}<p>${photoCredit}</p>`;
}

function updateMasonryColumnCount() {
  masonryColumnCount.value = window.matchMedia("(max-width: 640px)").matches ? 2 : 4;
}

watch(masonryColumnCount, async () => {
  await nextTick();
  gallery?.refresh?.();
});

onMounted(async () => {
  updateMasonryColumnCount();
  window.addEventListener("resize", updateMasonryColumnCount);

  await nextTick();

  if (!root.value || props.photos.length === 0) {
    return;
  }

  const [
    { default: lightGallery },
    { default: lgThumbnail },
    { default: lgZoom }
  ] = await Promise.all([
    import("lightgallery"),
    import("lightgallery/plugins/thumbnail"),
    import("lightgallery/plugins/zoom")
  ]);

  gallery = lightGallery(root.value, {
    selector: ".gallery-card",
    plugins: [lgThumbnail, lgZoom],
    speed: 300,
    download: false,
    counter: true,
    thumbnail: true,
    licenseKey: "0000-0000-000-0000"
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateMasonryColumnCount);
  gallery?.destroy();
  gallery = null;
});
</script>

<template>
  <div v-if="photos.length" ref="root" class="gallery-grid">
    <div
      v-for="(column, columnIndex) in masonryColumns"
      :key="columnIndex"
      class="gallery-column"
      :class="`gallery-column-${columnIndex + 1}`"
    >
      <a
        v-for="photo in column"
        :key="photo.src"
        class="gallery-card"
        :href="assetUrl(photo.src)"
        :data-src="assetUrl(photo.src)"
        :data-sub-html="caption(photo)"
        :aria-label="`Ouvrir ${photo.title}`"
      >
        <img
          :src="assetUrl(photo.thumb || photo.src)"
          :alt="photo.title"
          loading="lazy"
          decoding="async"
        />
        <span>
          <small v-if="photo.description"></small>
        </span>
      </a>
    </div>
  </div>
  <p v-else class="empty-gallery">
    Cette galerie est vide...
  </p>
</template>
