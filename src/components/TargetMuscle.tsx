// src/components/TargetMuscles.tsx
import React from 'react';
import Image from 'next/image';

interface TargetMuscleProps {
  name: string; // Muscle name (e.g., Chest, Back)
  image: string; // Path to the muscle image
  isSelected: boolean; // Whether this muscle is selected
  onClick: () => void; // Function to handle click events
}

const TargetMuscle: React.FC<TargetMuscleProps> = ({ name, image, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick} // Call the onClick function when the card is clicked
      className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
        isSelected ? 'border-4 border-green-500 scale-105' : 'border-2 border-gray-300'
      }`}
      style={{
        width: '90px', // Fixed width
        height: '120px', // Fixed height
        margin: '8px', // Add spacing between cards
        borderRadius: '8px', // Rounded corners
        overflow: 'hidden', // Prevent image overflow
        backgroundColor: isSelected ? '#f0fdf4' : '#ffffff', // Change background when selected
      }}
    >
      {/* Muscle Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-3/4 object-cover" // Ensures the image fills the top part of the card
      />
      {/* Muscle Name */}
      <p className="text-gray-700 font-bold mt-2">{name}</p>
    </div>
  );
};

export default TargetMuscle;
