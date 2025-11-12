import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import type { Client, ClientState } from "@/types/types";

export const useClientStore = create<ClientState>()(
  persist(
    (set, get) => ({
      clients: [],
      loading: false,
      error: null,

      fetchClients: async () => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const response = await axios.get<Client[]>(
            `${import.meta.env.VITE_SERVER_URL}/client`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set({ clients: response.data, loading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              error.message ||
              "Failed to fetch clients",
            loading: false,
          });
        }
      },

      addClient: async (clientData: Omit<Client, "id">) => {
        set({ loading: true, error: null });
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const response = await axios.post<Client>(
            `${import.meta.env.VITE_SERVER_URL}/client`,
            clientData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set({ clients: [...get().clients, response.data], loading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              error.message ||
              "Failed to create client",
            loading: false,
          });
          throw error;
        }
      },
    }),
    { name: "client-storage" }
  )
);
