import { useAppStore } from "@/store/use-app-store";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAppStore((state) => state.token);

  const isAuthenticated = token ? true : false;

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (isAuthenticated && location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
