import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import axios from "axios";

interface productI {
  productId: string;
  quantity: number;
}

interface initialStateI {
  userCart: {
    userId: string;
    products: productI[];
  };
  loading: boolean;
}

interface userCartI {
    api_key: string;
    access_key: string;
    baseURL: string;
    method: string;
    url: string;
    withCredentials: boolean;
    data?: {
        username?: string;
        email?: string;
        password?: string;
        productId?: string;
        type?: string;
    }
}

export const getUserCart = createAsyncThunk(
  "user/getCart",
  async ({api_key, access_key, baseURL, method, url, withCredentials}: userCartI) => {
    const headers = {
      api_key,
      authorization: `Bearer ${access_key}`,
    };
    const httpHost = host({withCredentials, baseURL, headers});
    const response = await createResponse({method, url, httpHost});
    return response;
  }
);

export const updateUserCart = createAsyncThunk(
    "user/putCart",
    async ({api_key, access_key, baseURL, method, url, withCredentials, data}: userCartI) => {
        const headers = {
            api_key,
            authorization: `Bearer ${access_key}`,
        };
        const httpHost = host({withCredentials, baseURL, headers});
        const response = await createResponse({method, url, httpHost, data});
        return response;
    }
);



const initialState = {
  userCart: {
      userId: "",
      products: [],
  },
  loading: false,
} as initialStateI;

const cartSlice = createSlice({
  name: "authCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserCart.fulfilled, (state, action) => {
      state.userCart.userId = action.payload.userId;
      state.userCart.products.push(action.payload);
      state.loading = true;
    });
  },
});

export default cartSlice.reducer;
//dispatch(registration(123))
