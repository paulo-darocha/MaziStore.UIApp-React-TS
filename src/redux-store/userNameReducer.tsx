import { createSlice } from "@reduxjs/toolkit";

const usernameSlice = createSlice({
   name: "usernameSlice",
   initialState: "",
   reducers: {
      setUsername: (
         state: string | undefined,
         action: { type: string; payload: string }
      ) => {
         return (state = action.payload);
      },
   },
});

export const { setUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
