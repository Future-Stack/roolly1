import { baseApi } from "@/redux/api/baseApi";

const deletePropertyImageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deletePropertyImage: builder.mutation<void, number>({
            query: (imageId) => ({
                url: `/brokers/delete-property-image/${imageId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Properties']
        })
    }),
});

export const { useDeletePropertyImageMutation } = deletePropertyImageApi;
