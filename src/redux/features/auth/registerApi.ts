import { baseApi } from "../../api/baseApi";

const registerApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        register : builder.mutation({
            query : (userInfo) => ({
                url : '/accounts/signup/',
                method: 'POST',
                body : userInfo,
            })
        })
    }),
})

export const {useRegisterMutation} = registerApi;