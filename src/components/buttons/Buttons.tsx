import styled from "styled-components";
import { menu, close, minus, plus } from "components/staticImports";
import React from 'react';
import {
  ClickButtonType,
  BuyButtonType,
  ChangeValueButtonType,
  MenuButtonType
} from "types";


const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    img {
        cursor: pointer;
        width: 60px;
    }
`


const DynamicButtonComponent: React.FC<ClickButtonType> = ({ text, img, id, type }) => {
  return (
    <button data-type={type} id={id} className="clickButton">
      {img && <img data-type={type} id={id} src={img} alt="icon button" />}
      {text && <span data-type={type} id={id}>{text}</span>}
    </button>
  );
};

const ChangeValueButtonComponent: React.FC<ChangeValueButtonType> = ({
  value,
  id
}) => {
  return (
    <article id={id} className="ChangeValueButton">
      <button data-type="DECREMENT" data-value={value} id={id} className="ChangeValueButton__decrement">
        <img data-type="DECREMENT" data-value={value} id={id} src={minus} alt="decrement" />
      </button>
      <p id={id}>{value}</p>
      <button data-type="INCREMENT" data-value={value} id={id} className="ChangeValueButton__increment">
        <img data-type="INCREMENT" data-value={value} id={id} src={plus} alt="increment" />
      </button>
    </article>
  );
};

const BuyButtonComponent: React.FC<BuyButtonType> = ({
  text,
  toFav,
  isCart,
  price,
  onClick,
  id,
}) => {
  return (
    <article onClick={onClick} className="buyButton">
      <div className="buyButton__wrapper">
        <section className="buyButton__price">
          {isCart ? <p>К оплате: {price} рублей.</p> : <p>{price} P.</p>}
        </section>
        {toFav && (
          <section data-type="toFav" id={id} className="buyButton__toFav">
            <button data-type="toFav">
              <img id={id} data-type="toFav" src={toFav} alt="add to fav" />
            </button>
          </section>
        )}
        <section data-type="toBuy" className="buyButton__toBuy">
          <button data-type="toBuy" id={id}>{isCart ? "Оплатить" : "Купить"}</button>
        </section>
      </div>
    </article>
  );
};

const MenuButton: React.FC<MenuButtonType> = ({ type, clickButton }) => {
  return (
    <StyledButton>
      <img onClick={clickButton}
        src={type ? close : menu}
        alt="menu"
      />
    </StyledButton>
  );
};

export {
  DynamicButtonComponent,
  ChangeValueButtonComponent,
  BuyButtonComponent,
  MenuButton
}