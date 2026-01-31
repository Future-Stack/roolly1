import { baseApi } from "../../api/baseApi";

const getVendorLeadsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getVendorLeads: builder.query({
            query : () => ({
                url : '/vendors/my-property-leads-list/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetVendorLeadsQuery} = getVendorLeadsApi;