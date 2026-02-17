import { baseApi } from "@/redux/api/baseApi";

const getSingleUserMessageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       getSingleUserMessage: builder.query({
            query: ({ conversationId, params }) => {
                const queryParams = new URLSearchParams();
                if (params?.cursor) queryParams.append('cursor', params.cursor);
                if (params?.ordering) queryParams.append('ordering', params.ordering);
                if (params?.search) queryParams.append('search', params.search);

                return {
                    url: `/conversations/${conversationId}/messages/?${queryParams.toString()}`,
                    method: 'GET',
                };
            }
        })
    }),
})
export const { useGetSingleUserMessageQuery } = getSingleUserMessageApi;