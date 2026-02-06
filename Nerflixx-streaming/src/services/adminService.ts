import api from '../api/api';

export const adminService = {
  async createContent(formData: FormData): Promise<any> {
    const response = await api.post('/Admin/upload-content', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  async deleteContent(id: string): Promise<void> {
    await api.delete(`/Admin/${id}`);
  },

  async updateContent(id: string, formData: FormData): Promise<any> {
    const response = await api.put(`/Admin/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};