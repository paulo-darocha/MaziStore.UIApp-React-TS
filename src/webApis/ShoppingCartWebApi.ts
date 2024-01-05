import axios from "axios";
import {
   T_AddToCartModel,
   T_CartQuantityUpdate,
} from "../types/ShoppingCartTypes";
import { serverApi } from "./CoreWebApi";

const cartApi = `${serverApi}/cart`;

export const sendCartToServer = async (
   data: T_AddToCartModel,
   id: number = 0
) => {
   const response = await axios.post(`${cartApi}/add/${id}`, data, {
      withCredentials: true,
   });
   console.log(
      `>>> sendCartToServer >>> ${response.status}: ${response.statusText}`
   );
   if (response.status === 200) {
      return response.data;
   }
};

export const getCartDetails = async (id: number = 0) => {
   const response = await axios.get(`${cartApi}/list/${id}`, {
      withCredentials: true,
   });
   console.log(
      `>>> getCartDetails >>> ${response.status}: ${response.statusText}`
   );
   if (response.status === 200) {
      return response.data;
   }
};

export const updateCartQuantity = async (
   data: T_CartQuantityUpdate,
   id: number = 0
) => {
   const response = await axios.post(`${cartApi}/update/${id}`, data, {
      withCredentials: true,
   });
   console.log(
      `>>> updateCartQuantity >>> ${response.status}: ${response.statusText}`
   );
   if (response.status === 200) {
      return response.data;
   }
};

export const removeItemFromCart = async (
   data: T_CartQuantityUpdate,
   id: number = 0
) => {
   const response = await axios.post(`${cartApi}/remove/${id}`, data, {
      withCredentials: true,
   });
   console.log(
      `>>> removeItemFromCart >>> ${response.status}: ${response.statusText}`
   );
   if (response.status === 200) {
      return response.data;
   }
};
