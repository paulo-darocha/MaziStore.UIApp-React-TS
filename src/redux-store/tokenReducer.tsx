import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
   name: "tokenSlice",
   initialState: "x",
   reducers: {
      setToken: (
         state: string,
         action: { type: string; payload: string }
      ) => {
         return (state = action.payload);
      },
   },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
