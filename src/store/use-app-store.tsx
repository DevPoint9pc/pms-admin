import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

import type {
  Client,
  Distributor,
  Symbol,
  PaginatedResponse,
  Cash,
} from "@/types/types";

interface AppState {
  // AUTH
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;

  // CLIENTS
  clients: Client[];
  clientLoading: boolean;
  clientError: string | null;
  fetchClients: () => Promise<void>;
  addClient: (clientData: Omit<Client, "id">) => Promise<void>;

  // DISTRIBUTORS
  distributors: Distributor[];
  distributorLoading: boolean;
  distributorError: string | null;
  fetchDistributors: () => Promise<void>;
  addDistributor: (data: {
    name: string;
    email: string;
    password: string;
    aadhar: string;
    pan: string;
  }) => Promise<void>;

  // SYMBOLS
  symbols: Symbol[];
  symbolLoading: boolean;
  symbolError: string | null;
  fetchSymbols: () => Promise<void>;
  addSymbol: (data: {
    symbol: string;
    instrumentId: string;
    isin: string;
    name: string;
    ltp: number;
    isActive?: boolean;
  }) => Promise<void>;
  updateSymbolStatus: (symbol: string, desiredStatus: boolean) => Promise<void>;

  // CSV UPLOAD
  uploadLoading: boolean;
  uploadError: string | null;
  uploadedData: any;
  uploadCsv: (file: File) => Promise<void>;

  // CASH
  cash: Cash[];
  cashInLoading: boolean;
  cashInError: string | null;
  cashInCashOut: (addCashdata: {
    client: string;
    amount: number;
    type: "CASH_IN" | "CASH_OUT";
    remark: string;
  }) => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      adminEmail: null,
      token: null,
      role: null,

