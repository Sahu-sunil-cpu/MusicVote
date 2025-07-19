"use client"
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Crown, ExternalLink, Clock, User } from 'lucide-react';
import { Song } from '../types';
import { useApp } from './contexts/AppContext';
import { formatTimeAgo, formatNumber } from '../utils/formatters';
import PaymentModal from './PaymentModal';

interface SongCardProps {
  song: Song;
  rank: number;
  isPlaying?: boolean;
}

const SongCard: React.FC<SongCardProps> = ({ song, rank, isPlaying = false }) => {
  const { state, actions } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const userVote = state.user ? song.userVotes[state.user.id] : null;
  const totalVotes = song.likes + song.dislikes;
  const votePercentage = totalVotes > 0 ? (song.likes / totalVotes) * 100 : 0;

  const handleVote = async (voteType: 'like' | 'dislike') => {
    if (!state.user) return;
    await actions.voteSong(song.id, voteType);
  };

  const handlePromote = () => {
    if (!state.user) return;
    setShowPaymentModal(true);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return 'text-gray-500';
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500/20';
    if (rank === 2) return 'bg-gray-500/20';
    if (rank === 3) return 'bg-orange-500/20';
    return 'bg-gray-600/20';
  };

  return (
    <>
      <div className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:border-gray-600 ${
        isPlaying ? 'border-purple-500 shadow-purple-500/20' : 'border-gray-700'
      } ${song.isPromoted ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20' : ''}`}>
        
        {/* Rank Badge */}
        <div className="relative">
          <div className={`absolute -top-2 -left-2 w-8 h-8 ${getRankBg(rank)} rounded-full flex items-center justify-center z-10 border-2 border-gray-800`}>
            <span className={`text-sm font-bold ${getRankColor(rank)}`}>
              {rank <= 3 ? (rank === 1 ? '👑' : rank === 2 ? '🥈' : '🥉') : rank}
            </span>
          </div>
          
          {song.isPromoted && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
              <Crown className="w-3 h-3 inline mr-1" />
              PROMOTED
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex space-x-4">
            {/* Thumbnail */}
            <div className="relative flex-shrink-0">
              <img
                src={imageError ? '/placeholder-song.jpg' : song.thumbnail}
                alt={song.title}
                className="w-20 h-20 rounded-lg object-cover"
                onError={() => setImageError(true)}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate mb-1">
                {song.title}
              </h3>
              <p className="text-sm text-gray-400 truncate mb-2">
                {song.artist}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{song.submittedBy}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(song.submittedAt)}</span>
                </div>
              </div>
            </div>

            {/* External Link */}
            <button
              onClick={() => window.open(`https://youtube.com/watch?v=${song.youtubeId}`, '_blank')}
              className="flex-shrink-0 w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Vote Progress Bar */}
          <div className="mt-4 mb-3">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
                style={{ width: `${votePercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatNumber(song.likes)} likes</span>
              <span>{formatNumber(song.dislikes)} dislikes</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote('like')}
                disabled={!state.user}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  userVote === 'like'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-green-500/10 hover:text-green-400'
                } disabled:opacity-50`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{formatNumber(song.likes)}</span>
              </button>
              
              <button
                onClick={() => handleVote('dislike')}
                disabled={!state.user}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  userVote === 'dislike'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-red-500/10 hover:text-red-400'
                } disabled:opacity-50`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{formatNumber(song.dislikes)}</span>
              </button>
            </div>

            {!song.isPromoted && (
              <button
                onClick={handlePromote}
                disabled={!state.user}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 disabled:opacity-50"
              >
                <Crown className="w-4 h-4 inline mr-1" />
                Promote
              </button>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        song={song}
        onPaymentSuccess={(amount, method) => {
          actions.promoteSong(song.id, amount, method);
          setShowPaymentModal(false);
        }}
      />
    </>
  );
};

export default SongCard;