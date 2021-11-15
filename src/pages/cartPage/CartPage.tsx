import "./CartPage.scss";
import { CartProductList } from "components/cart/CartProductList";

export const CartPage = () => {
  return (
    <div className="cartPage">
      <CartProductList title="Корзина" />
    </div>
  );
};
