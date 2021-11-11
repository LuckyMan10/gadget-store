import { imports } from "./imports";

export const ButtonAcc = () => {
  return (
    <button className="header__buttons-account">
      <img src={imports.account} alt="account" />
      <span>Войти</span>
    </button>
  );
};
