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
import {setLoginForm, setRegForm, setMenuVisible} from "features/appVisible/appVisibleSlice";
import Button from '@mui/material/Button';

const MobileMenu: React.FC = () => {
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { userCart, } = useAppSelector(
    (state) => state.cart
  );
  const { userFavList } = useAppSelector(
    (state) => state.favList
  );
  const {loginForm, regForm, menuVisible} = useAppSelector(
    (state) => state.appVisible
  )
  const {notAuthButtons, authButtons} = useAppSelector((state) => state.appLocal)
  const navigate = useNavigate();

  useEffect(() => {
    setScrollHeight(document.body.scrollHeight);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = (e.target as HTMLElement).id;
    if (id && id === "favorite") {
      navigate('/favorite');
      dispatch(setMenuVisible(false));
    }
    if (id && id === "cart") {
      navigate('/cart');
      dispatch(setMenuVisible(false));
    }
    if (id && id === "logout") {
      dispatch(logout()).then(() => {
        dispatch(setMenuVisible(false));
        window.scroll(0, 0)
        navigate('/')
      })
    }
    if (id && id === "toReg") {
      dispatch(setRegForm(true));
      window.scroll(0, 0);
      document.body.style.overflow = "hidden";
    }
    if (id && id === "toAuth") {
      dispatch(setLoginForm(true));
      window.scroll(0, 0)
      document.body.style.overflow = "hidden";
    }
    if (id && id === "toBack") {
      window.scroll(0, 0)
      dispatch(setRegForm(false));
      dispatch(setLoginForm(false));
    }
  }
  const navBarClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const category = (e.target as HTMLElement).dataset.category;
    if (category) {
      navigate(`${category}/all`);
      dispatch(setMenuVisible(false));
    }
  }
  const clickButtonHandler = () => {
    dispatch(setMenuVisible(false));
  }

  return (
    <StyledMobileMenu onClick={handleClick} scrollHeight={scrollHeight}>
      <div className="mobileMenu-wrapper">
        {!loginForm && !regForm &&
          <>
            <MenuButton
              type={menuVisible}
              clickButton={clickButtonHandler}
            />
            <Search hideMenu={true}/>
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
          {loginForm && <AuthorizationForm/>}
          {regForm && <RegistrationForm/>}
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

export {
  MobileMenu
}