import axios, { AxiosError, AxiosResponse } from "axios";
import { useAppSelector } from "../../redux-store/reduxStore";
import { serverApi } from "../../webApis/WebServerUrls";
import { T_CategoryListItem } from "../admin-types/CategoryAdmTypes";

const useCategoriesApi = () => {
   const token = useAppSelector((x) => x.token);
   const categoriesAdmApi = `${serverApi}/category-admin`;

   const getCategoriesListRepo = async (): Promise<
      T_CategoryListItem | undefined
   > => {
      const products = await axios
         .post(`${categoriesAdmApi}`, {
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

   return { getCategoriesListRepo };
};

export default useCategoriesApi;
