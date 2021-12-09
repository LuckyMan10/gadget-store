import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
    getUserCart,
    updateUserCart,
    deleteUserCart,
} from "features/api/userCartApiSlice";
import { updateUserFavList } from "features/api/userFavListApiSlice";
import { NotificationModal } from "components/notificationModal/NotificationModal";
import { ProductItemComponent } from "components/productItem/ProductItem";
import { BuyButtonComponent } from "components/buttons/Buttons";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { cartEnum } from "./enum";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./CartProductList.scss";
import "./CartItem.scss";
import { useNavigate } from 'react-router-dom';


const AuthCart: React.FC<{ title: string }> = ({ title }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>("");
    const [notification, setNotification] = useState<boolean>(false);
    const { user } = useAppSelector((state) => state.auth);
    const { userCart, loading, isEmpty, isWaitUpdate } = useAppSelector(
        (state) => state.cart
    );
    const { cartButtons } = useAppSelector(
        (state) => state.appLocal
    )
    useEffect(() => {
        dispatch(
            getUserCart({
                api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
                access_key: user.accessToken,
                baseURL: `${process.env.REACT_APP_API_URL}/api/user`,
                method: "get",
                url: "/cart",
                withCredentials: true,
            })
        );
    }, [])
    const handleBuyClick = () => {
        console.log("buy!");
    };
    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const productId = (e.target as HTMLElement).id;
        const type = (e.target as HTMLElement).dataset.type;
        const value = Number((e.target as HTMLElement).dataset.value);

        if (productId) {
            if (type === cartEnum.REMOVE) {
                dispatch(
                    deleteUserCart({
                        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
                        access_key: user.accessToken,
                        baseURL: `${process.env.REACT_APP_API_URL}/api/user`,
                        method: "delete",
                        url: `/cart?id=${productId}`,
                        withCredentials: true,
                    })
                ).then(() => {
                    setMessage("Товар успешно удален");
                    setNotification(true);
                });
                return null;
            }
            if (type === cartEnum.FAVORITE) {
                const data = { productId };
                dispatch(
                    updateUserFavList({
                        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
                        access_key: user.accessToken,
                        baseURL: `${process.env.REACT_APP_API_URL}/api/user`,
                        method: "put",
                        url: `/favoriteList`,
                        withCredentials: true,
                        data,
                    })
                ).then((data) => {
                    if (data && data.payload && data.payload.message) {
                        setMessage(data.payload.message);
                        setNotification(true);
                    } else {
                        setMessage("Товар добавлен в избранные");
                        setNotification(true);
                    }
                });
                return null;
            }
            if (value === 1 && type === cartEnum.DECREMENT) {
                return null;
            }
            if (type) {
                const data = { type, productId };
                if (isWaitUpdate) {
                    return null;
                };
                dispatch(
                    updateUserCart({
                        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
                        access_key: user.accessToken,
                        baseURL: `${process.env.REACT_APP_API_URL}/api/user`,
                        method: "put",
                        url: "/cart",
                        withCredentials: true,
                        data,
                    })
                );
                return null;
            }
        }
    }
    const bottomClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = (e.target as HTMLElement).id;
        if (id && id === cartEnum.HOME) {
            navigate(cartEnum.HOME);
        }
    };
    const isEmptyCart = !loading && isEmpty;
    const isNotEmptyCart = !loading && !isEmpty;
    return (
        <>
            {loading && (
                <div className="preload-wrapper">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <CircularProgress />
                    </Box>
                </div>
            )}
            {isEmptyCart && <div className="emptyCart">Ваша корзина пуста</div>}
            {isEmptyCart && <section onClick={bottomClick} className="toHomeButton">
                <DynamicButtonComponent text="Вернуться на главную" id="/" />
            </section>}
            <article className="cartProductList">
                <NotificationModal
                    visible={notification}
                    setVisible={setNotification}
                    message={message}
                />
                {isNotEmptyCart && <h1 className="cartProductList__title">{title}</h1>}
                <section className="cartProductList__products">
                    {isNotEmptyCart && (
                        <div onClick={clickHandler} className="cartProductList__wrapper">
                            {userCart.products.map((el, index) => {
                                return (
                                    <ProductItemComponent
                                        key={`cartItemKey_${index}`}
                                        id={el.product.id}
                                        img={el.product.images[2]}
                                        name={el.product.productName}
                                        btn_1={cartButtons[0]}
                                        btn_2={cartButtons[1]}
                                        isCounter={true}
                                        counterValue={el.quantity}
                                        price={el.quantity * el.product.price}
                                    />
                                );
                            })}
                        </div>
                    )}
                </section>
                {isNotEmptyCart && (
                    <BuyButtonComponent
                        id="buy"
                        onClick={handleBuyClick}
                        price={userCart.productsSummPrice}
                        isCart={true}
                    />
                )}
            </article>
        </>
    )
}

export {
    AuthCart
}