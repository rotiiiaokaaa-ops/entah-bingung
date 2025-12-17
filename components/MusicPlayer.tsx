import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { ROMANTIC_MUSIC_URL } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ROMANTIC_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio autoplay blocked, user interaction needed"));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-pink-200 hover:scale-105 transition-transform duration-300">
      <button 
        onClick={toggleMute}
        className="p-2 text-pink-500 hover:text-pink-700 transition-colors"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <button 
        onClick={togglePlay}
        className="bg-pink-500 text-white p-3 rounded-full shadow-md hover:bg-pink-600 transition-colors animate-pulse-slow"
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-1 mr-2">
          <span className="w-1 h-3 bg-pink-400 animate-bounce"></span>
          <span className="w-1 h-5 bg-pink-500 animate-bounce delay-100"></span>
          <span className="w-1 h-4 bg-pink-300 animate-bounce delay-75"></span>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;