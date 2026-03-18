import { baseApi } from "@/redux/api/baseApi";

export const leadCommentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLeadComment: builder.query<{ comment: string }, number | string>({
            query: (id) => ({
                url: `/brokers/lead/${id}/comment/`,
                // url: `/brokers/lead/207/comment/`,
                method: 'GET',
            }),
            providesTags: (_result, _error, id) => [{ type: 'Leads', id }],
        }),
        updateLeadComment: builder.mutation<{ comment: string }, { id: number | string; comment: string }>({
            query: ({ id, comment }) => ({
                url: `/brokers/lead/${id}/comment/`,
                method: 'PUT',
                body: { comment },
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Leads', id }, 'Leads'],
        }),
    }),
});

export const { useGetLeadCommentQuery, useUpdateLeadCommentMutation } = leadCommentApi;
