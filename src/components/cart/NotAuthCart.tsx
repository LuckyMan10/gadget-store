import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { NotificationModal } from "components/notificationModal/NotificationModal";
import { ProductItemComponent } from "components/productItem/ProductItem";
import { updateProduct, removeProduct } from "features/api/notAuthCartApiSlice";
import { getOneProductByIdFav } from "features/api/notAuthFavApiSlice";
import { BuyButtonComponent } from "components/buttons/Buttons";
import CircularProgress from '@mui/material/CircularProgress';
import {useNavigate} from 'react-router-dom';
import { DynamicButtonComponent } from "components/buttons/Buttons";
import Box from '@mui/material/Box';
import { cartEnum } from "./enum";
import "./CartProductList.scss";
import "./CartItem.scss";

const NotAuthCart: React.FC<{ title: string }> = ({ title }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState<string>("");
    const [notification, setNotification] = useState<boolean>(false);
    const { userCart, isEmpty, loading } = useAppSelector(
        (state) => state.anonymCart);
    const { cartButtons } = useAppSelector(
        (state) => state.appLocal
    )
    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const productId = (e.target as HTMLElement).id;
        const type = (e.target as HTMLElement).dataset.type;
        const value = Number((e.target as HTMLElement).dataset.value);
        if (productId) {
            if (type === cartEnum.REMOVE) {
                dispatch(removeProduct(productId));
                setMessage("Товар успешно удален");
                setNotification(true);
                return null;
            }
            if (type === cartEnum.FAVORITE) {
                dispatch(getOneProductByIdFav(productId)).then((data: any) => {
                    if(data && data.error) {
                        setMessage(data.error.message);
                        setNotification(true);
                    }
                    if(data && !data.error) {
                        setMessage("Товар добавлен в избранные");
                        setNotification(true);
                    }
                });
            }
            if (value === 1 && type === cartEnum.DECREMENT) {
                return null;
            }
            if (type) {
                dispatch(updateProduct({ id: productId, type }));
            }
        }
    }
    const handleBuyClick = () => {
        console.log("buy!");
    };
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
                            {Object.keys(userCart.products).map(
                                (el: string, index: number) => {
                                    return (
                                        <ProductItemComponent
                                            key={`cartItemKey_${index}`}
                                            id={userCart.products[el].productData.id}
                                            img={userCart.products[el].productData.images[2]}
                                            name={userCart.products[el].productData.productName}
                                            btn_1={cartButtons[0]}
                                            btn_2={cartButtons[1]}
                                            isCounter={true}
                                            counterValue={userCart.products[el].quantity}
                                            price={
                                                userCart.products[el].quantity *
                                                userCart.products[el].productData.price
                                            }
                                        />
                                    );
                                }
                            )
                            }
                        </div>)
                    }
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
    NotAuthCart
}