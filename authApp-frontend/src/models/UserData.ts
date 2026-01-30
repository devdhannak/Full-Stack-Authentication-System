export default interface UserData {
  id: string;
  email: string;
  name?: string;
  enabled: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  provider: string;
}
