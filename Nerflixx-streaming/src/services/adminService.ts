import api from '../api/api';

export const adminService = {
  async createContent(formData: FormData): Promise<any> {
    // Axios detecta automáticamente que es FormData y pone el Content-Type correcto
    const response = await api.post('/content', formData);
    return response.data;
  },

  // Eliminar contenido
  async deleteContent(id: string): Promise<void> {
    await api.delete(`/content/${id}`);
  }
};