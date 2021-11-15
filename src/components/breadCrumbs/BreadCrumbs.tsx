import { Link } from "react-router-dom";
import styled from "styled-components";

interface BreadCrumbsI {
  category: string[];
  item?: string;
}

const StyledBreadCrumbs = styled.ul`
  margin: 10px 0px 0px 10px;
  li,
  span {
    opacity: 0.7;
    font-weight: 500;
    display: inline;
    padding: 2px;
  }
  a {
    color: black;
  }
`;

export const BreadCrumbs = ({ category, item }: BreadCrumbsI) => {
  return (
    <article className="BreadCrumbs">
    <StyledBreadCrumbs>
      <li>
        <Link to="/">Главная</Link>
      </li>
      <span>/</span>
      <li>
        {item ? <Link to={`/${category[1]}`}>{category[0]}</Link> : category[0]}
      </li>
      <span>/</span>
      {item && <li>{item}</li>}
    </StyledBreadCrumbs>
    </article>
  );
};
