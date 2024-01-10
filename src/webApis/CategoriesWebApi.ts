import axios from "axios";
import { serverApi } from "./CoreWebApi";
import { T_SearchOption } from "../types/CategoriesTypes";

const categoryMenuApi = `${serverApi}/CategoryMenu/`;
const categoryApi = `${serverApi}/Category`;

export const getCategoriesForMenu = async () => {
   const response = await axios.get(`${categoryMenuApi}`);
   console.log(
      `>>> getCategoriesForMenu >>>${response.status}: ${response.statusText}`
   );
   if (response.status === 200) {
      return response.data;
   }
};

export const getProductsByCategory = async (
   data: T_SearchOption,
   id: number
) => {
   const response = await axios.post(`${categoryApi}/${id}`, data);
   console.log(
      `>>> getProductsByCategory >>>${response.status}: ${response.statusText}`
   );
   if (response.status === 200) {
      return response.data;
   }
};
