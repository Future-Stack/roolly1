import { baseApi } from "@/redux/api/baseApi";

const getBrokerLeadsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getBrokerLeads: builder.query({
            query : () => ({
                url : '/brokers/my-leads-overview/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetBrokerLeadsQuery} = getBrokerLeadsApi;