import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginRequest, RegisterRequest } from '../types';
import apiService from '../services/api';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true });
        try {
          const response = await apiService.login(credentials);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          
          toast.success('Connexion réussie!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.error || 'Erreur de connexion');
          throw error;
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true });
        try {
          const response = await apiService.register(userData);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
          
          toast.success('Compte créé avec succès!');
        } catch (error: any) {
          set({ isLoading: false });
          toast.error(error.response?.data?.error || 'Erreur lors de l\'inscription');
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        toast.success('Déconnexion réussie');
      },

      checkAuth: async () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (!token || !userStr) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return;
        }

        set({ isLoading: true });
        try {
          const user = await apiService.getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearAuth: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
); 