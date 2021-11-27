import "./SearchSettings.scss";
import React, { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { useMediaQuery } from "react-responsive";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { useAppSelector, useAppDispatch } from "app/hooks";
import {searchProduct} from "features/api/productsApiSlice";

interface SearchSettingsI {
  category: string;
  appData: {
    id: string;
    category: string;
    name: string;
    companies: string[];
  }
  isMobile: boolean;
}
interface currCategoryI {
  name: string;
  companies: Array<string>;
  category: string;
}

interface itemI {
  [key: string]: boolean;
}

export const SearchSettings = ({
  category,
  appData,
  isMobile,
}: SearchSettingsI) => {
  const dispatch = useAppDispatch();
  const {user, isAuth} = useAppSelector((state) => state.auth);
  const [items, setItems] = useState<itemI>({});
  const [currCategory, setCurrCategory] = useState<currCategoryI>({
    name: "",
    companies: [],
    category: "",
  });
  const [defaultBox, setDefaultBox] = useState<boolean>(true);
  const [price, setPrice] = useState<number[]>([0, 5000]);
  const changePrice = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
  };
  useEffect(() => {
    let itemsState = {};
    appData.companies.forEach((el) => {
      //@ts-ignore
      itemsState[el] = false;
    });
    setCurrCategory(appData);
    setItems(itemsState);
  }, [appData]);
  function valuetext(value: number) {
    return `${value}`;
  }
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
    if(isAuth) {
      const companies = Object.keys(items).filter((el) => items[el]);
      dispatch(
        searchProduct({
          api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
          access_key: user.accessToken,
          baseURL: "http://localhost:5000/api/products",
          method: "get",
          url: `/searchBar?companies=${companies.join("-")}&price=${price.join("-")}&category=${category}`,
          withCredentials: true
        })
      ).then((data) => {
        console.log('result: ', data);
      })
    };
  }
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const id = (e.target as HTMLElement).id;
    const datasetValue = (e.target as HTMLElement).dataset.key;
    if (id) {
      if (id === "defaultBox") {
        return defaultBoxClick();
      }
      if (id === "search") {
        return searchClick();
      }
      if(defaultBox) {
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
              <div>loading...</div>
            )}
          </ul>
        </section>
        <section className="searchSettings__PriceSlider">
          <h3>
            Цена от {price[0]} до {price[1]} рублей
          </h3>
          <Box
            sx={{
              width: 300,
            }}
          >
            <Slider
              getAriaLabel={() => "Price"}
              step={100}
              min={0}
              max={50000}
              onChange={changePrice}
              value={price}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
        </section>
        <DynamicButtonComponent id="search" text="Искать" />
      </div>
    </article>
  );
};
