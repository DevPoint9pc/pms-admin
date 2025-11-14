import AdminLayout from "@/layout/admin-layout";
import SignInPage from "@/pages/auth/sign-in";
import ClientsPage from "@/pages/clients";
import DashboardPage from "@/pages/dashboard";
import DistributorsPage from "@/pages/distributors";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/utils/protected-routes";
import SymbolsPage from "@/pages/symbols";
import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";

const Router = () => {
  const { fetchClients, fetchDistributors, fetchSymbols } = useAppStore();

  useEffect(() => {
    fetchClients();
    fetchDistributors();
    fetchSymbols();
  }, []);
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/distributors" element={<DistributorsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/symbols" element={<SymbolsPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
