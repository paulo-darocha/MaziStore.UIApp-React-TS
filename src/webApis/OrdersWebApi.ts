import axios from "axios";
import { serverApi } from "./CoreWebApi";
import {
   T_DeliveryInformationVm,
   T_TaxAndShippingPriceRequestVm,
} from "../types/OrderTypes";

const checkoutApi = `${serverApi}/checkout`;
const ordersApi = `${serverApi}/order`;

export const getShippingInformation = async () => {
   const response = await axios.get(`${checkoutApi}/shipping`, {
      withCredentials: true,
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const getShipAndTaxPrices = async (
   data: T_TaxAndShippingPriceRequestVm
) => {
   const response = await axios.post(`${checkoutApi}/update`, data, {
      withCredentials: true,
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const CompleteCheckout = async (data: T_DeliveryInformationVm) => {
   const response = await axios.post(`${checkoutApi}/shipping`, data, {
      withCredentials: true,
   });
   if (response.data === 200) {
      return response.data;
   }
};

export const getOrdersList = async () => {
   const response = await axios.get(`${ordersApi}/list`, {
      withCredentials: true,
   });
   if (response.status === 200) {
      return response.data;
   }
};

export const getOrderDetails = async (orderId: number) => {
   const response = await axios.get(`${ordersApi}/${orderId}`, {
      withCredentials: true,
   });
   if (response.status === 200) {
      return response.data;
   }
};
