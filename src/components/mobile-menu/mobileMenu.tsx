import { StyledMobileMenu } from "./mobileMenuStyles";
import { Search } from "components/header/search";
import { NavBar } from "components/navbar/navbar";
import React, { useEffect, useState } from "react";
import { ButtonComponent } from "components/header/ButtonComponent";
import {MenuButton} from 'components/header/menuButton';

type MobileMenuType = {
  setMenuVisible(value: boolean): void;
  menuVisible: boolean;
}

export const MobileMenu = ({setMenuVisible, menuVisible}:MobileMenuType) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    setScrollHeight(document.body.scrollHeight);
  }, []);

  const mobileMenuButtons = [
    { id: 1, text: "Избранное" },
    { id: 2, text: "Корзина" },
    { id: 3, text: "Авторизация" },
    { id: 4, text: "Регистрация" },
  ];
  return (
    <StyledMobileMenu scrollHeight={scrollHeight}>
      <MenuButton setMenuVisible={setMenuVisible} menuVisible={menuVisible}/>
      <Search hideMenu={true} />
      <NavBar />
      {mobileMenuButtons.map((el) => {
        return <ButtonComponent key={el.id} text={el.text} />;
      })}
    </StyledMobileMenu>
  );
};
