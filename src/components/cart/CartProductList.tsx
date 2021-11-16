import "./CartProductList.scss";
import "./CartItem.scss";
import defaultImg from "assets/images/slider_2.webp";
import { BuyButtonComponent } from "components/buttons/Buttons";
import { ProductItemComponent } from "components/productItem/ProductItem";
import React, { useState } from "react";

interface cartProductListI {
  title: string;
}
const handleBuyClick = () => {
  console.log("buy!");
};

export const CartProductList = ({ title }: cartProductListI) => {
  const [value, setValue] = useState<number>(0); // don't serious, just boilerplate

  const btn_1 = { id: "toFavorite", text: "В избранное" };
  const btn_2 = { id: "toRemove", text: "Удалить" };

  const increment = () => {
    setValue(value + 1);
  };
  const decrement = () => {
    setValue(value - 1);
  };

  return (
    <article className="cartProductList">
      <h1 className="cartProductList__title">{title}</h1>
      <section className="cartProductList__products">
        <div className="cartProductList__wrapper">
          <ProductItemComponent
            img={defaultImg}
            name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
            btn_1={btn_1}
            btn_2={btn_2}
            isCounter={true}
            counterValue={value}
            increment={increment}
            decrement={decrement}
            price={50000}
          />
          <ProductItemComponent
            img={defaultImg}
            name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
            btn_1={btn_1}
            btn_2={btn_2}
            isCounter={true}
            counterValue={value}
            increment={increment}
            decrement={decrement}
            price={50000}
          />
          <ProductItemComponent
            img={defaultImg}
            name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
            btn_1={btn_1}
            btn_2={btn_2}
            isCounter={true}
            counterValue={value}
            increment={increment}
            decrement={decrement}
            price={50000}
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
