import api from '../api/api';
import type { Content } from '@/types/types';

export interface MyListDto {
    contentId: string;
    contentTitle: string;
    thumbnailUrl?: string;
    addedAt: string;
}

export const myListService = {
  // Obtener la lista del usuario (basado en el perfil activo)
  async getMyList(profileId: string): Promise<Content[]> {
    const response = await api.get<Content[]>(`/mylist/${profileId}`);
    return response.data;
  },

  // Añadir a favoritos
  async addToMyList(profileId: string, contentId: string): Promise<void> {
    await api.post('/mylist', { profileId, contentId });
  },

  // Quitar de favoritos
  async removeFromMyList(profileId: string, contentId: string): Promise<void> {
    await api.delete(`/mylist/${profileId}/${contentId}`);
  }
};