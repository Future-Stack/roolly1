import { baseApi } from "@/redux/api/baseApi";

const updateAdminProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateAdminProfile: builder.mutation({
            query: (formData) => ({
                url: '/admin/profile/',
                method: 'PATCH',
                body: formData,
            }),
        })
    }),
})

export const { useUpdateAdminProfileMutation } = updateAdminProfileApi;