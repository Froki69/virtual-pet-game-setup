"use client";

import { useState, useEffect } from "react";

const initialPets = [
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
    image: "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    name: "Bubbles",
    type: "Fish",
    image: "https://www.disneyclips.com/images/images/nemo3.gif",
  },
];

export default function GamePage() {
  const [pets, setPets] = useState(initialPets);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petStats, setPetStats] = useState({
    happiness: 50,
    hunger: 50,
    energy: 50,
    dirtiness: 0,
  });
  const [message, setMessage] = useState("");

  const [newPet, setNewPet] = useState({ id: null, name: "", type: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Add a new pet
  const addPet = () => {
    if (!newPet.name || !newPet.type || !newPet.image) {
      alert("All fields are required!");
      return;
    }
    setPets((prev) => [...prev, { ...newPet, id: Date.now() }]);
    setNewPet({ id: null, name: "", type: "", image: "" });
  };

  // Edit an existing pet
  const editPet = () => {
    setPets((prev) => prev.map((pet) => (pet.id === newPet.id ? newPet : pet)));
    setNewPet({ id: null, name: "", type: "", image: "" });
    setIsEditing(false);
  };

  // Delete a pet
  const deletePet = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  // Handle pet interactions
  const feedPet = () => {
    setPetStats((prev) => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 10),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    setMessage(`${selectedPet.name} gobbled up their treat! 🍪`);
  };

  const playWithPet = () => {
    setPetStats((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      energy: Math.max(0, prev.energy - 10),
      dirtiness: Math.min(100, prev.dirtiness + 10),
    }));
    setMessage(`${selectedPet.name} had a blast playing with you! 🎉`);
  };

  const cleanPet = () => {
    setPetStats((prev) => ({
      ...prev,
      dirtiness: Math.max(0, prev.dirtiness - 20),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    setMessage(`${selectedPet.name} feels fresh and sparkly! 🛁`);
  };

  const restPet = () => {
    setPetStats((prev) => ({
      ...prev,
      energy: Math.min(100, prev.energy + 20),
    }));
    setMessage(`${selectedPet.name} is full of energy after a nap! 💤`);
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

  // Conditional rendering
  if (selectedPet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-300 to-purple-300 p-6 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
          {selectedPet.name}'s Fun Time! 🎈
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
          <img
            src={selectedPet.image}
            alt={selectedPet.name}
            className="w-32 h-32 mx-auto mb-4 rounded-full shadow"
          />
          <p className="text-center text-gray-700 mb-4 text-lg">{message}</p>
          <div className="mb-4">
            <p className="font-semibold">Happiness: {petStats.happiness}%</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-pink-500 h-3 rounded-full"
                style={{ width: `${petStats.happiness}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Hunger: {petStats.hunger}%</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${petStats.hunger}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Energy: {petStats.energy}%</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${petStats.energy}%` }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Dirtiness: {petStats.dirtiness}%</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${petStats.dirtiness}%` }}
              ></div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={feedPet} className="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600">
              Feed Me 🍖
            </button>
            <button onClick={playWithPet} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
              Play 🎾
            </button>
            <button onClick={cleanPet} className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600">
              Bathe Me 🛁
            </button>
            <button onClick={restPet} className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600">
              Nap Time 💤
            </button>
          </div>
          <button
            onClick={resetGame}
            className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
          >
            Back to the Playground 🐾
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-300 to-purple-300 p-6">
      <h1 className="text-6xl font-extrabold mb-6 text-white drop-shadow-lg text-center">
        Your Adorable Pet Park 🌸🐾
      </h1>

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          {isEditing ? "Update My Details ✨" : "Add a New Cutie 🐾"}
        </h2>
        <input
          type="text"
          placeholder="Pet Name"
          value={newPet.name}
          onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          placeholder="Pet Type"
          value={newPet.type}
          onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
          className="w-full mb-3 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newPet.image}
          onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
          className="w-full mb-4 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={isEditing ? editPet : addPet}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 w-full"
        >
          {isEditing ? "Save My Glow-Up ✨" : "Add Me 🐾"}
        </button>
      </div>

      {/* Pet List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transform hover:scale-105 transition">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-32 h-32 mx-auto mb-4 rounded-full shadow-md"
            />
            <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
            <p className="text-gray-600">Type: {pet.type}</p>
            <div className="flex gap-2 justify-center mt-4">
              <button
                onClick={() => setSelectedPet(pet)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Adopt Me 💖
              </button>
              <button
                onClick={() => {
                  setNewPet(pet);
                  setIsEditing(true);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Give Me a Makeover ✨
              </button>
              <button
                onClick={() => deletePet(pet.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Set Me Free 🕊️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
