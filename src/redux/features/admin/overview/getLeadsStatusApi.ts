import { baseApi } from "@/redux/api/baseApi";

const getLeadsStatusApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getLeadsStatus: builder.query({
            query : () => ({
                url : '/admin/dashboard/leads-status/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetLeadsStatusQuery} = getLeadsStatusApi;