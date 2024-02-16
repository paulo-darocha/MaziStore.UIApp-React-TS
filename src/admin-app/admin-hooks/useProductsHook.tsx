import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../../redux-store/reduxStore";
import { serverApi } from "../../webApis/WebServerUrls";
import {
   T_ProductForm,
   T_ProductOption,
   T_ProductResult,
   T_ProductVm,
} from "../admin-types/CatalogAdmTypes";

const useProductsHook = () => {
   const params = useAppSelector((x) => x.productParams);
   const token = useAppSelector((x) => x.token);
   const productAdmApi = `${serverApi}/ProductAdm`;
   const productOptApi = `${serverApi}/product-option-admin`;

   const getProductListRepo = async (): Promise<
      T_ProductResult | undefined
   > => {
      const products = await axios
         .post(`${productAdmApi}/list`, params, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res) => res.data)
         .catch((err: AxiosError) => {
            console.error(err);
            return undefined;
         });

      return products;
   };

   const getProductByIdRepo = async (
      id: number
   ): Promise<T_ProductVm | undefined> => {
      const response = await axios
         .get(`${productAdmApi}/${id}`, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => console.error(err.message));

      return response;
   };

   const sendNewProductRepo = async (
      data: T_ProductForm
   ): Promise<T_ProductVm | undefined> => {
      const response = await axios
         .post(productAdmApi, data, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => console.error(err.message));

      return response;
   };

   const getProductOptionsRepo = async (): Promise<
      T_ProductOption[] | undefined
   > => {
      const response = await axios
         .get(productOptApi, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => console.error(err.message));

      return response;
   };

   const updateProductRepo = async (data: T_ProductForm) => {
      const response = await axios
         .put(`${productAdmApi}/${data.product.id}`, data, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "multipart/form-data",
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => console.error(err.message));

      return response;
   };

   return {
      getProductListRepo,
      getProductByIdRepo,
      sendNewProductRepo,
      getProductOptionsRepo,
      updateProductRepo,
   };
};

export default useProductsHook;
