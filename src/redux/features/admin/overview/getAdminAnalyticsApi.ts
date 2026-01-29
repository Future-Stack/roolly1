import { baseApi } from "@/redux/api/baseApi";

const getAdminAnalyticsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAdminAnalytics: builder.query({
            query : () => ({
                url : '/admin/analytics/overview/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetAdminAnalyticsQuery} = getAdminAnalyticsApi;