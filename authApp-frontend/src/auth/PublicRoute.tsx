import { Navigate, Outlet } from "react-router";
import useAuth from "../auth/auth";

export default function PublicRoute() {
  const { authStatus, user } = useAuth();

  return authStatus && user ? <Navigate to="/" /> : <Outlet />;
}
