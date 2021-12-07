import "./navbar.scss";
import { useFetchNavDataQuery } from "features/api/appApiSlice";
import React from 'react';
import {navBarType} from "types"

const NavBar: React.FC<navBarType> = ({ navBarClick }) => {

  const { data = [] } = useFetchNavDataQuery();

  return (
    <nav className="navbar">
      {data.length !== 0 &&
        <div className="navbar__wrapper">
          <ul onClick={navBarClick} className="navbar__list">
            {data.map((el: any, index: any) => {
              return (
                <li key={`navbarKey_${index}`} data-category={el.category} id={el.id} className="navbar__list-item">
                  <button data-category={el.category} id={el.id} className="navbar__button">
                    <p data-category={el.category} id={el.id}>{el.name}</p>
                  </button>
                </li>
              );
            })
            }
          </ul>
        </div>
      }
    </nav>
  );
};

export {
  NavBar
}