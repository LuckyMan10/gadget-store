import React from "react";
import Slider from "components/sliders/customSlider";
import "./CurrentOffers.scss";
import { useNavigate } from "react-router-dom";
import {SliderProps} from "./sliderSettings";
import {currOffersType} from "types";

const CurrentOffers: React.FC<currOffersType> = ({ data }) => {

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
      <h2 className="CurrentOffers__title">
        "Актуальные предложения"
      </h2>
      {data &&
        data.slides &&
        data.slides.length !== 0 &&
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
          ))
          }
        </Slider>
      }
    </div>
  );
};

export {
  CurrentOffers
}