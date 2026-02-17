import { baseApi } from "../../api/baseApi";

const resendOtpApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       resendOtp: builder.mutation({
            query : (data) => ({
                url : '/accounts/resend-otp/',
                method: 'POST',
                body : data,
            })
        })
    }),
})

export const {useResendOtpMutation} = resendOtpApi;