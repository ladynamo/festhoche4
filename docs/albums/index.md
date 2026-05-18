<script setup lang="ts">
import { galleryAlbums } from '../.vitepress/data/gallery'
</script>

# Albums

<section v-for="album in galleryAlbums" :key="album.id" :id="album.id" class="album-section">
  <h2>{{ album.title }}</h2>
  <p>{{ album.photos.length }} photos</p>
  <GalleryGrid :photos="album.photos" />
</section>
