import { baseApi } from "@/redux/api/baseApi";

const getScheduleListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getScheduleList: builder.query({
            query: () => ({
                url: '/brokers/viewing-schedule-list/',
                method: 'GET',
            }),
            providesTags: ["Schedule"]
        })
    }),
})
export const { useGetScheduleListQuery } = getScheduleListApi;