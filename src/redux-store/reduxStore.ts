import { configureStore } from "@reduxjs/toolkit";
import loggedReducer from "./loggedReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const reduxStore = configureStore({
   reducer: { logged: loggedReducer },
});

export type AppState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

type DispatchFunction = () => AppDispatch;

export const useAppDispatch: DispatchFunction = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
