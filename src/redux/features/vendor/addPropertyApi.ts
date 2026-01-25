import { baseApi } from "../../api/baseApi";

const addPropertyApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       addProperty: builder.mutation({
            query : (formData) => ({
                url : '/vendors/properties/',
                method: 'POST',
                body : formData,
            }),
            invalidatesTags: ['Properties'] 
        })
    }),
})

export const {useAddPropertyMutation} = addPropertyApi;