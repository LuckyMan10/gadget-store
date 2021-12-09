import React from 'react';
import { useAppSelector } from "app/hooks";
import { AuthFav } from './AuthFav';
import { NotAuthFav } from './NotAuthFav';

const Favorites: React.FC = () => {
    const { isAuth, isRefreshError, loading } = useAppSelector((state) => state.auth);
    return (
        <>
            {isAuth && !isRefreshError && !loading && <AuthFav />}
            {!isAuth && isRefreshError && !loading && <NotAuthFav />}
        </>
    )
}

export {
    Favorites
}