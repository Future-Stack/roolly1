import { baseApi } from "@/redux/api/baseApi";

const makeGrabLeadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        makeGrabLead: builder.mutation({
            query: ({ id, data }) => ({
                url: `/brokers/grab-lead/${id}/`,
                method: 'PATCH',
                body: data
            })
        })
    }),
})

export const { useMakeGrabLeadMutation } = makeGrabLeadApi;