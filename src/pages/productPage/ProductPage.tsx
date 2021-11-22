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
import {useFetchNavDataQuery, useFetchCategoryQuery} from "features/api/appApiSlice";

interface navbarDataItemI {
    id: string;
    category: string;
    name: string;
    companies: string[];
}

export const ProductPage: FC = () => {
  const { category } = useParams() as {
    category: string;
  };
  const { data = [], isFetching } = useFetchNavDataQuery();
  const categoryItems = useFetchCategoryQuery(category);
  if(categoryItems.data) {
    console.log(categoryItems.data);
  }
  const [price, setPrice] = useState<number[]>([0, 5000]);
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const navigate = useNavigate();
  const changePrice = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  const toProductHandler = (e: string) => {
    if (e) {
      console.log(e);
      navigate(e);
    }
  };
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const id = (e.target as HTMLElement).id;
    if(id) {
      const oneCategory = data.filter((el: any) => el.id === id);
      console.log(oneCategory)
    }
  };
  const categories = data.filter((el: any) => el.category === category);

  return (
    <div className="productPage">
      {categories[0] ? (
        <main>
          <BreadCrumbs category={categories[0].category} name={categories[0].name}/>
          {!isMobile && <NavBar navBarClick={navBarClick} />}
          {categoryItems.data ? <Products products={categoryItems.data} toProductHandler={toProductHandler} /> : <div>Загрузка...</div>}
          <SearchSettings
            price={price}
            isMobile={isMobile}
            changePrice={changePrice}
            appData={data}
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
