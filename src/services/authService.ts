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

    return response.data;
  }

  logout() {
    localStorage.removeItem("token");
  }
}

export const authService = new AuthService();
