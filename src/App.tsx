import React, {useEffect} from "react";
import "./styles/reset.css";
import "./styles/globals.css";
import { HomePage } from "pages/homePage/HomePage";
import { ProductPage } from "pages/productPage/ProductPage";
import { ProductItemPage } from "pages/productItemPage/ProductItemPage";
import { Routes, Route } from "react-router-dom";
import { CartPage } from "pages/cartPage/CartPage";
import { Header } from "components/header/header";
import { Footer } from "components/footer/footer";
import ErorGif from "assets/images/not_found.gif";
import { ErrorComponent } from "components/Error/ErrorComponent";
import { FavoritesPage } from "pages/favoritesPage/FavoritesPage";
import {refresh} from "features/api/authApiSlice";
import {useAppDispatch} from "app/hooks";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refresh());
    console.log('check!')
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category/:company" element={<ProductPage />} />
        <Route path="/:category/:item" element={<ProductItemPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorite" element={<FavoritesPage />} />
        <Route
          path="*"
          element={
            <ErrorComponent
              message="Упс, кажется такой страницы не существует"
              img={ErorGif}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
