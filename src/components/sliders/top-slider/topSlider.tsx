import { topSliderSlides } from "../imports";
import "./topSlider.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

export const TopSlider = () => {
  return (
    <article className="topSlider">
      <Splide
        options={{
          perPage: 1,
          pagination: true,
          autoplay: true,
          rewind: true,
          arrows: false,
        }}
      >
        {topSliderSlides.map((el, index) => {
          return (
            <SplideSlide key={index}>
              <div className="topSlider__slide">
                <img src={el} alt="slider img" />
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </article>
  );
};
