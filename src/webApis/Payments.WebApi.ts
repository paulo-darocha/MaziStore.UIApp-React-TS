import axios from "axios";
import { serverApi } from "./CoreWebApi";

const paymentApi = `${serverApi}/checkout/payment`;
const coDPaymentApi = `${serverApi}/CoD`;

export const getPaymentProviders = async () => {
   const response = await axios.get(paymentApi, { withCredentials: true });
   if (response.status === 200) {
      return response.data;
   }
};

export const sendPaymentCoD = async () => {
   const response = await axios.get(coDPaymentApi, { withCredentials: true });
   if (response.status === 200) {
      return response.data;
   }
};
