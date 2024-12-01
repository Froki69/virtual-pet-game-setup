"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";

// Define the available pet species with image URLs
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
    id: 8,
    name: "Snappy",
    type: "Crocodile",
    image: "https://clipart-library.com/images/yTkrdE5nc.jpg",
  },
  {
    id: 9,
    name: "Stompy",
    type: "Elephant",
    image: "https://static.vecteezy.com/system/resources/previews/007/270/811/original/cartoon-cute-baby-elephant-sitting-vector.jpg",
  },
  {
    id: 10,
    name: "Leo",
    type: "Lion",
    image: "https://tse4.mm.bing.net/th?id=OIP.mgBOzl9JKNdY0F68tPXJ2QHaHS&pid=Api&P=0&h=220",
  },
];

export default function GamePage() {
  const [selectedPet, setSelectedPet] = useState(null); // Selected pet state
  const [petStats, setPetStats] = useState({
    happiness: 50,
    hunger: 50,
    energy: 50,
    dirtiness: 0,
    sick: false, // Sick state
    alive: true, // Life status
  });
  const [message, setMessage] = useState(""); // Dynamic message for the pet

  // Function to handle feeding the pet
  const feedPet = () => {
    if (!petStats.alive) return;

    setPetStats((prev) => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 10),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    setMessage(`${selectedPet.name} feels satisfied after eating!`);
  };

  // Function to handle playing with the pet
  const playWithPet = () => {
    if (!petStats.alive) {
      setMessage(`${selectedPet.name} has passed away and cannot play.`);
      return;
    }
    if (petStats.dirtiness >= 100) {
      setMessage(`${selectedPet.name} is too dirty to play! Clean them first.`);
      return;
    }
    if (petStats.hunger >= 100) {
      setMessage(`${selectedPet.name} is too hungry to play! Feed them first.`);
      return;
    }
    if (petStats.energy === 0) {
      setMessage(`${selectedPet.name} is too tired to play! Let them rest.`);
      return;
    }

    setPetStats((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      hunger: Math.min(100, prev.hunger + 10),
      energy: Math.max(0, prev.energy - 15),
      dirtiness: Math.min(100, prev.dirtiness + 15),
    }));
    setMessage(`${selectedPet.name} had so much fun playing!`);
  };

  // Function to handle cleaning the pet
  const cleanPet = () => {
    if (!petStats.alive) return;

    setPetStats((prev) => ({
      ...prev,
      dirtiness: Math.max(0, prev.dirtiness - 30),
      happiness: Math.min(100, prev.happiness + 5),
      sick: prev.dirtiness >= 80 ? false : prev.sick,
    }));
    setMessage(`${selectedPet.name} is now clean and happy!`);
  };

  // Function to handle resting (restore energy)
  const restPet = () => {
    if (!petStats.alive) return;

    setPetStats((prev) => ({
      ...prev,
      energy: Math.min(100, prev.energy + 20),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    setMessage(`${selectedPet.name} is feeling refreshed after resting!`);
  };

  // Function to reset the game and choose another pet
  const resetGame = () => {
    setSelectedPet(null);
    setPetStats({
      happiness: 50,
      hunger: 50,
      energy: 50,
      dirtiness: 0,
      sick: false,
      alive: true,
    });
    setMessage("");
  };

  // Automatically update stats over time
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

  // Check for sickness or death based on stats
  useEffect(() => {
    if (petStats.energy === 0 && petStats.hunger >= 100) {
      setPetStats((prev) => ({ ...prev, alive: false }));
      setMessage(`${selectedPet?.name || "Your pet"} has passed away... 😢`);
    }

    if (petStats.dirtiness >= 80 && !petStats.sick) {
      setPetStats((prev) => ({ ...prev, sick: true }));
      setMessage(`${selectedPet?.name || "Your pet"} is feeling very sick! Clean them now!`);
    }
  }, [petStats]);

  // Render the pet selection screen
  if (!selectedPet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-6 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg">
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

  // Render the main game interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-6 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold mb-8 text-white drop-shadow-lg">
        Your Virtual Pet: {selectedPet.name} ({selectedPet.type})
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 flex flex-col items-center">
        <img
          src={selectedPet.image}
          alt={selectedPet.name}
          className="w-32 h-32 mb-6 animate-bounce"
        />
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          {selectedPet.name}
        </h2>

        <p className="text-center text-xl text-gray-600 mb-4">{message}</p>

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

        <div className="mb-4 w-full">
          <p className="font-medium text-gray-600 mb-1">Hunger: {petStats.hunger}</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-red-400 h-3 rounded-full transition-all"
              style={{ width: `${petStats.hunger}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-4 w-full">
          <p className="font-medium text-gray-600 mb-1">Energy: {petStats.energy}</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-400 h-3 rounded-full transition-all"
              style={{ width: `${petStats.energy}%` }}
            ></div>
          </div>
        </div>

        <div className="w-full">
          <p className="font-medium text-gray-600 mb-1">
            Dirtiness: {petStats.dirtiness}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-yellow-400 h-3 rounded-full transition-all"
              style={{ width: `${petStats.dirtiness}%` }}
            ></div>
          </div>
        </div>

        {petStats.sick && (
          <p className="text-red-500 text-center mt-4">
            {selectedPet.name} is sick! Clean them to make them feel better!
          </p>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={feedPet}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          Feed
        </button>
        <button
          onClick={playWithPet}
          className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition transform hover:scale-105"
        >
          Play
        </button>
        <button
          onClick={cleanPet}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition transform hover:scale-105"
        >
          Clean
        </button>
        <button
          onClick={restPet}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition transform hover:scale-105"
        >
          Rest
        </button>
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Choose Another Pet
      </button>
    </div>
  );
}
