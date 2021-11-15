import { logo } from "./imports";

interface LogoI {
  onClick(): void;
}

export const Logo = () => {
  return (
    <section id="/" className="header__logo">
      <div id="/" className="header__logo-img">
        <img id="/" src={logo} alt="logo" />
      </div>
      <h1 id="/">Gadget store</h1>
    </section>
  );
};
