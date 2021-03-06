import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductsList, getOneProduct } from "./anonymCartApi";
import { localStorageSave } from "helpers/localStorage";
import {notAuthFavInitState, productCardType} from "types";

export const getOneProductByIdFav = createAsyncThunk(
  "anonym/getOneFav",
  async (productId: string) => {
    try {
      const anonymUser = localStorage.getItem("anonymUser");
      const id = productId.replace(/-/g, "");
      if (anonymUser) {
        const anonymUserData = JSON.parse(anonymUser);
        if (anonymUserData.favoriteList[id]) {
          throw "Товар уже есть в избранных";
        }
      }
      const response = await getOneProduct(productId);
      return response?.data;
    } catch (e) {
      throw e;
    }
  }
);
export const getAnonymFavList = createAsyncThunk("anonymFav/list", async () => {
  try {
    const userData = localStorage.getItem("anonymUser");
    if (userData) {
      const userObj = JSON.parse(userData);
      const favoriteList = Object.keys(userObj.favoriteList);
      if (favoriteList.length !== 0) {
        const originalIdList = favoriteList.map(
          (el) => userObj.favoriteList[el].originalId
        );
        const response = await getProductsList(originalIdList);
        return response?.data;
      }
      if (favoriteList.length === 0) {
        return null;
      }
    }
  } catch (e) {
    throw e;
  }
});

const initialState = {
  userFav: {
    anonymUserId: "",
    favoriteList: {},
  },
  isEmpty: false,
  loading: true,
} as notAuthFavInitState;

const anonymFavSlice = createSlice({
  name: "anonymFav",
  initialState,
  reducers: {
    removeFavProduct(state, action: PayloadAction<string>) {
      const id = action.payload.replace(/-/g, "");
      delete state.userFav.favoriteList[id];
      const anonymUser = localStorage.getItem("anonymUser");
      anonymUser && localStorageSave(anonymUser, id);
      if(Object.keys(state.userFav.favoriteList).length === 0) {
        state.isEmpty = true
      } else {
        state.isEmpty = false
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneProductByIdFav.fulfilled, (state, action) => {
      const anonymUser = localStorage.getItem("anonymUser");
      const id = action.payload[0].id.replace(/-/g, "");
      if (anonymUser) {
        const anonymUserData = JSON.parse(anonymUser);
        if (!anonymUserData.favoriteList[id]) {
          anonymUserData.favoriteList[id] = {
            originalId: action.payload[0].id,
          };
          //@ts-ignore
          state.userFav.favoriteList[id] = {
            productData: action.payload[0],
          };
          localStorage.setItem("anonymUser", JSON.stringify(anonymUserData));
          if(Object.keys(state.userFav.favoriteList).length === 0) {
            state.isEmpty = true
          } else {
            state.isEmpty = false
          }
          state.loading = false;
        }
      }
    });
    builder.addCase(getAnonymFavList.fulfilled, (state, action) => {
      const userData = localStorage.getItem("anonymUser");
      if (userData && action.payload) {
        const userObj = JSON.parse(userData);
        if (
          Object.keys(userObj.favoriteList).length !== 0 &&
          action.payload !== null
        ) {
          action.payload.forEach((el: productCardType) => {
            state.userFav.favoriteList[el.id.replace(/-/g, "")] = {
              //@ts-ignore
              productData: el,
              productId: el.id,
            };
          });
          state.loading = false;
          if(Object.keys(state.userFav.favoriteList).length === 0) {
            state.isEmpty = true
          } else {
            state.isEmpty = false
          }
        }
      }
      if (action.payload === null) {
        state.loading = false;
        state.isEmpty = true
      }
    });
  },
});

export default anonymFavSlice.reducer;
export const { removeFavProduct } = anonymFavSlice.actions;
