import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_URL_API,
});

// src/api/api.ts
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const profileId = localStorage.getItem('selectedProfileId');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (profileId) {
        config.headers['ProfileId'] = profileId;
    }

    return config;
}, (error) => Promise.reject(error)
);

export default api;