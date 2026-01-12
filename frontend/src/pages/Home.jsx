import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Welcome to GigFlow
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Connect with talented freelancers or find your next exciting project. 
            GigFlow is the marketplace where opportunities meet talent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/gigs"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition transform hover:scale-105"
                >
                  Browse Gigs
                </Link>
                <Link
                  to="/create-gig"
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:opacity-90 transition transform hover:scale-105"
                >
                  Post a Gig
                </Link>
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition transform hover:scale-105"
                >
                  My Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition transform hover:scale-105"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            How GigFlow Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Clients */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">For Clients</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Post your project
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Review freelancer bids
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Hire the best fit
                </li>
                <li className="flex items-center">
                  <span className="text-indigo-600 mr-2">✓</span>
                  Track progress
                </li>
              </ul>
            </div>

            {/* For Freelancers */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">For Freelancers</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  Browse available gigs
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  Submit competitive bids
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  Get hired by clients
                </li>
                <li className="flex items-center">
                  <span className="text-purple-600 mr-2">✓</span>
                  Build your portfolio
                </li>
              </ul>
            </div>

            {/* Platform Benefits */}
            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Why GigFlow?</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Secure & trusted platform
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Fair pricing
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  Quick hiring process
                </li>
                <li className="flex items-center">
                  <span className="text-green-600 mr-2">✓</span>
                  24/7 Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            {isAuthenticated ? `Welcome back, ${user?.name}!` : "Ready to get started?"}
          </h2>
          <p className="text-lg mb-8">
            {isAuthenticated
              ? "Continue exploring opportunities and managing your projects."
              : "Join thousands of freelancers and clients already using GigFlow."}
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Get Started Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}