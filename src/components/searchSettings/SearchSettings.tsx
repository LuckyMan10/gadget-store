import "./SearchSettings.scss";
import React, { useState } from "react";
import {Slider} from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import {ButtonComponent} from "components/header/ButtonComponent";
import {useMediaQuery} from 'react-responsive';

interface SearchSettingsI {
  title: string;
  companiesList: Array<{ id: number; name: string }>;
  changePrice(event: Event, newValue: number | number[]): void;
  price: Array<number>;
  isMobile: boolean;
}

export const SearchSettings = ({
  title,
  companiesList,
  changePrice,
  price,
  isMobile
}: SearchSettingsI) => {

  function valuetext(value: number) {
      return `${value}`;
  }

  return (
    <article className="searchSettings">
      <div className="searchSettings__wrapper">
      <h2 className="searchSettings__title">{title}</h2>
      <section className="searchSettings__companyList">
        <h3 className="searchSettings__listTitle">Производитель</h3>
        <ul>
          <li className="list">
            <label className="label">
              <Checkbox defaultChecked/>
              <span className="list__text">Показать все</span>
            </label>
          </li>
          {companiesList.map((el) => {
            return (
              <li className="list" key={el.id}>
                <label className="label">
                  <Checkbox />
                  <span className="list__text">{el.name}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="searchSettings__PriceSlider">
        <h3>Цена от {price[0]} до {price[1]} рублей</h3>
        <Box sx={{
          width: 300
          }}>
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
      <ButtonComponent text="Искать"/>
      </div>
    </article>
  );
};
