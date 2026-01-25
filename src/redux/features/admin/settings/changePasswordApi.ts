import { baseApi } from "@/redux/api/baseApi";

const changePasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (payload) => ({
                url: '/admin/change-password/',
                method: 'PUT',
                body: payload  
            }),
        })
    }),
});

export const { useChangePasswordMutation } = changePasswordApi;