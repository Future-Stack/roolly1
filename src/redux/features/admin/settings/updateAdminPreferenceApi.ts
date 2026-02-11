import { baseApi } from "@/redux/api/baseApi";

const updateAdminPreferenceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateAdminPreference: builder.mutation({
            query: (data) => ({
                url: '/admin/settings/',
                method: 'PATCH',
                body: data,
            }),
        })
    }),
})

export const { useUpdateAdminPreferenceMutation } = updateAdminPreferenceApi;