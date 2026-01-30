import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2Icon, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, type FormEvent } from "react";
import type LoginData from "@/models/LoginData";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/auth/auth";
import OAuth2Buttons from "@/components/OAuth2Buttons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);

    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (loginData.email.trim() === "") {
      toast.error("Email is required !");
      return;
    }
    if (loginData.password.trim() === "") {
      toast.error("Password is required !");
      return;
    }

    // server call for login
    try {
      setLoading(true);
      // const res = await loginUser(loginData);
      const res = await login(loginData);
      toast.success("User logged in successfully");
      console.log(res);
      setLoginData({
        email: "",
        password: "",
      });

      // save the current user in local storage

      navigate("/dashboard");
    } catch (error: any) {
      // console.log("Error in logging the user");
      setError(error);
      console.log(error);
      if (error?.status === 400) {
        setError(error);
      } else {
        setError(error);
      }

      // toast.error("Error in logging the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen flex items-center justify-center
      bg-gradient-to-br 
      from-background via-background to-muted
      dark:from-black dark:via-neutral-950 dark:to-neutral-900
      px-4
    "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* error section */}

        <Card
          className="
          rounded-2xl
          bg-background/60 dark:bg-neutral-900/70
          backdrop-blur-xl
          border shadow-xl
        "
        >
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">
              Welcome Back 👋
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Sign in to continue to your secure dashboard
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="mt-6">
                <Alert variant={"destructive"}>
                  <CheckCircle2Icon />
                  <AlertTitle>
                    {error?.response
                      ? error?.response?.data?.message
                      : error?.message}
                  </AlertTitle>
                </Alert>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10"
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
        absolute right-3 top-1/2 -translate-y-1/2
        text-muted-foreground hover:text-foreground
        transition
      "
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                disabled={loading}
                type="submit"
                className="w-full cursor-pointer"
              >
                {loading ? (
                  <>
                    <Spinner /> Please wait...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">
                  OR CONTINUE WITH
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </form>
            {/* Social Login */}
            <OAuth2Buttons />

            {/* Footer */}
            <NavLink
              to={"/signup"}
              className="flex justify-center mt-4 text-center text-sm text-muted-foreground"
            >
              Don’t have an account?{" "}
              <span className="text-primary hover:underline cursor-pointer">
                Sign up
              </span>
            </NavLink>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
