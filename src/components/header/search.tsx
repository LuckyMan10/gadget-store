import { search } from "components/staticImports";
import React, { useState } from "react";
import { searchByHeader } from "features/api/productsApiSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "components/notificationModal/NotificationModal";
import {setMenuVisible, setAuthModalVisible} from "features/appVisible/appVisibleSlice";

interface searchI {
  hideMenu: boolean;
}


export const Search = ({hideMenu}: searchI) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setSearchValue(newValue);
  };
  const pressHandler = (e: any) => {
    if (e.key === "Enter" || e.target && e.target.id === "toSearch") {
      if (searchValue.length !== 0) {
        dispatch(
          searchByHeader({
            api_key: "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf",
            baseURL: "http://localhost:5000/api/products",
            method: "get",
            url: `/searchField?query=${searchValue}`,
            withCredentials: true,
          })
        ).then((data: any) => {
          console.log("search data: ", data);
          if (data.payload.category && !data.payload.company) {
            navigate(`/${data.payload.category}/all`);
            dispatch(setMenuVisible(false));
          }
          if (data.payload.category && data.payload.company) {
            navigate(`/${data.payload.category}/${data.payload.company}`);
            dispatch(setMenuVisible(false));
          }
          if (!data.payload.category &&
            !data.payload.company &&
            data.payload.products.length === 0
          ) {
            setMessage("Ничего не найдено")
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
            }, 3200);
          }
        });
      }
    }
  };

  return (
    <section className={`header__search${hideMenu ? "-hideMenu" : ""}`}>
      <NotificationModal visible={visible} message={message} />
      <div className="wrapper">
        <input
          placeholder="Поиск по сайту"
          value={searchValue}
          onChange={inputHandler}
          onKeyPress={pressHandler}
        />
        <img onClick={pressHandler} src={search} id="toSearch" alt="search" />
      </div>
    </section>
  );
};
