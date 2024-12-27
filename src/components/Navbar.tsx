import React, { useState } from 'react';

interface NavbarProps {
  onTimeChange: (time: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTimeChange }) => {
  const [selectedTime, setSelectedTime] = useState<number>(60); // Default 60 min

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const time = parseInt(event.target.value, 10);
    setSelectedTime(time);
    onTimeChange(time); // Pass the selected time to parent
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900">
      <div className="text-yellow-400 font-bold text-lg">Your Gym</div>
      <div className="flex space-x-4">
        <select
          value={selectedTime}
          onChange={handleTimeChange}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value={15}>15 min</option>
          <option value={30}>30 min</option>
          <option value={60}>60 min</option>
          <option value={90}>90 min</option>
          <option value={120}>120 min</option>
        </select>
        <span className="text-gray-400">Recovered muscles</span>
        <span className="text-gray-400">Equipment</span>
        <span className="text-gray-400">Hydration</span>
      </div>
    </nav>
  );
};

export default Navbar;
