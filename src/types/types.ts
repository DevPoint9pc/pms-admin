import type { IconType } from "react-icons/lib";

export interface SideItemTypes {
  Icon: IconType;
  href: string;
  title: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  adminEmail: string | null;
  token?: string | null;
  role?: string | null;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
}

export interface Client {
  id: string;
  name: string;
  accountNumber: string;
  investmentAmount: number;
  distrubutor: string;
}

export interface Distributor {
  id: string;
  name: string;
  email: string;
  aadharNumber: string;
  panNumber: string;
}

export interface DistributorState {
  distributors: Distributor[];
  loading: boolean;
  error: string | null;
  fetchDistributors: () => Promise<void>;
  addDistributor: (distributorData: {
    name: string;
    email: string;
    password: string;
    aadhar: string;
    pan: string;
  }) => Promise<void>;
}

export interface ClientState {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  addClient: (clientData: {
    accountNumber: string;
    name: string;
    investmentAmount: number;
    distributor: string;
  }) => Promise<void>;
}
