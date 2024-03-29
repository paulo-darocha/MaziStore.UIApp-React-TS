/* eslint-disable */

import axios, { AxiosError, AxiosResponse } from "axios";
import {
   T_LoginViewModel,
   T_PublicCommentVm,
   T_RegisterViewModel,
} from "../types/AuthTypes";
import { OneResponse, T_UserResult } from "../types/CoreTypes";
import { serverApi } from "./WebServerUrls";

const authApi = `${serverApi}/account`;
const publicCommentApi = `${serverApi}/PublicComment`;

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
         const msg: string = (err.response?.data as any).erro[0];
         const result: OneResponse<string> = {
            error: true,
            msg: msg,
         };
         console.log(err.response?.data);
         return result;
      });

   return response;
};

export const login = async (data: T_LoginViewModel): Promise<T_UserResult> => {
   const response = await axios
      .post(`${authApi}/login`, data, {
         withCredentials: true,
      })
      .then((res: AxiosResponse) => {
         return res.data;
      })
      .catch((err: AxiosError) => {
         const result: T_UserResult = {
            id: 0,
            fullName: "",
            email: "",
            succeeded: false,
            message: err.response?.data as string,
            token: "x",
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

export const sendCommentToServer = async (data: T_PublicCommentVm) => {
   const response = await axios.post(publicCommentApi, data);
   return response.data;
};

export const getPublicCommentList = async () => {
   const response = await axios.get(publicCommentApi);
   if (response.status == 200) {
      return response.data;
   }
};
