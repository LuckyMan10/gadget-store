import "./companySlider.scss";
import Slider from "components/sliders/customSlider";
import React from 'react';
import { SliderProps } from "./sliderSettings";
import {companySliderType} from "types";

const CompanySlider: React.FC<companySliderType<string>> = ({ data, companyClick }) => {

  return (
    <article onClick={companyClick} className="CompanySlider">
      {data && data.length !== 0 &&
        <div className="CompanySlider__wrapper">
          <Slider {...SliderProps}>
            {data.map((slide, index) => (
              <div
                data-category={slide.category}
                data-company={slide.company}
                className="slide"
                key={`company_key_carousel_${index}`}
              >
                <h1 data-category={slide.category}
                  data-company={slide.company}>{slide.company}</h1>
                <p data-category={slide.category}
                  data-company={slide.company}>{slide.categoryRus}</p>
              </div>
            ))

            }
          </Slider>
        </div>
      }
    </article>
  );
};

export {
  CompanySlider
}