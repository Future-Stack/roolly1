import { baseApi } from "@/redux/api/baseApi";

const updateAdminProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateAdminProfile: builder.mutation({
            query: (formData) => ({
                url: '/admin/profile/',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags:["admin_profile"]
        })
    }),
})

export const { useUpdateAdminProfileMutation } = updateAdminProfileApi;