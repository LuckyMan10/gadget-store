import { left_arrow, right_arrow } from "components/staticImports";

const SliderProps = {
    zoomFactor: 5,
    slideMargin: 5,
    maxVisibleSlides: 3,
    pageTransition: 500,
    sliderWidth: 90,
    infinity: true,
    arrows: true,
    leftArrowImg: left_arrow,
    rightArrowImg: right_arrow,
    slidePadding: 20,
    slideBorderRadius: 10,
    slideBoxShadow: "none",
    sliderBackground: "white",
    dots: false,
    autoPlay: false,
};

export {
    SliderProps
}