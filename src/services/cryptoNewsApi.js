import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  'X-RapidAPI-Key': '795311e3a5mshb8994837051a5edp1c65bbjsnb9c08751c446',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';
const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({count}) => createRequest(`/v1/coindesk?limit=${count}`) // Pass the URL as a parameter
    })
  })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
