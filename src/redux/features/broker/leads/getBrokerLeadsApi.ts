import { baseApi } from "@/redux/api/baseApi";

const getBrokerLeadsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getBrokerLeads: builder.query({
            query : () => ({
                url : '/brokers/my-leads-overview/',
                method: 'GET',
            }),
            providesTags: ["Leads"]
        })
    }),
})

export const {useGetBrokerLeadsQuery} = getBrokerLeadsApi;