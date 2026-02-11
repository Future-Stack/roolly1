import { baseApi } from "@/redux/api/baseApi";

const getLeadPerformanceApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getLeadPerformance: builder.query({
            query : () => ({
                url : '/brokers/analytics/leads-performance/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetLeadPerformanceQuery} = getLeadPerformanceApi;