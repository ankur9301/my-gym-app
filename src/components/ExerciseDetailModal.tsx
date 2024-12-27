'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function ExerciseDetailModal({ exercise, onClose, onPhotoClick }) {
  const [sets, setSets] = useState([{ reps: exercise.reps, weight: 0 }]);

  const addSet = () => {
    setSets([...sets, { reps: exercise.reps, weight: 0 }]);
  };

  const updateSet = (index, field, value) => {
    const newSets = [...sets];
    newSets[index][field] = Number(value);
    setSets(newSets);
  };

  const logSet = (index) => {
    console.log(`Logged set ${index + 1}:`, sets[index]);
  };

  const logAllSets = () => {
    console.log('Logged all sets:', sets);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#232328] rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{exercise.name}</h2>
          <button onClick={onClose} className="text-white">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4 cursor-pointer" onClick={() => onPhotoClick(exercise.image)}>
          <img
            src={exercise.image}
            alt={exercise.name}
            className="rounded-lg w-full object-cover"
          />
        </div>
        <div className="space-y-4">
          {sets.map((set, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm text-gray-400 w-12">Set {index + 1}</span>
              <input
                type="number"
                value={set.reps}
                onChange={(e) => updateSet(index, 'reps', e.target.value)}
                className="w-20 bg-[#3A3A3D] text-white border-none rounded-md"
                placeholder="Reps"
              />
              <input
                type="number"
                value={set.weight}
                onChange={(e) => updateSet(index, 'weight', e.target.value)}
                className="w-20 bg-[#3A3A3D] text-white border-none rounded-md"
                placeholder="Weight"
              />
              <button
                onClick={() => logSet(index)}
                className="bg-[#FF006E] hover:bg-[#FF006E]/90 text-white py-1 px-4 rounded-md"
              >
                Log
              </button>
            </div>
          ))}
          <button
            onClick={addSet}
            className="w-full bg-[#3A3A3D] hover:bg-[#3A3A3D]/90 text-white py-2 px-4 rounded-md"
          >
            <Plus size={16} className="mr-2" /> Add Set
          </button>
          <button
            onClick={logAllSets}
            className="w-full bg-[#FF006E] hover:bg-[#FF006E]/90 text-white py-2 px-4 rounded-md"
          >
            Log All Sets & Next Exercise
          </button>
        </div>
      </div>
    </div>
  );
}
