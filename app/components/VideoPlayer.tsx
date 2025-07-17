"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, Clock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const VideoPlayer: React.FC = () => {
  const { state } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (state.currentSong) {
      setIsPlaying(true);
      setCurrentTime(0);
      setDuration(180);
    }
  }, [state.currentSong]);

  useEffect(() => {
    if (isPlaying && duration > 0) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!state.currentSong) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No Song Playing
          </h3>
          <p className="text-gray-400">
            Vote for songs in the queue to start the music!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
      {/* Video Container */}
      <div className="relative bg-black aspect-video">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${state.currentSong.youtubeId}?autoplay=1&controls=0&rel=0&modestbranding=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Song Info & Controls */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate">
              {state.currentSong.title}
            </h3>
            <p className="text-gray-400 truncate">
              {state.currentSong.artist}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full flex items-center justify-center transition-all transform hover:scale-105"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Submitted by <span className="font-medium text-white">{state.currentSong.submittedBy}</span>
            </div>
            
            <button className="flex items-center space-x-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-sm transition-colors">
              <SkipForward className="w-4 h-4" />
              <span className="text-gray-300">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;