import { icons } from "./imports";
import "./navbar.scss";

interface someDataI {
  name: string;
  img: string;
}

export const NavBar = () => {
  
  const someData: Array<someDataI> = [
    { name: "Смартфоны", img: "navIcon0" },
    { name: "Планшеты", img: "navIcon1" },
    { name: "Электронные книги", img: "navIcon2" },
    { name: "Смарт-часы и браслеты", img: "navIcon3" },
    { name: "Аксессуары для смартфонов", img: "navIcon4" },
    { name: "Аксессуары для планшетов", img: "navIcon5" },
    { name: "Аксессуары для электронных книг", img: "navIcon6" },
    { name: "Запчасти для смартфонов", img: "navIcon7" },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {someData.map((el: someDataI, index: number) => {
          return (
            <li key={index} className="navbar__list-item">
              <button className="navbar__button">
                <img src={icons[el.img]} alt="category logo" />
                <p>{el.name}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
