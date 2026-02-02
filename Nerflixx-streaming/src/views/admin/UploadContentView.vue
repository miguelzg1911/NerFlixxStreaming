<template>
  <div class="upload-section">
    <h3>Multimedia</h3>
    <input type="file" @change="handleFileChange" accept="image/*" class="file-input" />
    <NerInput v-model="form.urlVideo" placeholder="URL del Video" theme="dark" />
  </div>
  </template>

<script setup lang="ts">
import { ref } from 'vue';
import { adminService } from '@/services/adminService';

const selectedFile = ref<File | null>(null);
const form = ref({
  title: '',
  description: '',
  releaseYear: 2024,
  contentType: 0, 
  urlVideo: ''
});

const handleFileChange = (event: any) => {
  selectedFile.value = event.target.files[0];
};

const handleUpload = async () => {
  const data = new FormData();
  data.append('Title', form.value.title);
  data.append('Description', form.value.description);
  data.append('ReleaseYear', form.value.releaseYear.toString());
  data.append('ContentType', form.value.contentType.toString());
  data.append('UrlVideo', form.value.urlVideo);
  
  if (selectedFile.value) {
    data.append('ImageFile', selectedFile.value);
  }

  try {
    await adminService.createContent(data);
    alert("¡Subido con éxito!");
  } catch (error) {
    alert("Error al subir. Revisa que el backend acepte FormData.");
  }
};
</script>

<style scoped>
.upload-container { 
    background: #141414; 
    min-height: 100vh; 
    padding: 40px; 
    color: white; 
}

.header-actions { 
    display: flex; 
    align-items: center; 
    gap: 20px; 
    margin-bottom: 40px; 
}

.back-btn { 
    background: transparent; 
    border: 1px solid #444; 
    color: white; 
    padding: 8px 15px; 
    cursor: pointer; 
}

.upload-grid { 
    display: grid; 
    grid-template-columns: 1fr 1.5fr; 
    gap: 40px; 
}

.upload-section { 
    background: #181818; 
    padding: 25px; 
    border-radius: 8px; 
}

.preview-box { 
    width: 100%; 
    aspect-ratio: 16/9; 
    background: #222; 
    margin-bottom: 20px; 
    display: flex; 
    align-items: center; 
    justify-content: center;
    background-size: cover;
    background-position: center;
    border: 1px dashed #444;
}

.ner-textarea { 
    width: 100%; 
    height: 100px; 
    background: #222; 
    border: 1px solid #333; 
    color: white; 
    padding: 10px; 
    margin-bottom: 15px; 
    border-radius: 4px;
}

.form-row { 
    display: flex; 
    gap: 20px; 
    align-items: center; 
    margin-bottom: 20px; 
}

.ner-select { 
    flex: 1;
    padding: 12px; 
    background: #222; 
    color: white; 
    border: 1px solid #333; 
}

.toggle-group { 
    display: flex; 
    gap: 10px; 
    align-items: center; 
}

.submit-btn { 
    margin-top: 20px; 
}
</style>