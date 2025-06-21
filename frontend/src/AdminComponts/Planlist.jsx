import React from 'react';
import {
  useGetAllSubscriptionsQuery,
  useDeleteSubscriptionMutation,
} from '../slices/subscriptionApi';
import { useNavigate } from 'react-router-dom';

const PlanList = () => {
  const { data: plans = [], isLoading, isError } = useGetAllSubscriptionsQuery();
  const [deleteSubscription, { isLoading: isDeleting }] = useDeleteSubscriptionMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        await deleteSubscription(id).unwrap();
        alert("Plan deleted successfully");
      } catch (err) {
        alert("Failed to delete plan");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/plans/edit/${id}`); // Assuming you have a route for editing
  };

  if (isLoading) return <p>Loading plans...</p>;
  if (isError) return <p>Error loading plans.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
      {plans.length === 0 ? (
        <p>No subscription plans found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Duration (months)</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan._id || plan.id}>
                <td className="border border-gray-300 px-4 py-2">{plan.name}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.price}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.durationMonths}</td>
                <td className="border border-gray-300 px-4 py-2">{plan.description}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(plan._id || plan.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan._id || plan.id)}
                    disabled={isDeleting}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlanList;
