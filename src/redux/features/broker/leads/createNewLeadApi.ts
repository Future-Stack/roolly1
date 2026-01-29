import { baseApi } from "@/redux/api/baseApi";

const createNewLeadApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       createNewLead: builder.mutation({
            query : (data) => ({
                url : '/brokers/leads/',
                method: 'POST',
                body: data
            })
        })
    }),
})

export const {useCreateNewLeadMutation} = createNewLeadApi;