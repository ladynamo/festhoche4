---
title: "Le concert de Lorkê Lorkê"
aside: false
pageClass: album-page
---

<!-- generated-gallery-album -->

<script setup lang="ts">
import { galleryAlbums } from "../.vitepress/data/gallery";

const album = galleryAlbums.find((item) => item.id === "09-concert-lorke-lorke")!;
</script>

# Le concert de Lorkê Lorkê

[Retour aux albums](/albums/)

{{ album.photos.length }} photos.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<GalleryGrid :photos="album.photos" />
