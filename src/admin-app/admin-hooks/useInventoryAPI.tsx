import axios, { AxiosError, AxiosResponse } from "axios";
import { serverApi } from "../../webApis/WebServerUrls";
import { useAppSelector } from "../../redux-store/reduxStore";
import { T_Warehouse } from "../admin-types/InventoryTypes";

const useInventoryAPI = () => {
   const warehouseApi = `${serverApi}/WarehouseAdm`;
   const token = useAppSelector((x) => x.token);

   const getWarehouseListRepo = async (): Promise<
      T_Warehouse[] | undefined
   > => {
      const response = axios
         .get(warehouseApi, {
            withCredentials: true,
            headers: {
               Authorization: `Bearer ${token}`,
            },
         })
         .then((res: AxiosResponse) => res.data)
         .catch((err: AxiosError) => console.error(err.message));
      return response;
   };

   return { getWarehouseListRepo };
};

export default useInventoryAPI;
