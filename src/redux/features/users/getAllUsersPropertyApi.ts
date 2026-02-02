/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const getAllUsersPropertyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsersProperty: builder.query({
            query: (params?: {
                search?: string;
                property_type?: string;
                transaction?:any;
                page?: number;
                page_size?: number;
                ordering?: string;
            }) => ({
                url: '/properties/list/',
                method: 'GET',
                params: params
            })
        })
    }),
});

export const { useGetAllUsersPropertyQuery } = getAllUsersPropertyApi;