import type { AuthState } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminEmail: null,
      token: null,
      role: null,

      login: async (
        email: string,
        password: string
      ): Promise<string | null> => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/auth/login`,
            { email, password }
          );

          const token = response.data.data;
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const userRole = tokenPayload.role;

          set({
            isAuthenticated: true,
            adminEmail: email,
            token,
            role: userRole,
          });

          localStorage.setItem("token", token);

          return userRole;
        } catch (error) {
          console.error("Login error:", error);
          if (axios.isAxiosError(error)) {
            console.error("Error response:", error.response?.data);
          }
          return null;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          adminEmail: null,
          token: null,
          role: null,
        });
        localStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
