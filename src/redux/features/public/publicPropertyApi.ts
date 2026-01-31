import { baseApi } from "@/redux/api/baseApi";

const publicPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPublicProperties: builder.query({
            query: (params: {
                property_type?: string;
                transaction?: string;
                built_area__gte?: number;
                built_area__lte?: number;
                search?: string;
                ordering?: string;
                page?: number;
                page_size?: number;
            }) => ({
                url: '/properties/list/',
                method: 'GET',
                params: params,
            }),
        }),
    }),
});

export const { useGetPublicPropertiesQuery } = publicPropertyApi;
