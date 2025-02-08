import React, { useState } from "react";
import { useAuth } from "../../authContext";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../index.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "https://github-clone-v5ul.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            username: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed!");
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      setCurrentUser(data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err.message || "Signup Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <FaGithub className="text-5xl text-white mx-auto" />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              autoComplete="off"
              name="username"
              id="username"
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email address</label>
            <input
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              autoComplete="off"
              name="password"
              id="password"
              className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={handleSignup}
            className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/auth" className="text-indigo-400 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
