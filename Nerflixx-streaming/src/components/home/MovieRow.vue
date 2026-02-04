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
          <img 
            :src="movie.thumbnailUrl || '/placeholder-movie.jpg'" 
            :alt="movie.title"
            @error="handleImageError"
          />
          
          <div class="movie-overlay">
            <div class="overlay-info">
              <p class="movie-card-title">{{ movie.title }}</p>
              <div class="card-icons">
                <i class="fas fa-play-circle"></i>
                <i class="fas fa-plus-circle"></i>
              </div>
            </div>
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
  manualMovies?: Content[];
}>();

const apiMovies = ref<Content[]>([]);
const loading = ref(true);

const displayMovies = computed(() => {
  return props.manualMovies ? props.manualMovies : apiMovies.value;
});

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';
};

onMounted(async () => {
  try {
    loading.value = true;
    let data;

    if (props.fetchType === 'trending') {
      data = await contentService.getTrending();
    } else if (props.fetchType === 'genre' && props.genre) {
      data = await contentService.getContentByGenre(props.genre); 
    } else {
      data = await contentService.getAllContent();
    }

    apiMovies.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Error en MovieRow (${props.title}):`, error);
    apiMovies.value = []; 
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.movie-row {
  margin: 1vw 0;
  padding-left: 4%;
  overflow: visible; 
}

.row-title {
  color: #e5e5e5;
  font-size: 1.4vw;
  font-weight: bold;
  margin-bottom: 0.8em;
  transition: color 0.3s;
}

.row-title:hover {
  color: white;
}

.row-container {
  overflow-x: auto;
  overflow-y: visible;
  padding: 1.5vw 0;
  scrollbar-width: none;
}

.row-container::-webkit-scrollbar {
  display: none;
}

.slider {
  display: flex;
  gap: 8px;
}

.movie-card {
  flex: 0 0 auto;
  width: 18vw;
  min-width: 160px;
  aspect-ratio: 16/9;
  cursor: pointer;
  transition: transform 0.4s ease, z-index 0.4s;
  position: relative;
  border-radius: 4px;
}

.movie-card:hover {
  transform: scale(1.3);
  z-index: 50;
}

.movie-card:first-child:hover { transform: scale(1.3) translateX(10%); }

.movie-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.movie-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  border-radius: 4px;
}

.movie-card:hover .movie-overlay {
  opacity: 1;
}

.overlay-info {
  padding: 10px;
  width: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
}

.movie-card-title {
  color: white;
  font-size: 0.9vw;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-icons {
  display: flex;
  gap: 10px;
  color: white;
  font-size: 1.2vw;
}

@media (max-width: 768px) {
  .movie-card { width: 40vw; }
  .movie-card-title { font-size: 3vw; }
  .row-title { font-size: 4vw; }
}
</style>