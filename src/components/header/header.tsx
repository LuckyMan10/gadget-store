import React, { useState } from "react";
import "./header.scss";
import { Logo } from "./logo";
import { Search } from "./search";
import { ButtonComponent } from "./ButtonComponent";
import { MobileMenu } from "components/mobile-menu/mobileMenu";
import { useMediaQuery } from "react-responsive";
import { logo, heart, cart, account } from "./imports";
import { MenuButton } from "./menuButton";

export const Header = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
  const headerButtons = [
    { id: 1, img: heart, text: "Избранное" },
    { id: 2, img: cart, text: "Корзина" },
    { id: 3, img: account, text: "Войти" },
  ];

  return (
    <header className="header">
      <Logo />
      <Search hideMenu={false} />
      <section className="header__buttons">
        {headerButtons.map((el) => {
          return <ButtonComponent key={el.id} img={el.img} text={el.text} />;
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
                  <ButtonComponent key={el.id} img={el.img} text={el.text} />
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
