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
    display: flex;
    justify-content: flex-end;
    width: 100%;
    img {
        cursor: pointer;
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

export const MenuButton = ({setMenuVisible, menuVisible}: menuButtonType) => {
  return (
    <StyledButton>
      <img onClick={() => setMenuVisible(!menuVisible)}
           src={menuVisible ? close : menu}
           alt="menu"
      />
    </StyledButton>
  );
};
