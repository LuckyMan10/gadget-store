import { configureStore } from "@reduxjs/toolkit";
import appVisibleSlice from "features/appVisible/appVisibleSlice";
import authSlice from "features/api/authApiSlice";
import {apiSlice} from "features/api/appApiSlice";
import cartSlice from "features/api/userCartApiSlice";
import favListSlice from "features/api/userFavListApiSlice";

export const store = configureStore({
  reducer: {
    appVisible: appVisibleSlice,
    auth: authSlice,
    cart: cartSlice,
    favList: favListSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
