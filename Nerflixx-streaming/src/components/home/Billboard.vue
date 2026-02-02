<template>
  <div class="billboard" v-if="movie">
    <div class="inner-billboard">
      <img :src="movie.thumbnailUrl" :alt="movie.title" class="hero-img" />
      <div class="vignette"></div>
      <div class="bottom-vignette"></div>

      <div class="info-container">
        <h1 class="movie-title">{{ movie.title }}</h1>
        <p class="movie-description">{{ movie.description }}</p>

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
import { ref, onMounted } from 'vue';
import type { Content } from '@/types/types';
import { myListService } from '@/services/myListService';

const props = defineProps<{ movie: Content }>();
const isFavorite = ref(false);

// Obtenemos el perfil activo del localStorage
const profileId = localStorage.getItem('selectedProfileId') || '';

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

// Al montar, verificamos si esta película ya está en la lista (opcional según tu API)
onMounted(async () => {
  // Aquí podrías llamar a un endpoint de verificación si tu backend lo tiene
});
</script>

<style scoped>
/* (Mantiene los estilos que ya teníamos para el billboard) */
.billboard { position: relative; height: 56.25vw; width: 100%; background: #000; }
.hero-img { width: 100%; height: 100%; object-fit: cover; }
.info-container { position: absolute; top: 30%; left: 4%; width: 35%; z-index: 10; }
.movie-title { font-size: 4vw; color: white; margin-bottom: 1.2vw; }
.movie-description { color: white; font-size: 1.2vw; margin-bottom: 1.5vw; }
.billboard-btns { display: flex; gap: 1rem; }
button { padding: 0.8vw 2vw; border-radius: 4px; border: none; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 10px; }
.play-btn { background: white; color: black; }
.info-btn { background: rgba(109, 109, 110, 0.7); color: white; }
.vignette { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(77deg, rgba(0,0,0,0.6) 0, transparent 85%); }
.bottom-vignette { position: absolute; bottom: 0; width: 100%; height: 14.7vw; background: linear-gradient(to top, #141414, transparent); }
</style>