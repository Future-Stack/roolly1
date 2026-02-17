import { baseApi } from "../../api/baseApi";

interface TokenRefreshProps {
    refresh: string;
}

interface TokenRefreshResponse {
    access: string;
    refresh: string;
}

const tokenRefreshApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        tokenRefresh: builder.mutation<TokenRefreshResponse, TokenRefreshProps>({
            query: (data) => ({
                url: '/accounts/token-refresh/',
                method: 'POST',
                body: data
            })
        })
    })
})

export const { useTokenRefreshMutation } = tokenRefreshApi;
