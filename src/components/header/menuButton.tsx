import {close, menu} from './imports';
import styled from 'styled-components';

type menuButtonType = {
    setMenuVisible(value: boolean): void,
    menuVisible: boolean
}
const StyledButton = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    img {
        width: 60px;
    }
`

export const MenuButton = ({setMenuVisible, menuVisible}: menuButtonType) => {
  return (
    <StyledButton onClick={() => setMenuVisible(!menuVisible)}>
      <img src={menuVisible ? close : menu} alt="menu" />
    </StyledButton>
  );
};
