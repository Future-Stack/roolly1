import { baseApi } from "../../api/baseApi";

const getAllVendorPropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllLead: builder.query({
            query : () => ({
                url : '/vendors/my-property-leads-list/',
                method: 'GET',
            }),
            providesTags:['Leads']
        })
    }),
})

export const {
    useGetAllVendorPropertyQuery
} = getAllVendorPropertyApi;