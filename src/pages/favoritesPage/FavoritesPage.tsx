import React from 'react';
import "./FavoritesPage.scss";
import "./FavoritesItem.scss";
import {Favorites} from "components/favorites/index";

const FavoritesPage: React.FC = () => {
  return (
    <Favorites />
  )
}

export {
  FavoritesPage
}