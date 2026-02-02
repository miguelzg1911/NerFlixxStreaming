import api from '../api/api';
import type { Profile } from '../types/types';

export const profileService = {
    // Obtiene los perfiles del usuario logueado
    async getUserProfiles(): Promise<Profile[]> {
        const response = await api.get<Profile[]>('/profiles');
        return response.data;
    },

    // (Opcional por ahora) Crear un perfil nuevo
    async createProfile(name: string, isChild: boolean): Promise<Profile> {
        const response = await api.post<Profile>('/profiles', { name, isChild });
        return response.data;
    }
};