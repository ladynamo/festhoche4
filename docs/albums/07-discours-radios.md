---
title: "Discours et radios"
aside: false
pageClass: album-page
---

<!-- generated-gallery-album -->

<script setup lang="ts">
import { galleryAlbums } from "../.vitepress/data/gallery";

const album = galleryAlbums.find((item) => item.id === "07-discours-radios")!;
</script>

# Discours et radios

[Retour aux albums](/albums/)

{{ album.photos.length }} photos.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<GalleryGrid :photos="album.photos" />
