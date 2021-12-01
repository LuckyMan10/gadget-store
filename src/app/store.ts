import { configureStore } from "@reduxjs/toolkit";
import appVisibleSlice from "features/appVisible/appVisibleSlice";
import authSlice from "features/api/authApiSlice";
import {apiSlice} from "features/api/appApiSlice";
import cartSlice from "features/api/userCartApiSlice";
import favListSlice from "features/api/userFavListApiSlice";
import productSlice from "features/api/productsApiSlice";
import notAuthCartSlice from "features/api/notAuthCartApiSlice";
import anonymFavSlice from "features/api/notAuthFavApiSlice";

export const store = configureStore({
  reducer: {
    appVisible: appVisibleSlice,
    auth: authSlice,
    cart: cartSlice,
    favList: favListSlice,
    products: productSlice,
    anonymCart: notAuthCartSlice,
    anonymFav: anonymFavSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
