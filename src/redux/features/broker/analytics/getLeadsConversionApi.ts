import { baseApi } from "@/redux/api/baseApi";

export interface LeadsConversion {
    month: number;
    leads: number;
}

const getLeadsConversionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrokerLeadsConversion: builder.query<LeadsConversion[], void>({
            query: () => ({
                url: '/brokers/analytics/leads-conversion/',
                method: 'GET',
            })
        })
    }),
})

export const { useGetBrokerLeadsConversionQuery } = getLeadsConversionApi;
