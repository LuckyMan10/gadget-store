import "./footer.scss";
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <button className="footer__github">
        <a href="https://github.com/LuckyMan10" className="footer__github">github.com/LuckyMan10</a>
      </button>
    </footer>
  );
};

export {
  Footer
}
