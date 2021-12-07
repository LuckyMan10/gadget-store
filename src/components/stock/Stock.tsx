import stock from "assets/icons/Stock.svg";
import React from 'react';
import "./Stock.scss";
import {stockType} from "types";

const Stock: React.FC<stockType> = ({ isLoading }) => {
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
