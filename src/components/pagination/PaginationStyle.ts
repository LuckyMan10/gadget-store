import Styled from "styled-components";

const PaginationContent = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    .page {
        font-weight: 500;
        font-size: 25px;
        opacity: 0.5
    }
    .active {
        opacity: 0.8;
    }
    button {
        font-family: "Roboto";
        font-size: 25px;
        border: none;
        background: rgba(0,0,0,0.65);
        padding: 7px;
        border-radius: 10px;
        color: white;
        cursor: pointer;
        transition: 0.2s;
        &:active {
            transition: 0.2s;
            transform: scale(0.98);
        }
    }
`;

export {
    PaginationContent
}