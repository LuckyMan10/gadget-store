import "./FavoritesPage.scss";
import "./FavoritesItem.scss";
import fillHeart from "assets/icons/fillHeart.svg";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { ProductItemComponent } from "components/productItem/ProductItem";
import productImg from "assets/images/slider_2.webp";
import { useAppSelector, useAppDispatch } from "app/hooks";
import React, { useEffect } from "react";
import { getUserFavList, deleteUserFavList } from "features/api/userFavListApiSlice";
import { updateUserCart } from "features/api/userCartApiSlice";

export const FavoritesPage = () => {
  const button_1 = { id: "toCart", text: "Добавить в корзину", type: "toCart" };
  const button_2 = { id: "toRemove", text: "Удалить", type: "toRemove" };
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { userFavList, loading } = useAppSelector((state) => state.favList);

  useEffect(() => {
    if (isAuth) {
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
  }, [isAuth]);

  const clickHandler = (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>) => {
    const productId = (e.target as HTMLElement).id;
    const type = (e.target as HTMLElement).dataset.type;
    if(type && productId) {
      if(type === "toCart") {
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
        )
      }
      if(type === "toRemove") {
        dispatch(
          deleteUserFavList({
            api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
            access_key: user.accessToken,
            baseURL: "http://localhost:5000/api/user",
            method: "delete",
            url: `/favoriteList?id=${productId}`,
            withCredentials: true
          })
        )
      }
    }
    console.log('type: ', type)
    console.log('id: ', productId);
  }

  return (
    <div className="favoritesPage">
      <section className="favoritesPage__header">
        <img src={fillHeart} alt="heart" />
        <h1 className="favoritesPage__title">Избранное</h1>
      </section>
      <section onClick={clickHandler} className="favoritesPage__products">
        {console.log('fav: ', userFavList.products)}
        {loading ? (
          userFavList.products &&
          userFavList.products.length !== 0 &&
          userFavList.products.map((el, index) => {
            return (
              <ProductItemComponent
                key={`favItemKey_${index}`}
                img={el.product.images[2]}
                id={el.product.id}
                name={el.product.name}
                isCounter={false}
                btn_1={button_1}
                btn_2={button_2}
                price={el.product.price}
              />
            );
          })
        ) : (
          <div>Загрузка...</div>
        )}
      </section>
      <section className="favoritesPage__buttons">
        <DynamicButtonComponent text="Вернуться на главную" id="/" />
      </section>
    </div>
  );
};
