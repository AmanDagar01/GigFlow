import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    // Fetch bids for owned gigs (simplified)
    axios.get("/bids/YOUR_GIG_ID").then(res => setBids(res.data));
  }, []);

  const hire = async (id) => {
    await axios.patch(`/bids/${id}/hire`);
    alert("Hired");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {bids.map(bid => (
        <div key={bid._id} className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <p className="text-lg font-semibold">Price: ${bid.price}</p>
          <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => hire(bid._id)}>Hire</button>
        </div>
      ))}
    </div>
  );
}
