import React, { useState } from "react";
import "./header.scss";
import { Logo } from "./logo";
import { Search } from "./search";
import { MobileMenu } from "components/mobile-menu/mobileMenu";
import { useMediaQuery } from "react-responsive";
import { logo, heart, cart, account } from "./imports";
import { MenuButton } from "./menuButton";
import {DynamicButtonComponent} from "components/buttons/Buttons";
import {useNavigate} from 'react-router-dom';

export const Header = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const navigate = useNavigate();
  const headerButtons = [
    { id: "favorite", img: heart, text: "Избранное" },
    { id: "cart", img: cart, text: "Корзина" },
    { id: "login", img: account, text: "Войти" },
  ];
  const enum headerEnum {
    CART = 'cart',
    FAVORITE = 'favorite',
    LOGIN = 'login',
    HOME = '/'
  }

  const headerHandleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLElement).id;
    if(id) {
      if(id === headerEnum.CART) {
        navigate(headerEnum.CART);
      }
      if(id === headerEnum.HOME) {
        navigate(headerEnum.HOME)
      }
    }
  }

  return (
    <header onClick={headerHandleClick} className="header">
      <Logo />
      <Search hideMenu={false} />
      <section className="header__buttons">
        {headerButtons.map((el) => {
          return <DynamicButtonComponent id={String(el.id)} key={el.id} img={el.img} text={el.text} />;
        })}
      </section>
      <section className="header__menu">
        {!menuVisible && <MenuButton setMenuVisible={setMenuVisible} menuVisible={menuVisible} />}
      </section>
      {menuVisible && (
        <>
          <section className="header__hideMenu">
            <div className="header__hideMenu-wrapper">
              <MenuButton
                setMenuVisible={setMenuVisible}
                menuVisible={menuVisible}
              />
              <Search hideMenu={true} />
              {headerButtons.map((el) => {
                return (
                  <DynamicButtonComponent id={el.id} key={el.id} img={el.img} text={el.text} />
                );
              })}
            </div>
          </section>
          {isMobile && <MobileMenu setMenuVisible={setMenuVisible} menuVisible={menuVisible}/>}
          <span className="blackout"></span>
        </>
      )}
    </header>
  );
};
