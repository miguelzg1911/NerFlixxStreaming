import api from '../api/api';

export const adminService = {
  async createContent(formData: FormData): Promise<any> {
    const response = await api.post('/Content', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async deleteContent(id: string): Promise<void> {
    await api.delete(`/Content/${id}`);
  }
};