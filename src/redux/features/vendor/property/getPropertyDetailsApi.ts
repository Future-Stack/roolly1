import { baseApi } from "@/redux/api/baseApi";

const getPropertyDetailsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getPropertyDetails: builder.query({
            query : (id) => ({
                url : `/vendors/property-details/${id}/`,
                method: 'GET',
            })
        }) ,
        getUserPropertyDetails: builder.query({
            query : (id) => ({
                url : `/properties/detail/${id}/`,
                method: 'GET',
            })
        })
        
    }),
})

export const {useGetPropertyDetailsQuery,useGetUserPropertyDetailsQuery} = getPropertyDetailsApi;