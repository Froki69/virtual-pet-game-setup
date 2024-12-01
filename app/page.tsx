"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 via-yellow-300 to-teal-300 text-gray-800">
      <div className="text-center p-8 bg-white bg-opacity-80 rounded-lg shadow-xl max-w-lg space-y-8">
        <h1 className="text-6xl font-extrabold text-pink-500 mb-4 animate-pulse-slow">
          Welcome to the Cuddle Pet Paradise! 🐾
        </h1>
        <p className="text-lg text-gray-700 mb-8 animate-pulse">
          Ready to meet your new best friend? Adopt your cuddly pet and give them all the love they deserve! 🌈
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Cuddle Me Button */}
          <Link
            href="/sign-up"
            className="w-full sm:w-auto px-8 py-4 bg-pink-400 hover:bg-pink-500 text-lg font-semibold text-white rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:scale-110"
          >
            Cuddle Me! 🧸
          </Link>

          {/* Paws Up Button */}
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-teal-400 hover:bg-teal-500 text-lg font-semibold text-white rounded-lg shadow-lg transform transition duration-200 ease-in-out hover:scale-110"
          >
            Paws Up! 🐾
          </Link>
        </div>
      </div>
    </div>
  );
}
