import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../../redux-store/reduxStore";
import { serverApi } from "../../webApis/WebServerUrls";
import { T_ProductResult, T_ProductVm } from "../types/CatalogAdmTypes";

const useProducts = () => {
   const params = useAppSelector((x) => x.productParams);
   const token = useAppSelector((x) => x.token);
   const productAdmApi = `${serverApi}/ProductAdm`;

   const getProductListRepo = async (): Promise<
      T_ProductResult | undefined
   > => {
      const products = await axios
         .post(`${productAdmApi}`, params, {
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

   return { getProductListRepo, getProductByIdRepo };
};

export default useProducts;
