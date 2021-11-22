import productImg from "assets/images/slider_2.webp";
import "./ProductCard.scss";

interface ProductCardI {
    company: string;
    name: string;
    price: number;
    images: Array<string>;
    description: Array<any>;
    category: string;
    id: string;
  toProductHandler(id: string): void;
}

export const ProductCard = ({ name, price, id, toProductHandler, images }: ProductCardI) => {

  return (
    <div onClick={() => toProductHandler(id)} className="card">
      <img className="card__image" src={images[1]} alt="product image" />
      <section className="card__info">
        <h2 className="card__name">{name}</h2>
        <p className="card__price">Цена: {price} рублей.</p>
      </section>
    </div>
  );
};
