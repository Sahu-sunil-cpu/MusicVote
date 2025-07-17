"use client"

import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  User, 
  MapPin, 
  Calendar, 
  Music, 
  TrendingUp, 
  DollarSign, 
  Play, 
  Heart, 
  Users, 
  Award,
  Instagram,
  Twitter,
  Youtube,
  ExternalLink,
  Edit3,
  Settings,
  BarChart3,
  Clock,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import AppHeader from '../../components/AppHeader';
import { useApp } from '../../contexts/AppContext';
import { formatCurrency, formatNumber, formatTimeAgo } from '../../utils/formatters';

const ProfilePage: React.FC = () => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'songs' | 'analytics' | 'earnings'>('overview');

  // Mock artist data - in real app this would come from API
  const artistProfile = {
    ...state.user,
    bio: "Passionate musician creating soulful melodies that connect hearts across the world. Specializing in indie rock with electronic influences.",
    location: "Mumbai, India",
    genre: "Indie Rock",
    socialLinks: {
      youtube: "https://youtube.com/@artist",
      spotify: "https://spotify.com/artist",
      instagram: "https://instagram.com/artist",
      twitter: "https://twitter.com/artist"
    },
    joinedAt: new Date('2023-06-15'),
    totalEarnings: 15750,
    totalPlays: 12450,
    averageRating: 4.7,
    followers: 2340,
    following: 156
  };

  const artistStats = {
    totalSongs: 12,
    totalVotes: 1847,
    totalEarnings: 15750,
    totalPlays: 12450,
    averageRating: 4.7,
    topSong: state.songs[0],
    recentEarnings: [
      { date: new Date('2024-01-15'), amount: 500, song: 'Bohemian Rhapsody', source: 'votes' as const },
      { date: new Date('2024-01-14'), amount: 250, song: 'Hotel California', source: 'promotion' as const },
      { date: new Date('2024-01-13'), amount: 300, song: 'Stairway to Heaven', source: 'plays' as const },
      { date: new Date('2024-01-12'), amount: 150, song: 'Imagine', source: 'votes' as const },
    ],
    monthlyStats: [
      { month: 'Sep', earnings: 2100, plays: 1200, votes: 180 },
      { month: 'Oct', earnings: 2800, plays: 1800, votes: 240 },
      { month: 'Nov', earnings: 3200, plays: 2100, votes: 290 },
      { month: 'Dec', earnings: 4100, plays: 2800, votes: 350 },
      { month: 'Jan', earnings: 3500, plays: 2200, votes: 310 },
    ]
  };

  const songSectionData = [
    { section: 'Intro', timestamp: 0, duration: 30, likes: 45, dislikes: 3 },
    { section: 'Verse 1', timestamp: 30, duration: 45, likes: 52, dislikes: 8 },
    { section: 'Chorus', timestamp: 75, duration: 40, likes: 89, dislikes: 4 },
    { section: 'Verse 2', timestamp: 115, duration: 45, likes: 48, dislikes: 12 },
    { section: 'Chorus', timestamp: 160, duration: 40, likes: 76, dislikes: 6 },
    { section: 'Bridge', timestamp: 200, duration: 35, likes: 34, dislikes: 15 },
    { section: 'Final Chorus', timestamp: 235, duration: 45, likes: 67, dislikes: 8 },
    { section: 'Outro', timestamp: 280, duration: 25, likes: 23, dislikes: 5 },
  ];

  const genreDistribution = [
    { name: 'Indie Rock', value: 40, color: '#8B5CF6' },
    { name: 'Electronic', value: 25, color: '#06B6D4' },
    { name: 'Pop', value: 20, color: '#10B981' },
    { name: 'Alternative', value: 15, color: '#F59E0B' },
  ];

  if (!state.user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <AppHeader />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Please Login</h1>
              <p className="text-gray-400">You need to be logged in to view your profile.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AppHeader />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-gray-700 mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-2 right-2 w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 rounded-full flex items-center justify-center transition-all duration-200">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <h1 className="text-3xl font-bold text-white">{artistProfile.name}</h1>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    {artistProfile.genre}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 max-w-2xl">{artistProfile.bio}</p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{artistProfile.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {formatTimeAgo(artistProfile.joinedAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{formatNumber(artistProfile.followers)} followers</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-4 mb-6">
                  {artistProfile.socialLinks?.youtube && (
                    <a href={artistProfile.socialLinks.youtube} target="_blank" rel="noopener noreferrer" 
                       className="w-10 h-10 bg-white/10 hover:bg-red-500/20 rounded-full flex items-center justify-center transition-all duration-200">
                      <Youtube className="w-5 h-5 text-red-400" />
                    </a>
                  )}
                  {artistProfile.socialLinks?.instagram && (
                    <a href={artistProfile.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 bg-white/10 hover:bg-pink-500/20 rounded-full flex items-center justify-center transition-all duration-200">
                      <Instagram className="w-5 h-5 text-pink-400" />
                    </a>
                  )}
                  {artistProfile.socialLinks?.twitter && (
                    <a href={artistProfile.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 rounded-full flex items-center justify-center transition-all duration-200">
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </a>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-white">{artistStats.totalSongs}</div>
                    <div className="text-sm text-gray-400">Songs</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(artistStats.totalEarnings, 'INR')}</div>
                    <div className="text-sm text-gray-400">Earned</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{formatNumber(artistStats.totalPlays)}</div>
                    <div className="text-sm text-gray-400">Plays</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">{artistStats.averageRating}/5</div>
                    <div className="text-sm text-gray-400">Rating</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3">
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
                  <Edit3 className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
                  <Settings className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 mb-8">
            <div className="flex space-x-1 p-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'songs', label: 'Songs', icon: Music },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'earnings', label: 'Earnings', icon: DollarSign },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white border border-white/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Monthly Performance */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Monthly Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={artistStats.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="earnings" stroke="#10B981" strokeWidth={3} />
                    <Line type="monotone" dataKey="plays" stroke="#3B82F6" strokeWidth={3} />
                    <Line type="monotone" dataKey="votes" stroke="#8B5CF6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Activity */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-6">Recent Earnings</h3>
                  <div className="space-y-4">
                    {artistStats.recentEarnings.map((earning, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{earning.song}</p>
                          <p className="text-sm text-gray-400">{formatTimeAgo(earning.date)} • {earning.source}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">{formatCurrency(earning.amount, 'INR')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-6">Genre Distribution</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={genreDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {genreDistribution.map((entry, index) => (
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
            </div>
          )}

          {activeTab === 'songs' && (
            <div className="space-y-6">
              {state.songs.slice(0, 5).map((song, index) => (
                <div key={song.id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{song.title}</h3>
                      <p className="text-gray-400">{song.artist}</p>
                      <p className="text-sm text-gray-500">Submitted {formatTimeAgo(song.submittedAt)}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{song.likes}</div>
                      <div className="text-sm text-gray-400">likes</div>
                    </div>
                  </div>

                  {/* Song Section Analytics */}
                  <div className="mt-6">
                    <h4 className="text-lg font-medium text-white mb-4">Section-wise Voting</h4>
                    <div className="space-y-3">
                      {songSectionData.map((section, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="text-sm font-medium text-white min-w-[80px]">
                              {section.section}
                            </div>
                            <div className="text-xs text-gray-400">
                              {Math.floor(section.timestamp / 60)}:{(section.timestamp % 60).toString().padStart(2, '0')} - {Math.floor((section.timestamp + section.duration) / 60)}:{((section.timestamp + section.duration) % 60).toString().padStart(2, '0')}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-green-400">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm font-medium">{section.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-red-400">
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm font-medium">{section.dislikes}</span>
                            </div>
                            <div className="w-24 bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                                style={{ width: `${(section.likes / (section.likes + section.dislikes)) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              {/* Voting Trends */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Voting Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={artistStats.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
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

              {/* Performance Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Total Plays</h4>
                      <p className="text-2xl font-bold text-blue-400">{formatNumber(artistStats.totalPlays)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">+12% from last month</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Total Votes</h4>
                      <p className="text-2xl font-bold text-purple-400">{formatNumber(artistStats.totalVotes)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">+8% from last month</p>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Avg Rating</h4>
                      <p className="text-2xl font-bold text-yellow-400">{artistStats.averageRating}/5</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">+0.3 from last month</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-8">
              {/* Earnings Overview */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {formatCurrency(artistStats.totalEarnings, 'INR')}
                    </div>
                    <div className="text-sm text-gray-400">Total Earnings</div>
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {formatCurrency(3500, 'INR')}
                    </div>
                    <div className="text-sm text-gray-400">This Month</div>
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {formatCurrency(875, 'INR')}
                    </div>
                    <div className="text-sm text-gray-400">This Week</div>
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {formatCurrency(125, 'INR')}
                    </div>
                    <div className="text-sm text-gray-400">Today</div>
                  </div>
                </div>
              </div>

              {/* Earnings Chart */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Earnings Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={artistStats.monthlyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line type="monotone" dataKey="earnings" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Detailed Earnings */}
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Recent Transactions</h3>
                <div className="space-y-4">
                  {artistStats.recentEarnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          earning.source === 'votes' ? 'bg-purple-500/20' :
                          earning.source === 'promotion' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                        }`}>
                          {earning.source === 'votes' ? <Heart className="w-5 h-5 text-purple-400" /> :
                           earning.source === 'promotion' ? <TrendingUp className="w-5 h-5 text-yellow-400" /> :
                           <Play className="w-5 h-5 text-blue-400" />}
                        </div>
                        <div>
                          <p className="font-medium text-white">{earning.song}</p>
                          <p className="text-sm text-gray-400">
                            {earning.source.charAt(0).toUpperCase() + earning.source.slice(1)} • {formatTimeAgo(earning.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">+{formatCurrency(earning.amount, 'INR')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            © 2024 MusicVote. All rights reserved. Democratizing music, one vote at a time.
          </div>
        </div>
      </footer>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
    </div>
  );
};

export default ProfilePage;