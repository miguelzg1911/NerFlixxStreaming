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
            <th>Tipo</th> <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in catalog" :key="item.id">
            <td>{{ item.title }}</td>
            <td>
              {{ item.genres && item.genres.length > 0 ? item.genres.join(', ') : 'Sin género' }}
            </td>
            <td>
              <span class="type-badge">
                {{ Number(item.contentType) === 0 || item.contentType === 'Movie' ? '🎬 Película' : '📺 Serie' }}
              </span>
            </td>
            <td>
              <div class="actions-wrapper">
                <button @click="handleEdit(item.id)" class="edit-btn">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button @click="deleteItem(item.id)" class="delete-btn">
                  <i class="fas fa-trash"></i> Eliminar
                </button>
              </div>
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
import { useRouter } from 'vue-router';

const catalog = ref<Content[]>([]);
const router = useRouter();

onMounted(async () => {
  catalog.value = await contentService.getAllContent();
});

const handleEdit = (id: string) => {
  router.push(`/admin/edit/${id}`);
};

const deleteItem = async (id: string) => {
  if (confirm('¿Seguro que quieres eliminar este título?')) {
    await adminService.deleteContent(id);
    catalog.value = catalog.value.filter(c => c.id !== id);
  }
};
</script>

<style scoped>
.dashboard-content { padding: 100px 4%; color: white; }
.dash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.content-table { width: 100%; border-collapse: collapse; background: #181818; }
.content-table th, .content-table td { padding: 15px; text-align: left; border-bottom: 1px solid #333; }
.content-table th { color: #aaa; font-size: 0.9rem; text-transform: uppercase; }

.actions-wrapper { display: flex; gap: 15px; }
.edit-btn { color: #aaa; background: none; border: none; cursor: pointer; transition: 0.3s; }
.edit-btn:hover { color: #fff; }
.delete-btn { color: #e50914; background: none; border: none; cursor: pointer; font-weight: bold; }
.delete-btn:hover { text-decoration: underline; }
.type-badge { font-size: 0.9rem; color: #eee; }
</style>
