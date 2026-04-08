// Update your getAdminLeadListApi
import { baseApi } from "@/redux/api/baseApi";

const getAdminLeadListApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getAdminLeadList: builder.query({
            query : (params?: {
                search?: string;
                lead_status?: string;
                property__property_type?: string;
                page?: number;
                page_size?: number;
            }) => ({
                url : '/admin/leads-list/',
                method: 'GET',
                params: params 
            }),
            providesTags: ['Leads']
        }),
        getAdminLeadDetail: builder.query({
            query : () => ({
                url : `/admin/leads-overview/`,
                method: 'GET',
            }),
            providesTags: ['Leads']
        })
    }),
})

export const {useGetAdminLeadListQuery, useGetAdminLeadDetailQuery} = getAdminLeadListApi;