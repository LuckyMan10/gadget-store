import React, { useState, useEffect } from "react";
import "./header.scss";
import { Logo } from "./logo";
import { Search } from "./search";
import { MobileMenu } from "components/mobileMenu/mobileMenu";
import { useMediaQuery } from "react-responsive";
import { heart, cart, account } from "components/staticImports";
import { MenuButton } from "components/buttons/Buttons";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  setMenuVisible,
  setAuthModalVisible,
  setUserInfo
} from "features/appVisible/appVisibleSlice";
import { AuthModal } from "components/authModal/AuthModal";
import { UserInfoModal } from "components/userInfoModal/UserInfoModal";
import { logout } from "features/api/authApiSlice";
import {headerEnum} from "./enum";

const Header: React.FC = () => {

  const { menuVisible, authModalVisible, userInfo } = useAppSelector(
    (state) => state.appVisible
  );
  const { isAuth, user, loading } = useAppSelector((state) => state.auth);
  const { userFavList, loading: isFavLoading } = useAppSelector(
    (state) => state.favList
  );
  const { userCart, loading: isCartLoading } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const isMediumSize = useMediaQuery({ query: "(max-width: 1300px)" });
  const navigate = useNavigate();
  const headerButtons = [
    { id: "favorite", img: heart, text: "Избранное" },
    { id: "cart", img: cart, text: "Корзина" },
    { id: "login", img: account, text: !loading ? user.user.username : "Войти" },
  ];
  
  useEffect(() => {
    if (!menuVisible && userInfo && isMediumSize) {
      window.scroll(0, 0)
      document.body.style.overflow = "hidden";
    };
    if (!menuVisible && !userInfo) {
      document.body.style.overflow = "scroll";
    }
    return () => {
      document.body.style.overflow = "scroll";
    }
  }, [menuVisible, isMediumSize, userInfo])

  const headerHandleClick = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>
  ) => {
    const id = (e.target as HTMLElement).id;
    if (id) {
      if (id === headerEnum.TOLOGOUT) {
        dispatch(
          logout()
        )
      }
      if (id === headerEnum.CART) {
        dispatch(setUserInfo(false));
        navigate(headerEnum.CART);
        dispatch(setMenuVisible(!menuVisible));
        document.body.style.overflow = "scroll";
      }
      if (id === headerEnum.HOME) {
        dispatch(setUserInfo(false));
        menuVisible && dispatch(setMenuVisible(!menuVisible));
        document.body.style.overflow = "scroll";
        navigate(headerEnum.HOME);
      }
      if (id === headerEnum.FAVORITE) {
        dispatch(setUserInfo(false));
        menuVisible && dispatch(setMenuVisible(!menuVisible));
        document.body.style.overflow = "scroll";
        navigate(headerEnum.FAVORITE);
      }
      if (id === headerEnum.LOGIN) {
        if (!isAuth) {
          menuVisible && dispatch(setMenuVisible(!menuVisible));
          document.body.style.overflow = "scroll";
          dispatch(setAuthModalVisible(!authModalVisible));
        }
        if (isAuth) {
          dispatch(setMenuVisible(!menuVisible));
          dispatch(setUserInfo(!userInfo));
        }
      }
    }
  };
  const clickHideMenuHandler = () => {
    dispatch(setMenuVisible(!menuVisible));
  }

  return (
    <header onClick={headerHandleClick} className="header">
      {isAuth && isCartLoading &&
        isFavLoading && userInfo &&
        userCart.products && (
          <UserInfoModal
            email={user.user.email}
            cart_summ={userCart.products.length}
            fav_summ={userFavList.products.length}
          />
        )}
      {(!menuVisible || !isMobile) && <Logo />}
      {(!menuVisible || !isMobile) && <Search
        hideMenu={false}
      />}
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
            type={menuVisible}
            clickButton={clickHideMenuHandler}
          />
        )}
      </section>
      {menuVisible && (
        <>
          <section className="header__hideMenu">
            <div className="header__hideMenu-wrapper">
              <MenuButton
                type={menuVisible}
                clickButton={clickHideMenuHandler}
              />
              <Search
                hideMenu={true}
              />
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
            <MobileMenu />
          )}
          <span className="blackout"></span>
        </>
      )}
      {authModalVisible && (
        <div className="auth">
          <AuthModal
          />
        </div>
      )}
    </header>
  );
};

export {
  Header
}