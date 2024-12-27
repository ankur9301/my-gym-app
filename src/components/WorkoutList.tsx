import React from 'react';

const exercises = [
  { id: 1, name: 'Hip Thrust', sets: 3, reps: 8, image: '/hip-thrust.png' },
  { id: 2, name: 'Burpee', sets: 3, reps: 7, image: '/burpee.png' },
];

const WorkoutList = ({ onExerciseClick }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">7 Exercises</h2>
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center p-4 bg-gray-800 rounded-lg"
            onClick={() => onExerciseClick(exercise)}
          >
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-16 h-16 rounded-lg"
            />
            <div className="ml-4">
              <h3 className="text-lg font-bold">{exercise.name}</h3>
              <p className="text-gray-400">
                {exercise.sets} sets • {exercise.reps} reps
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutList;
