import { baseApi } from "@/redux/api/baseApi";

const readSingleNotificationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        readSingleNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/read/${id}/`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notifications']
        })
    }),
})

export const { useReadSingleNotificationMutation } = readSingleNotificationsApi;