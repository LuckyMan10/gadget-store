import { DynamicButtonComponent } from "components/buttons/Buttons";
import Styled from "styled-components";

interface PaginationI {
  paginationHandler(e: React.MouseEvent<HTMLDivElement>): void;
  allPages: number;
  currentPage: number;
}


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

export const Pagination = ({ paginationHandler, allPages, currentPage }: PaginationI) => {
  return (
    <section className="pagination">
      <PaginationContent onClick={paginationHandler}>
        <DynamicButtonComponent id="toBack" text="назад" />
        {Array(allPages)
          .fill(0)
          .map((el, index) => {
            return <span className={`page ${currentPage === index+1 ? "active" : ""}`} key={`pagination_${index}`}>{index + 1}</span>;
          })}
        <DynamicButtonComponent id="toForvard" text="вперед" />
      </PaginationContent>
    </section>
  );
};
