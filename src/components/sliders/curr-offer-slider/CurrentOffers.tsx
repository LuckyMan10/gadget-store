import {left_arrow, right_arrow} from "components/staticImports";
import React from "react";
import Slider from "components/sliders/customSlider";
import "./CurrentOffers.scss";
import { useNavigate } from "react-router-dom";

interface productI {
  company: string;
  productName: string;
  price: number;
  images: Array<string>;
  description: Array<any>;
  category: string;
  categoryRus: string;
  id: string;
}

interface currOffersI {
  data: {
    slides: Array<productI>;
    slider: string;
    _id: string;
  };
}

export const CurrentOffers = ({ data }: currOffersI) => {
  const SliderProps = {
    zoomFactor: 5,
    slideMargin: 5,
    maxVisibleSlides: 3,
    pageTransition: 500,
    sliderWidth: 90,
    infinity: true,
    arrows: true,
    leftArrowImg: left_arrow,
    rightArrowImg: right_arrow,
    slidePadding: 20,
    slideBorderRadius: 10,
    slideBoxShadow: "none",
    sliderBackground: "white",
    dots: false,
    autoPlay: false,
  };
  const navigate = useNavigate();
  function clickHandler(e: React.MouseEvent<HTMLDivElement>) {
    const id = (e.target as HTMLElement).id;
    const category = (e.target as HTMLElement).dataset.category;
    if (id && category) {
      navigate(`${category}/all/product/${id}`);
    }
  }

  return (
    <div onClick={clickHandler} className="CurrentOffers">
      <h2 className="CurrentOffers__title">Актуальные предложения</h2>
      <Slider {...SliderProps}>
        {data.slides.map((slide) => (
          <div
            data-category={slide.category}
            id={slide.id}
            className="slide"
            key={slide.id}
          >
            <section
              data-category={slide.category}
              id={slide.id}
              className="slide__image"
            >
              <img
                data-category={slide.category}
                id={slide.id}
                src={slide.images[2]}
                alt="character"
              />
            </section>
            <section
              data-category={slide.category}
              id={slide.id}
              className="slide__text"
            >
              <h2 data-category={slide.category} id={slide.id}>
                {slide.productName}
              </h2>
              <p data-category={slide.category} id={slide.id}>
                Цена: {slide.price} рублей.
              </p>
            </section>
          </div>
        ))}
      </Slider>
    </div>
  );
};
