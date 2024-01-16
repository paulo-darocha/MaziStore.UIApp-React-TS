import { createSlice } from "@reduxjs/toolkit";

const modifiedSlice = createSlice({
   name: "modifiedSlice",
   initialState: false,
   reducers: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setModified: (state: boolean) => {
         console.log("M O D I F I E D");
         return (state = !state);
      },
   },
});

export const { setModified } = modifiedSlice.actions;
export default modifiedSlice.reducer;
