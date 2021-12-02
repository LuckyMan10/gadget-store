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
import { NotificationModal } from "components/notificationModal/NotificationModal";
import { updateProduct, removeProduct } from "features/api/notAuthCartApiSlice";
import {
  removeFavProduct,
  getOneProductByIdFav,
} from "features/api/notAuthFavApiSlice";

interface cartProductListI {
  title: string;
}
const handleBuyClick = () => {
  console.log("buy!");
};

export const CartProductList = ({ title }: cartProductListI) => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);
  const { isAuth, user, isRefreshError } = useAppSelector(
    (state) => state.auth
  );
  const {
    userCart: anonymCart,
    isWasFetched: anonymFetched,
    loading: anonymLoading,
  } = useAppSelector((state) => state.anonymCart);
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
    if (!isAuth && isRefreshError) {
      console.log("user not auth");
    }
  }, [isAuth, isRefreshError]);
  const btn_1 = { id: "toFavorite", text: "В избранное", type: "toFavorite" };
  const btn_2 = { id: "toRemove", text: "Удалить", type: "toRemove" };
  const clickHandler = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>
  ) => {
    const productId = (e.target as HTMLElement).id;
    const type = (e.target as HTMLElement).dataset.type;
    const value = Number((e.target as HTMLElement).dataset.value);
    if (type === "toRemove" && productId) {
      if (isAuth && !isRefreshError) {
        dispatch(
          deleteUserCart({
            api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
            access_key: user.accessToken,
            baseURL: "http://localhost:5000/api/user",
            method: "delete",
            url: `/cart?id=${productId}`,
            withCredentials: true,
          })
        ).then(() => {
          setMessage("Товар успешно удален");
          setNotification(true);
          setTimeout(() => {
            setNotification(false);
          }, 3200);
        });
        return null;
      }
      if (!isAuth && isRefreshError) {
        dispatch(removeProduct(productId));
        setMessage("Товар успешно удален");
        setNotification(true);
        setTimeout(() => {
          setNotification(false);
        }, 3200);
        return null;
      }
    }
    if (type === "toFavorite" && productId) {
      if (isAuth && !isRefreshError) {
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
        ).then((data) => {
          if (data && data.payload && data.payload.message) {
            setMessage(data.payload.message);
            setNotification(true);
            setTimeout(() => {
              setNotification(false);
            }, 3200);
          } else {
            setMessage("Товар добавлен в избранные");
            setNotification(true);
            setTimeout(() => {
              setNotification(false);
            }, 3200);
          }
        });
        return null;
      }
      if (!isAuth && isRefreshError) {
        dispatch(getOneProductByIdFav(productId)).then(() => {
          setMessage("Товар добавлен в избранные");
          setNotification(true);
          setTimeout(() => {
            setNotification(false);
          }, 3200);
        });
      }

      return null;
    }

    if (value === 1 && type === "DECREMENT") {
      return null;
    }
    if (type && productId) {
      const data = { type, productId };
      if (isAuth && !isRefreshError) {
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
        return null;
      }
      if (!isAuth && isRefreshError) {
        dispatch(updateProduct({ id: productId, type }));
      }
    }
  };

  return (
    <article className="cartProductList">
      <NotificationModal visible={notification} message={message} />
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
          ) : isRefreshError && anonymFetched && anonymLoading ? (
            Object.keys(anonymCart.products).length !== 0 ? (
              Object.keys(anonymCart.products).map(
                (el: string, index: number) => {
                  return (
                    <ProductItemComponent
                      key={`cartItemKey_${index}`}
                      id={anonymCart.products[el].productData.id}
                      img={anonymCart.products[el].productData.images[2]}
                      name={anonymCart.products[el].productData.name}
                      btn_1={btn_1}
                      btn_2={btn_2}
                      isCounter={true}
                      counterValue={anonymCart.products[el].quantity}
                      price={
                        anonymCart.products[el].quantity *
                        anonymCart.products[el].productData.price
                      }
                    />
                  );
                }
              )
            ) : (
              <div>Ваша корзина пуста</div>
            )
          ) : (
            <div>Загрузка...</div>
          )}
        </div>
      </section>
      {isRefreshError ? (
        anonymFetched &&
        anonymLoading &&
        Object.keys(anonymCart.products).length !== 0 && (
          <BuyButtonComponent
            id="buy"
            onClick={handleBuyClick}
            price={anonymCart.productsSummPrice}
            isCart={true}
          />
        )
      ) : (
        loading && isWasFetched &&
          <BuyButtonComponent
          id="buy"
          onClick={handleBuyClick}
          price={userCart.productsSummPrice}
          isCart={true}
        /> 
        
      )}
    </article>
  );
};
