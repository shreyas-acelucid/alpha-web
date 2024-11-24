import Cookies from "universal-cookie";
const cookies = new Cookies();

export const setToken = (token: string) => {
  cookies.set("token", token, { path: "/", secure: true, sameSite: "strict" });
};

export const setRole = (role: string) => {
  cookies.set("role", role, { path: "/", secure: true, sameSite: "strict" });
};

export const getToken = () => {
  return cookies.get("token");
};

export const getRole = () => {
  return cookies.get("role");
};


export const clearToken = () => {
  cookies.remove("token", {
    path: "/",
  });
  cookies.remove("role", {
    path: "/",
  });
  localStorage.clear();
  sessionStorage.clear();
};

export const logout = () => {
  clearToken();
  window.location.href = "/";
};

export interface IFetchAPICall {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  token?: string;
}