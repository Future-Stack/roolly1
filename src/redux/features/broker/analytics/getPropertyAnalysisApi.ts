import { baseApi } from "@/redux/api/baseApi";

export interface PropertyAnalysis {
    property_name: string;
    location: string;
    leads_count: number;
}

const getPropertyAnalysisApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrokerPropertyAnalysis: builder.query<PropertyAnalysis[], void>({
            query: () => ({
                url: '/brokers/analytics/property-analysis/',
                method: 'GET',
            })
        })
    }),
})

export const { useGetBrokerPropertyAnalysisQuery } = getPropertyAnalysisApi;
