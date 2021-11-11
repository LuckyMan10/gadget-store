import styled from "styled-components";

interface mobileMenuStyles {
  scrollHeight: number;
}

export const StyledMobileMenu = styled.article<mobileMenuStyles>`
  padding-top: 120px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  z-index: 40;
  width: 100%;
  height: ${(props) => props.scrollHeight}px;
  bottom: 0;
  top: 0;
  .navbar__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
  }
  .navbar__button {
    padding: 10px;
    border-radius: 20px;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(236, 236, 236, 1);
    img {
      width: 45px;
    }
    p {
      opacity: 0.7;
      text-align: center;
      max-width: 170px;
    }
    width: 183px;
    height: 136px;
  }
  .header__button {
    img {
      display: none;
    }
    span {
      width: 100%;
      text-align: center;
    }
    margin: 10px 0px;
    color: white;
    background-color: rgba(61, 171, 85, 1);
    opacity: 0.9;
    border: none;
    display: flex;
    width: 90%;
    font-size: 40px;
    font-weight: 400;
    &:hover {
      opacity: 1;
    }
  }
  @media (max-width: 400px) {
    .navbar__button {
      width: 145px;
      height: 116px;
    }
  }
`;
