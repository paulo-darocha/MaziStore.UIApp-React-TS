import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../../redux-store/reduxStore";
import { serverApi } from "../../webApis/WebServerUrls";
import {
   T_CategoryForm,
   T_CategoryListItem,
} from "../admin-types/CategoryAdmTypes";
import { T_SmartTableParam } from "../admin-types/UserTypes";

const useCategoriesApi = () => {
   const token = useAppSelector((x) => x.token);
   const categoriesAdmApi = `${serverApi}/category-admin`;

   const getCategoriesListRepo = async (): Promise<
      T_CategoryListItem[] | undefined
   > => {
      const products = await axios
         .get(`${categoriesAdmApi}`, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => {
            console.error(err);
            return undefined;
         });

      return products;
   };

   const getCategoryByIdRepo = async (
      id: number
   ): Promise<T_CategoryForm | undefined> => {
      const products = await axios
         .get(`${categoriesAdmApi}/${id}`, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => {
            console.error(err);
            return undefined;
         });

      return products;
   };

   const postNewCategoryRepo = async (data: T_CategoryForm) => {
      const products = await axios
         .post(categoriesAdmApi, data, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => {
            console.error(err);
            return undefined;
         });

      return products;
   };

   const updateCategoryRepo = async (data: T_CategoryForm) => {
      const products = await axios
         .put(`${categoriesAdmApi}/${data.id}`, data, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => {
            console.error(err);
            return undefined;
         });

      return products;
   };

   const getProductsInCategoryRepo = async (
      data: T_SmartTableParam,
      id: number
   ) => {
      const products = await axios
         .post(`${categoriesAdmApi}/${id}/products`, data, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => {
            console.error(err);
            return undefined;
         });

      return products;
   };

   return {
      getCategoriesListRepo,
      getCategoryByIdRepo,
      postNewCategoryRepo,
      updateCategoryRepo,
      getProductsInCategoryRepo,
   };
};

export default useCategoriesApi;
