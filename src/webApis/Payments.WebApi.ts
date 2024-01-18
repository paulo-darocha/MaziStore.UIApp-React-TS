import axios from "axios";
import { serverApi } from "./WebServerUrls";

const paymentApi = `${serverApi}/checkout/payment`;
const coDPaymentApi = `${serverApi}/CoD`;

export const getPaymentProviders = async (token: string) => {
   const response = await axios.get(paymentApi, {
      withCredentials: true, headers: {
         Authorization: `Bearer ${token}`
      }
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const sendPaymentCoD = async (token: string) => {
   const response = await axios.get(coDPaymentApi, {
      withCredentials: true, headers: {
         Authorization: `Bearer ${token}`
      }
   });
   if (response.status === 200) {
      return response.data;
   }
};
