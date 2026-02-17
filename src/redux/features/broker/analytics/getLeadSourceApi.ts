import { baseApi } from "@/redux/api/baseApi";

export interface LeadSource {
    source: string;
    percentage: number;
}

const getLeadSourceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrokerLeadSource: builder.query<LeadSource[], void>({
            query: () => ({
                url: '/brokers/analytics/lead-source/',
                method: 'GET',
            })
        })
    }),
})

export const { useGetBrokerLeadSourceQuery } = getLeadSourceApi;
