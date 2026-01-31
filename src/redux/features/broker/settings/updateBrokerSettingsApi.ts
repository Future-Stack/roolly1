import { baseApi } from "@/redux/api/baseApi";

const updateBrokerSettingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateBrokerSettings: builder.mutation({
            query: (data) => ({
                url: `/brokers/settings/`,
                method:"PATCH",
                body: data
            }),
            invalidatesTags: ['Broker_Settings']
        })
    }),
})
export const { useUpdateBrokerSettingsMutation } = updateBrokerSettingsApi;