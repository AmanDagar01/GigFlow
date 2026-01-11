import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await axios.post("/auth/register", { name, email, password });
    navigate("/login");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-500 min-h-screen text-white flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <input className="w-full p-2 mb-4 rounded border border-gray-300" placeholder="Name" onChange={e => setName(e.target.value)} />
        <input className="w-full p-2 mb-4 rounded border border-gray-300" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 mb-4 rounded border border-gray-300" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={submit}>Register</button>
      </div>
    </div>
  );
}
