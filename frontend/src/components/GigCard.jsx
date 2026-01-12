import { Link } from "react-router-dom";

export default function GigCard({ gig }) {
  return (
    <Link to={`/gigs/${gig._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
        {/* Header with Status */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg group-hover:text-indigo-100 transition truncate">
              {gig.title}
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
              gig.status === "open"
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {gig.status === "open" ? "Open" : "Assigned"}
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
            {gig.description}
          </p>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Budget:</span>
              <span className="font-bold text-xl text-indigo-600">
                ₹{gig.budget?.toLocaleString()}
              </span>
            </div>

            {gig.bidsCount !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Bids:</span>
                <span className="font-semibold text-gray-800">
                  {gig.bidsCount} {gig.bidsCount === 1 ? "bid" : "bids"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-4 py-3 bg-gray-50 border-t group-hover:bg-indigo-50 transition">
          <span className="text-indigo-600 font-semibold text-sm group-hover:text-indigo-700">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
