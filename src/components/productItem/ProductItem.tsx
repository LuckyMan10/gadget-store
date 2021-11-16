import "./ProductItem.scss";
import {
  DynamicButtonComponent,
  ChangeValueButtonComponent,
} from "components/buttons/Buttons";

interface productItemI {
  img: string;
  name: string;
  isCounter: boolean;
  price: number;
  btn_1?: { id: string; text: string };
  btn_2?: { id: string; text: string };
  counterValue?: number;
  increment?(): void;
  decrement?(): void;
}

export const ProductItemComponent = ({
  img,
  name,
  btn_1,
  btn_2,
  isCounter,
  counterValue,
  price,
  increment,
  decrement
}: productItemI) => {
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
              <DynamicButtonComponent id={btn_1.id} text={btn_1.text} />
            </section>
          )}
          {btn_2 && (
            <section className="productItem__btn-2">
              <DynamicButtonComponent id={btn_2.id} text={btn_2.text} />
            </section>
          )}
        </div>
      </div>
      {isCounter && (
        <section className="productItem__counter">
          <ChangeValueButtonComponent
            value={counterValue}
            increment={increment}
            decrement={decrement}
          />
        </section>
      )}
      <p className="productItem__price">{price} Рублей</p>
    </article>
  );
};
