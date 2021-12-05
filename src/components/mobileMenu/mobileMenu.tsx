import { StyledMobileMenu } from "./mobileMenuStyles";
import { Search } from "components/header/search";
import { NavBar } from "components/navbar/navbar";
import React, { useEffect, useState } from "react";
import { MenuButton } from "components/buttons/Buttons";
import { DynamicButtonComponent } from "components/buttons/Buttons";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { logout } from "features/api/authApiSlice";
import { AuthorizationForm } from "components/forms/authorization/AuthorizationForm";
import { RegistrationForm } from "components/forms/registration/RegistrationForm";
import Button from '@mui/material/Button';

type MobileMenuType = {
  setMenuVisible(value: boolean): void;
  menuVisible: boolean;
}

export const MobileMenu = ({ setMenuVisible, menuVisible }: MobileMenuType) => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [regForm, setRegForm] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState<boolean>(false);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { userCart, loading: isCartLoading } = useAppSelector(
    (state) => state.cart
  );
  const { userFavList, loading: isFavLoading } = useAppSelector(
    (state) => state.favList
  );
  const navigate = useNavigate();

  useEffect(() => {
    setScrollHeight(document.body.scrollHeight);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLElement).id;
    if (id && id === "favorite") {
      navigate('/favorite');
      setMenuVisible(false);
    }
    if (id && id === "cart") {
      navigate('/cart');
      setMenuVisible(false);
    }
    if (id && id === "logout") {
      dispatch(logout()).then(() => {
        setMenuVisible(false);
        navigate('/')
      })
    }
    if (id && id === "toReg") {
      setRegForm(true);
    }
    if (id && id === "toAuth") {
      setLoginForm(true);
    }
    if (id && id === "toBack") {
      setRegForm(false);
      setLoginForm(false);
    }
  }
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const category = (e.target as HTMLElement).dataset.category;
    if (category) {
      navigate(`${category}/all`);
      setMenuVisible(false);
    }
  }

  const notAuthButtons = [
    { id: 'favorite', text: "Избранное" },
    { id: 'cart', text: "Корзина" },
    { id: 'toAuth', text: "Авторизация" },
    { id: 'toReg', text: "Регистрация" },
  ];
  const authButtons = [
    { id: "favorite", text: "Избранное" },
    { id: 'cart', text: "Корзина" },
    { id: 'logout', text: "Выйти" },
  ]
  return (
    <StyledMobileMenu onClick={handleClick} scrollHeight={scrollHeight}>
      <div className="mobileMenu-wrapper">
        {!loginForm && !regForm &&
          <>
            <MenuButton setMenuVisible={setMenuVisible} menuVisible={menuVisible} />
            <Search hideMenu={true} setMenuVisible={setMenuVisible} />
            <NavBar navBarClick={navBarClick} />
            {isAuth &&
              <div className="userInfo">
                <p>{user.user.email}</p>
                <p>Товаров в корзине: {userCart.products.length}</p>
                <p>Товаров в избранном: {userFavList.products.length}</p>
              </div>}
            {!isAuth ? notAuthButtons.map((el) => {
              return <DynamicButtonComponent id={el.id} key={el.id} text={el.text} />;
            }) : authButtons.map((el) => {
              return <DynamicButtonComponent id={el.id} key={el.id} text={el.text} />;
            })}
          </>
        }
      </div>
      {(loginForm || regForm) &&
        <div className="forms-wrapper">
          {loginForm && <AuthorizationForm setMenuVisible={setLoginForm} />}
          {regForm && <RegistrationForm setMenuVisible={setRegForm} />}
          {(loginForm || regForm) &&
            <Button style={{ backgroundColor: "rgba(64, 178, 89, 1)" }}
              variant="contained"
              id="toBack"
            >
              Назад
            </Button>}
        </div>
      }
    </StyledMobileMenu>
  );
};
