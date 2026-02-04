import api from '../api/api';
import type { Content } from '../types/types';

export const contentService = {
    async getAllContent(): Promise<Content[]> {
        const response = await api.get<Content[]>('/Content');
        return response.data;
    },

    async getContentByGenre(genre: string): Promise<Content[]> {
        const response = await api.get<Content[]>(`/Content/genre/${genre}`);
        return response.data;
    },

    async getTrending(): Promise<Content[]> {
        const response = await api.get<Content[]>('/Content/trending');
        return response.data;
    },

    async getContentById(id: string): Promise<Content> {
        const response = await api.get<Content>(`/Content/${id}`);
        return response.data;
    },

    async searchContent(query: string): Promise<Content[]> {
        const response = await api.get<Content[]>(`/Content/search?q=${query}`);
        return response.data;
    }
};