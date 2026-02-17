import { baseApi } from "../../api/baseApi";

const getAllVendorPropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllVendorProperty: builder.query({
            query : () => ({
                url : '/vendors/my-property-leads-list/',
                method: 'GET',
            }),
            providesTags:['Properties']
        })
    }),
})

export const {useGetAllVendorPropertyQuery} = getAllVendorPropertyApi;