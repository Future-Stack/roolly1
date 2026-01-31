import { baseApi } from "@/redux/api/baseApi";

const updateBrokerProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateBrokerProfile: builder.mutation({
            query: (data) => ({
                url: `/brokers/profile/`,
                method:"PATCH",
                body: data
            }),
            invalidatesTags: ['Broker_Profile']
        })
    }),
})
export const { useUpdateBrokerProfileMutation } = updateBrokerProfileApi;