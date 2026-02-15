import { baseApi } from "@/redux/api/baseApi";

const adminAnalyticsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAdminAnalytics: builder.query({
            query : () => ({
                url : '/admin/analytics/overview/',
                method: 'GET',
            })
        }),
        getLeadsPerformance: builder.query({
            query: () => ({
                url: '/admin/analytics/leads-performance/',
                method: 'GET',
            })
        }),
        getPropertyTypePerformance: builder.query({
            query: () => ({
                url: '/admin/analytics/property-type-performance/',
                method: 'GET',
            })
        }),
        getLeadsConversion: builder.query({
            query: () => ({
                url: '/admin/analytics/leads-conversion/',
                method: 'GET',
            })
        }),
        getLeadSource: builder.query({
            query: () => ({
                url: '/admin/dashboard/lead-source/',
                method: 'GET',
            })
        }),
        getPropertyPerformance: builder.query({
            query: () => ({
                url: '/admin/dashboard/property-performance/',
                method: 'GET',
            })
        })
    }),
})

export const {
    useGetAdminAnalyticsQuery, 
    useGetLeadsPerformanceQuery, 
    useGetPropertyTypePerformanceQuery,
    useGetLeadsConversionQuery,
    useGetLeadSourceQuery,
    useGetPropertyPerformanceQuery
} = adminAnalyticsApi;