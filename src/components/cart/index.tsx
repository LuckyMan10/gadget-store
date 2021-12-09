import React from 'react';
import { useAppSelector } from "app/hooks";
import { AuthCart } from "./AuthCart";
import { NotAuthCart } from "./NotAuthCart";

const Cart: React.FC = () => {
    const { isAuth, isRefreshError, loading } = useAppSelector(
        (state) => state.auth
    );
    return (
        <section className="Cart">
            {isAuth && !isRefreshError && !loading && <AuthCart title="Корзина" />}
            {!isAuth && isRefreshError && !loading && <NotAuthCart title="Корзина" />}
        </section>
    )
}

export {
    Cart
}