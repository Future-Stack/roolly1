import { baseApi } from "@/redux/api/baseApi";

const makeCompleteScheduleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        makeCompleteSchedule: builder.mutation({
            query: (scheduleId: number) => ({
                url: `/brokers/viewing-schedule/${scheduleId}/complete/`,
                method: 'PUT',
            }),
            invalidatesTags: ["Schedule"]
        })
    }),
})
export const {useMakeCompleteScheduleMutation} = makeCompleteScheduleApi;