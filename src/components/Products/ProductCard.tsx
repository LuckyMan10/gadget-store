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
}

export const ProductCard = ({ name, price, id, images }: ProductCardI) => {

  return (
    <div id={id} className="card">
      <img id={id} className="card__image" src={images[1]} alt="product image" />
      <section id={id} className="card__info">
        <h2 id={id} className="card__name">{name}</h2>
        <p id={id} className="card__price">Цена: {price} рублей.</p>
      </section>
    </div>
  );
};
