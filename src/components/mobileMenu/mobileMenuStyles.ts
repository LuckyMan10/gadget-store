import styled from "styled-components";

interface mobileMenuStyles {
  scrollHeight: number;
}

export const StyledMobileMenu = styled.article<mobileMenuStyles>`

  .mobileMenu-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .forms-wrapper {
    .MuiButton-root.MuiButton-contained:nth-child(2) {
      display: flex;
      justify-content: center;
      width: 92%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 35%;
    justify-content: center;
    border-radius: 10px;
    padding: 20px;
    form {
      padding: 10px;
      display: flex;
      h2 {
          padding: 10px 0px;
          text-align: center;
          font-size: 35px;
          opacity: 0.7;
      }
      input {
          outline-color: rgba(0,0,0,0.3);
          background-color: $light_blue;
          border: 2px solid rgba(0,0,0,0.08);;
          padding: 5px;
          border-radius: 5px;
          font-size: 23px;
      }
      input, button {
          text-align: center;
          margin: 8px;
      }
      .error {
          text-align: center;
      }
    }
  }
  padding-bottom: 80px;
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
  .userInfo {
    text-align: center;
    padding: 0px 0px 20px 0px;
    p:nth-child(1) {
      padding: 5px;
      font-size: 30px;
      font-weight: 500;
    }
    p:nth-child(2), p:nth-child(3) {
      padding: 5px;
      font-size: 25px;
    }
  }
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
      font-family: "Roboto";
      font-weight: 600;
      opacity: 0.7;
      text-align: center;
      max-width: 170px;
    }
    width: 145px;
    height: 116px;
  }
  .clickButton {
    font-family: "Roboto";
    img {
      display: none;
    }
    span {
      width: 100%;
      text-align: center;
    }
    margin: 5px 0px;
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
    &:active {
      background-color: rgba(61, 171, 85, 1);
      transform: scale(0.98);
      transition: 0.2s;
    }
  }
`;
