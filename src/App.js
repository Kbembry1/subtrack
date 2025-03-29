import React, { useState } from "react";

export default function App() {
  const [subscriptions, setSubscriptions] = useState([
    { name: "Netflix", amount: 15.99, date: "2025-04-01" },
    { name: "Spotify", amount: 9.99, date: "2025-03-25" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.date) return;

    const newSub = {
      name: formData.name,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    setSubscriptions([...subscriptions, newSub]);
    setFormData({ name: "", amount: "", date: "" });
  };

  const handleCancel = (indexToRemove) => {
    const updated = subscriptions.filter((_, index) => index !== indexToRemove);
    setSubscriptions(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          SubTrack
        </h1>

        <p className="text-center text-lg text-gray-700 mb-6">
          Total: ${subscriptions.reduce((acc, sub) => acc + sub.amount, 0).toFixed(2)} / month
        </p>

        {/* Add Subscription Form */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow mb-8 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Subscription Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount (e.g. 12.99)"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Subscription
          </button>
        </form>

        {/* Subscriptions List */}
        <div className="space-y-4">
          {subscriptions.map((sub, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  {sub.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Next payment: {sub.date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  ${sub.amount.toFixed(2)}
                </p>
                <button
                  onClick={() => handleCancel(idx)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import React from "react";

export default function SubscribeButton() {
  const handleSubscribe = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleSubscribe}
      className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
    >
      Subscribe to SubTrack Pro
    </button>
  );
}
code api/checkout.js

