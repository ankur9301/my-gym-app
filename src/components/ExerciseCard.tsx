// src/components/ExerciseCard.tsx
import React, { useState } from 'react';
import Lottie from 'lottie-react';
import fallbackImage from '../../public/animations/fallback-animation.json';

interface ExerciseCardProps {
  title: string;
  sets: number;
  reps: number;
  image: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ title, sets, reps, image }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Track whether card is expanded
  const [isZoomed, setIsZoomed] = useState(false); // Track whether animation is zoomed
  const [animationData, setAnimationData] = useState<any | null>(null);

  React.useEffect(() => {
    try {
      const data = require(`../../public/animations/${image}`);
      setAnimationData(data);
    } catch (error) {
      console.error(`Animation file not found: ${image}`);
      setAnimationData(fallbackImage);
    }
  }, [image]);

  // Toggle card expansion
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle zoom toggle for animation
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <>
      {/* Exercise Card */}
      <div
        className={`flex flex-row items-center bg-gray-900 rounded-lg shadow-lg transition-all duration-500 ease-in-out ${
          isExpanded ? 'scale-105' : 'scale-100'
        }`}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '200px',
          margin: '10px auto',
        }}
        onClick={handleToggleExpand}
      >
        {/* Lottie Animation */}
        <div
          className="flex-shrink-0 cursor-pointer"
          style={{ width: '150px', height: '150px' }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click event
            handleZoomToggle(); // Trigger zoom view
          }}
        >
          {animationData && <Lottie animationData={animationData} loop autoplay />}
        </div>
        {/* Exercise Details */}
        <div className="flex-grow p-4">
          <h3 className="text-white font-bold text-xl">{title}</h3>
          <p className="text-gray-400 text-lg">Sets: {sets}</p>
          <p className="text-gray-400 text-lg">Reps: {reps}</p>
        </div>
      </div>

      {/* Zoomed Animation Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleZoomToggle}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-2xl font-bold"
            onClick={(e) => {
              e.stopPropagation(); // Prevent modal click event
              handleZoomToggle();
            }}
          >
            X
          </button>
          {/* Zoomed Animation */}
          <div style={{ width: '80%', height: '80%' }}>
            {animationData && <Lottie animationData={animationData} loop autoplay />}
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseCard;
