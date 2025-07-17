"use client"
import React from 'react';
import { Trophy, Clock, Gift, TrendingUp, Crown, Star } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { formatCurrency, formatTimeAgo } from '../utils/formatters';

const RewardsSection: React.FC = () => {
  const { state } = useApp();

  const currentRewardSession = {
    id: '1',
    startTime: new Date(Date.now() - 45 * 60 * 1000),
    endTime: new Date(Date.now() + 15 * 60 * 1000),
    rewardAmount: 500,
    status: 'active' as const,
    topSong: state.songs[0],
    winner: null,
  };

  const recentWinners = [
    { name: 'Alex M.', reward: 500, song: 'Bohemian Rhapsody', time: '2 hours ago' },
    { name: 'Sarah K.', reward: 300, song: 'Stairway to Heaven', time: '3 hours ago' },
    { name: 'Mike R.', reward: 250, song: 'Hotel California', time: '4 hours ago' },
  ];

  const timeUntilNext = () => {
    const now = new Date();
    const next = new Date(now.getTime() + (60 - now.getMinutes()) * 60 * 1000);
    const diff = next.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes;
  };

  const currentSessionProgress = () => {
    const now = new Date();
    const start = currentRewardSession.startTime;
    const end = currentRewardSession.endTime;
    const total = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Rewards & Leaderboard</h2>
            <p className="text-gray-400">Earn rewards for popular submissions</p>
          </div>
        </div>
      </div>

      {/* Current Session */}
      <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl shadow-xl p-6 border border-yellow-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-yellow-100">Current Hour Challenge</h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-yellow-100">{formatCurrency(currentRewardSession.rewardAmount, 'INR')}</p>
            <p className="text-sm text-yellow-300">Prize Pool</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-yellow-300">Session Progress</span>
            <span className="text-sm text-yellow-300">{timeUntilNext()} min left</span>
          </div>
          <div className="w-full bg-yellow-900/30 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${currentSessionProgress()}%` }}
            />
          </div>
        </div>

        {currentRewardSession.topSong && (
          <div className="bg-gray-800/30 rounded-lg p-4">
            <p className="text-sm text-yellow-300 mb-2">🏆 Currently Leading:</p>
            <div className="flex items-center space-x-3">
              <img
                src={currentRewardSession.topSong.thumbnail}
                alt={currentRewardSession.topSong.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-yellow-100">{currentRewardSession.topSong.title}</p>
                <p className="text-sm text-yellow-300">
                  {currentRewardSession.topSong.likes} votes • by {currentRewardSession.topSong.submittedBy}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Stats */}
      {state.user && (
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Your Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <Star className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-300">{state.user.totalRewards}</p>
              <p className="text-sm text-purple-200">Total Rewards</p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-300">{state.user.songsSubmitted}</p>
              <p className="text-sm text-blue-200">Songs Submitted</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <Gift className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-300">{state.user.votesGiven}</p>
              <p className="text-sm text-green-200">Votes Given</p>
            </div>
            <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <Trophy className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-300">12</p>
              <p className="text-sm text-orange-200">Rank</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Winners */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Winners</h3>
        <div className="space-y-4">
          {recentWinners.map((winner, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-white">{winner.name}</p>
                  <p className="text-sm text-gray-400">{winner.song}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-400">{formatCurrency(winner.reward, 'INR')}</p>
                <p className="text-sm text-gray-500">{winner.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How Rewards Work */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">How Rewards Work</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-white mb-2">🎯 Winning Criteria</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Most liked song each hour wins</li>
              <li>• Minimum 10 votes required</li>
              <li>• Song must be played at least once</li>
              <li>• One winner per user per day</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-2">💰 Reward Structure</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Base reward: ₹100 per hour</li>
              <li>• Bonus: ₹50 per 10 votes</li>
              <li>• Promotion bonus: ₹200</li>
              <li>• Maximum: ₹1000 per hour</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;