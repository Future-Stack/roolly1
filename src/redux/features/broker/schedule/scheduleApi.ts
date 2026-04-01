import { baseApi } from "@/redux/api/baseApi";

const scheduleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getScheduleList: builder.query({
            query: () => ({
                url: '/brokers/viewing-schedule-list/',
                method: 'GET',
            }),
            providesTags: ["Schedule"]
        }),
        makeCompleteSchedule: builder.mutation({
            query: (scheduleId: number) => ({
                url: `/brokers/viewing-schedule/${scheduleId}/complete/`,
                method: 'PUT',
            }),
            invalidatesTags: ["Schedule"]
        }),
        makeCancelSchedule: builder.mutation({
            query: (scheduleId: number) => ({
                url: `/brokers/viewing-schedule/${scheduleId}/cancel/`,
                method: 'PUT',
            }),
            invalidatesTags: ["Schedule"]
        })
    }),
})

export const { 
    useGetScheduleListQuery, 
    useMakeCompleteScheduleMutation, 
    useMakeCancelScheduleMutation 
} = scheduleApi;
