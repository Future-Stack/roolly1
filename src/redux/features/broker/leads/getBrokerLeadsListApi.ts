/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const getBrokerLeadsListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrokerLeadsList: builder.query({
            query: (params?: { 
                page?: number; 
                page_size?: number; 
                search?: string;
                ordering?: string;
                lead_status?: string;
                lead_traffic?: string;
            }) => {
                
                const queryParams: any = {
                    page: params?.page || 1,
                    page_size: params?.page_size || 5
                };
                
                if (params?.search && params.search.trim() !== '') {
                    queryParams.search = params.search.trim();
                }
                
                if (params?.ordering && params.ordering.trim() !== '') {
                    queryParams.ordering = params.ordering.trim();
                }

                if (params?.lead_status && params.lead_status.trim() !== '') {
                    queryParams.lead_status = params.lead_status.trim();
                }

                if (params?.lead_traffic && params.lead_traffic.trim() !== '') {
                    queryParams.lead_traffic = params.lead_traffic.trim();
                }
                
                
                return {
                    url: `/brokers/my-leads-list/`,
                    method: 'GET',
                    params: queryParams
                };
            },
            transformResponse: (response: any) => {
                return response;
            },
            transformErrorResponse: (error: any) => {
                return error;
            }
        })
    }),
});

export const { useGetBrokerLeadsListQuery } = getBrokerLeadsListApi;