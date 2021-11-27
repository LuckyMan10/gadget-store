import "./HomePage.scss";
import React, {FC} from 'react'
import {Header} from 'components/header/header';
import {NavBar} from 'components/navbar/navbar';
import {TopSlider} from 'components/sliders/top-slider/topSlider'
import {Stock} from 'components/stock/Stock';
import {CurrentOffers} from 'components/sliders/curr-offer-slider/CurrentOffers';
import {CompanySlider} from 'components/sliders/company-slider/companySlider';
import {Footer} from 'components/footer/footer';
import {useFetchTopSliderQuery, useFetchCurrOffersSliderQuery, useFetchCompaniesQuery} from "features/api/appApiSlice";
import {useNavigate} from 'react-router-dom';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const {data: topSlider = [], isFetching: isTopSliderFetching} = useFetchTopSliderQuery("topSlider");
  const {data: currOffSlider = [], isFetching: isCurrOffFetching} = useFetchCurrOffersSliderQuery("currentOffersSlider");
  const {data: companies = [], isFetching: isCompaniesFetching}= useFetchCompaniesQuery("companySlider");
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    console.log('e: ', e);
  }
  const companyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const category = (e.target as HTMLElement).dataset.category;
    const company = (e.target as HTMLElement).dataset.company;
    if(category && company) {
      navigate(category);
    }
  }
  return (
    <div className="homePage">
      <main>
        <NavBar navBarClick={navBarClick}/>
        {!isTopSliderFetching && topSlider[0] ? <TopSlider data={topSlider[0]}/> : <div>Загрузка...</div>}
        <Stock />
        {!isCurrOffFetching && topSlider[0] ? <CurrentOffers data={currOffSlider[0]}/> : <div>Загрузка...</div>}
        {!isCompaniesFetching && companies ? <CompanySlider companyClick={companyClick} data={companies}/> : <div>Загрузка...</div>}
      </main>
    </div>
  );
};
