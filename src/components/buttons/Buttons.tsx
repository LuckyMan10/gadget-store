import minus from "assets/icons/minus.svg"
import plus from "assets/icons/plus.svg";

type ClickButtonType = {
  text?: string;
  img?: string;
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
  value: number;
  increment(): void;
  decrement(): void;
};

export const DynamicButtonComponent = ({ text, img, id }: ClickButtonType) => {
  return (
    <button id={id} className="clickButton">
      {img && <img id={id} src={img} alt="icon button" />}
      {text && <span id={id}>{text}</span>}
    </button>
  );
};

export const ChangeValueButtonComponent = ({value, increment, decrement}: ChangeValueButtonType) => {
  return (
    <article className="ChangeValueButton">
      <button
      onClick={increment}
      className="ChangeValueButton__increment"
      >
      <img src={plus} alt="increment"/>
      </button>
      <p>{value}</p>
      <button
      onClick={decrement}
      className="ChangeValueButton__decrement"
      >
      <img src={minus} alt="decrement"/>
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
