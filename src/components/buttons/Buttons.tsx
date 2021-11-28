import styled from "styled-components";
import {menu, close, minus, plus} from "components/staticImports";

type ClickButtonType = {
  text?: string;
  img?: string;
  type?: string;
  id: string;
};
type BuyButtonType = {
  text?: string;
  toFav?: string;
  isCart?: boolean;
  price: number;
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
  id: string;
};
type ChangeValueButtonType = {
  value?: number;
  id: string;
};
type menuButtonType = {
    setMenuVisible(value: boolean): void,
    menuVisible: boolean
}

const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    img {
        width: 60px;
    }
`


export const DynamicButtonComponent = ({ text, img, id, type }: ClickButtonType) => {
  return (
    <button data-type={type} id={id} className="clickButton">
      {img && <img data-type={type} id={id} src={img} alt="icon button" />}
      {text && <span data-type={type} id={id}>{text}</span>}
    </button>
  );
};

export const ChangeValueButtonComponent = ({
  value,
  id
}: ChangeValueButtonType) => {
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

export const BuyButtonComponent = ({
  text,
  toFav,
  isCart,
  price,
  onClick,
  id,
}: BuyButtonType) => {
  return (
    <article onClick={onClick} id={id} className="buyButton">
      <div className="buyButton__wrapper">
        <section className="buyButton__price">
          {isCart ? <p>К оплате: {price} рублей.</p> : <p>{price} P.</p>}
        </section>
        {toFav && (
          <section id={id} className="buyButton__toFav">
            <button>
              <img id={id} src={toFav} alt="add to fav" />
            </button>
          </section>
        )}
        <section id={id} className="buyButton__toBuy">
          <button id={id}>{isCart ? "Оплатить" : "Купить"}</button>
        </section>
      </div>
    </article>
  );
};

export const MenuButton = ({setMenuVisible, menuVisible}: menuButtonType) => {
  return (
    <StyledButton onClick={() => setMenuVisible(!menuVisible)}>
      <img src={menuVisible ? close : menu} alt="menu" />
    </StyledButton>
  );
};
