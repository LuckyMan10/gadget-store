import React from "react";
import "./styles/reset.css";
import "./styles/globals.css";
import { HomePage } from "pages/homePage/HomePage";
import { ProductPage } from "pages/productPage/ProductPage";
import {ProductItemPage} from "pages/productItemPage/ProductItemPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<ProductPage />} />
        <Route path="/:category/:item" element={<ProductItemPage />} />
      </Routes>
    </div>
  );
}

export default App;
