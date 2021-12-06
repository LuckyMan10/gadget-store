import "./AuthModal.scss";
import { RegistrationForm } from "components/forms/registration/RegistrationForm";
import { AuthorizationForm } from "components/forms/authorization/AuthorizationForm";
import { MenuButton } from "components/buttons/Buttons";
import {setAuthModalVisible} from "features/appVisible/appVisibleSlice";
import {useAppDispatch, useAppSelector} from "app/hooks";

export const AuthModal = () => {
  const dispatch = useAppDispatch();
  const {authModalVisible} = useAppSelector((state) => state.appVisible);
  function clickButtonHandler() {
    dispatch(setAuthModalVisible(!authModalVisible));
  }

  return (
    <article className="authModal">
      <div className="authModal__wrapper">
        <div className="closeBtn-wrapper">
          <MenuButton
            type={authModalVisible}
            clickButton={clickButtonHandler}
          />
        </div>
        <h1 className="authModal__title">Зарегистрируйтесь/Войдите</h1>
        <div className="authModal__forms">
          <section className="authModal__reg">
            <RegistrationForm />
          </section>
          <section className="authModal__auth">
            <AuthorizationForm />
          </section>
        </div>
      </div>
    </article>
  );
};