      login: async (email, password) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/auth/login`,
            { email, password }
          );

          const token = response.data.data;
          const tokenPayload = JSON.parse(atob(token.split(".")[1]));
          const userRole = tokenPayload.role;

          if (userRole !== "admin") {
            toast.error("You are not authorized to access this portal.");
            return null;
          }

          set({
            isAuthenticated: true,
            adminEmail: email,
            token,
            role: userRole,
          });

          toast.success("Logged in successfully!");
          return userRole;
        } catch (error: any) {
          console.error("Login error:", error);
          toast.error("Invalid credentials.");
          return null;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          adminEmail: null,
          token: null,
          role: null,
          clients: [],
          distributors: [],
          symbols: [],
          uploadedData: null,
        });
        toast.success("Logged out.");
      },

      clients: [],
      clientLoading: false,
      clientError: null,

      fetchClients: async () => {
        set({ clientLoading: true, clientError: null });
        try {
          const token = get().token;
          const response = await axios.get<PaginatedResponse<Client>>(
            `${import.meta.env.VITE_SERVER_URL}/client`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const clients = response.data.data.map(
            (c: any): Client => ({
              id: c._id,
              name: c.name,
              accountNumber: c.accountNumber,
              investmentAmount: c.investmentAmount,
              distributor: c.distributor?.name || "Unknown Distributor",
              realisedPnl: c.realisedPnl,
              currentBalance: c.currentBalance,
              currentHoldings: c.currentHoldings,
              ...c,
            })
          );

          console.log("CLIENTS STORE", clients);

          set({ clients, clientLoading: false });
        } catch (error: any) {
          set({
            clientError:
              error.response?.data?.message ||
              error.message ||
              "Failed to fetch clients",
            clientLoading: false,
          });
        }
      },

      addClient: async (clientData) => {
        set({ clientLoading: true, clientError: null });
        try {
          const token = get().token;
          const response = await axios.post<Client>(
            `${import.meta.env.VITE_SERVER_URL}/client`,
            clientData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          set({
            clients: [...get().clients, response.data],
            clientLoading: false,
          });
        } catch (error: any) {
          set({
            clientError:
              error.response?.data?.message ||
              error.message ||
              "Failed to create client",
            clientLoading: false,
          });
          throw error;
        }
      },

      distributors: [],
      distributorLoading: false,
      distributorError: null,

      fetchDistributors: async () => {
        set({ distributorLoading: true, distributorError: null });
        try {
          const token = get().token;
          const response = await axios.get<PaginatedResponse<Distributor>>(
            `${import.meta.env.VITE_SERVER_URL}/user`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const data = response.data.data.map((item: any) => ({
            id: item._id,
            distributorName: item.name,
            distributorEmail: item.email,
            distributorAadharNumber: item.aadharNumber,
            distributorPanNumber: item.panNumber,
            ...item,
          }));

          set({ distributors: data, distributorLoading: false });
        } catch (error: any) {
          set({
            distributorError:
              error.response?.data?.message ||
              error.message ||
              "Failed to fetch distributors",
            distributorLoading: false,
          });
        }
      },

      addDistributor: async (data) => {
        set({ distributorLoading: true, distributorError: null });
        try {
          const token = get().token;

          const apiData = {
            name: data.name,
            email: data.email,
            password: data.password,
            aadharNumber: data.aadhar,
            panNumber: data.pan,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/user`,
            apiData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set({
            distributors: [...get().distributors, response.data],
            distributorLoading: false,
          });
        } catch (error: any) {
          set({
            distributorError:
              error.response?.data?.message ||
              error.message ||
              "Failed to create distributor",
            distributorLoading: false,
          });
          throw error;
        }
      },

      symbols: [],
      symbolLoading: false,
      symbolError: null,

      fetchSymbols: async () => {
        set({ symbolLoading: true, symbolError: null });
        try {
          const token = get().token;
          const response = await axios.get<PaginatedResponse<Symbol>>(
            `${import.meta.env.VITE_SERVER_URL}/symbols`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const symbols = response.data.data.map((s: any) => ({
            id: s._id,
            symbol: s.symbol,
            instrumentId: s.instrumentId,
            isin: s.isin,
            name: s.name,
            ltp: s.ltp,
            isActive: s.isActive,
          }));

          set({ symbols, symbolLoading: false });
        } catch (error: any) {
          set({
            symbolError:
              error.response?.data?.message ||
              error.message ||
              "Failed to fetch symbols",
            symbolLoading: false,
          });
        }
      },

      addSymbol: async (data) => {
        set({ symbolLoading: true, symbolError: null });
        try {
          const token = get().token;

          const apiData = {
            symbol: data.symbol,
            instrumentId: data.instrumentId,
            isin: data.isin,
            name: data.name,
            ltp: data.ltp,
          };

          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/symbols`,
            apiData,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set({
            symbols: [...get().symbols, response.data],
            symbolLoading: false,
          });
        } catch (error: any) {
          set({
            symbolError:
              error.response?.data?.message ||
              error.message ||
              "Failed to create symbol",
            symbolLoading: false,
          });
          throw error;
        }
      },

      updateSymbolStatus: async (symbolName, desiredStatus) => {
        set({ symbolLoading: true, symbolError: null });
        try {
          const token = get().token;
          const endpoint = desiredStatus
            ? `/symbols/${symbolName}/activate`
            : `/symbols/${symbolName}/deactivate`;

          const response = await axios.patch(
            `${import.meta.env.VITE_SERVER_URL}${endpoint}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const updatedSymbol = response.data.data;

          set((state) => ({
            symbols: state.symbols.map((s) =>
              s.symbol === updatedSymbol.symbol ? updatedSymbol : s
            ),
            symbolLoading: false,
          }));
        } catch (error: any) {
          set({
            symbolError:
              error.response?.data?.message ||
              error.message ||
              "Failed to update symbol",
            symbolLoading: false,
          });
          throw error;
        }
      },

      uploadLoading: false,
      uploadError: null,
      uploadedData: null,

      uploadCsv: async (file) => {
        set({ uploadLoading: true, uploadError: null });
        try {
          const token = get().token;
          const formData = new FormData();
          formData.append("file", file);

          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/user/upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          set({ uploadedData: response.data, uploadLoading: false });
          toast.success("CSV uploaded successfully!");
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "CSV upload failed";
          set({ uploadError: message, uploadLoading: false });
          toast.error(message);
          throw error;
        }
      },

      cash: [],
      cashInLoading: false,
      cashInError: null,

      cashInCashOut: async (addCashdata) => {
        set({ cashInLoading: true, cashInError: null });
        try {
          const token = get().token;
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_URL}/client/${
              addCashdata.client
            }/addcash`,
            addCashdata,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          set({ cashInLoading: false, cash: response.data });
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Failed to add cash";
          set({ cashInError: message, cashInLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
