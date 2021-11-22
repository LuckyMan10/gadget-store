import img1 from "assets/images/mocImages/img1.webp";
import "./productImages.scss";
import React, { useState } from "react";

interface productImagesI {
  images: Array<string>;
  title: string;
}

export const ProductImages = ({images, title}: productImagesI) => {
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
        <section className="productImages__currentImg">
          <img src={images[activeImage]} alt="product image" />
        </section>
        <section onClick={activeImageHandler} className="productImages__imgBar">
          {images.map((el, index) => {
            return (
              <div key={`${title}_${index}`} className="barItem">
              <img
                id={`${index}`}
                src={el}
                alt="product image"
              />
              <span className={`image ${activeImage === index ? "active" : ""}`}></span>
              </div>
            );
          })}
        </section>
      </div>
    </article>
  );
};
