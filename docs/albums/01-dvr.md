---
title: "Disco-Vélo-Roller"
aside: false
pageClass: album-page
---

<!-- generated-gallery-album -->

<script setup lang="ts">
import { galleryAlbums } from "../.vitepress/data/gallery";

const album = galleryAlbums.find((item) => item.id === "01-dvr")!;
</script>

# Disco-Vélo-Roller

[Retour aux albums](/albums/)

{{ album.photos.length }} photos.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<GalleryGrid :photos="album.photos" />
