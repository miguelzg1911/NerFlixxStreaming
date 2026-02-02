export interface AuthResponse {
    token: string;
    refreshToken?: string;
    username: string;
    userId: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    planId: string; 
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface Plan {
    id: string;
    name: string;
    price: number;
    maxResolution: string;
}

export interface Profile {
    id: string;
    name: string;
    isKids: boolean;
    avatarUrl?: string;
}

export interface Content {
    id: string;
    title: string;
    description?: string;
    thumbnailUrl?: string;
    urlVideo?: string;
    durationMinutes?: number;
    contentType?: number;
    genres?: string[];
}