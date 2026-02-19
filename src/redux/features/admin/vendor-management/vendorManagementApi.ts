import { baseApi } from "@/redux/api/baseApi";

export const vendorManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: (params?: { page?: number; page_size?: number; search?: string }) => ({
        url: "/admin/vendor-list/",
        method: "GET",
        params: params,
      }),
      providesTags: ["Vendor"],
    }),
    addVendor: builder.mutation({
      query: (data) => ({
        url: "/admin/add-vendor/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    activateVendor: builder.mutation({
      query: (id) => ({
        url: `/admin/active-vendor/${id}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Vendor"],
    }),
    deactivateVendor: builder.mutation({
      query: (id) => ({
        url: `/admin/deactive-vendor/${id}/`,
        method: "PUT",
      }),
      invalidatesTags: ["Vendor"],
    }),
    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `/admin/delete-vendor/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vendor"],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useAddVendorMutation,
  useActivateVendorMutation,
  useDeactivateVendorMutation,
  useDeleteVendorMutation,
} = vendorManagementApi;
