import { Button } from "./ui/button";
import GoogleIcon from "@/assets/icons/GoogleIcon ";
import { Github } from "lucide-react";
import { NavLink } from "react-router";

const OAuth2Buttons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <NavLink
        to={`${
          import.meta.env.VITE_BASE_URL || "http://localhost:8083"
        }/oauth2/authorization/google`}
      >
        <Button
          variant="outline"
          className="gap-2 hover:border-primary w-full cursor-pointer"
        >
          <GoogleIcon className="h-4 w-4" />
          Google
        </Button>
      </NavLink>

      <NavLink
        to={`${
          import.meta.env.VITE_BASE_URL || "http://localhost:8083"
        }/oauth2/authorization/github`}
      >
        <Button
          variant="outline"
          className="gap-2 hover:border-primary w-full cursor-pointer"
        >
          <Github className="h-4 w-4" />
          GitHub
        </Button>
      </NavLink>
    </div>
  );
};

export default OAuth2Buttons;
