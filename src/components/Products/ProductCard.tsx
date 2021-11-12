import productImg from "assets/images/slider_2.webp";
import "./ProductCard.scss";

interface ProductCardI {
  name: string;
  price: string;
}

export const ProductCard = ({ name, price }: ProductCardI) => {
  return (
    <div className="card">
      <img className="card__image" src={productImg} alt="product image" />
      <section className="card__info">
        <h2 className="card__name">{name}</h2>
        <p className="card__price">{price}</p>
      </section>
    </div>
  );
};
