import "./CartPage.scss";
import { CartProductList } from "components/cart/CartProductList";
import React from 'react';

const CartPage: React.FC = () => {
  return (
    <div className="cartPage">
      <CartProductList title="Корзина" />
    </div>
  );
};

export {
  CartPage
}