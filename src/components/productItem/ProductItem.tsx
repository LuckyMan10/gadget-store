import "./ProductItem.scss";
import {
  DynamicButtonComponent,
  ChangeValueButtonComponent,
} from "components/buttons/Buttons";
import React from 'react';
import { productItemType } from "types"

const ProductItemComponent: React.FC<productItemType> = ({
  img,
  name,
  btn_1,
  btn_2,
  isCounter,
  counterValue,
  price,
  id
}) => {
  return (
    <article className="productItem">
      <section className="productItem__image">
        <img src={img} alt={name} />
      </section>
      <div className="productItem__wrapper">
        <h3 className="productItem__title">{name}</h3>
        <div className="productItem__buttons">
          {btn_1 && (
            <section className="productItem__btn-1">
              <DynamicButtonComponent type={btn_1.type} id={id} text={btn_1.text} />
            </section>
          )}
          {btn_2 && (
            <section className="productItem__btn-2">
              <DynamicButtonComponent type={btn_2.type} id={id} text={btn_2.text} />
            </section>
          )}
        </div>
      </div>
      {isCounter && (
        <section className="productItem__counter">
          <ChangeValueButtonComponent
            id={id}
            value={counterValue}
          />
        </section>
      )}
      <p className="productItem__price">{price} Рублей</p>
    </article>
  );
};

export {
  ProductItemComponent
}