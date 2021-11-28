import { StyledMobileMenu } from "./mobileMenuStyles";
import { Search } from "components/header/search";
import { NavBar } from "components/navbar/navbar";
import React, { useEffect, useState } from "react";
import {MenuButton} from "components/buttons/Buttons";
import {DynamicButtonComponent} from "components/buttons/Buttons";

type MobileMenuType = {
  setMenuVisible(value: boolean): void;
  menuVisible: boolean;
}

export const MobileMenu = ({setMenuVisible, menuVisible}:MobileMenuType) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    setScrollHeight(document.body.scrollHeight);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
  }
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    return null;
  }

  const mobileMenuButtons = [
    { id: 1, text: "Избранное" },
    { id: 2, text: "Корзина" },
    { id: 3, text: "Авторизация" },
    { id: 4, text: "Регистрация" },
  ];
  return (
    <StyledMobileMenu onClick={handleClick} scrollHeight={scrollHeight}>
      <MenuButton setMenuVisible={setMenuVisible} menuVisible={menuVisible}/>
      <Search hideMenu={true} />
      <NavBar navBarClick={navBarClick}/>
      {mobileMenuButtons.map((el) => {
        return <DynamicButtonComponent id={String(el.id)} key={el.id} text={el.text} />;
      })}
    </StyledMobileMenu>
  );
};
