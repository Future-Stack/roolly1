import { baseApi } from "@/redux/api/baseApi";

const brokerChangePasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        brokerChangePassword: builder.mutation({
            query: (payload) => ({
                url: '/brokers/change-password/',
                method: 'PUT',
                body: payload  
            }),
        })
    }),
});

export const { useBrokerChangePasswordMutation } = brokerChangePasswordApi;
