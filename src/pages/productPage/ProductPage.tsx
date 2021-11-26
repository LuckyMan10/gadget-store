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
import { useFetchNavDataQuery } from "features/api/appApiSlice";
import { getProductCategory, toBackPage, toForwardPage } from "features/api/productsApiSlice";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import {Pagination} from "components/pagination/Pagination";

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
  const { currentPage, allPages, currentProducts, isWasFetched, loading } = useAppSelector(
    (state) => state.products
  );
  const { data = [], isFetching } = useFetchNavDataQuery();
  const categories = data.filter((el: any) => el.category === category);

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<navbarDataItemI>();
  useEffect(() => {
    const currCategory = data.filter((el: any) => el.category === category);
    setActiveCategory(currCategory[0]);
    dispatch(
      getProductCategory({
        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
        access_key: user.accessToken,
        baseURL: "http://localhost:5000/api/products",
        method: "get",
        url: `/category?name=${category}`,
        withCredentials: true,
      })
    );
  }, [activeCategory, isFetching]);

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const navigate = useNavigate();
  const toProductHandler = (e: string) => {
    if (e) {
      console.log(e);
      navigate(e);
    }
  };
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const id = (e.target as HTMLElement).id;
    if (id) {
      const oneCategory = data.filter((el: any) => el.id === id);
      setActiveCategory(oneCategory[0]);
    }
  };
  const paginationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLElement).id;
    if(id && id === "toBack") {
      dispatch(toBackPage());
    }
    if(id && id === "toForvard") {
      dispatch(toForwardPage());
    }
  }

  return (
    <div className="productPage">
      {categories[0] ? (
        <main>
          <BreadCrumbs
            category={categories[0].category}
            name={categories[0].name}
          />
          {!isMobile && <NavBar navBarClick={navBarClick} />}
          {loading &&
          currentProducts &&
          currentProducts.length !== 0 &&
          isWasFetched ? (
            <Products
              products={currentProducts}
              toProductHandler={toProductHandler}
            />
          ) : (
            <div>Загрузка...</div>
          )}
          {activeCategory && (
            <SearchSettings
              isMobile={isMobile}
              appData={activeCategory}
              category={category}
            />
          )}
          <Pagination
            currentPage={currentPage}
            paginationHandler={paginationHandler}
            allPages={allPages}
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
