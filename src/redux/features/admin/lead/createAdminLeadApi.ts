import { baseApi } from "@/redux/api/baseApi";

const createAdminLeadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAdminLead: builder.mutation({
            query: (data) => ({
                url: '/admin/lead/create/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Leads"],
        }),
    }),
});

export const { useCreateAdminLeadMutation } = createAdminLeadApi;
