import { makeAutoObservable } from "mobx";
import IUser from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import AuthResponse from "../models/response/AuthResponse";
const BASE_URL = "http://localhost:2909/api";
export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  hasAccount = false;

  constructor() {
    // make object observable for mobx
    makeAutoObservable(this);
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }
  setHasAccount(hasAccount: boolean) {
    this.hasAccount = hasAccount;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  login = async (email: string, password: string) => {
    console.log(this.isLoading);

    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      console.log(response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setHasAccount(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  };

  registration = async (email: string, password: string) => {
    this.setLoading(true);
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setHasAccount(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  logout = async () => {
    this.setLoading(true);
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);

      this.setUser({} as IUser);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  checkAuth = async () => {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, {
        withCredentials: true,
      });
      console.log("REFRESH RESPONSE IS HERE");
      console.log(response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setHasAccount(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };
}
