import { baseApi } from "@/redux/api/baseApi";

const editPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        editProperty: builder.mutation({
            query: (data) => ({
                url: `/brokers/property-update/${data.id}/`,
                method: 'PATCH',
                body: data.data,
            }),
        })
    }),
})

export const { useEditPropertyMutation } = editPropertyApi;