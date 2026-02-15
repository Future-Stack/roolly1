import { baseApi } from "@/redux/api/baseApi";

const getPropertyCribSheetApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       getPropertyCribSheet: builder.query({
            query : () => ({
                url : '/brokers/property-crib-sheet/',
                method: 'GET',
            })
        })
    }),
})

export const {useGetPropertyCribSheetQuery} = getPropertyCribSheetApi;