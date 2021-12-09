import React, { useState, useEffect } from "react";
import "./ProductPage.scss";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import { NavBar } from "components/navbar/navbar";
import { SearchSettings } from "components/searchSettings/SearchSettings";
import { Products } from "components/Products/Products";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFetchNavDataQuery } from "features/api/appApiSlice";
import {
  getProductCategory,
  toBackPage,
  toForwardPage,
} from "features/api/productsApiSlice";
import { Pagination } from "components/pagination/Pagination";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {navbarDataItemType} from "types";

const ProductPage: React.FC = () => {
  const { category, company } = useParams() as {
    category: string;
    company?: string;
  };
  const { pathname } = useLocation();
  const { currentPage, allPages, currentProducts, isWasFetched, loading } =
    useAppSelector((state) => state.products);
  const { data = [], isFetching } = useFetchNavDataQuery();
  const categories = data.filter((el: any) => el.category === category);
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState<navbarDataItemType>();
  useEffect(() => {
    const currCategory = data.filter((el: any) => el.category === category);
    setActiveCategory(currCategory[0]);
    dispatch(
      getProductCategory({
        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
        baseURL: `${process.env.REACT_APP_API_URL}/api/products`,
        method: "get",
        url: `/category?name=${category}${company && company !== "all" ? `&company=${company}` : ""
          }`,
        withCredentials: true,
      })
    );
  }, [activeCategory, isFetching, pathname]);

  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const navigate = useNavigate();
  const toProductHandler = (e: string) => {
    if (e) {
      navigate(`product/${e}`);
    }
  };
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const id = (e.target as HTMLElement).id;
    if (id) {
      console.log(id);
      const oneCategory = data.filter((el: any) => el.id === id);
      console.log('oneCategory: ', oneCategory);
      navigate(`/${oneCategory[0].category}/all`);
      setActiveCategory(oneCategory[0]);
    }
  };
  const paginationHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLElement).id;
    if (id && id === "toBack") {
      dispatch(toBackPage());
    }
    if (id && id === "toForvard") {
      dispatch(toForwardPage());
    }
  };

  return (
    <div className="productPage">
      {categories[0] &&
        (isWasFetched ? (
          currentProducts ? (
            <main>
              <BreadCrumbs
                category={categories[0].category}
                name={categories[0].name}
              />
              {!isMobile && <NavBar navBarClick={navBarClick} />}
              <Products
                products={currentProducts}
                toProductHandler={toProductHandler}
              />
              {activeCategory && (
                <SearchSettings
                  isMobile={isMobile}
                  appData={activeCategory}
                  category={category}
                />
              )}
              {currentProducts.length !== 0 && allPages !== 1 && (
                <Pagination
                  currentPage={currentPage}
                  paginationHandler={paginationHandler}
                  allPages={allPages}
                />
              )}
            </main>
          ) : (
            <div>Ничего не найдено</div>
          )
        ) : (
          <div className="preload-wrapper">
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <CircularProgress />
            </Box>
          </div>
        ))}
    </div>
  );
};

export {
  ProductPage
}