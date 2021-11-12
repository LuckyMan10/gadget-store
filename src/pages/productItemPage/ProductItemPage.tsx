import {useParams} from 'react-router-dom';
import { Header } from "components/header/header";
import { Footer } from "components/footer/footer";
import { BreadCrumbs } from "components/breadCrumbs/BreadCrumbs";
import {ProductImages} from "components/productItemPage/productImages";
import "./ProductItemPage.scss";

export const ProductItemPage = () => {
  const { category, item } = useParams() as {
    category: string;
    item: string;
  };
  console.log(category, item);

  return (
    <div className="productItemPage">
      <main>
      <BreadCrumbs category={category} item={item}/>
      <ProductImages />
      </main>
    </div>
  );
};
