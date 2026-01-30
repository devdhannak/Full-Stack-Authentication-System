import { Navigate, Outlet } from "react-router";
import useAuth from "../auth/auth";

export default function ProtectedRoute() {
  const { authStatus, user } = useAuth();
  console.log(authStatus, user);

  return authStatus && user ? <Outlet /> : <Navigate to="/login" replace />;
}
