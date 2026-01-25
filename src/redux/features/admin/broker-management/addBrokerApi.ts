import { baseApi } from "@/redux/api/baseApi";

const addBrokerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        addBroker : builder.mutation({
            query : (payload) => ({
                url : '/admin/add-broker/',
                method: 'POST',
                body : payload,
            }),
            invalidatesTags:['Broker']
        })
    }),
})

export const {useAddBrokerMutation} = addBrokerApi;