import { baseApi } from "@/redux/api/baseApi";

const activeBrokerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        activeBroker : builder.mutation({
            query : (payload) => ({
                url : `/admin/active-broker/${payload.id}/`,
                method: 'PUT',
                body : payload.data,
            })
        })
    }),
})

export const {useActiveBrokerMutation} = activeBrokerApi;