
import { baseApi } from "@/redux/api/baseApi";

export const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacyPolicy: builder.query({
      query: (params) => ({
        url: "/platform-settings/privacy-policy",
        method: "GET",
        params,
      }),
      providesTags: ["PrivacyPolicy"],
    }),
    getPrivacyPolicyById: builder.query({
      query: (id) => ({
        url: `/platform-settings/privacy-policy${id}/`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "PrivacyPolicy", id }],
    }),
    createPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/platform-settings/privacy-policy",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PrivacyPolicy"],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/platform-settings/privacy-policy${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "PrivacyPolicy",
        { type: "PrivacyPolicy", id },
      ],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useGetPrivacyPolicyByIdQuery,
  useCreatePrivacyPolicyMutation,
  useUpdatePrivacyPolicyMutation,
} = privacyPolicyApi;
