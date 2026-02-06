<template>
  <div class="upload-container">
    <div class="header-actions">
      <button class="back-btn" @click="$router.push('/admin')">
        <i class="fas fa-arrow-left"></i> Cancelar
      </button>
      <h2 class="section-title">Editar Contenido</h2>
    </div>

    <div v-if="loadingData" style="text-align: center; padding: 50px;">
      <i class="fas fa-spinner fa-spin fa-3x" style="color: #e50914;"></i>
      <p style="margin-top: 15px;">Cargando datos del contenido...</p>
    </div>

    <div v-else class="upload-grid">
      <div class="upload-section">
        <h3 class="subsection-title">Multimedia Actual</h3>
        <div 
          class="preview-box" 
          :style="{ 
            backgroundImage: imagePreview ? `url(${imagePreview})` : `url(${form.thumbnailUrl})` 
          }"
        >
          <span v-if="!imagePreview && !form.thumbnailUrl">Sin imagen</span>
        </div>
        
        <label class="custom-file-upload">
          <input type="file" @change="handleFileChange" accept="image/*" />
          <i class="fas fa-image"></i> Cambiar Miniatura
        </label>

        <div class="input-group-spacing">
          <label class="input-label">URL del Video</label>
          <input v-model="form.urlVideo" class="ner-input-dark" />
        </div>
      </div>

      <div class="upload-section">
        <h3 class="subsection-title">Información General</h3>
        <div class="form-group">
          <label class="input-label">Título</label>
          <input v-model="form.title" class="ner-input-dark" />
        </div>
        
        <div class="form-group">
          <label class="input-label">Descripción</label>
          <textarea v-model="form.description" class="ner-textarea"></textarea>
        </div>

        <div class="form-row">
          <div class="input-group">
            <label class="input-label">Año</label>
            <input type="number" v-model="form.releaseYear" class="ner-input-dark" />
          </div>
          <div class="input-group">
            <label class="input-label">Tipo</label>
            <select v-model.number="form.contentType" class="ner-select">
              <option :value="0">🎬 Película</option>
              <option :value="1">📺 Serie</option>
            </select>
          </div>
        </div>

        <div class="genres-container" style="margin-bottom: 20px;">
          <h4 class="input-label">Géneros</h4>
          <div class="genres-grid">
            <label v-for="g in availableGenres" :key="g" class="genre-chip">
              <input type="checkbox" :value="g" v-model="form.genres" />
              <span class="chip-text">{{ g }}</span>
            </label>
          </div>
        </div>

        <button @click="handleUpdate" class="submit-btn" :disabled="isUpdating">
          <i v-if="isUpdating" class="fas fa-spinner fa-spin"></i>
          {{ isUpdating ? 'GUARDANDO...' : 'ACTUALIZAR CAMBIOS' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { contentService } from '@/services/contentService';
import { adminService } from '@/services/adminService';

const route = useRoute();
const router = useRouter();
const loadingData = ref(true);
const isUpdating = ref(false);
const selectedFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);

const availableGenres = [
  'Acción', 'Aventura', 'Ciencia Ficción', 'Comedia', 'Drama', 
  'Terror', 'Suspenso', 'Fantasía', 'Documental', 'Animación', 
  'Crimen', 'Misterio', 'Romance'
];

const form = ref({
  id: '',
  title: '',
  description: '',
  releaseYear: 2026,
  contentType: 0,
  urlVideo: '',
  thumbnailUrl: '',
  genres: [] as string[]
});

onMounted(async () => {
  const id = route.params.id as string;
  try {
    const data = await contentService.getContentById(id);
    if (data) {
      const d = data as any; 
      form.value = {
        id: d.id,
        title: d.title,
        description: d.description || '',
        releaseYear: d.releaseYear || 2026,
        contentType: (d.contentType === 'Movie' || d.contentType === 0 || d.contentType === '0') ? 0 : 1,
        urlVideo: d.urlVideo || '',
        thumbnailUrl: d.thumbnailUrl || '',
        genres: d.genres || []
      };
    }
  } catch (error) {
    console.error("Error cargando contenido:", error);
    alert("Error al cargar los datos.");
    router.push('/admin');
  } finally {
    loadingData.value = false;
  }
});

const handleFileChange = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const handleUpdate = async () => {
  if (!form.value.title) return alert("El título es obligatorio");

  isUpdating.value = true;
  const data = new FormData();
  
  data.append('Id', form.value.id);
  data.append('Title', form.value.title);
  data.append('Description', form.value.description);
  data.append('ReleaseYear', form.value.releaseYear.toString());
  data.append('ContentType', form.value.contentType.toString());
  data.append('UrlVideo', form.value.urlVideo);

  // Enviamos los géneros seleccionados
  form.value.genres.forEach(g => {
    data.append('Genres', g);
  });

  if (selectedFile.value) {
    data.append('ImageFile', selectedFile.value);
  }

  try {
    await adminService.updateContent(form.value.id, data);
    alert("¡Contenido actualizado con éxito!");
    router.push('/admin');
  } catch (error) {
    console.error("Error al actualizar:", error);
    alert("Error al guardar los cambios.");
  } finally {
    isUpdating.value = false;
  }
};
</script>

<style scoped>
.upload-container { background-color: #141414; min-height: 100vh; padding: 100px 4% 40px; color: white; }
.header-actions { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
.back-btn { background: transparent; border: 1px solid #444; color: white; padding: 8px 16px; cursor: pointer; border-radius: 4px; transition: 0.3s; }
.back-btn:hover { background: #333; }
.upload-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; }
.upload-section { background-color: #181818; padding: 30px; border-radius: 8px; }
.preview-box { width: 100%; aspect-ratio: 16/9; background-color: #222; background-size: cover; background-position: center; border: 2px dashed #444; display: flex; align-items: center; justify-content: center; margin-bottom: 15px; }
.custom-file-upload { display: block; text-align: center; background: #e50914; padding: 12px; border-radius: 4px; cursor: pointer; font-weight: bold; margin-bottom: 20px; }
.custom-file-upload input { display: none; }
.ner-input-dark, .ner-select, .ner-textarea { width: 100%; background: #2f2f2f; border: 1px solid #444; color: white; padding: 12px; border-radius: 4px; margin-bottom: 20px; }
.ner-textarea { height: 120px; resize: none; }
.form-row { display: flex; gap: 20px; }
.input-group { flex: 1; }
.submit-btn { width: 100%; background: white; color: black; border: none; padding: 15px; font-weight: bold; font-size: 1rem; border-radius: 4px; cursor: pointer; transition: 0.3s; }
.submit-btn:hover:not(:disabled) { background: #e50914; color: white; }
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.input-label { display: block; font-size: 0.9rem; color: #aaa; margin-bottom: 8px; }

/* Estilos para los géneros (Chips) */
.genres-grid { display: flex; flex-wrap: wrap; gap: 10px; }
.genre-chip input { display: none; }
.chip-text { padding: 6px 15px; background: #333; border-radius: 20px; font-size: 0.85rem; border: 1px solid transparent; cursor: pointer; transition: 0.3s; }
.genre-chip input:checked + .chip-text { background: #e50914; border-color: white; }
</style>