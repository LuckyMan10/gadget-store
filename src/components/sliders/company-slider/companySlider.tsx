import "./companySlider.scss";
import Slider from "components/sliders/customSlider";
import {left_arrow_gray, right_arrow_gray} from "components/staticImports";
import React from 'react';

interface companiesI {
  company: string;
  category: string;
  logo: string;
}
interface companySliderI {
  data: Array<companiesI>;
  companyClick(e: React.MouseEvent<HTMLDivElement>): void;
}

export const CompanySlider = ({data, companyClick}: companySliderI) => {
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
    slideBoxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
    sliderBackground: "none",
    maxImageWidth: 100,
    dots: false,
    autoPlay: false,
  };

  return (
    <article onClick={companyClick} className="CompanySlider">
      <Slider {...SliderProps}>
        {data.map((slide, index) => (
          <div
            data-category={slide.category}
            data-company={slide.company}
            className="slide"
            key={`company_key_carousel_${index}`}
          >
            <section
              data-category={slide.category}
              data-company={slide.company}
              className="slide__image"
            >
              <img
                data-category={slide.category}
                data-company={slide.company}
                src={slide.logo}
                alt="character"
              />
            </section>
          </div>
        ))}
      </Slider>
    </article>
  );
};
