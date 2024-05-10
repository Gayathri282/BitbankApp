import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
  'X-RapidAPI-Key': '4dcf627493mshb3237c03736541fp198a4djsn62bcefff0b10',
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
