import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./Pages/Login.tsx";
import About from "./Pages/About.tsx";
import Services from "./Pages/Services.tsx";
import Signup from "./Pages/Signup.tsx";
import RootLayout from "./Pages/RootLayout.tsx";
import UserLayout from "./Pages/users/UserLayout.tsx";
import UserHome from "./Pages/users/UserHome.tsx";
import UserProfile from "./Pages/users/UserProfile.tsx";
import OAuthSuccess from "./Pages/OAuthSuccess.tsx";
import OAuthFailure from "./Pages/OAuthFailure.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dashboard" element={<UserLayout />}>
            <Route index element={<UserHome />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="oauth/success" element={<OAuthSuccess />} />
          <Route path="oauth/failure" element={<OAuthFailure />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
