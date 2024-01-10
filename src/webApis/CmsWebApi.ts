import axios from "axios";
import { serverApi } from "./CoreWebApi";
import { T_WidgetInstanceViewModel } from "../types/CoreTypes";

const carouselServerApi = `${serverApi}/CarouselWidget`;

export const getCarouselData = async (data: T_WidgetInstanceViewModel) => {
   const response = await axios.post(`${carouselServerApi}`, data);
   if (response.status == 200) {
      return response.data;
   }
};
