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

export const DynamicButtonComponent = ({ text, img, id }: ClickButtonType) => {
  return (
    <button id={id} className="clickButton">
      {img && <img id={id} src={img} alt="icon button" />}
      {text && <span id={id}>{text}</span>}
    </button>
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
    <article id={id} className="buyButton">
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
