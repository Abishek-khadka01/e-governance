// AdminLogin.tsx
import React, { useState } from "react";
import type { UserLoginRequest, UserLoginResponse } from "./types";
import axios from "axios";
import { LOGIN } from "../api/constants";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/use-user-store";
const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const setUser = useUserStore((state)=>state.setUser);
    const navigate = useNavigate();
    const loginFunction =  async(request : UserLoginRequest) =>{
    console.log(import.meta.env.BASE_URL)
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}${LOGIN}`, request, {
          withCredentials :true
        } );
        console.log(response)
        return response.data;
    }
  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Email:", email);
    console.log("Password:", password);
    const response  =  await loginFunction({
        email,
        password
    });

    const data   = response?.data as UserLoginResponse;

    setUser(data);

    navigate('/dashboard')

    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
