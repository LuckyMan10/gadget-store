import React from 'react';

//components

export type objType<T> = { [key: string]: T }
export type sliderType<T> = {
    data: {
        slides: Array<T>;
        slider: string;
        _id: string;
    };
}

export type BreadCrumbsType = {
    category: string;
    name: string;
    item?: Array<string>;
}
export type ClickButtonType = {
    text?: string;
    img?: string;
    type?: string;
    id: string;
}
export type BuyButtonType = {
    text?: string;
    toFav?: string;
    isCart?: boolean;
    price: number;
    onClick(e: React.MouseEvent<HTMLButtonElement>): void;
    id: string;
}
export type ChangeValueButtonType = {
    value?: number;
    id: string;
}
export type MenuButtonType = {
    type: boolean;
    clickButton(): void
}
export type cartProductListType = {
    title: string;
}
export type ErrorComponentType = {
    message: string;
    img: string;
}
export type FormAuthType = {
    email: string;
    password: string;
}
export type FormRegType = {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}
export type searchType = {
    hideMenu: boolean;
}
export type mobileMenuStylesType = {
    scrollHeight: number;
}
export type navBarType = {
    navBarClick(e: React.MouseEvent<HTMLUListElement>): void;
}
export type notificationType = {
    message: string;
    visible: boolean;
    setVisible(arg: boolean): void;
}
export type PaginationType = {
    paginationHandler(e: React.MouseEvent<HTMLDivElement>): void;
    allPages: number;
    currentPage: number;
}
export type productItemType = {
    img: string;
    name: string;
    isCounter: boolean;
    price: number;
    btn_1?: { id: string; text: string; type: string; };
    btn_2?: { id: string; text: string; type: string; };
    counterValue?: number;
    id: string;
}
export type productImagesType = {
    images: Array<string>;
    title: string;
}
export type specificationsType = {
    data: Array<objType<string>>;
}
export type productCardType = {
    company: string;
    productName: string;
    price: number;
    images: Array<string>;
    description: Array<any>;
    category: string;
    categoryRus: string;
    id: string;
}
export type productsType = {
    toProductHandler(id: string): void;
    products: Array<productCardType>;
}
export type searchSettingsType = {
    category: string;
    appData: {
        id: string;
        category: string;
        name: string;
        companies: string[];
    };
    isMobile: boolean;
}
export type currCategoryType = {
    name: string;
    companies: Array<string>;
    category: string;
}
export type itemType = objType<boolean>;
export type muiPriceSliderType = {
    price: number[];
    setPrice(arg: number[]): void;
}
export type companiesType<T> = {
    company: T;
    category: T;
    categoryRus: T;
}
export type companySliderType<T> = {
    data: Array<companiesType<T>>;
    companyClick(e: React.MouseEvent<HTMLDivElement>): void;
}
export type currOffersType = sliderType<productCardType>;
export type topSliderType = sliderType<string>;
export type stockType = {
    isLoading: boolean;
}
export type userInfoModalType = {
    email: string;
    cart_summ: number;
    fav_summ: number;
};

//features

export type navDataType = {
    id: string;
    category: string;
    name: string;
    companies: Array<string>;
}
export type userDataType = {
    username: string;
    email: string;
    password: string;
}
export type userType = {
    accessToken: string;
    refreshToken: string;
    user: {
        email: string;
        username: string;
        id: string;
    };
}
export type authApiInitState = {
    user: userType;
    isAuth: boolean;
    loading: boolean;
    error: string;
    isError: boolean;
    refreshError: string;
    isRefreshError: boolean;
}

export type notAuthInitState = {
    userCart: {
        anonymUserId: string;
        productsSummPrice: number;
        products: {
            [key: string]: {
                productId: string;
                quantity: number;
                productData: productCardType;
            };
        };
    }
    loading: boolean;
    isWasFetched: boolean;
}

export type notAuthFavInitState = {
    userFav: {
        anonymUserId: string;
        favoriteList: {
            [key: string]: {
                productId: string;
                productData: productCardType;
            };
        };
    };
    loading: boolean;
    isWasFetched: boolean;
}

export type productsApiInitState = {
    products: Array<productCardType>;
    oneProduct: productCardType;
    isWasFetched: boolean;
    loading: boolean;
    currentPage: number;
    allPages: number;
    productsStart: number;
    productsEnd: number;
    currentProducts: Array<productCardType>;
    oneProductLoaded: boolean;
    productsLoaded: boolean;
}

export type fetchProducts = {
    price: number[];
    companies: { [key: string]: boolean };
    category: string;
}

export type fetchForAuth = {
    productId: string;
    type?: string;
}
export type fetchForAuthWithData = {
    productId: string;
    type: string;
    username: string;
    email: string;
    password: string;
}

export type fetchType<T> = {
    api_key: string;
    access_key?: string;
    baseURL: string;
    method: string;
    url: string;
    withCredentials: boolean;
    data?: T
}

export type userCartInitState = {
    userCart: {
        productsSummPrice: number;
        userId: string;
        products: Array<{
            productId: string;
            quantity: number;
            product: productCardType;
        }>
    };
    loading: boolean;
    isWasFetched: boolean;
}

export type getSummArrType = Array<
    {
        productId: string;
        quantity: number;
        product: productCardType;
    }
>
export type getSummObjType = {
    [key: string]: {
        productId: string;
        quantity: number;
        productData: productCardType;
    };
}

export type fetchFavList = {
    productId: string;
}

export type favListState = {
    userFavList: {
        userId: string;
        products: Array<{
            productId: string;
            product: productCardType;
        }>
    };
    loading: boolean;
    isWasFetched: boolean;
}

//pages

export type navbarDataItemType = {
    id: string;
    category: string;
    name: string;
    companies: string[];
}
