import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { getAnonymFavList, removeFavProduct } from "features/api/notAuthFavApiSlice";
import { NotificationModal } from "components/notificationModal/NotificationModal";
import { getOneProductById } from "features/api/notAuthCartApiSlice";
import { ProductItemComponent } from "components/productItem/ProductItem";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { favEnum } from "./enum";
import { Header } from "./Header";


const NotAuthFav: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [notification, setNotification] = useState<boolean>(false);
    const { loading, userFav, isEmpty } = useAppSelector((state) => state.anonymFav);
    const { userCart } = useAppSelector((state) => state.anonymCart);
    const { favButtons } = useAppSelector((state) => state.appLocal);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAnonymFavList());
    }, [])
    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const productId = (e.target as HTMLElement).id;
        const type = (e.target as HTMLElement).dataset.type;
        if (type && productId) {
            if (type === favEnum.CART) {
                if (userCart.products[productId.replace(/-/g, "")]) {
                    setMessage("Товар уже есть в корзине");
                    setNotification(true);
                }
                if (!userCart.products[productId.replace(/-/g, "")]) {
                    dispatch(getOneProductById(productId)).then((data) => {
                        setMessage("Товар успешно добавлен в корзину");
                        setNotification(true);
                    });
                }

            }
            if (type === favEnum.REMOVE) {
                dispatch(removeFavProduct(productId));
                setMessage("Товар успешно удален");
                setNotification(true);
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
            {!loading && <Header />}
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
                {isNotEmptyFav && (
                    Object.keys(userFav.favoriteList).map(
                        (el: string, index: number) => {
                            return (
                                <ProductItemComponent
                                    key={`favItem_anonym_Key_${index}`}
                                    img={userFav.favoriteList[el].productData.images[2]}
                                    id={userFav.favoriteList[el].productData.id}
                                    name={userFav.favoriteList[el].productData.productName}
                                    isCounter={false}
                                    btn_1={favButtons[0]}
                                    btn_2={favButtons[1]}
                                    price={userFav.favoriteList[el].productData.price}
                                />
                            );
                        }
                    )
                )}
            </section>
            {!loading && <section onClick={bottomClick} className="favoritesPage__buttons">
                <DynamicButtonComponent text="Вернуться на главную" id="/" />
            </section>}
        </article>
    )
}

export {
    NotAuthFav
}