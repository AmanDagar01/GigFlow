import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs, clearError } from "../store/slices/gigSlice";
import GigCard from "../components/GigCard";

export default function Gigs() {
  const dispatch = useDispatch();
  const { gigs, loading, error } = useSelector((state) => state.gigs);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [filteredGigs, setFilteredGigs] = useState([]);

  useEffect(() => {
    // Always fetch gigs when component mounts or search changes
    dispatch(fetchGigs({ search }));
  }, [dispatch, search]);

  useEffect(() => {
    // Filter gigs based on search
    if (gigs && gigs.length > 0) {
      setFilteredGigs(
        gigs.filter(
          (gig) =>
            gig.title.toLowerCase().includes(search.toLowerCase()) ||
            gig.description.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredGigs([]);
    }
  }, [gigs, search]);

  const handleErrorClose = () => {
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Browse Gigs</h1>
          <p className="text-lg text-indigo-100">
            Find the perfect project or post your own
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
            <span className="text-red-700">{error}</span>
            <button
              onClick={handleErrorClose}
              className="text-red-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gigs by title or description..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            {isAuthenticated && (
              <a
                href="/create-gig"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:opacity-90 transition whitespace-nowrap text-center"
              >
                Post a Gig
              </a>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredGigs.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No gigs found</h3>
            <p className="text-gray-600 mb-6">
              {search
                ? "Try adjusting your search terms"
                : "No gigs available at the moment"}
            </p>
            {isAuthenticated && !search && (
              <a
                href="/create-gig"
                className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                Be the first to post a gig
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {filteredGigs.length} gig{filteredGigs.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map((gig) => (
                <GigCard key={gig._id} gig={gig} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
