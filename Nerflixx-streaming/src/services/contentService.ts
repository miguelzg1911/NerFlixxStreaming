import api from '../api/api';
import type { Content } from '../types/types';

export const contentService = {
    async getAllContent(): Promise<Content[]> {
        const response = await api.get<Content[]>('/content');
        return response.data;
    },

    async getContentByGenre(genre: string): Promise<Content[]> {
        const response = await api.get<Content[]>(`/content/genre/${genre}`);
        return response.data;
    },

    async getTrending(): Promise<Content[]> {
        const response = await api.get<Content[]>('/content/trending');
        return response.data;
    },

    async getContentById(id: string): Promise<Content> {
        const response = await api.get<Content>(`/content/${id}`);
        return response.data;
    },

    async searchContent(query: string): Promise<Content[]> {
        const response = await api.get<Content[]>(`/content/search?q=${query}`);
        return response.data;
    }
};