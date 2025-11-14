import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../types/types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
      );
      headers.set("Content-Type", "application/json;charset=utf-8");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createRequestToken: builder.query<{ request_token: string }, void>({
      query: () => "authentication/token/new",
    }),
    createSession: builder.mutation<{ session_id: string }, string>({
      query: (requestToken) => ({
        url: "authentication/session/new",
        method: "POST",
        body: { request_token: requestToken },
      }),
    }),
    getAccount: builder.query<IAccount, string>({
      query: (session_id) => `account?session_id=${session_id}`,
    }),
  }),
});

export const {
  useCreateRequestTokenQuery,
  useCreateSessionMutation,
  useGetAccountQuery,
} = authApi;
