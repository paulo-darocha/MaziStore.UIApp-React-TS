import axios from "axios";
import { T_AddressFormVm } from "../types/OrderTypes";
// import "dotenv/config";

const serverScheme = import.meta.env.VITE_SCHEME;
const serverPort = import.meta.env.VITE_PORT;
const serverHost = import.meta.env.VITE_HOST;

export const server = `${serverScheme}://${serverHost}:${serverPort}`;
export const serverApi = `${server}/api`;

const userAddressApi = `${serverApi}/UserAddress`;

const homeServerApi = `${serverApi}/home`;
const addressApi = `${serverApi}/UserAddress`;

export const getHomeWidgets = async () => {
   const response = await axios.get(`${homeServerApi}`);
   console.log(`${response.status}: ${response.statusText}`);
   if (response.status === 200) {
      return response.data;
   }
};

export const getImage = async (url: string) => {
   const response = await axios.get(`${server}/${url}`, {
      responseType: "blob",
   });
   console.log(`${response.status}: ${response.statusText}`);
   if (response.status === 200) {
      return response.data;
   }
};

export const getStateFromCountry = async (countryId: string, token: string) => {
   const response = await axios.get(`${addressApi}/${countryId}`, {
      withCredentials: true,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const sendAddressToServer = async (
   data: T_AddressFormVm,
   token: string
) => {
   const response = await axios.post(`${addressApi}/create`, data, {
      withCredentials: true,
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const getAddressesFromServer = async () => {
   const response = await axios.get(userAddressApi, { withCredentials: true });
   if (response.status === 200) {
      return response.data;
   }
};

export const getFormForNewAddress = async () => {
   const response = await axios.get(`${userAddressApi}/create`, {
      withCredentials: true,
   });
   if (response.status === 200) {
      return response.data;
   }
};
