import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL;

export const $rtkApi = createApi({
reducerPath: "rtkApi",
baseQuery: fetchBaseQuery({
baseUrl: API_URL,
}),
endpoints: () => ({}),
});