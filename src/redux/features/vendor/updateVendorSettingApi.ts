import { baseApi } from "@/redux/api/baseApi";

const updateVendorSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateVendorSettings: builder.mutation({
      query: (data) => ({
        url: "/vendors/settings/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Vendor_Settings"],
    }),
  }),
});

export const { useUpdateVendorSettingsMutation } = updateVendorSettingsApi;
