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
interface companiesI {
  company: string;
  category: string;
  logo: string;
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
      fetchCompanies: builder.query<companiesI[], string>({
        query(type) {
          return `/products/carouselData?type=${type}`;
        }
      })
    };
  },
});

export const {
  useFetchNavDataQuery,
  useFetchTopSliderQuery,
  useFetchCurrOffersSliderQuery,
  useFetchCompaniesQuery
} = apiSlice;
