export default function BidCard({ bid, onHire, isLoading }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition">
      <div className="flex justify-between items-start gap-4">
        {/* Bid Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-3">
            <p className="text-3xl font-bold text-indigo-600">
              ₹{bid.price?.toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm">for this project</p>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-4 break-words">
            {bid.message}
          </p>

          <div className="flex flex-col gap-2 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              👤 <span className="font-medium">{bid.freelancerId?.name || "Freelancer"}</span>
            </span>
            {bid.freelancerId?.email && (
              <span className="flex items-center gap-1 break-all">
                ✉️ <span>{bid.freelancerId.email}</span>
              </span>
            )}
          </div>
        </div>

        {/* Status Badge and Actions */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <span
            className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap ${
              bid.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : bid.status === "hired"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {bid.status === "pending"
              ? "⏳ Pending"
              : bid.status === "hired"
              ? "✓ Hired"
              : "✕ Rejected"}
          </span>

          {bid.status === "pending" && onHire && (
            <button
              onClick={() => onHire(bid._id)}
              disabled={isLoading}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition disabled:opacity-50 whitespace-nowrap text-sm"
            >
              {isLoading ? "Hiring..." : "Hire"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
