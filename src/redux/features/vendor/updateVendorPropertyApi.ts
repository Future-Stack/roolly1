import { baseApi } from "@/redux/api/baseApi";

const updateVendorPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateVendorProperty: builder.mutation({
            query: (data) => ({
                url: `/vendors/properties/${data.id}/`,
                method: 'PATCH',
                body: data.data,
            }),
            invalidatesTags: ['Properties'],
        })
    }),
})

export const { useUpdateVendorPropertyMutation } = updateVendorPropertyApi;