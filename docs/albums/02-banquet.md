---
aside: false
pageClass: album-page
---

<!-- generated-gallery-album -->

<script setup lang="ts">
import { galleryAlbums } from "../.vitepress/data/gallery";

const album = galleryAlbums.find((item) => item.id === "02-banquet")!;
</script>

# {{ album.title }}

[Retour aux albums](/albums/)

{{ album.photos.length }} photos.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<GalleryGrid :photos="album.photos" />
