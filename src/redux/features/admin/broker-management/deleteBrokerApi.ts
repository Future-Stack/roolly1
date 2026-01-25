import { baseApi } from "@/redux/api/baseApi";

const deleteBrokerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        deleteBroker : builder.mutation({
            query : (id) => ({
                url : `/admin/delete-broker/${id}/`,
                method: 'DELETE'
            }),
            invalidatesTags:['Broker']
        })
    }),
})

export const {useDeleteBrokerMutation} = deleteBrokerApi;