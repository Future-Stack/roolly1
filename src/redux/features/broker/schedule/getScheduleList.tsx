import { baseApi } from "@/redux/api/baseApi";

const getScheduleListApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getScheduleList: builder.query({
            query : () => ({
                url : '/brokers/viewing-schedule-list/',
                method: 'GET',
            })
        })
    }),
})
export const {useGetScheduleListQuery} = getScheduleListApi;