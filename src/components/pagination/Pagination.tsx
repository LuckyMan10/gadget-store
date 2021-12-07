import { DynamicButtonComponent } from "components/buttons/Buttons";
import React from 'react';
import {PaginationContent} from "./PaginationStyle";
import {PaginationType} from "types";

const Pagination: React.FC<PaginationType> = ({ paginationHandler, allPages, currentPage }) => {
  return (
    <section className="pagination">
      <PaginationContent onClick={paginationHandler}>
        <DynamicButtonComponent id="toBack" text="назад" />
        {Array(allPages)
          .fill(0)
          .map((el, index) => {
            return <span className={`page ${currentPage === index + 1 ? "active" : ""}`} key={`pagination_${index}`}>{index + 1}</span>;
          })}
        <DynamicButtonComponent id="toForvard" text="вперед" />
      </PaginationContent>
    </section>
  );
};

export {
  Pagination
}
