import { icons } from "./imports";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {useFetchNavDataQuery} from "features/api/appApiSlice";

interface navBarI {
  navBarClick(e: React.MouseEvent<HTMLUListElement>): void;
}

export const NavBar = ({navBarClick}: navBarI) => {
  
  const { data = [], isFetching } = useFetchNavDataQuery();

  return (
    <nav className="navbar">
      <div className="navbar__wrapper">
        <ul onClick={navBarClick} className="navbar__list">
          {data.map((el: any, index: any) => {
            return (
              <Link id={el.id} key={el.id} to={`/${el.category}`}>
                <li id={el.id} className="navbar__list-item">
                  <button id={el.id} className="navbar__button">
                    {/*<img id={el.id} src={icons[el.img]} alt="category logo" />*/}
                    <p id={el.id}>{el.name}</p>
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
