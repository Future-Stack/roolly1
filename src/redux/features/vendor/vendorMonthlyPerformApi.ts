import { baseApi } from "../../api/baseApi";

const getVendorMonthlyPerformApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getVendorMonthlyPerform: builder.query({
            query : () => ({
                url : '/vendors/leads-monthly-performance/',
                method: 'GET',
            }),
        })
    }),
})

export const {useGetVendorMonthlyPerformQuery} = getVendorMonthlyPerformApi;