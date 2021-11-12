import img1 from "assets/images/mocImages/img1.webp";
import img2 from "assets/images/mocImages/img2.webp";
import img3 from "assets/images/mocImages/img3.webp";
import img4 from "assets/images/mocImages/img4.webp";
import "./productImages.scss";

export const ProductImages = () => {
  return (
    <article className="productImages">
      <div className="productImages__wrapper">
        <section className="productImages__currentImg">
          <img src={img1} alt="product image" />
        </section>
        <section className="productImages__imgBar">
          <img src={img1} alt="product image" />
          <img src={img2} alt="product image" />
          <img src={img3} alt="product image" />
          <img src={img4} alt="product image" />
        </section>
      </div>
    </article>
  );
};
