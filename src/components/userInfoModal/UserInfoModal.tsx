import "./UserInfoModal.scss";
import Styled from "styled-components";
import Button from '@mui/material/Button';
import {MenuButton} from "components/buttons/Buttons";

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
            <div className="closeBtn-wrapper">
                <MenuButton menuVisible={userInfo} setMenuVisible={setUserInfo}/>
            </div>
            <h2 className="userInfoModal__email">{email}</h2>
            <p className="userInfoModal__cartInfo">Товаров в корзине: {cart_summ} шт.</p>
            <p className="userInfoModal__favInfo">Товаров в избранном: {fav_summ} шт.</p>
            <Button style={{backgroundColor: "rgba(64, 178, 89, 1)"}} variant="contained">Выйти</Button>
        </article>
    )
};
