import { baseApi } from "@/redux/api/baseApi";

const deleteVendorPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteVendorProperty: builder.mutation({
            query: (id) => ({
                url: `/vendors/properties/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags:['Properties']
        })
    }),
})

export const { useDeleteVendorPropertyMutation } = deleteVendorPropertyApi;