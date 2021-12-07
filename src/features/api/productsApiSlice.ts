import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import {productsApiInitState, fetchType, fetchProducts} from "types";

export const getProductCategory = createAsyncThunk(
  "products/getCategory",
  async ({
    api_key,
    baseURL,
    method,
    url,
    withCredentials,
  }: fetchType<fetchProducts>) => {
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
  }: fetchType<fetchProducts>) => {
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
  }: fetchType<fetchProducts>) => {
    const headers = {
      api_key
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
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
  }: fetchType<fetchProducts>) => {
    const headers = {
      api_key,
    };
    const httpHost = host({ withCredentials, baseURL, headers });
    const response = await createResponse({ method, url, httpHost });
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
    productName: "",
    price: 0,
    images: [],
    description: [],
    category: "",
    categoryRus: "",
    id: ""
  },
  productsLoaded: false,
  isWasFetched: false,
  oneProductLoaded: false,
  loading: false,
} as productsApiInitState;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toBackPage(state) {
      if (state.currentPage !== 1) {
        const itemsLength = state.productsEnd - state.productsStart;
        state.currentPage--;
        state.productsStart = state.productsStart - itemsLength;
        state.productsEnd = state.productsEnd - itemsLength;
        state.currentProducts = state.products.slice(state.productsStart, state.productsEnd);
      }
    },
    toForwardPage(state) {
      if (state.allPages !== state.currentPage) {
        const itemsLength = state.productsEnd - state.productsStart;
        state.currentPage++;
        state.productsStart = state.productsStart + itemsLength;
        state.productsEnd = state.productsEnd + itemsLength;
        state.currentProducts = state.products.slice(state.productsStart, state.productsEnd);
      }
    },
    clearOneProduct(state) {
      state.oneProduct = {
        company: "",
        productName: "",
        price: 0,
        images: [],
        description: [],
        category: "",
        categoryRus: "",
        id: ""
      };
      state.oneProductLoaded = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductCategory.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
        state.currentProducts = action.payload.slice(state.productsStart, state.productsEnd);
        state.allPages = Math.ceil(action.payload.length / state.productsEnd);
        state.isWasFetched = true;
        state.productsLoaded = true;
        state.loading = true;
      }
    });
    builder.addCase(getProductCategory.pending, (state) => {
      state.productsLoaded = false;
      state.products = [];
      state.currentProducts = [];
    })
    builder.addCase(getOneProduct.pending, (state) => {
      state.oneProductLoaded = false
    })
    builder.addCase(getOneProduct.fulfilled, (state, action) => {
      if (action.payload) {
        state.oneProduct = action.payload[0];
        state.isWasFetched = true;
        state.loading = true;
        state.oneProductLoaded = true;
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
      if (action.payload) {
        state.products = action.payload.products;
        state.currentProducts = action.payload.products.slice(state.productsStart, state.productsEnd);
        state.allPages = Math.ceil(action.payload.products.length / state.productsEnd);
        state.isWasFetched = true;
        state.loading = true;
      }
    })
  },
});

export const { toBackPage, toForwardPage, clearOneProduct } = productsSlice.actions
export default productsSlice.reducer;
