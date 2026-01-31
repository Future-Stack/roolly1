import { baseApi } from "@/redux/api/baseApi";

const updateNewLeadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateLead: builder.mutation({
            query: ({ id, data }) => ({
                url: `/brokers/leads/${id}/`,
                method: 'PATCH',
                body: data
            })
        })
    }),
})

export const { useUpdateLeadMutation } = updateNewLeadApi;