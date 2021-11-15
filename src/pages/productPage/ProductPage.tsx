import React, { FC, useState, useEffect } from "react";
import "./ProductPage.scss";
import { Header } from "components/header/header";
import { useParams, useNavigate } from "react-router-dom";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import { NavBar } from "components/navbar/navbar";
import { SearchSettings } from "components/searchSettings/SearchSettings";
import { Products } from "components/Products/Products";
import { Footer } from "components/footer/footer";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ErorGif from "assets/images/not_found.gif";
import { ErrorComponent } from "components/Error/ErrorComponent";

export const ProductPage: FC = () => {
  const appData = useAppSelector((state) => state.appData.appDataItems);
  const { category } = useParams() as {
    category: string;
  };
  const [price, setPrice] = useState<number[]>([0, 5000]);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const navigate = useNavigate();
  const changePrice = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const toProductHandler = (e: string) => {
    if (e) {
      navigate(e);
    }
  };
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    console.log(e);
  };
  const categories = appData.filter((el) => el.categories[1] === category);

  return (
    <div className="productPage">
      {categories[0] ? (
        <main>
          <BreadCrumbs category={categories[0].categories} />
          {!isMobile && <NavBar navBarClick={navBarClick} />}
          <Products toProductHandler={toProductHandler} />
          <SearchSettings
            price={price}
            isMobile={isMobile}
            changePrice={changePrice}
            appData={appData}
            category={category}
          />
        </main>
      ) : (
        <ErrorComponent
          message="Упс, кажется такой страницы не существует"
          img={ErorGif}
        />
      )}
    </div>
  );
};
