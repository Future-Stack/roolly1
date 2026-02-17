import { baseApi } from "@/redux/api/baseApi";

const getAllMessagesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       getAllMessages: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.ordering) queryParams.append('ordering', params.ordering);
                if (params?.role) queryParams.append('role', params.role);
                if (params?.search) queryParams.append('search', params.search);
                
                return {
                    url: `/conversations/list/?${queryParams.toString()}`,
                    method: 'GET',
                };
            }
        })
    }),
})
export const { useGetAllMessagesQuery } = getAllMessagesApi;