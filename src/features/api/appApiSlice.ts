import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface navDataI {
  id: string;
  category: string;
  name: string;
  companies: Array<string>;
}
interface productI {
  company: string;
  name: string;
  price: number;
  images: Array<string>;
  description: Array<any>;
  category: string;
  id: string;
}
interface topSliderI {
  slider: string;
  slides: Array<string>;
  _id: string;
}
interface currOffersSliderI {
  slider: string;
  slides: Array<productI>;
  _id: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders(headers) {
      headers.set("api_key", "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchNavData: builder.query<navDataI[], void>({
        query() {
          return `/products/navData`;
        },
      }),
      fetchCategory: builder.query<productI[], string>({
        query(category) {
          return `/products/category?name=${category}`;
        },
      }),
      fetchTopSlider: builder.query<topSliderI[], string>({
        query(type) {
          return `/products/carouselData?type=${type}`;
        },
      }),
      fetchCurrOffersSlider: builder.query<currOffersSliderI[], string>({
        query(type) {
          return `/products/carouselData?type=${type}`;
        },
      }),
      fetchOneProduct: builder.query<productI[], string>({
        query(id) {
          return `/products/find?id=${id}`;
        },
      }),
    };
  },
});

export const {
  useFetchNavDataQuery,
  useFetchCategoryQuery,
  useFetchTopSliderQuery,
  useFetchCurrOffersSliderQuery,
  useFetchOneProductQuery
} = apiSlice;
