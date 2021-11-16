import React, { useState } from "react";
import "./header.scss";
import { Logo } from "./logo";
import { Search } from "./search";
import { MobileMenu } from "components/mobileMenu/mobileMenu";
import { useMediaQuery } from "react-responsive";
import { logo, heart, cart, account } from "./imports";
import { MenuButton } from "./menuButton";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  setMenuVisible,
  setAuthModalVisible,
} from "features/api/appDataApiSlice";
import { AuthModal } from "components/authModal/AuthModal";

export const Header = () => {
  const { menuVisible, authModalVisible } = useAppSelector(
    (state) => state.appData
  );
  const dispatch = useAppDispatch();
  const handleChangeVisibleMenu = () => {
    dispatch(setMenuVisible(!menuVisible));
  };
  const handleChangeVisibleAuthModal = () => {
    dispatch(setAuthModalVisible(!authModalVisible));
  };

  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const navigate = useNavigate();
  const headerButtons = [
    { id: "favorite", img: heart, text: "Избранное" },
    { id: "cart", img: cart, text: "Корзина" },
    { id: "login", img: account, text: "Войти" },
  ];
  const enum headerEnum {
    CART = "cart",
    FAVORITE = "favorite",
    LOGIN = "login",
    HOME = "/",
  }

  const headerHandleClick = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>
  ) => {
    console.log(e);
    const id = (e.target as HTMLElement).id;
    if (id) {
      if (id === headerEnum.CART) {
        navigate(headerEnum.CART);
        dispatch(setMenuVisible(!menuVisible));
      }
      if (id === headerEnum.HOME) {
        navigate(headerEnum.HOME);
      }
      if (id === headerEnum.FAVORITE) {
        navigate(headerEnum.FAVORITE);
      }
      if (id === headerEnum.LOGIN) {
        menuVisible && dispatch(setMenuVisible(!menuVisible));
        handleChangeVisibleAuthModal();
      }
    }
  };

  return (
    <header onClick={headerHandleClick} className="header">
      <Logo />
      <Search hideMenu={false} />
      <section className="header__buttons">
        {headerButtons.map((el) => {
          return (
            <DynamicButtonComponent
              id={String(el.id)}
              key={el.id}
              img={el.img}
              text={el.text}
            />
          );
        })}
      </section>
      <section className="header__menu">
        {!menuVisible && (
          <MenuButton
            setMenuVisible={handleChangeVisibleMenu}
            menuVisible={menuVisible}
          />
        )}
      </section>
      {menuVisible && (
        <>
          <section className="header__hideMenu">
            <div className="header__hideMenu-wrapper">
              <MenuButton
                setMenuVisible={handleChangeVisibleMenu}
                menuVisible={menuVisible}
              />
              <Search hideMenu={true} />
              {headerButtons.map((el) => {
                return (
                  <DynamicButtonComponent
                    id={el.id}
                    key={el.id}
                    img={el.img}
                    text={el.text}
                  />
                );
              })}
            </div>
          </section>
          {isMobile && (
            <MobileMenu
              setMenuVisible={handleChangeVisibleMenu}
              menuVisible={menuVisible}
            />
          )}
          <span className="blackout"></span>
        </>
      )}
      {authModalVisible &&
        <div className="auth">
          <AuthModal
            setMenuVisible={handleChangeVisibleAuthModal}
            menuVisible={authModalVisible}
          />
        </div>
      }
    </header>
  );
};
