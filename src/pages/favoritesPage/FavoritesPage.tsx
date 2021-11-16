import "./FavoritesPage.scss";
import "./FavoritesItem.scss";
import fillHeart from "assets/icons/fillHeart.svg";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { ProductItemComponent } from "components/productItem/ProductItem";
import productImg from "assets/images/slider_2.webp";

export const FavoritesPage = () => {
  const button_1 = { id: "addToCart", text: "Добавить в корзину" };
  const button_2 = { id: "remove", text: "Удалить" };

  return (
    <div className="favoritesPage">
      <section className="favoritesPage__header">
        <img src={fillHeart} alt="heart" />
        <h1 className="favoritesPage__title">Избранное</h1>
      </section>
      <section className="favoritesPage__products">
        <ProductItemComponent
          img={productImg}
          name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
          isCounter={false}
          btn_1={button_1}
          btn_2={button_2}
          price={50000}
        />
        <ProductItemComponent
          img={productImg}
          name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
          isCounter={false}
          btn_1={button_1}
          btn_2={button_2}
          price={50000}
        />
        <ProductItemComponent
          img={productImg}
          name="Смартфон Apple iPhone SE 2020 128 ГБ черный"
          isCounter={false}
          btn_1={button_1}
          btn_2={button_2}
          price={50000}
        />
      </section>
      <section className="favoritesPage__buttons">
        <DynamicButtonComponent text="Вернуться на главную" id="/" />
      </section>
    </div>
  );
};
