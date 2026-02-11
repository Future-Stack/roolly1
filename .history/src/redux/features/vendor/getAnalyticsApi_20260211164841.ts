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
                url : '/vendors/lead-sources/', 
                method: 'GET',
            }),
        }),
         

    }),
})

export const {useGetAnalyticsQuery} = analyticsApi;