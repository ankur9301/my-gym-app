'use client'

import { useState, useEffect } from 'react'
import { X, User } from 'lucide-react'

export default function WorkoutTimer() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-[#1B1B1F] z-10">
      <button className="text-white">
        <X size={24} />
      </button>
      <div className="flex items-center">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
        <span className="text-2xl font-bold">{formatTime(time)}</span>
      </div>
      <button className="text-white">
        <User size={24} />
      </button>
    </header>
  )
}

