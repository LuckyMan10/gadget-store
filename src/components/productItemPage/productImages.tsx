import "./productImages.scss";
import React, { useState } from "react";
import Slider from "components/sliders/customSlider";
import { left_arrow, right_arrow } from "components/staticImports";

interface productImagesI {
  images: Array<string>;
  title: string;
}

export const ProductImages = ({ images, title }: productImagesI) => {
  const SliderProps = {
    zoomFactor: 0,
    slideMargin: 5,
    maxVisibleSlides: 5,
    pageTransition: 500,
    sliderWidth: 90,
    infinity: true,
    arrows: true,
    leftArrowImg: left_arrow,
    rightArrowImg: right_arrow,
    slidePadding: 0,
    slideBorderRadius: 10,
    slideBoxShadow: "none",
    sliderBackground: "transparent",
    dots: false,
    autoPlay: false,
  };
  const [activeImage, setActiveImage] = useState<number>(0);
  const activeImageHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    const imgId = Number((e.target as HTMLElement).id);
    if (imgId !== activeImage) {
      console.log(imgId);
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

/*
 {images.map((el, index) => {
            return (
              <div key={`${title}_${index}`} className="barItem">
                <img id={`${index}`} src={el} alt="product image" />
                <span
                  className={`image ${activeImage === index ? "active" : ""}`}
                ></span>
              </div>
            );
          })}
*/
