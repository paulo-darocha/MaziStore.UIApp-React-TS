import { createSlice } from "@reduxjs/toolkit";

const loggedSlice = createSlice({
   name: "loggedSlice",
   initialState: false,
   reducers: {
      loginRedux: (
         state: boolean,
         action: { type: string; payload: boolean }
      ) => {
         return (state = action.payload);
      },
   },
});

export const { loginRedux } = loggedSlice.actions;
export default loggedSlice.reducer;
