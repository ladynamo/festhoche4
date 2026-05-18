<!-- generated-gallery-album -->

<script setup lang="ts">
import { galleryAlbums } from "../.vitepress/data/gallery";

const album = galleryAlbums.find((item) => item.id === "04-ateliers-animations-ambiance")!;
</script>

# {{ album.title }}

[Retour aux albums](/albums/)

{{ album.photos.length }} photos.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<GalleryGrid :photos="album.photos" />

