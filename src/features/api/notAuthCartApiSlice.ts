import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import { getProductsList, getOneProduct } from "./anonymCartApi";
import {setWithExpiry, localStorageSave} from "helpers/localStorage";
import {
  getSumm
} from "helpers/getSumm";
import { v4 } from "uuid";
import {
  notAuthInitState,
  productCardType,
  getSummObjType
} from "types";

export const getAnonymUserCart = createAsyncThunk("anonym/cart", async () => {
  try {
    const userData = localStorage.getItem("anonymUser");
    if (userData) {
      const userObj = JSON.parse(userData);
      const productsList = Object.keys(userObj.productList);
      if (productsList.length !== 0) {
        const originalIdList = productsList.map(
          (el) => userObj.productList[el].originalId
        );
        const response = await getProductsList(originalIdList);
        return response?.data;
      }
      if (productsList.length === 0) {
        return null;
      }
    }
  } catch (e) {
    throw e;
  }
});
export const getOneProductById = createAsyncThunk(
  "anonym/getOne",
  async (productId: string) => {
    try {
      const response = await getOneProduct(productId);
      return response?.data;
    } catch (e) {
      throw e;
    }
  }
);

const initialState = {
  userCart: {
    anonymUserId: "",
    products: {},
    productsSummPrice: 0,
  },
  isWasFetched: false,
  loading: false,
} as notAuthInitState;

const anonymCartSlice = createSlice({
  name: "anonymCart",
  initialState,
  reducers: {
    createAnonymUser(state) {
      const id = v4();
      setWithExpiry(id, 86400000);
      state.userCart.anonymUserId = id;
    },
    updateProduct(state, action: PayloadAction<{ id: string; type: string }>) {
      const id = action.payload.id.replace(/-/g, "");
      const type = action.payload.type;
      type === "INCREMENT" && state.userCart.products[id].quantity++;
      type === "DECREMENT" && state.userCart.products[id].quantity--;
      //@ts-ignore
      const summ = getSumm<getSummObjType>(state.userCart.products);
      state.userCart.productsSummPrice = summ;
      const anonymUser = localStorage.getItem("anonymUser");
      anonymUser && localStorageSave(anonymUser, id, type);
    },
    removeProduct(state, action: PayloadAction<string>) {
      const id = action.payload.replace(/-/g, "");
      delete state.userCart.products[id];
      const anonymUser = localStorage.getItem("anonymUser");
      anonymUser && localStorageSave(anonymUser, id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAnonymUserCart.fulfilled, (state, action) => {
      const userData = localStorage.getItem("anonymUser");
      if (userData && action.payload) {
        const userObj = JSON.parse(userData);
        if (
          Object.keys(userObj.productList).length !== 0 &&
          action.payload !== null
        ) {
          action.payload.forEach((el: productCardType) => {
            state.userCart.products[el.id.replace(/-/g, "")] = {
              //@ts-ignore
              productData: el,
              productId: el.id,
              quantity: userObj.productList[el.id.replace(/-/g, "")].quantity,
            };
          });
          //@ts-ignore
          const summ = getSumm<getSummObjType>(state.userCart.products);
          state.userCart.productsSummPrice = summ;
          state.isWasFetched = true;
          state.loading = true;
        }
      }
      if (action.payload === null) {
        console.log("empty");
        state.isWasFetched = true;
        state.loading = true;
      }
    });
    builder.addCase(getOneProductById.fulfilled, (state, action) => {
      const anonymUser = localStorage.getItem("anonymUser");
      const id = action.payload[0].id.replace(/-/g, "");
      if (anonymUser) {
        const cartData = JSON.parse(anonymUser);
        cartData.productList[id] = {
          quantity: 1,
          originalId: action.payload[0].id,
        };
        //@ts-ignore
        state.userCart.products[id] = {
          productData: action.payload[0],
          quantity: 1,
        };
        //@ts-ignore
        const summ = getSumm<getSummObjType>(state.userCart.products);
        state.userCart.productsSummPrice = summ;
        localStorage.setItem("anonymUser", JSON.stringify(cartData));
        state.isWasFetched = true;
        state.loading = true;
      }
    });
  },
});
export const {
  createAnonymUser,
  updateProduct,
  removeProduct
  } = anonymCartSlice.actions;
export default anonymCartSlice.reducer;
