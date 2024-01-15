import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
   name: "idSlice",
   initialState: 0,
   reducers: {
      setId: (
         state: number,
         action: { type: string; payload: number }
      ) => {
         return (state = action.payload);
      },
   },
});

export const { setId } = idSlice.actions;
export default idSlice.reducer;
