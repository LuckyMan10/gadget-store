import React, { useState, useEffect } from 'react';
import { NotificationModal } from "components/notificationModal/NotificationModal";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { getUserFavList, deleteUserFavList } from "features/api/userFavListApiSlice";
import { updateUserCart } from "features/api/userCartApiSlice";
import { ProductItemComponent } from "components/productItem/ProductItem";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { favEnum } from "./enum";
import { Header } from "./Header";

const AuthFav: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [notification, setNotification] = useState<boolean>(false);
    const { favButtons } = useAppSelector(
        (state) => state.appLocal
    );
    const { userFavList, loading, isEmpty } = useAppSelector(
        (state) => state.favList
    );
    const { user } = useAppSelector((state) => state.auth);
    useEffect(() => {
        dispatch(
            getUserFavList({
                api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
                access_key: user.accessToken,
                baseURL: `https://gadget-store-app.herokuapp.com/api/user`,
                method: "get",
                url: "/favoriteList",
                withCredentials: true,
            })
        );
    })
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const productId = (e.target as HTMLElement).id;
        const type = (e.target as HTMLElement).dataset.type;
        if (type && productId) {
            if (type === favEnum.CART) {
                const data = { type, productId };
                dispatch(
                    updateUserCart({
                        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
                        access_key: user.accessToken,
                        baseURL: `https://gadget-store-app.herokuapp.com/api/user`,
                        method: "put",
                        url: "/cart",
                        withCredentials: true,
                        data,
                    })
                ).then((data) => {
                    if (data.payload) {
                        setMessage("Товар успешно добавлен в корзину");
                        setNotification(true);
                    } else {
                        setMessage("Товар уже есть в корзине");
                        setNotification(true);
                    }
                });
            }
            if (type === favEnum.REMOVE) {
                dispatch(
                    deleteUserFavList({
                        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
                        access_key: user.accessToken,
                        baseURL: `https://gadget-store-app.herokuapp.com/api/user`,
                        method: "delete",
                        url: `/favoriteList?id=${productId}`,
                        withCredentials: true,
                    })
                ).then(() => {
                    setMessage("Товар успешно удален");
                    setNotification(true);
                });
            }
        }
    }
    const bottomClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = (e.target as HTMLElement).id;
        if (id && id === favEnum.HOME) {
            navigate(favEnum.HOME);
        }
    };
    const isEmptyFav = !loading && isEmpty;
    const isNotEmptyFav = !loading && !isEmpty;
    return (
        <article className="favoritesPage">
            <NotificationModal
                message={message}
                visible={notification}
                setVisible={setNotification}
            />
            <Header />
            <section onClick={clickHandler} className="favoritesPage__products">
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
                {isEmptyFav && <div className="emptyFav">Список избранных товаров пуст</div>}
                {isNotEmptyFav && userFavList.products && (
                    userFavList.products.map((el, index) => {
                        return (
                            <ProductItemComponent
                                key={`favItemKey_${index}`}
                                img={el.product.images[2]}
                                id={el.product.id}
                                name={el.product.productName}
                                isCounter={false}
                                btn_1={favButtons[0]}
                                btn_2={favButtons[1]}
                                price={el.product.price}
                            />
                        );
                    })
                )}
            </section>
            <section onClick={bottomClick} className="favoritesPage__buttons">
                <DynamicButtonComponent text="Вернуться на главную" id="/" />
            </section>
        </article>
    )
}

export {
    AuthFav
}