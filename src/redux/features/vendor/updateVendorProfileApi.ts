import { baseApi } from "@/redux/api/baseApi";

const updateVendorProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateVendorProfile: builder.mutation({
            query: (data) => ({
                url: '/vendors/profile/',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags:['Vendors_Profile']
        })
    }),
})

export const { useUpdateVendorProfileMutation } = updateVendorProfileApi;