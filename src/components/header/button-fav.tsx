import {imports} from './imports';

export const ButtonFav = () => {
  return (
    <button className="header__buttons-favorites">
      <img src={imports.heart} alt="" />
      <span>Избранное</span>
    </button>
  );
};
