import { baseApi } from "../../api/baseApi";

const forgotPassReqApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
       forgotPassReq: builder.mutation({
            query : (email) => ({
                url : '/accounts/password-forgot-request/',
                method: 'POST',
                body : { email },
            })
        })
    }),
})

export const {useForgotPassReqMutation} = forgotPassReqApi;