import { createSlice } from "@reduxjs/toolkit";
import { T_ProductVm } from "../admin-types/CatalogAdmTypes";

// const initialState: T_ProductVm = {
//    shortDescription: "",
//    description: "",
//    specification: "",
//    name: "",
//    slug: "",
//    brandId: 0,
//    sku: "",
//    gtin: "",
//    price: 0,
//    oldPrice: 0,
//    specialPrice: 0,
//    specialPriceStart: new Date(),
//    specialPriceEnd: new Date(),
//    stockTrackingIsEnabled: false,
//    taxClassId: 0,
//    thumbnailImageUrl: "",
//    isFeatured: false,
//    isPublished: true,
//    isCallForPricing: false,
//    isAllowToOrder: true,
// }

type T_Action = {
   type: string;
   payload: T_ProductVm;
};

const editingProductSlice = createSlice({
   name: "editingProduct",
   initialState: {} as T_ProductVm,
   reducers: {
      addEditingProduct: (state: T_ProductVm, action: T_Action) =>
         (state = { ...action.payload }),
   },
});

export const { addEditingProduct } = editingProductSlice.actions;
export default editingProductSlice.reducer;
