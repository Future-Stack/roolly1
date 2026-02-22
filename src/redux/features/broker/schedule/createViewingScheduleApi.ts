import { baseApi } from "@/redux/api/baseApi";

interface ViewingScheduleRequest {
  lead_id: number;
  viewing_date: string;
  viewing_time: string;
  notes: string;
}

interface ViewingScheduleResponse {
  id: number;
  viewing_date: string;
  viewing_time: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

const createViewingScheduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createViewingSchedule: builder.mutation<ViewingScheduleResponse, ViewingScheduleRequest>({
      query: (data) => ({
        url: "/brokers/viewing-schedule/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Leads", "Schedule"],
    }),
  }),
});

export const { useCreateViewingScheduleMutation } = createViewingScheduleApi;
