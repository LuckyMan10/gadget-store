import "./CartProductList.scss";
import { CartItem } from "./CartItem";
import defaultImg from "assets/images/slider_2.webp";
import {BuyButtonComponent} from "components/buttons/Buttons";

interface cartProductListI {
  title: string;
}
const handleBuyClick = () => {
  console.log('buy!')
}


export const CartProductList = ({ title }: cartProductListI) => {
  return (
    <article className="cartProductList">
      <h1 className="cartProductList__title">{title}</h1>
      <section className="cartProductList__products">
        <div className="cartProductList__wrapper">
          <CartItem
            img={defaultImg}
            name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
            price={30000}
          />
                    <CartItem
            img={defaultImg}
            name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
            price={30000}
          />
                    <CartItem
            img={defaultImg}
            name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
            price={30000}
          />
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
