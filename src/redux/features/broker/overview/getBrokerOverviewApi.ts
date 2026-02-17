import { baseApi } from "@/redux/api/baseApi";

const getBrokerOverviewApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getBrokerOverview: builder.query({
            query : () => ({
                url : '/brokers/dashboard-overview/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetBrokerOverviewQuery} = getBrokerOverviewApi;