import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { host, createResponse } from "./http/index";
import { getProductsList, getOneProduct } from "./anonymCartApi";
import { localStorageSave } from "helpers/localStorage";

interface initialStateI {
  userFav: {
    anonymUserId: string;
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
  isWasFetched: false,
  loading: false,
} as initialStateI;

const anonymFavSlice = createSlice({
  name: "anonymFav",
  initialState,
  reducers: {
    removeFavProduct(state, action: PayloadAction<string>) {
      const id = action.payload.replace(/-/g, "");
      delete state.userFav.favoriteList[id];
      const anonymUser = localStorage.getItem("anonymUser");
      anonymUser && localStorageSave(anonymUser, id);
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
          state.isWasFetched = true;
          state.loading = true;
        }
      }
    });
    builder.addCase(getOneProductByIdFav.rejected, (state, action) => {
      console.log("action: ", action.error.message);
    });
    builder.addCase(getAnonymFavList.fulfilled, (state, action) => {
      const userData = localStorage.getItem("anonymUser");
      if (userData && action.payload) {
        const userObj = JSON.parse(userData);
        if (
          Object.keys(userObj.favoriteList).length !== 0 &&
          action.payload !== null
        ) {
          action.payload.forEach((el: productI) => {
            state.userFav.favoriteList[el.id.replace(/-/g, "")] = {
              //@ts-ignore
              productData: el,
              productId: el.id,
            };
          });
          state.isWasFetched = true;
          state.loading = true;
          if (action.payload === null) {
            console.log("empty");
            state.isWasFetched = true;
            state.loading = true;
          }
        }
      }
    });
  },
});

export default anonymFavSlice.reducer;
export const { removeFavProduct } = anonymFavSlice.actions;

/*
Для FavList нужно:
    1. Возможность добавить продукт в список избранных.
    2. Возможность его оттуда удалить.
    3. Возможность добавить его в корзину.
    4. У продукта в избранном не может быть количества. По умолчанию - 1.
*/
