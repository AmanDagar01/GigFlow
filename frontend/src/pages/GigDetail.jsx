import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigById, clearError } from "../store/slices/gigSlice";
import { submitBid, clearError as clearBidError } from "../store/slices/bidSlice";

export default function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentGig, loading, error } = useSelector((state) => state.gigs);
  const { loading: bidLoading, error: bidError } = useSelector((state) => state.bids);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("Fetching gig with id:", id);
    dispatch(fetchGigById(id));
  }, [dispatch, id]);

  const handleSubmitBid = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (currentGig?.ownerId?._id === user?._id) {
      alert("You cannot bid on your own gig!");
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (!message.trim()) {
      alert("Please enter a message");
      return;
    }

    const result = await dispatch(
      submitBid({ gigId: id, message, price: parseFloat(price) })
    );

    if (!result.payload?.error) {
      setSubmitted(true);
      setPrice("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleErrorClose = () => {
    dispatch(clearError());
    dispatch(clearBidError());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !currentGig) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Gig not found</h2>
        <p className="text-gray-600 mb-6">{error || "This gig doesn't exist or has been removed."}</p>
        <button
          onClick={() => navigate("/gigs")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Gigs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/gigs")}
            className="mb-4 text-indigo-100 hover:text-white flex items-center gap-2 transition"
          >
            ← Back to Gigs
          </button>
          <h1 className="text-4xl font-bold">{currentGig.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Gig Details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About this gig</h2>
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                  {currentGig.description}
                </p>
              </div>

              {/* Gig Details */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Gig Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        currentGig.status === "open"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {currentGig.status === "open" ? "🟢 Open" : "🔒 Assigned"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Budget:</span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ₹{currentGig.budget?.toLocaleString()}
                    </span>
                  </div>
                  {currentGig.bidsCount !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bids Received:</span>
                      <span className="font-semibold text-gray-800">
                        {currentGig.bidsCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Gig Owner Info */}
              <div className="border-t pt-6 bg-indigo-50 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Posted by</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {currentGig.ownerId?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {currentGig.ownerId?.name || "Anonymous"}
                    </p>
                    <p className="text-gray-600 text-sm">{currentGig.ownerId?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bid Form Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Place Your Bid</h3>

              {error || bidError ? (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
                  <span className="text-red-700 text-sm">{error || bidError}</span>
                  <button
                    onClick={handleErrorClose}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ) : null}

              {submitted && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <span className="text-green-700 font-semibold">
                    ✓ Bid submitted successfully!
                  </span>
                </div>
              )}

              {currentGig.status === "assigned" ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 font-semibold">
                    This gig has already been assigned to another freelancer.
                  </p>
                </div>
              ) : !isAuthenticated ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 font-semibold mb-3">
                      Sign in to place a bid
                    </p>
                    <div className="space-y-2">
                      <a
                        href="/login"
                        className="block w-full text-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                      >
                        Sign In
                      </a>
                      <a
                        href="/register"
                        className="block w-full text-center px-4 py-2 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition"
                      >
                        Create Account
                      </a>
                    </div>
                  </div>
                </div>
              ) : currentGig.ownerId?._id === user?._id ? (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-gray-800 font-semibold">
                    ℹ️ You posted this gig, you cannot bid on it.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Bid Price (₹)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell the client why you're the best fit for this project..."
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={bidLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
                  >
                    {bidLoading ? "Submitting..." : "Submit Bid"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
