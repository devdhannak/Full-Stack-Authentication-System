import type UserData from "./UserData";

export default interface LoginResponseData {
  accessToken: string;
  user: UserData;
  refreshToken: string;
  expiresIn: number;
}
