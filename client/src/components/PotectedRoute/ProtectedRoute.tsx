import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../Auth/authContext";

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole?: number;
};

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { account, isConnected, isLoading } = useAuth();

  if (isLoading) return <div>Chargement...</div>;
  if (!isConnected) return <Navigate to="/connexion" replace />;
  if (requiredRole && account?.role_id !== requiredRole)
    return <Navigate to="/" replace />;
  return children;
}
