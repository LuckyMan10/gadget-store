import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type button = Array<{ id: string, text: string }>

type initialState = {
    notAuthButtons: button;
    authButtons: button;
}

const initialState: initialState = {
    notAuthButtons: [
        { id: 'favorite', text: "Избранное" },
        { id: 'cart', text: "Корзина" },
        { id: 'toAuth', text: "Авторизация" },
        { id: 'toReg', text: "Регистрация" },
    ],
    authButtons: [
        { id: "favorite", text: "Избранное" },
        { id: 'cart', text: "Корзина" },
        { id: 'logout', text: "Выйти" },
    ]
}

const appLocalSlice = createSlice({
    name: "appLocalSlice",
    initialState,
    reducers: {}
});

export default appLocalSlice.reducer;
