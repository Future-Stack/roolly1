import { baseApi } from "@/redux/api/baseApi";

const vendorListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVendorList: builder.query({
            query: () => ({
                url: '/brokers/vendors/',
                method: 'GET',
            }),
            providesTags: ['Vendor']
        })
    }),
})

export const { useGetVendorListQuery } = vendorListApi;