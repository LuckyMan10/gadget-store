import img1 from "assets/images/mocImages/img1.webp";
import "./productImages.scss";
import React, { useState } from "react";

export const ProductImages = () => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const activeImageHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    const imgId = Number((e.target as HTMLElement).id);
    if (imgId !== activeImage) {
      console.log(imgId);
      setActiveImage(imgId);
    }
  };

  const images = [
    { id: "0", img: img1 },
    { id: "1", img: img1 },
    { id: "2", img: img1 },
    { id: "3", img: img1 },
  ];

  return (
    <article className="productImages">
    <h1 className="productImages__productTitle">Смартфон Apple iPhone SE 2020 128 ГБ черный</h1>
      <div className="productImages__wrapper">
        <section className="productImages__currentImg">
          <img src={images[activeImage].img} alt="product image" />
        </section>
        <section onClick={activeImageHandler} className="productImages__imgBar">
          {images.map((el) => {
            return (
              <div key={el.id} className="barItem">
              <img
                id={el.id}
                src={el.img}
                alt="product image"
              />
              <span className={`image ${activeImage === Number(el.id) ? "active" : ""}`}></span>
              </div>
            );
          })}
        </section>
      </div>
    </article>
  );
};
