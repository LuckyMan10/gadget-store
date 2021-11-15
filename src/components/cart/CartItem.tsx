import "./CartItem.scss";
import {
  DynamicButtonComponent,
  ChangeValueButtonComponent,
} from "components/buttons/Buttons";
import React, { useState } from "react";

interface CartItemI {
  name: string;
  price: number;
  img: string;
}

export const CartItem = ({ name, price, img }: CartItemI) => {
  const [valueOfProduct, setValueOfProduct] = useState<number>(1);

  function increment() {
    setValueOfProduct(valueOfProduct + 1);
  }
  function decrement() {
    valueOfProduct !== 1 && setValueOfProduct(valueOfProduct - 1);
  }

  return (
    <article className="CartItem">
      <section className="CartItem__image">
        <img src={img} alt={name} />
      </section>
      <div className="CartItem__wrapper">
        <h3 className="CartItem__title">{name}</h3>
        <div className="CartItem__buttons">
          <section className="CartItem__toFavBtn">
            <DynamicButtonComponent id="toFavorite" text="В избранное" />
          </section>
          <section className="CartItem__toRemoveBtn">
            <DynamicButtonComponent id="toRemove" text="Удалить" />
          </section>
        </div>
      </div>
      <section className="CartItem__toChangeValue">
        <ChangeValueButtonComponent
          value={valueOfProduct}
          increment={increment}
          decrement={decrement}
        />
      </section>
      <p className="CartItem__price">{price} Рублей.</p>
    </article>
  );
};
