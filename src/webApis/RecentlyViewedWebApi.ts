import axios from "axios";
import { T_ProductsRecentlyViewedVm } from "../types/RecentlyViewedTypes";
import { serverApi } from "./WebServerUrls";

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
