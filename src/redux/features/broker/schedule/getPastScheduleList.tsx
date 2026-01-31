import { baseApi } from "@/redux/api/baseApi";

const getPastScheduleListApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getPastScheduleList: builder.query({
            query : () => ({
                url : '/brokers/past-viewing-schedule-list/',
                method: 'GET',
            })
        })
    }),
})
export const {useGetPastScheduleListQuery} = getPastScheduleListApi;