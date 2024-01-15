import axios from "axios";
import { serverApi } from "./CoreWebApi";
import { T_WidgetInstanceViewModel } from "../types/CoreTypes";

const carouselServerApi = `${serverApi}/CarouselWidget`;

export const getCarouselData = async (data: T_WidgetInstanceViewModel) => {
   console.log(data)
   const response = await axios.post(`${carouselServerApi}`, data, {
      headers: { "Content-Type": "application/json" }
   });
   if (response.status == 200) {
      return response.data;
   }
};
