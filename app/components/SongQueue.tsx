"use client"
import React from 'react';
import { Play, Clock, Trophy, TrendingUp } from 'lucide-react';
import { useApp } from './contexts/AppContext';
import SongCard from './SongCard';

const SongQueue: React.FC = () => {
  const { state, actions } = useApp();

  const sortedSongs = [...state.songs].sort((a, b) => {
    if (a.isPromoted && !b.isPromoted) return -1;
    if (!a.isPromoted && b.isPromoted) return 1;
    
    const aScore = a.likes - a.dislikes;
    const bScore = b.likes - b.dislikes;
    
    return bScore - aScore;
  });


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Song Queue</h2>
              <p className="text-gray-400">
                {sortedSongs.length} songs • Real-time voting
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${state.connected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm text-gray-400">
                {state.connected ? 'Live' : 'Disconnected'}
              </span>
            </div>
            
           
          </div>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Queue Length</p>
              <p className="text-2xl font-bold text-white">{sortedSongs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Votes</p>
              <p className="text-2xl font-bold text-white">
                {sortedSongs.reduce((acc, song) => acc + song.likes + song.dislikes, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Now Playing</p>
              <p className="text-lg font-bold text-white">
                {state.currentSong ? 'Active' : 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="space-y-4">
        {sortedSongs.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-12 border border-gray-700 text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Songs in Queue</h3>
            <p className="text-gray-400">
              Be the first to submit a song and start the voting!
            </p>
          </div>
        ) : (
          sortedSongs.map((song, index) => (
            <SongCard
              key={song.id}
              song={song}
              rank={index + 1}
              isPlaying={state.currentSong?.id === song.id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SongQueue;