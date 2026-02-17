import { baseApi } from "@/redux/api/baseApi";

export interface PropertyTypePerformance {
    property_type: string;
    total_views: number;
    total_enquiries: number;
}

const getPropertyTypePerformanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrokerPropertyTypePerformance: builder.query<PropertyTypePerformance[], void>({
            query: () => ({
                url: '/brokers/analytics/property-type-performance/',
                method: 'GET',
            })
        })
    }),
})

export const { useGetBrokerPropertyTypePerformanceQuery } = getPropertyTypePerformanceApi;