import { baseApi } from "@/redux/api/baseApi";

const getPropertyDetailsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getPropertyDetails: builder.query({
            query : (id) => ({
                url : `/brokers/property-details/${id}/`,
                method: 'GET',
            })
        })
    }),
})

export const {useGetPropertyDetailsQuery} = getPropertyDetailsApi;