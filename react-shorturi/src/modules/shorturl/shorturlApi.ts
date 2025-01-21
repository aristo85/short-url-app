import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Shorturl, ShorturlInfo, ShorturlsResponse } from "./types";

export const shorturlApi = createApi({
  reducerPath: "shorturlApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["shorten"],
  endpoints: (builder) => ({
    getOriginalUrl: builder.query<{ originalUrl: string }, string>({
      query: (shortUrl) => `${shortUrl}`,
      transformResponse: ({ originalUrl }) => {
        if (originalUrl) {
          window.open(originalUrl, "_blank");
        }
        return originalUrl;
      },
    }),
    getShorturlInfo: builder.query<ShorturlInfo, string>({
      query: (shortUrl) => `info/${shortUrl}`,
      keepUnusedDataFor: 0,
    }),
    getShorturls: builder.query<ShorturlsResponse, void>({
      query: () => "list",
      providesTags: ["shorten"],
    }),
    addShorturl: builder.mutation<Partial<ShorturlInfo>, Shorturl>({
      query: (shorturl) => ({
        url: "shorten",
        method: "POST",
        body: shorturl,
      }),
      invalidatesTags: ["shorten"],
    }),
    deleteShorturl: builder.mutation({
      query: (shorturl) => ({
        url: `delete/${shorturl}`,
        method: "DELETE",
      }),
      invalidatesTags: ["shorten"],
    }),
  }),
});

export const {
  useGetShorturlsQuery,
  useAddShorturlMutation,
  useDeleteShorturlMutation,
  useGetOriginalUrlQuery,
  useGetShorturlInfoQuery,
} = shorturlApi;
