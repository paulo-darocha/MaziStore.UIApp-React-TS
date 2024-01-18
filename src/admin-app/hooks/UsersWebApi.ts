import axios from "axios";
import { T_SmartTableParam } from "../types/UserTypes";
import { serverApi } from "../../webApis/WebServerUrls";

const userApi = `${serverApi}/users`;

export const getUserList = async (params: T_SmartTableParam, token: string) => {
   const response = await axios.post(`${userApi}/grid`, params, {
      withCredentials: true,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });

   if (response.status == 200) {
      return response.data;
   }
};

export const deleteUser = async (id: number, token: string) => {
   const response = await axios.delete(`${userApi}/${id}`, {
      withCredentials: true,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (response.status == 200) {
      return response.data;
   }
};
