import fillHeart from "assets/icons/fillHeart.svg";

const Header = () => {
    return (
        <section className="favoritesPage__header">
        <img src={fillHeart} alt="heart" />
        <h1 className="favoritesPage__title">Избранное</h1>
      </section>
    )
}

export {
    Header
}