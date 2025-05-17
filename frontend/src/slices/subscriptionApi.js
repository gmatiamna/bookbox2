// src/features/api/subscriptionApi.js
import { apiSlice } from './apiSlice';

export const subscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => '/subscriptions',
    }),
    getSubscriptionById: builder.query({
      query: (id) => `/subscriptions/${id}`,
    }),
    createSubscription: builder.mutation({
      query: (newPlan) => ({
        url: '/subscriptions',
        method: 'POST',
        body: newPlan,
      }),
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
} = subscriptionApi;
