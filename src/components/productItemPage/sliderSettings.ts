import { left_arrow, right_arrow } from "components/staticImports";

const SliderProps = {
    zoomFactor: 0,
    slideMargin: 5,
    maxVisibleSlides: 1,
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

export {
    SliderProps
}