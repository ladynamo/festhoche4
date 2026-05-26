---
layout: home

hero:
  name: "Fest'Hoche #4"
  text: "La galerie photo du festival"
  tagline: "Les meilleurs moments du festival, prêts à être parcourus en plein écran."
  actions:
    - theme: brand
      text: Voir la galerie
      link: "#gallery"
    - theme: alt
      text: Albums
      link: "/albums/"
---

<script setup lang="ts">
import { withBase } from "vitepress";
import { galleryAlbums, galleryPhotos } from "./.vitepress/data/gallery";

const photographerLinks = {
  website: "https://alicjapakulska.myportfolio.com/",
  instagram: "https://www.instagram.com/li_cya/",
  facebook: "https://www.facebook.com/alicja.pakulska"
};
</script>

## La photographe

<section class="photographer-profile">
  <img :src="withBase('/photographers/alicja.jpg')" alt="Alicja Pakulska" loading="lazy" decoding="async" />
  <div>
    <h3>Alicja Pakulska</h3>
    <p>La photographe du Fest'Hoche #4.</p>
    <nav class="photographer-links" aria-label="Liens d'Alicja Pakulska">
      <a :href="photographerLinks.website" target="_blank" rel="noopener noreferrer">Site web</a>
      <a :href="photographerLinks.instagram" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a :href="photographerLinks.facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
    </nav>
  </div>
</section>

## Les albums {#gallery}

{{ galleryPhotos.length }} photos reparties en {{ galleryAlbums.length }} albums.

<p class="photo-credit">Photos : Alicja Pakulska</p>

<div class="album-shortcuts">
  <a v-for="album in galleryAlbums" :key="album.id" :href="withBase(`/albums/${album.id}`)">
    <img :src="withBase(album.photos[0].thumb)" :alt="album.title" loading="lazy" decoding="async" />
    <span>{{ album.title }}</span>
    <small>{{ album.photos.length }} photos</small>
  </a>
</div>
<hr/>

### La chronologie de la journée
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
