import { baseApi } from "../../api/baseApi";

const overviewApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getOverviewStats: builder.query({
            query : () => ({
                url : '/vendors/overview-stats',
                method: 'GET',
            }),
                providesTags:['Vendors_Profile']
        })
    }),
})

export const {
    useGetOverviewStatsQuery
} = overviewApi;