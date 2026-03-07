import { baseApi } from "../../api/baseApi";

export interface VendorLead {
    id: number;
    client_name: string;
    property_name: string;
    property_type: string;
    sqft_range: string;
    location: string;
    lead_traffic: 'green' | 'amber' | 'red';
    lead_status: string;
    comment:string;
    created_at: string;
    broker_phone_number: string;
    broker_email_address: string;
}

export interface VendorLeadsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: VendorLead[];
}

const getVendorLeadsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVendorLeads: builder.query<VendorLeadsResponse, { page?: number }>({
            query: ({ page = 1 }) => ({
                url: `/vendors/my-property-leads-list/?page=${page}`,
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        })
    }),
})

export const { useGetVendorLeadsQuery } = getVendorLeadsApi;