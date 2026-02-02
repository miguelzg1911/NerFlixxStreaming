<template>
  <div class="watch-container">
    <nav :class="['watch-nav', { 'nav-hidden': !showControls }]">
      <div class="back-button" @click="$router.push('/')">
        <i class="fas fa-arrow-left"></i>
      </div>
      <div class="movie-info" v-if="movie"> <span>Estás viendo:</span>
        <h3>{{ movie.title }}</h3>
      </div>
    </nav>

    <video 
      v-if="movie"
      class="video-player"
      controls
      autoplay
      :src="movie.urlVideo"
      @mousemove="resetTimer"
    >
      Tu navegador no soporta el elemento de video.
    </video>

    <div v-else class="loading-screen">
      <div class="spinner"></div>
      <p>Cargando contenido...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { contentService } from '@/services/contentService';
import type { Content } from '@/types/types';

const route = useRoute();
const movie = ref<Content | null>(null);
const showControls = ref(true);
let timer: any = null;

const resetTimer = () => {
  showControls.value = true;
  clearTimeout(timer);
  timer = setTimeout(() => {
    showControls.value = false;
  }, 3000);
};

onMounted(async () => {
  const id = route.params.id as string;
  try {
    movie.value = await contentService.getContentById(id);
    resetTimer();
  } catch (error) {
    console.error("Error al cargar el video:", error);
  }
});

onUnmounted(() => {
  clearTimeout(timer);
});
</script>

<style scoped>
.watch-container {
    background-color: black;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: relative;
}

.video-player {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.watch-nav {
    position: absolute;
    top: 0;
    width: 100%;
    padding: 40px;
    display: flex;
    align-items: center;
    gap: 30px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
    z-index: 10;
    color: white;
    transition: opacity 0.5s ease;
}

.nav-hidden {
    opacity: 0;
    cursor: none;
}

.back-button {
    font-size: 2.5rem;
    cursor: pointer;
    transition: transform 0.2s;
}

.back-button:hover { 
    transform: scale(1.2); 
}

.movie-info h3 { 
    font-size: 1.5rem; 
    margin-top: 5px; 
}

.loading-screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
}

.spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid var(--nerflixx-red);
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>