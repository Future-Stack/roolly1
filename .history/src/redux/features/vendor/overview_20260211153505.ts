import { baseApi } from "../../api/baseApi";

export interface PropertyStats {
    total_properties: number;
    available_properties: number;
}

export interface LeadStats {
    total_leads: number;
    qualified_leads: number;
}

export interface ConversionRates {
    all_time: string;
    this_month: string;
}

export interface OverviewStatsResponse {
    property_stats: PropertyStats;
    lead_stats: LeadStats;
    conversion_rates: ConversionRates;
}

export interface PropertyStatusCountsResponse {
    available: number;
    occupied: number;
}

export interface LeadDistributionResponse {
    lease: number;
    sale: number;
}

export interface RecentLead {
    property__property_type: string;
    client_name: string;
    property__property_name: string;
    lead_traffic: 'green' | 'amber' | 'red';
}

export type RecentLeadsResponse = RecentLead[];

export interface LeadStatusCountsResponse {
    green: number;
    amber: number;
    red: number;
}

const overviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOverviewStats: builder.query<OverviewStatsResponse, void>({
            query: () => ({
                url: '/vendors/overview-stats',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),
        getLeadStatusCounts: builder.query<LeadStatusCountsResponse, void>({
            query: () => ({
                url: '/vendors/lead-status-count',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),
        getPropertyStatusCounts: builder.query<PropertyStatusCountsResponse, void>({
            query: () => ({
                url: '/vendors/property-status-count/',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),
        getLeadDistributionType: builder.query<LeadDistributionResponse, void>({
            query: () => ({
                url: '/vendors/lead-distribution-type/',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),
        getRecentLeads: builder.query<RecentLeadsResponse, void>({
            query: () => ({
                url: '/vendors/recent-leads/',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),
        grt

    }),
})

export const {
    useGetOverviewStatsQuery,
    useGetLeadStatusCountsQuery,
    useGetPropertyStatusCountsQuery,
    useGetLeadDistributionTypeQuery,
    useGetRecentLeadsQuery,

} = overviewApi;