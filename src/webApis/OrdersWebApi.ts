import axios from "axios";
import {
   T_DeliveryInformationVm,
   T_TaxAndShippingPriceRequestVm,
} from "../types/OrderTypes";
import { serverApi } from "./WebServerUrls";

const checkoutApi = `${serverApi}/checkout`;
const ordersApi = `${serverApi}/order`;

export const getShippingInformation = async (token: string) => {
   const response = await axios.get(`${checkoutApi}/shipping`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` }
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const getShipAndTaxPrices = async (
   data: T_TaxAndShippingPriceRequestVm, token: string
) => {
   const response = await axios.post(`${checkoutApi}/update`, data, {
      withCredentials: true, headers: { Authorization: `Bearer ${token}` }
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const CompleteCheckout = async (data: T_DeliveryInformationVm, token: string) => {
   const response = await axios.post(`${checkoutApi}/shipping`, data, {
      withCredentials: true, headers: {
         Authorization: `Bearer ${token}`
      }
   });
   if (response.data === 200) {
      return response.data;
   }
};

export const getOrdersList = async (token: string) => {
   const response = await axios.get(`${ordersApi}/list`, {
      withCredentials: true, headers: {
         Authorization: `Bearer ${token}`
      }
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const getOrderDetails = async (orderId: number, token: string) => {
   const response = await axios.get(`${ordersApi}/${orderId}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` }
   });
   if (response.status === 200) {
      return response.data;
   }
};
