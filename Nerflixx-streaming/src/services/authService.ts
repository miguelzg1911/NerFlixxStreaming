import api from '../api/api';
import type { AuthResponse, UserLogin, RegisterRequest, Plan } from '../types/types';

export const authService = {
    async login(credentials: UserLogin): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    async getPlans(): Promise<Plan[]> {
        const response = await api.get<Plan[]>('/subscriptions/plans');
        return response.data;
    }
};