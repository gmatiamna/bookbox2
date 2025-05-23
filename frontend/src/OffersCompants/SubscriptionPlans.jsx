import React from 'react';
import { useGetAllSubscriptionsQuery } from '../slices/subscriptionApi';
import { CheckCircle } from 'lucide-react';
import axios from 'axios';
const SubscriptionPlans = () => {
  const { data: plans, isLoading, error } = useGetAllSubscriptionsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching plans</p>;


const handleChoosePlan = async (plan) => {
  try {
    const response = await axios.post('/api/payments/subscribe', {
      planId: plan._id,
    });
    window.location.href = response.data.payment_url; // redirect to Flouci
  } catch (err) {
    console.error(err);
    alert('Error starting subscription payment');
  }
};

  return (
    <div className="flex gap-6 w-[80%] mx-auto mt-6">
      {plans.map((plan) => (
        <div key={plan._id} className="mb-4 p-[60px] bg-white rounded-[10px] grid gap-6 shadow-md">
          <h3 className="text-[#00BAC7] font-semibold text-xl">{plan.name}</h3>
          <p className="text-[#001533] text-[32px]">{plan.price}.000 DTN</p>

          <div className="grid gap-2">
            {plan.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#001533]">
                <CheckCircle size={20} className="text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <button
  onClick={() => handleChoosePlan(plan)}
  className="w-[253px] h-[52px] rounded-[6px] bg-[#00BAC7] text-[#F4F7FF] font-bold text-[24px] flex items-center justify-center"
>
  Choose Plan
</button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
