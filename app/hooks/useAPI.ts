import { getToken, IFetchAPICall } from "../utils/helpers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const useAPI = () => {
  const http = async (path: string, options?: IFetchAPICall) => {
    const token = getToken();
    const url = `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
    try {
      const raw = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  const getUsers = async () => {
    return http("/users/getUsers") as Promise<any>;
  };

  const getUserById = async (id: string) => {
    return http(`/users/getUserById/${id}`) as Promise<any>;
  };

  const createDietPlan = async (data: any) => {
    return http("/dietitian/createDietPlan", {
      method: "POST",
      data,
    }) as Promise<any>;
  };

  const getAllItems = async () => {
    return http("/dietitian/getAllItems") as Promise<any>;
  };

  const createItem = async (data: any) => {
    return http("/dietitian/createItem", {
      method: "POST",
      data,
    }) as Promise<any>;
  };

  const getDietPlanbyUserId = async (data: { userId: string }) => {
    return http("/users/getDietPlanByUserId", {
      method: "POST",
      data,
    }) as Promise<any>;
  };

  const completeDietPlanbyUserId = async (
    planId: string,
    data: { userId: string }
  ) => {
    return http(`/users/updateDietPlanCompletedById/${planId}`, {
      method: "PUT",
      data,
    }) as Promise<any>;
  };

  const deleteItemById = async (itemId: string) => {
    return http(`/dietitian/deleteItemById/${itemId}`, {
      method: "DELETE",
    }) as Promise<any>;
  };

  const deletePlanById = async (itemId: string) => {
    return http(`/dietitian/deleteDietPlanById/${itemId}`, {
      method: "DELETE",
    }) as Promise<any>;
  };

  return {
    getUsers,
    getUserById,
    createDietPlan,
    getAllItems,
    createItem,
    getDietPlanbyUserId,
    completeDietPlanbyUserId,
    deleteItemById,
    deletePlanById
  };
};

export default useAPI;
