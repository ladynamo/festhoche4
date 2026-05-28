<script setup lang="ts">
import { withBase } from "vitepress";

type Organizer = {
  id: string;
  name: string;
  logo: string;
  instagram: string;
  facebook: string;
  email: string;
};

const organizers: Organizer[] = [
  {
    id: "la-dynamo",
    name: "La Dynamo",
    logo: "/organizers/logo-la-dynamo.png",
    instagram: "https://www.instagram.com/ladynamo.asso/",
    facebook: "https://www.facebook.com/ASSOCIATIONLADYNAMO/",
    email: "ladynamo.asso@gmail.com"
  },
  {
    id: "musight-club",
    name: "Musight Club",
    logo: "/organizers/logo-musight-club.png",
    instagram: "https://www.instagram.com/musightclub/",
    facebook: "https://www.facebook.com/MusightClub/",
    email: "musightclub@gmail.com"
  },
  {
    id: "le-label",
    name: "Le Label",
    logo: "/organizers/logo-le-label.png",
    instagram: "https://www.instagram.com/lelabelrecords/",
    facebook: "https://www.facebook.com/le.label.records/",
    email: "le.label.contact@gmail.com"
  }
];
</script>

<template>
  <footer class="organizer-footer" aria-labelledby="organizer-footer-title">
    <div class="organizer-footer-inner">
      <h2 id="organizer-footer-title">Les organisateurs</h2>
      <div class="organizer-footer-grid">
        <section
          v-for="organizer in organizers"
          :key="organizer.name"
          class="organizer-card"
          :aria-labelledby="`${organizer.id}-title`"
        >
          <img
            :src="withBase(organizer.logo)"
            :alt="`Logo ${organizer.name}`"
          />
          <h3 :id="`${organizer.id}-title`">{{ organizer.name }}</h3>
          <nav
            class="organizer-links"
            :aria-label="`Contacts ${organizer.name}`"
          >
            <a
              :href="organizer.instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              :href="organizer.facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a :href="`mailto:${organizer.email}`">{{ organizer.email }}</a>
          </nav>
        </section>
      </div>
    </div>
  </footer>
</template>
