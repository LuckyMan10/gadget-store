
interface ButtonComponentType {
  img?: string;
  text?: string
  id?: string;
}

export const ButtonComponent = ({img, text, id}: ButtonComponentType) => {

  return (
    <button id={id ? id : 'button'} className="header__button">
      {img && <img src={img} alt="" />}
      {text && <span>{text}</span>}
    </button>
  );
};
