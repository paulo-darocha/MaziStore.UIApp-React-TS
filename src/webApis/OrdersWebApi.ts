import axios from "axios";
import { serverApi } from "./CoreWebApi";
import { T_TaxAndShippingPriceRequestVm } from "../types/OrderTypes";

const checkoutApi = `${serverApi}/checkout`;

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
