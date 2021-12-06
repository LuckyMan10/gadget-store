import "./Products.scss";
import { ProductCard } from "./ProductCard";
import React from 'react';
import { useAppSelector } from "app/hooks";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface ProductsI {
  toProductHandler(id: string): void;
  products: Array<{
    company: string;
    productName: string;
    price: number;
    images: Array<string>;
    description: Array<any>;
    category: string;
    categoryRus: string;
    id: string;
  }>;
}

export const Products = ({ toProductHandler, products }: ProductsI) => {

  const { productsLoaded } = useAppSelector((state) => state.products);

  function clickHandler(e: React.MouseEvent<HTMLElement>) {
    const id = (e.target as HTMLElement).id;
    if (id) {
      toProductHandler(id);
    }
  }

  return (
    <article className="Products">
      <div className="Products__wrapper">
        <h1 className="Products__title">Товары</h1>
        <section onClick={clickHandler} className="Products__cards">
          {productsLoaded
            ? products.map((el) => {
              return (
                <ProductCard
                  key={el.id}
                  id={el.id}
                  name={el.productName}
                  price={el.price}
                  images={el.images}
                  description={el.description}
                  category={el.category}
                  company={el.company}
                />
              );
            })
            : <div className="preload-wrapper">
              <Box>
                <CircularProgress />
              </Box>
            </div>
          }
        </section>
      </div>
    </article>
  );
};
