import axios from "axios";

export const server = "https://localhost:7000";
export const serverApi = `${server}/api`;

const homeServerApi = `${serverApi}/home`;

export const getHomeWidgets = async () => {
   const response = await axios.get(`${homeServerApi}`);
   console.log(`${response.status}: ${response.statusText}`);
   if (response.status === 200) {
      return response.data;
   }
};

export const getImage = async (url: string) => {
   const response = await axios.get(`${server}/${url}`, {
      responseType: "blob",
   });
   console.log(`${response.status}: ${response.statusText}`);
   if (response.status === 200) {
      return response.data;
   }
};

