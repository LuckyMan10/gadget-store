import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import { getProductsList, getOneProduct } from "./anonymCartApi";
import axios from "axios";
import { v4 } from "uuid";

interface initialStateI {
  userCart: {
    anonymUserId: string;
    productsSummPrice: number;
    products: {
      [key: string]: {
        productId: string;
        quantity: number;
        productData: productI;
      };
    };
    favoriteList: {
      [key: string]: {
        productId: string;
        productData: productI;
      };
    };
  };
  loading: boolean;
  isWasFetched: boolean;
}

interface productI {
  company: string;
  name: string;
  price: number;
  images: string[];
  description: any[];
  category: string;
  id: string;
}

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
    favoriteList: {},
    productsSummPrice: 0,
  },
  isWasFetched: false,
  loading: false,
} as initialStateI;

const anonymCartSlice = createSlice({
  name: "anonymCart",
  initialState,
  reducers: {
    createAnonymUser(state) {
      function setWithExpiry(id: string, ttl: number) {
        const now = new Date();
        const favoriteList = {};
        const productList = {};
        const item = {
          id,
          favoriteList,
          productList,
          expiry: now.getTime() + ttl,
        };
        localStorage.setItem("anonymUser", JSON.stringify(item));
      }
      const id = v4();
      setWithExpiry(id, 86400000);
      state.userCart.anonymUserId = id;
    },
    updateProduct(state, action: PayloadAction<{id: string, type: string}>) {
      const id = action.payload.id.replace(/-/g, "");
      action.payload.type === "INCREMENT" && state.userCart.products[id].quantity++;
      action.payload.type === "DECREMENT" && state.userCart.products[id].quantity--;
      state.userCart.productsSummPrice = Object.keys(
        state.userCart.products
      ).reduce(
        (acc, el) =>
          acc +
          state.userCart.products[el].productData.price *
            state.userCart.products[el].quantity,
        0
      );
      const anonymUser = localStorage.getItem("anonymUser");
      if (anonymUser) {
        const cartData = JSON.parse(anonymUser);
        action.payload.type === "INCREMENT" && cartData.productList[id].quantity++;
        action.payload.type === "DECREMENT" && cartData.productList[id].quantity--;
        localStorage.setItem("anonymUser", JSON.stringify(cartData));
      }
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getAnonymUserCart.fulfilled, (state, action) => {
      const userData = localStorage.getItem("anonymUser");
      if (userData && action.payload) {
        const userObj = JSON.parse(userData);
        if (Object.keys(userObj.productList).length !== 0) {
          action.payload.forEach((el: productI) => {
            state.userCart.products[el.id.replace(/-/g, "")] = {
              //@ts-ignore
              productData: el,
              productId: el.id,
              quantity: userObj.productList[el.id.replace(/-/g, "")].quantity,
            };
          });
          state.userCart.productsSummPrice = Object.keys(
            state.userCart.products
          ).reduce(
            (acc, el) =>
              acc +
              state.userCart.products[el].productData.price *
                state.userCart.products[el].quantity,
            0
          );
          state.isWasFetched = true;
          state.loading = true;
        }
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
        state.userCart.productsSummPrice = Object.keys(
          state.userCart.products
        ).reduce(
          (acc, el) =>
            acc +
            state.userCart.products[el].productData.price *
              state.userCart.products[el].quantity,
          0
        );
        localStorage.setItem("anonymUser", JSON.stringify(cartData));
        state.isWasFetched = true;
        state.loading = true;
      }
    });
  },
});
export const { createAnonymUser, updateProduct } = anonymCartSlice.actions;
export default anonymCartSlice.reducer;

/*
 1. Проверить, авторизован ли пользователь
 2. Если нет, запустить createAnonymUser
 3. Если пользователь добавил продукт, то:
    1. Проверить, есть ли в корзине уже такой id
    2. Если нет, то получить этот продукт через getOneProductById
        1. Сохранить в localStorage объект типа {id: productId, quantity}
        2. Сохранить в state объект типа id: {productData, quantity}
    3. Если продукт есть, то:
        1. В localStorage storage.productList.filter((el) => el.id === id) > quantity++
        2. В state state.products[id] > quantity++
 4. Если пользователь удалил продукт, то:
    1. Удалить по id элемент из корзины + из localStorage
 5. Если пользователь уменьшил количество продукта в корзине:
    1. В state state.products[id] > quantity--
    2. В localStorage storage.productList.filter((el) => el.id === id) > quantity--

*/

/*
  reducers: {
    setMenuVisible(state, action: PayloadAction<boolean>) {
      state.menuVisible = action.payload;
    },
    setAuthModalVisible(state, action: PayloadAction<boolean>) {
      state.authModalVisible = action.payload;
    }
  },


      function getWithExpiry(key) {
        const anonymUser = localStorage.getItem(key);
        if (!anonymUser) {
          return null;
        }
        const item = JSON.parse(anonymUser);
        const now = new Date();
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(anonymUser);
          return null;
        }
      }


  extraReducers: (builder) => {
    builder.addCase(registration.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = true;
      state.isAuth = true;
    });
*/
