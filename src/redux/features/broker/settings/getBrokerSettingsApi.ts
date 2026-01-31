import { baseApi } from "@/redux/api/baseApi";

const getBrokerSettingsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getBrokerSettings: builder.query({
            query : () => ({
                url : '/brokers/settings/',
                method: 'GET',
            }),
            providesTags: ['Broker_Settings']
        })
    }),
})

export const {useGetBrokerSettingsQuery} = getBrokerSettingsApi;