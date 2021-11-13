import { topSliderSlides } from "../imports";
import Slider from "components/sliders/customSlider";
import "./topSlider.scss";

export const TopSlider = () => {
  const SliderProps = {
    zoomFactor: 0,
    slideMargin: 1,
    maxVisibleSlides: 1,
    pageTransition: 500,
    sliderWidth: 400,
    infinity: true,
    arrows: false,
    slidePadding: 1,
    slideBorderRadius: 10,
    slideBoxShadow: "none",
    sliderBackground: "none",
    dots: true,
    autoPlay: true
  };

  return (
    <article className="topSlider">
      <div className="topSlider__wrapper">
        <Slider {...SliderProps}>
          {topSliderSlides.map((el, index) => {
            return (
              <div key={index} className="slide">
                <img src={el} alt="slider img" />
              </div>
            );
          })}
        </Slider>
      </div>
    </article>
  );
};
