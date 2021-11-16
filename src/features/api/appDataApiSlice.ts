import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appDataStateI {
  menuVisible: boolean;
  authModalVisible: boolean;
  appDataItems: Array<{
    id: string;
    route: string;
    img: string;
    categories: string[];
    firms: string[];
  }>;
}

const initialState: appDataStateI = {
  menuVisible: false,
  authModalVisible: false,
  appDataItems: [
    {
      id: "1",
      route: "/smartphones",
      img: "navIcon0",
      categories: ["Смартфоны", "smartphones"],
      firms: ["Apple", "Samsung", "LG", "Xiaomi"],
    },
    {
      id: "2",
      route: "/tablets",
      img: "navIcon1",
      categories: ["Планшеты", "tablets"],
      firms: ["Apple", "DEXP", "Huawei", "Irbis", "Lenovo"],
    },
    {
      id: "3",
      route: "/e-book",
      img: "navIcon2",
      categories: ["Электронные книги", "e-book"],
      firms: ["DEXP", "Digma", "Onyx Boox", "BocketBook"],
    },
    {
      id: "4",
      route: "/smart-watches",
      img: "navIcon3",
      categories: ["Смарт-часы", "smart-watches"],
      firms: ["Apple", "HONOR", "Huawei", "Samsung"],
    },
    {
      id: "5",
      route: "/smartphone-acc",
      img: "navIcon4",
      categories: ["Аксессуары для смартфонов", "smartphone-acc"],
      firms: ["Aceline", "Apple", "Deppa", "DF", "HONOR"],
    },
    {
      id: "6",
      route: "/tablet-acc",
      img: "navIcon5",
      categories: ["Аксессуары для планшетов", "tablet-acc"],
      firms: ["Aceline", "Apple", "Deppa", "DF", "HONOR"],
    },
    {
      id: "7",
      route: "/e-book-acc",
      img: "navIcon6",
      categories: ["Аксессуары для электронных книг", "e-book-acc"],
      firms: ["Aceline", "DEXP", "InterStep", "Onyx Boox"],
    },
    {
      id: "8",
      route: "/smartphone-detail",
      img: "navIcon7",
      categories: ["Запчасти для смартфонов", "smartphone-detail"],
      firms: ["Craftmann", "Partner"],
    },
  ],
};

const appDataSlice = createSlice({
  name: "appDataItems",
  initialState,
  reducers: {
    setMenuVisible(state, action: PayloadAction<boolean>) {
      state.menuVisible = action.payload;
    },
    setAuthModalVisible(state, action: PayloadAction<boolean>) {
      state.authModalVisible = action.payload;
    }
  },
});

export const {setMenuVisible, setAuthModalVisible} = appDataSlice.actions;
export default appDataSlice.reducer;
