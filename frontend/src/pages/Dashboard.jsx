import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs, clearError as clearGigError } from "../store/slices/gigSlice";
import { fetchBidsForGig, hireBidder, clearError as clearBidError } from "../store/slices/bidSlice";
import BidCard from "../components/BidCard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { gigs, loading: gigsLoading } = useSelector((state) => state.gigs);
  const { bids, loading: bidsLoading, error: bidError } = useSelector((state) => state.bids);
  const { user } = useSelector((state) => state.auth);
  const [selectedGigId, setSelectedGigId] = useState(null);
  const [hireLoading, setHireLoading] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch all gigs on mount
  useEffect(() => {
    dispatch(fetchGigs({}));
  }, [dispatch]);

  // Fetch bids when a gig is selected
  useEffect(() => {
    if (selectedGigId) {
      console.log("Fetching bids for gig:", selectedGigId);
      dispatch(fetchBidsForGig(selectedGigId));
    }
  }, [dispatch, selectedGigId]);

  // Filter gigs that belong to current user
  const myGigs = gigs.filter((gig) => gig.ownerId === user?._id || gig.ownerId?._id === user?._id);
  const selectedGig = myGigs.find((gig) => gig._id === selectedGigId);

  const handleHire = async (bidId) => {
    setHireLoading(bidId);
    try {
      const result = await dispatch(hireBidder(bidId));
      
      if (result.payload && !result.payload.message?.includes("error")) {
        setSuccessMessage("🎉 Freelancer hired successfully!");
        
        // Refresh bids for the selected gig
        if (selectedGigId) {
          setTimeout(() => {
            dispatch(fetchBidsForGig(selectedGigId));
            // Also refresh gigs to update status
            dispatch(fetchGigs({}));
          }, 500);
        }
        
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error hiring bidder:", error);
    }
    setHireLoading(null);
  };

  const handleErrorClose = () => {
    dispatch(clearGigError());
    dispatch(clearBidError());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-indigo-100">Manage your gigs and review bids from freelancers</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Error Messages */}
        {bidError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
            <span className="text-red-700">{bidError}</span>
            <button
              onClick={handleErrorClose}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-700 font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Loading State */}
        {gigsLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : myGigs.length === 0 ? (
          /* No Gigs State */
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No gigs posted yet</h3>
            <p className="text-gray-600 mb-6">
              Post a gig to start receiving bids from freelancers
            </p>
            <a
              href="/create-gig"
              className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              Create Your First Gig
            </a>
          </div>
        ) : (
          /* Gigs and Bids View */
          <div className="grid md:grid-cols-3 gap-8">
            {/* Gigs List */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
                  <h2 className="text-xl font-bold">My Gigs ({myGigs.length})</h2>
                </div>

                <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                  {myGigs.map((gig) => (
                    <button
                      key={gig._id}
                      onClick={() => setSelectedGigId(gig._id)}
                      className={`w-full text-left p-4 rounded-lg transition ${
                        selectedGigId === gig._id
                          ? "bg-indigo-100 border-2 border-indigo-600"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <h3 className="font-semibold text-gray-800 text-sm truncate">
                        {gig.title}
                      </h3>
                      <p className="text-gray-600 text-xs mt-1">
                        ₹{gig.budget?.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded mt-2 ${
                          gig.status === "open"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {gig.status === "open" ? "🟢 Open" : "🔒 Assigned"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bids for Selected Gig */}
            <div className="md:col-span-2">
              {selectedGig ? (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                    <h2 className="text-2xl font-bold mb-2">{selectedGig.title}</h2>
                    <div className="space-y-1 text-indigo-100">
                      <p>Budget: <span className="font-semibold">₹{selectedGig.budget?.toLocaleString()}</span></p>
                      <p>Status: <span className="font-semibold">{selectedGig.status === "open" ? "🟢 Open" : "🔒 Assigned"}</span></p>
                    </div>
                  </div>

                  <div className="p-6">
                    {bidsLoading ? (
                      <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                      </div>
                    ) : bids.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-4xl mb-3">🤷</div>
                        <p className="text-gray-600">No bids yet. Share your gig to attract freelancers!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-gray-800">
                            Bids Received ({bids.length})
                          </h3>
                        </div>

                        {/* Pending Bids */}
                        {selectedGig.status === "open" && bids.some((b) => b.status === "pending") && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                              Pending Bids ({bids.filter((b) => b.status === "pending").length})
                            </h4>
                            <div className="space-y-3">
                              {bids
                                .filter((bid) => bid.status === "pending")
                                .map((bid) => (
                                  <BidCard
                                    key={bid._id}
                                    bid={bid}
                                    onHire={handleHire}
                                    isLoading={hireLoading === bid._id}
                                  />
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Hired Bid */}
                        {bids.some((bid) => bid.status === "hired") && (
                          <div className={selectedGig.status === "open" ? "border-t pt-4 mt-4" : ""}>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              Hired Freelancer
                            </h4>
                            <div className="space-y-3">
                              {bids
                                .filter((bid) => bid.status === "hired")
                                .map((bid) => (
                                  <div
                                    key={bid._id}
                                    className="bg-green-50 border-2 border-green-200 rounded-lg p-4"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-semibold text-gray-800 text-lg">
                                          ₹{bid.price?.toLocaleString()}
                                        </p>
                                        <p className="text-gray-700 text-sm mt-2">
                                          {bid.message}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-3 font-medium">
                                          👤 {bid.freelancerId?.name || "Freelancer"}
                                        </p>
                                        {bid.freelancerId?.email && (
                                          <p className="text-xs text-gray-600">
                                            📧 {bid.freelancerId.email}
                                          </p>
                                        )}
                                      </div>
                                      <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-semibold whitespace-nowrap">
                                        ✓ Hired
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* Rejected Bids */}
                        {bids.some((bid) => bid.status === "rejected") && (
                          <div className="border-t pt-4 mt-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              Rejected Bids ({bids.filter((b) => b.status === "rejected").length})
                            </h4>
                            <div className="space-y-3">
                              {bids
                                .filter((bid) => bid.status === "rejected")
                                .map((bid) => (
                                  <div
                                    key={bid._id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 opacity-75"
                                  >
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-semibold text-gray-600 text-lg">
                                          ₹{bid.price?.toLocaleString()}
                                        </p>
                                        <p className="text-gray-600 text-sm mt-2">
                                          {bid.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-3 font-medium">
                                          👤 {bid.freelancerId?.name || "Freelancer"}
                                        </p>
                                      </div>
                                      <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold whitespace-nowrap">
                                        Rejected
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="text-6xl mb-4">👈</div>
                  <p className="text-gray-600 text-lg">
                    Select a gig from the list to view and manage bids
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
