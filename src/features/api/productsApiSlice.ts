import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import axios from "axios";

interface productI {
  company: string;
  name: string;
  price: number;
  images: string[];
  description: any[];
  category: string;
  id: string;
}

interface initialStateI {
  products: Array<productI>;
  oneProduct: productI;
  isWasFetched: boolean;
  loading: boolean;
  currentPage: number;
  allPages: number;
  productsStart: number;
  productsEnd: number;
  currentProducts: Array<productI>;
}
interface productsI {
  api_key: string;
  access_key?: string;
  baseURL: string;
  method: string;
  url: string;
  withCredentials: boolean;
  data?: {
    price?: number[];
    companies?: {[key: string]: boolean};
    category?: string;
  };
};

export const getProductCategory = createAsyncThunk(
  "products/getCategory",
  async ({
    api_key,
    baseURL,
    method,
    url,
    withCredentials,
  }: productsI) => {
    const headers = {
      api_key,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
    return response.data;
  }
);
export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async ({
    api_key,
    baseURL,
    method,
    url,
    withCredentials,
  }: productsI) => {
    const headers = {
      api_key,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
    return response.data;
  }
);
export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async ({
    api_key,
    baseURL,
    method,
    url,
    withCredentials
  }: productsI) => {
    const headers = {
      api_key
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost});
    return response.data;
  }
);
export const searchByHeader = createAsyncThunk(
  "products/searchByHeader",
  async ({
    api_key,
    baseURL,
    method,
    url,
    withCredentials
  }: productsI) => {
    const headers = {
      api_key,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost});
    return response.data;
  }
)


const initialState = {
  products: [],
  currentProducts: [],
  currentPage: 1,
  allPages: 0,
  productsStart: 0,
  productsEnd: 10,
  oneProduct: {
    company: "",
    name: "",
    price: 0,
    images: [],
    description: [],
    category: "",
    id: ""
  },
  isWasFetched: false,
  loading: false,
} as initialStateI;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //end - start
    toBackPage(state) {
      if(state.currentPage !== 1) {
        const itemsLength = state.productsEnd - state.productsStart;
        state.currentPage--;
        state.productsStart = state.productsStart - itemsLength;
        state.productsEnd = state.productsEnd - itemsLength;
        state.currentProducts = state.products.slice(state.productsStart, state.productsEnd);
      }
    },
    toForwardPage(state) {
      if(state.allPages !== state.currentPage) {
        const itemsLength = state.productsEnd - state.productsStart;
        state.currentPage++;
        state.productsStart = state.productsStart + itemsLength;
        state.productsEnd = state.productsEnd + itemsLength;
        state.currentProducts = state.products.slice(state.productsStart, state.productsEnd);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductCategory.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
        state.currentProducts = action.payload.slice(state.productsStart, state.productsEnd);
        state.allPages = Math.ceil(action.payload.length / state.productsEnd);
        state.isWasFetched = true;
        state.loading = true;
      }
    });
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.oneProduct = action.payload[0];
        state.isWasFetched = true;
        state.loading = true;
      }
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
        state.currentProducts = action.payload.slice(state.productsStart, state.productsEnd);
        state.allPages = Math.ceil(action.payload.length / state.productsEnd);
        state.isWasFetched = true;
        state.loading = true;
      }
    });
    builder.addCase(searchByHeader.fulfilled, (state, action) => {
      if(action.payload) {
        state.products = action.payload.products;
        state.currentProducts = action.payload.products.slice(state.productsStart, state.productsEnd);
        state.allPages = Math.ceil(action.payload.products.length / state.productsEnd);
        state.isWasFetched = true;
        state.loading = true;
      }
    })
  },
});

export const {toBackPage, toForwardPage} = productsSlice.actions
export default productsSlice.reducer;
