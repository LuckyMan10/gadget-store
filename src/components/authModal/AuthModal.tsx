import "./AuthModal.scss";
import { RegistrationForm } from "components/forms/registration/RegistrationForm";
import { AuthorizationForm } from "components/forms/authorization/AuthorizationForm";
import { MenuButton } from "components/buttons/Buttons";

interface AuthModalI {
  setMenuVisible(value: boolean): void;
  menuVisible: boolean;
}

export const AuthModal = ({setMenuVisible, menuVisible}: AuthModalI) => {
  return (
    <article className="authModal">
      <div className="authModal__wrapper">
        <div className="closeBtn-wrapper">
          <MenuButton setMenuVisible={setMenuVisible} menuVisible={menuVisible} />
        </div>
        <h1 className="authModal__title">Зарегистрируйтесь/Войдите</h1>
        <div className="authModal__forms">
          <section className="authModal__reg">
            <RegistrationForm setMenuVisible={setMenuVisible} />
          </section>
          <section className="authModal__auth">
            <AuthorizationForm setMenuVisible={setMenuVisible} />
          </section>
        </div>
      </div>
    </article>
  );
};
