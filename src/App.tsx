import React, { useEffect } from "react";
import "./styles/reset.css";
import "./styles/globals.css";
import { HomePage } from "pages/homePage/HomePage";
import { ProductPage } from "pages/productPage/ProductPage";
import { ProductItemPage } from "pages/productItemPage/ProductItemPage";
import { Routes, Route } from "react-router-dom";
import { CartPage } from "pages/cartPage/CartPage";
import { Header } from "components/header/header";
import { Footer } from "components/footer/footer";
import { ErrorComponent } from "components/Error/ErrorComponent";
import { FavoritesPage } from "pages/favoritesPage/FavoritesPage";
import { refresh } from "features/api/authApiSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { getUserCart } from "features/api/userCartApiSlice";
import { getUserFavList } from "features/api/userFavListApiSlice";
import {createAnonymUser, getAnonymUserCart} from "features/api/notAuthCartApiSlice";

function App() {
  const dispatch = useAppDispatch();
  const { isAuth, user, loading, isRefreshError } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(refresh()).then(() => {
      if (isAuth) {
        dispatch(
          getUserCart({
            api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
            access_key: user.accessToken,
            baseURL: `https://gadget-store-app.herokuapp.com/api/user`,
            method: "get",
            url: "/cart",
            withCredentials: true,
          })
        );
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
      }
      if(!isAuth && isRefreshError) {
        const checkAnonymUser = localStorage.getItem("anonymUser");
        if(checkAnonymUser) {
          dispatch(getAnonymUserCart());
        } else {
          dispatch(createAnonymUser());
        }
      }
    });
  }, [isAuth, isRefreshError]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category/:company" element={<ProductPage />} />
        <Route
          path="/:category/:company/product/:item"
          element={<ProductItemPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorite" element={<FavoritesPage />} />
        <Route
          path="*"
          element={
            <ErrorComponent
              message="Упс, кажется такой страницы не существует"
              img={"ErorGif"}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
