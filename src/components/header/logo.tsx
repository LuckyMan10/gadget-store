import { logo } from "components/staticImports";
import React from 'react';

const Logo: React.FC = () => {
  return (
    <section id="/" className="header__logo">
      <div id="/" className="header__logo-img">
        <img id="/" src={logo} alt="logo" />
      </div>
      <h1 id="/">Gadget store</h1>
    </section>
  );
};

export {
  Logo
}