"use client";

import { useState, useEffect } from "react";

const initialPets = [
  {
    id: 1,
    name: "Fluffy",
    type: "Dog",
    image: "https://cdn.pixabay.com/photo/2022/09/11/17/34/dog-7447595_1280.png",
    level: 1,
    experience: 0,
  },
  {
    id: 2,
    name: "Whiskers",
    type: "Cat",
    image: "https://img.freepik.com/premium-vector/cute-american-short-hair-cat-cartoon-sitting_188253-6780.jpg",
    level: 1,
    experience: 0,
  },
  {
    id: 3,
    name: "Bubbles",
    type: "Fish",
    image: "https://www.disneyclips.com/images/images/nemo3.gif",
    level: 1,
    experience: 0,
  },
];

const backgrounds = [
  "bg-gradient-to-r from-pink-300 via-yellow-300 to-teal-300",
  "bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300",
  "bg-gradient-to-r from-green-300 via-yellow-300 to-red-300",
];

export default function GamePage() {
  const [pets, setPets] = useState(initialPets);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petStats, setPetStats] = useState({
    happiness: 50,
    hunger: 50,
    energy: 50,
    dirtiness: 0,
    experience: 0,
  });
  const [message, setMessage] = useState("");
  const [background, setBackground] = useState(backgrounds[0]);

  const [newPet, setNewPet] = useState({
    id: null,
    name: "",
    type: "",
    image: "",
    level: 1,
    experience: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const resetNewPet = () =>
    setNewPet({ id: null, name: "", type: "", image: "", level: 1, experience: 0 });

  // Add a new pet
  const addPet = () => {
    if (!newPet.name || !newPet.type || !newPet.image) {
      alert("All fields are required!");
      return;
    }
    setPets((prev) => [...prev, { ...newPet, id: Date.now() }]);
    resetNewPet();
  };

  // Edit an existing pet
  const editPet = () => {
    setPets((prev) => prev.map((pet) => (pet.id === newPet.id ? newPet : pet)));
    resetNewPet();
    setIsEditing(false);
  };

  // Delete a pet
  const deletePet = (id) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  // Handle pet interactions
  const interactWithPet = (interactionType) => {
    let statChanges = {};
    let newExperience = petStats.experience + 10;
    let levelUp = false;

    if (newExperience >= 100) {
      newExperience = 0;
      levelUp = true;
    }

    switch (interactionType) {
      case "feed":
        statChanges = {
          hunger: Math.max(0, petStats.hunger - 10),
          happiness: Math.min(100, petStats.happiness + 5),
        };
        setMessage(`${selectedPet.name} gobbled up their treat! 🍪`);
        break;
      case "play":
        statChanges = {
          happiness: Math.min(100, petStats.happiness + 10),
          energy: Math.max(0, petStats.energy - 10),
          dirtiness: Math.min(100, petStats.dirtiness + 10),
        };
        setMessage(`${selectedPet.name} had a blast playing with you! 🎉`);
        break;
      case "clean":
        statChanges = {
          dirtiness: Math.max(0, petStats.dirtiness - 20),
          happiness: Math.min(100, petStats.happiness + 5),
        };
        setMessage(`${selectedPet.name} feels fresh and sparkly! 🛁`);
        break;
      case "rest":
        statChanges = {
          energy: Math.min(100, petStats.energy + 20),
        };
        setMessage(`${selectedPet.name} is full of energy after a nap! 💤`);
        break;
      default:
        break;
    }

    setPetStats((prev) => ({
      ...prev,
      ...statChanges,
      experience: newExperience,
    }));

    if (levelUp) {
      setPets((prev) =>
        prev.map((pet) =>
          pet.id === selectedPet.id ? { ...pet, level: pet.level + 1 } : pet
        )
      );
      setMessage(`${selectedPet.name} leveled up! 🎉`);
    }
  };

  const resetGame = () => {
    setSelectedPet(null);
    setPetStats({
      happiness: 50,
      hunger: 50,
      energy: 50,
      dirtiness: 0,
      experience: 0,
    });
    setMessage("");
  };

  // Random events
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats((prev) => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 5),
        dirtiness: Math.min(100, prev.dirtiness + 5),
        energy: Math.max(0, prev.energy - 5),
        happiness: Math.max(0, prev.happiness - 3),
      }));
      if (Math.random() > 0.9) {
        setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
        setMessage("A magical event changed the background! 🎨");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Conditional rendering
  if (selectedPet) {
    return (
      <div className={`min-h-screen p-6 flex flex-col items-center ${background}`}>
        <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
          {selectedPet.name}'s Fun Time! 🎈 (Level {selectedPet.level})
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
            <button
              onClick={() => interactWithPet("feed")}
              className="px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600"
            >
              Feed Me 🍖
            </button>
            <button
              onClick={() => interactWithPet("play")}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Play 🎾
            </button>
            <button
              onClick={() => interactWithPet("clean")}
              className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
            >
              Bathe Me 🛁
            </button>
            <button
              onClick={() => interactWithPet("rest")}
              className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
            >
              Rest 💤
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
    <div className={`min-h-screen p-6 ${background}`}>
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
          <div
            key={pet.id}
            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transform hover:scale-105 transition"
          >
            <img
              src={pet.image}
              alt={pet.name || "Unknown Pet"}
              className="w-32 h-32 mx-auto mb-4 rounded-full shadow-md"
            />
            <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
            <p className="text-gray-600">Type: {pet.type}</p>
            <p className="text-gray-600">Level: {pet.level}</p>
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
