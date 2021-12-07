import "./FavoritesPage.scss";
import "./FavoritesItem.scss";
import fillHeart from "assets/icons/fillHeart.svg";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { ProductItemComponent } from "components/productItem/ProductItem";
import { useAppSelector, useAppDispatch } from "app/hooks";
import React, { useEffect, useState } from "react";
import {
  getUserFavList,
  deleteUserFavList,
} from "features/api/userFavListApiSlice";
import { updateUserCart } from "features/api/userCartApiSlice";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "components/notificationModal/NotificationModal";
import {
  getAnonymFavList,
  removeFavProduct,
} from "features/api/notAuthFavApiSlice";
import { getOneProductById } from "features/api/notAuthCartApiSlice";

const FavoritesPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);

  const button_1 = { id: "toCart", text: "Добавить в корзину", type: "toCart" };
  const button_2 = { id: "toRemove", text: "Удалить", type: "toRemove" };

  const dispatch = useAppDispatch();
  const { isAuth, user, isRefreshError } = useAppSelector(
    (state) => state.auth
  );
  const { userCart } = useAppSelector((state) => state.anonymCart);
  const { userFavList, loading, isWasFetched } = useAppSelector(
    (state) => state.favList
  );
  const {
    loading: favAnonymLoading,
    userFav: anonymFav,
  } = useAppSelector((state) => state.anonymFav);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && !isRefreshError) {
      dispatch(
        getUserFavList({
          api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
          access_key: user.accessToken,
          baseURL: "http://localhost:5000/api/user",
          method: "get",
          url: "/favoriteList",
          withCredentials: true,
        })
      );
    }
    if (!isAuth && isRefreshError) {
      dispatch(getAnonymFavList());
    }
  }, [isAuth, isRefreshError]);

  const clickHandler = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>
  ) => {
    const productId = (e.target as HTMLElement).id;
    const type = (e.target as HTMLElement).dataset.type;
    if (type && productId) {
      if (type === "toCart") {
        if (isAuth && !isRefreshError) {
          const data = { type, productId };
          dispatch(
            updateUserCart({
              api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
              access_key: user.accessToken,
              baseURL: "http://localhost:5000/api/user",
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
        if (!isAuth && isRefreshError) {
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
      }
      if (type === "toRemove") {
        if (isAuth && !isRefreshError) {
          dispatch(
            deleteUserFavList({
              api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
              access_key: user.accessToken,
              baseURL: "http://localhost:5000/api/user",
              method: "delete",
              url: `/favoriteList?id=${productId}`,
              withCredentials: true,
            })
          ).then((data) => {
            setMessage("Товар успешно удален");
            setNotification(true);
          });
        }
        if (!isAuth && isRefreshError) {
          dispatch(removeFavProduct(productId));
          setMessage("Товар успешно удален");
          setNotification(true);
        }
      }
    }
  };
  const buttonsClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLElement).id;
    if (id && id === "/") {
      navigate("/");
    }
  };

  return (
    <div className="favoritesPage">
      <NotificationModal
        message={message}
        visible={notification}
        setVisible={setNotification}
        />
      <section className="favoritesPage__header">
        <img src={fillHeart} alt="heart" />
        <h1 className="favoritesPage__title">Избранное</h1>
      </section>
      <section onClick={clickHandler} className="favoritesPage__products">
        {loading ? (
          userFavList.products &&
          (isWasFetched && userFavList.products.length !== 0 ? (
            userFavList.products.map((el, index) => {
              return (
                <ProductItemComponent
                  key={`favItemKey_${index}`}
                  img={el.product.images[2]}
                  id={el.product.id}
                  name={el.product.productName}
                  isCounter={false}
                  btn_1={button_1}
                  btn_2={button_2}
                  price={el.product.price}
                />
              );
            })
          ) : (
            <div>Список избранных товаров пуст</div>
          ))
        ) : isRefreshError ? (
          favAnonymLoading && favAnonymLoading ? (
            Object.keys(anonymFav.favoriteList).length !== 0 ? (
              Object.keys(anonymFav.favoriteList).map(
                (el: string, index: number) => {
                  return (
                    <ProductItemComponent
                      key={`favItem_anonym_Key_${index}`}
                      img={anonymFav.favoriteList[el].productData.images[2]}
                      id={anonymFav.favoriteList[el].productData.id}
                      name={anonymFav.favoriteList[el].productData.productName}
                      isCounter={false}
                      btn_1={button_1}
                      btn_2={button_2}
                      price={anonymFav.favoriteList[el].productData.price}
                    />
                  );
                }
              )
            ) : (
              <div>Список избранных товаров пуст</div>
            )
          ) : (
            <div>Загрузка</div>
          )
        ) : (
          <div>Загрузка...</div>
        )}
      </section>
      <section onClick={buttonsClickHandler} className="favoritesPage__buttons">
        <DynamicButtonComponent text="Вернуться на главную" id="/" />
      </section>
    </div>
  );
};

export {
  FavoritesPage
}