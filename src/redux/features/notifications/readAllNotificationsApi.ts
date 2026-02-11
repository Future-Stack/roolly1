import { baseApi } from "@/redux/api/baseApi";

const readAllNotificationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        readAllNotifications: builder.mutation({
            query: () => ({
                url: '/notifications/read-all/',
                method: 'PATCH',
            }),
            invalidatesTags: ['Notifications']
        })
    }),
})

export const { useReadAllNotificationsMutation } = readAllNotificationsApi;