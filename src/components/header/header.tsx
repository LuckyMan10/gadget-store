import React, { useState } from "react";
import "./header.scss";
import { Logo } from "./logo";
import { Search } from "./search";
import { MobileMenu } from "components/mobileMenu/mobileMenu";
import { useMediaQuery } from "react-responsive";
import { logo, heart, cart, account } from "components/staticImports";
import { MenuButton } from "components/buttons/Buttons";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  setMenuVisible,
  setAuthModalVisible,
} from "features/appVisible/appVisibleSlice";
import { AuthModal } from "components/authModal/AuthModal";
import { UserInfoModal } from "components/userInfoModal/UserInfoModal";
import {logout} from "features/api/authApiSlice";

export const Header = () => {
  const { menuVisible, authModalVisible } = useAppSelector(
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
    { id: "login", img: account, text: loading ? user.user.username : "Войти" },
  ];
  const enum headerEnum {
    CART = "cart",
    FAVORITE = "favorite",
    LOGIN = "login",
    HOME = "/",
    TOLOGOUT = 'toLogout'
  }
  const [userInfo, setUserInfo] = useState<boolean>(false);


  const headerHandleClick = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLElement>
  ) => {
    const id = (e.target as HTMLElement).id;
    if (id) {
      if(id === headerEnum.TOLOGOUT) {
        dispatch(
          logout()
        )
      }
      if (id === headerEnum.CART) {
        setUserInfo(false);
        navigate(headerEnum.CART);
        dispatch(setMenuVisible(!menuVisible));
      }
      if (id === headerEnum.HOME) {
        setUserInfo(false);
        menuVisible && dispatch(setMenuVisible(!menuVisible));
        navigate(headerEnum.HOME);
      }
      if (id === headerEnum.FAVORITE) {
        setUserInfo(false);
        menuVisible && dispatch(setMenuVisible(!menuVisible));
        navigate(headerEnum.FAVORITE);
      }
      if (id === headerEnum.LOGIN) {
        if (!isAuth) {
          menuVisible && dispatch(setMenuVisible(!menuVisible));
          handleChangeVisibleAuthModal();
        }
        if(isAuth) {
          setUserInfo(!userInfo);
        }
      }
    }
  };

  return (
    <header onClick={headerHandleClick} className="header">
      {isAuth && isCartLoading &&
      isFavLoading && userInfo &&
      userCart.products && (
        <UserInfoModal
          email={user.user.email}
          cart_summ={userCart.products.length}
          fav_summ={userFavList.products.length}
          setUserInfo={setUserInfo}
          userInfo={userInfo}
        />
      )}
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
      {authModalVisible && (
        <div className="auth">
          <AuthModal
            setMenuVisible={handleChangeVisibleAuthModal}
            menuVisible={authModalVisible}
          />
        </div>
      )}
    </header>
  );
};
