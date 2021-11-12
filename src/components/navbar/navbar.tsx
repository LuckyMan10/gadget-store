import { icons } from "./imports";
import "./navbar.scss";
import { Link } from "react-router-dom";

interface someDataI {
  name: string;
  img: string;
  id: number;
  route: string;
}

export const NavBar = () => {
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
        <ul className="navbar__list">
          {someData.map((el: someDataI) => {
            return (
              <Link key={el.id} to={el.route}>
                <li className="navbar__list-item">
                  <button className="navbar__button">
                    <img src={icons[el.img]} alt="category logo" />
                    <p>{el.name}</p>
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
