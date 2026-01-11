import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

export default function GigDetail() {
  const { id } = useParams();
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const submitBid = async () => {
    await axios.post("/bids", {
      gigId: id,
      price,
      message
    });
    alert("Bid submitted");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-400 to-blue-400 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Gig Details</h1>
      <input className="w-full p-2 mb-4 rounded border border-gray-300 text-black" placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <textarea className="w-full p-2 mb-4 rounded border border-gray-300 text-black" placeholder="Message" onChange={e => setMessage(e.target.value)} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={submitBid}>Submit Bid</button>
    </div>
  );
}
