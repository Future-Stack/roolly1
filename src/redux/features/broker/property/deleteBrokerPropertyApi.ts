import { baseApi } from "@/redux/api/baseApi";

const deleteBrokerPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteBrokerProperty: builder.mutation({
            query: (id) => ({
                url: `/brokers/properties/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags:['Properties']
        })
    }),
})

export const { useDeleteBrokerPropertyMutation } = deleteBrokerPropertyApi;