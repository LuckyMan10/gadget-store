import { useParams } from "react-router-dom";
import { Header } from "components/header/header";
import { Footer } from "components/footer/footer";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import { ProductImages } from "components/productItemPage/productImages";
import { Specifications } from "components/productItemPage/specifications";
import { BuyButtonComponent } from "components/buttons/Buttons";
import heartImg from "assets/icons/heart_transparent.svg";
import "./ProductItemPage.scss";

export const ProductItemPage = () => {
  const { category, item } = useParams() as {
    category: string;
    item: string;
  };
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
        <BreadCrumbs category={category} item={item} />
        <ProductImages />
        <BuyButtonComponent
          text="Купить"
          toFav={heartImg}
          isCart={false}
          price={50000}
          onClick={clickHandler}
          id={"20"}
        />
        <Specifications buttonsData={buttonsData} />
      </main>
    </div>
  );
};
