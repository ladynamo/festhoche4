---
layout: home

hero:
  name: "Fest'Hoche #4"
  text: "Galerie photos"
  tagline: "Les meilleurs moments du festival, prêts à être parcourus en plein écran."
  actions:
    - theme: brand
      text: Voir la galerie
      link: '#galerie'
    - theme: alt
      text: Albums
      link: '/albums/'
---

<script setup lang="ts">
import { withBase } from 'vitepress';
import { galleryAlbums, galleryPhotos } from './.vitepress/data/gallery'
</script>

## Galerie {#galerie}

{{ galleryPhotos.length }} photos reparties en {{ galleryAlbums.length }} albums.

<div class="album-shortcuts">
  <a v-for="album in galleryAlbums" :key="album.id" :href="withBase(`/albums/#${album.id}`)">
    <img :src="withBase(album.photos[0].thumb)" :alt="album.title" loading="lazy" decoding="async" />
    <span>{{ album.title }}</span>
    <small>{{ album.photos.length }} photos</small>
  </a>
</div>

<GalleryGrid :photos="galleryPhotos" />
