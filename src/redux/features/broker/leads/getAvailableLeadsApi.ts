import { baseApi } from "@/redux/api/baseApi";

const getAvailableLeadsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAvailableLeads: builder.query({
            query : () => ({
                url : '/brokers/available-leads/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetAvailableLeadsQuery} = getAvailableLeadsApi;