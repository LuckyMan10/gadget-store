import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  navDataType,
  topSliderType,
  companiesType,
  currOffersType
} from "types";


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api`,
    prepareHeaders(headers) {
      headers.set("api_key", "l2ta3Vk4UkZcctEHoFdhDmM48QobiMLf");
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchNavData: builder.query<navDataType[], void>({
        query() {
          return `/products/navData`;
        },
      }),
      fetchTopSlider: builder.query<topSliderType[], string>({
        query(type) {
          return `/products/carouselData?type=${type}`;
        },
      }),
      fetchCurrOffersSlider: builder.query<currOffersType[], string>({
        query(type) {
          return `/products/carouselData?type=${type}`;
        },
      }),
      fetchCompanies: builder.query<companiesType<string>[], string>({
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
