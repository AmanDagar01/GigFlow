import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createGig, clearError } from "../store/slices/gigSlice";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.gigs);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!title.trim() || !description.trim() || !budget) {
      alert("Please fill in all fields");
      return;
    }

    if (parseFloat(budget) <= 0) {
      alert("Budget must be greater than 0");
      return;
    }

    const result = await dispatch(
      createGig({
        title: title.trim(),
        description: description.trim(),
        budget: parseFloat(budget),
      })
    );

    if (!result.payload?.error) {
      navigate("/gigs");
    }
  };

  const handleErrorClose = () => {
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Create a New Gig</h1>
          <p className="text-indigo-100">Post your project and get bids from freelancers</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
              <span className="text-red-700">{error}</span>
              <button
                onClick={handleErrorClose}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                Project Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Build a React Dashboard"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition"
                required
              />
              <p className="text-gray-600 text-sm mt-2">
                Create a clear, descriptive title for your project
              </p>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                Project Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project in detail. Include requirements, scope, and any specific skills needed..."
                rows="8"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition"
                required
              ></textarea>
              <p className="text-gray-600 text-sm mt-2">
                Be as detailed as possible to attract the right freelancers
              </p>
            </div>

            {/* Budget Field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">
                Project Budget (₹)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 text-lg">₹</span>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="0.00"
                  step="100"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg transition"
                  required
                />
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Set a competitive budget to attract qualified freelancers
              </p>
            </div>

            {/* Budget Info Card */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-indigo-900 font-semibold mb-2">💡 Pricing Tips:</p>
              <ul className="text-indigo-800 text-sm space-y-1">
                <li>• Be clear about scope and deliverables</li>
                <li>• Set a realistic budget for quality work</li>
                <li>• Higher budgets typically attract more experienced freelancers</li>
              </ul>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/gigs")}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Creating Gig..." : "Create Gig"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}