import axios, { AxiosError, AxiosResponse } from "axios";
import { serverApi } from "../../webApis/WebServerUrls";
import { useAppSelector } from "../../redux-store/reduxStore";
import { T_Tax } from "../admin-types/TaxTypes";

const useTaxHook = () => {
   const taxApi = `${serverApi}/tax-class-admin`;
   const token = useAppSelector((x) => x.token);

   const getTaxesRepo = async (): Promise<T_Tax[] | undefined> => {
      const response = axios
         .get(`${taxApi}`, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => console.error(err.message));
      return response;
   };

   return { getTaxesRepo };
};

export default useTaxHook;
