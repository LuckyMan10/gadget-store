import heartImg from "assets/icons/heart_transparent.svg";
import { ButtonComponent } from "components/header/ButtonComponent";
import "./productBuy.scss";

interface productBuyI {
  price: number;
  buyHandler(): void;
  toFavHandler(): void;
}

export const ProductBuy = ({
  price,
  buyHandler,
  toFavHandler,
}: productBuyI) => {
  return (
    <article className="productBuy">
      <div className="productBuy__wrapper">
        <section className="productBuy__price">
          <h2 className="price">{price} P.</h2>
        </section>
        <section className="productBuy__toFavBtn">
          <ButtonComponent img={heartImg} />
        </section>
        <section className="productBuy__buyBtn">
          <ButtonComponent text="Купить" />
        </section>
      </div>
    </article>
  );
};
