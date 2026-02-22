import { baseApi } from "@/redux/api/baseApi";

const getSingleScheduleApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getSingleSchedule: builder.query({
            query : (id) => ({
                url : `/brokers/viewing-schedule/${id}/`,
                method: 'GET',
            }),
            providesTags: ["Schedule"]
        })
    }),
})
export const {useGetSingleScheduleQuery} = getSingleScheduleApi;