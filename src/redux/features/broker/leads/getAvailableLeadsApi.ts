/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const getAvailableLeadsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAvailableLeads: builder.query({
            query: (params?: { page?: number; page_size?: number; search?: string }) => {
                console.log('📡 API Query Params:', params);
                
                // Build params object
                const queryParams: any = {
                    page: params?.page || 1,
                    page_size: params?.page_size || 5
                };
                
                // Add search parameter if provided
                if (params?.search && params.search.trim() !== '') {
                    queryParams.search = params.search.trim();
                    console.log('🔍 Search parameter added:', params.search.trim());
                }
                
                console.log('✅ Final query params:', queryParams);
                
                return {
                    url: `/brokers/available-leads/`,
                    method: 'GET',
                    params: queryParams
                };
            },
            providesTags: ['Leads'],
        })
    }),
});

export const { useGetAvailableLeadsQuery } = getAvailableLeadsApi;