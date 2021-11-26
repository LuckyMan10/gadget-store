import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "components/header/header";
import { Footer } from "components/footer/footer";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import { ProductImages } from "components/productItemPage/productImages";
import { Specifications } from "components/productItemPage/specifications";
import { BuyButtonComponent } from "components/buttons/Buttons";
import heartImg from "assets/icons/heart_transparent.svg";
import "./ProductItemPage.scss";
import { useFetchNavDataQuery } from "features/api/appApiSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { updateUserCart } from "features/api/userCartApiSlice";
import { getOneProduct } from "features/api/productsApiSlice";

interface navbarDataItemI {
  id: string;
  category: string;
  name: string;
  companies: Array<string>;
}

export const ProductItemPage = () => {
  const { category, item } = useParams() as {
    category: string | string[];
    item: string;
  };
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(
      getOneProduct({
        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
        access_key: user.accessToken,
        baseURL: "http://localhost:5000/api/products",
        method: "get",
        url: `/find?id=${item}`,
        withCredentials: true,
      })
    );
  }, []);
  const { oneProduct, isWasFetched, loading } = useAppSelector(
    (state) => state.products
  );
  const { data = [], isFetching } = useFetchNavDataQuery();
  const [categories] = data.filter(
    (el: navbarDataItemI) => el.category === category
  );
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLElement).id;
    console.log("buy id: ", id);
    if (isAuth) {
      dispatch(
        updateUserCart({
          api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
          access_key: user.accessToken,
          baseURL: "http://localhost:5000/api/user",
          method: "put",
          url: "/cart",
          withCredentials: true,
          data: {
            productId: id,
            type: "INCREMENT",
          },
        })
      );
    } else {
      console.log("not auth add");
    }
  };

  return (
    <div className="productItemPage">
      <main>
        {categories && loading && isWasFetched ? (
          <>
            <BreadCrumbs
              category={categories.category}
              name={categories.name}
              item={item}
            />
            <ProductImages
                images={oneProduct.images}
                title={data[0].name}
            />
            <BuyButtonComponent
              text="Купить"
              toFav={heartImg}
              isCart={false}
              price={50000}
              onClick={clickHandler}
              id={oneProduct.id}
            />
            <Specifications data={oneProduct.description} />
          </>
        ) : (
          <div>Загрузка...</div>
        )}
      </main>
    </div>
  );
};
