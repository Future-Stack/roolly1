import { baseApi } from "@/redux/api/baseApi";

const propertyEnquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPropertyEnquiry: builder.mutation({
      query: (data: {
        name: string;
        business_name: string;
        email: string;
        phone_number: string;
        sqft_min: string;
        sqft_max: string;
        location: string;
      }) => ({
        url: "/enquiries/property/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreatePropertyEnquiryMutation } = propertyEnquiryApi;
