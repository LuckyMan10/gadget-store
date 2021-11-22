import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appVisibleStateI {
  menuVisible: boolean;
  authModalVisible: boolean;
}

const initialState: appVisibleStateI = {
  menuVisible: false,
  authModalVisible: false
};

const appVisibleSlice = createSlice({
  name: "appVisibleState",
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




export const {setMenuVisible, setAuthModalVisible} = appVisibleSlice.actions;
export default appVisibleSlice.reducer;
