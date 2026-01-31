import { baseApi } from "../../api/baseApi";

const getUserSinglePropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getUserSingleProperty: builder.query({
            query : (id) => ({
                url : `/properties/detail/${id}`,
                method: 'GET',
            })
        })
    }),
})

export const {useGetUserSinglePropertyQuery} = getUserSinglePropertyApi;