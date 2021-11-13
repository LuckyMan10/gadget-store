import "./companySlider.scss";
import Slider from "components/sliders/customSlider";
import left_arrow_gray from "assets/icons/left_arrow_gray.svg"
import right_arrow_gray from "assets/icons/right_arrow_gray.svg";
import { companySlides } from "components/sliders/imports";
import apple from "assets/images/company_logo/apple.svg";
import asus from "assets/images/company_logo/asus.svg";
import honor from "assets/images/company_logo/honor.svg";
import huawei from "assets/images/company_logo/huawei.svg";
import samsung from "assets/images/company_logo/samsung.svg";
import xiaomi from "assets/images/company_logo/xiaomi.svg";

export const CompanySlider = () => {

    const mocData = [
      {id: 1, img: apple},
      {id: 2, img: asus},
      {id: 3, img: honor},
      {id: 4, img: huawei},
      {id: 5, img: samsung},
      {id: 6, img: xiaomi},
      {id: 7, img: apple},
      {id: 8, img: asus},
      {id: 9, img: honor},
      {id: 10, img: huawei},
      {id: 11, img: samsung},
      {id: 12, img: xiaomi},
    ]  

    const SliderProps = {
    zoomFactor: 5,
    slideMargin: 5,
    maxVisibleSlides: 5,
    pageTransition: 500,
    sliderWidth: 100,
    infinity: true,
    arrows: true,
    leftArrowImg: left_arrow_gray,
    rightArrowImg: right_arrow_gray,
    slidePadding: 20,
    slideBorderRadius: 10,
    slideBoxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;",
    sliderBackground: "none",
    maxImageWidth: 100,
    dots: false
  };
  
  return (
    <article className="CompanySlider">
      <Slider {...SliderProps}>
        {mocData.map((slide) => (
          <div className="slide" key={slide.id}>
            <section className="slide__image">
              <img src={slide.img} alt="character" />
            </section>
          </div>
        ))}
      </Slider>
    </article>
  );
};
