import { baseApi } from "@/redux/api/baseApi";

const getAdminProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminProfile: builder.query({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
      }),
      providesTags: ["admin_profile"],
    }),
  }),
});

export const { useGetAdminProfileQuery } = getAdminProfileApi;
