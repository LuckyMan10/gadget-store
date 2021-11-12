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
  return (
    <div className="homePage">
      <Header />
      <main>
        <NavBar/>
        <TopSlider />
        <Stock />
        <CurrentOffers />
        <CompanySlider />
      </main>
      <Footer />
    </div>
  );
};
