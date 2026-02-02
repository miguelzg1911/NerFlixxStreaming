<template>
  <div class="search-page">
    <NerNavbarPro />
    <div class="results-container">
      <h2 v-if="results.length > 0">Resultados para: {{ $route.query.q }}</h2>
      <h2 v-else>No encontramos coincidencias para "{{ $route.query.q }}"</h2>

      <div class="results-grid">
        <div 
          v-for="movie in results" 
          :key="movie.id" 
          class="result-card"
          @click="$router.push(`/watch/${movie.id}`)"
        >
          <img :src="movie.thumbnailUrl" />
          <p>{{ movie.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { contentService } from '@/services/contentService';
import type { Content } from '@/types/types';

const route = useRoute();
const results = ref<Content[]>([]);

const performSearch = async () => {
  const query = route.query.q as string;
  if (query) {
    results.value = await contentService.searchContent(query);
  }
};

// Observamos cambios en la URL para actualizar la búsqueda sin recargar la página
watch(() => route.query.q, performSearch);
onMounted(performSearch);
</script>

<style scoped>
.search-page { background: #141414; min-height: 100vh; padding-top: 100px; color: white; }
.results-container { padding: 0 4%; }
.results-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
  gap: 20px; 
  margin-top: 20px; 
}
.result-card img { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 4px; cursor: pointer; }
.result-card p { margin-top: 8px; font-size: 0.9rem; }
</style>