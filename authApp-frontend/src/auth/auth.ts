import type LoginData from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type RefreshToken from "@/models/RefreshToken";
import type UserData from "@/models/UserData";
import { loginUser, logoutUser } from "@/services/AuthService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";

// type AuthStatus = "idle" | "authenticating" | "authenticated" | "anonymous";

type AuthState = {
  accessToken: string | null;
  user: UserData | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => void;
  refresh: (refreshToken: RefreshToken) => void;
  checkLogin: () => boolean | undefined;

  changeLocalLoginData: (
    accesToken: string,
    user: UserData,
    authStatus: boolean,
  ) => void;
};

// main logic for global state
const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      changeLocalLoginData: (accesToken, user, authStatus) => {
        set({
          accessToken: accesToken,
          user,
          authStatus,
        });
      },

      login: async (loginData) => {
        console.log("Started login...");
        set({ authLoading: true });

        try {
          const loginResponseData = await loginUser(loginData);
          // console.log("loginResponseData: ", loginResponseData);
          // console.log("Access Token:", loginResponseData.accesstoken);
          set({
            accessToken: loginResponseData.accesstoken,
            user: loginResponseData.user,
            authStatus: true,
          });
          return loginResponseData;
          // console.log();
        } catch (error) {
          return Promise.reject(error);
        } finally {
          set({
            authLoading: false,
          });
        }
      },

      refresh: (refreshToken) => {
        set({
          accessToken: null,
          user: null,
          authStatus: false,
        });
      },
      logout: async (silent = false) => {
        try {
          set({
            authLoading: true,
          });
          await logoutUser();
        } catch (error) {
        } finally {
          set({ authLoading: false });
        }
        await logoutUser();
        set({
          accessToken: null,
          user: null,
          authStatus: false,
        });
      },
      checkLogin: () => {
        if (get().accessToken && get().authStatus) {
          return true;
        } else {
          return false;
        }
      },
    }),
    { name: LOCAL_KEY },
  ),
);

export default useAuth;
