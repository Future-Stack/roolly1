import { baseApi } from "@/redux/api/baseApi";

const getNewPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNewProperty: builder.query({
            query: (params) => ({
                url: '/brokers/new-properties/',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    page_size: params?.page_size || 5,
                    search: params?.search || '',
                },
            }),
        })
    }),
});

export const { useGetNewPropertyQuery } = getNewPropertyApi;