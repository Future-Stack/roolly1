import { baseApi } from "@/redux/api/baseApi";

const deleteLeadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteLead: builder.mutation<void, number>({
      query: (id) => ({
        url: `/brokers/lead/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Leads", "Properties"],
    }),
  }),
});

export const { useDeleteLeadMutation } = deleteLeadApi;
