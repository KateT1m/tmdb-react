import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPopularMovies, MoviesQueryParams } from "../types/types";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<IPopularMovies, MoviesQueryParams>({
      query: ({
        page = 1,
        release_year,
        rating_gte,
        genre,
        language,
        sort_by = "popularity.desc",
      }) => ({
        url: "discover/movie",
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          page,
          sort_by,

          ...(release_year ? { primary_release_year: release_year } : {}),
          ...(rating_gte ? { "vote_average.gte": rating_gte } : {}),
          ...(genre ? { with_genres: genre } : {}),
          ...(language ? { with_original_language: language } : {}),
        },
      }),
    }),
  }),
});

export const { useGetPopularMoviesQuery } = movieApi;
