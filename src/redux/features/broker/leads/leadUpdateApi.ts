import { baseApi } from "@/redux/api/baseApi";

export interface LeadUpdateResponse {
    id: number;
    property: number;
    client_name: string;
    source: string;
    email_address: string;
    phone_number: string;
    lead_status: string;
    lead_traffic: string;
    budget_range: string;
    message: string;
}

export interface LeadUpdateRequest {
    id: number | string;
    property?: number;
    client_name?: string;
    source?: string;
    email_address?: string;
    phone_number?: string;
    lead_status?: 'enquired' | 'viewed' | 'terms_sent' | 'in_legals' | 'completed' | 'closed' | string;
    lead_traffic?: 'green' | 'amber' | 'red' | string;
    budget_range?: string;
    message?: string;
}

export const leadUpdateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateLead: builder.mutation<LeadUpdateResponse, LeadUpdateRequest>({
            query: ({ id, ...patch }) => ({
                url: `/brokers/leads/${id}/`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Leads', id },
                'Leads' // Also invalidate the list
            ],
        }),
    }),
});

export const { useUpdateLeadMutation } = leadUpdateApi;
