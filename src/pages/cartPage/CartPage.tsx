import "./CartPage.scss";
import { Cart } from "components/cart/index";
import React from 'react';

const CartPage: React.FC = () => {
  return (
    <div className="cartPage">
      <Cart />
    </div>
  );
};

export {
  CartPage
}