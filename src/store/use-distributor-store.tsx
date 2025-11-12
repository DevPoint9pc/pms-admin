import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { type Distributor, type DistributorState } from "@/types/types";

export const useDistributorStore = create<DistributorState>()(
  persist(
    (set, get) => ({
      distributors: [],
      loading: false,
      error: null,

      fetchDistributors: async () => {
        set({ loading: true, error: null });

        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/user`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const users = Object.values(response.data).filter(
            (item: any) => item && item.role && item._id
          );

          const distributors = users.filter(
            (user: any) => user.role === "distributor"
          );

          set({ distributors, loading: false });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              error.message ||
              "Failed to fetch distributors",
            loading: false,
          });
        }
      },

      addDistributor: async (distributorData: any) => {
        set({ loading: true, error: null });

        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No authentication token found");

          const apiData = {
            name: distributorData.name,
            email: distributorData.email,
            password: distributorData.password,
            aadharNumber: distributorData.aadhar,
            panNumber: distributorData.pan,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/user`,
            apiData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const newDistributor = response.data;
          const { distributors } = get();

          set({
            distributors: [...distributors, newDistributor],
            loading: false,
          });
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              error.message ||
              "Failed to create distributor",
            loading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: "distributor-storage",
    }
  )
);
