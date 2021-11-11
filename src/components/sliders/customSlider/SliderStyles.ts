import styled from "styled-components";
import { StyledSliderItem } from "./SliderItemStyles";

type SliderWrapperProps = {
  zoomFactor: number;
  visibleSlides: number;
  width: number;
  slidePadding: number;
  slideBorderRadius: number;
  slideBoxShadow: string;
  maxImageWidth?: number;
};

type SliderProps = {
  visibleSlides: number;
  transformValue: string;
  zoomFactor: number;
  slideMargin: number;
  pageTransition: number;
  ref: any;
};

type CenterWrapperProps = {
  sliderBackground: string;
};

export const CenterWrapper = styled.div<CenterWrapperProps>`
  //position: relative;
  background: ${(props) => props.sliderBackground};
  border-radius: 20px;
  width: ${(props) => (window.innerWidth < 800 ? 100 : 80)}%;
  display: flex;
  justify-content: center;
`;
export const SliderComponent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledSliderWrapper = styled.div<SliderWrapperProps>`
  overflow: hidden;
  width: ${(props) => (window.innerWidth < 800 ? 65 : props.width)}%;
  padding: ${(props) => (props.zoomFactor / props.visibleSlides) * 0.7 + "%"} 0;
  .slide {
    border-radius: ${(props) => props.slideBorderRadius}px;
    box-shadow: ${(props) => props.slideBoxShadow};
    padding: ${(props) => props.slidePadding}px;
    background-color: white;
    display: flex;
    align-items: center;
    &__image {
      img {
        max-width: ${(props) => props.maxImageWidth ? props.maxImageWidth : 250}px;
      }
    }
    &__text {
     font-size: ${(props) => (window.innerWidth < 500 ? 0.8 : 1)}rem;
    }
  }
  .button-wrapper {
    position: absolute;
    height: 100%;
    z-index: 20;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center
    //padding: ${(props) => props.zoomFactor / 7 + "%"} 0;
    box-sizing: border-box;
  }

  .button {
    background: transparent;
    border: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    outline: none;
    transition: all 0.7s;
    user-select: none;
    img {
      
      width: ${(props) => (window.innerWidth < 500 ? 75 : 100)}%;
    }
  }

  .back {
    left: -5px;
  }

  .forward {
    right: -5px;
  }
`;

export const StyledSlider = styled.div<SliderProps>`
  display: flex;
  align-items: center;
  transition: transform ${(props) => props.pageTransition}ms ease;

  :hover ${StyledSliderItem} {
    transform: translateX(${(props) => props.transformValue});
  }
`;
