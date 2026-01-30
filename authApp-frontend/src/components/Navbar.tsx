import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import useAuth from "@/auth/auth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const checkLogin = useAuth((s) => s.checkLogin);
  const user = useAuth((s) => s.user);
  const logout = useAuth((s) => s.logout);
  const navigate = useNavigate();

  return (
    <nav
      className="
        sticky top-0 z-50
        border-b border-border
        bg-background/70 dark:bg-neutral-900/70
        backdrop-blur-md
      "
    >
      <div className="container mx-auto h-16 px-6 flex items-center justify-between">
        {/* ================= BRAND ================= */}
        <div className="flex items-center gap-2 font-semibold">
          <span
            className="
              flex items-center justify-center
              h-8 w-8 rounded-lg
              bg-gradient-to-br from-primary to-primary/40
              text-primary-foreground font-bold
            "
          >
            A
          </span>
          <span className="text-lg tracking-tight">Auth App</span>
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex items-center gap-4">
          {checkLogin() ? (
            <>
              <NavLink to={"/dashboard/profile"}>{user?.name}</NavLink>
              <Button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                size={"sm"}
                className="cursor-pointer"
                variant={"outline"}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition
              ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
                }
              >
                Home
              </NavLink>
              <NavLink to="/login">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-primary/40 hover:border-primary hover:bg-primary/10"
                >
                  Login
                </Button>
              </NavLink>

              <NavLink to="/signup">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Register
                </Button>
              </NavLink>
            </>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div
          className="
      md:hidden
      border-t border-border
      bg-background/90 dark:bg-neutral-900/90
      backdrop-blur-md
    "
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {checkLogin() ? (
              <>
                {/* Show username */}
                <NavLink
                  to="/dashboard/profile"
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-primary"
                >
                  {user?.name}
                </NavLink>

                {/* Logout Button */}
                <Button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/login");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-medium transition ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink to="/login" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </NavLink>

                <NavLink to="/signup" onClick={() => setOpen(false)}>
                  <Button className="w-full">Register</Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
