import slideImg from "assets/images/slider_2.webp";
import right_arrow from "assets/icons/right_arrow.svg";
import left_arrow from "assets/icons/left_arrow.svg";
import React from "react";
import Slider from "components/sliders/customSlider";
import "./CurrentOffers.scss";

export const CurrentOffers = () => {
  const SliderProps = {
    zoomFactor: 5,
    slideMargin: 5,
    maxVisibleSlides: 3,
    pageTransition: 500,
    sliderWidth: 90,
    infinity: true,
    leftArrowImg: left_arrow,
    rightArrowImg: right_arrow,
    slidePadding: 20,
    slideBorderRadius: 10,
    slideBoxShadow:
      "none",
    sliderBackground: "white",
  };
  const mocData = [
    {
      id: 1,
      name: "Iphone 8",
      price: "От 60 тыс. рублей.",
      img: slideImg,
    },
    {
      id: 2,
      name: "Iphone 8",
      price: "От 60 тыс. рублей.",
      img: slideImg,
    },
    {
      id: 3,
      name: "Iphone 8",
      price: "От 60 тыс. рублей.",
      img: slideImg,
    },
    {
      id: 4,
      name: "Iphone 8",
      price: "От 60 тыс. рублей.",
      img: slideImg,
    },
    {
      id: 5,
      name: "Iphone 8",
      price: "От 60 тыс. рублей.",
      img: slideImg,
    },
    {
      id: 6,
      name: "Iphone 8",
      price: "От 60 тыс. рублей.",
      img: slideImg,
    },
  ];

  return (
    <div className="CurrentOffers">
      <h2 className="CurrentOffers__title">Актуальные предложения</h2>
      <Slider {...SliderProps}>
        {mocData.map((slide) => (
          <div className="slide" key={slide.id}>
            <section className="slide__image">
              <img src={slide.img} alt="character" />
            </section>
            <section className="slide__text">
              <h2>{slide.name}</h2>
              <p>{slide.price}</p>
            </section>
          </div>
        ))}
      </Slider>
    </div>
  );
};
