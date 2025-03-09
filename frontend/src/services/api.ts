import axios from 'axios';

// Use environment variable for API URL or fallback to a deployed backend URL
const baseURL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://healthcare-portal-api.onrender.com/api');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirect to login page if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth service functions
export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  async register(userData: any) {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data;
  },
  
  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },
  
  async resetPassword(token: string, password: string) {
    const response = await api.post('/auth/reset-password', { token, password });
    return response.data;
  },
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Types
export interface AuthResponse {
  success: boolean;
  token: string;
  user: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
  role?: string;
  phoneNumber?: string;
} 