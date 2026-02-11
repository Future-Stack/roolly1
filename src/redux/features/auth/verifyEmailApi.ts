import { baseApi } from "../../api/baseApi";

const verifyeEmailApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        verifyEmail : builder.mutation({
            query : (userInfo) => ({
                url : '/accounts/verify-email/',
                method: 'POST',
                body : userInfo,
            })
        })
    }),
})

export const {useVerifyEmailMutation} = verifyeEmailApi;