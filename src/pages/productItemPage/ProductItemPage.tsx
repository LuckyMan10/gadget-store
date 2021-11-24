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
import {useAppSelector} from "app/hooks";

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
  const { isAuth } = useAppSelector((state) => state.auth);
  const { data = [], isFetching } = useFetchNavDataQuery();
  const {data: productData, isFetching: productIsFetch} = useFetchOneProductQuery(item);
  const [categories] = data.filter((el: navbarDataItemI) => el.category === category);
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLElement).id;
    console.log('buy id: ', id);
    if(isAuth) {
      console.log('auth add')
    } else {
      console.log('not auth add')
    }
    
  };

  return (
    <div className="productItemPage">
      <main>
      {categories && productData ?
      <>
        <BreadCrumbs category={categories.category} name={categories.name} item={item} />
        {!productIsFetch && <ProductImages images={productData[0].images} title={data[0].name}/>}
        <BuyButtonComponent
          text="Купить"
          toFav={heartImg}
          isCart={false}
          price={50000}
          onClick={clickHandler}
          id={productData[0].id}
        />
        {!productIsFetch && <Specifications data={productData[0].description} />}
      </>
      : <div>Loading...</div>
      }
      </main>
    </div>
  );
};
