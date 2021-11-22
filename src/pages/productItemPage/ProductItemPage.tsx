import { useParams } from "react-router-dom";
import { Header } from "components/header/header";
import { Footer } from "components/footer/footer";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import { ProductImages } from "components/productItemPage/productImages";
import { Specifications } from "components/productItemPage/specifications";
import { BuyButtonComponent } from "components/buttons/Buttons";
import heartImg from "assets/icons/heart_transparent.svg";
import "./ProductItemPage.scss";
import {useFetchNavDataQuery, useFetchOneProductQuery} from "features/api/appApiSlice";

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
  const { data = [], isFetching } = useFetchNavDataQuery();
  const {data: productData, isFetching: productIsFetch} = useFetchOneProductQuery(item);
  const categories = data.filter((el: navbarDataItemI) => el.category === category);
  const clickHandler = () => {};
  const buttonsData = [
    { id: "1", text: "Мобильная связь" },
    { id: "2", text: "Заводские данные" },
    { id: "3", text: "Внешний вид" },
    { id: "4", text: "Общие параметры" },
    { id: "5", text: "Экран" },
    { id: "6", text: "Корпус и защита" },
    { id: "7", text: "Система" },
  ];

  return (
    <div className="productItemPage">
      <main>
      {categories[0] && productData ?
      <>
        <BreadCrumbs category={categories[0].category} name={categories[0].name} item={item} />
        {!productIsFetch && <ProductImages images={productData[0].images} title={data[0].name}/>}
        <BuyButtonComponent
          text="Купить"
          toFav={heartImg}
          isCart={false}
          price={50000}
          onClick={clickHandler}
          id={"20"}
        />
        {!productIsFetch && <Specifications data={productData[0].description} />}
      </>
      : <div>Loading...</div>
      }
      </main>
    </div>
  );
};
