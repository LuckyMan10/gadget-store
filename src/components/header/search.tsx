import { imports } from "./imports";

interface searchI {
  hideMenu: boolean;
}

export const Search = (props: searchI) => {
  return (
    <section className={`header__search${props.hideMenu ? "-hideMenu" : ""}`}>
      <div className="wrapper">
        <input placeholder="Поиск по сайту" />
        <img src={imports.search} alt="search" />
      </div>
    </section>
  );
};
