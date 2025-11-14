import type { IconType } from "react-icons/lib";

export interface SideItemTypes {
  Icon: IconType;
  href: string;
  title: string;
}

export type ActionType = "CASH_IN" | "CASH_OUT";
export interface DistributorSummary {
  _id: string;
  name: string;
}

export interface Client {
  id: string;
  name: string;
  accountNumber: string;
  investmentAmount: number;
  distributor: DistributorSummary;
  reaslisedPnl?: string;
  currentBalance?: string;
  currentHoldings?: string;
}

export interface Cash {
  client: string;
  amount: string;
  type: ActionType;
  remark: string;
}

export interface Distributor {
  id: string;
  distributorName: string;
  distributorEmail: string;
  distributorAadharNumber: string;
  distributorPanNumber?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Symbol {
  symbol: string;
  instrumentId: string;
  isin: string;
  name: string;
  ltp: number;
  isActive?: boolean;
}
