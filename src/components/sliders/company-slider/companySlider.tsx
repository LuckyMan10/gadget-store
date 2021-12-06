import "./companySlider.scss";
import Slider from "components/sliders/customSlider";
import { left_arrow_gray, right_arrow_gray } from "components/staticImports";
import React from 'react';

type companiesI = {
  company: string;
  category: string;
  categoryRus: string;
}
type companySliderI = {
  data: Array<companiesI>;
  companyClick(e: React.MouseEvent<HTMLDivElement>): void;
}

const CompanySlider = ({ data, companyClick }: companySliderI) => {
  const SliderProps = {
    zoomFactor: 5,
    slideMargin: 5,
    maxVisibleSlides: 5,
    pageTransition: 500,
    sliderWidth: 100,
    infinity: true,
    arrows: true,
    leftArrowImg: left_arrow_gray,
    rightArrowImg: right_arrow_gray,
    slidePadding: 20,
    slideBorderRadius: 10,
    slideBoxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
    sliderBackground: "none",
    maxImageWidth: 100,
    dots: false,
    autoPlay: false,
  };

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