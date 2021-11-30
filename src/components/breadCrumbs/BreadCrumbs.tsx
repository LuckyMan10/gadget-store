import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import React from 'react';

interface BreadCrumbsI {
  category: string;
  name: string;
  item?: string;
}


const StyledBreadCrumbs = styled.ul`
  margin: 10px 0px 0px 10px;
  li,
  span {
    font-weight: 500;
    display: inline;
    padding: 2px;
  }
  li {
    cursor: pointer;
  }
  li[data-active="active"] {
    opacity: 0.5;
    pointer-events: none;
  }
  a {
    color: black;
  }
`;

export const BreadCrumbs = ({ category, name, item }: BreadCrumbsI) => {
  const navigate = useNavigate();

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const path = (e.target as HTMLElement).dataset.path;
    const isActive = (e.target as HTMLElement).dataset.active;
    if(path && !isActive) {
      navigate(path);
    }
  }

  return (
    <article onClick={clickHandler} className="BreadCrumbs">
    <StyledBreadCrumbs>
      <li><Link to="/">Главная</Link></li>
      <span>/</span>
      <li data-active={!item ? 'active' : ''} data-path={`/${category}/all`}>{name}</li>
      <span>/</span>
      {item &&
        <li data-active='active' data-path={`/${category}/all/product/${item}`}>{item}</li>
      }
    </StyledBreadCrumbs>
    </article>
  );
};
