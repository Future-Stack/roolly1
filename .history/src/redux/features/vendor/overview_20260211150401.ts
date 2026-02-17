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

const overviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOverviewStats: builder.query<OverviewStatsResponse, void>({
            query: () => ({
                url: '/vendors/overview-stats',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),
        getLeadSa
        getPropertyStatusCounts: builder.query({
            query: () => ({
                url: '/vendors/property-status-count/',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),
        getLeadDistributionType: builder.query({
            query: () => ({
                url: '/vendors/lead-distribution-type/',
                method: 'GET',
            }),
            providesTags: ['Vendors_Profile']
        }),

    }),
})

export const {
    useGetOverviewStatsQuery,
    useGetPropertyStatusCountsQuery,
    useGetLeadDistributionTypeQuery
} = overviewApi;