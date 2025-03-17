import { create } from "zustand";
import { authService } from "../services/authService";

interface AuthState {
  user: { email: string } | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    const response = await authService.login(email, password);
    set({ user: response.user, isAuthenticated: true });
  },

  register: async (email, password) => {
    const response = await authService.register(email, password);
    set({ user: response.user, isAuthenticated: true });
  },

  logout: () => {
    authService.logout();
    set({ user: null, isAuthenticated: false });
  },
}));
