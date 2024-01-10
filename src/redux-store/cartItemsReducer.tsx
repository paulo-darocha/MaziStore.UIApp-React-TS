import { createSlice } from "@reduxjs/toolkit";

const cartItemsSlice = createSlice({
   name: "cartItemsSlice",
   initialState: 0,
   reducers: {
      setItemsCount: (
         state: number,
         action: { type: string; payload: number }
      ) => {
         return (state = action.payload);
      },
   },
});

export const { setItemsCount } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
