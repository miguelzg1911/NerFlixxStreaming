<template>
  <div class="home-container">
    <NerNavbarPro />
    
    <Billboard v-if="featuredMovie" :movie="featuredMovie" />

    <section class="content-rows">
      <MovieRow 
        v-if="myList.length > 0" 
        title="Mi Lista" 
        :manualMovies="myList" 
      />

      <MovieRow title="Tendencias" fetchType="trending" />
      <MovieRow title="Acción" fetchType="genre" genre="Action" />
      <MovieRow title="Comedia" fetchType="genre" genre="Comedy" />
    </section>

    <NerFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NerNavbarPro from '@/components/common/NerNavbar.vue';
import Billboard from '@/components/home/Billboard.vue';
import MovieRow from '@/components/home/MovieRow.vue';
import NerFooter from '@/components/common/NerFooter.vue';
import { contentService } from '@/services/contentService';
import { myListService } from '@/services/myListService';
import type { Content } from '@/types/types';

const featuredMovie = ref<Content | null>(null);
const myList = ref<Content[]>([]);
const profileId = localStorage.getItem('selectedProfileId') || '';

onMounted(async () => {
  try {
    // 1. Cargar tendencias para el Billboard
    const trending = await contentService.getTrending();
    if (trending.length > 0) {
      featuredMovie.value = trending[0] as Content;
    }

    // 2. Cargar Mi Lista si hay un perfil activo
    if (profileId) {
      myList.value = await myListService.getMyList(profileId);
    }
  } catch (error) {
    console.error("Error al cargar el Home:", error);
  }
});
</script>

<style scoped>
.home-container { background-color: #141414; min-height: 100vh; }
.content-rows { margin-top: -8vw; position: relative; z-index: 20; padding-bottom: 40px; }
</style>