import axios from "axios";
import { serverApi } from "./CoreWebApi";
import { T_ProductsRecentlyViewedVm } from "../types/RecentlyViewedTypes";

const recentApi = `${serverApi}/ProductRecentlyViewed`;

export const getRecentlyViewedProducts = async (
   data: T_ProductsRecentlyViewedVm,
   id: number = 0
) => {
   const response = await axios.post(`${recentApi}/${id}`, data, {
      withCredentials: true,
   });
   console.log(
      `>>> getRecentlyViewedProducts >>>${response.status}: ${response.statusText}`
   );
   if (response.status === 200) {
      return response.data;
   }
};
