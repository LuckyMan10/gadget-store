import "./UserInfoModal.scss";
import Styled from "styled-components";
import Button from '@mui/material/Button';
import {MenuButton} from "components/buttons/Buttons";
import React from 'react';

interface userInfoModalI {
    email: string;
    cart_summ: number;
    fav_summ: number;
    setUserInfo(value: boolean): void;
    userInfo: boolean;
};

export const UserInfoModal = ({email, cart_summ, fav_summ, setUserInfo, userInfo}: userInfoModalI) => {
    return (
        <article className="userInfoModal">
            <div className="content-wrapper">
            <div className="closeBtn-wrapper">
                <MenuButton menuVisible={userInfo} setMenuVisible={setUserInfo}/>
            </div>
            <h2 className="userInfoModal__email">{email}</h2>
            <p className="userInfoModal__cartInfo">Товаров в корзине: {cart_summ} шт.</p>
            <p className="userInfoModal__favInfo">Товаров в избранном: {fav_summ} шт.</p>
            <Button id="toLogout" style={{backgroundColor: "rgba(64, 178, 89, 1)"}} variant="contained">Выйти</Button>
            </div>
        </article>
    )
};
