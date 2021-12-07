import "./HomePage.scss";
import React from 'react'
import { NavBar } from 'components/navbar/navbar';
import { TopSlider } from 'components/sliders/top-slider/topSlider'
import { Stock } from 'components/stock/Stock';
import { CurrentOffers } from 'components/sliders/curr-offer-slider/CurrentOffers';
import { CompanySlider } from 'components/sliders/company-slider/companySlider';
import { useFetchTopSliderQuery, useFetchCurrOffersSliderQuery, useFetchCompaniesQuery } from "features/api/appApiSlice";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { data: topSlider = [] as any } = useFetchTopSliderQuery("topSlider");
  const { data: currOffSlider = [] as any } = useFetchCurrOffersSliderQuery("currentOffersSlider");
  const { data: companies = [] } = useFetchCompaniesQuery("companySlider");
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const category = (e.target as HTMLElement).dataset.category;
    if (category) {
      navigate(`${category}/all`)
    }
  }
  const companyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const category = (e.target as HTMLElement).dataset.category;
    const company = (e.target as HTMLElement).dataset.company;
    if (category && company) {
      navigate(`${category}/${company}`);
    }
  }
  return (
    <div className="homePage">
      {topSlider[0] &&
        currOffSlider[0] &&
        companies[0]
        ? (
          <main>
            <NavBar navBarClick={navBarClick} />
            <TopSlider data={topSlider[0]} />
            <Stock isLoading={!!topSlider[0]} />
            <CurrentOffers data={currOffSlider[0]} />
            <CompanySlider companyClick={companyClick} data={companies} />
          </main>
        )
        : (
          <div className="preload-wrapper">
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <CircularProgress />
            </Box>
          </div>
        )
      }
    </div>
  );
};

export {
  HomePage
}