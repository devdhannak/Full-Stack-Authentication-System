import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2Icon, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import GoogleIcon from "../assets/icons/GoogleIcon ";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/services/AuthService";
import { NavLink, useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import OAuth2Buttons from "@/components/OAuth2Buttons";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();

  // text input, email, password, number, textarea
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
  };

  // handle form submit
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(data);

    // validations
    if (data.name.trim() === "") {
      toast.error("Name is required");
      return;
    }
    if (data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    // form submit for registration
    try {
      setLoading(true);
      const res = await registerUser(data);
      console.log(res);
      toast.success("User register succesfully");
      setData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error: any) {
      if (error?.status === 400) {
        setError(error);
      } else {
        setError(error);
      }
      // setError(error);
      // toast.error("Error in registering the user!");
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
              Create Your Account
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Join the next-generation authentication platform
            </p>
          </CardHeader>

          <CardContent className="">
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
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="name"
                    placeholder="John.doe"
                    className="pl-9"
                    name="name"
                    value={data.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

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
                    value={data.email}
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
                    value={data.password}
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
                  "Sign up"
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
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
              to={"/login"}
              className="flex justify-center mt-4 text-center text-sm text-muted-foreground"
            >
              Alredy have an account?{" "}
              <span className="text-primary hover:underline cursor-pointer">
                login
              </span>
            </NavLink>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
