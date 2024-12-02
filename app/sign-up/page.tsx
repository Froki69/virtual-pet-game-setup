"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
  });
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [completion, setCompletion] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const filledFields = Object.values(formData).filter((val) => val !== "")
      .length;
    setCompletion((filledFields / Object.keys(formData).length) * 100);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "password") {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length >= 8 && /\d/.test(password) && /[A-Z]/.test(password)) {
      return "Strong";
    } else if (password.length >= 6) {
      return "Medium";
    }
    return "Weak";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "An error occurred.");
    } else {
      setError("");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        window.location.href = "/login";
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-between bg-gradient-to-br from-pink-300 via-purple-300 to-blue-200 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="absolute w-6 h-6 bg-pink-400 rounded-full opacity-60 animate-bounce"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      <div className="relative w-1/2 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-extrabold text-pink-500 mb-4">Welcome!</h1>
        <p className="text-lg text-purple-600">
          Create your account and join our fun virtual pet adventure!
        </p>
      </div>
      <div className="relative w-1/2 bg-white bg-opacity-80 backdrop-blur-xl p-10 rounded-l-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-pink-600 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <p
              className={`mt-1 text-sm ${
                passwordStrength === "Strong"
                  ? "text-green-500"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Password Strength: {passwordStrength || "Enter Password"}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-sm text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm text-gray-700 mb-1">
              Gender
            </label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="nationality" className="block text-sm text-gray-700 mb-1">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}