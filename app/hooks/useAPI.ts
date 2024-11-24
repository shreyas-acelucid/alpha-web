import {getToken, IFetchAPICall } from "../utils/helpers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const useAPI = () => {
  const http = async (path: string, options?: IFetchAPICall) => {
    const token = getToken();
    const url = `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
    try {
      const raw = await fetch(url, {
        headers: {
          dietitionToken: token,
          "Content-Type": "application/json",
        },
        method: options?.method ?? "GET",
        body: options?.data ? JSON.stringify(options?.data) : undefined,
      });
      const data = await raw.json();
      if (!raw.ok) throw new Error(data.message);
      else {
        return data;
      }
    } catch (error) {
      console.error("API CALL ERROR", path, error);
      throw error;
    }
  };

  const getItems = async () => {
    return http("/descriptor/grouped") as Promise<any>;
  };

  return {
    getItems,
  };
};

export default useAPI;
