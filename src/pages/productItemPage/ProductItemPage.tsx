import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import { ProductImages } from "components/productItemPage/productImages";
import { Specifications } from "components/productItemPage/specifications";
import { BuyButtonComponent } from "components/buttons/Buttons";
import heartImg from "assets/icons/heart_transparent.svg";
import "./ProductItemPage.scss";
import { useFetchNavDataQuery } from "features/api/appApiSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { updateUserCart } from "features/api/userCartApiSlice";
import { getOneProduct, clearOneProduct } from "features/api/productsApiSlice";
import { NotificationModal } from "components/notificationModal/NotificationModal";
import { updateProduct, getOneProductById } from "features/api/notAuthCartApiSlice";
import { updateUserFavList } from "features/api/userFavListApiSlice";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {navbarDataItemType} from "types";

const ProductItemPage: React.FC = () => {
  const { pathname } = useLocation();
  const { category, item } = useParams() as {
    category: string | string[];
    item: string;
  };
  const dispatch = useAppDispatch();
  const { isAuth, user, isRefreshError } = useAppSelector((state) => state.auth);
  const { userCart } = useAppSelector(
    (state) => state.anonymCart
  );

  const [notification, setNotification] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    dispatch(
      getOneProduct({
        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
        baseURL: "http://localhost:5000/api/products",
        method: "get",
        url: `/find?id=${item}`,
        withCredentials: true,
      })
    );
    return () => {
      console.log('unmount')
      dispatch(clearOneProduct());
    }
  }, [pathname]);
  const { oneProduct, isWasFetched, loading, oneProductLoaded } = useAppSelector(
    (state) => state.products
  );
  const { data = [], isFetching } = useFetchNavDataQuery();
  const [categories] = data.filter(
    (el: navbarDataItemType) => el.category === category
  );
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLElement).id;
    const type = (e.target as HTMLElement).dataset.type;
    if (isAuth && id && type === "toBuy") {
      dispatch(
        updateUserCart({
          api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
          access_key: user.accessToken,
          baseURL: "http://localhost:5000/api/user",
          method: "put",
          url: "/cart",
          withCredentials: true,
          data: {
            productId: id,
            type: "INCREMENT",
          },
        })
      ).then(() => {
        setMessage("Товар добавлен в корзину");
        setNotification(true);
      });
    }
    if (isAuth && id && type === "toFav") {
      const data = { productId: id };
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
        } else {
          setMessage("Товар добавлен в избранные");
          setNotification(true);
        }
      });
    }
    if (!isAuth && id && isRefreshError && type === "toBuy") {
      if (userCart.products[id.replace(/-/g, '')]) {
        dispatch(updateProduct({ id, type: "INCREMENT" }));
        setMessage("Товар добавлен в корзину");
        setNotification(true);
      } else {
        dispatch(getOneProductById(id));
        setMessage("Товар добавлен в корзину");
        setNotification(true);
      }
    }
  };

  return (
    <div className="productItemPage">
      <NotificationModal
        visible={notification}
        setVisible={setNotification}
        message={message}
      />
      <main>
        {!isFetching &&
          categories &&
          loading &&
          oneProductLoaded ? (
          isWasFetched && data[0] && oneProduct ? (
            <>
              <BreadCrumbs
                category={categories.category}
                name={categories.name}
                item={[oneProduct.productName, item]}
              />
              <ProductImages images={oneProduct.images} title={oneProduct.productName} />
              <BuyButtonComponent
                text="Купить"
                toFav={heartImg}
                isCart={false}
                price={50000}
                onClick={clickHandler}
                id={oneProduct.id}
              />
              <Specifications data={oneProduct.description} />
            </>
          ) : (
            <div>Такой страницы не существует</div>
          )
        ) : (
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
      </main>
    </div>
  );
};

export {
  ProductItemPage
}