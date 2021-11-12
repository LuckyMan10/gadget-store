import "./Products.scss";
import { ProductCard } from "./ProductCard";

interface ProductsI {
  toProductHandler(e: React.MouseEvent<HTMLButtonElement>): void;
}



export const Products = ({toProductHandler}: ProductsI) => {


  return (
    <article className="Products">
      <div className="Products__wrapper">
        <h1 className="Products__title">Товары всех производителей</h1>
        <section onClick={toProductHandler} className="Products__cards">
          <ProductCard
            name="4.7' Смартфон Apple iPhone SE 2020 64 ГБ белый"
            price="Цена: 30.000 рублей"
          />
          <ProductCard
            name="4.7' Смартфон Apple iPhone SE 2020 64 ГБ белый"
            price="Цена: 30.000 рублей"
          />
          <ProductCard
            name="4.7' Смартфон Apple iPhone SE 2020 64 ГБ белый"
            price="Цена: 30.000 рублей"
          />
          <ProductCard
            name="4.7' Смартфон Apple iPhone SE 2020 64 ГБ белый"
            price="Цена: 30.000 рублей"
          />
          <ProductCard
            name="4.7' Смартфон Apple iPhone SE 2020 64 ГБ белый"
            price="Цена: 30.000 рублей"
          />
          <ProductCard
            name="4.7' Смартфон Apple iPhone SE 2020 64 ГБ белый"
            price="Цена: 30.000 рублей"
          />
        </section>
      </div>
    </article>
  );
};
