import { baseApi } from "@/redux/api/baseApi";

const getAnalyticsOverviewApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAnalyticsOverview: builder.query({
            query : () => ({
                url : '/brokers/analytics/overview',
                method: 'GET',
            })
        })
    }),
})

export const {useGetAnalyticsOverviewQuery} = getAnalyticsOverviewApi;