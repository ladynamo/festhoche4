---
layout: home

hero:
  name: "Fest'Hoche #4"
  text: "Galerie photos"
  tagline: "Les meilleurs moments du festival, prets a etre parcourus en plein ecran."
  actions:
    - theme: brand
      text: Voir la galerie
      link: '#galerie'
    - theme: alt
      text: Albums
      link: '/albums/'
---

<script setup lang="ts">
const photos = [
  {
    src: '/photos/festhoche-01.svg',
    title: 'Ouverture',
    description: 'Ambiance de lancement'
  },
  {
    src: '/photos/festhoche-02.svg',
    title: 'Scene',
    description: 'Concerts et performances'
  },
  {
    src: '/photos/festhoche-03.svg',
    title: 'Public',
    description: 'Moments partages'
  },
  {
    src: '/photos/festhoche-04.svg',
    title: 'Coulisses',
    description: 'Preparation et benevoles'
  }
]
</script>

## Galerie {#galerie}

Remplacez les visuels de demonstration dans `docs/public/photos` par les photos definitives, puis mettez a jour la liste `photos` dans cette page.

<GalleryGrid :photos="photos" />
