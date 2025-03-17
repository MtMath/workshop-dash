import { api } from "./api";

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  tokenType: string;
}

class AuthService {
  constructor() {}

  async register(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/account/register", {
      email,
      password,
    });

    if (response.status !== 200) throw new Error("Failed to register");

    return response.data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/account/login", {
      email,
      password,
    });

    // This so wrong, but we will fix it later
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  }

  async refresh(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) throw new Error("No refresh token found");

    const response = await api.post("/account/refresh", {
      refreshToken,
    });

    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }
}

export const authService = new AuthService();
