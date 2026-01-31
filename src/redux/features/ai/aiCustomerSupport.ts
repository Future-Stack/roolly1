import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aiBaseApi = createApi({
  reducerPath: "aiBaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://156.67.216.137:8002",
  }),
  endpoints: () => ({}),
});

const aiCustomerSupportApi = aiBaseApi.injectEndpoints({
    endpoints : (builder) => ({
        createChatThread: builder.mutation({
            query: (body) => ({
                url: "/chat-thread-create",
                method: "POST",
                body,
            }),
        }),

         // SEND MESSAGE
        sendChatMessage: builder.mutation({
            query: (body) => ({
                url: "/chat",
                method: "POST",
                body,
            }),
        }),

        // GET CHAT HISTORY
        getChatHistory: builder.mutation({
            query: (body) => ({
                url: "/chat-history",
                method: "POST",
                body,
            }),
        }),
    }),
})

export const {
    useCreateChatThreadMutation, 
    useSendChatMessageMutation,
    useGetChatHistoryMutation
} = aiCustomerSupportApi;