import "./AuthModal.scss";
import { RegistrationForm } from "components/forms/registration/RegistrationForm";
import { AuthorizationForm } from "components/forms/authorization/AuthorizationForm";
import { MenuButton } from "components/header/menuButton";

interface AuthModalI {
  setMenuVisible(value: boolean): void;
  menuVisible: boolean;
}

export const AuthModal = ({setMenuVisible, menuVisible}: AuthModalI) => {
  return (
    <article className="authModal">
      <div className="authModal__wrapper">
        <MenuButton setMenuVisible={setMenuVisible} menuVisible={menuVisible} />
        <h1 className="authModal__title">Зарегистрируйтесь/Войдите</h1>
        <div className="authModal__forms">
          <section>
            <RegistrationForm />
          </section>
          <section>
            <AuthorizationForm />
          </section>
        </div>
      </div>
    </article>
  );
};
