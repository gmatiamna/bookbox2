import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddPlanToUserMutation } from '../slices/subscriptionApi';

function SuccessSubscription() {
  const navigate = useNavigate();
  const [addPlanToUser] = useAddPlanToUserMutation();

  useEffect(() => {
    const selectedPlanId = localStorage.getItem('selectedPlanId');
    const userId = localStorage.getItem('userId'); // Authenticated user's ID

    if (selectedPlanId && userId) {
      addPlanToUser({ userId, planId: selectedPlanId })
        .unwrap()
        .then(() => {
          alert('✅ Subscription plan assigned!');
          localStorage.removeItem('selectedPlanId');
          navigate('/library');
        })
        .catch((err) => {
          console.error('❌ Subscription assignment error:', err);
          alert('❌ Could not complete subscription. Please contact support.');
        });
    } else {
      alert('❌ Missing user or plan information.');
      navigate('/');
    }
  }, [addPlanToUser, navigate]);

  return (
    <div className="text-center text-xl mt-10 text-green-600">
      Processing your subscription...
    </div>
  );
}

export default SuccessSubscription;
