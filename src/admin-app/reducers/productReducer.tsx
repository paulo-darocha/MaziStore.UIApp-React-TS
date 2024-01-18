import { createSlice } from "@reduxjs/toolkit";
import { T_SearchObject, T_SmartTableParam } from "../types/UserTypes";

const initialState: T_SmartTableParam = {
   pagination: { start: 0, totalItemCount: 0, number: 200 },
   search: {
      predicateObject: {
         Name: null,
         HasOptions: null,
         isVisibleIndividually: null,
         isPublished: null,
         CreatedOn: null,
      },
   },
   sort: {},
};

type sortAction = {
   type: string;
   payload: string;
};

type searchAction = {
   type: string;
   payload: T_SearchObject;
};

const productParamsSlice = createSlice({
   name: "productParams",
   initialState: initialState,
   reducers: {
      toggleSort1: (state: T_SmartTableParam, action: sortAction) => {
         console.log("<< paramsReducer > toggleSort >>", action);
         if (state.sort.predicate == null) {
            state.sort = {
               predicate: action.payload,
               reverse: false,
            };
         } else if (!state.sort.reverse) {
            state.sort = {
               predicate: action.payload,
               reverse: true,
            };
         } else {
            state.sort = {};
         }
      },
      addSearch1: (state: T_SmartTableParam, action: searchAction) => {
         console.log("<< paramsReducer > addSearch >>", action);
         state.search!.predicateObject = action.payload;
      },
   },
});

export const { toggleSort1, addSearch1 } = productParamsSlice.actions;
export default productParamsSlice.reducer;
