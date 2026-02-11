import { baseApi } from "../../api/baseApi";

const getAllVendorPropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllVendorProperty: builder.query({
            query : () => ({
                url : 'import { baseApi } from "../../api/baseApi";

const getAllVendorPropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllVendorProperty: builder.query({
            query : () => ({
                url : '/vendors/properties/',
                method: 'GET',
            }),
            providesTags:['Properties']
        })
    }),
})

export const {useGetAllVendorPropertyQuery} = getAllVendorPropertyApi;',
                method: 'GET',
            }),
            providesTags:['Properties']
        })
    }),
})

export const {useGetAllVendorPropertyQuery} = getAllVendorPropertyApi;