import axios, { AxiosError, AxiosResponse } from "axios";
import { serverApi } from "../../webApis/WebServerUrls";
import { useAppSelector } from "../../redux-store/reduxStore";
import { T_BrandVm } from "../admin-types/BrandTypes";

const useBrandsHook = () => {
   const brandsApi = `${serverApi}/brand-admin`;
   const token = useAppSelector((x) => x.token);

   const getBrandsRepo = async (): Promise<T_BrandVm[] | undefined> => {
      const response = axios
         .get(brandsApi, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => console.error(err.message));
      return response;
   };

   return { getBrandsRepo };
};

export default useBrandsHook;
