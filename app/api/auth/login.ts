"use client"; // Mark this as a Client Component

import { useState } from "react";

// Define the available pet species
const petSpecies = [
  { id: 1, name: "Fluffy", type: "Dog", image: "/dog.png" },
  { id: 2, name: "Whiskers", type: "Cat", image: "/cat.png" },
  { id: 3, name: "Bubbles", type: "Fish", image: "/fish.png" },
];

export default function GamePage() {
  const [selectedPet, setSelectedPet] = useState(null); // Selected pet state
  const [petStats, setPetStats] = useState({
    happiness: 50,
    hunger: 50,
  });

  // Function to handle feeding the pet
  const feedPet = () => {
    setPetStats((prev) => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 10), // Decrease hunger
      happiness: Math.min(100, prev.happiness + 5), // Slightly increase happiness
    }));
  };

  // Function to handle playing with the pet
  const playWithPet = () => {
    setPetStats((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10), // Increase happiness
      hunger: Math.min(100, prev.hunger + 10), // Increase hunger
    }));
  };

  // Function to reset the game and choose another pet
  const resetGame = () => {
    setSelectedPet(null); // Reset the selected pet
    setPetStats({ happiness: 50, hunger: 50 }); // Reset pet stats
  };

  // Show the pet selection screen if no pet is selected
  if (!selectedPet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-pink-200 flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 drop-shadow-lg">
          Choose Your Pet
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {petSpecies.map((pet) => (
            <div
              key={pet.id}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-2xl transition transform hover:scale-105"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-32 h-32 mx-auto mb-4"
              />
              <h2 className="text-xl font-bold">{pet.name}</h2>
              <p className="text-gray-600 mb-4">Species: {pet.type}</p>
              <button
                onClick={() => setSelectedPet(pet)}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Choose {pet.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show the main game interface when a pet is selected
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-pink-200 p-6 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-8 text-gray-800 drop-shadow-lg">
        Your Virtual Pet: {selectedPet.name} ({selectedPet.type})
      </h1>

      {/* Pet Info and Logo */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col items-center">
        <img
          src={selectedPet.image}
          alt={selectedPet.name}
          className="w-32 h-32 mb-6 animate-bounce"
        />
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          {selectedPet.name}
        </h2>

        {/* Happiness Bar */}
        <div className="mb-4 w-full">
          <p className="font-medium text-gray-600 mb-1">
            Happiness: {petStats.happiness}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-400 h-3 rounded-full transition-all"
              style={{ width: `${petStats.happiness}%` }}
            ></div>
          </div>
        </div>

        {/* Hunger Bar */}
        <div className="w-full">
          <p className="font-medium text-gray-600 mb-1">Hunger: {petStats.hunger}</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-400 h-3 rounded-full transition-all"
              style={{ width: `${petStats.hunger}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6 mt-8">
        <button
          onClick={feedPet}
          className="px-8 py-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          Feed
        </button>
        <button
          onClick={playWithPet}
          className="px-8 py-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
        >
          Play
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Choose Another Pet
      </button>
    </div>
  );
}
