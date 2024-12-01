"use client";

import { useState } from "react";
import Particles from "react-tsparticles";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Invalid credentials");
    } else {
      setError("");
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-200 via-yellow-200 to-teal-200">
      {/* Soft, Cute Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_#ffb3c1,_#fff5e6)] opacity-80 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_#ffb6c1,_#ffeead)] opacity-30 mix-blend-soft-light"></div>
      </div>

      {/* Interactive Particles */}
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 80 },
            color: { value: ["#ff89a8", "#f5c1a0", "#d1aaff"] },
            shape: { type: "circle" },
            size: { value: 3 },
            move: { enable: true, speed: 1.5 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
            },
          },
        }}
      />

      {/* Login Card */}
      {!success && (
        <motion.div
          className="relative bg-white bg-opacity-20 backdrop-blur-md p-10 rounded-xl shadow-lg w-full max-w-md z-10 transform transition-transform hover:scale-105"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-center mb-4 text-pink-500">
            Login to your Cuddle Pet World! 🐾
          </h1>
          <p className="text-center text-sm mb-6 text-gray-400">
            Enter your details and start your adventure with your cute pets! 💕
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-pink-400 focus:outline-none focus:ring-0 focus:border-pink-600 peer cursor-text transition hover:border-pink-500"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:text-sm peer-focus:text-pink-500"
              >
                Email Address
              </label>
            </div>
            <div className="mb-6 relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-200 bg-transparent border-b-2 border-pink-400 focus:outline-none focus:ring-0 focus:border-pink-600 peer cursor-text transition hover:border-pink-500"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:text-sm peer-focus:text-pink-500"
              >
                Password
              </label>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg shadow-lg transform transition hover:scale-110 hover:shadow-xl active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log In
            </motion.button>
          </form>
          <p className="text-center text-sm mt-6 text-gray-400">
            Don’t have an account?{" "}
            <a
              href="/sign-up"
              className="text-pink-400 underline hover:text-pink-500 transition"
            >
              Create Account
            </a>
          </p>
        </motion.div>
      )}

      {/* Success Animation */}
      {success && (
        <motion.div className="absolute inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-10 rounded-lg shadow-lg text-center"
          >
            <h1 className="text-3xl font-bold text-pink-500">Login Successful! 🎉</h1>
            <p className="text-gray-700 mt-2">Redirecting you to your dashboard...</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
