import "./Products.scss";
import { ProductCard } from "./ProductCard";
import React from 'react';
import { useAppSelector } from "app/hooks";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {productsType} from "types"

const Products: React.FC<productsType> = ({ toProductHandler, products }) => {

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
                <ProductCard {...el}/>
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

export {
  Products
}