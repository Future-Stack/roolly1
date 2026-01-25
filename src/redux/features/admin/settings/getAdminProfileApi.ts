import { baseApi } from "@/redux/api/baseApi";

const geAdminProfileApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAdminProfile: builder.query({
            query : () => ({
                url : '/admin/profile',
                method: 'GET',
            })
        })
    }),
})

export const {useGetAdminProfileQuery} = geAdminProfileApi;