import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface appVisibleStateI {
  menuVisible: boolean;
  authModalVisible: boolean;
  loginForm: boolean;
  regForm: boolean;
  userInfo: boolean;
}

const initialState: appVisibleStateI = {
  menuVisible: false,
  authModalVisible: false,
  loginForm: false,
  regForm: false,
  userInfo: false
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
    },
    setLoginForm(state, action: PayloadAction<boolean>) {
      state.loginForm = action.payload;
    },
    setRegForm(state, action: PayloadAction<boolean>) {
      state.regForm = action.payload;
    },
    setUserInfo(state, action: PayloadAction<boolean>) {
      state.userInfo = action.payload
    }
  },
});




export const {
  setMenuVisible,
  setAuthModalVisible,
  setLoginForm,
  setRegForm,
  setUserInfo
} = appVisibleSlice.actions;

export default appVisibleSlice.reducer;
