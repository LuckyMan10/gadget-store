import "./CartProductList.scss";
import "./CartItem.scss";
import defaultImg from "assets/images/slider_2.webp";
import { BuyButtonComponent } from "components/buttons/Buttons";
import { ProductItemComponent } from "components/productItem/ProductItem";
import { useAppSelector, useAppDispatch } from "app/hooks";
import React, { useState, useEffect } from "react";
import {
  getUserCart,
  updateUserCart,
  deleteUserCart,
} from "features/api/userCartApiSlice";
import { updateUserFavList } from "features/api/userFavListApiSlice";
import { refresh } from "features/api/authApiSlice";

interface cartProductListI {
  title: string;
}
const handleBuyClick = () => {
  console.log("buy!");
};

export const CartProductList = ({ title }: cartProductListI) => {
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const { userCart, loading, isWasFetched } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    if (isAuth) {
      dispatch(
        getUserCart({
          api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
          access_key: user.accessToken,
          baseURL: "http://localhost:5000/api/user",
          method: "get",
          url: "/cart",
          withCredentials: true,
        })
      );
    }
  }, [isAuth]);
  const btn_1 = { id: "toFavorite", text: "В избранное", type: "toFavorite" };
  const btn_2 = { id: "toRemove", text: "Удалить", type: "toRemove" };
  const clickHandler = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>
  ) => {
    const productId = (e.target as HTMLElement).id;
    const type = (e.target as HTMLElement).dataset.type;
    const value = Number((e.target as HTMLElement).dataset.value);
    if (type === "toRemove") {
      dispatch(
        deleteUserCart({
          api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
          access_key: user.accessToken,
          baseURL: "http://localhost:5000/api/user",
          method: "delete",
          url: `/cart?id=${productId}`,
          withCredentials: true,
        })
      );
      return null;
    }
    if (type === "toFavorite") {
      const data = { productId };
      dispatch(
        updateUserFavList({
          api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
          access_key: user.accessToken,
          baseURL: "http://localhost:5000/api/user",
          method: "put",
          url: `/favoriteList`,
          withCredentials: true,
          data,
        })
      );
      return null;
    }

    if (value === 1 && type === "DECREMENT") {
      return null;
    }
    if (type && productId) {
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
      );
    }
  };

  return (
    <article className="cartProductList">
      <h1 className="cartProductList__title">{title}</h1>
      <section className="cartProductList__products">
        <div onClick={clickHandler} className="cartProductList__wrapper">
          {loading ? (
            userCart.products &&
            (isWasFetched && userCart.products.length !== 0 ? (
              userCart.products.map((el, index) => {
                return (
                  <ProductItemComponent
                    key={`cartItemKey_${index}`}
                    id={el.product.id}
                    img={el.product.images[2]}
                    name={el.product.name}
                    btn_1={btn_1}
                    btn_2={btn_2}
                    isCounter={true}
                    counterValue={el.quantity}
                    price={el.quantity * el.product.price}
                  />
                );
              })
            ) : (
              <div>Ваша корзина пуста</div>
            ))
          ) : (
            <div>Загрузка...</div>
          )}
        </div>
      </section>
      <BuyButtonComponent
        id="buy"
        onClick={handleBuyClick}
        price={60000}
        isCart={true}
      />
    </article>
  );
};

