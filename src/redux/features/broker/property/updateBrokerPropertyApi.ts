import { baseApi } from "@/redux/api/baseApi";

const updateBrokerPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateBrokerProperty: builder.mutation({
            query: (data) => ({
                url: `/brokers/properties/${data.id}/`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Properties'],
        })
    }),
})

export const { useUpdateBrokerPropertyMutation } = updateBrokerPropertyApi;