'use client';

import { useState } from 'react';
import ExerciseCard from './ExerciseCard';
import ExerciseDetailModal from './ExerciseDetailModal';
import FullSizePhoto from './FullSizePhoto';

export default function ExerciseList({ exercises }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [fullSizePhoto, setFullSizePhoto] = useState(null);

  return (
    <div className="space-y-4">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onSelect={() => setSelectedExercise(exercise)}
        />
      ))}
      {selectedExercise && (
        <ExerciseDetailModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onPhotoClick={(src) => setFullSizePhoto(src)}
        />
      )}
      {fullSizePhoto && (
        <FullSizePhoto
          src={fullSizePhoto}
          alt="Exercise demonstration"
          onClose={() => setFullSizePhoto(null)}
        />
      )}
    </div>
  );
}
