"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Clock, Trophy } from 'lucide-react';
import { useApp } from './contexts/AppContext';

const ChartsSection: React.FC = () => {
  const { state } = useApp();

  const hourlyData = [
    { hour: '12PM', votes: 45, songs: 8 },
    { hour: '1PM', votes: 52, songs: 12 },
    { hour: '2PM', votes: 38, songs: 6 },
    { hour: '3PM', votes: 67, songs: 15 },
    { hour: '4PM', votes: 89, songs: 18 },
    { hour: '5PM', votes: 76, songs: 14 },
    { hour: '6PM', votes: 95, songs: 22 },
    { hour: '7PM', votes: 112, songs: 25 },
  ];

  const topSongs = state.songs
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)
    .map(song => ({
      name: song.title.length > 20 ? song.title.substring(0, 20) + '...' : song.title,
      votes: song.likes,
      plays: song.plays,
    }));

  const voteDistribution = [
    { name: 'Likes', value: state.songs.reduce((acc, song) => acc + song.likes, 0), color: '#10B981' },
    { name: 'Dislikes', value: state.songs.reduce((acc, song) => acc + song.dislikes, 0), color: '#EF4444' },
  ];

  const stats = [
    {
      title: 'Total Songs',
      value: state.songs.length,
      change: '+12%',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8%',
      icon: <Users className="w-5 h-5" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'Avg. Wait Time',
      value: '3.2 min',
      change: '-15%',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
    {
      title: 'Top Reward',
      value: '₹500',
      change: '+25%',
      icon: <Trophy className="w-5 h-5" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            <p className="text-gray-400">Real-time insights and leaderboards</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-green-400 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Activity Chart */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Hourly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="votes" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vote Distribution */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Vote Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={voteDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {voteDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Songs Leaderboard */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Top Songs This Hour</h3>
        {topSongs.length > 0 ? (
          <div className="space-y-4">
            {topSongs.map((song, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-500' : 'bg-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-white">{song.name}</p>
                    <p className="text-sm text-gray-400">{song.plays} plays</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{song.votes}</p>
                  <p className="text-sm text-gray-400">votes</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-600" />
            <p>No songs in the leaderboard yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartsSection;