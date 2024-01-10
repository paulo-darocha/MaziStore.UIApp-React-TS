import axios from "axios";
import { T_WidgetInstanceViewModel } from "../types/CoreTypes";
import { serverApi } from "./CoreWebApi";

const productWidApi = `${serverApi}/ProductWidget`;
const productApi = `${serverApi}/Product`;

export const getProductWidgetDetails = async (
   data: T_WidgetInstanceViewModel
) => {
   const response = await axios.post(productWidApi, data);
   console.log(`${response.status}: ${response.statusText}`);
   if (response.status === 200) {
      return response.data;
   }
};

export const getProductDetails = async (id: number) => {
   const response = await axios.get(`${productApi}/${id}`, {
      withCredentials: true,
   });
   console.log(`${response.status}: ${response.statusText}`);
   if (response.status === 200) {
      return response.data;
   }
};
