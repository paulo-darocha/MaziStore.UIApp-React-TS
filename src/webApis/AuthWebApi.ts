import axios, { AxiosError, AxiosResponse } from "axios";
import { T_LoginViewModel, T_RegisterViewModel } from "../types/AuthTypes";
import { serverApi } from "./CoreWebApi";
import { OneResponse } from "../types/CoreTypes";

const authApi = `${serverApi}/account`;

export const registerNewUser = async (
   data: T_RegisterViewModel
): Promise<OneResponse<string>> => {
   const response = await axios
      .post(`${authApi}/register`, data)
      .then((res: AxiosResponse) => {
         const result: OneResponse<string> = {
            error: false,
            msg: res.data,
            res: res.data,
         };
         return result;
      })
      .catch((err: AxiosError) => {
         const result: OneResponse<string> = {
            error: true,
            msg: err.response?.data.erro[0],
         };
         console.log(result);
         return result;
      });

   return response;
};

export const login = async (
   data: T_LoginViewModel
): Promise<OneResponse<string>> => {
   const response = await axios
      .post(`${authApi}/login`, data, {
         withCredentials: true,
      })
      .then((res: AxiosResponse) => {
         const result: OneResponse<string> = { error: false, msg: res.data };
         return result;
      })
      .catch((err: AxiosError) => {
         const result: OneResponse<string> = {
            error: true,
            msg: err.response?.data as string,
         };
         console.log(result);
         return result;
      });

   return response;
};

export const checkIfLogged = async () => {
   const response = await axios.get(authApi, { withCredentials: true });
   return response.data;
};

export const logoutFromServer = async () => {
   const response = await axios.get(`${authApi}/logout`, {
      withCredentials: true,
   });
   return response.data;
};
