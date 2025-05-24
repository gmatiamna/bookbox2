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
    checkActiveSubscription: builder.query({
      query: () => '/subscriptions/active',
    }),
    addPlanToUser: builder.mutation({
      query: ({ userId, planId }) => ({
        url: '/subscriptions/add-plan',
        method: 'POST',
        body: { userId, planId },
      }),
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useGetSubscriptionByIdQuery,
  useCreateSubscriptionMutation,
  useCheckActiveSubscriptionQuery,  // This will now work correctly
  useAddPlanToUserMutation,
} = subscriptionApi;
