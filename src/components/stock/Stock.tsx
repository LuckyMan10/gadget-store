import stock from "assets/icons/Stock.svg";
import "./Stock.scss";

type Stock = {
  isLoading: boolean
}

const Stock = ({ isLoading }: Stock) => {
  return (
    <section className="Stock">
      {isLoading
        && <div className="Stock__wrapper">
          <div className="Stock__content">
            <div className="Stock__top">
              <h2>Акции</h2>
              <img src={stock} alt="stock" />
            </div>
            <div className="Stock__list">
              <ul>
                <li>Товары со скидкой</li>
                <li>Выгодные комплекты</li>
              </ul>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export {
  Stock
}
