import { baseApi } from "@/redux/api/baseApi";

const adminChangePasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        adminChangePassword: builder.mutation({
            query: (payload) => ({
                url: '/admin/change-password/',
                method: 'PUT',
                body: payload  
            }),
        })
    }),
});

export const { useAdminChangePasswordMutation } = adminChangePasswordApi;
