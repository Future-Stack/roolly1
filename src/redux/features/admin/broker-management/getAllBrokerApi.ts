import { baseApi } from "@/redux/api/baseApi";

const getAllBrokerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBroker: builder.query({
            query: (params?: { page?: number; page_size?: number; search?: string }) => ({
                url: '/admin/broker-list/',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    page_size: params?.page_size || 10,
                    search: params?.search || undefined
                }
            }),
            providesTags: ['Broker']
        })
    }),
});

export const { useGetAllBrokerQuery } = getAllBrokerApi;