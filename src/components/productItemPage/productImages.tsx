import "./productImages.scss";
import React, { useState } from "react";
import Slider from "components/sliders/customSlider";
import { SliderProps } from "./sliderSettings";
import { productImagesType } from "types"

const ProductImages: React.FC<productImagesType> = ({ images, title }) => {

  const [activeImage, setActiveImage] = useState<number>(0);
  const activeImageHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    const imgId = Number((e.target as HTMLElement).id);
    if (imgId !== activeImage) {
      setActiveImage(imgId);
    }
  };

  return (
    <article className="productImages">
      <h1 className="productImages__productTitle">{title}</h1>
      <div className="productImages__wrapper">
        <section onClick={activeImageHandler} className="productImages__imgBar">
          {
            <Slider {...SliderProps}>
              {images.map((slide, index) => (
                <div
                  id={`slide_${index}`}
                  className="product_slide"
                  key={`product_slider_key_${index}`}
                >
                  <section
                    className="slide__image"
                  >
                    <img id={`${index}`} src={slide} alt="product image" />
                  </section>
                </div>
              ))}
            </Slider>
          }
        </section>
      </div>
    </article>
  );
};

export {
  ProductImages
}
