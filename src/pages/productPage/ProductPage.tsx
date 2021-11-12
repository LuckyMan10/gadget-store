import React, { FC, useState, useEffect } from "react";
import "./ProductPage.scss";
import { Header } from "components/header/header";
import { useParams, useNavigate } from "react-router-dom";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import { NavBar } from "components/navbar/navbar";
import { SearchSettings } from "components/searchSettings/SearchSettings";
import { Products } from "components/Products/Products";
import {Footer} from 'components/footer/footer';
import {useMediaQuery} from 'react-responsive';

export const ProductPage: FC = () => {
  const { category } = useParams() as {
    category: string;
  };
  const [price, setPrice] = useState<number[]>([0, 5000]);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const navigate = useNavigate();
  const companies = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Samsung" },
    { id: 3, name: "Xiaomi" },
    { id: 4, name: "LG" },
    { id: 5, name: "Sony" },
    { id: 6, name: "Poco" },
  ];
  const changePrice = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const toProductHandler = (e: string) => {
    if(e) {
      navigate(e);
    }
  }

  return (
    <div className="productPage">
      <main>
        <BreadCrumbs category={category} />
        {!isMobile && <NavBar />}
        <Products
        toProductHandler={toProductHandler}
        />
        <SearchSettings
          price={price}
          isMobile={isMobile}
          changePrice={changePrice}
          companiesList={companies}
          title={category}
        />
      </main>
    </div>
  );
};
