import { baseApi } from "@/redux/api/baseApi";

const getOverviewApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getOverview: builder.query({
            query : () => ({
                url : '/admin/dashboard/overview/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetOverviewQuery} = getOverviewApi;