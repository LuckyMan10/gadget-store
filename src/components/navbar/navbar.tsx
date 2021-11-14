import { icons } from "./imports";
import "./navbar.scss";
import { Link } from "react-router-dom";

interface someDataI {
  name: string;
  img: string;
  id: number;
  route: string;
}

interface navBarI {
  navBarClick(e: React.MouseEvent<HTMLUListElement>): void;
}

export const NavBar = ({navBarClick}: navBarI) => {
  const someData: Array<someDataI> = [
    { id: 1, route: "/smartphones", name: "Смартфоны", img: "navIcon0" },
    { id: 2, route: "/tablets", name: "Планшеты", img: "navIcon1" },
    { id: 3, route: "/e-book", name: "Электронные книги", img: "navIcon2" },
    { id: 4, route: "/smart-watches", name: "Смарт-часы", img: "navIcon3" },
    {
      id: 5,
      route: "/smartphone-acc",
      name: "Аксессуары для смартфонов",
      img: "navIcon4",
    },
    {
      id: 6,
      route: "/tablet-acc",
      name: "Аксессуары для планшетов",
      img: "navIcon5",
    },
    {
      id: 7,
      route: "/e-book-acc",
      name: "Аксессуары для электронных книг",
      img: "navIcon6",
    },
    {
      id: 8,
      route: "/smarthone-detail",
      name: "Запчасти для смартфонов",
      img: "navIcon7",
    },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__wrapper">
        <ul onClick={navBarClick} className="navbar__list">
          {someData.map((el: someDataI) => {
            return (
              <Link id={String(el.id)} key={el.id} to={el.route}>
                <li id={String(el.id)} className="navbar__list-item">
                  <button id={String(el.id)} className="navbar__button">
                    <img id={String(el.id)} src={icons[el.img]} alt="category logo" />
                    <p id={String(el.id)}>{el.name}</p>
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
