import { baseApi } from "@/redux/api/baseApi";

const getBrokerProfileApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getBrokerProfile: builder.query({
            query : () => ({
                url : '/brokers/profile/',
                method: 'GET',
            }),
            providesTags: ['Broker_Profile']
        })
    }),
})

export const {useGetBrokerProfileQuery} = getBrokerProfileApi;