<!-- generated-gallery-album -->

<script setup lang="ts">
import { galleryAlbums } from "../.vitepress/data/gallery";

const album = galleryAlbums.find((item) => item.id === "04-ateliers-animations-ambiance")!;
</script>

# {{ album.title }}

[Retour aux albums](/albums/)

{{ album.photos.length }} photos.

<GalleryGrid :photos="album.photos" />
