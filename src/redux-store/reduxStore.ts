import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartItemsReducer from "./cartItemsReducer";
import userNameReducer from "./userNameReducer";
import tokenReducer from "./tokenReducer";
import idReducer from "./idReducer";
import modifiedReducer from "./modifiedReducer";
import userParamReducer from "./userParamReducer";

export const reduxStore = configureStore({
   reducer: {
      token: tokenReducer,
      items: cartItemsReducer,
      username: userNameReducer,
      id: idReducer,
      modified: modifiedReducer,
      params: userParamReducer,
   },
});

export type AppState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
