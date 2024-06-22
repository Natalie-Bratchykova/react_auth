import $api from "../http";
import AuthResponse from "../models/response/AuthResponse";
import { AxiosResponse } from "axios";
class AuthService {
  async login(
    email: String,
    password: String
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/login", { email, password });
  }

  async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/registration", { email, password });
  }

  async logout(): Promise<void> {
    return $api.post("/logout");
  }
}

export default new AuthService();
