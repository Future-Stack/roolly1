import { baseApi } from "@/redux/api/baseApi";

const getListedPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getListedPropertyApi: builder.query({
            query: (params) => ({
                url: '/brokers/my-listed-properties/',
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

export const { useGetListedPropertyApiQuery } = getListedPropertyApi;