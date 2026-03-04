import { baseApi } from "@/redux/api/baseApi";

const getAllVendorPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllVendorProperty: builder.query({
            query: (params) => ({
                url: '/vendors/listed-properties/',
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

export const { useGetAllVendorPropertyQuery } = getAllVendorPropertyApi;
