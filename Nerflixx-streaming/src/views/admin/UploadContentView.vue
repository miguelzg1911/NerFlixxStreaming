<template>
  <div class="upload-container">
    <div class="header-actions">
      <button class="back-btn" @click="$router.push('/admin')">
        <i class="fas fa-arrow-left"></i> Volver al Panel
      </button>
      <h2 class="section-title">Subir Nuevo Contenido</h2>
    </div>

    <div class="upload-grid">
      <div class="upload-section">
        <h3 class="subsection-title">Multimedia</h3>
        
        <div 
          class="preview-box" 
          :style="{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }"
        >
          <span v-if="!imagePreview">Vista previa de miniatura (16:9)</span>
        </div>
        
        <label class="custom-file-upload">
          <input type="file" @change="handleFileChange" accept="image/*" />
          <i class="fas fa-image"></i> {{ selectedFile ? 'Cambiar Imagen' : 'Seleccionar Miniatura' }}
        </label>

        <div class="input-group-spacing">
          <label class="input-label">URL del Video (Vimeo / Directo)</label>
          <input 
            v-model="form.urlVideo" 
            placeholder="Ej: https://vimeo.com/835413342" 
            class="ner-input-dark" 
          />
        </div>
      </div>

      <div class="upload-section">
        <h3 class="subsection-title">Información General</h3>
        
        <div class="form-group">
          <label class="input-label">Título</label>
          <input v-model="form.title" placeholder="Ej: El Camino" class="ner-input-dark" />
        </div>
        
        <div class="form-group">
          <label class="input-label">Descripción</label>
          <textarea 
            v-model="form.description" 
            placeholder="Escribe una breve sinopsis..." 
            class="ner-textarea"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label class="input-label">Año de Estreno</label>
            <input type="number" v-model="form.releaseYear" class="ner-input-dark" />
          </div>
          
          <div class="input-group">
            <label class="input-label">Tipo de Contenido</label>
            <select v-model.number="form.contentType" class="ner-select">
              <option :value="0">🎬 Película</option>
              <option :value="1">📺 Serie</option>
            </select>
          </div>
        </div>

        <div class="genres-container">
          <h4 class="input-label">Géneros</h4>
          <div class="genres-grid">
            <label v-for="g in availableGenres" :key="g" class="genre-chip">
              <input type="checkbox" :value="g" v-model="selectedGenres" />
              <span class="chip-text">{{ g }}</span>
            </label>
          </div>
        </div>

        <button 
          @click="handleUpload" 
          class="submit-btn" 
          :disabled="loading"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          {{ loading ? 'SUBIENDO...' : 'PUBLICAR EN CATÁLOGO' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { adminService } from '@/services/adminService';

const router = useRouter();
const loading = ref(false);
const selectedFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

const availableGenres = [
  'Acción', 'Aventura', 'Ciencia Ficción', 'Comedia', 'Drama', 
  'Terror', 'Suspenso', 'Fantasía', 'Documental', 'Animación', 
  'Crimen', 'Misterio', 'Romance'
];
const selectedGenres = ref<string[]>([]);

const form = ref({
  title: '',
  description: '',
  releaseYear: 2026,
  contentType: 0,
  urlVideo: ''
});

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleUpload = async () => {
  if (!form.value.title || !selectedFile.value || selectedGenres.value.length === 0) {
    alert("Completa título, imagen y al menos un género.");
    return;
  }

  loading.value = true;
  const data = new FormData();

  data.append('Title', form.value.title);
  data.append('Description', form.value.description);
  data.append('ReleaseYear', form.value.releaseYear.toString());
  data.append('ContentType', form.value.contentType.toString());
  data.append('UrlVideo', form.value.urlVideo);
  data.append('ImageFile', selectedFile.value);

  selectedGenres.value.forEach(genre => {
    data.append('Genres', genre);
  });

  try {
    await adminService.createContent(data);
    alert("¡Contenido publicado con éxito!");
    router.push('/admin'); 
  } catch (error) {
    console.error("Error en la subida:", error);
    alert("Error al subir. Verifica que los géneros existan en la DB.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.upload-container { 
  background-color: #141414; 
  min-height: 100vh; 
  padding: 100px 4% 40px; 
  color: white; 
}

.header-actions { 
  display: flex; 
  align-items: center; 
  gap: 20px; 
  margin-bottom: 30px; 
}

.back-btn { 
  background: transparent; 
  border: 1px solid #444; 
  color: white; 
  padding: 8px 16px; 
  cursor: pointer; 
  border-radius: 4px; 
}

.upload-grid {
  display: grid; 
  grid-template-columns: 1fr 1.5fr; 
  gap: 40px; 
}

.upload-section { 
  background-color: #181818; 
  padding: 30px; 
  border-radius: 8px; 
}

.preview-box { 
  width: 100%; 
  aspect-ratio: 16/9; 
  background-color: #222; 
  background-size: cover; 
  background-position: center; 
  border: 2px dashed #444; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  margin-bottom: 15px; 
}

.custom-file-upload { 
  display: block; 
  text-align: center; 
  background: #e50914; 
  padding: 12px; 
  border-radius: 4px; 
  cursor: pointer; 
  font-weight: bold; 
}

.custom-file-upload input { 
  display: none; 
}

.ner-input-dark, .ner-select, .ner-textarea { 
  width: 100%; 
  background: #2f2f2f; 
  border: 1px solid #444; 
  color: white; 
  padding: 12px; 
  border-radius: 4px;
  margin-bottom: 20px; 
}

.form-row { 
  display: flex; 
  gap: 20px; 
}

.genres-grid { 
  display: flex; 
  flex-wrap: wrap; 
  gap: 10px; 
}

.genre-chip input { 
  display: none; 
}

.chip-text { 
  padding: 6px 15px; 
  background: #333; 
  border-radius: 20px; 
  font-size: 0.85rem; 
  border: 1px solid transparent; 
}

.genre-chip input:checked + .chip-text { 
  background: #e50914; 
  border-color: white; 
}

.submit-btn { 
  width: 100%; 
  background: white; 
  color: black; 
  padding: 15px; 
  font-weight: bold; 
  border-radius: 4px; 
  cursor: pointer; 
}

</style>