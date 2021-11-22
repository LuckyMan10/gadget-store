import "./Products.scss";
import { ProductCard } from "./ProductCard";

interface ProductsI {
  toProductHandler(id: string): void;
  products: Array<{
    company: string;
    name: string;
    price: number;
    images: Array<string>;
    description: Array<any>;
    category: string;
    id: string;
  }>;
}

export const Products = ({ toProductHandler, products }: ProductsI) => {

  return (
    <article className="Products">
      <div className="Products__wrapper">
        <h1 className="Products__title">Товары всех производителей</h1>
        <section className="Products__cards">
          {products.map((el) => {
            return (
              <ProductCard
                key={el.id}
                id={el.id}
                name={el.name}
                price={el.price}
                images={el.images}
                description={el.description}
                category={el.category}
                company={el.company}
                toProductHandler={toProductHandler}
              />
            );
          })}
        </section>
      </div>
    </article>
  );
};
