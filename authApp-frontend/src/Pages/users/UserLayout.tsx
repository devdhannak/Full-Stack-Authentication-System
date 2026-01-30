import useAuth from "@/auth/auth";
import { Navigate, Outlet } from "react-router";

function UserLayout() {
  const checkLogin = useAuth((state) => state.checkLogin);

  if (checkLogin()) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default UserLayout;
