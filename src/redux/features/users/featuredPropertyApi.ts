import { baseApi } from "../../api/baseApi";

const featuredPropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       featuredProperty: builder.query({
            query : () => ({
                url : '/properties/featured',
                method: 'GET',
            })
        })
    }),
})

export const {useFeaturedPropertyQuery} = featuredPropertyApi;