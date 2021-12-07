import "./SearchSettings.scss";
import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { useAppDispatch } from "app/hooks";
import { searchProduct } from "features/api/productsApiSlice";
import { useParams } from "react-router-dom";
import {MuiPriceSlider} from "./MuiPriceSlider";
import {searchSettingsType, currCategoryType, itemType} from "types";


const SearchSettings: React.FC<searchSettingsType> = ({
  category,
  appData
}) => {
  const { category: paramsCategory, company } = useParams() as {
    category: string;
    company?: string;
  };
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<itemType>({});
  const [currCategory, setCurrCategory] = useState<currCategoryType>({
    name: "",
    companies: [],
    category: "",
  });
  const [defaultBox, setDefaultBox] = useState<boolean>(true);
  const [price, setPrice] = useState<number[]>([0, 5000]);

  useEffect(() => {
    let itemsState = {};
    appData.companies.forEach((el) => {
      //@ts-ignore
      if(company && company === el) {
        itemsState[el] = true;  
      } else {
        itemsState[el] = false;
      }
    });
    setCurrCategory(appData);
    setItems(itemsState);
  }, [appData]);

  function defaultBoxClick() {
    setDefaultBox(!defaultBox);
    let checkboxItems = {};
    currCategory.companies.forEach((el) => {
      //@ts-ignore
      checkboxItems[el] = !defaultBox;
    });
    setItems(checkboxItems);
  }
  function searchClick() {
    const companies = Object.keys(items).filter((el) => items[el]);
    dispatch(
      searchProduct({
        api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
        baseURL: "http://localhost:5000/api/products",
        method: "get",
        url: `/searchBar?companies=${companies.join("%")}&price=${price.join(
          "-"
        )}&category=${category}`,
        withCredentials: true,
      })
    )
  }
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const id = (e.target as HTMLElement).id;
    if (id) {
      if (id === "defaultBox") {
        return defaultBoxClick();
      }
      if (id === "search") {
        return searchClick();
      }
      if (defaultBox) {
        setDefaultBox(!defaultBox);
      }
      const changeItems = Object.assign({}, items);
      changeItems[id] = !changeItems[id];
      setItems(changeItems);
    }
  }
  return (
    <article className="searchSettings">
      <div onClick={handleClick} className="searchSettings__wrapper">
        <h2 className="searchSettings__title">
          {currCategory ? currCategory.name : "loading..."}
        </h2>
        <section className="searchSettings__companyList">
          <h3 className="searchSettings__listTitle">Производитель</h3>
          <ul>
            <li className="list">
              <label className="label">
                <Checkbox id="defaultBox" checked={defaultBox} />
                <span className="list__text">Показать все</span>
              </label>
            </li>
            {currCategory ? (
              currCategory.companies.map((el, index) => {
                return (
                  <li id={el} data-key={index} className="list" key={index}>
                    <label id={el} data-key={index} className="label">
                      <Checkbox id={el} checked={items[el]} />
                      <span id={el} data-key={index} className="list__text">
                        {el}
                      </span>
                    </label>
                  </li>
                );
              })
            ) : (
              <div>Загрузка...</div>
            )}
          </ul>
        </section>
        <MuiPriceSlider
          setPrice={setPrice}
          price={price}
        />
        <DynamicButtonComponent id="search" text="Искать" />
      </div>
    </article>
  );
};

export {
  SearchSettings
}
