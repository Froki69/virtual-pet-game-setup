"use client";

import { useState, useEffect } from "react";

// Define pet species with image URLs
const petSpecies = [
  {
    id: 1,
    name: "Fluffy",
    type: "Dog",
    image: "https://cdn.pixabay.com/photo/2022/09/11/17/34/dog-7447595_1280.png",
  },
  {
    id: 2,
    name: "Whiskers",
    type: "Cat",
    image: "https://tse1.mm.bing.net/th?id=OIP.rJJbzOogIOXu5MwB3qgfHQHaEo&pid=Api&P=0&h=220",
  },
  {
    id: 3,
    name: "Bubbles",
    type: "Fish",
    image: "https://www.disneyclips.com/images/images/nemo3.gif",
  },
  {
    id: 4,
    name: "Snappy",
    type: "Crocodile",
    image: "https://clipart-library.com/images/yTkrdE5nc.jpg",
  },
  {
    id: 5,
    name: "Stompy",
    type: "Elephant",
    image: "https://static.vecteezy.com/system/resources/previews/007/270/811/original/cartoon-cute-baby-elephant-sitting-vector.jpg",
  },
  {
    id: 6,
    name: "Leo",
    type: "Lion",
    image: "https://tse4.mm.bing.net/th?id=OIP.mgBOzl9JKNdY0F68tPXJ2QHaHS&pid=Api&P=0&h=220",
  },
];

export default function GamePage() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [petStats, setPetStats] = useState({
    happiness: 50,
    hunger: 50,
    energy: 50,
    dirtiness: 0,
  });
  const [message, setMessage] = useState("");

  // Handle pet interactions
  const feedPet = () => {
    setPetStats((prev) => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 10),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    setMessage(`${selectedPet.name} enjoyed their meal! 🍖`);
  };

  const playWithPet = () => {
    setPetStats((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      energy: Math.max(0, prev.energy - 10),
      dirtiness: Math.min(100, prev.dirtiness + 10),
    }));
    setMessage(`${selectedPet.name} had so much fun! 🎉`);
  };

  const cleanPet = () => {
    setPetStats((prev) => ({
      ...prev,
      dirtiness: Math.max(0, prev.dirtiness - 20),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    setMessage(`${selectedPet.name} is clean and fresh now! 🧼`);
  };

  const restPet = () => {
    setPetStats((prev) => ({
      ...prev,
      energy: Math.min(100, prev.energy + 20),
    }));
    setMessage(`${selectedPet.name} feels well-rested! 🛏️`);
  };

  const resetGame = () => {
    setSelectedPet(null);
    setPetStats({ happiness: 50, hunger: 50, energy: 50, dirtiness: 0 });
    setMessage("");
  };

  // Automatically decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 5),
        dirtiness: Math.min(100, prev.dirtiness + 5),
        energy: Math.max(0, prev.energy - 5),
        happiness: Math.max(0, prev.happiness - 3),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!selectedPet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400 flex flex-col items-center justify-center relative">
        {/* Floating Bigger Hearts */}
        <div className="absolute top-10 left-8 text-7xl animate-bounce">
          ❤️
        </div>
        <div className="absolute bottom-8 right-12 text-7xl animate-bounce">
          💜
        </div>

        <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">
          Choose Your Pet 🐾
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {petSpecies.map((pet) => (
            <div
              key={pet.id}
              className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={pet.image}
                alt={pet.name}
                className="w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h2 className="text-xl font-bold text-gray-800">{pet.name}</h2>
              <p className="text-gray-600">Species: {pet.type}</p>
              <button
                onClick={() => setSelectedPet(pet)}
                className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
              >
                Choose {pet.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-pink-400 p-6 flex flex-col items-center relative">
      {/* Floating Bigger Hearts */}
      <div className="absolute top-10 left-8 text-7xl animate-bounce">
        ❤️
      </div>
      <div className="absolute bottom-8 right-12 text-7xl animate-bounce">
        💜
      </div>

      <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
        Your Virtual Pet: {selectedPet.name} ({selectedPet.type})
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <img
          src={selectedPet.image}
          alt={selectedPet.name}
          className="w-24 h-24 mx-auto mb-4 rounded-full"
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {selectedPet.name}
        </h2>
        <p className="text-center text-gray-600 mb-6">{message}</p>

        <div className="mb-4">
          <p>Happiness: {petStats.happiness}%</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-pink-400 h-3 rounded-full"
              style={{ width: `${petStats.happiness}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <p>Hunger: {petStats.hunger}%</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-400 h-3 rounded-full"
              style={{ width: `${petStats.hunger}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <p>Energy: {petStats.energy}%</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-400 h-3 rounded-full"
              style={{ width: `${petStats.energy}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-4">
          <p>Dirtiness: {petStats.dirtiness}%</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-yellow-400 h-3 rounded-full"
              style={{ width: `${petStats.dirtiness}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={feedPet}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
          >
            Feed
          </button>
          <button
            onClick={playWithPet}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Play
          </button>
          <button
            onClick={cleanPet}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          >
            Clean
          </button>
          <button
            onClick={restPet}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
          >
            Rest
          </button>
        </div>
        <button
          onClick={resetGame}
          className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
