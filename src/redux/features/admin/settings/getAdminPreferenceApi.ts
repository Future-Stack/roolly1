import { baseApi } from "@/redux/api/baseApi";

const geAdminPreferenceApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAdminPreference: builder.query({
            query : () => ({
                url : '/admin/settings',
                method: 'GET',
            })
        })
    }),
})

export const {useGetAdminPreferenceQuery} = geAdminPreferenceApi;