import { baseApi } from "@/redux/api/baseApi";

const getAllMessagesApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllMessages: builder.query({
            query : () => ({
                url : '/conversations/list/',
                method: 'GET',
            })
        })
    }),
})
export const {useGetAllMessagesQuery} = getAllMessagesApi;