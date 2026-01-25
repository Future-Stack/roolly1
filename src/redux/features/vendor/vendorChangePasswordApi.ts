import { baseApi } from "@/redux/api/baseApi";

const vendorChangePasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        vendorChangePassword: builder.mutation({
            query: (data) => ({
                url: '/vendors/change-password/',
                method: 'PUT',
                body: data,
            }),
        })
    }),
})

export const { useVendorChangePasswordMutation } = vendorChangePasswordApi;