'use client';

import React, { useState } from 'react';
import Lottie from 'lottie-react';

interface ExerciseDetailsProps {
  exercise: {
    id: string;
    name: string;
    animation: string;
  };
}

const ExerciseDetails: React.FC<ExerciseDetailsProps> = ({ exercise }) => {
  const [sets, setSets] = useState([
    { reps: 8, weight: 0 },
    { reps: 8, weight: 0 },
    { reps: 8, weight: 0 },
  ]);

  // Add a new set
  const addSet = () => {
    setSets([...sets, { reps: 8, weight: 0 }]);
  };

  // Update reps/weight for a specific set
  const updateSet = (index: number, field: 'reps' | 'weight', value: number) => {
    const updatedSets = sets.map((set, i) =>
      i === index ? { ...set, [field]: value } : set
    );
    setSets(updatedSets);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Top Section */}
      <div className="flex-1 bg-black relative">
        <Lottie animationData={require(`../../public${exercise.animation}`)} loop autoplay />
        <h1 className="absolute bottom-4 left-4 text-2xl font-bold">{exercise.name}</h1>
        <button
          className="absolute top-4 right-4 text-xl text-white"
          onClick={() => window.history.back()} // Go back to the workout page
        >
          ✕
        </button>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Sets</h2>
        </div>
        <div>
          {/* Table for Sets */}
          {sets.map((set, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span className="text-lg">{index + 1}</span>
              <input
                type="number"
                value={set.reps}
                onChange={(e) => updateSet(index, 'reps', Number(e.target.value))}
                className="w-20 p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                value={set.weight}
                onChange={(e) => updateSet(index, 'weight', Number(e.target.value))}
                className="w-20 p-2 rounded bg-gray-700 text-white"
              />
            </div>
          ))}
          <button
            onClick={addSet}
            className="mt-4 bg-pink-600 text-white py-2 px-4 rounded"
          >
            Add Set
          </button>
        </div>
      </div>

      {/* Log Set & Next Exercise */}
      <div className="fixed bottom-4 left-0 w-full px-4">
        <button
          className="w-full bg-pink-600 text-white py-2 rounded text-lg font-bold"
          onClick={() => alert('Set logged!')}
        >
          Log Set & Next Exercise
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetails;
