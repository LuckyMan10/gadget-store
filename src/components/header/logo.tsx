import {logo} from './imports';

export const Logo = () => {
  return (
    <section className="header__logo">
      <div className="header__logo-img">
        <img src={logo} alt="logo" />
      </div>
      <h1>Gadget store</h1>
    </section>
  );
};
