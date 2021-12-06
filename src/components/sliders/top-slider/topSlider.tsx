import Slider from "components/sliders/customSlider";
import "./topSlider.scss";

interface topSliderI {
  data: {
    slides: Array<string>;
    slider: string;
    _id: string;
  };
}

export const TopSlider = ({ data }: topSliderI) => {
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
    autoPlay: true,
  };

  return (
    <article className="topSlider">
      <div className="topSlider__wrapper">
        {data &&
          data.slides &&
          data.slides.length !== 0
          && <Slider {...SliderProps}>
            {data.slides.map((el: string, index: number) => {
              return (
                <div key={index} className="slide">
                  <img src={el} alt="slider img" />
                </div>
              );
            })}
          </Slider>
        }
      </div>
    </article>
  );
};
