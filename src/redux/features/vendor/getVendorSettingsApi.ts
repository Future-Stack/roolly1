import { baseApi } from "../../api/baseApi";

const getVendorSettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVendorSettings: builder.query({
      query: () => ({
        url: '/vendors/settings',
        method: "GET",
      }),
      providesTags: ["Vendor_Settings"],
    }),
  }),
});

export const { useGetVendorSettingsQuery } = getVendorSettingsApi;
