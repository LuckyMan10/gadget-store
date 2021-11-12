import "./Products.scss";
import { ProductCard } from "./ProductCard";

interface ProductsI {
  toProductHandler(id: string): void;
}

export const Products = ({toProductHandler}: ProductsI) => {
  const mocData = [
    {
      id: "item_1",
      name: "4.7' Смартфон Apple iPhone SE 2020 64 ГБ белый",
      price: "Цена: 30.000 рублей",
    },
    {
      id: "item_2",
      name: "4.7' Смартфон Apple iPhone SE 2020 64 ГБ черный",
      price: "Цена: 5.000 рублей",
    },
    {
      id: "item_3",
      name: "4.7' Смартфон Apple iPhone SE 2020 64 ГБ зеленый",
      price: "Цена: 40.000 рублей",
    },
  ];

  return (
    <article className="Products">
      <div className="Products__wrapper">
        <h1 className="Products__title">Товары всех производителей</h1>
        <section className="Products__cards">
          {mocData.map((el) => {
            return (
              <ProductCard
                key={el.id}
                id={el.id}
                name={el.name}
                price={el.price}
                toProductHandler={toProductHandler}
              />
            );
          })}
        </section>
      </div>
    </article>
  );
};
