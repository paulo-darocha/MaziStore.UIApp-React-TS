import { createSlice } from "@reduxjs/toolkit";
import {
   T_SearchObject,
   T_SmartTableParam,
   T_Sort,
} from "../admin-app/admin-types/UserTypes";

const initialState: T_SmartTableParam = {
   pagination: { start: 0, totalItemCount: 0, number: 200 },
   search: {},
   sort: {},
};

type T_Action = { type: string; payload: T_Sort };

type searchAction = {
   type: string;
   payload: T_SearchObject;
};

const paramsSlice = createSlice({
   name: "userParams",
   initialState: initialState,
   reducers: {
      toggleSort: (state: T_SmartTableParam, action: T_Action) => {
         return { ...state, sort: action.payload };
      },
      addSearch: (state: T_SmartTableParam, action: searchAction) => {
         state.search.predicateObject = action.payload;
      },
   },
});

export const { toggleSort, addSearch } = paramsSlice.actions;
export default paramsSlice.reducer;

// const initialState: T_SmartTableParam = {
//    pagination: { start: 0, totalItemCount: 0, number: 200 },
//    search: {
//       predicateObject: {
//          Email: undefined,
//          FullName: undefined,
//          RoleId: undefined,
//          CustomerGroupId: undefined,
//          CreatedOn: undefined,
//       },
//    },
//    sort: {},
// };
