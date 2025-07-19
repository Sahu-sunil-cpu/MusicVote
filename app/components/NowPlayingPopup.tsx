"use client"
import React, { useState, useEffect } from 'react';
import { Play, Clock, User, X } from 'lucide-react';
import { useApp } from './contexts/AppContext';

const NowPlayingPopup: React.FC = () => {
  const { state } = useApp();
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [currentSongForPopup, setCurrentSongForPopup] = useState(state.currentSong);

  useEffect(() => {
    if (state.currentSong && state.currentSong !== currentSongForPopup) {
      setCurrentSongForPopup(state.currentSong);
      setShowPopup(true);
      setCountdown(10);
      
      const countdownInterval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setShowPopup(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [state.currentSong, currentSongForPopup]);

  if (!showPopup || !currentSongForPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Now Playing</h3>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Song Info */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={currentSongForPopup.thumbnail}
              alt={currentSongForPopup.title}
              className="w-16 h-16 rounded-lg object-cover shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xl font-bold text-white truncate mb-1">
                {currentSongForPopup.title}
              </h4>
              <p className="text-gray-400 truncate mb-2">
                {currentSongForPopup.artist}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <User className="w-3 h-3" />
                <span>by {currentSongForPopup.submittedBy}</span>
              </div>
            </div>
          </div>

          {/* Countdown */}
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - countdown / 10)}`}
                  className="text-white transition-all duration-1000 ease-linear"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{countdown}</span>
              </div>
            </div>
            <p className="text-gray-400">
              Starting in {countdown} second{countdown !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Song Stats */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900/50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {currentSongForPopup.likes}
              </div>
              <div className="text-xs text-gray-400">Likes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                {currentSongForPopup.plays}
              </div>
              <div className="text-xs text-gray-400">Plays</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-900/30 border-t border-gray-700">
          <button
            onClick={() => setShowPopup(false)}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingPopup;