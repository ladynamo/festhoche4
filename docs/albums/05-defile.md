---
title: "Le défilé de Slow Fashion"
aside: false
pageClass: album-page
---

<!-- generated-gallery-album -->

<script setup lang="ts">
import { galleryAlbums } from "../.vitepress/data/gallery";

const album = galleryAlbums.find((item) => item.id === "05-defile")!;
</script>

# Le défilé de Slow Fashion
<p>{{ album.description }}</p>

[Retour aux albums](/albums/)

{{ album.photos.length }} photos.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<GalleryGrid :photos="album.photos" />
