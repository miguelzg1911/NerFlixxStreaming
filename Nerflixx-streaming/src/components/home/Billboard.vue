<template>
  <div class="billboard" v-if="movie">
    <div class="inner-billboard">
      <img :src="displayImage" :alt="movie.title" class="hero-img" @error="handleImageError" />
      
      <div class="vignette"></div>
      <div class="bottom-gradient"></div>

      <div class="info-container">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-description">{{ movie.description || 'Sin descripción disponible.' }}</p>

        <div class="billboard-btns">
          <button class="play-btn" @click="$router.push(`/watch/${movie.id}`)">
            <i class="fas fa-play"></i> Reproducir
          </button>
          
          <button class="info-btn" @click="toggleFavorite">
            <i :class="isFavorite ? 'fas fa-check' : 'fas fa-plus'"></i>
            {{ isFavorite ? 'En Mi Lista' : 'Mi Lista' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Content } from '@/types/types';
import { myListService } from '@/services/myListService';

const props = defineProps<{ movie: Content }>();
const isFavorite = ref(false);
const profileId = localStorage.getItem('selectedProfileId') || '';

const fallbackImage = 'https://images.alphacoders.com/605/605492.jpg';
const displayImage = computed(() => props.movie.thumbnailUrl || fallbackImage);

const handleImageError = (e: Event) => {
  (e.target as HTMLImageElement).src = fallbackImage;
};

const toggleFavorite = async () => {
  if (!profileId || !props.movie) return;
  try {
    if (isFavorite.value) {
      await myListService.removeFromMyList(profileId, props.movie.id);
    } else {
      await myListService.addToMyList(profileId, props.movie.id);
    }
    isFavorite.value = !isFavorite.value;
  } catch (error) {
    console.error("Error al actualizar favoritos:", error);
  }
};

onMounted(async () => {
  if (profileId) {
    try {
      const list = await myListService.getMyList(profileId);
      isFavorite.value = list.some(item => item.id === props.movie.id);
    } catch (e) {
      console.warn("No se pudo verificar favoritos");
    }
  }
});
</script>

<style scoped>
.billboard {
  position: relative;
  height: 56.25vw;
  width: 100%;
  background: #000;
  overflow: hidden;
}

.inner-billboard {
  width: 100%;
  height: 100%;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(77deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
  z-index: 2;
}

.bottom-gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15vw;
  background: linear-gradient(to top, #141414, transparent);
  z-index: 3;
}

.info-container {
  position: absolute;
  top: 35%;
  left: 4%;
  width: 40%;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.movie-title {
  font-size: 4vw;
  font-weight: bold;
  color: white;
  margin-bottom: 1.2vw;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
}

.movie-description {
  color: white;
  font-size: 1.2vw;
  margin-bottom: 1.5vw;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.45);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.billboard-btns {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.8vw 2vw;
  border-radius: 4px;
  border: none;
  font-size: 1.1vw;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.8;
}

.play-btn {
  background: white;
  color: black;
}

.info-btn {
  background: rgba(109, 109, 110, 0.7);
  color: white;
}

@media (max-width: 768px) {
  .info-container { width: 80%; top: 25%; }
  .movie-title { font-size: 8vw; }
  .movie-description { font-size: 3vw; }
  button { font-size: 3vw; padding: 1.5vw 4vw; }
}
</style>