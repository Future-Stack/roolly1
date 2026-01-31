import { baseApi } from "@/redux/api/baseApi";

const getSingleUserMessageApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getSingleUserMessage: builder.query({
            query : (conversationId: string) => ({
                url : `/conversations/${conversationId}/messages`,
                method: 'GET',
            })
        })
    }),
})
export const {useGetSingleUserMessageQuery} = getSingleUserMessageApi;