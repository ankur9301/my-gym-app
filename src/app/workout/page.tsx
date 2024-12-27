// src/app/workout/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExerciseCard from '../../components/ExerciseCard'; // Reuse ExerciseCard component
import Timer from '../../components/Timer';
import WorkoutList from '../../components/WorkoutList';
import ExerciseDetails from '../../components/ExerciseDetails';

export default function WorkoutPage() {
  const [time, setTime] = useState(0); // Stopwatch time in seconds
  const [isRunning, setIsRunning] = useState(true); // Pause/Resume state
  const router = useRouter();

  const exercises = JSON.parse(localStorage.getItem('selectedExercises') || '[]'); // Get exercises from localStorage

  // Stopwatch Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000); // Increment time every second
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Convert seconds to minutes:seconds format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100 p-6">
      {/* Stopwatch */}
      <h1 className="text-3xl font-bold mb-6">Time: {formatTime(time)}</h1>

      {/* Exercises Section */}
      <div className="w-full max-w-2xl bg-white p-4 rounded-lg shadow-md">
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
      </div>

      {/* Controls */}
      <div className="fixed bottom-8 flex space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)} // Toggle pause/resume
          className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-blue-700 transition"
        >
          {isRunning ? 'Pause' : 'Resume'}
        </button>
        <button
          onClick={() => router.push('/dashboard')} // End workout and go back
          className="bg-red-600 text-white py-2 px-6 rounded-lg text-lg font-bold hover:bg-red-700 transition"
        >
          End Workout
        </button>
      </div>
    </div>
  );
}
