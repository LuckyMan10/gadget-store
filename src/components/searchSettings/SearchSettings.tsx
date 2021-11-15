import "./SearchSettings.scss";
import React, { useState } from "react";
import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { useMediaQuery } from "react-responsive";
import { DynamicButtonComponent } from "components/buttons/Buttons";

interface SearchSettingsI {
  category: string;
  appData: Array<{
    id: string;
    route: string;
    img: string;
    categories: string[];
    firms: string[];
  }>;
  changePrice(event: Event, newValue: number | number[]): void;
  price: Array<number>;
  isMobile: boolean;
}

export const SearchSettings = ({
  category,
  appData,
  changePrice,
  price,
  isMobile,
}: SearchSettingsI) => {
  const currentCategory = appData.filter((el) => el.categories[1] === category);
  console.log(currentCategory);
  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <article className="searchSettings">
      <div className="searchSettings__wrapper">
        <h2 className="searchSettings__title">{currentCategory[0] ? currentCategory[0].categories[0] : "loading..."}</h2>
        <section className="searchSettings__companyList">
          <h3 className="searchSettings__listTitle">Производитель</h3>
          <ul>
            <li className="list">
              <label className="label">
                <Checkbox defaultChecked />
                <span className="list__text">Показать все</span>
              </label>
            </li>
            {currentCategory[0] ? currentCategory[0].firms.map((el, index) => {
              return (
                <li className="list" key={index}>
                  <label className="label">
                    <Checkbox />
                    <span className="list__text">{el}</span>
                  </label>
                </li>
              );
            })
            : <div>loading...</div>
            }
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
