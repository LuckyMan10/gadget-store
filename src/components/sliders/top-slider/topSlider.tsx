import Slider from "components/sliders/customSlider";
import "./topSlider.scss";
import { SliderProps } from "./sliderSettings";
import React from 'react';
import {topSliderType} from "types";

const TopSlider: React.FC<topSliderType> = ({ data }) => {

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

export {
  TopSlider
}