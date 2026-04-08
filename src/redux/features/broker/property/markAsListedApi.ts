import { baseApi } from "@/redux/api/baseApi";

const markAsListedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        markAsListed: builder.mutation({
            query: (id) => ({
                url: `/brokers/mark-as-listed/${id}/`,
                method: 'POST',
            }),
            invalidatesTags: ['Properties']
        })
    }),
})

export const { useMarkAsListedMutation } = markAsListedApi;
