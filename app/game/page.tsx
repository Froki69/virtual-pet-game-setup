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
    image: "https://img.freepik.com/premium-vector/cute-american-short-hair-cat-cartoon-sitting_188253-6780.jpg",
    
  },
  {
    id: 3,
    name: "Bubbles",
    type: "Fish",
    image: "https://www.disneyclips.com/images/images/nemo3.gif",
    
  },
  {
    id: 4,
    name: "Mr.Whale",
    type: "Whale",
    image: "data:image/jpeg;base64,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",
    
  
  },
  {
    id: 5,
    name: "PO",
    type: "Panda",
    image: "data:image/jpeg;base64,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",
  
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
