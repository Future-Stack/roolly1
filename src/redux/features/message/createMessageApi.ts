import { baseApi } from "@/redux/api/baseApi";

const createMessageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMessage: builder.mutation({
            query: (data) => ({
                url: '/conversations/create-or-get/',
                method: 'POST',
                body: data
            })
        })
    }),
})

export const { useCreateMessageMutation } = createMessageApi;