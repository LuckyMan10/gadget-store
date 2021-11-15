import { icons } from "./imports";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

interface navBarI {
  navBarClick(e: React.MouseEvent<HTMLUListElement>): void;
}

export const NavBar = ({navBarClick}: navBarI) => {
  const appData = useAppSelector((state) => state.appData.appDataItems);

  return (
    <nav className="navbar">
      <div className="navbar__wrapper">
        <ul onClick={navBarClick} className="navbar__list">
          {appData.map((el, index) => {
            return (
              <Link id={el.id} key={el.id} to={el.route}>
                <li id={el.id} className="navbar__list-item">
                  <button id={el.id} className="navbar__button">
                    <img id={el.id} src={icons[el.img]} alt="category logo" />
                    <p id={el.id}>{el.categories[0]}</p>
                  </button>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
