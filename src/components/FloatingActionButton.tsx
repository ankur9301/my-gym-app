import { Play, Pause } from 'lucide-react'
import { useState } from 'react'

export default function FloatingActionButton() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <button
      className="fixed bottom-6 right-6 bg-[#FF006E] text-white p-4 rounded-full shadow-lg hover:bg-[#FF006E]/90 transition-colors"
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </button>
  )
}

