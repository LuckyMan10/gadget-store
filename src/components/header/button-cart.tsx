import { imports } from "./imports";

export const ButtonCart = () => {
  return (
    <button className="header__buttons-cart">
      <img src={imports.cart} alt="cart" />
      <span>Корзина</span>
    </button>
  );
};
