import { baseApi } from "@/redux/api/baseApi";

const getPerformanceApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getPerformance: builder.query({
            query : () => ({
                url : '/admin/dashboard/property-performance/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetPerformanceQuery} = getPerformanceApi;