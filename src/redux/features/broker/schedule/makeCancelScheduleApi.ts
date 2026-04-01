import { baseApi } from "@/redux/api/baseApi";

const makeCancelScheduleApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       makeCancelSchedule: builder.mutation({
            query : (scheduleId: number) => ({
                url : `/brokers/viewing-schedule/${scheduleId}/cancel/`,
                method: 'PUT',
            }),
            invalidatesTags: ["Schedule"]
        })
    }),
})
export const {useMakeCancelScheduleMutation} = makeCancelScheduleApi;