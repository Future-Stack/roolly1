import { baseApi } from "../../api/baseApi";

const getSinglePropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getSingleProperty: builder.query({
            query : (id) => ({
                url : `/vendors/properties/${id}/`,
                method: 'GET',
            }),
            providesTags: ['Properties'],
        })
    }),
})

export const {useGetSinglePropertyQuery} = getSinglePropertyApi;