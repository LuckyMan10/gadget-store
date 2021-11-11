

type ButtonComponentType = {
  img?: string,
  text: string
}

export const ButtonComponent = ({img, text}: ButtonComponentType) => {
  return (
    <button className="header__button">
      {img && <img src={img} alt="" />}
      <span>{text}</span>
    </button>
  );
};
