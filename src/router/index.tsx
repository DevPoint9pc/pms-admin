import AdminLayout from "@/layout/admin-layout";
import SignInPage from "@/pages/auth/sign-in";
import ClientsPage from "@/pages/clients";
import DashboardPage from "@/pages/dashboard";
import DistributorsPage from "@/pages/distributors";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/distributors" element={<DistributorsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
