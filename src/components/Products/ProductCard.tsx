import "./ProductCard.scss";
import React from 'react';
import {productCardType} from "types";

const ProductCard: React.FC<productCardType> = ({ productName, price, id, images }) => {

  return (
    <div id={id} className="card">
      <img id={id} className="card__image" src={images[1]} alt="product image" />
      <section id={id} className="card__info">
        <h2 id={id} className="card__name">{productName}</h2>
        <p id={id} className="card__price">Цена: {price} рублей.</p>
      </section>
    </div>
  );
};

export {
  ProductCard
}