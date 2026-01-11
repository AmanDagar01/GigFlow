import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await axios.post("/auth/login", { email, password });
    navigate("/");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-900 min-h-screen text-white flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <input className="w-full p-2 mb-4 rounded border border-gray-300" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 mb-4 rounded border border-gray-300" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={submit}>Login</button>
      </div>
    </div>
  );
}
