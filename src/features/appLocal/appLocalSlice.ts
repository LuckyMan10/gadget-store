import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type button = Array<{ id: string, text: string, type?: string }>

type initialState = {
    notAuthButtons: button;
    authButtons: button;
    cartButtons: button;
    favButtons: button;
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
    ],
    cartButtons: [
        { id: "toFavorite", text: "В избранное", type: "toFavorite" },
        { id: "toRemove", text: "Удалить", type: "toRemove" }
    ],
    favButtons: [
        { id: "toCart", text: "Добавить в корзину", type: "toCart" },
        { id: "toRemove", text: "Удалить", type: "toRemove" }
    ]
}

const appLocalSlice = createSlice({
    name: "appLocalSlice",
    initialState,
    reducers: {}
});

export default appLocalSlice.reducer;
