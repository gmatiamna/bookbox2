import React, { useState } from "react";
import { useCreateSubscriptionMutation } from "../slices/subscriptionApi";

const PlanForm = () => {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const [form, setForm] = useState({
    name: "",
    price: "",
    durationMonths: "",
    description: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!form.name || !form.price || !form.durationMonths) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await createSubscription({
        name: form.name,
        price: Number(form.price),
        durationMonths: Number(form.durationMonths),
        description: form.description,
      }).unwrap();

      setSuccess("Subscription plan created successfully!");
      setForm({ name: "", price: "", durationMonths: "", description: "" });
    } catch (err) {
      setError(err?.data?.message || "Failed to create subscription plan.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Subscription Plan</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Plan Name"
          className="w-full border rounded p-2"
          required
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (e.g., 30)"
          className="w-full border rounded p-2"
          required
          min={0}
          step="0.01"
        />

        <input
          name="durationMonths"
          type="number"
          value={form.durationMonths}
          onChange={handleChange}
          placeholder="Duration (months)"
          className="w-full border rounded p-2"
          required
          min={1}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="w-full border rounded p-2"
        />

        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Plan"}
        </button>
      </form>
    </div>
  );
};

export default PlanForm;
