import img1 from "assets/images/mocImages/img1.webp";
import img2 from "assets/images/mocImages/img2.webp";
import img3 from "assets/images/mocImages/img3.webp";
import img4 from "assets/images/mocImages/img4.webp";
import "./productImages.scss";
import React, { useState } from "react";

export const ProductImages = () => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const activeImageHandler = (e: React.MouseEvent<HTMLImageElement>) => {
      const imgId = Number((e.target as HTMLElement).id);
      if(imgId !== activeImage) {
          console.log(imgId)
          setActiveImage(imgId);
      };
  }

  const images = [
    { id: "0", img: img1 },
    { id: "1", img: img2 },
    { id: "2", img: img3 },
    { id: "3", img: img4 },
  ];
 
  return (
    <article className="productImages">
      <div className="productImages__wrapper">
        <section className="productImages__currentImg">
          <img src={images[activeImage].img} alt="product image" />
        </section>
        <section
          onClick={activeImageHandler}
          className="productImages__imgBar"
        >
          {images.map((el) => {
            return <img id={el.id} src={el.img} alt="product image" />;
          })}
        </section>
      </div>
    </article>
  );
};
