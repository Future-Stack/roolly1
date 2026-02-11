import { baseApi } from "@/redux/api/baseApi";

const getSingleScheduleApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getSingleSchedule: builder.query({
            query : (id) => ({
                url : `/brokers/viewing-schedule/${id}/`,
                method: 'GET',
            })
        })
    }),
})
export const {useGetSingleScheduleQuery} = getSingleScheduleApi;