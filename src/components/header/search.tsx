import { search } from "components/staticImports";
import React, { useState } from "react";
import { searchByHeader } from "features/api/productsApiSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

interface searchI {
  hideMenu: boolean;
}

export const Search = (props: searchI) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setSearchValue(newValue);
  };
  const pressHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if (searchValue.length !== 0) {
        dispatch(
          searchByHeader({
            api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
            baseURL: "http://localhost:5000/api/products",
            method: "get",
            url: `/searchField?query=${searchValue}`,
            withCredentials: true,
          })
        ).then((data) => {
          console.log("search data: ", data);
        });
      }
    }
  };

  return (
    <section className={`header__search${props.hideMenu ? "-hideMenu" : ""}`}>
      <div className="wrapper">
        <input
          placeholder="Поиск по сайту"
          value={searchValue}
          onChange={inputHandler}
          onKeyPress={pressHandler}
        />
        <img src={search} alt="search" />
      </div>
    </section>
  );
};
