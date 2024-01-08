import axios from "axios";
import { T_AddressFormVm } from "../types/OrderTypes";

export const server = "https://localhost:7000";
export const serverApi = `${server}/api`;

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

export const getStateFromCountry = async (countryId: string) => {
   const response = await axios.get(`${addressApi}/${countryId}`, {
      withCredentials: true,
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const sendAddressToServer = async (data: T_AddressFormVm) => {
   const response = await axios.post(`${addressApi}/create`, data, {
      withCredentials: true,
   });
   if (response.status === 200) {
      return response.data;
   }
};
