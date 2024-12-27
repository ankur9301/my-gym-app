// src/app/dashboard/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ExerciseCard from '../../components/ExerciseCard';
import TargetMuscle from '../../components/TargetMuscle';
import { useRouter } from 'next/navigation'; // For navigation

const muscles = [
  { name: 'Chest', image: '/muscles/chest.jpg' },
  { name: 'Back', image: '/muscles/back.jpg' },
  { name: 'Legs', image: '/muscles/legs.jpg' },
  { name: 'Shoulders', image: '/muscles/shoulders.jpg' },
  { name: 'Biceps', image: '/muscles/biceps.jpg' },
  { name: 'Triceps', image: '/muscles/triceps.jpg' },
  { name: 'Core', image: '/muscles/core.jpg' },
];

export default function Dashboard() {
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]); // Selected muscles
  const [workoutTime, setWorkoutTime] = useState<number>(60); // Workout time
  const [exercises, setExercises] = useState<any[]>([]); // Exercises from backend
  const router = useRouter(); // For navigation

  // Toggle muscle selection
  const toggleMuscleSelection = (muscle: string) => {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(selectedMuscles.filter((m) => m !== muscle)); // Remove muscle if already selected
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]); // Add muscle if not selected
    }
  };

  // Fetch exercises when selected muscles or workout time changes
  useEffect(() => {
    const fetchExercises = async () => {
      if (selectedMuscles.length === 0) {
        setExercises([]);
        return; // Don't fetch if no muscles are selected
      }

      const target = selectedMuscles.join(',');
      const url = `http://localhost:5001/generateWorkout?target=${target}&time=${workoutTime}`;
      const response = await fetch(url);
      const data = await response.json();
      setExercises(data.workoutPlan);
    };

    fetchExercises();
  }, [selectedMuscles, workoutTime]);

  // Navigate to the workout ground and pass exercises
  const handleStartWorkout = () => {
    localStorage.setItem('selectedExercises', JSON.stringify(exercises)); // Save exercises in localStorage
    router.push('/workout'); // Navigate to the workout page
  };

  return (
    <div>
      <Navbar onTimeChange={setWorkoutTime} />
      <main className="p-6">
        {/* Target Muscles Section */}
        <h2 className="text-xl font-bold mb-4">Target Muscles</h2>
        <div className="flex flex-wrap justify-center space-x-4 mb-6">
          {muscles.map((muscle) => (
            <TargetMuscle
              key={muscle.name}
              name={muscle.name}
              image={muscle.image}
              isSelected={selectedMuscles.includes(muscle.name)}
              onClick={() => toggleMuscleSelection(muscle.name)}
            />
          ))}
        </div>

        {/* Exercises Section */}
        <h2 className="text-xl font-bold mb-4">Exercises</h2>
        <div className="flex flex-col items-center space-y-6 w-full">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              title={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              image={`${exercise.name.toLowerCase().replace(' ', '-')}.json`}
            />
          ))}
        </div>
      </main>

      {/* Start Workout Button */}
      {exercises.length > 0 && (
        <button
          onClick={handleStartWorkout}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-green-700 transition"
        >
          Start Workout
        </button>
      )}
    </div>
  );
}
