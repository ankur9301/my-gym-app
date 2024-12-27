'use client';

import React from 'react';
import ExerciseDetails from '../../../components/ExerciseDetails';

const exercises = [
  { id: '1', name: 'Hip Thrust', animation: '/animations/hip-thrust.json' },
  { id: '2', name: 'Push Up', animation: '/animations/push-up.json' },
  { id: '3', name: 'Squat', animation: '/animations/squat.json' },
  // Add more exercises here
];

export default function ExercisePage({ params }: { params: { exerciseId: string } }) {
  // Find the exercise by ID
  const exercise = exercises.find((e) => e.id === params.exerciseId);

  if (!exercise) {
    return <div className="text-white">Exercise not found.</div>;
  }

  return <ExerciseDetails exercise={exercise} />;
}
