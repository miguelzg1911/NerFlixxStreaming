<template>
  <div class="home-wrapper">
    <NerNavbarPro />
    
    <Billboard v-if="featuredMovie" :movie="featuredMovie" />
    
    <main class="content-area">
      <MovieRow title="Tendencias" fetchType="trending" />
      <MovieRow title="Acción" fetchType="genre" genre="Action" />
      <MovieRow title="Comedia" fetchType="genre" genre="Comedy" />
    </main>

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
    const trendingData = await contentService.getTrending();
    if (Array.isArray(trendingData) && trendingData.length > 0) {
      featuredMovie.value = trendingData[0] as Content;
    }

    if (profileId) {
      myList.value = await myListService.getMyList(profileId);
    }
  } catch (error) {
    console.error("Error al cargar el Home:", error);
  }
});
</script>

<style scoped>
.home-wrapper {
  background-color: #141414;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-area {
  flex: 1;
  padding-top: 70px; 
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>