import { baseApi } from "../../../api/baseApi";

const getAllBrokerPropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getAllBrokerProperty: builder.query({
            query : () => ({
                url : '/brokers/properties/',
                method: 'GET',
            }),
            providesTags:['Properties']
        })
    }),
})

export const {useGetAllBrokerPropertyQuery} = getAllBrokerPropertyApi;