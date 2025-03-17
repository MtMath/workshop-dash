import { api } from "./api";

export interface AuthResponse {
  token: string;
  user: { email: string };
}

export const authService = {
  async register(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: "mocked-token-123",
          user: { email },
        };
        localStorage.setItem("token", mockResponse.token);
        resolve(mockResponse);
      }, 500)
    );
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: "mocked-token-123",
          user: { email },
        };
        localStorage.setItem("token", mockResponse.token);
        resolve(mockResponse);
      }, 500)
    );
  },

  logout() {
    localStorage.removeItem("token");
  },
};
