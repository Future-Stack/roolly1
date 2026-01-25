import { baseApi } from "@/redux/api/baseApi";

const deactiveBrokerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        deactiveBroker : builder.mutation({
            query : (payload) => ({
                url : `/admin/deactive-broker/${payload.id}/`,
                method: 'PUT',
                body : payload.data,
            })
        })
    }),
})

export const {useDeactiveBrokerMutation} = deactiveBrokerApi;