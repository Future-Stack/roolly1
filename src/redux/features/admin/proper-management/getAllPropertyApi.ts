import { baseApi } from "@/redux/api/baseApi";

const getAllPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProperty: builder.query({
            query: (params?: { 
                page?: number; 
                page_size?: number;
                property_type?: string; 
                broker__full_name?: string; 
                search?: string 
            }) => ({
                url: '/admin/property-list/',
                method: 'GET',
                params: params
            })
        })
    }),
});

export const { useGetAllPropertyQuery } = getAllPropertyApi;