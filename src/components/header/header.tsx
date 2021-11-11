import "./header.scss";
import { Logo } from "./logo";
import { Search } from "./search";
import { ButtonFav } from "./button-fav";
import { ButtonCart } from "./button-cart";
import { ButtonAcc } from "./button-acc";

import { imports } from "./imports";

export const Header = () => {
  const [menuVisible, setMenuVisible] = imports.useState<boolean>(false);

  return (
    <header className="header">
      <Logo />
      <Search hideMenu={false}/>
      <section className="header__buttons">
        <ButtonFav />
        <ButtonCart />
        <ButtonAcc />
      </section>
      <section className="header__menu">
        <button onClick={() => setMenuVisible(!menuVisible)}>
          <img src={menuVisible ? imports.close : imports.menu} alt="menu" />
        </button>
      </section>
      {menuVisible && (
        <>
        <section className="header__hideMenu">
          <div className="header__hideMenu-wrapper">
            <Search hideMenu={true}/>
            <ButtonFav />
            <ButtonCart />
            <ButtonAcc />
          </div>
        </section>
        <span className="blackout"></span>
        </>
      )}
    </header>
  );
};
