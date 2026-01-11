import { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    axios.get("/gigs").then(res => setGigs(res.data));
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-yellow-400 to-red-400 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Available Gigs</h1>
      {gigs.map(gig => (
        <div key={gig._id} className="bg-white text-black p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-bold">{gig.title}</h3>
          <p className="text-lg">Budget: ${gig.budget}</p>
          <Link to={`/gigs/${gig._id}`} className="text-blue-500 hover:underline">View Details</Link>
        </div>
      ))}
    </div>
  );
}
