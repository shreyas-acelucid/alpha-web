import { IFetchAPICall } from "../utils/helpers";

const http = async (path: string, options?: IFetchAPICall) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
  const url = `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
  try {
    const raw = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: options?.method ?? "GET",
      body: options?.data ? JSON.stringify(options?.data) : undefined,
    });
    const data = await raw.json();
    if (!raw.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginDietitian = async (data: {
  email: string;
  password: string;
}) => {
  return http(`/dietitian/dietitianLogin`, {
    method: "POST",
    data,
  }) as Promise<any>;
};

export const loginUser = async (data: { email: string; password: string }) => {
  return http(`/users/userLogin`, {
    method: "POST",
    data,
  }) as Promise<any>;
};

export const signUpUser = async (data: any) => {
  return http(`/users/userSignup`, {
    method: "POST",
    data,
  }) as Promise<any>;
};
