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
    image: "https://tse1.mm.bing.net/th?id=OIP.rJJbzOogIOXu5MwB3qgfHQHaEo&pid=Api&P=0&h=220",
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

  // Conditional rendering
  if (selectedPet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-6 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
          Your Virtual Pet: {selectedPet.name}
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
              Feed
            </button>
            <button onClick={playWithPet} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
              Play
            </button>
            <button onClick={cleanPet} className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600">
              Clean
            </button>
            <button onClick={restPet} className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600">
              Rest
            </button>
          </div>
          <button
            onClick={resetGame}
            className="mt-6 w-full px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
          >
            Back to Pet Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg text-center">
        Manage Your Pets 🐾
      </h1>

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">{isEditing ? "Edit Pet" : "Add a New Pet"}</h2>
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
          {isEditing ? "Save Changes" : "Add Pet"}
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
                Choose
              </button>
              <button
                onClick={() => {
                  setNewPet(pet);
                  setIsEditing(true);
                }}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deletePet(pet.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
