<template>
  <div class="admin-dashboard">
    <NerNavbarPro />
    <div class="dashboard-content">
      <div class="dash-header">
        <h1>Gestión de Catálogo</h1>
        <NerButton @click="$router.push('/admin/upload')" size="small" style="width: auto;">
          + Nuevo Contenido
        </NerButton>
      </div>

      <table class="content-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in catalog" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.genres && item.genres.length > 0 ? item.genres[0] : 'Sin género' }}</td>
            <td>{{ Number(item.contentType) === 0 ? '🎬 Película' : '📺 Serie' }}</td>
            <td>
              <button class="edit-btn">Editar</button>
              <button @click="deleteItem(item.id)" class="delete-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { contentService } from '@/services/contentService';
import { adminService } from '@/services/adminService';
import type { Content } from '@/types/types';
import NerNavbarPro from '@/components/common/NerNavbar.vue';
import NerButton from '@/components/common/NerButton.vue';

const catalog = ref<Content[]>([]);

onMounted(async () => {
  catalog.value = await contentService.getAllContent();
});

const deleteItem = async (id: string) => {
  if (confirm('¿Seguro que quieres eliminar este título?')) {
    await adminService.deleteContent(id);
    catalog.value = catalog.value.filter(c => c.id !== id);
  }
};
</script>

<style scoped>
.dashboard-content { 
    padding: 100px 4%; 
    color: white; 
}

.dash-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 30px; 
}

.content-table { 
    width: 100%; 
    border-collapse: collapse; 
    background: #181818; 
}

.content-table th, .content-table td { 
    padding: 15px; 
    text-align: left; 
    border-bottom: 1px solid #333; 
}

.edit-btn { 
    color: #aaa; 
    background: none; 
    border: none; 
    cursor: pointer; 
    margin-right: 10px; 
}

.delete-btn { 
    color: var(--nerflixx-red); 
    background: none; 
    border: none; 
    cursor: pointer; 
}

</style>
