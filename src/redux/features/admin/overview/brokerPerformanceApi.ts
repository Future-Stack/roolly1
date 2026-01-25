import { baseApi } from "@/redux/api/baseApi";

const brokerPerformanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        brokerPerformance: builder.query({
            query: (params?: { page?: number; page_size?: number; search?: string }) => ({
                url: '/admin/dashboard/broker-performance/',
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

export const { useBrokerPerformanceQuery } = brokerPerformanceApi;