import { baseApi } from "@/redux/api/baseApi";

const makeGrabLeadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        makeGrabLead: builder.mutation({
            query: (id) => ({
                url: `/brokers/grab-lead/${id}/`,
                method: 'PATCH',
            })
        })
    }),
})

export const { useMakeGrabLeadMutation } = makeGrabLeadApi;