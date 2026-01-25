import { baseApi } from "../../api/baseApi";

const resendOtpApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       resendOtp: builder.mutation({
            query : (email) => ({
                url : '/accounts/resend-otp/',
                method: 'POST',
                body : { email },
            })
        })
    }),
})

export const {useResendOtpMutation} = resendOtpApi;