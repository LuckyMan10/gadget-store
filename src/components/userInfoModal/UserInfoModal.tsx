import "./UserInfoModal.scss";
import Button from '@mui/material/Button';
import { MenuButton } from "components/buttons/Buttons";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setUserInfo, setMenuVisible } from "features/appVisible/appVisibleSlice";

interface userInfoModalI {
    email: string;
    cart_summ: number;
    fav_summ: number;
};

export const UserInfoModal = ({ email, cart_summ, fav_summ }: userInfoModalI) => {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector((state) => state.appVisible);
    function clickHandler() {
        dispatch(setUserInfo(false));
        dispatch(setMenuVisible(false));
    }

    return (
        <article className="userInfoModal">
            <div className="content-wrapper">
                <div className="closeBtn-wrapper">
                    <MenuButton
                        type={userInfo}
                        clickButton={clickHandler}
                    />
                </div>
                <h2 className="userInfoModal__email">{email}</h2>
                <p className="userInfoModal__cartInfo">Товаров в корзине: {cart_summ} шт.</p>
                <p className="userInfoModal__favInfo">Товаров в избранном: {fav_summ} шт.</p>
                <Button id="toLogout" style={{ backgroundColor: "rgba(64, 178, 89, 1)" }} variant="contained">Выйти</Button>
            </div>
        </article>
    )
};
