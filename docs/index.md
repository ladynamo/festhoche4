---
layout: home

hero:
  name: "Fest'Hoche #4"
  text: "Chronologie"
  tagline: "Les meilleurs moments du festival, prêts à être parcourus en plein écran."
  actions:
    - theme: brand
      text: Voir la chronologie
      link: "#chronologie"
    - theme: alt
      text: Albums
      link: "/albums/"
---

<script setup lang="ts">
import { withBase } from "vitepress";
import { galleryAlbums, galleryPhotos } from "./.vitepress/data/gallery";
</script>

## Chronologie {#chronologie}

{{ galleryPhotos.length }} photos reparties en {{ galleryAlbums.length }} albums.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<div class="album-shortcuts">
  <a v-for="album in galleryAlbums" :key="album.id" :href="withBase(`/albums/${album.id}`)">
    <img :src="withBase(album.photos[0].thumb)" :alt="album.title" loading="lazy" decoding="async" />
    <span>{{ album.title }}</span>
    <small>{{ album.photos.length }} photos</small>
  </a>
</div>

<section v-for="album in galleryAlbums" :id="album.id" :key="album.id" class="timeline-album">
  <header class="timeline-album-heading">
    <p v-if="album.timeRange" class="timeline-album-time">{{ album.timeRange }}</p>
    <h3>{{ album.title }}</h3>
    <p v-if="album.description" class="timeline-album-description">
      {{ album.description }}
    </p>
  </header>

  <GalleryGrid :photos="album.photos" />
</section>
