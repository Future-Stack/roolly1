/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "https://broker360re.com/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const state = api.getState() as RootState;
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          const refreshResult: any = await baseQuery(
            {
              url: "/accounts/token-refresh/",
              method: "POST",
              body: { refresh: refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const user = state.auth.user;
            api.dispatch(
              setUser({
                user: user,
                token: refreshResult.data.access,
                refreshToken: refreshResult.data.refresh,
              })
            );

            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
            window.location.href = "/login";
          }
        } else {
          api.dispatch(logout());
          window.location.href = "/login";
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Broker","Leads","Properties","Vendors_Profile","Vendor_Settings","Broker_Profile","Broker_Settings","Notifications","admin_profile"],
  endpoints: () => ({}),
});
