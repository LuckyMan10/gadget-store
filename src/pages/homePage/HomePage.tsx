import "./HomePage.scss";
import React, {FC} from 'react'
import {Header} from 'components/header/header';
import {NavBar} from 'components/navbar/navbar';
import {TopSlider} from 'components/sliders/top-slider/topSlider'
import {Stock} from 'components/stock/Stock';
import {CurrentOffers} from 'components/sliders/curr-offer-slider/CurrentOffers';
import {CompanySlider} from 'components/sliders/company-slider/companySlider';
import {Footer} from 'components/footer/footer';

export const HomePage: FC = () => {

  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    console.log(e);
  }

  return (
    <div className="homePage">
      <main>
        <NavBar navBarClick={navBarClick}/>
        <TopSlider />
        <Stock />
        <CurrentOffers />
        <CompanySlider />
      </main>
    </div>
  );
};
