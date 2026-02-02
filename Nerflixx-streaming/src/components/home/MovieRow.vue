<template>
  <div class="movie-row" v-if="displayMovies.length > 0">
    <h2 class="row-title">{{ title }}</h2>
    <div class="row-container">
      <div class="slider">
        <div 
          v-for="movie in displayMovies" 
          :key="movie.id" 
          class="movie-card"
          @click="$router.push(`/watch/${movie.id}`)"
        >
          <img :src="movie.thumbnailUrl" :alt="movie.title" />
          <div class="movie-overlay">
            <p class="movie-card-title">{{ movie.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { contentService } from '@/services/contentService';
import type { Content } from '@/types/types';

const props = defineProps<{
  title: string;
  genre?: string;
  fetchType?: 'all' | 'genre' | 'trending';
  manualMovies?: Content[]; // Nueva prop para "Mi Lista"
}>();

const apiMovies = ref<Content[]>([]);

// Lógica inteligente: Si hay manualMovies, usa esos. Si no, usa los de la API.
const displayMovies = computed(() => {
  return props.manualMovies ? props.manualMovies : apiMovies.value;
});

onMounted(async () => {
  // Solo llamamos a la API si no recibimos películas manualmente
  if (!props.manualMovies && props.fetchType) {
    try {
      if (props.fetchType === 'trending') {
        apiMovies.value = await contentService.getTrending();
      } else if (props.fetchType === 'genre' && props.genre) {
        apiMovies.value = await contentService.getContentByGenre(props.genre);
      } else {
        apiMovies.value = await contentService.getAllContent();
      }
    } catch (error) {
      console.error(`Error en fila ${props.title}:`, error);
    }
  }
});
</script>

<style scoped>
/* Mantén tus estilos anteriores de .movie-row, .slider, etc. */
.movie-row { margin: 3vw 0; padding-left: 4%; }
.row-title { color: #e5e5e5; font-size: 1.4vw; font-weight: bold; margin-bottom: 0.5em; }
.row-container { overflow-x: scroll; scrollbar-width: none; }
.row-container::-webkit-scrollbar { display: none; }
.slider { display: flex; gap: 10px; }
.movie-card { min-width: 200px; width: 15vw; aspect-ratio: 16/9; cursor: pointer; transition: transform 0.3s; position: relative; }
.movie-card:hover { transform: scale(1.1); z-index: 10; }
.movie-card img { width: 100%; height: 100%; object-fit: cover; border-radius: 4px; }
.movie-overlay { position: absolute; bottom: 0; width: 100%; padding: 10px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); opacity: 0; transition: opacity 0.3s; }
.movie-card:hover .movie-overlay { opacity: 1; }
.movie-card-title { color: white; font-size: 0.8vw; }
</style>