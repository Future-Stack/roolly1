import { baseApi } from "../../api/baseApi";

const analyticsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAnalytics: builder.query({
            query : () => ({
                url : '/vendors/analytics-overview/',
                method: 'GET',
            }),
        }),
        getLeadSources: builder.query({
            query : () => ({
                url : 'vendors/leads-sources/', 
                method: 'GET',
            }),
        }),
         

    }),
})

export const {
    useGetAnalyticsQuery,
    useGetLeadSourcesQuery
} = analyticsApi;