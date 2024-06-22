import IUser from "../IUser";

export default interface AuthResponse {
  accessToken: stringt;
  refreshToken: string;
  user: IUser;
}
