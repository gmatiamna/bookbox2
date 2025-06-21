// src/features/api/subscriptionApi.js
import { apiSlice } from './apiSlice';

export const subscriptionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => '/subscriptions',
      providesTags: ['Subscription'], // tag to invalidate after mutations
    }),
    getSubscriptionById: builder.query({
      query: (id) => `/subscriptions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Subscription', id }],
    }),
    createSubscription: builder.mutation({
      query: (newPlan) => ({
        url: '/subscriptions',
        method: 'POST',
        body: newPlan,
      }),
      invalidatesTags: ['Subscription'],
    }),
    updateSubscription: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/subscriptions/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Subscription', id }],
    }),
    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subscription'],
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
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useCheckActiveSubscriptionQuery,
  useAddPlanToUserMutation,
} = subscriptionApi;
