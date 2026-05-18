<script setup lang="ts">
import { withBase } from "vitepress";
import { galleryAlbums } from "../.vitepress/data/gallery";
</script>

# Albums

{{ galleryAlbums.length }} albums.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<div class="album-shortcuts">
  <a v-for="album in galleryAlbums" :key="album.id" :href="withBase(`/albums/${album.id}`)">
    <img :src="withBase(album.photos[0].thumb)" :alt="album.title" loading="lazy" decoding="async" />
    <span>{{ album.title }}</span>
    <small>{{ album.photos.length }} photos</small>
  </a>
</div>
