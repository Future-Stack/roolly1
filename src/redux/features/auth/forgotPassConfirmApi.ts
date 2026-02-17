import { baseApi } from "../../api/baseApi";

const forgotPassConfirmApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        forgotPassConfirm: builder.mutation({
            query: (data) => ({
                url: '/accounts/password-forgot-confirm/',
                method: 'POST',
                body: data,
            })
        })
    }),
});

export const { useForgotPassConfirmMutation } = forgotPassConfirmApi;
