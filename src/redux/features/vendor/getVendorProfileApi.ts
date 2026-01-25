import { baseApi } from "../../api/baseApi";

const getVendorProfileApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getVendorProfile: builder.query({
            query : () => ({
                url : '/vendors/profile/',
                method: 'GET',
            }),
            providesTags:['Vendors_Profile']
        })
    }),
})

export const {useGetVendorProfileQuery} = getVendorProfileApi;