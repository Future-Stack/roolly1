import { baseApi } from "@/redux/api/baseApi";

const deleteAdminLeadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAdminLead: builder.mutation<void, number>({
      query: (id) => ({
        url: `/admin/lead/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leads"],
    }),
  }),
});

export const { useDeleteAdminLeadMutation } = deleteAdminLeadApi;
